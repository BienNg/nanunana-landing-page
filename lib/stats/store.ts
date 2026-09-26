import "server-only";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { statsRedis } from "@/lib/stats/redis";

export type StatsMode = "redis" | "file";

type HashValue = number | string | Record<string, unknown>;

export type StatsBatch = {
  incr(key: string, field: string, by: number, ttlSec?: number): void;
  set(key: string, fields: Record<string, HashValue>): void;
  addUnique(key: string, member: string, ttlSec: number): void;
  exec(): Promise<void>;
};

export type StatsStore = {
  mode: StatsMode;
  allow(ip: string): Promise<boolean>;
  /** True when this session id was not seen in the last 30 minutes. */
  claimSession(key: string, ttlSec: number): Promise<boolean>;
  batch(): StatsBatch;
  hash(key: string): Promise<Record<string, unknown> | null>;
  hashes(keys: string[]): Promise<Array<Record<string, unknown> | null>>;
  fields(key: string, names: string[]): Promise<Record<string, unknown>>;
  countUnique(keys: string[]): Promise<number>;
};

type FileHash = { exp?: number; fields: Record<string, HashValue> };
type FileUnique = { exp?: number; members: string[] };
type FileFlag = { exp: number };
type FileDb = {
  hashes: Record<string, FileHash>;
  uniques: Record<string, FileUnique>;
  flags: Record<string, FileFlag>;
};

const FILE = path.join(process.cwd(), ".data", "behavior-stats.json");
const emptyDb = (): FileDb => ({ hashes: {}, uniques: {}, flags: {} });

function fresh(exp: number | undefined, now: number) {
  return exp === undefined || exp > now;
}

let opened: StatsStore | null | undefined;

/** Redis when Upstash is configured. Otherwise a JSON file, except on Vercel where the disk does not last. */
export function openStats(): StatsStore | null {
  if (opened !== undefined) return opened;
  const redis = statsRedis();
  if (redis) opened = redisStore(redis);
  else if (!process.env.VERCEL) opened = fileStore();
  else opened = null;
  return opened;
}

function redisStore(redis: Redis): StatsStore {
  let limiter: Ratelimit | undefined;
  const limit = () => {
    limiter ??= new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(40, "1 m"),
      prefix: "nn:stats:rl",
      analytics: false,
    });
    return limiter;
  };

  return {
    mode: "redis",
    async allow(ip) {
      const { success } = await limit().limit(ip);
      return success;
    },
    async claimSession(key, ttlSec) {
      const freshSession = await redis.set(key, "1", { nx: true, ex: ttlSec });
      if (freshSession !== "OK") await redis.expire(key, ttlSec);
      return freshSession === "OK";
    },
    batch() {
      const pipe = redis.pipeline();
      return {
        incr(key, field, by, ttlSec) {
          pipe.hincrby(key, field, by);
          if (ttlSec) pipe.expire(key, ttlSec);
        },
        set(key, fields) {
          if (Object.keys(fields).length > 0) pipe.hset(key, fields);
        },
        addUnique(key, member, ttlSec) {
          pipe.pfadd(key, member);
          pipe.expire(key, ttlSec);
        },
        async exec() {
          if (pipe.length() === 0) return;
          await pipe.exec();
        },
      };
    },
    async hash(key) {
      return redis.hgetall<Record<string, unknown>>(key);
    },
    async hashes(keys) {
      if (keys.length === 0) return [];
      const pipe = redis.pipeline();
      for (const key of keys) pipe.hgetall<Record<string, unknown>>(key);
      const rows = await pipe.exec<(Record<string, unknown> | null)[]>();
      return rows.map((row) => (row && typeof row === "object" ? row : null));
    },
    async fields(key, names) {
      if (names.length === 0) return {};
      const row = await redis.hmget<Record<string, unknown>>(key, ...names);
      return row ?? {};
    },
    async countUnique(keys) {
      const first = keys[0];
      if (!first) return 0;
      return redis.pfcount(first, ...keys.slice(1));
    },
  };
}

function fileStore(): StatsStore {
  let queue = Promise.resolve();
  const hits = new Map<string, number[]>();

  const exclusive = <T>(fn: (db: FileDb) => Promise<T> | T) => {
    const run = queue.then(async () => fn(await load()));
    queue = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  };

  const load = async () => {
    try {
      const parsed = JSON.parse(await readFile(FILE, "utf8")) as FileDb;
      if (!parsed.hashes || !parsed.uniques || !parsed.flags) return emptyDb();
      return parsed;
    } catch {
      return emptyDb();
    }
  };

  const save = async (db: FileDb) => {
    const now = Date.now();
    for (const [key, flag] of Object.entries(db.flags)) {
      if (flag.exp <= now) delete db.flags[key];
    }
    for (const [key, entry] of Object.entries(db.hashes)) {
      if (entry.exp !== undefined && entry.exp <= now) delete db.hashes[key];
    }
    for (const [key, entry] of Object.entries(db.uniques)) {
      if (entry.exp !== undefined && entry.exp <= now) delete db.uniques[key];
    }
    await mkdir(path.dirname(FILE), { recursive: true });
    const tmp = `${FILE}.tmp`;
    await writeFile(tmp, JSON.stringify(db));
    await rename(tmp, FILE);
  };

  return {
    mode: "file",
    async allow(ip) {
      const now = Date.now();
      const recent = (hits.get(ip) ?? []).filter((at) => now - at < 60_000);
      if (recent.length >= 40) {
        hits.set(ip, recent);
        return false;
      }
      recent.push(now);
      hits.set(ip, recent);
      return true;
    },
    claimSession(key, ttlSec) {
      return exclusive(async (db) => {
        const now = Date.now();
        const current = db.flags[key];
        if (current && current.exp > now) {
          current.exp = now + ttlSec * 1000;
          await save(db);
          return false;
        }
        db.flags[key] = { exp: now + ttlSec * 1000 };
        await save(db);
        return true;
      });
    },
    batch() {
      const ops: Array<(db: FileDb, now: number) => void> = [];
      return {
        incr(key, field, by, ttlSec) {
          ops.push((db, now) => {
            const entry = liveHash(db, key, now);
            const current = entry.fields[field];
            entry.fields[field] = (typeof current === "number" ? current : 0) + by;
            if (ttlSec) entry.exp = now + ttlSec * 1000;
          });
        },
        set(key, fields) {
          ops.push((db, now) => {
            const entry = liveHash(db, key, now);
            Object.assign(entry.fields, fields);
          });
        },
        addUnique(key, member, ttlSec) {
          ops.push((db, now) => {
            const entry = liveUnique(db, key, now);
            if (!entry.members.includes(member) && entry.members.length < 20_000) {
              entry.members.push(member);
            }
            entry.exp = now + ttlSec * 1000;
          });
        },
        exec() {
          if (ops.length === 0) return Promise.resolve();
          return exclusive(async (db) => {
            const now = Date.now();
            for (const op of ops) op(db, now);
            await save(db);
          });
        },
      };
    },
    hash(key) {
      return exclusive((db) => {
        const entry = db.hashes[key];
        if (!entry || !fresh(entry.exp, Date.now())) return null;
        return { ...entry.fields };
      });
    },
    hashes(keys) {
      return exclusive((db) => {
        const now = Date.now();
        return keys.map((key) => {
          const entry = db.hashes[key];
          if (!entry || !fresh(entry.exp, now)) return null;
          return { ...entry.fields };
        });
      });
    },
    fields(key, names) {
      return exclusive((db) => {
        const entry = db.hashes[key];
        const out: Record<string, unknown> = {};
        if (!entry || !fresh(entry.exp, Date.now())) return out;
        for (const name of names) {
          if (name in entry.fields) out[name] = entry.fields[name];
        }
        return out;
      });
    },
    countUnique(keys) {
      return exclusive((db) => {
        const now = Date.now();
        const members = new Set<string>();
        for (const key of keys) {
          const entry = db.uniques[key];
          if (!entry || !fresh(entry.exp, now)) continue;
          for (const member of entry.members) members.add(member);
        }
        return members.size;
      });
    },
  };
}

function liveHash(db: FileDb, key: string, now: number) {
  const current = db.hashes[key];
  if (!current || !fresh(current.exp, now)) {
    const created: FileHash = { fields: {} };
    db.hashes[key] = created;
    return created;
  }
  return current;
}

function liveUnique(db: FileDb, key: string, now: number) {
  const current = db.uniques[key];
  if (!current || !fresh(current.exp, now)) {
    const created: FileUnique = { members: [] };
    db.uniques[key] = created;
    return created;
  }
  return current;
}

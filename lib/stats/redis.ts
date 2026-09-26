import "server-only";
import { Redis } from "@upstash/redis";
import { serverEnv } from "@/lib/env";

let client: Redis | null | undefined;

export function statsRedis() {
  if (client !== undefined) return client;
  const cfg = serverEnv.upstash();
  client = cfg ? new Redis({ url: cfg.url, token: cfg.token }) : null;
  return client;
}

export const statsKeys = {
  visits: "nn:stats:visits",
  pageviews: "nn:stats:pageviews",
  clickMeta: "nn:stats:clickmeta",
  sectionMeta: "nn:stats:secmeta",
  session: (sid: string) => `nn:stats:ses:${sid}`,
  uniques: (day: string) => `nn:stats:uv:${day}`,
  clicks: (day: string) => `nn:stats:click:${day}`,
  sectionViews: (day: string) => `nn:stats:secv:${day}`,
  sectionMs: (day: string) => `nn:stats:secms:${day}`,
  country: (day: string) => `nn:stats:country:${day}`,
  city: (day: string) => `nn:stats:city:${day}`,
};

/** Daily breakdown keys are dropped after this. Visit totals stay in one small hash. */
export const STATS_RETENTION_SECONDS = 400 * 24 * 60 * 60;
export const SESSION_SECONDS = 30 * 60;

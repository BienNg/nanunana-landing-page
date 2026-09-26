import "server-only";
import { createHash } from "node:crypto";
import { todayKey } from "@/lib/stats/time";
import { SESSION_SECONDS, STATS_RETENTION_SECONDS, statsKeys } from "@/lib/stats/redis";
import { openStats } from "@/lib/stats/store";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SECTION_ID = /^[a-z0-9:_-]{1,80}$/i;
const BOT =
  /bot|crawl|spider|slurp|preview|facebookexternal|whatsapp|telegrambot|headless|lighthouse|pagespeed|pingdom/i;

type ClickIn = { label: string; href: string; section: string; page: string };
type WatchIn = { id: string; label: string; ms: number; view: boolean };

type Payload = {
  vid: string;
  sid: string;
  path: string;
  pageview: boolean;
  clicks: ClickIn[];
  watch: WatchIn[];
};

function clientIp(headers: Headers) {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown"
  );
}

function cleanText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanPath(value: unknown) {
  const path = cleanText(value, 200);
  if (!path.startsWith("/") || path.startsWith("//")) return "";
  if (/^\/(admin|api|dev|_next)(\/|$)/.test(path)) return "";
  return path;
}

function cleanHref(value: unknown) {
  const href = cleanText(value, 300);
  if (!href) return "";
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  if (/^https:\/\/\S+$/i.test(href)) return href;
  if (/^mailto:\S+$/i.test(href)) return href.slice(0, 120);
  if (/^tel:[0-9+().\s-]{3,40}$/i.test(href)) return href;
  return "";
}

function cleanSection(value: unknown) {
  const id = cleanText(value, 80);
  return SECTION_ID.test(id) ? id : "";
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function parsePayload(body: unknown): Payload | null {
  const raw = asRecord(body);
  if (!raw) return null;
  const vid = cleanText(raw.vid, 36);
  const sid = cleanText(raw.sid, 36);
  const path = cleanPath(raw.path);
  if (!UUID.test(vid) || !UUID.test(sid) || !path) return null;

  const clicks: ClickIn[] = [];
  if (Array.isArray(raw.clicks)) {
    for (const item of raw.clicks.slice(0, 25)) {
      const row = asRecord(item);
      if (!row) continue;
      const label = cleanText(row.label, 120);
      const page = cleanPath(row.page);
      if (!label || !page) continue;
      clicks.push({
        label,
        href: cleanHref(row.href),
        section: cleanSection(row.section),
        page,
      });
    }
  }

  const watch: WatchIn[] = [];
  if (Array.isArray(raw.watch)) {
    for (const item of raw.watch.slice(0, 40)) {
      const row = asRecord(item);
      if (!row) continue;
      const id = cleanSection(row.id);
      if (!id) continue;
      const ms = Math.min(60_000, Math.max(0, Math.round(Number(row.ms))));
      const view = row.view === true;
      if (!Number.isFinite(ms) || (ms < 250 && !view)) continue;
      watch.push({
        id,
        label: cleanText(row.label, 80),
        ms: ms >= 250 ? ms : 0,
        view,
      });
    }
  }

  const pageview = raw.pageview === true;
  if (!pageview && clicks.length === 0 && watch.length === 0) return null;
  return { vid, sid, path, pageview, clicks, watch };
}

function readGeo(headers: Headers) {
  const countryRaw = (
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    ""
  ).toUpperCase();
  const country = /^[A-Z]{2}$/.test(countryRaw) && countryRaw !== "XX" ? countryRaw : "";
  let city = headers.get("x-vercel-ip-city") || "";
  try {
    city = decodeURIComponent(city);
  } catch {
    /* keep the raw header */
  }
  city = city.replace(/\+/g, " ").replace(/\s+/g, " ").trim().slice(0, 80);
  return { country, city };
}

function clickId(click: ClickIn) {
  return createHash("sha256")
    .update([click.page, click.section, click.label, click.href].join("\u001f"))
    .digest("hex")
    .slice(0, 20);
}

export function isStatsBot(headers: Headers) {
  const ua = headers.get("user-agent") ?? "";
  if (!ua || BOT.test(ua)) return true;
  const purpose = `${headers.get("purpose") ?? ""} ${headers.get("sec-purpose") ?? ""}`;
  return purpose.includes("prefetch");
}

/** Accept a behaviour batch. Drops quietly when storage is missing, rate-limited, or the body is junk. */
export async function recordStats(body: unknown, headers: Headers) {
  const store = openStats();
  const payload = parsePayload(body);
  if (!store || !payload) return;

  try {
    if (!(await store.allow(clientIp(headers)))) return;

    const day = todayKey();
    const newSession = await store.claimSession(statsKeys.session(payload.sid), SESSION_SECONDS);
    const batch = store.batch();

    if (payload.pageview) batch.incr(statsKeys.pageviews, day, 1);

    if (newSession) {
      batch.incr(statsKeys.visits, day, 1);
      batch.addUnique(statsKeys.uniques(day), payload.vid, STATS_RETENTION_SECONDS);

      const geo = readGeo(headers);
      batch.incr(statsKeys.country(day), geo.country || "??", 1, STATS_RETENTION_SECONDS);
      if (geo.country && geo.city) {
        batch.incr(statsKeys.city(day), `${geo.country}|${geo.city}`, 1, STATS_RETENTION_SECONDS);
      }
    }

    const clickMeta: Record<string, ClickIn> = {};
    const clickCounts = new Map<string, number>();
    for (const click of payload.clicks) {
      const id = clickId(click);
      clickCounts.set(id, (clickCounts.get(id) ?? 0) + 1);
      clickMeta[id] = click;
    }
    for (const [id, count] of clickCounts) {
      batch.incr(statsKeys.clicks(day), id, count, STATS_RETENTION_SECONDS);
    }
    if (clickCounts.size > 0) batch.set(statsKeys.clickMeta, clickMeta);

    const sectionMeta: Record<string, { label: string }> = {};
    const views = new Map<string, number>();
    const ms = new Map<string, number>();
    for (const row of payload.watch) {
      if (row.view) views.set(row.id, (views.get(row.id) ?? 0) + 1);
      if (row.ms > 0) ms.set(row.id, (ms.get(row.id) ?? 0) + row.ms);
      if (row.label) sectionMeta[row.id] = { label: row.label };
    }
    for (const [id, count] of views) {
      batch.incr(statsKeys.sectionViews(day), id, count, STATS_RETENTION_SECONDS);
    }
    for (const [id, amount] of ms) {
      batch.incr(statsKeys.sectionMs(day), id, amount, STATS_RETENTION_SECONDS);
    }
    if (Object.keys(sectionMeta).length > 0) batch.set(statsKeys.sectionMeta, sectionMeta);

    await batch.exec();
  } catch (error) {
    console.error("[stats] record failed:", error instanceof Error ? error.message : "unknown");
  }
}

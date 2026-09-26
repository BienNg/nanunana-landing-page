import "server-only";
import { sectionLabel } from "@/lib/stats/sections";
import { dayLabel, monthToDate, recentDays, todayKey, weekToDate } from "@/lib/stats/time";
import { statsKeys } from "@/lib/stats/redis";
import { openStats, type StatsMode } from "@/lib/stats/store";

export type RangeDays = 7 | 30 | 90;

export type Totals = { visits: number; pageviews: number; uniques: number };

export type Dashboard = {
  rangeDays: RangeDays;
  storage: StatsMode;
  updatedAt: string;
  today: Totals;
  week: Totals;
  month: Totals;
  range: Totals;
  series: { date: string; label: string; visits: number; pageviews: number }[];
  clicks: { label: string; href: string; section: string; page: string; count: number }[];
  sections: { id: string; label: string; views: number; watchMs: number }[];
  countries: { name: string; count: number }[];
  cities: { city: string; country: string; count: number }[];
};

type ClickMeta = { label?: string; href?: string; section?: string; page?: string };
type SectionMeta = { label?: string };

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

function asNum(value: unknown) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

function asObject<T>(value: unknown): T | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as T;
}

function sumDays(table: Record<string, unknown> | null, days: string[]) {
  if (!table) return 0;
  return days.reduce((sum, day) => sum + asNum(table[day]), 0);
}

function addCounts(target: Map<string, number>, row: Record<string, unknown> | null) {
  if (!row) return;
  for (const [field, value] of Object.entries(row)) {
    const n = asNum(value);
    if (n > 0) target.set(field, (target.get(field) ?? 0) + n);
  }
}

async function uniques(days: string[]) {
  const store = openStats();
  if (!store || days.length === 0) return 0;
  return store.countUnique(days.map(statsKeys.uniques));
}

function countryName(code: string) {
  if (!code || code === "??") return "Unknown";
  try {
    return regionNames.of(code) ?? code;
  } catch {
    return code;
  }
}

function topEntries(counts: Map<string, number>, limit: number) {
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}

export async function loadDashboard(
  rangeDays: RangeDays,
  updatedAt: string,
): Promise<
  { status: "unconfigured" } | { status: "error" } | { status: "ok"; dashboard: Dashboard }
> {
  const store = openStats();
  if (!store) return { status: "unconfigured" };

  try {
    const today = [todayKey()];
    const week = weekToDate();
    const month = monthToDate();
    const range = recentDays(rangeDays);

    const [visits, pageviews, uniqueCounts, clickRows, viewRows, msRows, countryRows, cityRows] =
      await Promise.all([
        store.hash(statsKeys.visits),
        store.hash(statsKeys.pageviews),
        Promise.all([uniques(today), uniques(week), uniques(month), uniques(range)]),
        store.hashes(range.map(statsKeys.clicks)),
        store.hashes(range.map(statsKeys.sectionViews)),
        store.hashes(range.map(statsKeys.sectionMs)),
        store.hashes(range.map(statsKeys.country)),
        store.hashes(range.map(statsKeys.city)),
      ]);

    const clickCounts = new Map<string, number>();
    const viewCounts = new Map<string, number>();
    const watchMs = new Map<string, number>();
    const countries = new Map<string, number>();
    const cities = new Map<string, number>();
    for (const row of clickRows) addCounts(clickCounts, row);
    for (const row of viewRows) addCounts(viewCounts, row);
    for (const row of msRows) addCounts(watchMs, row);
    for (const row of countryRows) addCounts(countries, row);
    for (const row of cityRows) addCounts(cities, row);

    const clickIds = topEntries(clickCounts, 40).map(([id]) => id);
    const sectionIds = [...new Set([...viewCounts.keys(), ...watchMs.keys()])];
    const [clickMeta, sectionMeta] = await Promise.all([
      clickIds.length ? store.fields(statsKeys.clickMeta, clickIds) : null,
      sectionIds.length ? store.fields(statsKeys.sectionMeta, sectionIds) : null,
    ]);

    const totals = (days: string[], unique: number): Totals => ({
      visits: sumDays(visits, days),
      pageviews: sumDays(pageviews, days),
      uniques: unique,
    });

    return {
      status: "ok",
      dashboard: {
        rangeDays,
        storage: store.mode,
        updatedAt,
        today: totals(today, uniqueCounts[0]),
        week: totals(week, uniqueCounts[1]),
        month: totals(month, uniqueCounts[2]),
        range: totals(range, uniqueCounts[3]),
        series: [...range].reverse().map((date) => ({
          date,
          label: dayLabel(date),
          visits: asNum(visits?.[date]),
          pageviews: asNum(pageviews?.[date]),
        })),
        clicks: clickIds.map((id) => {
          const meta = asObject<ClickMeta>(clickMeta?.[id]);
          const section = meta?.section ?? "";
          return {
            label: meta?.label || id,
            href: meta?.href || "",
            section: sectionLabel(section),
            page: meta?.page || "",
            count: clickCounts.get(id) ?? 0,
          };
        }),
        sections: sectionIds
          .map((id) => {
            const meta = asObject<SectionMeta>(sectionMeta?.[id]);
            return {
              id,
              label: sectionLabel(id, meta?.label),
              views: viewCounts.get(id) ?? 0,
              watchMs: watchMs.get(id) ?? 0,
            };
          })
          .sort((a, b) => b.watchMs - a.watchMs || b.views - a.views),
        countries: topEntries(countries, 30).map(([code, count]) => ({
          name: countryName(code),
          count,
        })),
        cities: topEntries(cities, 30).map(([field, count]) => {
          const split = field.indexOf("|");
          const code = split === -1 ? "" : field.slice(0, split);
          const city = split === -1 ? field : field.slice(split + 1);
          return { city, country: countryName(code), count };
        }),
      },
    };
  } catch (error) {
    console.error("[stats] query failed:", error instanceof Error ? error.message : "unknown");
    return { status: "error" };
  }
}

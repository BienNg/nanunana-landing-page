/** Calendar dates in Vietnam (UTC+7, no daylight saving). */

const TZ = "Asia/Ho_Chi_Minh";
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export type VietnamDate = { y: number; m: number; d: number; weekday: number };

export function vietnamNow(now = new Date()): VietnamDate {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return {
    y: Number(get("year")),
    m: Number(get("month")),
    d: Number(get("day")),
    weekday: weekdayMap[get("weekday")] ?? 0,
  };
}

export function formatDay(y: number, m: number, d: number) {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function todayKey(now = new Date()) {
  const { y, m, d } = vietnamNow(now);
  return formatDay(y, m, d);
}

/** `n` calendar days ending today, oldest first. */
export function recentDays(n: number, now = new Date()): string[] {
  const { y, m, d } = vietnamNow(now);
  const cursor = new Date(Date.UTC(y, m - 1, d, 12));
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const t = new Date(cursor);
    t.setUTCDate(cursor.getUTCDate() - i);
    days.push(formatDay(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate()));
  }
  return days;
}

/** Monday through today, Vietnam time. */
export function weekToDate(now = new Date()): string[] {
  const { weekday } = vietnamNow(now);
  const sinceMonday = weekday === 0 ? 6 : weekday - 1;
  return recentDays(sinceMonday + 1, now);
}

/** The 1st of this month through today, Vietnam time. */
export function monthToDate(now = new Date()): string[] {
  return recentDays(vietnamNow(now).d, now);
}

export function dayLabel(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1, 12));
  return `${WEEKDAYS[date.getUTCDay()]} ${d}/${m}`;
}

export function formatStamp(now = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);
}

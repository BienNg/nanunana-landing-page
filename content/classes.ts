/**
 * Copy and display helpers for the live class list (Klassen Datenbank).
 */
import type { CourseLevel } from "@/components/ui/CourseBadge";
import type { CourseValue } from "./form-options";

export const runningClassesSection = {
  eyebrow: "Lịch lớp",
  title: "Lớp đang diễn ra",
  intro: "Các lớp đang học hiện tại. Đăng ký tư vấn để giữ chỗ trong lớp phù hợp.",
  register: "Đăng ký",
  columns: {
    name: "Lớp",
    level: "Trình độ",
    begin: "Bắt đầu",
    end: "Kết thúc",
    students: "Sĩ số",
  },
};

/** CEFR family used for the badge color. Sub-levels like A2.1 keep their own label. */
export function levelTone(level: string): CourseLevel | null {
  const n = level.toLowerCase();
  if (n.includes("a1")) return "A1";
  if (n.includes("a2")) return "A2";
  if (n.includes("b1")) return "B1";
  if (n.includes("b2")) return "B2";
  if (n.includes("c1")) return "C1";
  if (n.includes("kommunikation")) return "GT";
  return null;
}

/** Pre-selects the consultation form from a Notion Level value. */
export function courseValueForLevel(level: string | null): CourseValue | undefined {
  if (!level) return undefined;
  const n = level.toLowerCase();
  if (n.includes("ôn thi") || n.includes("on thi")) {
    if (n.includes("a1")) return "on-thi-a1";
    if (n.includes("a2")) return "on-thi-a2";
    if (n.includes("b1")) return "on-thi-b1";
    if (n.includes("b2")) return "on-thi-b2";
    return undefined;
  }
  if (n.startsWith("a1")) return "a1";
  if (n.startsWith("a2")) return "a2";
  if (n.startsWith("b1")) return "b1";
  if (n.startsWith("b2")) return "b2";
  if (n.startsWith("c1")) return "c1";
  if (n.includes("kommunikation")) return "giao-tiep";
  return undefined;
}

/** Date-only Notion values (`2026-09-14`) as dd/mm/yyyy, without a timezone shift. */
export function formatClassDate(iso: string | null): string {
  if (!iso) return "—";
  const [y, m, d] = iso.slice(0, 10).split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

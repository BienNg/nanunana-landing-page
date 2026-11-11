/**
 * Copy and display helpers for the live class list (Klassen Datenbank).
 * Class names stay as stored in Notion. Labels and dates follow the page language.
 */
import type { Locale } from "@/lib/i18n/locale";
import { dictionary } from "@/lib/i18n/dictionary";
import type { CourseLevel } from "@/components/ui/CourseBadge";
import type { CourseValue } from "./form-options";

export const runningClassesSection = dictionary(
  {
    eyebrow: "Lịch lớp",
    title: "Lớp đang diễn ra",
    intro: "Các lớp đang học hiện tại. Đăng ký tư vấn để giữ chỗ trong lớp phù hợp.",
    register: "Đăng ký",
    seeAll: (count: number) => `Xem tất cả ${count} lớp`,
    page: {
      title: "Lịch học tiếng Đức",
      metaTitle: "Lịch học tiếng Đức A1–C1",
      description:
        "Các lớp tiếng Đức đang học tại NaNu NaNa: trình độ, địa điểm (Hà Nội, Sài Gòn, online) và ngày bắt đầu, kết thúc. Đăng ký tư vấn để giữ chỗ.",
      intro:
        "Tất cả lớp đang học tại Hà Nội, Sài Gòn và online. Danh sách được cập nhật thường xuyên. Đăng ký tư vấn để giữ chỗ trong lớp phù hợp với trình độ và lịch của bạn.",
    },
    jump: {
      label: "Chuyển phần",
      previous: "Trước",
      next: "Sau",
      previousLabel: "Lên phần trước",
      nextLabel: "Xuống phần sau",
    },
    columns: {
      name: "Lớp",
      level: "Trình độ",
      format: "Hình thức",
      location: "Địa điểm",
      begin: "Bắt đầu",
      end: "Kết thúc",
      media: "Ảnh",
    },
  },
  {
    eyebrow: "Kursplan",
    title: "Laufende Kurse",
    intro: "Kurse, die gerade laufen. Fragen Sie eine Beratung an, um einen Platz zu sichern.",
    register: "Anmelden",
    seeAll: (count: number) => `Alle ${count} Kurse ansehen`,
    page: {
      title: "Kursplan Deutsch",
      metaTitle: "Kursplan Deutsch A1–C1",
      description:
        "Laufende Deutschkurse bei NaNu NaNa: Niveau, Ort (Hanoi, Saigon, online) sowie Beginn und Ende. Fragen Sie eine Beratung an, um einen Platz zu sichern.",
      intro:
        "Alle laufenden Kurse in Hanoi, Saigon und online. Die Liste wird regelmäßig aktualisiert. Fragen Sie eine Beratung an, um einen Platz in einem Kurs zu sichern, der zu Niveau und Zeitplan passt.",
    },
    jump: {
      label: "Abschnitt wechseln",
      previous: "Zurück",
      next: "Weiter",
      previousLabel: "Zum vorherigen Abschnitt",
      nextLabel: "Zum nächsten Abschnitt",
    },
    columns: {
      name: "Kurs",
      level: "Niveau",
      format: "Format",
      location: "Ort",
      begin: "Beginn",
      end: "Ende",
      media: "Fotos",
    },
  },
);

const locationLabels: Record<Locale, Record<string, string>> = {
  vi: {
    Hanoi: "Hà Nội",
    Saigon: "Sài Gòn",
    "Online VN": "Online VN",
    "Online DE": "Online Đức",
  },
  de: {
    Hanoi: "Hanoi",
    Saigon: "Saigon",
    "Online VN": "Online Vietnam",
    "Online DE": "Online Deutschland",
  },
};

/** Notion Location select, shown in the page language when we know the option. */
export function locationLabel(locale: Locale, value: string) {
  return locationLabels[locale][value] ?? value;
}

/** Sentence placed in the consultation message when someone registers for a class. */
export function classRegisterMessage(
  locale: Locale,
  item: { name: string; location: string | null },
) {
  const place = item.location ? locationLabel(locale, item.location) : "";
  const label = place ? `${item.name} (${place})` : item.name;
  if (locale === "de") return `Ich möchte mich für den Kurs ${label} anmelden.`;
  return `Tôi muốn đăng ký tham gia khóa học ${label}`;
}

export function classCountLabel(locale: Locale, count: number) {
  if (locale === "de") return count === 1 ? "1 laufender Kurs" : `${count} laufende Kurse`;
  return `${count} lớp đang học`;
}

export function classRegisterSr(locale: Locale, name: string) {
  return locale === "de" ? ` Kurs ${name}` : ` lớp ${name}`;
}

export function classPhotoLabel(locale: Locale, name: string) {
  return locale === "de" ? `Foto des Kurses ${name}` : `Ảnh lớp ${name}`;
}

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
  if (n.includes("ôn thi") || n.includes("on thi") || n.includes("prüfung")) {
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

/** Date-only Notion values (`2026-09-14`), without a timezone shift. */
export function formatClassDate(iso: string | null, locale: Locale): string {
  if (!iso) return "—";
  const [y, m, d] = iso.slice(0, 10).split("-");
  if (!y || !m || !d) return iso;
  return locale === "de" ? `${d}.${m}.${y}` : `${d}/${m}/${y}`;
}

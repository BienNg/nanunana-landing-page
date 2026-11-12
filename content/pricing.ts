/**
 * Course fees, from NaNu NaNa's price list, confirmed by the owner on 2026-11-12.
 * One price per full level (A1 = A1.1 + A1.2), the same online and on site.
 * The early price applies when the fee is paid at least one week before the
 * course starts. C1 is not on the price list yet, so it stays unverified.
 */
import type { CourseSlug } from "./course-levels";
import type { Locale } from "@/lib/i18n/locale";
import { ok, verify, type Claim } from "./verify";

export type CourseFee = { regular: number; early: number };

export const courseFees: Record<CourseSlug, Claim<CourseFee | null>> = {
  a1: ok({ regular: 13_800_000, early: 11_800_000 }),
  a2: ok({ regular: 14_500_000, early: 12_300_000 }),
  b1: ok({ regular: 15_000_000, early: 12_800_000 }),
  b2: ok({ regular: 17_300_000, early: 13_800_000 }),
  c1: verify(null, "Học phí khoá C1 (giá gốc và giá đóng sớm)?"),
};

export function formatVnd(amount: number): string {
  return `${amount.toLocaleString("de-DE")} VND`;
}

export const pricingCopy = {
  vi: {
    regular: "Học phí cả khoá",
    early: "Đóng sớm",
    earlyCondition: "khi đóng học phí trước ngày khai giảng ít nhất 1 tuần",
    onRequest: "Liên hệ để nhận học phí",
    sameForAll: "Áp dụng cho cả lớp online và lớp tại trung tâm.",
    app: "Tặng kèm app học tiếng Đức (mua ngoài 49 €, khoảng 1.300.000 VND).",
    refund:
      "Hoàn lại 100% học phí nếu bạn không hài lòng sau 2 buổi học đầu (chỉ áp dụng cho lớp online).",
  },
  de: {
    regular: "Gebühr für den ganzen Kurs",
    early: "Bei früher Zahlung",
    earlyCondition: "wenn Sie mindestens 1 Woche vor Kursbeginn zahlen",
    onRequest: "Gebühr auf Anfrage",
    sameForAll: "Gilt für Online-Kurse und Kurse vor Ort.",
    app: "Inklusive Lern-App (einzeln 49 €, ca. 1.300.000 VND).",
    refund:
      "100 % Geld zurück, wenn Sie nach den ersten 2 Einheiten nicht zufrieden sind (nur Online-Kurse).",
  },
} as const satisfies Record<Locale, Record<string, string>>;

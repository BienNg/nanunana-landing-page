/** Copy for the Google reviews section (`#cam-nhan`). Reviews themselves come from Places API. */
import { dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locale";

export const testimonialsSection = dictionary(
  {
    eyebrow: "Cảm nhận học viên",
    title: "Học viên nói gì về NaNu NaNa",
    intro: "Đánh giá công khai trên Google.",
    readOnGoogle: "Đọc trên Google",
    allReviews: "Xem tất cả đánh giá",
    newTab: "(mở trong tab mới)",
    onGoogle: "trên Google (mở trong tab mới)",
    previous: "Câu chuyện trước",
    next: "Câu chuyện tiếp theo",
    choose: "Chọn câu chuyện",
  },
  {
    eyebrow: "Stimmen",
    title: "Was Lernende über NaNu NaNa sagen",
    intro: "Öffentliche Bewertungen auf Google.",
    readOnGoogle: "Auf Google lesen",
    allReviews: "Alle Bewertungen ansehen",
    newTab: "(öffnet in neuem Tab)",
    onGoogle: "auf Google (öffnet in neuem Tab)",
    previous: "Vorherige Stimme",
    next: "Nächste Stimme",
    choose: "Stimme wählen",
  },
);

export function reviewCountLabel(locale: Locale, count: number) {
  if (locale === "de") return count === 1 ? "1 Bewertung" : `${count} Bewertungen`;
  return `${count} đánh giá`;
}

export function starsLabel(locale: Locale, filled: number) {
  return locale === "de" ? `${filled} von 5 Sternen` : `${filled} trên 5 sao`;
}

export function carouselPosition(locale: Locale, index: number, total: number) {
  return locale === "de" ? `Position ${index} von ${total}` : `Vị trí ${index} / ${total}`;
}

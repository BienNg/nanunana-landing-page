import { site } from "./site";
import type { Locale } from "@/lib/i18n/locale";

export const locationSlugs = ["ha-noi", "ho-chi-minh"] as const;
export type LocationSlug = (typeof locationSlugs)[number];
export function isLocationSlug(value: string): value is LocationSlug {
  return locationSlugs.some((slug) => slug === value);
}
export const locationHref = (slug: LocationSlug) => `/dia-diem/${slug}`;
export function locationFor(slug: LocationSlug) {
  const hanoi = slug === "ha-noi";
  const source = hanoi ? site.addressHanoi : site.address;
  return {
    id: hanoi ? "hanoi" : "hcm",
    city: hanoi ? "Hà Nội" : "Hồ Chí Minh",
    cityDe: hanoi ? "Hanoi" : "Ho-Chi-Minh-Stadt",
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: source.street,
      addressLocality: source.city,
      ...(!hanoi ? { postalCode: site.address.postalCode } : {}),
      addressCountry: "VN",
    },
    fullAddress: `${source.street}, ${source.city}, Việt Nam`,
  };
}
export function locationMapHref(slug: LocationSlug) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationFor(slug).fullAddress)}`;
}
export function locationTitle(locale: Locale, slug: LocationSlug) {
  const location = locationFor(slug);
  return locale === "de" ? `Deutsch in ${location.cityDe}` : `Tiếng Đức tại ${location.city}`;
}
export function locationDescription(locale: Locale, slug: LocationSlug) {
  const location = locationFor(slug);
  return locale === "de"
    ? `NaNu NaNa in ${location.cityDe}: Adresse, Kontakt und Anfahrt. Informieren Sie sich über Deutschkurse und die Beratung zu Studium und Ausbildung in Deutschland.`
    : `NaNu NaNa tại ${location.city}: địa chỉ, liên hệ và chỉ đường. Tìm hiểu khóa tiếng Đức và tư vấn du học đại học, du học nghề Đức.`;
}
export const locationCopy = {
  vi: {
    intro:
      "Tìm địa chỉ NaNu NaNa, xem đường đi và liên hệ để trao đổi về việc học tiếng Đức hoặc kế hoạch học tập tại Đức.",
    address: "Địa chỉ trung tâm",
    map: "Xem địa chỉ trên Google Maps",
    hotline: "Hotline chung của NaNu NaNa",
    visit: "Trước khi đến trung tâm",
    visitText:
      "Hãy liên hệ trước để xác nhận thời gian tư vấn và lịch lớp phù hợp với trình độ của bạn. Bạn có thể cho biết trình độ hiện tại, thời gian có thể học và mục tiêu học tiếng Đức.",
    enquiry: "Hỏi tư vấn tại trung tâm này",
    courses: "Tìm hiểu các trình độ tiếng Đức",
    coursesText:
      "Khám phá nội dung khóa học A1–C1 của NaNu NaNa. Liên hệ trung tâm để xác nhận lớp đang mở, hình thức học, học phí và lịch học tại địa điểm này.",
    pathways: "Tư vấn lộ trình học tập tại Đức",
    pathwaysText:
      "Nếu bạn đang tìm hiểu việc học tập tại Đức, bạn có thể đọc hướng dẫn trước rồi trao đổi với NaNu NaNa về hoàn cảnh và kế hoạch của mình.",
    university: "Du học đại học Đức",
    vocational: "Du học nghề Đức",
    other: "Địa điểm khác của NaNu NaNa",
    message: (city: string) => `Tôi muốn được tư vấn tại NaNu NaNa ${city}.`,
  },
  de: {
    intro:
      "Hier finden Sie die Adresse und den Kontakt von NaNu NaNa. Sprechen Sie mit uns über Deutschlernen oder Ihre Studien- und Ausbildungspläne in Deutschland.",
    address: "Adresse des Standorts",
    map: "Adresse auf Google Maps öffnen",
    hotline: "Zentrale Hotline von NaNu NaNa",
    visit: "Vor Ihrem Besuch",
    visitText:
      "Kontaktieren Sie uns vorab, um einen Beratungstermin und passende Kurszeiten abzustimmen. Teilen Sie uns Ihr aktuelles Sprachniveau, Ihre verfügbaren Zeiten und Ihr Lernziel mit.",
    enquiry: "Beratung an diesem Standort anfragen",
    courses: "Deutschkurse von A1 bis C1 entdecken",
    coursesText:
      "Informieren Sie sich über die Kursinhalte von NaNu NaNa. Bitte erfragen Sie am Standort die aktuell verfügbaren Klassen, Unterrichtsformen, Gebühren und Termine.",
    pathways: "Beratung zu Bildungswegen in Deutschland",
    pathwaysText:
      "Lesen Sie unsere Informationen zu Studium und Ausbildung und besprechen Sie anschließend Ihre persönliche Situation und Ihre Pläne mit NaNu NaNa.",
    university: "Studium in Deutschland",
    vocational: "Ausbildung in Deutschland",
    other: "Weiterer Standort von NaNu NaNa",
    message: (city: string) => `Ich möchte eine Beratung bei NaNu NaNa in ${city} anfragen.`,
  },
};

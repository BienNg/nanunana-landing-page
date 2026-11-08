/**
 * Company facts, contact channels and social links.
 * Source: docs/old-site-content.md + kickoff brief.
 * Street addresses stay as written. Public copy is in `siteCopy`.
 */
import { dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locale";
import { ok, verify, type Claim } from "./verify";

export type Office = { id: "hcm" | "hanoi" | "stuttgart"; city: string; address?: Claim };

const hanoiAddress = ok(
  "Tầng 2, tòa Trung Yên 1, số 1 Vũ Phạm Hàm, Phường Yên Hòa, Thành phố Hà Nội",
);
const stuttgartAddress = verify("", "Địa chỉ văn phòng Stuttgart?");

export const site = {
  name: "NaNu NaNa",
  legalName: "CÔNG TY TNHH TƯ VẤN DU HỌC QUỐC TẾ NANU NANA",
  director: "Phương Nguyễn",

  phone: {
    display: "+84 862 934 989",
    href: "tel:+84862934989",
    e164: "+84862934989",
  },
  email: "contact@nanunana-tiengduc.com",

  address: {
    street: "181 Đ. Cao Thắng, Phường 12, Quận 10",
    city: "Thành phố Hồ Chí Minh",
    postalCode: "70000",
    countryCode: "VN",
  },

  addressHanoi: {
    street: "Tầng 2, tòa Trung Yên 1, số 1 Vũ Phạm Hàm, Phường Yên Hòa",
    city: "Thành phố Hà Nội",
  },

  /** Direct chat channels — used by header, contact section and mobile CTA bar. */
  channels: {
    zalo: "https://zalo.me/84862934989",
    messenger: "https://m.me/100573835262458",
    whatsapp: "https://wa.me/message/UX6NFHBSYXPLM1",
  },

  socials: [
    { id: "facebook", label: "Facebook", href: "https://www.facebook.com/nanunanaduhocduc" },
    { id: "zalo", label: "Zalo", href: "https://zalo.me/84862934989" },
    { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@phuongnguyenvlogg" },
    {
      id: "youtube",
      label: "YouTube",
      href: "https://www.youtube.com/@nanunana-duhocuc5877/featured",
    },
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/nanu_nana_duhocduc/" },
  ],
} as const;

export type SocialId = (typeof site.socials)[number]["id"];

export const siteCopy = dictionary(
  {
    tagline: "Du Học Đức",
    fullName: "NaNu NaNa – Du Học Đức",
    slogan: "Nhắc đến du học Đức là nhắc đến NaNu NaNa — Chất lượng và sự tử tế",
    description:
      "Trung tâm tiếng Đức và tư vấn du học Đức: khoá học A1–C1, du học đại học và du học nghề (Ausbildung).",
    country: "Việt Nam",
    officeHcm: "Hồ Chí Minh",
    officeHanoi: "Hà Nội",
    /** Footer extras that are not confirmed yet. */
    license: verify("Giấy phép tư vấn du học", "Số giấy phép / link giấy phép tư vấn du học?"),
    metaTitle: "NaNu NaNa – Du Học Đức | Tiếng Đức A1–C1, Du học đại học & Du học nghề",
    metaTitleTemplate: "%s | NaNu NaNa – Du Học Đức",
    metaDescription:
      "Nhắc đến du học Đức là nhắc đến NaNu NaNa — Chất lượng và sự tử tế. Khoá học tiếng Đức A1–C1, tư vấn du học đại học và du học nghề (Ausbildung) tại Đức.",
    homeLabel: "Trang chủ",
    rights: "Bảo lưu mọi quyền.",
    directorLabel: "Giám đốc",
    ogKicker: "Tiếng Đức A1–C1 · Du học đại học · Du học nghề",
    ogMotto: "Chất lượng và sự tử tế",
    ogPlaces: "Hồ Chí Minh · Hà Nội · Stuttgart",
  },
  {
    tagline: "Studium in Deutschland",
    fullName: "NaNu NaNa – Studium in Deutschland",
    slogan: "Wer an ein Studium in Deutschland denkt, denkt an NaNu NaNa — Qualität und Anstand",
    description: "Deutschkurse und Beratung für Deutschland: A1–C1, Studium und Ausbildung.",
    country: "Vietnam",
    officeHcm: "Ho-Chi-Minh-Stadt",
    officeHanoi: "Hanoi",
    license: verify("Lizenz für Studienberatung", "Số giấy phép / link giấy phép tư vấn du học?"),
    metaTitle: "NaNu NaNa – Studium in Deutschland | Deutsch A1–C1, Studium & Ausbildung",
    metaTitleTemplate: "%s | NaNu NaNa – Studium in Deutschland",
    metaDescription:
      "Wer an ein Studium in Deutschland denkt, denkt an NaNu NaNa — Qualität und Anstand. Deutschkurse A1–C1, Beratung zum Studium und zur Ausbildung in Deutschland.",
    homeLabel: "Startseite",
    rights: "Alle Rechte vorbehalten.",
    directorLabel: "Geschäftsführerin",
    ogKicker: "Deutsch A1–C1 · Studium · Ausbildung",
    ogMotto: "Qualität und Anstand",
    ogPlaces: "Ho-Chi-Minh-Stadt · Hanoi · Stuttgart",
  },
);

export function siteFor(locale: Locale) {
  const copy = siteCopy[locale];
  return {
    ...site,
    tagline: copy.tagline,
    fullName: copy.fullName,
    slogan: copy.slogan,
    description: copy.description,
    country: copy.country,
    address: { ...site.address, country: copy.country },
    addressHanoi: { ...site.addressHanoi, country: copy.country },
    offices: [
      { id: "hcm", city: copy.officeHcm },
      { id: "hanoi", city: copy.officeHanoi, address: hanoiAddress },
      { id: "stuttgart", city: "Stuttgart", address: stuttgartAddress },
    ] satisfies Office[],
    license: copy.license,
    homeLabel: copy.homeLabel,
    rights: copy.rights,
    directorLabel: copy.directorLabel,
  };
}

/**
 * Company facts, contact channels and social links.
 * Source: docs/old-site-content.md + kickoff brief.
 */
import { ok, verify, type Claim } from "./verify";

export type Office = { city: string; address?: Claim };

export const site = {
  name: "NaNu NaNa",
  tagline: "Du Học Đức",
  fullName: "NaNu NaNa – Du Học Đức",
  legalName: "CÔNG TY TNHH TƯ VẤN DU HỌC QUỐC TẾ NANU NANA",
  slogan: "Nhắc đến du học Đức là nhắc đến NaNu NaNa — Chất lượng và sự tử tế",
  description:
    "Trung tâm tiếng Đức và tư vấn du học Đức: khoá học A1–C1, du học đại học và du học nghề (Ausbildung).",
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
    country: "Việt Nam",
    countryCode: "VN",
  },

  addressHanoi: {
    street: "Tầng 2, tòa Trung Yên 1, số 1 Vũ Phạm Hàm, Phường Yên Hòa",
    city: "Thành phố Hà Nội",
    country: "Việt Nam",
  },

  offices: [
    { city: "Hồ Chí Minh", address: undefined },
    {
      city: "Hà Nội",
      address: ok("Tầng 2, tòa Trung Yên 1, số 1 Vũ Phạm Hàm, Phường Yên Hòa, Thành phố Hà Nội"),
    },
    { city: "Stuttgart", address: verify("", "Địa chỉ văn phòng Stuttgart?") },
  ] satisfies Office[],

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

  /** Footer extras that are not confirmed yet. */
  license: verify("Giấy phép tư vấn du học", "Số giấy phép / link giấy phép tư vấn du học?"),
} as const;

export type SocialId = (typeof site.socials)[number]["id"];

/**
 * Section anchor ids (single source of truth) and navigation.
 * Ids stay Vietnamese on both languages so hashes and stats stay put.
 * /niveau, /du-hoc-duc and /du-hoc-nghe are real pages (old Webflow URLs).
 */
import { dictionary } from "@/lib/i18n/dictionary";

export const sectionIds = {
  hero: "trang-chu",
  about: "ve-chung-toi",
  founder: "ve-phuong",
  courses: "khoa-hoc",
  learningApp: "ung-dung",
  classes: "lop-dang-dien-ra",
  pathways: "lo-trinh-du-hoc",
  university: "du-hoc-dai-hoc",
  vocational: "du-hoc-nghe",
  process: "lo-trinh",
  processUniversity: "lo-trinh-dai-hoc",
  processVocational: "lo-trinh-nghe",
  team: "doi-ngu",
  testimonials: "cam-nhan",
  gallery: "hanh-trinh",
  faq: "hoi-dap",
  contact: "tu-van",
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];

export type NavItem = {
  label: string;
  /** Section id on the home page, or an absolute route. Unprefixed; localize at render. */
  href: string;
  /** Section ids that should highlight this item while in view. */
  spy?: readonly SectionId[];
};

/** Old Webflow pathway URLs. Keys are the homepage section ids. */
export const pathwayPath = {
  "du-hoc-dai-hoc": "/du-hoc-duc",
  "du-hoc-nghe": "/du-hoc-nghe",
} as const;

const navItems = [
  { href: "/niveau" },
  { href: `/#${sectionIds.classes}`, spy: [sectionIds.classes] },
  { href: pathwayPath["du-hoc-dai-hoc"] },
  { href: pathwayPath["du-hoc-nghe"] },
  { href: `/#${sectionIds.about}`, spy: [sectionIds.about] },
  { href: "/tuyen-dung" },
] as const;

export const mainNav = dictionary<NavItem[]>(
  navItems.map((item, i) => ({
    ...item,
    label: [
      "Khoá Học",
      "Lớp đang diễn ra",
      "Du học đại học",
      "Du học nghề",
      "Về Chúng Tôi",
      "Tuyển Dụng",
    ][i]!,
  })),
  navItems.map((item, i) => ({
    ...item,
    label: ["Kurse", "Laufende Kurse", "Studium", "Ausbildung", "Über uns", "Karriere"][i]!,
  })),
);

export const contactHref = `/#${sectionIds.contact}`;
export const privacyHref = "/chinh-sach-bao-mat";
export const careersHref = "/tuyen-dung";

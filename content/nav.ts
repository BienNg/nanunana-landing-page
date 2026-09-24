/**
 * Section anchor ids (single source of truth) and navigation.
 * Old Webflow URLs redirect to these anchors — see next.config.ts.
 */
export const sectionIds = {
  hero: "trang-chu",
  about: "ve-chung-toi",
  founder: "ve-phuong",
  courses: "khoa-hoc",
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
  /** Section id on the home page, or an absolute route. */
  href: string;
  /** Section ids that should highlight this item while in view. */
  spy?: SectionId[];
};

export const mainNav: NavItem[] = [
  { label: "Khoá Học", href: `/#${sectionIds.courses}`, spy: [sectionIds.courses] },
  { label: "Du Học Đại Học", href: `/#${sectionIds.university}`, spy: [sectionIds.university] },
  { label: "Du Học Nghề", href: `/#${sectionIds.vocational}`, spy: [sectionIds.vocational] },
  { label: "Đội Ngũ", href: `/#${sectionIds.team}`, spy: [sectionIds.team] },
  { label: "Về Chúng Tôi", href: `/#${sectionIds.about}`, spy: [sectionIds.about] },
  { label: "Tuyển Dụng", href: "/tuyen-dung" },
];

export const contactHref = `/#${sectionIds.contact}`;
export const privacyHref = "/chinh-sach-bao-mat";
export const careersHref = "/tuyen-dung";

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

export type NavLink = {
  label: string;
  /** Section id on the home page, or an absolute route. Unprefixed; localize at render. */
  href: string;
  /** Section ids that should highlight this item while in view. */
  spy?: readonly SectionId[];
  /** Short helper line shown under the label in dropdowns. */
  hint?: string;
};

/** A top-level menu entry: a plain link, or a dropdown with its own links. */
export type NavItem = NavLink & { children?: NavLink[] };

/** Old Webflow pathway URLs. Keys are the homepage section ids. */
export const pathwayPath = {
  "du-hoc-dai-hoc": "/du-hoc-duc",
  "du-hoc-nghe": "/du-hoc-nghe",
} as const;

const levels = ["a1", "a2", "b1", "b2", "c1"] as const;

export const mainNav = dictionary<NavItem[]>(
  [
    {
      label: "Khoá học",
      href: "/niveau",
      children: [
        { label: "Tất cả khoá học", href: "/niveau", hint: "Lộ trình A1 đến C1" },
        ...levels.map((l) => ({ label: `Tiếng Đức ${l.toUpperCase()}`, href: `/niveau/${l}` })),
        {
          label: "Học tiếng Đức online",
          href: "/hoc-tieng-duc-online",
          hint: "Qua Zoom, buổi tối và cuối tuần",
        },
        { label: "Thi Goethe", href: "/thi-goethe", hint: "Cần mang gì, bao lâu có kết quả" },
        {
          label: "Lớp đang diễn ra",
          href: "/lich-hoc",
          hint: "Lịch lớp hiện tại",
        },
      ],
    },
    {
      label: "Du học Đức",
      href: pathwayPath["du-hoc-dai-hoc"],
      children: [
        {
          label: "Du học đại học",
          href: pathwayPath["du-hoc-dai-hoc"],
          hint: "Học đại học tại Đức",
        },
        { label: "Du học nghề", href: pathwayPath["du-hoc-nghe"], hint: "Ausbildung tại Đức" },
        {
          label: "Các ngành học nghề",
          href: "/du-hoc-nghe/cac-nganh",
          hint: "Điều dưỡng, nhà hàng, khách sạn, làm bánh",
        },
        {
          label: "Chi phí & visa",
          href: "/chi-phi-du-hoc-duc",
          hint: "Tài khoản phong tỏa, lệ phí, bảo hiểm",
        },
      ],
    },
    {
      label: "Về chúng tôi",
      href: `/#${sectionIds.about}`,
      spy: [sectionIds.about, sectionIds.founder, sectionIds.team],
      children: [
        {
          label: "Về NaNu NaNa",
          href: `/#${sectionIds.about}`,
          spy: [sectionIds.about],
          hint: "Câu chuyện và đội ngũ",
        },
        { label: "Hà Nội", href: "/dia-diem/ha-noi", hint: "Địa chỉ trung tâm" },
        { label: "TP. Hồ Chí Minh", href: "/dia-diem/ho-chi-minh", hint: "Địa chỉ trung tâm" },
        { label: "Tuyển dụng", href: "/tuyen-dung", hint: "Vị trí đang tuyển" },
      ],
    },
    { label: "Hỏi đáp", href: `/#${sectionIds.faq}`, spy: [sectionIds.faq] },
  ],
  [
    {
      label: "Kurse",
      href: "/niveau",
      children: [
        { label: "Alle Kurse", href: "/niveau", hint: "Der Weg von A1 bis C1" },
        ...levels.map((l) => ({ label: `Deutsch ${l.toUpperCase()}`, href: `/niveau/${l}` })),
        {
          label: "Deutsch online",
          href: "/hoc-tieng-duc-online",
          hint: "Über Zoom, abends und am Wochenende",
        },
        {
          label: "Goethe-Prüfung",
          href: "/thi-goethe",
          hint: "Was mitbringen, wann kommt das Ergebnis",
        },
        {
          label: "Laufende Kurse",
          href: "/lich-hoc",
          hint: "Aktueller Kursplan",
        },
      ],
    },
    {
      label: "Studium & Ausbildung",
      href: pathwayPath["du-hoc-dai-hoc"],
      children: [
        {
          label: "Studium in Deutschland",
          href: pathwayPath["du-hoc-dai-hoc"],
          hint: "An einer deutschen Hochschule",
        },
        {
          label: "Ausbildung in Deutschland",
          href: pathwayPath["du-hoc-nghe"],
          hint: "Berufsausbildung in Deutschland",
        },
        {
          label: "Ausbildungsberufe",
          href: "/du-hoc-nghe/cac-nganh",
          hint: "Pflege, Restaurant, Hotel, Bäcker",
        },
        {
          label: "Kosten & Visum",
          href: "/chi-phi-du-hoc-duc",
          hint: "Sperrkonto, Gebühr, Versicherung",
        },
      ],
    },
    {
      label: "Über uns",
      href: `/#${sectionIds.about}`,
      spy: [sectionIds.about, sectionIds.founder, sectionIds.team],
      children: [
        {
          label: "Über NaNu NaNa",
          href: `/#${sectionIds.about}`,
          spy: [sectionIds.about],
          hint: "Geschichte und Team",
        },
        { label: "Hanoi", href: "/dia-diem/ha-noi", hint: "Adresse des Standorts" },
        {
          label: "Ho-Chi-Minh-Stadt",
          href: "/dia-diem/ho-chi-minh",
          hint: "Adresse des Standorts",
        },
        { label: "Karriere", href: "/tuyen-dung", hint: "Offene Stellen" },
      ],
    },
    { label: "FAQ", href: `/#${sectionIds.faq}`, spy: [sectionIds.faq] },
  ],
);

export const contactHref = `/#${sectionIds.contact}`;
export const privacyHref = "/chinh-sach-bao-mat";
export const careersHref = "/tuyen-dung";

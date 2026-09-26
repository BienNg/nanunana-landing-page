/** English names for section ids on the marketing site. Unknown ids fall back to the stored heading. */
export const sectionLabels: Record<string, string> = {
  "trang-chu": "Home",
  "thanh-tich": "Stats",
  "ve-chung-toi": "About",
  "ve-phuong": "About Phương",
  "khoa-hoc": "Courses",
  "ung-dung": "Learning app",
  "lop-dang-dien-ra": "Current classes",
  "lo-trinh-du-hoc": "Study pathways",
  "du-hoc-dai-hoc": "University",
  "du-hoc-nghe": "Vocational training",
  "lo-trinh": "Process",
  "lo-trinh-dai-hoc": "University process",
  "lo-trinh-nghe": "Vocational process",
  "doi-ngu": "Team",
  "cam-nhan": "Testimonials",
  "hanh-trinh": "Gallery",
  "hoi-dap": "FAQ",
  "tu-van": "Contact",
  header: "Header",
  footer: "Footer",
  "mobile-cta": "Mobile contact bar",
  menu: "Mobile menu",
};

export function sectionLabel(id: string, stored?: string) {
  return sectionLabels[id] || stored || id || "Other";
}

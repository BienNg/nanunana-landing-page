/**
 * German courses. Descriptions and details are filled in Phase 4.
 */
import type { CourseLevel } from "@/components/ui/CourseBadge";
import type { CourseValue } from "./form-options";

export type Course = {
  id: string;
  level: CourseLevel;
  /** Short name used in footer and form. */
  name: string;
  formValue: CourseValue;
};

export const courses: Course[] = [
  { id: "a1", level: "A1", name: "Tiếng Đức A1", formValue: "a1" },
  { id: "a2", level: "A2", name: "Tiếng Đức A2", formValue: "a2" },
  { id: "b1", level: "B1", name: "Tiếng Đức B1", formValue: "b1" },
  { id: "b2", level: "B2", name: "Tiếng Đức B2", formValue: "b2" },
  { id: "c1", level: "C1", name: "Tiếng Đức C1", formValue: "c1" },
  { id: "giao-tiep", level: "GT", name: "Lớp Giao Tiếp", formValue: "giao-tiep" },
];

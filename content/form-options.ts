/**
 * Option lists for the consultation form. `value` is what is stored and sent
 * to Notion/email; it is also the URL param used for pre-filling
 * (e.g. `/?khoa=b1#tu-van`, `/?muc-tieu=du-hoc-nghe#tu-van`).
 */
export const courseOptions = [
  { value: "a1", label: "A1" },
  { value: "a2", label: "A2" },
  { value: "b1", label: "B1" },
  { value: "b2", label: "B2" },
  { value: "c1", label: "C1" },
  { value: "giao-tiep", label: "Giao tiếp" },
  { value: "on-thi-a1", label: "Ôn thi A1" },
  { value: "on-thi-a2", label: "Ôn thi A2" },
  { value: "on-thi-b1", label: "Ôn thi B1" },
  { value: "on-thi-b2", label: "Ôn thi B2" },
  { value: "khac", label: "Nguyện vọng khác" },
] as const;

export const goalOptions = [
  { value: "du-hoc-dai-hoc", label: "Du học đại học" },
  { value: "du-hoc-nghe", label: "Du học nghề (Ausbildung)" },
  { value: "hoc-tieng", label: "Học tiếng Đức" },
  { value: "dinh-huong", label: "Cần tư vấn định hướng" },
] as const;

export type CourseValue = (typeof courseOptions)[number]["value"];
export type GoalValue = (typeof goalOptions)[number]["value"];

export const courseValues = courseOptions.map((o) => o.value) as [CourseValue, ...CourseValue[]];
export const goalValues = goalOptions.map((o) => o.value) as [GoalValue, ...GoalValue[]];

export const prefillParams = { course: "khoa", goal: "muc-tieu" } as const;

/** Link to the consultation form with course and/or goal pre-selected. */
export function prefillHref(opts: { course?: CourseValue; goal?: GoalValue }) {
  const params = new URLSearchParams();
  if (opts.course) params.set(prefillParams.course, opts.course);
  if (opts.goal) params.set(prefillParams.goal, opts.goal);
  const q = params.toString();
  return `/${q ? `?${q}` : ""}#tu-van`;
}

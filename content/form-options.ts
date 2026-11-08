/**
 * Option lists for the consultation form. `value` is what is stored and sent
 * with the lead; it is also the URL param used for pre-filling
 * (e.g. `/?khoa=b1#tu-van`, `/?muc-tieu=du-hoc-nghe#tu-van`, `/?loi-nhan=…#tu-van`).
 * Values stay the same in both languages. Only labels change.
 */
import { dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locale";

const courseValuesList = [
  "a1",
  "a2",
  "b1",
  "b2",
  "c1",
  "giao-tiep",
  "on-thi-a1",
  "on-thi-a2",
  "on-thi-b1",
  "on-thi-b2",
  "khac",
] as const;

const goalValuesList = ["du-hoc-dai-hoc", "du-hoc-nghe", "hoc-tieng", "dinh-huong"] as const;

export type CourseValue = (typeof courseValuesList)[number];
export type GoalValue = (typeof goalValuesList)[number];

const viCourseLabels: Record<CourseValue, string> = {
  a1: "A1",
  a2: "A2",
  b1: "B1",
  b2: "B2",
  c1: "C1",
  "giao-tiep": "Giao tiếp",
  "on-thi-a1": "Ôn thi A1",
  "on-thi-a2": "Ôn thi A2",
  "on-thi-b1": "Ôn thi B1",
  "on-thi-b2": "Ôn thi B2",
  khac: "Nguyện vọng khác",
};

const deCourseLabels: Record<CourseValue, string> = {
  a1: "A1",
  a2: "A2",
  b1: "B1",
  b2: "B2",
  c1: "C1",
  "giao-tiep": "Konversation",
  "on-thi-a1": "Prüfungsvorbereitung A1",
  "on-thi-a2": "Prüfungsvorbereitung A2",
  "on-thi-b1": "Prüfungsvorbereitung B1",
  "on-thi-b2": "Prüfungsvorbereitung B2",
  khac: "Anderer Wunsch",
};

const viGoalLabels: Record<GoalValue, string> = {
  "du-hoc-dai-hoc": "Du học đại học",
  "du-hoc-nghe": "Du học nghề (Ausbildung)",
  "hoc-tieng": "Học tiếng Đức",
  "dinh-huong": "Cần tư vấn định hướng",
};

const deGoalLabels: Record<GoalValue, string> = {
  "du-hoc-dai-hoc": "Studium",
  "du-hoc-nghe": "Ausbildung",
  "hoc-tieng": "Deutsch lernen",
  "dinh-huong": "Ich brauche eine Orientierung",
};

function options<T extends string>(values: readonly T[], labels: Record<T, string>) {
  return values.map((value) => ({ value, label: labels[value] }));
}

export const courseOptions = dictionary(
  options(courseValuesList, viCourseLabels),
  options(courseValuesList, deCourseLabels),
);

export const goalOptions = dictionary(
  options(goalValuesList, viGoalLabels),
  options(goalValuesList, deGoalLabels),
);

export const courseValues = courseValuesList as unknown as [CourseValue, ...CourseValue[]];
export const goalValues = goalValuesList as unknown as [GoalValue, ...GoalValue[]];

export function courseLabel(locale: Locale, value: CourseValue) {
  return courseOptions[locale].find((option) => option.value === value)?.label ?? value;
}

export function goalLabel(locale: Locale, value: GoalValue) {
  return goalOptions[locale].find((option) => option.value === value)?.label ?? value;
}

export const prefillParams = { course: "khoa", goal: "muc-tieu", message: "loi-nhan" } as const;

/** Matches the consultation message field limit. */
export const prefillMessageMax = 1000;

/** Link to the consultation form with course, goal, and/or message pre-filled. */
export function prefillHref(opts: { course?: CourseValue; goal?: GoalValue; message?: string }) {
  const params = new URLSearchParams();
  if (opts.course) params.set(prefillParams.course, opts.course);
  if (opts.goal) params.set(prefillParams.goal, opts.goal);
  const message = opts.message?.trim().slice(0, prefillMessageMax);
  if (message) params.set(prefillParams.message, message);
  const q = params.toString();
  return `/${q ? `?${q}` : ""}#tu-van`;
}

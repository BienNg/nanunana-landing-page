/**
 * Consultation form schema — shared by the client (react-hook-form) and the
 * Server Action, so both validate with exactly the same rules and messages.
 */
import * as z from "zod/mini";
import { courseValues, goalValues } from "@/content/form-options";
import { isAcceptedPhone } from "./phone";

export { toE164 } from "./phone";

export const messages = {
  nameRequired: "Vui lòng nhập họ và tên của bạn.",
  nameShort: "Họ và tên cần ít nhất 2 ký tự.",
  nameLong: "Họ và tên tối đa 80 ký tự.",
  phoneRequired: "Vui lòng nhập số điện thoại hoặc Zalo để chúng tôi liên hệ.",
  phoneInvalid: "Vui lòng nhập số điện thoại hợp lệ, ví dụ 0988 123 456 (hoặc số Đức +49 151 …).",
  messageLong: "Nội dung tối đa 1000 ký tự.",
  choose: "Vui lòng chọn một mục trong danh sách.",
} as const;

const optionalText = (max: number) => z.string().check(z.trim(), z.maxLength(max));

// zod/mini: same rules as full Zod, but tree-shakeable (much smaller in the browser).
export const consultationSchema = z.object({
  name: z
    .string()
    .check(
      z.trim(),
      z.minLength(1, messages.nameRequired),
      z.minLength(2, messages.nameShort),
      z.maxLength(80, messages.nameLong),
    ),
  phone: z
    .string()
    .check(
      z.trim(),
      z.minLength(1, messages.phoneRequired),
      z.refine(isAcceptedPhone, messages.phoneInvalid),
    ),
  course: z.union([z.literal(""), z.enum(courseValues)], { error: messages.choose }),
  goal: z.union([z.literal(""), z.enum(goalValues)], { error: messages.choose }),
  message: z.string().check(z.trim(), z.maxLength(1000, messages.messageLong)),
  // Attribution (hidden fields)
  utm_source: optionalText(200),
  utm_medium: optionalText(200),
  utm_campaign: optionalText(200),
  utm_content: optionalText(200),
  fbclid: optionalText(500),
  landing_page: optionalText(2000),
  referrer: optionalText(2000),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
export type ConsultationField = keyof ConsultationInput;

/** Field names the user fills in (in form order) — used for error focus/ordering. */
export const visibleFields = [
  "name",
  "phone",
  "course",
  "goal",
  "message",
] as const satisfies readonly ConsultationField[];

export const attributionFields = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "fbclid",
  "landing_page",
  "referrer",
] as const satisfies readonly ConsultationField[];

/** Honeypot input name — must stay empty. Not part of the schema. */
export const HONEYPOT_FIELD = "company_website";

export const emptyConsultation: ConsultationInput = {
  name: "",
  phone: "",
  course: "",
  goal: "",
  message: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  fbclid: "",
  landing_page: "",
  referrer: "",
};

/** FormData → plain object with every schema key present (missing → ""). */
export function formDataToInput(fd: FormData): Record<ConsultationField, string> {
  const out = {} as Record<ConsultationField, string>;
  for (const key of Object.keys(emptyConsultation) as ConsultationField[]) {
    const v = fd.get(key);
    out[key] = typeof v === "string" ? v : "";
  }
  return out;
}

/**
 * Consultation form schema — shared by the client (react-hook-form) and the
 * Server Action, so both validate with exactly the same rules and messages.
 */
import { z } from "zod";
import { parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";
import { channelValues, courseValues, goalValues } from "@/content/form-options";

const ALLOWED_PHONE_COUNTRIES: CountryCode[] = ["VN", "DE"];

/** Parses a Vietnamese (0… / +84…) or German (+49…) number. */
function parsePhone(input: string) {
  const cleaned = input.replace(/[^\d+]/g, "").replace(/^00/, "+");
  const parsed = parsePhoneNumberFromString(cleaned, "VN");
  if (!parsed?.isValid() || !parsed.country || !ALLOWED_PHONE_COUNTRIES.includes(parsed.country)) {
    return null;
  }
  return parsed;
}

/** E.164 form (e.g. +84988123456) or null if the number is not accepted. */
export function toE164(input: string): string | null {
  return parsePhone(input)?.number ?? null;
}

export const messages = {
  nameRequired: "Vui lòng nhập họ và tên của bạn.",
  nameShort: "Họ và tên cần ít nhất 2 ký tự.",
  nameLong: "Họ và tên tối đa 80 ký tự.",
  phoneRequired: "Vui lòng nhập số điện thoại hoặc Zalo để chúng tôi liên hệ.",
  phoneInvalid: "Vui lòng nhập số điện thoại hợp lệ, ví dụ 0988 123 456 (hoặc số Đức +49 151 …).",
  emailInvalid: "Email chưa đúng định dạng, ví dụ ten@gmail.com.",
  messageLong: "Nội dung tối đa 1000 ký tự.",
  consent: "Vui lòng đồng ý để NaNu NaNa liên hệ với bạn.",
  choose: "Vui lòng chọn một mục trong danh sách.",
} as const;

const optionalText = (max: number) => z.string().trim().max(max);

export const consultationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, messages.nameRequired)
    .min(2, messages.nameShort)
    .max(80, messages.nameLong),
  phone: z
    .string()
    .trim()
    .min(1, messages.phoneRequired)
    .refine((v) => parsePhone(v) !== null, messages.phoneInvalid),
  email: z
    .string()
    .trim()
    .max(254, messages.emailInvalid)
    .refine((v) => v === "" || z.email().safeParse(v).success, messages.emailInvalid),
  course: z.union([z.literal(""), z.enum(courseValues)], { error: messages.choose }),
  goal: z.union([z.literal(""), z.enum(goalValues)], { error: messages.choose }),
  channel: z.enum(channelValues, { error: messages.choose }),
  message: z.string().trim().max(1000, messages.messageLong),
  // "yes" from FormData / checkbox value attribute, true/false from react-hook-form
  consent: z
    .union([z.string(), z.boolean()])
    .refine((v): boolean => v === "yes" || v === true, messages.consent),
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
  "email",
  "course",
  "goal",
  "channel",
  "message",
  "consent",
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
  email: "",
  course: "",
  goal: "",
  channel: "zalo",
  message: "",
  consent: false,
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
    out[key] = typeof v === "string" ? v : key === "channel" ? "zalo" : "";
  }
  return out;
}

/**
 * Job application form schema — shared by the client (react-hook-form) and the
 * Server Action. Positions are checked against the current role list.
 */
import * as z from "zod/mini";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n/locale";
import { attributionFields } from "./consultation";

export { HONEYPOT_FIELD } from "./consultation";

/** Pragmatic check: one @, no spaces, a dot in the domain. The confirmation email proves the rest. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

const optionalText = (max: number) => z.string().check(z.trim(), z.maxLength(max));

/** Messages the application schema needs besides the shared name messages. */
export type ApplicationMessages = {
  emailRequired: string;
  emailInvalid: string;
  roleRequired: string;
};

/**
 * `roles` are the allowed position values. They are passed in (not imported)
 * so the client bundle doesn't pull in every job description.
 */
export function applicationSchemaFor(
  locale: Locale,
  roles: readonly string[],
  copy: ApplicationMessages,
) {
  const messages = ui[locale].validation;
  return z.object({
    name: z
      .string()
      .check(
        z.trim(),
        z.minLength(1, messages.nameRequired),
        z.minLength(2, messages.nameShort),
        z.maxLength(80, messages.nameLong),
      ),
    email: z
      .string()
      .check(
        z.trim(),
        z.minLength(1, copy.emailRequired),
        z.maxLength(254, copy.emailInvalid),
        z.regex(EMAIL_PATTERN, copy.emailInvalid),
      ),
    role: z.string().check(z.refine((v) => roles.includes(v), copy.roleRequired)),
    // Attribution (hidden fields)
    utm_source: optionalText(200),
    utm_medium: optionalText(200),
    utm_campaign: optionalText(200),
    utm_content: optionalText(200),
    fbclid: optionalText(500),
    landing_page: optionalText(2000),
    referrer: optionalText(2000),
  });
}

export type ApplicationInput = z.infer<ReturnType<typeof applicationSchemaFor>>;
export type ApplicationField = keyof ApplicationInput;

export { attributionFields };

export const emptyApplication: ApplicationInput = {
  name: "",
  email: "",
  role: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  fbclid: "",
  landing_page: "",
  referrer: "",
};

/** FormData → plain object with every schema key present (missing → ""). */
export function formDataToApplication(fd: FormData): Record<ApplicationField, string> {
  const out = {} as Record<ApplicationField, string>;
  for (const key of Object.keys(emptyApplication) as ApplicationField[]) {
    const v = fd.get(key);
    out[key] = typeof v === "string" ? v : "";
  }
  return out;
}

export type ApplicationFieldErrors = Partial<Record<ApplicationField, string>>;

/** State returned by the application Server Action. Success redirects instead. */
export type ApplicationState =
  | { status: "idle" }
  | { status: "invalid"; fieldErrors: ApplicationFieldErrors; values: Record<string, string> }
  | {
      status: "error";
      reason: "rate_limited" | "captcha" | "delivery";
      message: string;
      values: Record<string, string>;
    };

export const initialApplicationState: ApplicationState = { status: "idle" };

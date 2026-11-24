"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  applicationRoleLabel,
  applicationRoleOptions,
  applicationSuccessHref,
  careersContent,
} from "@/content/careers";
import { ui } from "@/content/ui";
import { defaultLocale, isLocale, LOCALE_FIELD, localePath, type Locale } from "@/lib/i18n/locale";
import { deliverApplication, type Application } from "@/lib/leads/application";
import { checkRateLimit } from "@/lib/spam/ratelimit";
import { TURNSTILE_FIELD, verifyTurnstile } from "@/lib/spam/turnstile";
import {
  applicationSchemaFor,
  formDataToApplication,
  HONEYPOT_FIELD,
  type ApplicationField,
  type ApplicationFieldErrors,
  type ApplicationState,
} from "@/lib/validation/application";

/** Values echoed back so a no-JS re-render keeps what the user typed. */
function echo(raw: Record<ApplicationField, string>) {
  const { name, email, role } = raw;
  return { name, email, role };
}

async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

function localeFromForm(formData: FormData): Locale {
  const value = formData.get(LOCALE_FIELD);
  const text = typeof value === "string" ? value : null;
  return isLocale(text) ? text : defaultLocale;
}

export async function submitApplication(
  _prev: ApplicationState,
  formData: FormData,
): Promise<ApplicationState> {
  const raw = formDataToApplication(formData);
  const locale = localeFromForm(formData);
  const errors = ui[locale].errors;
  const successPath = (role: string) => localePath(locale, applicationSuccessHref(role));

  // 1. Honeypot: pretend success so bots learn nothing.
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    console.warn("[application:spam] honeypot filled — dropped");
    redirect(successPath(raw.role));
  }

  // 2. Validate with the shared schema.
  const roles = applicationRoleOptions(locale).map((o) => o.value);
  const parsed = applicationSchemaFor(locale, roles, careersContent(locale).form).safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: ApplicationFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ApplicationField | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "invalid", fieldErrors, values: echo(raw) };
  }
  const data = parsed.data;

  // 3. Rate limit + optional Turnstile.
  const ip = await clientIp();
  if (!(await checkRateLimit(ip))) {
    return {
      status: "error",
      reason: "rate_limited",
      message: errors.rateLimited,
      values: echo(raw),
    };
  }
  const token = formData.get(TURNSTILE_FIELD);
  if (!(await verifyTurnstile(typeof token === "string" ? token : null, ip))) {
    return { status: "error", reason: "captcha", message: errors.captcha, values: echo(raw) };
  }

  // 4. Deliver.
  const opt = (v: string) => v || undefined;
  const application: Application = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    locale,
    name: data.name,
    email: data.email.toLowerCase(),
    role: { value: data.role, label: applicationRoleLabel(locale, data.role) ?? data.role },
    attribution: {
      utmSource: opt(data.utm_source),
      utmMedium: opt(data.utm_medium),
      utmCampaign: opt(data.utm_campaign),
      utmContent: opt(data.utm_content),
      fbclid: opt(data.fbclid),
      landingPage: opt(data.landing_page),
      referrer: opt(data.referrer),
    },
  };

  const result = await deliverApplication(application);
  if (!result.ok) {
    return { status: "error", reason: "delivery", message: errors.delivery, values: echo(raw) };
  }

  // 5. Separate success page (outside any try/catch: redirect throws).
  redirect(successPath(data.role));
}

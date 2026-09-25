"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { courseOptions, goalOptions } from "@/content/form-options";
import { deliverLead } from "@/lib/leads";
import type { Lead } from "@/lib/leads/types";
import { checkRateLimit } from "@/lib/spam/ratelimit";
import { TURNSTILE_FIELD, verifyTurnstile } from "@/lib/spam/turnstile";
import {
  consultationSchema,
  formDataToInput,
  HONEYPOT_FIELD,
  toE164,
  type ConsultationField,
} from "@/lib/validation/consultation";
import type { ConsultationState, FieldErrors } from "@/lib/validation/consultation-state";

const labelOf = <T extends { value: string; label: string }>(list: readonly T[], v: string) =>
  list.find((o) => o.value === v);

/** Values echoed back so a no-JS re-render keeps what the user typed (no attribution/honeypot). */
function echo(raw: Record<ConsultationField, string>) {
  const { name, phone, course, goal, message } = raw;
  return { name, phone, course, goal, message };
}

async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

export async function submitConsultation(
  _prev: ConsultationState,
  formData: FormData,
): Promise<ConsultationState> {
  const raw = formDataToInput(formData);

  // 1. Honeypot: pretend success so bots learn nothing.
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    console.warn("[lead:spam] honeypot filled — dropped");
    return { status: "success" };
  }

  // 2. Validate with the shared schema.
  const parsed = consultationSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ConsultationField | undefined;
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
      message:
        "Bạn đã gửi nhiều yêu cầu trong thời gian ngắn. Vui lòng thử lại sau ít phút hoặc nhắn Zalo cho chúng tôi.",
      values: echo(raw),
    };
  }
  const token = formData.get(TURNSTILE_FIELD);
  if (!(await verifyTurnstile(typeof token === "string" ? token : null, ip))) {
    return {
      status: "error",
      reason: "captcha",
      message: "Chúng tôi chưa xác minh được bạn không phải robot. Vui lòng thử lại.",
      values: echo(raw),
    };
  }

  // 4. Normalise and deliver.
  const course = data.course ? labelOf(courseOptions, data.course) : undefined;
  const goal = data.goal ? labelOf(goalOptions, data.goal) : undefined;
  const opt = (v: string) => v || undefined;

  const lead: Lead = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name: data.name,
    phone: toE164(data.phone)!, // validated above
    phoneRaw: data.phone,
    course: course ? { value: course.value, label: course.label } : undefined,
    goal: goal ? { value: goal.value, label: goal.label } : undefined,
    message: opt(data.message),
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

  const result = await deliverLead(lead);
  if (!result.ok) {
    return {
      status: "error",
      reason: "delivery",
      message:
        "Rất tiếc, hệ thống chưa gửi được thông tin của bạn. Vui lòng thử lại sau ít phút, hoặc liên hệ trực tiếp qua Zalo / Hotline bên dưới.",
      values: echo(raw),
    };
  }

  return { status: "success", course: data.course || undefined, goal: data.goal || undefined };
}

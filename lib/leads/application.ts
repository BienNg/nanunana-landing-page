import "server-only";
import { serverEnv } from "@/lib/env";
import type { Locale } from "@/lib/i18n/locale";

/** A validated job application — what the Zapier application hook receives. */
export type Application = {
  id: string;
  createdAt: string; // ISO 8601
  /** Page language; use it to pick the confirmation email language in Zapier. */
  locale: Locale;
  name: string;
  email: string;
  role: { value: string; label: string };
  attribution: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmContent?: string;
    fbclid?: string;
    landingPage?: string;
    referrer?: string;
  };
};

/** Flat payload so each field can be mapped directly in Zapier. */
export function applicationWebhookBody(app: Application) {
  const a = app.attribution;
  return {
    id: app.id,
    createdAt: app.createdAt,
    locale: app.locale,
    name: app.name,
    email: app.email,
    role: app.role.value,
    roleTitle: app.role.label,
    landingPage: a.landingPage ?? "",
    referrer: a.referrer ?? "",
    utmSource: a.utmSource ?? "",
    utmMedium: a.utmMedium ?? "",
    utmCampaign: a.utmCampaign ?? "",
    utmContent: a.utmContent ?? "",
  };
}

/**
 * Sends the application to ZAPIER_APPLICATION_WEBHOOK_URL. Without that hook
 * the application is only logged ("[application:unrouted]") and counts as sent.
 */
export async function deliverApplication(app: Application): Promise<{ ok: boolean }> {
  const cfg = serverEnv.applicationZapier();
  if (!cfg) {
    if (process.env.ZAPIER_APPLICATION_WEBHOOK_URL?.trim()) {
      console.error(
        "[application:zapier] ZAPIER_APPLICATION_WEBHOOK_URL must start with https://hooks.zapier.com/",
      );
    }
    console.error(
      "[application:unrouted] No application hook configured. Full application:",
      JSON.stringify(app),
    );
    return { ok: true };
  }
  try {
    const res = await fetch(cfg.webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(applicationWebhookBody(app)),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Zapier application webhook ${res.status}`);
    return { ok: true };
  } catch (error) {
    console.error(
      "[application:lost] delivery failed:",
      error,
      "Full application:",
      JSON.stringify(app),
    );
    return { ok: false };
  }
}

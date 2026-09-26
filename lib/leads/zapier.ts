import "server-only";
import { serverEnv } from "@/lib/env";
import type { Lead, LeadDestinationFactory } from "./types";

/** Flat payload so a Zapier Catch Hook can map each field into a Slack message. */
export function leadWebhookBody(lead: Lead) {
  const a = lead.attribution;
  return {
    id: lead.id,
    createdAt: lead.createdAt,
    name: lead.name,
    phone: lead.phone,
    course: lead.course?.label ?? "",
    goal: lead.goal?.label ?? "",
    message: lead.message ?? "",
    landingPage: a.landingPage ?? "",
    referrer: a.referrer ?? "",
    utmSource: a.utmSource ?? "",
    utmMedium: a.utmMedium ?? "",
    utmCampaign: a.utmCampaign ?? "",
    utmContent: a.utmContent ?? "",
  };
}

export const zapierDestination: LeadDestinationFactory = () => {
  const cfg = serverEnv.zapier();
  if (!cfg) {
    const raw = process.env.ZAPIER_LEAD_WEBHOOK_URL?.trim();
    if (raw) {
      console.error(
        "[lead:zapier] ZAPIER_LEAD_WEBHOOK_URL must start with https://hooks.zapier.com/",
      );
    }
    return null;
  }

  return {
    name: "zapier",
    async send(lead: Lead) {
      const res = await fetch(cfg.webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(leadWebhookBody(lead)),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`Zapier webhook ${res.status}`);
    },
  };
};

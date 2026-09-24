import "server-only";
import { emailDestination } from "./email";
import { notionDestination } from "./notion";
import type { Lead, LeadDestinationFactory } from "./types";

/**
 * Registered lead destinations. To add one (e.g. Google Sheets), create
 * lib/leads/sheets.ts exporting a LeadDestinationFactory and add it here —
 * the form and the Server Action don't change.
 */
const destinations: LeadDestinationFactory[] = [notionDestination, emailDestination];

export type DeliveryResult =
  | { ok: true; delivered: string[]; failed: string[] }
  | { ok: false; delivered: []; failed: string[] };

/**
 * Sends the lead to every configured destination in parallel.
 * Succeeds if at least one destination accepted it. Failures are logged with
 * the full lead so nothing is ever lost silently.
 */
export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  const active = destinations.map((make) => make()).filter((d) => d !== null);

  if (active.length === 0) {
    // No destination configured yet (local dev / early deploys): keep the lead in the logs.
    console.error(
      "[lead:unrouted] No lead destination configured. Full lead:",
      JSON.stringify(lead),
    );
    return { ok: true, delivered: [], failed: [] };
  }

  const results = await Promise.allSettled(active.map((d) => d.send(lead)));
  const delivered: string[] = [];
  const failed: string[] = [];
  results.forEach((r, i) => {
    const name = active[i].name;
    if (r.status === "fulfilled") delivered.push(name);
    else {
      failed.push(name);
      console.error(`[lead:${name}] delivery failed:`, r.reason);
    }
  });

  if (failed.length > 0) {
    console.error(
      `[lead:${delivered.length ? "partial" : "lost"}] ${failed.join(", ")} failed. Full lead:`,
      JSON.stringify(lead),
    );
  }
  return delivered.length > 0
    ? { ok: true, delivered, failed }
    : { ok: false, delivered: [], failed };
}

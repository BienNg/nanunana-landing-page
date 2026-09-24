import "server-only";
import { Client } from "@notionhq/client";
import { serverEnv } from "@/lib/env";
import type { Lead, LeadDestinationFactory } from "./types";

/*
 * Notion leads database — expected properties (names must match exactly):
 *   Name (title) · Phone (phone number) · Email (email) · Course (select)
 *   Goal (select) · Preferred channel (select) · Message (text)
 *   UTM Source / UTM Medium / UTM Campaign / UTM Content (text) · fbclid (text)
 *   Landing page (URL) · Referrer (URL) · Created at (date) · Status (select, option "Mới")
 */

const text = (content?: string) => ({
  rich_text: content ? [{ type: "text" as const, text: { content: content.slice(0, 2000) } }] : [],
});
const select = (name?: string) => ({ select: name ? { name } : null });
const url = (value?: string) => ({ url: value && /^https?:\/\//.test(value) ? value : null });

// Resolved once per server instance: database id → data source id (Notion API 2025-09-03).
let dataSourceIdPromise: Promise<string> | null = null;

async function resolveDataSourceId(notion: Client, id: string) {
  try {
    const db = await notion.databases.retrieve({ database_id: id });
    if ("data_sources" in db && db.data_sources.length > 0) return db.data_sources[0].id;
  } catch {
    // Not a database id — assume a data source id was configured directly.
  }
  return id;
}

export const notionDestination: LeadDestinationFactory = () => {
  const cfg = serverEnv.notion();
  if (!cfg) return null;
  const notion = new Client({ auth: cfg.token, timeoutMs: 8000 });

  return {
    name: "notion",
    async send(lead: Lead) {
      dataSourceIdPromise ??= resolveDataSourceId(notion, cfg.databaseId).catch((e) => {
        dataSourceIdPromise = null;
        throw e;
      });
      const dataSourceId = await dataSourceIdPromise;
      const a = lead.attribution;

      await notion.pages.create({
        parent: { type: "data_source_id", data_source_id: dataSourceId },
        properties: {
          Name: { title: [{ type: "text", text: { content: lead.name } }] },
          Phone: { phone_number: lead.phone },
          Email: { email: lead.email ?? null },
          Course: select(lead.course?.label),
          Goal: select(lead.goal?.label),
          "Preferred channel": select(lead.channel.label),
          Message: text(lead.message),
          "UTM Source": text(a.utmSource),
          "UTM Medium": text(a.utmMedium),
          "UTM Campaign": text(a.utmCampaign),
          "UTM Content": text(a.utmContent),
          fbclid: text(a.fbclid),
          "Landing page": url(a.landingPage),
          Referrer: url(a.referrer),
          "Created at": { date: { start: lead.createdAt } },
          Status: select("Mới"),
        },
      });
    },
  };
};

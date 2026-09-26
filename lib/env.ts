import "server-only";

/** Typed, optional server env. Each integration is enabled only when its vars exist. */
const read = (key: string) => {
  const v = process.env[key]?.trim();
  return v ? v : undefined;
};

export const serverEnv = {
  notion: () => {
    const token = read("NOTION_TOKEN");
    const databaseId = read("NOTION_LEADS_DB_ID");
    return token && databaseId ? { token, databaseId } : null;
  },
  /** Klassen Datenbank — classes shown on the site. */
  classes: () => {
    const token = read("NOTION_TOKEN");
    const databaseId = read("NOTION_CLASSES_DB_ID");
    return token && databaseId ? { token, databaseId } : null;
  },
  /** Zapier Catch Hook. Leads are POSTed only when this is an https://hooks.zapier.com URL. */
  zapier: () => {
    const webhookUrl = read("ZAPIER_LEAD_WEBHOOK_URL");
    if (!webhookUrl) return null;
    if (!webhookUrl.startsWith("https://hooks.zapier.com/")) return null;
    return { webhookUrl };
  },
  resend: () => {
    const apiKey = read("RESEND_API_KEY");
    const from = read("RESEND_FROM_EMAIL");
    const to = read("LEAD_NOTIFY_EMAIL")
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    return apiKey && from && to?.length ? { apiKey, from, to } : null;
  },
  upstash: () => {
    const url = read("UPSTASH_REDIS_REST_URL");
    const token = read("UPSTASH_REDIS_REST_TOKEN");
    return url && token ? { url, token } : null;
  },
  turnstile: () => {
    const siteKey = read("TURNSTILE_SITE_KEY");
    const secretKey = read("TURNSTILE_SECRET_KEY");
    return siteKey && secretKey ? { siteKey, secretKey } : null;
  },
  /** Places API (New). Place ID is optional; the reviews loader can search for it. */
  places: () => {
    const apiKey = read("GOOGLE_PLACES_API_KEY");
    if (!apiKey) return null;
    return { apiKey, placeId: read("GOOGLE_PLACE_ID") };
  },
};

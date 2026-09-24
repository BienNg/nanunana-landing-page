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
};

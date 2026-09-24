"use client";

/** First-touch attribution for this browser session (sessionStorage). */
export type Attribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  fbclid: string;
  landing_page: string;
  referrer: string;
};

const KEY = "nanunana:attribution";

export function captureAttribution() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const p = new URLSearchParams(location.search);
    const url = new URL(location.href);
    url.hash = "";
    const data: Attribution = {
      utm_source: p.get("utm_source") ?? "",
      utm_medium: p.get("utm_medium") ?? "",
      utm_campaign: p.get("utm_campaign") ?? "",
      utm_content: p.get("utm_content") ?? "",
      fbclid: p.get("fbclid") ?? "",
      landing_page: url.toString(),
      referrer: document.referrer,
    };
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // storage unavailable (private mode, blocked) — attribution is best effort
  }
}

export function readAttribution(): Partial<Attribution> {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Partial<Attribution>) : {};
  } catch {
    return {};
  }
}

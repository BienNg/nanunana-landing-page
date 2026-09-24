"use client";

import { track } from "@vercel/analytics";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/** Conversion event after a successful consultation request. */
export function trackLead(props: { course?: string; goal?: string; channel?: string }) {
  const clean = Object.fromEntries(
    Object.entries(props).filter(([, v]) => typeof v === "string" && v !== ""),
  ) as Record<string, string>;
  try {
    track("lead", clean);
  } catch {}
  if (process.env.NEXT_PUBLIC_META_PIXEL_ID) {
    window.fbq?.("track", "Lead", { content_name: clean.course ?? clean.goal ?? "tu-van" });
  }
  if (process.env.NEXT_PUBLIC_GA_ID) {
    window.gtag?.("event", "generate_lead", { ...clean, form: "tu-van" });
  }
}

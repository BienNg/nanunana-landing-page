"use client";

import { track } from "@vercel/analytics";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export type ChatChannel = "zalo" | "messenger" | "whatsapp" | "phone";

/** Where on the page the contact control lives. Keep this list stable — it is the analytics breakdown. */
export type ChatPlacement =
  | "header"
  | "mobile_bar"
  | "mobile_nav"
  | "hero"
  | "courses"
  | "faq"
  | "faq_intro"
  | "contact"
  | "form_error"
  | "form_success"
  | "footer";

export type ChatClick = { channel: ChatChannel; placement: ChatPlacement };

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

/**
 * Outbound contact tap. A click is not a conversation — compare these counts
 * with new threads in Zalo and Meta. Mark `chat_click` (channel = zalo) as the
 * key GA4 conversion.
 */
export function trackChatClick({ channel, placement }: ChatClick) {
  const props = { channel, placement };
  try {
    track("chat_click", props);
  } catch {}
  if (process.env.NEXT_PUBLIC_GA_ID) {
    window.gtag?.("event", "chat_click", props);
  }
  if (process.env.NEXT_PUBLIC_META_PIXEL_ID && channel !== "phone") {
    window.fbq?.("track", "Contact", { content_name: channel, content_category: placement });
  }
}

/** Fired once per section each time it reaches the middle of the viewport. */
export function trackSectionView(section: string) {
  try {
    track("section_view", { section });
  } catch {}
  if (process.env.NEXT_PUBLIC_GA_ID) {
    window.gtag?.("event", "section_view", { section_id: section });
  }
}

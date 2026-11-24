"use client";

import { track } from "@vercel/analytics";
import { hasConsent } from "./consent";
import { canTrackGa, canTrackMeta } from "./tracking-consent";

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
    if (hasConsent("analytics")) track("lead", clean);
  } catch {}
  if (process.env.NEXT_PUBLIC_META_PIXEL_ID && canTrackMeta()) {
    window.fbq?.("track", "Lead", { content_name: clean.course ?? clean.goal ?? "tu-van" });
  }
  if (process.env.NEXT_PUBLIC_GA_ID && canTrackGa()) {
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
    if (hasConsent("analytics")) track("chat_click", props);
  } catch {}
  if (process.env.NEXT_PUBLIC_GA_ID && canTrackGa()) {
    window.gtag?.("event", "chat_click", props);
  }
  if (process.env.NEXT_PUBLIC_META_PIXEL_ID && canTrackMeta() && channel !== "phone") {
    window.fbq?.("track", "Contact", { content_name: channel, content_category: placement });
  }
}

/** Where on the careers pages the "Ứng tuyển" button (scrolls to the form) lives. */
export type ApplyPlacement =
  "role_list" | "role_header" | "role_contact" | "role_footer" | "general";

export type ApplyClick = { role: string; placement: ApplyPlacement };

/**
 * "Ứng tuyển" button tap. It only scrolls to the application form, so it is
 * intent, not an application — Meta gets nothing here. SubmitApplication fires
 * on the success page (trackApplicationSubmit).
 */
export function trackApplyClick({ role, placement }: ApplyClick) {
  const props = { role, placement };
  try {
    if (hasConsent("analytics")) track("apply_click", props);
  } catch {}
  if (process.env.NEXT_PUBLIC_GA_ID && canTrackGa()) {
    window.gtag?.("event", "apply_click", props);
  }
}

/**
 * Conversion after a sent application, called once on the success page.
 * Waits up to 10 s for GA/Meta scripts, which may still be loading after a
 * full page load. Each channel fires at most once.
 */
export function trackApplicationSubmit(role: string) {
  try {
    if (hasConsent("analytics")) track("application_submit", { role });
  } catch {}
  let ga = !process.env.NEXT_PUBLIC_GA_ID;
  let meta = !process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const started = Date.now();
  const attempt = () => {
    if (!ga && canTrackGa()) {
      ga = true;
      window.gtag?.("event", "submit_application", { role });
    }
    if (!meta && canTrackMeta()) {
      meta = true;
      window.fbq?.("track", "SubmitApplication", { content_name: role });
    }
    if ((!ga || !meta) && Date.now() - started < 10_000) window.setTimeout(attempt, 250);
  };
  attempt();
}

/** Fired once per section each time it reaches the middle of the viewport. */
export function trackSectionView(section: string) {
  try {
    if (hasConsent("analytics")) track("section_view", { section });
  } catch {}
  if (process.env.NEXT_PUBLIC_GA_ID && canTrackGa()) {
    window.gtag?.("event", "section_view", { section_id: section });
  }
}

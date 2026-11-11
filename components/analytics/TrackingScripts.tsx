"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useConsent } from "@/lib/hooks/useConsent";
import { CONSENT_EVENT, hasConsent, subscribeConsent } from "@/lib/consent";
import { syncTracking } from "@/lib/tracking-consent";
import { BehaviorTracker } from "./BehaviorTracker";
import { SectionViewTracker } from "./SectionViewTracker";
import { AttributionCapture } from "./AttributionCapture";

export function TrackingScripts() {
  const consent = useConsent();
  const pathname = usePathname();
  useEffect(() => {
    const sync = () =>
      syncTracking(process.env.NEXT_PUBLIC_GA_ID, process.env.NEXT_PUBLIC_META_PIXEL_ID);
    sync();
    const unsubscribe = subscribeConsent(sync);
    const timer = window.setInterval(() => window.dispatchEvent(new Event(CONSENT_EVENT)), 60_000);
    return () => {
      unsubscribe();
      window.clearInterval(timer);
    };
  }, [pathname]);

  return (
    <>
      {consent?.analytics && (
        <>
          <Analytics beforeSend={(event) => (hasConsent("analytics") ? event : null)} />
          <SpeedInsights beforeSend={(event) => (hasConsent("analytics") ? event : null)} />
          <BehaviorTracker />
          <SectionViewTracker />
        </>
      )}
      {consent?.marketing && <AttributionCapture />}
    </>
  );
}

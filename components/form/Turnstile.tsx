"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/** Cloudflare Turnstile widget; injects the `cf-turnstile-response` input into the form. */
export function Turnstile({ siteKey }: { siteKey: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const language = useLocale();

  useEffect(() => {
    if (!ready || !ref.current || !window.turnstile) return;
    const id = window.turnstile.render(ref.current, {
      sitekey: siteKey,
      language,
      appearance: "interaction-only",
    });
    return () => window.turnstile?.remove(id);
  }, [ready, siteKey, language]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="lazyOnload"
        onReady={() => setReady(true)}
      />
      <div ref={ref} className="min-h-0" />
    </>
  );
}

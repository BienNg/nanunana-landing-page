"use client";

import { useMemo, useSyncExternalStore } from "react";
import { consentSnapshot, parseConsent, subscribeConsent } from "@/lib/consent";

const serverSnapshot = () => null;

export function useConsent() {
  const raw = useSyncExternalStore(subscribeConsent, consentSnapshot, serverSnapshot);
  return useMemo(() => parseConsent(raw), [raw]);
}

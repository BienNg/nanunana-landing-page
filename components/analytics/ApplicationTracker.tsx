"use client";

import { useEffect } from "react";
import { trackApplicationSubmit } from "@/lib/analytics";
import { takeApplicationSent } from "@/lib/apply-role-store";

/**
 * Fires SubmitApplication (Meta) / submit_application (GA4) once, only when
 * this browser just sent the form. Reloads and direct visits count nothing.
 */
export function ApplicationTracker({ role }: { role: string }) {
  useEffect(() => {
    const sent = takeApplicationSent();
    if (sent === null) return;
    trackApplicationSubmit(role || sent);
  }, [role]);
  return null;
}

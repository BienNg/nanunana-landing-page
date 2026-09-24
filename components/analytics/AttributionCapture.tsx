"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Stores UTM/fbclid/landing page/referrer on the first page view of the session. */
export function AttributionCapture() {
  useEffect(() => captureAttribution(), []);
  return null;
}

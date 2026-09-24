"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins once for the whole app.
gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Media queries used with gsap.matchMedia(). */
export const MQ = {
  motionOk: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 64rem)",
  mobile: "(max-width: 63.999rem)",
} as const;

export { gsap, ScrollTrigger, useGSAP };

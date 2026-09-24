"use client";

import dynamic from "next/dynamic";

// Scroll effects aren't needed above the fold — load GSAP ScrollTrigger code lazily.
const ScrollMotion = dynamic(() => import("./ScrollMotion"), { ssr: false });

export function MotionLoader() {
  return <ScrollMotion />;
}

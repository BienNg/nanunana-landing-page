"use client";

import { MotionConfig } from "motion/react";

/** Framer Motion defaults: honour the OS "reduce motion" setting everywhere. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

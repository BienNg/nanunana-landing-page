"use client";

import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

/**
 * Framer Motion setup: features load lazily (use `m.*` components, not `motion.*` —
 * `strict` enforces it) and the OS "reduce motion" setting is honoured everywhere.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

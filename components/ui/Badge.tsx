import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "teal" | "coral" | "emerald" | "neutral" | "inverse";

const tones: Record<BadgeTone, string> = {
  teal: "bg-surface-container-low text-brand-teal-dark ring-1 ring-inset ring-surface-container-high",
  coral: "bg-tertiary-fixed text-coral-hover",
  emerald: "bg-badge-comm text-trust-emerald-text",
  neutral: "bg-surface-card-subtle text-ink-muted",
  inverse: "bg-white/10 text-white ring-1 ring-inset ring-white/20",
};

/** Pill-shaped metadata tag (uppercase, +0.04em tracking). */
export function Badge({
  tone = "teal",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-sm uppercase [&_svg]:size-3.5",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

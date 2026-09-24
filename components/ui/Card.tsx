import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Elevation = 1 | 2 | 3;

const elevation: Record<Elevation, string> = {
  1: "shadow-tier-1",
  2: "shadow-tier-2",
  3: "shadow-tier-3",
};

/** White card, 1px subtle border, 16px radius, space-lg padding. */
export function Card({
  tier = 1,
  interactive = false,
  className,
  ...props
}: ComponentProps<"div"> & { tier?: Elevation; interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-card border border-border-subtle bg-surface-card p-space-lg",
        elevation[tier],
        interactive &&
          "transition-[box-shadow,border-color] duration-200 hover:border-surface-container-high hover:shadow-tier-2",
        className,
      )}
      {...props}
    />
  );
}

import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Tone = "canvas" | "white" | "dark";

const tones: Record<Tone, string> = {
  canvas: "bg-surface-canvas",
  white: "bg-white",
  dark: "bg-ink text-white",
};

/** Landmark section with anchor id, heading link and vertical rhythm. */
export function Section({
  id,
  tone = "canvas",
  className,
  children,
  ...props
}: ComponentProps<"section"> & { id: string; tone?: Tone }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("section-y", tones[tone], className)}
      {...props}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

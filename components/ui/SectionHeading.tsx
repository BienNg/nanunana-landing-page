import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Eyebrow + h2 + intro, used at the top of every section. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "light",
  as = "h2",
  className,
}: {
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  /** Page titles use h1. Sections on a page that already has one use h2. */
  as?: "h1" | "h2";
  className?: string;
}) {
  const dark = tone === "dark";
  const Title = as;
  return (
    <header
      className={cn(
        "mb-space-xl flex flex-col gap-3",
        align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-label-sm uppercase",
            dark ? "text-inverse-primary" : "text-brand-teal-dark",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Title
        id={id}
        className={cn(
          "text-headline-xl-mobile text-balance md:text-headline-xl",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Title>
      {intro ? (
        <div
          className={cn(
            "text-body-md text-pretty md:text-body-lg",
            dark ? "text-inverse-on-surface/80" : "text-ink-muted",
          )}
        >
          {intro}
        </div>
      ) : null}
    </header>
  );
}

"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { runningClassesSection } from "@/content/classes";
import { sectionIds } from "@/content/nav";
import { useAnyInView } from "@/lib/hooks/useInView";

const jumpClass =
  "inline-flex min-h-tap flex-col items-center justify-center gap-1 px-3 text-label-sm text-brand-teal-dark transition-colors hover:bg-surface-container-low";

/**
 * Floating control over the class list on phones. The list is long, so this
 * jumps to the previous section or skips ahead to the next one.
 * Hidden while the list is off screen, and hidden from `md` up.
 */
export function ClassListJump() {
  const copy = runningClassesSection.jump;
  // Inset past the sticky header (4.5rem) and the mobile CTA bar.
  // rootMargin only accepts px or %, not rem.
  const overList = useAnyInView(["[data-class-list]"], "-72px 0px -88px 0px");

  return (
    <AnimatePresence initial={false}>
      {overList ? (
        <m.nav
          aria-label={copy.label}
          className="fixed top-[42%] right-3 z-30 flex -translate-y-1/2 flex-col overflow-hidden rounded-card border border-border-subtle bg-white/95 shadow-tier-3 backdrop-blur md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <a
            href={`#${sectionIds.learningApp}`}
            className={jumpClass}
            aria-label={copy.previousLabel}
          >
            <ChevronUp aria-hidden className="size-4" />
            {copy.previous}
          </a>
          <span aria-hidden className="mx-2 h-px bg-border-subtle" />
          <a href={`#${sectionIds.pathways}`} className={jumpClass} aria-label={copy.nextLabel}>
            <ChevronDown aria-hidden className="size-4" />
            {copy.next}
          </a>
        </m.nav>
      ) : null}
    </AnimatePresence>
  );
}

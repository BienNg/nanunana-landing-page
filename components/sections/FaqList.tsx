"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { m, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type Item = { id: string; question: string; answer: string; verifyNote?: string };

const noop = () => () => {};
/** false during SSR/hydration, true afterwards — before that every answer stays open (no-JS). */
function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

/**
 * Accessible accordion (button + aria-expanded + region) with a Framer Motion
 * height animation. Without JavaScript all answers are expanded.
 */
export function FaqList({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const baseId = useId();

  return (
    <ul className="divide-y divide-border-subtle rounded-card border border-border-subtle bg-white shadow-tier-1">
      {items.map((item) => {
        const expanded = !hydrated || open === item.id;
        const btnId = `${baseId}-${item.id}-q`;
        const panelId = `${baseId}-${item.id}-a`;
        return (
          <li key={item.id}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(open === item.id ? null : item.id)}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-headline-sm text-ink transition-colors hover:text-brand-teal-dark md:px-6"
              >
                {item.question}
                <m.span
                  aria-hidden
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.25 }}
                  className="shrink-0 text-teal"
                >
                  <ChevronDown className="size-5" />
                </m.span>
              </button>
            </h3>
            <m.div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!expanded}
              initial={false}
              animate={
                expanded
                  ? { height: "auto", opacity: 1, visibility: "visible" }
                  : { height: 0, opacity: 0, transitionEnd: { visibility: "hidden" } }
              }
              transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p
                className={cn(
                  "px-5 pb-5 text-body-md text-ink-muted md:px-6",
                  item.verifyNote &&
                    "mx-5 mb-5 rounded-[4px] px-0 pb-0 outline-2 outline-offset-4 outline-amber outline-dashed md:mx-6 md:px-0",
                )}
                title={item.verifyNote ? `VERIFY: ${item.verifyNote}` : undefined}
              >
                {item.answer}
              </p>
            </m.div>
          </li>
        );
      })}
    </ul>
  );
}

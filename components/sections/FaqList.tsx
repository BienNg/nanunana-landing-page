"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type Item = { id: string; question: string; answer: string; verifyNote?: string };

/**
 * Accessible accordion (button + aria-expanded + region).
 * Answers are in the HTML (hidden attribute) so they work without JS for crawlers;
 * height animation is added in Phase 6.
 */
export function FaqList({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();

  return (
    <ul className="divide-y divide-border-subtle rounded-card border border-border-subtle bg-white shadow-tier-1">
      {items.map((item) => {
        const expanded = open === item.id;
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
                onClick={() => setOpen(expanded ? null : item.id)}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-headline-sm text-ink transition-colors hover:text-brand-teal-dark md:px-6"
              >
                {item.question}
                <ChevronDown
                  aria-hidden
                  className={cn(
                    "size-5 shrink-0 text-teal transition-transform duration-200",
                    expanded && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!expanded}>
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
            </div>
          </li>
        );
      })}
    </ul>
  );
}

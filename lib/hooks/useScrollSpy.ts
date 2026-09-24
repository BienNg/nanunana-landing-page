"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently crossing the upper-middle band of
 * the viewport, or null. Ids that don't exist on the page are ignored.
 */
export function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const els = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        }
        // Pick the section whose top is closest to (but above) the band.
        let best: string | null = null;
        let bestTop = -Infinity;
        for (const [id, top] of visible) {
          if (top > bestTop) {
            best = id;
            bestTop = top;
          }
        }
        setActive(best);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}

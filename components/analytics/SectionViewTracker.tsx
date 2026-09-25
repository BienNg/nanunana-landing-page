"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackSectionView } from "@/lib/analytics";

const seen = new Set<string>();

/**
 * Records each main-page section once, when it crosses the middle of the
 * viewport. Tall sections still count, because the observer band is a slice
 * of the screen rather than a percentage of the section.
 */
export function SectionViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.getElementById("noi-dung");
    if (!main) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = (entry.target as HTMLElement).id;
          if (!id) continue;
          const key = `${pathname}:${id}`;
          if (seen.has(key)) {
            observer.unobserve(entry.target);
            continue;
          }
          seen.add(key);
          trackSectionView(id);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "-15% 0px -25% 0px", threshold: 0 },
    );

    const watch = () => {
      main.querySelectorAll<HTMLElement>("section[id]").forEach((el) => {
        if (!seen.has(`${pathname}:${el.id}`)) observer.observe(el);
      });
    };

    watch();
    const mutations = new MutationObserver(watch);
    mutations.observe(main, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}

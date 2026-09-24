"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { pressMotion } from "@/components/ui/button-styles";

/**
 * Carousel on top of a native scroll-snap track: swipe works without JS,
 * JS adds prev/next buttons and an animated position indicator.
 */
export function TestimonialCarousel({ slides, label }: { slides: ReactNode[]; label: string }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [overflow, setOverflow] = useState(false);
  const reduce = useReducedMotion();

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setOverflow(track.scrollWidth > track.clientWidth + 4);
    const children = Array.from(track.children) as HTMLElement[];
    const left = track.scrollLeft;
    let best = 0;
    children.forEach((c, i) => {
      if (
        Math.abs(c.offsetLeft - track.offsetLeft - left) <
        Math.abs(children[best].offsetLeft - track.offsetLeft - left)
      )
        best = i;
    });
    // at the end of the track, the last slide is "active"
    if (left + track.clientWidth >= track.scrollWidth - 4) best = children.length - 1;
    setActive(best);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    track.addEventListener("scroll", measure, { passive: true });
    return () => {
      ro.disconnect();
      track.removeEventListener("scroll", measure);
    };
  }, [measure]);

  const go = (i: number) => {
    const track = trackRef.current;
    const target = track?.children[Math.max(0, Math.min(slides.length - 1, i))] as
      HTMLElement | undefined;
    if (!track || !target) return;
    track.scrollTo({
      left: target.offsetLeft - track.offsetLeft,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={trackRef}
        className="-mx-margin-mobile flex snap-x snap-mandatory scroll-px-margin-mobile [scrollbar-width:none] gap-gutter-mobile overflow-x-auto px-margin-mobile pb-2 md:mx-0 md:scroll-px-0 md:gap-gutter md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <li
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${slides.length}`}
            className="w-[85%] shrink-0 snap-start md:w-[calc((100%-var(--spacing-gutter))/2)] lg:w-[calc((100%-2*var(--spacing-gutter))/3)]"
          >
            {slide}
          </li>
        ))}
      </ul>

      {overflow ? (
        <div className="mt-6 flex items-center justify-center gap-4">
          <m.button
            type="button"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="Câu chuyện trước"
            className="grid size-tap place-items-center rounded-full border border-border-subtle bg-white text-ink shadow-tier-1 transition-opacity disabled:opacity-40"
            {...pressMotion}
          >
            <ChevronLeft aria-hidden className="size-5" />
          </m.button>
          <ol className="flex items-center gap-1" aria-label="Chọn câu chuyện">
            {slides.map((_, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Câu chuyện ${i + 1}`}
                  aria-current={i === active ? "true" : undefined}
                  className="relative grid size-tap place-items-center"
                >
                  <m.span
                    className="block h-2 w-2 rounded-full"
                    initial={false}
                    animate={{
                      scaleX: i === active ? 3 : 1,
                      backgroundColor: i === active ? "#0b7793" : "#cbd5e1",
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                </button>
              </li>
            ))}
          </ol>
          <m.button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active >= slides.length - 1}
            aria-label="Câu chuyện tiếp theo"
            className={cn(
              "grid size-tap place-items-center rounded-full border border-border-subtle bg-white text-ink shadow-tier-1 transition-opacity disabled:opacity-40",
            )}
            {...pressMotion}
          >
            <ChevronRight aria-hidden className="size-5" />
          </m.button>
        </div>
      ) : null}
    </div>
  );
}

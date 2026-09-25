"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { pressMotion } from "@/components/ui/button-styles";

/**
 * Carousel on top of a native scroll-snap track: swipe works without JS,
 * JS adds prev/next buttons and an animated position indicator.
 * Dots are scroll stops, not one per card: with 5 reviews and 3 on screen
 * there are 3 stops, and on a phone there is one stop per review.
 */
function slideEls(track: HTMLElement) {
  return Array.from(track.querySelectorAll<HTMLElement>(":scope > [data-slide]"));
}

export function TestimonialCarousel({ slides, label }: { slides: ReactNode[]; label: string }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(1);
  const [overflow, setOverflow] = useState(false);
  const reduce = useReducedMotion();

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = slideEls(track);
    setOverflow(track.scrollWidth > track.clientWidth + 4);
    if (items.length === 0) {
      setPages(1);
      setActive(0);
      return;
    }
    const start = items[0].offsetLeft;
    const visible = Math.max(
      1,
      items.filter((item) => item.offsetLeft - start + item.offsetWidth <= track.clientWidth + 2)
        .length,
    );
    const pageCount = Math.max(1, items.length - visible + 1);
    const stride = items[1] ? items[1].offsetLeft - start : items[0].offsetWidth;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    let index = stride > 0 ? Math.round(track.scrollLeft / stride) : 0;
    if (maxScroll <= 4 || track.scrollLeft >= maxScroll - 4) index = pageCount - 1;
    setPages(pageCount);
    setActive(Math.max(0, Math.min(pageCount - 1, index)));
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

  const go = (page: number) => {
    const track = trackRef.current;
    if (!track) return;
    const items = slideEls(track);
    const stride = items[1] ? items[1].offsetLeft - items[0].offsetLeft : 0;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const next = Math.max(0, Math.min(pages - 1, page));
    track.scrollTo({
      left: Math.min(maxScroll, next * stride),
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
            data-slide
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
            {Array.from({ length: pages }, (_, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Vị trí ${i + 1} / ${pages}`}
                  aria-current={i === active ? "true" : undefined}
                  className="relative grid size-tap place-items-center"
                >
                  <m.span
                    className="block h-2 rounded-full"
                    initial={false}
                    animate={{
                      width: i === active ? 24 : 8,
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
            disabled={active >= pages - 1}
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

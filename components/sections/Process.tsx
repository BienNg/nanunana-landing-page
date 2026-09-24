"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { processSection, processTracks, type ProcessTrack } from "@/content/process";
import { sectionIds } from "@/content/nav";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VerifyMark } from "@/components/ui/VerifyMark";

function trackFromHash() {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.slice(1);
  return processTracks.find((track) => track.id === hash)?.id ?? null;
}

function ProcessTimeline({ track }: { track: ProcessTrack }) {
  return (
    <div className="relative" data-process>
      <div
        aria-hidden
        className="absolute top-6 bottom-6 left-6 w-0.5 -translate-x-1/2 bg-border-subtle lg:top-6 lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-0.5 lg:w-auto lg:translate-x-0 lg:-translate-y-1/2"
      >
        <div
          data-process-line
          className="h-full w-full origin-top bg-gradient-to-b from-teal to-brand-teal-dark lg:origin-left lg:bg-gradient-to-r"
        />
      </div>

      <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-gutter">
        {track.steps.map((step, i) => (
          <li
            key={step.id}
            className="flex gap-5 lg:flex-col lg:items-center lg:gap-4 lg:text-center"
            data-process-step
          >
            <span
              data-process-dot
              className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-2 border-teal bg-white text-headline-sm text-brand-teal-dark shadow-tier-1 transition-colors duration-300"
            >
              <span className="sr-only">Bước </span>
              {i + 1}
            </span>
            <div className="pt-2 lg:pt-0">
              <h3 className="text-headline-sm text-ink">{step.title}</h3>
              <VerifyMark claim={step.description} as="div" className="mt-1.5">
                {(t) => <p className="text-body-sm text-ink-muted md:text-body-md">{t}</p>}
              </VerifyMark>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** One roadmap at a time. The switch is a tab pair; both tracks stay in the DOM. */
export function Process() {
  const [active, setActive] = useState(processTracks[0].id);

  useEffect(() => {
    const applyHash = () => {
      const id = trackFromHash();
      if (id) setActive(id);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      void import("@/components/motion/gsap").then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [active]);

  function select(id: ProcessTrack["id"]) {
    setActive(id);
    const next = `#${id}`;
    if (window.location.hash !== next) {
      history.replaceState(null, "", next);
    }
  }

  function onTabsKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const key = event.key;
    if (key !== "ArrowRight" && key !== "ArrowLeft" && key !== "Home" && key !== "End") return;
    event.preventDefault();
    const index = processTracks.findIndex((track) => track.id === active);
    const nextIndex =
      key === "Home"
        ? 0
        : key === "End"
          ? processTracks.length - 1
          : key === "ArrowRight"
            ? (index + 1) % processTracks.length
            : (index - 1 + processTracks.length) % processTracks.length;
    const next = processTracks[nextIndex];
    select(next.id);
    requestAnimationFrame(() => {
      document.getElementById(`tab-${next.id}`)?.focus();
    });
  }

  return (
    <Section id={sectionIds.process} tone="white" className="scroll-mt-24">
      <SectionHeading
        id={`${sectionIds.process}-title`}
        eyebrow={processSection.eyebrow}
        title={processSection.title}
        intro={processSection.intro}
      />

      <div
        role="tablist"
        aria-label="Chọn lộ trình"
        onKeyDown={onTabsKeyDown}
        className="mx-auto mb-8 flex w-full max-w-xl rounded-full bg-surface-card-subtle p-1 ring-1 ring-border-subtle ring-inset"
      >
        {processTracks.map((track) => {
          const selected = active === track.id;
          return (
            <button
              key={track.id}
              type="button"
              role="tab"
              id={`tab-${track.id}`}
              aria-selected={selected}
              aria-controls={track.id}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(track.id)}
              className={cn(
                "flex min-h-tap flex-1 flex-col items-center justify-center rounded-full px-3 py-2 transition-colors focus-visible:ring-[3px] focus-visible:ring-teal/30 focus-visible:outline-none",
                selected
                  ? "bg-brand-teal-dark text-white shadow-tier-1"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              <span className="text-label-sm uppercase">{track.eyebrow}</span>
              <span className={cn("text-label-md", selected ? "text-white" : "text-ink")}>
                {track.switchLabel}
              </span>
            </button>
          );
        })}
      </div>

      {processTracks.map((track) => {
        const selected = active === track.id;
        return (
          <div
            key={track.id}
            id={track.id}
            role="tabpanel"
            aria-labelledby={`tab-${track.id}`}
            hidden={!selected}
            className="scroll-mt-24"
          >
            <p className="mx-auto mb-8 max-w-3xl text-center text-body-md text-pretty text-ink-muted md:text-body-lg">
              {track.intro}
            </p>
            <ProcessTimeline track={track} />
          </div>
        );
      })}

      <noscript
        dangerouslySetInnerHTML={{
          __html: `<style>#${sectionIds.processUniversity}[hidden],#${sectionIds.processVocational}[hidden]{display:block!important}</style>`,
        }}
      />
    </Section>
  );
}

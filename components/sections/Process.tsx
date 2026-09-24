import { processSection, processSteps } from "@/content/process";
import { sectionIds } from "@/content/nav";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VerifyMark } from "@/components/ui/VerifyMark";

/**
 * Five-step sequence. Vertical timeline on mobile, horizontal on desktop.
 * The connecting line (data-process-line) is drawn on scroll in Phase 6.
 */
export function Process() {
  return (
    <Section id={sectionIds.process} tone="white">
      <SectionHeading
        id={`${sectionIds.process}-title`}
        eyebrow={processSection.eyebrow}
        title={processSection.title}
        intro={processSection.intro}
      />
      <div className="relative" data-process>
        {/* track + progress line */}
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
          {processSteps.map((step, i) => (
            <li
              key={step.id}
              className="flex gap-5 lg:flex-col lg:items-center lg:gap-4 lg:text-center"
              data-process-step
            >
              <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-2 border-teal bg-white text-headline-sm text-brand-teal-dark shadow-tier-1">
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
    </Section>
  );
}

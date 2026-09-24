import Link from "next/link";
import { Check, ChevronRight, Clock, Star } from "lucide-react";
import { courses, coursesSection, type Course } from "@/content/courses";
import { prefillHref } from "@/content/form-options";
import { sectionIds } from "@/content/nav";
import { isVisible } from "@/content/verify";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { CourseBadge } from "@/components/ui/CourseBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VerifyMark } from "@/components/ui/VerifyMark";

function CourseCard({ course }: { course: Course }) {
  const featured = !!course.highlight;
  return (
    <article
      aria-labelledby={`khoa-${course.id}`}
      className={cn(
        "relative flex h-full flex-col rounded-card border bg-white p-space-lg transition-[box-shadow,border-color] duration-200",
        featured
          ? "border-accent-coral shadow-tier-2 ring-1 ring-accent-coral/40"
          : "border-border-subtle shadow-tier-1 hover:shadow-tier-2",
      )}
    >
      {featured ? (
        <Badge tone="coral" className="absolute -top-3 right-5 shadow-tier-1">
          <Star aria-hidden /> {course.highlight}
        </Badge>
      ) : null}

      <header className="flex items-center justify-between gap-3">
        <CourseBadge level={course.level} />
        <VerifyMark claim={course.duration}>
          {(t) => (
            <span className="inline-flex items-center gap-1 text-label-md text-ink-subtle">
              <Clock aria-hidden className="size-3.5" /> {t}
            </span>
          )}
        </VerifyMark>
      </header>

      <h3 id={`khoa-${course.id}`} className="mt-4 text-headline-sm text-ink">
        {course.title}
      </h3>
      <VerifyMark claim={course.description} as="div" className="mt-2">
        {(t) => <p className="text-body-md text-ink-muted">{t}</p>}
      </VerifyMark>

      <VerifyMark claim={course.bullets} as="div" className="mt-4">
        {(items) => (
          <ul className="space-y-2">
            {items.map((b) => (
              <li key={b} className="flex gap-2 text-body-sm text-ink">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
                {b}
              </li>
            ))}
          </ul>
        )}
      </VerifyMark>

      <footer className="mt-auto flex items-center justify-between gap-3 border-t border-border-subtle pt-4">
        {course.outcome && isVisible(course.outcome) ? (
          <span className="text-label-md text-trust-emerald-text">
            <VerifyMark claim={course.outcome} />
          </span>
        ) : (
          <span />
        )}
        <Link
          href={prefillHref({ course: course.formValue })}
          className="-mr-2 inline-flex min-h-tap items-center gap-1 rounded-control px-2 text-label-md text-brand-teal-dark hover:bg-surface-container-low"
        >
          {coursesSection.cardCta}
          <span className="sr-only"> khoá {course.name}</span>
          <ChevronRight aria-hidden className="size-4" />
        </Link>
      </footer>
    </article>
  );
}

export function Courses() {
  return (
    <Section id={sectionIds.courses} tone="white">
      <SectionHeading
        id={`${sectionIds.courses}-title`}
        eyebrow={coursesSection.eyebrow}
        title={coursesSection.title}
        intro={
          <>
            <p className="font-semibold text-ink italic">{coursesSection.lead}</p>
            <p className="mt-2">{coursesSection.intro[0]}</p>
          </>
        }
      />
      <ul className="grid gap-x-gutter-mobile gap-y-8 md:grid-cols-2 md:gap-gutter lg:grid-cols-3">
        {courses.map((c) => (
          <li key={c.id} id={`khoa-hoc-${c.id}`}>
            <CourseCard course={c} />
          </li>
        ))}
      </ul>
      <div className="mx-auto mt-12 max-w-3xl space-y-3 text-center text-body-md text-ink-muted">
        {coursesSection.intro.slice(1).map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Section>
  );
}

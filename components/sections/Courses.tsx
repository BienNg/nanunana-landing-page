import Link from "next/link";
import {
  Check,
  ChevronRight,
  Clock,
  Globe,
  GraduationCap,
  HeartHandshake,
  Star,
  type LucideIcon,
} from "lucide-react";
import {
  courses as coursesByLocale,
  coursesSection as coursesSectionByLocale,
  type Course,
} from "@/content/courses";
import { getLocale } from "@/lib/i18n/get-locale";
import { localePath } from "@/lib/i18n/locale";
import { sectionIds } from "@/content/nav";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { CourseBadge } from "@/components/ui/CourseBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VerifyMark } from "@/components/ui/VerifyMark";
import { ChatCtaPair } from "@/components/analytics/ChatCtaPair";
import { PrefillLink } from "@/components/form/PrefillLink";
import { LinkButton } from "@/components/ui/Button";

function CourseCard({
  course,
  section,
}: {
  course: Course;
  section: (typeof coursesSectionByLocale)["vi"];
}) {
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

      <footer className="mt-auto flex items-center justify-end border-t border-border-subtle pt-4">
        <PrefillLink
          course={course.formValue}
          className="-mr-2 inline-flex min-h-tap items-center gap-1 rounded-control px-2 text-label-md text-brand-teal-dark hover:bg-surface-container-low"
        >
          {section.cardCta}
          <span className="sr-only">
            {" "}
            {section.cardCtaFor} {course.name}
          </span>
          <ChevronRight aria-hidden className="size-4" />
        </PrefillLink>
      </footer>
    </article>
  );
}

const closerIcons: Record<
  (typeof coursesSectionByLocale.vi.closer.points)[number]["id"],
  LucideIcon
> = {
  "moi-truong": HeartHandshake,
  "giao-vien": GraduationCap,
  "tam-nhin": Globe,
};

function CoursesCloser({ section }: { section: (typeof coursesSectionByLocale)["vi"] }) {
  return (
    <div className="mt-14 overflow-hidden rounded-card border border-border-subtle bg-white shadow-tier-1">
      <ul className="grid md:grid-cols-3">
        {section.closer.points.map((point) => {
          const Icon = closerIcons[point.id];
          return (
            <li
              key={point.id}
              className="flex gap-4 border-b border-border-subtle p-6 last:border-b-0 md:flex-col md:border-r md:border-b-0 md:p-8 md:last:border-r-0"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-container-low text-brand-teal-dark">
                <Icon aria-hidden className="size-5" />
              </span>
              <div>
                <h3 className="text-headline-sm text-ink">{point.title}</h3>
                <p className="mt-1.5 text-body-md text-ink-muted">{point.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="border-t border-border-subtle bg-surface-container-low px-6 py-6 text-center md:px-12 md:py-8">
        <p className="text-body-md text-pretty text-ink md:text-body-lg">
          {section.closer.invitation}
        </p>
        <ChatCtaPair placement="courses" primaryLabel={section.chatCta} className="mt-6" />
      </div>
    </div>
  );
}

/** Old Webflow deep links used `/niveau#a1-section`. */
export function courseAnchor(id: string) {
  return `${id}-section`;
}

export async function Courses({ variant = "summary" }: { variant?: "summary" | "full" }) {
  const locale = await getLocale();
  const coursesSection = coursesSectionByLocale[locale];
  const courses = coursesByLocale[locale];
  const full = variant === "full";
  return (
    <Section id={sectionIds.courses} tone="white">
      <SectionHeading
        as={full ? "h1" : "h2"}
        id={`${sectionIds.courses}-title`}
        eyebrow={coursesSection.eyebrow}
        title={coursesSection.title}
        intro={
          <>
            <p className="font-semibold text-ink italic">{coursesSection.lead}</p>
            <p className="mt-2">{coursesSection.intro}</p>
          </>
        }
      />
      {full ? (
        <ul className="grid gap-x-gutter-mobile gap-y-8 md:grid-cols-2 md:gap-gutter lg:grid-cols-3">
          {courses.map((c) => (
            <li key={c.id} id={courseAnchor(c.id)} className="scroll-mt-24">
              <CourseCard course={c} section={coursesSection} />
            </li>
          ))}
        </ul>
      ) : (
        <>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <li key={c.id}>
                <Link
                  href={localePath(locale, `/niveau#${courseAnchor(c.id)}`)}
                  className="flex min-h-tap items-center gap-3 rounded-card border border-border-subtle bg-white px-4 py-3 shadow-tier-1 transition-colors hover:border-teal"
                >
                  <CourseBadge level={c.level} />
                  <span className="text-headline-sm text-ink">{c.name}</span>
                  <ChevronRight aria-hidden className="ml-auto size-5 text-teal" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <LinkButton href="/niveau" variant="outline">
              {coursesSection.detailCta} <ChevronRight aria-hidden />
            </LinkButton>
          </div>
        </>
      )}
      <CoursesCloser section={coursesSection} />
    </Section>
  );
}

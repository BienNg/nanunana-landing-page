import Link from "next/link";
import {
  courseDetails,
  courseHref,
  courseLevels,
  coursePageCopy,
  levelCourse,
  type CourseSlug,
} from "@/content/course-levels";
import { coursesSection } from "@/content/courses";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CourseBadge } from "@/components/ui/CourseBadge";
import { Section } from "@/components/ui/Section";
import { PrefillLink } from "@/components/form/PrefillLink";
import { buttonClasses } from "@/components/ui/button-styles";
import { localePath, type Locale } from "@/lib/i18n/locale";
import { courseData } from "@/lib/seo/structured-data";
import { getSiteUrl } from "@/lib/site-url";
import { FaqList } from "./FaqList";
import { courseFees, formatVnd, pricingCopy } from "@/content/pricing";
import { claimValue } from "@/content/verify";

export function CourseDetail({ locale, level }: { locale: Locale; level: CourseSlug }) {
  const course = levelCourse(locale, level);
  const details = courseDetails[locale][level];
  const copy = coursePageCopy[locale];
  const pricing = pricingCopy[locale];
  const fee = claimValue(courseFees[level]);
  const faq = [
    {
      id: "duration",
      question: copy.durationQ,
      answer: `${course.duration.value}. ${copy.planningText}`,
    },
    {
      id: "fees",
      question: copy.feesQ,
      answer: fee
        ? `${pricing.regular}: ${formatVnd(fee.regular)}. ${pricing.early} (${pricing.earlyCondition}): ${formatVnd(fee.early)}. ${pricing.sameForAll} ${copy.feesA}`
        : `${pricing.onRequest}. ${copy.feesA}`,
    },
    { id: "certificate", question: copy.certificateQ, answer: copy.certificateA },
  ];
  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { name: coursesSection[locale].title, path: "/niveau" },
          { name: course.name, path: courseHref(level) },
        ]}
      />
      <Section id="course-intro" tone="canvas">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <CourseBadge level={course.level} />
            <h1
              id="course-intro-title"
              className="mt-5 text-display-hero-mobile text-ink md:text-display-hero"
            >
              {course.title}
            </h1>
            <p className="mt-5 max-w-3xl text-body-lg text-ink-muted">{course.description.value}</p>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-body-md text-ink">
              {course.bullets.value.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
          <aside
            className="rounded-card border border-border-subtle bg-white p-6 shadow-tier-1"
            aria-label={copy.planning}
          >
            <p className="text-label-sm text-ink-muted">{copy.duration}</p>
            <p className="mt-2 text-headline-lg text-brand-teal-dark">{course.duration.value}</p>
            <p className="mt-4 text-label-sm text-ink-muted">{fee ? pricing.regular : copy.price}</p>
            {fee ? (
              <>
                <p className="mt-1 text-headline-sm text-ink tabular-nums">{formatVnd(fee.regular)}</p>
                <p className="mt-3 text-label-sm text-ink-muted">{pricing.early}</p>
                <p className="mt-1 text-headline-sm text-brand-teal-dark tabular-nums">
                  {formatVnd(fee.early)}
                </p>
                <p className="mt-1 text-body-sm text-ink-muted">{pricing.earlyCondition}</p>
                <p className="mt-3 text-body-sm text-ink-muted">{pricing.app}</p>
              </>
            ) : (
              <p className="mt-1 text-headline-sm text-ink">{pricing.onRequest}</p>
            )}
            <p className="mt-4 text-body-sm text-ink-muted">{copy.planningText}</p>
            <PrefillLink
              course={course.formValue}
              className={buttonClasses({
                variant: "primary",
                fullWidth: true,
                className: "mt-6 text-center whitespace-normal",
              })}
            >
              {copy.enquiry}
            </PrefillLink>
          </aside>
        </div>
      </Section>
      <Section id="course-learning" tone="white">
        <div className="mx-auto max-w-4xl space-y-10">
          <section aria-labelledby="course-learning-title">
            <h2 id="course-learning-title" className="text-headline-lg text-ink">
              {copy.audience}
            </h2>
            <p className="mt-4 text-body-md leading-relaxed text-ink-muted">{details.audience}</p>
          </section>
          <section aria-labelledby="course-focus-title">
            <h2 id="course-focus-title" className="text-headline-md text-ink">
              {copy.focus}
            </h2>
            <p className="mt-4 text-body-md leading-relaxed text-ink-muted">{details.focus}</p>
          </section>
          <section
            aria-labelledby="course-practice-title"
            className="rounded-card bg-surface-canvas p-6"
          >
            <h2 id="course-practice-title" className="text-headline-md text-ink">
              {copy.practice}
            </h2>
            <p className="mt-3 text-body-sm text-ink-muted">{copy.practiceNote}</p>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-body-md text-ink">
              {details.practice.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="course-preparation-title">
            <h2 id="course-preparation-title" className="text-headline-md text-ink">
              {copy.preparation}
            </h2>
            <p className="mt-4 text-body-md leading-relaxed text-ink-muted">
              {details.preparation}
            </p>
          </section>
          <section aria-labelledby="course-faq-title">
            <h2 id="course-faq-title" className="mb-5 text-headline-md text-ink">
              {copy.faq}
            </h2>
            <FaqList items={faq} />
          </section>
          <nav aria-label={copy.roadmap}>
            <h2 className="text-headline-md text-ink">{copy.roadmap}</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {courseLevels.map((id) => (
                <li key={id}>
                  {id === level ? (
                    <span
                      aria-current="page"
                      className="inline-flex min-h-tap items-center rounded-control bg-brand-teal-dark px-4 text-label-md text-white"
                    >
                      {course.name}
                    </span>
                  ) : (
                    <Link
                      href={localePath(locale, courseHref(id))}
                      className="inline-flex min-h-tap items-center rounded-control border border-border-subtle px-4 text-label-md text-brand-teal-dark hover:bg-surface-canvas"
                    >
                      {levelCourse(locale, id).name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <aside
            aria-labelledby="course-related-title"
            className="rounded-card border border-border-subtle p-6"
          >
            <h2 id="course-related-title" className="text-headline-md text-ink">
              {copy.related}
            </h2>
            <div className="mt-4 flex flex-col items-start gap-3 text-brand-teal-dark underline underline-offset-2">
              <Link href={localePath(locale, "/du-hoc-duc")}>{copy.university}</Link>
              <Link href={localePath(locale, "/du-hoc-nghe")}>{copy.vocational}</Link>
              <Link href={localePath(locale, "/niveau")}>{copy.overview}</Link>
            </div>
            <PrefillLink
              course={course.formValue}
              className={buttonClasses({
                variant: "primary",
                className: "mt-6 max-w-full text-center whitespace-normal",
              })}
            >
              {copy.enquiry}
            </PrefillLink>
          </aside>
        </div>
      </Section>
      <JsonLd data={courseData(locale, getSiteUrl().origin, course)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
    </>
  );
}

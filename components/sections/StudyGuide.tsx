import { courseHref, courseLevels, levelCourse } from "@/content/course-levels";
import Link from "next/link";
import type { StudyGuideContent, GuideSource } from "@/content/study-guide";
import type { Locale } from "@/lib/i18n/locale";
import { dateLocale, localePath } from "@/lib/i18n/locale";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { PrefillLink } from "@/components/form/PrefillLink";
import { buttonClasses } from "@/components/ui/button-styles";
import { FaqList } from "./FaqList";

function Sources({
  ids,
  label,
  sources,
}: {
  ids: readonly string[];
  label: string;
  sources: Record<string, GuideSource>;
}) {
  return (
    <p className="mt-4 text-body-sm text-ink-subtle">
      {label}:{" "}
      {ids.map((id, index) => (
        <span key={id}>
          {index > 0 && " · "}
          <a href={sources[id].href} className="text-brand-teal-dark underline underline-offset-2">
            {sources[id].title}
          </a>
        </span>
      ))}
    </p>
  );
}

export function StudyGuide({
  locale,
  copy,
  reviewedDate,
  sources,
  prefix,
  goal,
  alternativePath,
  comparisonSources,
}: {
  locale: Locale;
  copy: StudyGuideContent;
  reviewedDate: string;
  sources: Record<string, GuideSource>;
  prefix: string;
  goal: "du-hoc-nghe" | "du-hoc-dai-hoc";
  alternativePath: string;
  comparisonSources: string[];
}) {
  const reviewed = new Intl.DateTimeFormat(dateLocale(locale), {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${reviewedDate}T00:00:00Z`));
  return (
    <>
      <Section id={`huong-dan-${prefix}`} tone="white">
        <div className="mx-auto max-w-4xl">
          <p className="text-label-sm text-ink-subtle">
            {copy.reviewed} <time dateTime={reviewedDate}>{reviewed}</time>
          </p>
          <h2 id={`huong-dan-${prefix}-title`} className="mt-3 text-headline-lg text-ink">
            {copy.title}
          </h2>
          <p className="mt-4 text-body-lg text-ink-muted">{copy.intro}</p>
          <nav
            aria-label={copy.contents}
            className="mt-6 rounded-card border border-border-subtle bg-surface-canvas p-5"
          >
            <p className="text-label-md font-semibold text-ink">{copy.contents}</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              <li>
                <a href="#hinh-thuc" className="text-brand-teal-dark underline underline-offset-2">
                  {copy.comparisonTitle}
                </a>
              </li>
              {copy.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-brand-teal-dark underline underline-offset-2"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`#hoi-dap-${prefix}`}
                  className="text-brand-teal-dark underline underline-offset-2"
                >
                  {copy.faqTitle}
                </a>
              </li>
            </ul>
          </nav>
          <section id="hinh-thuc" aria-labelledby="hinh-thuc-title" className="mt-12 scroll-mt-28">
            <h2 id="hinh-thuc-title" className="text-headline-md text-ink">
              {copy.comparisonTitle}
            </h2>
            <div
              className="mt-5 overflow-x-auto rounded-card border border-border-subtle"
              role="region"
              aria-label={copy.comparisonTitle}
              tabIndex={0}
            >
              <table className="w-full min-w-[32rem] border-collapse text-left text-body-md">
                <thead className="bg-surface-canvas">
                  <tr>
                    {copy.comparisonHeaders.map((header) => (
                      <th key={header} scope="col" className="p-4 font-semibold text-ink">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {copy.comparisonRows.map((row) => (
                    <tr key={row[0]} className="border-t border-border-subtle">
                      <th scope="row" className="p-4 font-semibold text-ink">
                        {row[0]}
                      </th>
                      {row.slice(1).map((cell) => (
                        <td key={cell} className="p-4 align-top text-ink-muted">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Sources sources={sources} ids={comparisonSources} label={copy.sourceLabel} />
          </section>
          {copy.sections.map((section) => (
            <section
              id={section.id}
              key={section.id}
              aria-labelledby={`${section.id}-title`}
              className="mt-12 scroll-mt-28"
            >
              <h2 id={`${section.id}-title`} className="text-headline-md text-ink">
                {section.title}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="mt-4 text-body-md leading-relaxed text-ink-muted">
                  {p}
                </p>
              ))}
              {section.points && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-body-md text-ink-muted">
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
              {section.links && (
                <ul className="mt-4">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={localePath(locale, link.href)}
                        className="inline-flex min-h-tap items-center text-label-lg text-brand-teal-dark hover:underline"
                      >
                        {link.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <Sources sources={sources} ids={section.sources} label={copy.sourceLabel} />
            </section>
          ))}
          <section
            id={`hoi-dap-${prefix}`}
            aria-labelledby={`hoi-dap-${prefix}-title`}
            className="mt-12 scroll-mt-28"
          >
            <h2 id={`hoi-dap-${prefix}-title`} className="mb-5 text-headline-md text-ink">
              {copy.faqTitle}
            </h2>
            <FaqList items={copy.faqs} />
            <Sources
              sources={sources}
              ids={[...new Set(copy.faqs.map((faq) => faq.source))]}
              label={copy.sourceLabel}
            />
          </section>
          <aside
            className="mt-12 rounded-card bg-surface-canvas p-6"
            aria-labelledby={`${prefix}-next-title`}
          >
            <h2 id={`${prefix}-next-title`} className="text-headline-md text-ink">
              {copy.relatedTitle}
            </h2>
            <div className="mt-4 flex flex-wrap gap-4 text-brand-teal-dark underline underline-offset-2">
              <Link href={localePath(locale, "/niveau")}>{copy.coursesLabel}</Link>
              <Link href={localePath(locale, alternativePath)}>{copy.alternativeLabel}</Link>
            </div>
            <ul className="mt-4 flex flex-wrap gap-3">
              {courseLevels.map((level) => (
                <li key={level}>
                  <Link
                    href={localePath(locale, courseHref(level))}
                    className="inline-flex min-h-tap items-center rounded-control border border-border-subtle bg-white px-3 text-label-md text-brand-teal-dark hover:underline"
                  >
                    {levelCourse(locale, level).name}
                  </Link>
                </li>
              ))}
            </ul>
            <PrefillLink
              goal={goal}
              className={buttonClasses({
                variant: "primary",
                className: "mt-6 max-w-full text-center whitespace-normal",
              })}
            >
              {copy.cta}
            </PrefillLink>
          </aside>
          <section aria-labelledby={`${prefix}-sources-title`} className="mt-10">
            <h2 id={`${prefix}-sources-title`} className="text-headline-sm text-ink">
              {copy.sourcesTitle}
            </h2>
            <ul className="mt-3 space-y-2 text-body-sm">
              {Object.entries(sources).map(([id, source]) => (
                <li key={id}>
                  <a
                    href={source.href}
                    className="text-brand-teal-dark underline underline-offset-2"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: copy.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
    </>
  );
}

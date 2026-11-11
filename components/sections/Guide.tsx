import Link from "next/link";
import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";
import {
  guideHref,
  guideLabels,
  guideSources,
  guides,
  guidesReviewed,
  type GuideSlug,
} from "@/content/guides";
import { site } from "@/content/site";
import {
  dateLocale,
  localePath,
  openGraphLocale,
  pageAlternates,
  type Locale,
} from "@/lib/i18n/locale";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PrefillLink } from "@/components/form/PrefillLink";
import { Section } from "@/components/ui/Section";
import { buttonClasses } from "@/components/ui/button-styles";
import { FaqList } from "./FaqList";

export function guideMetadata(locale: Locale, slug: GuideSlug): Metadata {
  const { metaTitle: title, description } = guides[slug][locale];
  const alternates = pageAlternates(locale, guideHref(slug));
  return {
    title,
    description,
    alternates,
    openGraph: {
      type: "article",
      locale: openGraphLocale(locale),
      alternateLocale: [openGraphLocale(locale === "vi" ? "de" : "vi")],
      siteName: site.name,
      url: alternates.canonical,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** A sourced, dated guide page: quick answers, sections with sources, FAQ, CTA. */
export function Guide({ locale, slug }: { locale: Locale; slug: GuideSlug }) {
  const copy = guides[slug][locale];
  const labels = guideLabels[locale];
  const reviewed = new Intl.DateTimeFormat(dateLocale(locale), {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${guidesReviewed}T00:00:00Z`));
  const usedSources = [...new Set(copy.sections.flatMap((s) => s.sources))];

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ name: copy.title, path: guideHref(slug) }]} />
      <Section id={`${slug}-intro`}>
        <div className="mx-auto max-w-3xl">
          <p className="text-label-lg text-brand-teal-dark">{copy.eyebrow}</p>
          <h1 className="mt-4 text-headline-lg text-ink md:text-display-hero-mobile">
            {copy.title}
          </h1>
          <p className="mt-3 text-label-sm text-ink-subtle">
            {labels.reviewed} <time dateTime={guidesReviewed}>{reviewed}</time>
          </p>
          <p className="mt-6 text-body-lg text-ink-muted">{copy.intro}</p>
          <div className="mt-8 rounded-card border border-border-subtle bg-white p-6 shadow-tier-1">
            <h2 className="text-headline-sm text-ink">{copy.quickTitle}</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {copy.quick.map((item) => (
                <div key={item.label} className="flex gap-3">
                  <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-teal" />
                  <div>
                    <dt className="text-label-md text-ink-subtle">{item.label}</dt>
                    <dd className="mt-1 text-body-md font-semibold text-ink">{item.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
          <nav
            aria-label={labels.contents}
            className="mt-6 rounded-card border border-border-subtle bg-surface-canvas p-5"
          >
            <p className="text-label-md font-semibold text-ink">{labels.contents}</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {copy.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-brand-teal-dark underline underline-offset-2"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Section>
      <Section id={`${slug}-body`} tone="white">
        <div className="mx-auto max-w-3xl space-y-12">
          {copy.sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              className="scroll-mt-24"
            >
              <h2 id={`${s.id}-title`} className="text-headline-md text-ink">
                {s.title}
              </h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-4 text-body-lg text-ink-muted">
                  {p}
                </p>
              ))}
              {s.points ? (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-body-lg text-ink">
                  {s.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
              <p className="mt-4 text-body-sm text-ink-subtle">
                {labels.sources}:{" "}
                {s.sources.map((id, i) => (
                  <span key={id}>
                    {i > 0 && " · "}
                    <a
                      href={guideSources[id].href}
                      className="text-brand-teal-dark underline underline-offset-2"
                    >
                      {guideSources[id].title}
                    </a>
                  </span>
                ))}
              </p>
            </section>
          ))}

          <section aria-labelledby={`${slug}-faq-title`}>
            <h2 id={`${slug}-faq-title`} className="text-headline-md text-ink">
              {copy.faqTitle}
            </h2>
            <div className="mt-4">
              <FaqList items={copy.faqs} />
            </div>
          </section>

          <div className="rounded-card border border-border-subtle bg-surface-canvas p-6">
            <h2 className="text-headline-sm text-ink">{copy.ctaTitle}</h2>
            <p className="mt-2 text-body-md text-ink-muted">{copy.ctaText}</p>
            <PrefillLink
              goal={copy.goal}
              message={copy.message}
              className={buttonClasses({ className: "mt-5 text-center whitespace-normal" })}
            >
              {copy.cta}
            </PrefillLink>
          </div>

          <div>
            <h2 className="text-headline-sm text-ink">{labels.related}</h2>
            <ul className="mt-3">
              {copy.related.map((link) => (
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
          </div>

          <section aria-labelledby={`${slug}-sources-title`}>
            <h2 id={`${slug}-sources-title`} className="text-headline-sm text-ink">
              {labels.sourcesTitle}
            </h2>
            <ul className="mt-3 space-y-1 text-body-sm">
              {usedSources.map((id) => (
                <li key={id}>
                  <a
                    href={guideSources[id].href}
                    className="text-brand-teal-dark underline underline-offset-2"
                  >
                    {guideSources[id].title}
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

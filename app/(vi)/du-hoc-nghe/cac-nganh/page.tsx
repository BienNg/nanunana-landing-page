import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  berufHref,
  berufSlugs,
  berufSummary,
  berufTitles,
  berufeList,
  berufeListHref,
  berufeReviewed,
} from "@/content/ausbildung-berufe";
import { site } from "@/content/site";
import { getLocale } from "@/lib/i18n/get-locale";
import { dateLocale, localePath, openGraphLocale, pageAlternates } from "@/lib/i18n/locale";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { metaTitle: title, description } = berufeList[locale];
  const alternates = pageAlternates(locale, berufeListHref);
  return {
    title,
    description,
    alternates,
    openGraph: {
      type: "website",
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

export default async function BerufeListPage() {
  const locale = await getLocale();
  const copy = berufeList[locale];
  const reviewed = new Intl.DateTimeFormat(dateLocale(locale), {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${berufeReviewed}T00:00:00Z`));
  const origin = getSiteUrl().origin;

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          ...copy.parents.map((p) => ({ name: p.label, path: p.href })),
          { name: copy.title, path: berufeListHref },
        ]}
      />
      <Section id="cac-nganh">
        <div className="mx-auto max-w-4xl">
          <p className="text-label-lg text-brand-teal-dark">{copy.eyebrow}</p>
          <h1 className="mt-4 text-headline-lg text-ink md:text-display-hero-mobile">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-ink-muted">{copy.intro}</p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {berufSlugs.map((slug) => {
              const job = berufSummary(locale, slug);
              return (
                <li key={slug}>
                  <Link
                    href={localePath(locale, berufHref(slug))}
                    className="group flex h-full flex-col rounded-card border border-border-subtle bg-white p-6 shadow-tier-1 transition-[box-shadow,border-color] duration-200 hover:border-surface-container-high hover:shadow-tier-2"
                  >
                    <span className="text-label-md text-ink-subtle">
                      {job.group} · {copy.duration}
                    </span>
                    <span className="mt-2 text-headline-sm text-ink">{job.name}</span>
                    <span className="mt-1 text-body-sm text-ink-subtle">
                      {copy.official}: {berufTitles[slug]}
                    </span>
                    <span className="mt-3 flex-1 text-body-md text-ink-muted">{job.short}</span>
                    <span className="mt-4 inline-flex items-center gap-1 text-label-lg text-brand-teal-dark group-hover:underline">
                      {copy.more} <ArrowRight aria-hidden className="size-4" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-10 text-body-sm text-ink-subtle">
            {copy.sourcesNote} <time dateTime={berufeReviewed}>{reviewed}</time>.
          </p>
        </div>
      </Section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: copy.title,
          itemListElement: berufSlugs.map((slug, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: berufSummary(locale, slug).name,
            url: `${origin}${localePath(locale, berufHref(slug))}`,
          })),
        }}
      />
    </>
  );
}

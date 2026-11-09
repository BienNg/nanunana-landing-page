import Link from "next/link";
import { ArrowRight, Landmark, Wrench } from "lucide-react";
import {
  pathways as pathwaysByLocale,
  pathwaysSection as pathwaysSectionByLocale,
  type Pathway,
} from "@/content/pathways";
import { getLocale } from "@/lib/i18n/get-locale";
import { localePath, type Locale } from "@/lib/i18n/locale";
import { pathwayPath, sectionIds } from "@/content/nav";
import { Badge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/button-styles";
import { PrefillLink } from "@/components/form/PrefillLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { VerifyMark } from "@/components/ui/VerifyMark";

function PathwayCard({
  p,
  index,
  locale,
  moreLabel,
}: {
  p: Pathway;
  index: number;
  locale: Locale;
  moreLabel: string;
}) {
  const Icon = index === 0 ? Landmark : Wrench;
  const lead = p.paragraphs[0];
  return (
    <article
      id={p.id}
      aria-labelledby={`${p.id}-title`}
      className="flex scroll-mt-24 flex-col overflow-hidden rounded-card border border-border-subtle bg-white shadow-tier-2"
    >
      <div className="relative">
        <SiteImage
          image={p.image}
          sizes="(min-width: 1024px) 600px, 100vw"
          wrapperClassName="aspect-[16/9]"
        />
        <VerifyMark claim={p.highlight} as="div" className="absolute inset-x-3 bottom-3">
          {(t) => (
            <p className="rounded-control bg-ink/85 px-4 py-2.5 text-label-md text-white backdrop-blur">
              {t}
            </p>
          )}
        </VerifyMark>
      </div>

      <div className="flex flex-1 flex-col p-space-lg md:p-8">
        <Badge className="self-start">
          <Icon aria-hidden /> {p.eyebrow}
        </Badge>
        <h3 id={`${p.id}-title`} className="mt-4 text-headline-md text-ink md:text-headline-lg">
          {p.title}
        </h3>
        {p.tagline ? (
          <p className="mt-2 text-body-md font-semibold text-brand-teal-dark">{p.tagline}</p>
        ) : null}
        {lead ? <p className="mt-3 text-body-md text-ink-muted">{lead}</p> : null}

        <div className="mt-auto flex flex-col gap-3 pt-8">
          <Link
            href={localePath(locale, pathwayPath[p.id])}
            className="inline-flex min-h-tap items-center gap-1 text-label-md font-semibold text-brand-teal-dark hover:underline"
          >
            {moreLabel} <ArrowRight aria-hidden className="size-4" />
          </Link>
          <PrefillLink
            goal={p.goal}
            press
            className={buttonClasses({
              variant: index === 0 ? "secondary" : "primary",
              fullWidth: true,
            })}
          >
            {p.cta} <ArrowRight aria-hidden />
          </PrefillLink>
        </div>
      </div>
    </article>
  );
}

export async function Pathways() {
  const locale = await getLocale();
  const pathwaysSection = pathwaysSectionByLocale[locale];
  const pathways = pathwaysByLocale[locale];
  return (
    <section
      id={sectionIds.pathways}
      aria-labelledby={`${sectionIds.pathways}-title`}
      className="bg-surface-canvas section-y"
    >
      <div className="container-page">
        <SectionHeading
          id={`${sectionIds.pathways}-title`}
          eyebrow={pathwaysSection.eyebrow}
          title={pathwaysSection.title}
          intro={pathwaysSection.intro}
        />
        <div className="grid gap-gutter-mobile md:gap-gutter lg:grid-cols-2">
          {pathways.map((p, i) => (
            <PathwayCard
              key={p.id}
              p={p}
              index={i}
              locale={locale}
              moreLabel={pathwaysSection.more}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

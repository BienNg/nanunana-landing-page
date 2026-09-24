import { ArrowRight, CircleCheck, Landmark, Wrench } from "lucide-react";
import { pathways, pathwaysSection, type Pathway } from "@/content/pathways";
import { sectionIds } from "@/content/nav";
import { isVisible } from "@/content/verify";
import { Badge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/Button";
import { PrefillLink } from "@/components/form/PrefillLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { VerifyMark } from "@/components/ui/VerifyMark";

function PathwayCard({ p, index }: { p: Pathway; index: number }) {
  const Icon = index === 0 ? Landmark : Wrench;
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
        <div className="mt-3 space-y-3 text-body-md text-ink-muted">
          {p.paragraphs.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>

        <ul className="mt-6 space-y-3">
          {p.bullets.map((b) =>
            isVisible(b) ? (
              <li key={b.value} className="flex gap-2.5 text-body-md text-ink">
                <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-trust-emerald" />
                <VerifyMark claim={b} />
              </li>
            ) : null,
          )}
        </ul>

        <div className="mt-auto pt-8">
          <PrefillLink
            goal={p.goal}
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

export function Pathways() {
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
            <PathwayCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

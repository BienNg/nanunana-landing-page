import { UniversityGuide } from "./UniversityGuide";
import { AusbildungGuide } from "./AusbildungGuide";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CircleCheck } from "lucide-react";
import { pathways as pathwaysByLocale } from "@/content/pathways";
import { pathwayPath, sectionIds } from "@/content/nav";
import { getLocale } from "@/lib/i18n/get-locale";
import { isVisible } from "@/content/verify";
import { Badge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/button-styles";
import { PrefillLink } from "@/components/form/PrefillLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { VerifyMark } from "@/components/ui/VerifyMark";
import { Process } from "./Process";

const trackId = {
  "du-hoc-dai-hoc": sectionIds.processUniversity,
  "du-hoc-nghe": sectionIds.processVocational,
} as const;

export async function PathwayDetail({ id }: { id: keyof typeof pathwayPath }) {
  const locale = await getLocale();
  const pathway = pathwaysByLocale[locale].find((item) => item.id === id);
  if (!pathway) return null;

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ name: pathway.pageTitle, path: pathwayPath[id] }]} />
      <Section id={id} tone="canvas">
        <div className="grid items-start gap-gutter-mobile lg:grid-cols-2 lg:gap-gutter">
          <SiteImage
            image={pathway.image}
            sizes="(min-width: 1024px) 600px, 100vw"
            wrapperClassName="aspect-[16/9] rounded-card"
            priority
          />
          <div>
            <Badge>{pathway.eyebrow}</Badge>
            <SectionHeading
              as="h1"
              align="left"
              className="mt-4 mb-0"
              id={`${id}-title`}
              title={pathway.title}
              intro={pathway.tagline}
            />
            <div className="mt-4 space-y-3 text-body-md text-ink-muted">
              {pathway.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <VerifyMark claim={pathway.highlight} as="div" className="mt-6">
              {(text) => (
                <p className="rounded-control bg-ink px-4 py-2.5 text-label-md text-white">
                  {text}
                </p>
              )}
            </VerifyMark>
            <ul className="mt-6 space-y-3">
              {pathway.bullets.map((bullet) =>
                isVisible(bullet) ? (
                  <li key={bullet.value} className="flex gap-2.5 text-body-md text-ink">
                    <CircleCheck
                      aria-hidden
                      className="mt-0.5 size-5 shrink-0 text-trust-emerald"
                    />
                    <VerifyMark claim={bullet} />
                  </li>
                ) : null,
              )}
            </ul>
            <div className="mt-8">
              <PrefillLink
                goal={pathway.goal}
                press
                className={buttonClasses({ variant: "primary" })}
              >
                {pathway.cta}
              </PrefillLink>
            </div>
          </div>
        </div>
      </Section>
      {id === "du-hoc-nghe" ? (
        <AusbildungGuide locale={locale} />
      ) : (
        <UniversityGuide locale={locale} />
      )}
      <Process only={trackId[id]} />
    </>
  );
}

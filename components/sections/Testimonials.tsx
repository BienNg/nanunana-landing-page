import { MapPin, Quote } from "lucide-react";
import { testimonials, testimonialsSection } from "@/content/testimonials";
import { sectionIds } from "@/content/nav";
import { isVisible } from "@/content/verify";
import { Avatar } from "@/components/ui/Avatar";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VerifyMark } from "@/components/ui/VerifyMark";
import { TestimonialCarousel } from "./TestimonialCarousel";

/** Hidden entirely until at least one real story is confirmed. */
export function Testimonials() {
  const visible = testimonials.filter((t) => isVisible(t.status));
  if (visible.length === 0) return null;

  return (
    <Section id={sectionIds.testimonials} tone="white">
      <SectionHeading
        id={`${sectionIds.testimonials}-title`}
        eyebrow={testimonialsSection.eyebrow}
        title={testimonialsSection.title}
        intro={testimonialsSection.intro}
      />
      <TestimonialCarousel
        label={testimonialsSection.title}
        slides={visible.map((t) => (
          <VerifyMark key={t.id} claim={t.status} as="div" className="h-full">
            {() => (
              <figure className="flex h-full flex-col rounded-card border border-border-subtle bg-surface-canvas p-space-lg">
                <Quote aria-hidden className="size-7 text-accent-coral" />
                <blockquote className="mt-3 flex-1 text-body-md text-ink">
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Avatar name={t.name} photo={t.photo} size={48} />
                  <div>
                    <p className="text-label-lg text-ink">{t.name}</p>
                    <p className="text-body-sm text-ink-muted">{t.path}</p>
                    <p className="inline-flex items-center gap-1 text-body-sm text-ink-subtle">
                      <MapPin aria-hidden className="size-3.5" /> {t.cityInGermany}
                    </p>
                  </div>
                </figcaption>
              </figure>
            )}
          </VerifyMark>
        ))}
      />
    </Section>
  );
}

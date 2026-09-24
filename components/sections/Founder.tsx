import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";
import { founderSection } from "@/content/founder";
import { founder } from "@/content/team";
import { images } from "@/content/images";
import { prefillHref } from "@/content/form-options";
import { sectionIds } from "@/content/nav";
import { LinkButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

const isDev = process.env.NODE_ENV !== "production";

export function Founder() {
  return (
    <Section id={sectionIds.founder}>
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-gutter">
        {/* Portrait + credentials */}
        <figure className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm overflow-hidden rounded-media shadow-tier-2 lg:max-w-none">
            <Image
              src={images.founderPhuong.src}
              alt={images.founderPhuong.alt}
              placeholder="blur"
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 384px, 90vw"
              className="aspect-[4/5] h-auto w-full object-cover"
            />
            {isDev && images.founderPhuong.placeholder ? (
              <span className="absolute top-3 left-3 rounded-full bg-amber px-2 py-0.5 text-label-sm text-ink uppercase">
                Ảnh mẫu
              </span>
            ) : null}
            <figcaption className="absolute inset-x-3 bottom-3 rounded-card bg-white/95 p-4 shadow-tier-2 backdrop-blur">
              <p className="text-headline-sm text-ink">{founderSection.displayName}</p>
              <p className="text-label-md text-brand-teal-dark">{founder.role} NaNu NaNa</p>
            </figcaption>
          </div>
          <ul
            className="mx-auto mt-5 max-w-sm space-y-2 lg:max-w-none"
            aria-label="Học vấn & kinh nghiệm"
          >
            {founder.bio.map((line) => (
              <li
                key={line}
                className="flex gap-2.5 rounded-control border border-border-subtle bg-white px-4 py-2.5 text-body-sm text-ink"
              >
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" />
                {line}
              </li>
            ))}
          </ul>
        </figure>

        {/* Story */}
        <div className="lg:col-span-7 lg:pl-6">
          <p className="text-label-sm text-brand-teal-dark uppercase">{founderSection.eyebrow}</p>
          <h2
            id={`${sectionIds.founder}-title`}
            className="mt-3 text-headline-xl-mobile text-ink md:text-headline-xl"
          >
            {founderSection.greeting}
          </h2>
          <div className="mt-5 space-y-4 text-body-md text-ink-muted md:text-body-lg">
            {founderSection.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <blockquote className="relative mt-8 rounded-card border-l-4 border-accent-coral bg-white p-6 shadow-tier-1 md:p-8">
            <Quote aria-hidden className="absolute top-4 right-4 size-8 text-accent-coral/30" />
            <p className="text-headline-sm text-ink md:text-headline-md">
              “{founderSection.quote}”
            </p>
            <footer className="mt-3 text-label-md text-ink-subtle">
              — {founderSection.displayName}
            </footer>
          </blockquote>

          <div className="mt-8">
            <LinkButton href={prefillHref({ goal: "dinh-huong" })} size="lg">
              {founderSection.cta} <ArrowRight aria-hidden />
            </LinkButton>
          </div>
        </div>
      </div>
    </Section>
  );
}

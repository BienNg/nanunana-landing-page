import Image from "next/image";
import { ArrowRight, BookOpen, CircleCheck, MapPin, Sparkles } from "lucide-react";
import { hero } from "@/content/hero";
import { images } from "@/content/images";
import { sectionIds } from "@/content/nav";
import { isVisible } from "@/content/verify";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { VerifyMark } from "@/components/ui/VerifyMark";

export function Hero() {
  const visibleChips = hero.card.chips.filter((c) => isVisible(c.value));

  return (
    <section
      id={sectionIds.hero}
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-surface-canvas"
    >
      {/* soft brand wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_20%,rgba(0,163,191,0.12),transparent_70%),radial-gradient(40%_50%_at_0%_100%,rgba(238,135,42,0.08),transparent_70%)]"
      />
      <div className="relative container-page grid items-center gap-10 pt-10 pb-14 md:pt-14 md:pb-20 lg:grid-cols-12 lg:gap-gutter">
        <div className="lg:col-span-7" data-hero-copy>
          <div className="flex flex-wrap items-center gap-2" data-hero-item>
            <VerifyMark claim={hero.intakeBadge}>
              {(t) => (
                <Badge tone="coral">
                  <Sparkles aria-hidden /> {t}
                </Badge>
              )}
            </VerifyMark>
            <VerifyMark claim={hero.kicker} fallback={<Badge>{hero.kickerFallback}</Badge>}>
              {(t) => <Badge>{t}</Badge>}
            </VerifyMark>
          </div>

          <h1
            id="hero-title"
            className="mt-5 text-[40px] leading-[46px] font-extrabold tracking-[-0.025em] text-ink sm:text-display-hero lg:text-[56px] lg:leading-[64px]"
            data-hero-item
          >
            <span className="block text-brand-teal-dark">{hero.titleLines[0]}</span>
            <span className="block">{hero.titleLines[1]}</span>
          </h1>

          <p className="mt-5 max-w-xl text-headline-sm text-ink md:text-headline-md" data-hero-item>
            {hero.taglineLead} —{" "}
            <span className="font-bold text-coral-fill">{hero.taglineEmphasis}</span>
          </p>
          <p className="mt-3 max-w-xl text-body-md text-ink-muted md:text-body-lg" data-hero-item>
            {hero.supporting}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-hero-item>
            <LinkButton href={`/#${sectionIds.contact}`} size="lg">
              {hero.primaryCta} <ArrowRight aria-hidden />
            </LinkButton>
            <LinkButton href={`/#${sectionIds.courses}`} size="lg" variant="outline">
              <BookOpen aria-hidden /> {hero.secondaryCta}
            </LinkButton>
          </div>

          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2" data-hero-item>
            {hero.trustBullets.map((b) =>
              isVisible(b) ? (
                <li key={b.value} className="flex gap-2 text-body-sm text-ink-muted">
                  <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-trust-emerald" />
                  <VerifyMark claim={b} />
                </li>
              ) : null,
            )}
          </ul>
        </div>

        {/* Brand visual card */}
        <div className="lg:col-span-5" data-hero-card>
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rotate-2 rounded-media bg-gradient-to-br from-brand-teal-light/25 to-accent-coral/20 blur-[2px]"
            />
            <div className="rounded-media border border-border-subtle bg-white p-6 shadow-tier-3 md:p-8">
              <div className="flex items-center justify-between text-label-sm text-ink-subtle uppercase">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin aria-hidden className="size-3.5 text-teal" />
                  {hero.card.places}
                </span>
              </div>
              <Image
                src={images.logoFull.src}
                alt={images.logoFull.alt}
                priority
                sizes="(min-width: 1024px) 420px, 80vw"
                className="mx-auto my-6 h-auto w-full max-w-[340px]"
              />
              <p className="text-center text-headline-sm text-brand-teal-dark">{hero.card.motto}</p>
              {visibleChips.length > 0 ? (
                <dl className="mt-6 grid grid-cols-2 gap-3">
                  {visibleChips.map((c) => (
                    <div key={c.label} className="rounded-card bg-surface-card-subtle p-3.5">
                      <dt className="text-label-sm text-ink-subtle uppercase">{c.label}</dt>
                      <dd className="mt-1 text-headline-sm text-ink">
                        <VerifyMark claim={c.value} />
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

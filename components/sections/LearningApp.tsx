import {
  ArrowRight,
  BookOpen,
  Headphones,
  Monitor,
  Play,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import {
  learningAppSection,
  type LearningAppDevice,
  type LearningAppFeature,
} from "@/content/learning-app";
import { sectionIds } from "@/content/nav";
import { Badge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/button-styles";
import { PrefillLink } from "@/components/form/PrefillLink";
import { SiteImage } from "@/components/ui/SiteImage";
import { VerifyMark } from "@/components/ui/VerifyMark";

const featureIcons: Record<LearningAppFeature["id"], LucideIcon> = {
  video: Play,
  vocab: BookOpen,
  listening: Headphones,
};

const deviceIcons: Record<LearningAppDevice["id"], LucideIcon> = {
  phone: Smartphone,
  desktop: Monitor,
};

const deviceFrame: Record<
  LearningAppDevice["id"],
  { className: string; screen: string; sizes: string }
> = {
  desktop: {
    className: "absolute inset-x-0 top-0 z-0",
    screen: "aspect-[16/10]",
    sizes: "(min-width: 1024px) 640px, 92vw",
  },
  phone: {
    className: "absolute right-0 bottom-0 z-10 w-[34%] sm:right-[3%] sm:w-[28%]",
    screen: "aspect-[9/16]",
    sizes: "(min-width: 1024px) 200px, 34vw",
  },
};

const devicesById = Object.fromEntries(
  learningAppSection.devices.map((device) => [device.id, device]),
) as Record<LearningAppDevice["id"], LearningAppDevice>;

function Device({ device }: { device: LearningAppDevice }) {
  const frame = deviceFrame[device.id];
  const bezel =
    device.id === "desktop"
      ? "overflow-hidden rounded-xl border border-border-subtle bg-white shadow-tier-2"
      : "overflow-hidden rounded-[1.35rem] border-[5px] border-ink bg-ink shadow-tier-3 sm:rounded-[1.6rem] sm:border-[6px]";

  return (
    <figure className={frame.className}>
      <div className={bezel}>
        {device.id === "desktop" ? (
          <div
            aria-hidden
            className="flex h-7 items-center gap-1.5 border-b border-border-subtle bg-surface-card-subtle px-3 sm:h-8"
          >
            <span className="size-2 rounded-full bg-border-subtle" />
            <span className="size-2 rounded-full bg-border-subtle" />
            <span className="size-2 rounded-full bg-border-subtle" />
          </div>
        ) : null}
        <SiteImage image={device.image} fill sizes={frame.sizes} wrapperClassName={frame.screen} />
      </div>
      <figcaption className="sr-only">{device.label}</figcaption>
    </figure>
  );
}

function Feature({ feature }: { feature: LearningAppFeature }) {
  const Icon = featureIcons[feature.id];
  return (
    <li className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-brand-teal-dark shadow-tier-1">
        <Icon aria-hidden className="size-5" />
      </span>
      <div>
        <h3 className="text-headline-sm text-ink">
          {feature.stat ? (
            <VerifyMark claim={feature.stat}>
              {(value) => <span className="mr-2 text-brand-teal-dark tabular-nums">{value}</span>}
            </VerifyMark>
          ) : null}
          {feature.title}
        </h3>
        <p className="mt-1 text-body-md text-ink-muted">{feature.text}</p>
      </div>
    </li>
  );
}

export function LearningApp() {
  return (
    <section
      id={sectionIds.learningApp}
      aria-labelledby={`${sectionIds.learningApp}-title`}
      className="scroll-mt-24 bg-surface-container-low section-y"
    >
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-gutter">
        <div className="lg:col-span-6">
          <Badge>{learningAppSection.eyebrow}</Badge>
          <h2
            id={`${sectionIds.learningApp}-title`}
            className="mt-4 text-headline-xl-mobile text-balance text-ink md:text-headline-xl"
          >
            {learningAppSection.title}
          </h2>
          <p className="mt-4 text-body-md text-pretty text-ink-muted md:text-body-lg">
            {learningAppSection.intro}
          </p>
          <div className="mt-5">
            <VerifyMark claim={learningAppSection.unique} as="div">
              {(text) => (
                <p className="rounded-card border border-teal/25 bg-white px-4 py-3 text-body-md font-semibold text-ink">
                  {text}
                </p>
              )}
            </VerifyMark>
          </div>

          <ul className="mt-8 space-y-6">
            {learningAppSection.features.map((feature) => (
              <Feature key={feature.id} feature={feature} />
            ))}
          </ul>

          <p className="mt-8 text-body-sm text-ink-muted">{learningAppSection.included}</p>
          <div className="mt-4">
            <PrefillLink press className={buttonClasses({ size: "lg" })}>
              {learningAppSection.cta} <ArrowRight aria-hidden />
            </PrefillLink>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div
            role="group"
            aria-label={learningAppSection.devicesLabel}
            className="relative mx-auto h-[26rem] w-full max-w-xl sm:h-[30rem] lg:h-[34rem] lg:max-w-none"
          >
            <Device device={devicesById.desktop} />
            <Device device={devicesById.phone} />
          </div>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {learningAppSection.devices.map((device) => {
              const Icon = deviceIcons[device.id];
              return (
                <li
                  key={device.id}
                  className="inline-flex items-center gap-1.5 text-label-md text-ink-muted"
                >
                  <Icon aria-hidden className="size-4 text-brand-teal-dark" />
                  {device.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

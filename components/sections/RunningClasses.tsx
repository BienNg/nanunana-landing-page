import { ArrowRight, ChevronRight } from "lucide-react";
import {
  classCountLabel,
  classRegisterMessage,
  classRegisterSr,
  courseValueForLevel,
  formatClassDate,
  levelTone,
  locationLabel,
  runningClassesSection,
} from "@/content/classes";
import { sectionIds } from "@/content/nav";
import { getLocale } from "@/lib/i18n/get-locale";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/cn";
import type { RunningClass } from "@/lib/notion/classes";
import { getRunningClasses } from "@/lib/notion/classes";
import { PrefillLink } from "@/components/form/PrefillLink";
import { Badge } from "@/components/ui/Badge";
import { CourseBadge } from "@/components/ui/CourseBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ClassPhotos } from "./ClassPhotos";
import { LinkButton } from "@/components/ui/Button";

export const scheduleHref = "/lich-hoc";
/** Classes shown on the homepage; the rest live on the schedule page. */
const HOME_LIMIT = 6;

function LevelLabel({ level }: { level: string | null }) {
  if (!level) return <span className="text-ink-subtle">—</span>;
  const tone = levelTone(level);
  if (!tone) {
    return (
      <Badge tone="neutral" className="normal-case">
        {level}
      </Badge>
    );
  }
  return <CourseBadge level={tone} label={level} className="normal-case" />;
}

function ClassName({ item, className }: { item: RunningClass; className?: string }) {
  return (
    <span className={cn("text-label-lg text-ink", className)}>
      {item.icon ? (
        <span aria-hidden className="mr-2">
          {item.icon}
        </span>
      ) : null}
      {item.name}
    </span>
  );
}

function LocationLabel({ location, locale }: { location: string | null; locale: Locale }) {
  if (!location) return <span className="text-ink-subtle">—</span>;
  return (
    <Badge tone="neutral" className="normal-case">
      {locationLabel(locale, location)}
    </Badge>
  );
}

function RegisterLink({ item, locale }: { item: RunningClass; locale: Locale }) {
  const copy = runningClassesSection[locale];
  return (
    <PrefillLink
      course={courseValueForLevel(item.level)}
      message={classRegisterMessage(locale, item)}
      className="inline-flex min-h-tap items-center gap-1 rounded-control bg-surface-container-low px-2.5 text-label-md whitespace-nowrap text-brand-teal-dark ring-1 ring-teal/30 ring-inset hover:bg-white hover:ring-teal/50 md:-mr-2"
    >
      {copy.register}
      <span className="sr-only">{classRegisterSr(locale, item.name)}</span>
      <ChevronRight aria-hidden className="size-4" />
    </PrefillLink>
  );
}

function ClassTable({ classes, locale }: { classes: RunningClass[]; locale: Locale }) {
  const copy = runningClassesSection[locale];
  const cols = copy.columns;
  return (
    <div className="overflow-x-hidden rounded-card border border-border-subtle bg-white shadow-tier-1 md:overflow-x-auto">
      <table className="hidden w-full min-w-[920px] border-collapse text-left md:table">
        <thead>
          <tr className="bg-surface-container-low text-label-sm text-ink-subtle uppercase">
            <th scope="col" className="px-5 py-3 font-semibold">
              {cols.name}
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              {cols.level}
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              {cols.location}
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              {cols.begin}
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              {cols.end}
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              {cols.media}
            </th>
            <th scope="col" className="px-5 py-3">
              <span className="sr-only">{copy.register}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {classes.map((item) => (
            <tr key={item.id} className="border-t border-border-subtle">
              <th scope="row" className="px-5 py-4 text-left font-semibold">
                <ClassName item={item} />
              </th>
              <td className="px-5 py-4">
                <LevelLabel level={item.level} />
              </td>
              <td className="px-5 py-4">
                <LocationLabel location={item.location} locale={locale} />
              </td>
              <td className="px-5 py-4 text-body-md text-ink-muted">
                <time dateTime={item.begin ?? undefined}>
                  {formatClassDate(item.begin, locale)}
                </time>
              </td>
              <td className="px-5 py-4 text-body-md text-ink-muted">
                <time dateTime={item.end}>{formatClassDate(item.end, locale)}</time>
              </td>
              <td className="px-5 py-4">
                <ClassPhotos name={item.name} media={item.media} />
              </td>
              <td className="px-5 py-4 text-right">
                <RegisterLink item={item} locale={locale} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul data-class-list className="md:hidden">
        {classes.map((item) => (
          <li key={item.id} className="relative border-t border-border-subtle first:border-t-0">
            <div
              className={item.media.length > 0 ? "pt-4 pr-[9.75rem] pb-1 pl-4" : "pt-4 pr-4 pl-4"}
            >
              <ClassName item={item} className="block text-pretty break-words" />
              {item.level || item.location ? (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {item.level ? <LevelLabel level={item.level} /> : null}
                  {item.location ? (
                    <LocationLabel location={item.location} locale={locale} />
                  ) : null}
                </div>
              ) : null}
              <dl className="mt-3 grid grid-cols-2 gap-2 text-body-sm">
                <div className="min-w-0">
                  <dt className="text-label-sm text-ink-subtle uppercase">{cols.begin}</dt>
                  <dd className="mt-0.5 text-ink">
                    <time dateTime={item.begin ?? undefined}>
                      {formatClassDate(item.begin, locale)}
                    </time>
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-label-sm text-ink-subtle uppercase">{cols.end}</dt>
                  <dd className="mt-0.5 text-ink">
                    <time dateTime={item.end}>{formatClassDate(item.end, locale)}</time>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="relative z-10 flex justify-start pb-1 pl-4">
              <RegisterLink item={item} locale={locale} />
            </div>
            {item.media.length > 0 ? (
              <div className="absolute inset-y-0 right-0 w-36">
                <ClassPhotos layout="fill" name={item.name} media={item.media} />
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ClassesFrame({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const copy = runningClassesSection[locale];
  return (
    <Section id={sectionIds.classes} tone="canvas" className="scroll-mt-24">
      <SectionHeading
        id={`${sectionIds.classes}-title`}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />
      {children}
    </Section>
  );
}

export async function RunningClasses() {
  const locale = await getLocale();
  const classes = await getRunningClasses();
  if (classes.length === 0) return null;
  const copy = runningClassesSection[locale];
  const shown = classes.slice(0, HOME_LIMIT);

  return (
    <ClassesFrame locale={locale}>
      <p className="mb-4 text-center text-body-sm text-ink-muted">
        {classCountLabel(locale, classes.length)}
      </p>
      <ClassTable classes={shown} locale={locale} />
      {classes.length > shown.length ? (
        <div className="mt-6 text-center">
          <LinkButton href={scheduleHref} variant="outline">
            {copy.seeAll(classes.length)} <ArrowRight aria-hidden />
          </LinkButton>
        </div>
      ) : null}
    </ClassesFrame>
  );
}

/** Full list for the schedule page, with its own h1. */
export async function ClassSchedule() {
  const locale = await getLocale();
  const classes = await getRunningClasses();
  const copy = runningClassesSection[locale];
  return (
    <Section id={sectionIds.classes} tone="canvas">
      <p className="text-label-lg text-brand-teal-dark">{copy.eyebrow}</p>
      <h1 className="mt-4 text-display-hero-mobile text-ink md:text-display-hero">
        {copy.page.title}
      </h1>
      <p className="mt-6 mb-8 max-w-2xl text-body-lg text-ink-muted">{copy.page.intro}</p>
      {classes.length > 0 ? (
        <>
          <p className="mb-4 text-body-sm text-ink-muted">
            {classCountLabel(locale, classes.length)}
          </p>
          <ClassTable classes={classes} locale={locale} />
        </>
      ) : null}
    </Section>
  );
}

export async function RunningClassesFallback() {
  const locale = await getLocale();
  return (
    <ClassesFrame locale={locale}>
      <div
        aria-hidden
        className="h-72 animate-pulse rounded-card border border-border-subtle bg-white"
      />
    </ClassesFrame>
  );
}

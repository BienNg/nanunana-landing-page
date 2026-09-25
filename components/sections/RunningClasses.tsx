import { ChevronRight } from "lucide-react";
import {
  courseValueForLevel,
  formatClassDate,
  levelTone,
  locationLabel,
  runningClassesSection,
} from "@/content/classes";
import { sectionIds } from "@/content/nav";
import { cn } from "@/lib/cn";
import type { RunningClass } from "@/lib/notion/classes";
import { getRunningClasses } from "@/lib/notion/classes";
import { PrefillLink } from "@/components/form/PrefillLink";
import { Badge } from "@/components/ui/Badge";
import { CourseBadge } from "@/components/ui/CourseBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ClassListJump } from "./ClassListJump";
import { ClassPhotos } from "./ClassPhotos";

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

function LocationLabel({ location }: { location: string | null }) {
  if (!location) return <span className="text-ink-subtle">—</span>;
  return (
    <Badge tone="neutral" className="normal-case">
      {locationLabel(location)}
    </Badge>
  );
}

function RegisterLink({ item }: { item: RunningClass }) {
  return (
    <PrefillLink
      course={courseValueForLevel(item.level)}
      className="-mr-2 inline-flex min-h-tap items-center gap-1 rounded-control px-2 text-label-md whitespace-nowrap text-brand-teal-dark hover:bg-surface-container-low"
    >
      {runningClassesSection.register}
      <span className="sr-only"> lớp {item.name}</span>
      <ChevronRight aria-hidden className="size-4" />
    </PrefillLink>
  );
}

function ClassTable({ classes }: { classes: RunningClass[] }) {
  const cols = runningClassesSection.columns;
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
              <span className="sr-only">{runningClassesSection.register}</span>
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
                <LocationLabel location={item.location} />
              </td>
              <td className="px-5 py-4 text-body-md text-ink-muted">
                <time dateTime={item.begin ?? undefined}>{formatClassDate(item.begin)}</time>
              </td>
              <td className="px-5 py-4 text-body-md text-ink-muted">
                <time dateTime={item.end}>{formatClassDate(item.end)}</time>
              </td>
              <td className="px-5 py-4">
                <ClassPhotos name={item.name} media={item.media} />
              </td>
              <td className="px-5 py-4 text-right">
                <RegisterLink item={item} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul data-class-list className="md:hidden">
        {classes.map((item) => (
          <li
            key={item.id}
            className="border-t border-border-subtle py-4 pr-16 pl-4 first:border-t-0"
          >
            <ClassName item={item} className="block text-pretty break-words" />
            <div className="mt-3 flex items-start gap-3">
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                {item.level ? <LevelLabel level={item.level} /> : null}
                {item.location ? <LocationLabel location={item.location} /> : null}
              </div>
              {item.media.length > 0 ? (
                <div className="shrink-0">
                  <ClassPhotos name={item.name} media={item.media} />
                </div>
              ) : null}
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-body-sm">
              <div className="min-w-0">
                <dt className="text-label-sm text-ink-subtle uppercase">{cols.begin}</dt>
                <dd className="mt-0.5 text-ink">
                  <time dateTime={item.begin ?? undefined}>{formatClassDate(item.begin)}</time>
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-label-sm text-ink-subtle uppercase">{cols.end}</dt>
                <dd className="mt-0.5 text-ink">
                  <time dateTime={item.end}>{formatClassDate(item.end)}</time>
                </dd>
              </div>
            </dl>
            <div className="mt-1 flex justify-end">
              <RegisterLink item={item} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ClassesFrame({ children }: { children: React.ReactNode }) {
  return (
    <Section id={sectionIds.classes} tone="canvas" className="scroll-mt-24">
      <SectionHeading
        id={`${sectionIds.classes}-title`}
        eyebrow={runningClassesSection.eyebrow}
        title={runningClassesSection.title}
        intro={runningClassesSection.intro}
      />
      {children}
    </Section>
  );
}

export async function RunningClasses() {
  const classes = await getRunningClasses();
  if (classes.length === 0) return null;

  return (
    <ClassesFrame>
      <p className="mb-4 text-center text-body-sm text-ink-muted">{classes.length} lớp đang học</p>
      <ClassTable classes={classes} />
      <ClassListJump />
    </ClassesFrame>
  );
}

export function RunningClassesFallback() {
  return (
    <ClassesFrame>
      <div
        aria-hidden
        className="h-72 animate-pulse rounded-card border border-border-subtle bg-white"
      />
    </ClassesFrame>
  );
}

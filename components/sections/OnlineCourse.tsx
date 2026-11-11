import Link from "next/link";
import { Check, MonitorPlay } from "lucide-react";
import { onlineCopy, onlineHref } from "@/content/online";
import { courseHref, courseLevels, levelCourse } from "@/content/course-levels";
import { isVisible } from "@/content/verify";
import { localePath, type Locale } from "@/lib/i18n/locale";
import { getSiteUrl } from "@/lib/site-url";
import { onlineCourseData } from "@/lib/seo/structured-data";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PrefillLink } from "@/components/form/PrefillLink";
import { Section } from "@/components/ui/Section";
import { VerifyMark } from "@/components/ui/VerifyMark";
import { buttonClasses } from "@/components/ui/button-styles";

export function OnlineCourse({ locale }: { locale: Locale }) {
  const copy = onlineCopy[locale];
  const facts = copy.facts.filter((fact) => isVisible(fact.value));
  const who = copy.who.filter((item) => isVisible(item.text));
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ name: copy.title, path: onlineHref }]} />
      <Section id="online-intro">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_23rem]">
          <div>
            <p className="text-label-lg text-brand-teal-dark">{copy.eyebrow}</p>
            <h1
              id="online-intro-title"
              className="mt-4 text-display-hero-mobile text-ink md:text-display-hero"
            >
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-body-lg text-ink-muted">{copy.intro}</p>
            <PrefillLink
              message={copy.message}
              className={buttonClasses({ className: "mt-6 text-center whitespace-normal" })}
            >
              {copy.enquiry}
            </PrefillLink>
          </div>
          <aside
            className="rounded-card border border-border-subtle bg-white p-6 shadow-tier-1"
            aria-label={copy.factsTitle}
          >
            <MonitorPlay aria-hidden className="size-8 text-brand-teal-dark" />
            <h2 className="mt-4 text-headline-md text-ink">{copy.factsTitle}</h2>
            <dl className="mt-4 space-y-4">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-label-md text-ink-subtle">{fact.label}</dt>
                  <dd className="mt-1 text-body-md font-semibold text-ink">
                    <VerifyMark claim={fact.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>
      <Section id="online-who" tone="white">
        <h2 id="online-who-title" className="text-headline-lg text-ink">
          {copy.whoTitle}
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {who.map((item) => (
            <li key={item.heading} className="rounded-card border border-border-subtle p-6">
              <h3 className="text-headline-sm text-ink">{item.heading}</h3>
              <VerifyMark claim={item.text} as="div" className="mt-2">
                {(text) => <p className="text-body-md text-ink-muted">{text}</p>}
              </VerifyMark>
            </li>
          ))}
        </ul>
      </Section>
      <Section id="online-how">
        <h2 id="online-how-title" className="text-headline-lg text-ink">
          {copy.howTitle}
        </h2>
        <ul className="mt-6 max-w-3xl space-y-3">
          {copy.how.value.map((line) => (
            <li key={line} className="flex gap-2 text-body-lg text-ink">
              <Check aria-hidden className="mt-1 size-5 shrink-0 text-teal" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </Section>
      <Section id="online-levels" tone="white">
        <h2 id="online-levels-title" className="text-headline-lg text-ink">
          {copy.levelsTitle}
        </h2>
        <p className="mt-4 max-w-3xl text-body-lg text-ink-muted">{copy.levelsText}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {courseLevels.map((level) => (
            <li key={level}>
              <Link
                href={localePath(locale, courseHref(level))}
                className="flex h-full min-h-tap items-center rounded-card border border-border-subtle p-5 text-label-lg text-brand-teal-dark transition-colors hover:bg-surface-container-low"
              >
                {levelCourse(locale, level).name}
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="mt-12 text-headline-md text-ink">{copy.openTitle}</h2>
        <p className="mt-3 max-w-3xl text-body-md text-ink-muted">{copy.openText}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={localePath(locale, "/lich-hoc")}
            className={buttonClasses({
              variant: "outline",
              className: "text-center whitespace-normal",
            })}
          >
            {copy.openTitle}
          </Link>
          <PrefillLink
            message={copy.message}
            className={buttonClasses({ className: "text-center whitespace-normal" })}
          >
            {copy.enquiry}
          </PrefillLink>
        </div>
      </Section>
      <JsonLd data={onlineCourseData(locale, getSiteUrl().origin)} />
    </>
  );
}

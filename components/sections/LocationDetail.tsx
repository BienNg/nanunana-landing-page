import Link from "next/link";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";
import {
  locationCopy,
  locationFor,
  locationHref,
  locationMapHref,
  locationSlugs,
  locationTitle,
  type LocationSlug,
} from "@/content/locations";
import { courseHref, courseLevels, levelCourse } from "@/content/course-levels";
import { site } from "@/content/site";
import { localePath, type Locale } from "@/lib/i18n/locale";
import { getSiteUrl } from "@/lib/site-url";
import { locationData } from "@/lib/seo/structured-data";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PrefillLink } from "@/components/form/PrefillLink";
import { ChatLink } from "@/components/analytics/ChatLink";
import { Section } from "@/components/ui/Section";
import { buttonClasses } from "@/components/ui/button-styles";

export function LocationDetail({ locale, city }: { locale: Locale; city: LocationSlug }) {
  const location = locationFor(city);
  const copy = locationCopy[locale];
  const title = locationTitle(locale, city);
  const cityName = locale === "de" ? location.cityDe : location.city;
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ name: cityName, path: locationHref(city) }]} />
      <Section id="location-intro">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_23rem]">
          <div>
            <p className="text-label-lg text-brand-teal-dark">NaNu NaNa · {cityName}</p>
            <h1
              id="location-intro-title"
              className="mt-4 text-display-hero-mobile text-ink md:text-display-hero"
            >
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-body-lg text-ink-muted">{copy.intro}</p>
            <h2 className="mt-8 text-headline-md text-ink">{copy.visit}</h2>
            <p className="mt-3 max-w-2xl text-body-md text-ink-muted">{copy.visitText}</p>
            <PrefillLink
              message={copy.message(cityName)}
              className={buttonClasses({ className: "mt-6 text-center whitespace-normal" })}
            >
              {copy.enquiry}
            </PrefillLink>
          </div>
          <aside
            className="rounded-card border border-border-subtle bg-white p-6 shadow-tier-1"
            aria-label={copy.address}
          >
            <MapPin aria-hidden className="size-8 text-brand-teal-dark" />
            <h2 className="mt-4 text-headline-md text-ink">{copy.address}</h2>
            <address className="mt-4 text-body-lg text-ink not-italic">
              {location.fullAddress}
            </address>
            <a
              href={locationMapHref(city)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({
                variant: "outline",
                fullWidth: true,
                className: "mt-5 text-center whitespace-normal",
              })}
            >
              {copy.map}
              <ArrowUpRight aria-hidden />
            </a>
            <p className="mt-6 text-label-md text-ink-muted">{copy.hotline}</p>
            <ChatLink
              href={site.phone.href}
              channel="phone"
              placement="contact"
              className="mt-1 inline-flex min-h-tap items-center gap-2 text-label-lg text-brand-teal-dark hover:underline"
            >
              <Phone aria-hidden className="size-5" />
              {site.phone.display}
            </ChatLink>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 inline-flex min-h-tap max-w-full items-center text-body-md break-all text-brand-teal-dark hover:underline"
            >
              {site.email}
            </a>
          </aside>
        </div>
      </Section>
      <Section id="location-courses" tone="white">
        <h2 id="location-courses-title" className="text-headline-lg text-ink">
          {copy.courses}
        </h2>
        <p className="mt-4 max-w-3xl text-body-lg text-ink-muted">{copy.coursesText}</p>
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
      </Section>
      <Section id="location-pathways">
        <h2 id="location-pathways-title" className="text-headline-lg text-ink">
          {copy.pathways}
        </h2>
        <p className="mt-4 max-w-3xl text-body-lg text-ink-muted">{copy.pathwaysText}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={localePath(locale, "/du-hoc-duc")}
            className={buttonClasses({
              variant: "outline",
              className: "text-center whitespace-normal",
            })}
          >
            {copy.university}
          </Link>
          <Link
            href={localePath(locale, "/du-hoc-nghe")}
            className={buttonClasses({
              variant: "outline",
              className: "text-center whitespace-normal",
            })}
          >
            {copy.vocational}
          </Link>
        </div>
        <h2 className="mt-10 text-headline-md text-ink">{copy.other}</h2>
        <ul className="mt-3">
          {locationSlugs
            .filter((slug) => slug !== city)
            .map((slug) => (
              <li key={slug}>
                <Link
                  href={localePath(locale, locationHref(slug))}
                  className="inline-flex min-h-tap items-center text-label-lg text-brand-teal-dark hover:underline"
                >
                  {locationTitle(locale, slug)} →
                </Link>
              </li>
            ))}
        </ul>
      </Section>
      <JsonLd data={locationData(locale, getSiteUrl().origin, city)} />
    </>
  );
}

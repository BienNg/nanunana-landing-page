import { courseHref, isCourseSlug } from "@/content/course-levels";
import { PrivacySettingsButton } from "@/components/analytics/PrivacyPreferences";
import Link from "next/link";
import { Mail, MapPin, Phone, UserRound } from "lucide-react";
import { siteFor } from "@/content/site";
import { courses as coursesByLocale } from "@/content/courses";
import { careersHref, pathwayPath, privacyHref, sectionIds } from "@/content/nav";
import { ui } from "@/content/ui";
import { VerifyMark } from "@/components/ui/VerifyMark";
import { isVisible } from "@/content/verify";
import { ChatLink } from "@/components/analytics/ChatLink";
import { SocialIcon } from "@/components/icons/SocialIcon";
import { PrefillLink } from "@/components/form/PrefillLink";
import { getLocale } from "@/lib/i18n/get-locale";
import { localePath } from "@/lib/i18n/locale";
import { Logo } from "./Logo";

const linkClass =
  "inline-flex min-h-tap items-center gap-2 text-body-md text-ink-inverse-muted transition-colors hover:text-white md:min-h-9";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-label-sm text-white uppercase">{title}</h2>
      {children}
    </div>
  );
}

export async function Footer() {
  const locale = await getLocale();
  const site = siteFor(locale);
  const courses = coursesByLocale[locale];
  const copy = ui[locale].footer;
  const year = new Date().getFullYear();
  const section = (id: string) => localePath(locale, `/#${id}`);

  return (
    <footer id="site-footer" className="bg-ink text-ink-inverse-muted">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-gutter">
        <div className="lg:col-span-4">
          <Logo tone="dark" />
          <p className="mt-4 max-w-sm text-body-md">{site.description}</p>
          <p className="mt-2 max-w-sm text-body-sm italic">{site.slogan}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={ui[locale].socials}>
            {site.socials.map((s) => {
              const className =
                "grid size-tap place-items-center rounded-full bg-white/10 text-[20px] text-white transition-colors [--icon-contrast:var(--color-ink)] hover:bg-brand-teal-dark";
              return (
                <li key={s.id}>
                  {s.id === "zalo" ? (
                    <ChatLink
                      href={s.href}
                      channel="zalo"
                      placement="footer"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={className}
                    >
                      <SocialIcon id={s.id} />
                    </ChatLink>
                  ) : (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={className}
                    >
                      <SocialIcon id={s.id} />
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <Column title={copy.courses}>
            <ul>
              <li>
                <Link href={section(sectionIds.classes)} className={linkClass}>
                  {copy.classes}
                </Link>
              </li>
              <li>
                <Link href={section(sectionIds.learningApp)} className={linkClass}>
                  {copy.app}
                </Link>
              </li>
              {courses.map((c) => (
                <li key={c.id}>
                  {isCourseSlug(c.id) ? (
                    <Link href={localePath(locale, courseHref(c.id))} className={linkClass}>
                      {c.name}
                    </Link>
                  ) : (
                    <PrefillLink course={c.formValue} className={linkClass}>
                      {c.name}
                    </PrefillLink>
                  )}
                </li>
              ))}
            </ul>
          </Column>
        </div>

        <div className="lg:col-span-2">
          <Column title={copy.pathways}>
            <ul>
              <li>
                <Link
                  href={localePath(locale, pathwayPath["du-hoc-dai-hoc"])}
                  className={linkClass}
                >
                  {copy.university}
                </Link>
              </li>
              <li>
                <Link href={localePath(locale, pathwayPath["du-hoc-nghe"])} className={linkClass}>
                  {copy.vocational}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(
                    locale,
                    `${pathwayPath["du-hoc-dai-hoc"]}#${sectionIds.processUniversity}`,
                  )}
                  className={linkClass}
                >
                  {copy.processUniversity}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(
                    locale,
                    `${pathwayPath["du-hoc-nghe"]}#${sectionIds.processVocational}`,
                  )}
                  className={linkClass}
                >
                  {copy.processVocational}
                </Link>
              </li>
              <li>
                <Link href={section(sectionIds.team)} className={linkClass}>
                  {copy.team}
                </Link>
              </li>
              <li>
                <Link href={localePath(locale, careersHref)} className={linkClass}>
                  {copy.careers}
                </Link>
              </li>
            </ul>
          </Column>
        </div>

        <div className="md:col-span-2 lg:col-span-4">
          <Column title={copy.legal}>
            <p className="text-label-md text-white">{site.legalName}</p>
            <address className="mt-3 space-y-2 text-body-md not-italic">
              <p className="flex gap-2.5">
                <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-inverse-primary" />
                <span>
                  {site.address.street}, {site.address.city} {site.address.postalCode},{" "}
                  {site.address.country}
                </span>
              </p>
              <p className="flex gap-2.5">
                <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-inverse-primary" />
                <span>
                  {site.addressHanoi.street}, {site.addressHanoi.city}, {site.addressHanoi.country}
                </span>
              </p>
              <p>
                <ChatLink
                  href={site.phone.href}
                  channel="phone"
                  placement="footer"
                  className={`${linkClass} md:min-h-0`}
                >
                  <Phone aria-hidden className="size-4 shrink-0 text-inverse-primary" />
                  {site.phone.display}
                </ChatLink>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className={`${linkClass} md:min-h-0`}>
                  <Mail aria-hidden className="size-4 shrink-0 text-inverse-primary" />
                  {site.email}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <UserRound aria-hidden className="size-4 shrink-0 text-inverse-primary" />
                {site.directorLabel}: {site.director}
              </p>
            </address>
            <div className="mt-5">
              <p className="text-label-sm text-white uppercase">{copy.offices}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {site.offices.map((o) => (
                  <li
                    key={o.city}
                    className="rounded-full bg-white/10 px-3 py-1 text-label-md text-white"
                  >
                    {o.city}
                  </li>
                ))}
              </ul>
            </div>
          </Column>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-body-sm md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.fullName}. {site.rights}
          </p>
          <ul className="flex flex-wrap gap-x-5">
            <li>
              <PrivacySettingsButton className={`${linkClass} text-body-sm`} />
            </li>
            <li>
              <Link href={localePath(locale, privacyHref)} className={`${linkClass} text-body-sm`}>
                {copy.privacy}
              </Link>
            </li>
            {isVisible(site.license) ? (
              <li className="inline-flex min-h-tap items-center md:min-h-9">
                <VerifyMark claim={site.license} />
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </footer>
  );
}

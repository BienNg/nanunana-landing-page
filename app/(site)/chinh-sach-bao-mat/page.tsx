import type { Metadata } from "next";
import { privacyCopy } from "@/content/privacy";
import { site, siteFor } from "@/content/site";
import { getLocale } from "@/lib/i18n/get-locale";
import { pageAlternates } from "@/lib/i18n/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = privacyCopy[locale];
  return {
    title: copy.title,
    description: copy.description,
    alternates: pageAlternates(locale, "/chinh-sach-bao-mat"),
  };
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const copy = privacyCopy[locale];
  const brand = siteFor(locale);
  const contactBody = `${site.legalName} — ${site.address.street}, ${site.address.city}. Email: ${site.email}. ${copy.contactLabel}: ${site.phone.display}.`;
  const sections = copy.sections.map((section) =>
    section.body ? section : { ...section, body: contactBody },
  );

  return (
    <div className="container-page section-y">
      <article className="max-w-3xl">
        <h1 className="text-headline-xl-mobile text-ink md:text-headline-xl">{copy.heading}</h1>
        <p className="mt-3 text-body-lg text-ink-muted">
          {brand.fullName} {copy.intro}
        </p>
        {copy.bindingNote ? (
          <p className="mt-3 text-body-md text-ink-muted">{copy.bindingNote}</p>
        ) : null}
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-headline-sm text-ink">{section.title}</h2>
              <p className="mt-2 text-body-md text-ink-muted">{section.body}</p>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}

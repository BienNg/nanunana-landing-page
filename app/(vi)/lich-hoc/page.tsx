import type { Metadata } from "next";
import { ClassSchedule, scheduleHref } from "@/components/sections/RunningClasses";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { runningClassesSection } from "@/content/classes";
import { site } from "@/content/site";
import { getLocale } from "@/lib/i18n/get-locale";
import { openGraphLocale, pageAlternates } from "@/lib/i18n/locale";

/** Notion data is cached for 5 minutes; rebuild the page about hourly. */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { metaTitle: title, description } = runningClassesSection[locale].page;
  const alternates = pageAlternates(locale, scheduleHref);
  return {
    title,
    description,
    alternates,
    openGraph: {
      type: "website",
      locale: openGraphLocale(locale),
      alternateLocale: [openGraphLocale(locale === "vi" ? "de" : "vi")],
      siteName: site.name,
      url: alternates.canonical,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function SchedulePage() {
  const locale = await getLocale();
  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[{ name: runningClassesSection[locale].page.title, path: scheduleHref }]}
      />
      <ClassSchedule />
    </>
  );
}

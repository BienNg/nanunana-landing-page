import type { Metadata } from "next";
import { OnlineCourse } from "@/components/sections/OnlineCourse";
import { onlineCopy, onlineHref } from "@/content/online";
import { site } from "@/content/site";
import { getLocale } from "@/lib/i18n/get-locale";
import { openGraphLocale, pageAlternates } from "@/lib/i18n/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { metaTitle: title, description } = onlineCopy[locale];
  const alternates = pageAlternates(locale, onlineHref);
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

export default async function OnlinePage() {
  return <OnlineCourse locale={await getLocale()} />;
}

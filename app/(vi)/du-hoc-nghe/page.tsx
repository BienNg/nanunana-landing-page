import type { Metadata } from "next";
import { PathwayDetail } from "@/components/sections/PathwayDetail";
import { pathways } from "@/content/pathways";
import { getLocale } from "@/lib/i18n/get-locale";
import { site } from "@/content/site";
import { openGraphLocale, pageAlternates } from "@/lib/i18n/locale";

const id = "du-hoc-nghe" as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const pathway = pathways[locale].find((item) => item.id === id);
  return {
    title: pathway?.pageTitle,
    description: pathway?.pageDescription,
    alternates: pageAlternates(locale, "/du-hoc-nghe"),
    openGraph: {
      type: "website",
      locale: openGraphLocale(locale),
      alternateLocale: [openGraphLocale(locale === "vi" ? "de" : "vi")],
      siteName: site.name,
      url: pageAlternates(locale, "/du-hoc-nghe").canonical,
      title: pathway?.pageTitle,
      description: pathway?.pageDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: pathway?.pageTitle,
      description: pathway?.pageDescription,
    },
  };
}

export default function VocationalPage() {
  return <PathwayDetail id={id} />;
}

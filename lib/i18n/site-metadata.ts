import type { Metadata } from "next";
import { siteCopy } from "@/content/site";
import { openGraphLocale, pageAlternates, type Locale } from "./locale";
import { getSiteUrl } from "@/lib/site-url";

/** Default title, description and hreflang for one language tree. */
export function siteMetadata(locale: Locale): Metadata {
  const copy = siteCopy[locale];
  const alternates = pageAlternates(locale, "/");
  return {
    metadataBase: getSiteUrl(),
    title: {
      default: copy.metaTitle,
      template: copy.metaTitleTemplate,
    },
    description: copy.metaDescription,
    applicationName: copy.fullName,
    alternates,
    openGraph: {
      type: "website",
      locale: openGraphLocale(locale),
      alternateLocale: [locale === "de" ? "vi_VN" : "de_DE"],
      url: alternates.canonical,
      siteName: copy.fullName,
    },
    twitter: { card: "summary_large_image" },
  };
}

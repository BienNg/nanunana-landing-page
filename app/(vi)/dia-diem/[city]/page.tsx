import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationDetail } from "@/components/sections/LocationDetail";
import {
  isLocationSlug,
  locationSlugs,
  locationHref,
  locationTitle,
  locationDescription,
} from "@/content/locations";
import { site } from "@/content/site";
import { getLocale } from "@/lib/i18n/get-locale";
import { openGraphLocale, pageAlternates } from "@/lib/i18n/locale";

type Props = { params: Promise<{ city: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return locationSlugs.map((city) => ({ city }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  if (!isLocationSlug(city)) notFound();
  const locale = await getLocale();
  const title = locationTitle(locale, city);
  const description = locationDescription(locale, city);
  const alternates = pageAlternates(locale, locationHref(city));
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
export default async function LocationPage({ params }: Props) {
  const { city } = await params;
  if (!isLocationSlug(city)) notFound();
  return <LocationDetail locale={await getLocale()} city={city} />;
}

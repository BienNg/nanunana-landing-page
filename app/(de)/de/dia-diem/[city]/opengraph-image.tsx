import { notFound } from "next/navigation";
import { isLocationSlug, locationSlugs, locationFor, locationTitle } from "@/content/locations";
import {
  renderShareImage,
  shareImageSize,
  shareImageContentType,
} from "@/components/seo/share-image";
export function generateStaticParams() {
  return locationSlugs.map((city) => ({ city }));
}
export const size = shareImageSize;
export const contentType = shareImageContentType;
export const alt = "NaNu NaNa · Standorte";
export default async function Image({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  if (!isLocationSlug(city)) notFound();
  const location = locationFor(city);
  return renderShareImage("de", {
    headline: locationTitle("de", city),
    subtitle: "Adresse · Kontakt · Beratung",
    kicker: "NaNu NaNa",
    places: location.cityDe,
  });
}

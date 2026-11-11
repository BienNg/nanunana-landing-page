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
export const alt = "NaNu NaNa · Địa điểm";
export default async function Image({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  if (!isLocationSlug(city)) notFound();
  const location = locationFor(city);
  return renderShareImage("vi", {
    headline: locationTitle("vi", city),
    subtitle: "Địa chỉ · Liên hệ · Tư vấn",
    kicker: "NaNu NaNa",
    places: location.city,
  });
}

import { runningClassesSection } from "@/content/classes";
import {
  renderShareImage,
  shareImageSize,
  shareImageContentType,
} from "@/components/seo/share-image";
export const size = shareImageSize;
export const contentType = shareImageContentType;
export const alt = "NaNu NaNa · Kursplan";
export default async function Image() {
  return renderShareImage("de", {
    headline: runningClassesSection.de.page.title,
    subtitle: "Hanoi · Saigon · Online",
    kicker: "NaNu NaNa",
  });
}

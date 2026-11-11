import { universityGuide } from "@/content/university";
import {
  renderShareImage,
  shareImageSize,
  shareImageContentType,
} from "@/components/seo/share-image";
export const size = shareImageSize;
export const contentType = shareImageContentType;
export const alt = universityGuide.de.shareHeadline + " — " + universityGuide.de.shareSubtitle;
export default function Image() {
  const copy = universityGuide.de;
  return renderShareImage("de", {
    headline: copy.shareHeadline,
    subtitle: copy.shareSubtitle,
    kicker: "Studium · NaNu NaNa",
  });
}

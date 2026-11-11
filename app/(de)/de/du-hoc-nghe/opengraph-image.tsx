import { ausbildungGuide } from "@/content/ausbildung";
import {
  renderShareImage,
  shareImageSize,
  shareImageContentType,
} from "@/components/seo/share-image";

export const size = shareImageSize;
export const contentType = shareImageContentType;
export const alt = ausbildungGuide.de.shareHeadline + " — " + ausbildungGuide.de.shareSubtitle;

export default function Image() {
  const copy = ausbildungGuide.de;
  return renderShareImage("de", { headline: copy.shareHeadline, subtitle: copy.shareSubtitle });
}

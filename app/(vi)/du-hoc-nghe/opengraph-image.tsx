import { ausbildungGuide } from "@/content/ausbildung";
import {
  renderShareImage,
  shareImageSize,
  shareImageContentType,
} from "@/components/seo/share-image";

export const size = shareImageSize;
export const contentType = shareImageContentType;
export const alt = ausbildungGuide.vi.shareHeadline + " — " + ausbildungGuide.vi.shareSubtitle;

export default function Image() {
  const copy = ausbildungGuide.vi;
  return renderShareImage("vi", { headline: copy.shareHeadline, subtitle: copy.shareSubtitle });
}

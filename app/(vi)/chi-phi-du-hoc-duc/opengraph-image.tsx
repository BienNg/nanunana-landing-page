import { guides } from "@/content/guides";
import {
  renderShareImage,
  shareImageSize,
  shareImageContentType,
} from "@/components/seo/share-image";
export const size = shareImageSize;
export const contentType = shareImageContentType;
export const alt = guides["chi-phi-du-hoc-duc"].vi.title;
export default async function Image() {
  const copy = guides["chi-phi-du-hoc-duc"].vi;
  return renderShareImage("vi", {
    headline: copy.title,
    subtitle: copy.shareSubtitle,
    kicker: "NaNu NaNa",
  });
}

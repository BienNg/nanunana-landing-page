import { guides } from "@/content/guides";
import {
  renderShareImage,
  shareImageSize,
  shareImageContentType,
} from "@/components/seo/share-image";
export const size = shareImageSize;
export const contentType = shareImageContentType;
export const alt = guides["thi-goethe"].vi.title;
export default async function Image() {
  const copy = guides["thi-goethe"].vi;
  return renderShareImage("vi", {
    headline: copy.title,
    subtitle: copy.shareSubtitle,
    kicker: "NaNu NaNa",
  });
}

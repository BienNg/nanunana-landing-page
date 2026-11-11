import { universityGuide } from "@/content/university";
import {
  renderShareImage,
  shareImageSize,
  shareImageContentType,
} from "@/components/seo/share-image";
export const size = shareImageSize;
export const contentType = shareImageContentType;
export const alt = universityGuide.vi.shareHeadline + " — " + universityGuide.vi.shareSubtitle;
export default function Image() {
  const copy = universityGuide.vi;
  return renderShareImage("vi", {
    headline: copy.shareHeadline,
    subtitle: copy.shareSubtitle,
    kicker: "Studium · NaNu NaNa",
  });
}

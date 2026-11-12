import { berufeList } from "@/content/ausbildung-berufe";
import {
  renderShareImage,
  shareImageSize,
  shareImageContentType,
} from "@/components/seo/share-image";
export const size = shareImageSize;
export const contentType = shareImageContentType;
export const alt = berufeList.vi.title;
export default async function Image() {
  const copy = berufeList.vi;
  return renderShareImage("vi", {
    headline: copy.title,
    subtitle: copy.shareSubtitle,
    kicker: "NaNu NaNa",
  });
}

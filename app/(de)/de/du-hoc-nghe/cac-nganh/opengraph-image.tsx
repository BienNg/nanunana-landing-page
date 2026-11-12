import { berufeList } from "@/content/ausbildung-berufe";
import {
  renderShareImage,
  shareImageSize,
  shareImageContentType,
} from "@/components/seo/share-image";
export const size = shareImageSize;
export const contentType = shareImageContentType;
export const alt = berufeList.de.title;
export default async function Image() {
  const copy = berufeList.de;
  return renderShareImage("de", {
    headline: copy.title,
    subtitle: copy.shareSubtitle,
    kicker: "NaNu NaNa",
  });
}

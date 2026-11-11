import { onlineCopy } from "@/content/online";
import {
  renderShareImage,
  shareImageSize,
  shareImageContentType,
} from "@/components/seo/share-image";
export const size = shareImageSize;
export const contentType = shareImageContentType;
export const alt = "NaNu NaNa · Học tiếng Đức online";
export default async function Image() {
  const copy = onlineCopy.vi;
  return renderShareImage("vi", {
    headline: copy.title,
    subtitle: copy.shareSubtitle,
    kicker: "NaNu NaNa",
    places: "Online",
  });
}

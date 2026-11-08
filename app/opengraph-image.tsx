import {
  renderShareImage,
  shareImageAlt,
  shareImageContentType,
  shareImageSize,
} from "@/components/seo/share-image";

export const alt = shareImageAlt("vi");
export const size = shareImageSize;
export const contentType = shareImageContentType;

export default function Image() {
  return renderShareImage("vi");
}

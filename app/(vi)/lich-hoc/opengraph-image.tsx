import { runningClassesSection } from "@/content/classes";
import {
  renderShareImage,
  shareImageSize,
  shareImageContentType,
} from "@/components/seo/share-image";
export const size = shareImageSize;
export const contentType = shareImageContentType;
export const alt = "NaNu NaNa · Lịch học";
export default async function Image() {
  return renderShareImage("vi", {
    headline: runningClassesSection.vi.page.title,
    subtitle: "Hà Nội · Sài Gòn · Online",
    kicker: "NaNu NaNa",
  });
}

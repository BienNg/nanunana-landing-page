import { notFound } from "next/navigation";
import { berufContent, berufSlugs, berufSummary, isBerufSlug } from "@/content/ausbildung-berufe";
import {
  renderShareImage,
  shareImageSize,
  shareImageContentType,
} from "@/components/seo/share-image";
export function generateStaticParams() {
  return berufSlugs.map((nghe) => ({ nghe }));
}
export const size = shareImageSize;
export const contentType = shareImageContentType;
export const alt = "NaNu NaNa · Du học nghề Đức";
export default async function Image({ params }: { params: Promise<{ nghe: string }> }) {
  const { nghe } = await params;
  if (!isBerufSlug(nghe)) notFound();
  const { name } = berufSummary("vi", nghe);
  return renderShareImage("vi", {
    headline: `Du học nghề ${name.toLowerCase()} tại Đức`,
    subtitle: berufContent("vi", nghe).shareSubtitle,
    kicker: "Du học nghề · NaNu NaNa",
  });
}

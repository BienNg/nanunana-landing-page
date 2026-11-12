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
export const alt = "NaNu NaNa · Ausbildung in Deutschland";
export default async function Image({ params }: { params: Promise<{ nghe: string }> }) {
  const { nghe } = await params;
  if (!isBerufSlug(nghe)) notFound();
  const { name } = berufSummary("de", nghe);
  return renderShareImage("de", {
    headline: `Ausbildung ${name}`,
    subtitle: berufContent("de", nghe).shareSubtitle,
    kicker: "Ausbildung in Deutschland · NaNu NaNa",
  });
}

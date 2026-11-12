import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage, guidePageMetadata } from "@/components/sections/Guide";
import {
  berufContent,
  berufHref,
  berufSlugs,
  berufeReviewed,
  isBerufSlug,
} from "@/content/ausbildung-berufe";
import { getLocale } from "@/lib/i18n/get-locale";

type Props = { params: Promise<{ nghe: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return berufSlugs.map((nghe) => ({ nghe }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nghe } = await params;
  if (!isBerufSlug(nghe)) return {};
  const locale = await getLocale();
  return guidePageMetadata(locale, berufContent(locale, nghe), berufHref(nghe));
}

export default async function BerufPage({ params }: Props) {
  const { nghe } = await params;
  if (!isBerufSlug(nghe)) notFound();
  const locale = await getLocale();
  return (
    <GuidePage
      locale={locale}
      copy={berufContent(locale, nghe)}
      path={berufHref(nghe)}
      reviewedOn={berufeReviewed}
    />
  );
}

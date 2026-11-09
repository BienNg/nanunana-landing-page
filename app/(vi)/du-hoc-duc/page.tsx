import type { Metadata } from "next";
import { PathwayDetail } from "@/components/sections/PathwayDetail";
import { pathways } from "@/content/pathways";
import { getLocale } from "@/lib/i18n/get-locale";
import { pageAlternates } from "@/lib/i18n/locale";

const id = "du-hoc-dai-hoc" as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const pathway = pathways[locale].find((item) => item.id === id);
  return {
    title: pathway?.pageTitle,
    description: pathway?.pageDescription,
    alternates: pageAlternates(locale, "/du-hoc-duc"),
  };
}

export default function UniversityPage() {
  return <PathwayDetail id={id} />;
}

import type { Metadata } from "next";
import { Courses } from "@/components/sections/Courses";
import { coursesSection } from "@/content/courses";
import { getLocale } from "@/lib/i18n/get-locale";
import { pageAlternates } from "@/lib/i18n/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = coursesSection[locale];
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: pageAlternates(locale, "/niveau"),
  };
}

export default function CoursesPage() {
  return <Courses variant="full" />;
}

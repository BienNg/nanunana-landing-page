import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseListData } from "@/lib/seo/structured-data";
import { getSiteUrl } from "@/lib/site-url";
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

export default async function CoursesPage() {
  const locale = await getLocale();
  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[{ name: coursesSection[locale].title, path: "/niveau" }]}
      />
      <JsonLd data={courseListData(locale, getSiteUrl().origin)} />
      <Courses variant="full" />
    </>
  );
}

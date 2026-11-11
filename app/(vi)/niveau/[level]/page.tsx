import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetail } from "@/components/sections/CourseDetail";
import { courseHref, courseLevels, isCourseSlug, levelCourse } from "@/content/course-levels";
import { site } from "@/content/site";
import { getLocale } from "@/lib/i18n/get-locale";
import { openGraphLocale, pageAlternates } from "@/lib/i18n/locale";

type Props = { params: Promise<{ level: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return courseLevels.map((level) => ({ level }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level } = await params;
  if (!isCourseSlug(level)) notFound();
  const locale = await getLocale();
  const course = levelCourse(locale, level);
  const title = course.title;
  const description = `${course.duration.value}. ${course.description.value}`;
  const alternates = pageAlternates(locale, courseHref(level));
  return {
    title,
    description,
    alternates,
    openGraph: {
      type: "website",
      locale: openGraphLocale(locale),
      alternateLocale: [openGraphLocale(locale === "vi" ? "de" : "vi")],
      siteName: site.name,
      url: alternates.canonical,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
export default async function CoursePage({ params }: Props) {
  const { level } = await params;
  if (!isCourseSlug(level)) notFound();
  return <CourseDetail locale={await getLocale()} level={level} />;
}

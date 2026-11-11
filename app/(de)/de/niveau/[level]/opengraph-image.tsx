import { notFound } from "next/navigation";
import { courseLevels, isCourseSlug, levelCourse } from "@/content/course-levels";
import {
  renderShareImage,
  shareImageSize,
  shareImageContentType,
} from "@/components/seo/share-image";
export function generateStaticParams() {
  return courseLevels.map((level) => ({ level }));
}
export const size = shareImageSize;
export const contentType = shareImageContentType;
export const alt = "NaNu NaNa · Deutschkurs";
export default async function Image({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  if (!isCourseSlug(level)) notFound();
  const course = levelCourse("de", level);
  return renderShareImage("de", {
    headline: course.name,
    subtitle: course.duration.value,
    kicker: "Deutsch · " + course.level + " · NaNu NaNa",
  });
}

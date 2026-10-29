import type { MetadataRoute } from "next";
import { careerHref, openRoles } from "@/content/careers";
import { pathwayImageUrls } from "@/content/images";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().origin;
  const now = new Date();
  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: pathwayImageUrls.map((path) => `${base}${path}`),
    },
    { url: `${base}/tuyen-dung`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    ...openRoles().map((role) => ({
      url: `${base}${careerHref(role.slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    {
      url: `${base}/chinh-sach-bao-mat`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}

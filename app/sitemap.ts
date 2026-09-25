import type { MetadataRoute } from "next";
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
    {
      url: `${base}/chinh-sach-bao-mat`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}

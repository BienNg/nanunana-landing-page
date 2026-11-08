import type { MetadataRoute } from "next";
import { careerHref, openRoles } from "@/content/careers";
import { pathwayImageUrls } from "@/content/images";
import { localePath, locales, pageAlternates } from "@/lib/i18n/locale";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().origin;
  const now = new Date();
  const paths = [
    "/",
    "/tuyen-dung",
    ...openRoles("vi").map((role) => careerHref(role.slug)),
    "/chinh-sach-bao-mat",
  ];

  return paths.flatMap((path) => {
    const languages = pageAlternates("vi", path).languages;
    const alternates = {
      languages: {
        vi: `${base}${languages.vi}`,
        de: `${base}${languages.de}`,
        "x-default": `${base}${languages["x-default"]}`,
      },
    };
    const home = path === "/";
    return locales.map((locale) => ({
      url: `${base}${localePath(locale, path)}`,
      lastModified: now,
      changeFrequency: home
        ? ("weekly" as const)
        : path === "/chinh-sach-bao-mat"
          ? ("yearly" as const)
          : ("monthly" as const),
      priority: home
        ? 1
        : path === "/tuyen-dung"
          ? 0.5
          : path === "/chinh-sach-bao-mat"
            ? 0.2
            : 0.4,
      ...(home ? { images: pathwayImageUrls.map((image) => `${base}${image}`) } : {}),
      alternates,
    }));
  });
}

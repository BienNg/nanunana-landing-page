import type { MetadataRoute } from "next";
import { careerHref, openRoles } from "@/content/careers";
import { pathwayImageUrls } from "@/content/images";
import { contentLastModified } from "@/lib/content-date";
import { localePath, locales, pageAlternates } from "@/lib/i18n/locale";
import { getSiteUrl } from "@/lib/site-url";

const homeSources = [
  "content/hero.ts",
  "content/site.ts",
  "content/courses.ts",
  "content/pathways.ts",
  "content/process.ts",
  "content/faq.ts",
  "content/founder.ts",
  "content/team.ts",
  "content/testimonials.ts",
  "content/gallery.ts",
  "content/stats.ts",
  "content/classes.ts",
  "content/learning-app.ts",
];

/** Files whose commits count as a real change for this URL. */
function sourcesFor(path: string): string[] {
  if (path === "/") return homeSources;
  if (path === "/niveau") return ["content/courses.ts"];
  if (path === "/du-hoc-nghe")
    return ["content/ausbildung.ts", "content/pathways.ts", "content/process.ts"];
  if (path === "/du-hoc-duc") {
    return ["content/university.ts", "content/pathways.ts", "content/process.ts"];
  }
  if (path === "/chinh-sach-bao-mat") return ["content/privacy.ts"];
  if (path.startsWith("/tuyen-dung")) return ["content/careers.ts"];
  return [];
}

function priorityFor(path: string): number {
  if (path === "/") return 1;
  if (path === "/niveau" || path === "/du-hoc-duc" || path === "/du-hoc-nghe") return 0.8;
  if (path === "/tuyen-dung") return 0.5;
  if (path === "/chinh-sach-bao-mat") return 0.2;
  return 0.4;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().origin;
  const paths = [
    "/",
    "/niveau",
    "/du-hoc-duc",
    "/du-hoc-nghe",
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
    const lastModified = contentLastModified(sourcesFor(path));
    return locales.map((locale) => ({
      url: `${base}${localePath(locale, path)}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: home
        ? ("weekly" as const)
        : path === "/chinh-sach-bao-mat"
          ? ("yearly" as const)
          : ("monthly" as const),
      priority: priorityFor(path),
      ...(home ? { images: pathwayImageUrls.map((image) => `${base}${image}`) } : {}),
      alternates,
    }));
  });
}

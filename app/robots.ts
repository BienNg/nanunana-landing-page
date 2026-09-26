import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl().origin;
  // Keep preview deployments out of search results.
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  return {
    rules: isProduction
      ? [{ userAgent: "*", allow: "/", disallow: ["/dev/", "/admin", "/api/stats"] }]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'",
  },
];

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.googleusercontent.com" },
      { protocol: "https", hostname: "**.ggpht.com" },
    ],
  },
  async headers() {
    return [
      { source: "/", headers: securityHeaders },
      { source: "/:path*", headers: securityHeaders },
    ];
  },
  // Remaining Webflow URLs. The three topic URLs are real pages again.
  async redirects() {
    return [
      { source: "/du-hoc-nghe-old", destination: "/du-hoc-nghe", permanent: true },
      { source: "/about", destination: "/#ve-chung-toi", permanent: true },
      { source: "/ve-phuong", destination: "/#ve-phuong", permanent: true },
      { source: "/career", destination: "/tuyen-dung", permanent: true },
      // Old Webflow URLs that Search Console reported as 404 (export 2026-11-12).
      { source: "/bewerbung", destination: "/de/tuyen-dung", permanent: true },
      { source: "/de/index", destination: "/de", permanent: true },
      { source: "/privacy-policy", destination: "/chinh-sach-bao-mat", permanent: true },
      { source: "/du-hoc-dai-hoc", destination: "/du-hoc-duc", permanent: true },
      { source: "/trinh-do", destination: "/niveau", permanent: true },
      {
        source: "/trinh-do/trinh-do-:level(a1|a2|b1|b2|c1)",
        destination: "/niveau/:level",
        permanent: true,
      },
      {
        source: "/blog-posts/tai-sao-nen-hoc-online",
        destination: "/hoc-tieng-duc-online",
        permanent: true,
      },
      {
        source:
          "/blog-posts/:slug(du-hoc-dai-hoc-hay-du-hoc-nghe|lo-trinh-den-voi-nuoc-duc|nhung-truong-dai-hoc-phai-dong-hoc-phi-tai-duc|truong-dai-hoc-duoc-cong-nhan-tai-duc|dieu-kien-du-hoc-duc)",
        destination: "/du-hoc-duc",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

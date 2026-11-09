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
    ];
  },
};

export default nextConfig;

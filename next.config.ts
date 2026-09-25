import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.googleusercontent.com" },
      { protocol: "https", hostname: "**.ggpht.com" },
    ],
  },
  // Keep Google rankings from the old Webflow site (308 permanent).
  async redirects() {
    return [
      { source: "/niveau", destination: "/#khoa-hoc", permanent: true },
      { source: "/du-hoc-duc", destination: "/#du-hoc-dai-hoc", permanent: true },
      { source: "/du-hoc-nghe", destination: "/#du-hoc-nghe", permanent: true },
      { source: "/du-hoc-nghe-old", destination: "/#du-hoc-nghe", permanent: true },
      { source: "/about", destination: "/#ve-chung-toi", permanent: true },
      { source: "/ve-phuong", destination: "/#ve-phuong", permanent: true },
      { source: "/career", destination: "/tuyen-dung", permanent: true },
    ];
  },
};

export default nextConfig;

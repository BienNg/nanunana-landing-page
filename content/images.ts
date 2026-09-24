/**
 * Image map. To use a real photo:
 *   1. put the file in /public/images/ (jpg/png/webp, at least 1600px on the long side)
 *   2. change the import below to point at it
 *   3. update `alt` and set `placeholder: false`
 * Width/height/blur come from the static import automatically.
 */
import type { StaticImageData } from "next/image";

import founderPhuong from "@/public/images/founder-phuong.webp";
import pathwayUniversity from "@/public/placeholders/pathway-university.webp";
import pathwayVocational from "@/public/placeholders/pathway-vocational.webp";
import gallery1 from "@/public/placeholders/gallery-1.webp";
import gallery2 from "@/public/placeholders/gallery-2.webp";
import gallery3 from "@/public/placeholders/gallery-3.webp";
import gallery4 from "@/public/placeholders/gallery-4.webp";
import gallery5 from "@/public/placeholders/gallery-5.webp";
import gallery6 from "@/public/placeholders/gallery-6.webp";
import logoFull from "@/public/brand/logo-full.png";

export type SiteImage = {
  src: StaticImageData;
  alt: string;
  /** true while this is a stand-in image — shown with an "Ảnh mẫu" tag in dev. */
  placeholder: boolean;
};

export const images = {
  logoFull: { src: logoFull, alt: "Logo NaNu NaNa – Du Học Đức", placeholder: false },
  founderPhuong: {
    src: founderPhuong,
    alt: "Chân dung Phương, giám đốc NaNu NaNa",
    placeholder: false,
  },
  pathwayUniversity: {
    src: pathwayUniversity,
    alt: "Sinh viên Việt Nam tại một trường đại học ở Đức",
    placeholder: true,
  },
  pathwayVocational: {
    src: pathwayVocational,
    alt: "Học viên du học nghề trong giờ thực hành Ausbildung",
    placeholder: true,
  },
  gallery1: { src: gallery1, alt: "Lớp học tiếng Đức tại NaNu NaNa", placeholder: true },
  gallery2: { src: gallery2, alt: "Học viên nhận chứng chỉ Goethe", placeholder: true },
  gallery3: { src: gallery3, alt: "Buổi tư vấn du học Đức", placeholder: true },
  gallery4: { src: gallery4, alt: "Tiễn học viên lên đường sang Đức", placeholder: true },
  gallery5: { src: gallery5, alt: "Học viên NaNu NaNa tại Đức", placeholder: true },
  gallery6: { src: gallery6, alt: "Hoạt động ngoại khoá của học viên", placeholder: true },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

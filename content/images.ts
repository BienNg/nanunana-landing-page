/**
 * Image map. To use a real photo:
 *   1. put the file in /public/images/ (jpg/png/webp, at least 1600px on the long side)
 *   2. change the import below to point at it
 *   3. update `alt` and set `placeholder: false`
 * Width/height/blur come from the static import automatically.
 */
import type { StaticImageData } from "next/image";

import founderPhuong from "@/public/images/founder-phuong.webp";
import pathwayUniversity from "@/public/images/du-hoc-duc/du-hoc-dai-hoc-thanh-pho-duc.webp";
import pathwayVocational from "@/public/images/du-hoc-duc/du-hoc-nghe-khach-san-nha-hang.webp";
import appPhone from "@/public/images/app/app-mobile.png";
import appTablet from "@/public/images/app/app-tablet.png";
import appDesktop from "@/public/images/app/app-desktop.png";
import galleryLopHoc from "@/public/images/hanh-trinh/lop-hoc-tieng-duc-nanunana.webp";
import galleryBanDo from "@/public/images/hanh-trinh/hoc-vien-nanunana-truoc-ban-do-viet-nam-duc.webp";
import galleryVisa from "@/public/images/hanh-trinh/hoc-vien-nhan-visa-du-hoc-duc.webp";
import gallerySinhNhat from "@/public/images/hanh-trinh/sinh-nhat-lop-hoc-tieng-duc.webp";
import gallerySanBay from "@/public/images/hanh-trinh/tien-hoc-vien-nanunana-tai-san-bay.webp";
import gallerySanBayGiaDinh from "@/public/images/hanh-trinh/gia-dinh-dua-hoc-vien-ra-san-bay.webp";
import galleryLopTrungTam from "@/public/images/hanh-trinh/hoc-vien-chup-anh-tai-trung-tam-nanunana.webp";
import galleryTaiDuc from "@/public/images/hanh-trinh/hoc-vien-nanunana-tai-duc.webp";
import galleryMinhAnh from "@/public/images/hanh-trinh/hoc-vien-minh-anh-cam-visa-duc.webp";
import galleryGiaDinh from "@/public/images/hanh-trinh/gia-dinh-tien-hoc-vien-len-duong-sang-duc.webp";
import galleryThamQuan from "@/public/images/hanh-trinh/hoc-vien-tham-quan-duc.webp";
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
    alt: "Toàn cảnh thành phố Đức, điểm đến du học đại học Studium",
    placeholder: false,
  },
  pathwayVocational: {
    src: pathwayVocational,
    alt: "Đội ngũ ngành khách sạn và nhà hàng, chương trình du học nghề Ausbildung tại Đức",
    placeholder: false,
  },
  appPhone: {
    src: appPhone,
    alt: "Bài học video Lektion 2 trong ứng dụng NaNu NaNa trên điện thoại",
    placeholder: false,
  },
  appTablet: {
    src: appTablet,
    alt: "Danh sách bài học trình độ A1.1 trong ứng dụng NaNu NaNa trên máy tính bảng",
    placeholder: false,
  },
  appDesktop: {
    src: appDesktop,
    alt: "Bài luyện nghe Auf Wiedersehen trong ứng dụng NaNu NaNa trên máy tính",
    placeholder: false,
  },
  galleryLopHoc: {
    src: galleryLopHoc,
    alt: "Lớp học tiếng Đức tại NaNu NaNa, học viên ngồi học với vở ghi và cờ Đức",
    placeholder: false,
  },
  galleryBanDo: {
    src: galleryBanDo,
    alt: "Học viên NaNu NaNa chụp ảnh trước bản đồ Việt Nam và Đức",
    placeholder: false,
  },
  galleryVisa: {
    src: galleryVisa,
    alt: "Học viên NaNu NaNa nhận visa du học Đức",
    placeholder: false,
  },
  gallerySinhNhat: {
    src: gallerySinhNhat,
    alt: "Học viên NaNu NaNa mừng sinh nhật tại lớp tiếng Đức",
    placeholder: false,
  },
  gallerySanBay: {
    src: gallerySanBay,
    alt: "Gia đình tiễn học viên lên đường sang Đức, vali dán logo NaNu NaNa",
    placeholder: false,
  },
  gallerySanBayGiaDinh: {
    src: gallerySanBayGiaDinh,
    alt: "Gia đình đưa học viên NaNu NaNa ra sân bay trước ngày bay sang Đức",
    placeholder: false,
  },
  galleryLopTrungTam: {
    src: galleryLopTrungTam,
    alt: "Học viên tiếng Đức chụp ảnh tại trung tâm NaNu NaNa",
    placeholder: false,
  },
  galleryTaiDuc: {
    src: galleryTaiDuc,
    alt: "Học viên NaNu NaNa cùng đồng nghiệp trong ngày làm việc tại Đức",
    placeholder: false,
  },
  galleryMinhAnh: {
    src: galleryMinhAnh,
    alt: "Học viên Minh Anh cầm visa Đức cùng cô giáo tại NaNu NaNa",
    placeholder: false,
  },
  galleryGiaDinh: {
    src: galleryGiaDinh,
    alt: "Gia đình tiễn học viên NaNu NaNa tại cửa khởi hành sân bay",
    placeholder: false,
  },
  galleryThamQuan: {
    src: galleryThamQuan,
    alt: "Học viên NaNu NaNa tham quan một công trình tại Đức",
    placeholder: false,
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

/** Stable public URLs for the two pathway photos, listed on the homepage image sitemap. */
export const pathwayImageUrls = [
  "/images/du-hoc-duc/du-hoc-dai-hoc-thanh-pho-duc.webp",
  "/images/du-hoc-duc/du-hoc-nghe-khach-san-nha-hang.webp",
] as const;

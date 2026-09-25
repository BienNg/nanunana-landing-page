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
import appPhone from "@/public/placeholders/app-phone.webp";
import appTablet from "@/public/placeholders/app-tablet.webp";
import appDesktop from "@/public/placeholders/app-desktop.webp";
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
    alt: "Sinh viên Việt Nam tại một trường đại học ở Đức",
    placeholder: true,
  },
  pathwayVocational: {
    src: pathwayVocational,
    alt: "Học viên du học nghề trong giờ thực hành Ausbildung",
    placeholder: true,
  },
  appPhone: {
    src: appPhone,
    alt: "Màn hình bài học video của ứng dụng NaNu NaNa trên điện thoại",
    placeholder: true,
  },
  appTablet: {
    src: appTablet,
    alt: "Màn hình từ vựng của ứng dụng NaNu NaNa trên máy tính bảng",
    placeholder: true,
  },
  appDesktop: {
    src: appDesktop,
    alt: "Màn hình luyện nghe của ứng dụng NaNu NaNa trên máy tính",
    placeholder: true,
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

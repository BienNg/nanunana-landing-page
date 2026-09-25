import type { ImageKey } from "./images";

export const gallerySection = {
  eyebrow: "Khoảnh khắc NaNu NaNa",
  title: "Hành Trình Chinh Phục Giấc Mơ Đức",
  intro: "Từ những giờ học tiếng Đức ở lớp tới ngày đầu tiên của học viên trên nước Đức.",
};

/**
 * Eleven photos. From the md breakpoint the grid is 6 columns and every
 * row sums to 6: `half` spans 3, `third` spans 2. Below that, each photo
 * is full width. Frame ratios match the photos so each picture stays
 * inside its tile.
 */
export const galleryItems: {
  image: ImageKey;
  span: "half" | "third";
  frameClassName: string;
}[] = [
  { image: "galleryLopHoc", span: "half", frameClassName: "aspect-[3/2]" },
  { image: "galleryBanDo", span: "half", frameClassName: "aspect-[3/2]" },
  { image: "gallerySinhNhat", span: "third", frameClassName: "aspect-[4/3]" },
  { image: "gallerySanBay", span: "third", frameClassName: "aspect-[4/3]" },
  { image: "gallerySanBayGiaDinh", span: "third", frameClassName: "aspect-[4/3]" },
  { image: "galleryVisa", span: "half", frameClassName: "aspect-[3/2]" },
  { image: "galleryThamQuan", span: "half", frameClassName: "aspect-[3/2]" },
  { image: "galleryLopTrungTam", span: "half", frameClassName: "aspect-[4/3]" },
  { image: "galleryTaiDuc", span: "half", frameClassName: "aspect-[4/3]" },
  { image: "galleryMinhAnh", span: "half", frameClassName: "aspect-[3/4]" },
  { image: "galleryGiaDinh", span: "half", frameClassName: "aspect-[3/4]" },
];

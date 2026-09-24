import type { ImageKey } from "./images";

export const gallerySection = {
  eyebrow: "Khoảnh khắc NaNu NaNa",
  title: "Hành Trình Chinh Phục Giấc Mơ Đức",
  intro: "Từ những giờ học tiếng Đức ở lớp tới ngày đầu tiên của học viên trên nước Đức.",
};

/**
 * 4–8 photos. On tablet/desktop (3 columns) `tall` spans two rows and `wide`
 * spans two columns — keep the total at 9 cells so the grid has no holes.
 */
export const galleryItems: { image: ImageKey; tall?: boolean; wide?: boolean }[] = [
  { image: "gallery1" },
  { image: "gallery2", tall: true },
  { image: "gallery3" },
  { image: "gallery4" },
  { image: "gallery5", tall: true },
  { image: "gallery6", wide: true },
];

/**
 * The learning app included with every enrolled student's course.
 * It is not live yet: the section says so, and A1 sign-ups today get early access.
 * Screenshots are placeholders until real captures replace them in images.ts.
 */
import { ok, type Claim } from "./verify";
import type { ImageKey } from "./images";

export type LearningAppFeature = {
  id: "video" | "vocab" | "listening";
  /** Big figure, when the feature has a published count. */
  stat?: Claim<string>;
  title: string;
  text: string;
};

export type LearningAppDevice = {
  id: "phone" | "desktop";
  image: ImageKey;
  label: string;
};

export const learningAppSection = {
  eyebrow: "Dành riêng cho học viên",
  comingSoon: "Sắp ra mắt",
  title: "Ứng dụng học đi kèm khoá học",
  intro:
    "NaNu NaNa tự xây dựng ứng dụng để học viên ôn lại đúng bài đã học trên lớp — trên điện thoại, máy tính bảng hoặc máy tính.",
  earlyAccess: {
    kicker: "Truy cập sớm",
    title: "Đăng ký khoá A1 hôm nay",
    text: "Bạn được dùng ứng dụng trước ngày ra mắt.",
    cta: "Nhận quyền truy cập",
    /** Dropped into the consultation message when this hint is followed. */
    message: "Tôi muốn đăng ký khoá A1 để được dùng ứng dụng sớm.",
  },
  unique: ok(
    "NaNu NaNa tự xây dựng ứng dụng này dành riêng cho học viên — để bạn ôn lại đúng bài đã học trên lớp.",
  ),
  included: "Khi ra mắt, mọi học viên đang theo học đều được cấp tài khoản.",
  devicesLabel: "Điện thoại và máy tính",
  features: [
    {
      id: "video",
      stat: ok("150+"),
      title: "Video bài giảng",
      text: "Xem lại bài đã học trên lớp, bất cứ lúc nào và theo tốc độ của bạn.",
    },
    {
      id: "vocab",
      stat: ok("5.000+"),
      title: "Từ và câu",
      text: "Đúng phần từ vựng và mẫu câu cần học sau mỗi buổi trên lớp.",
    },
    {
      id: "listening",
      title: "Luyện nghe",
      text: "Bài nghe đi kèm lộ trình, để luyện tai giữa các buổi học.",
    },
  ] satisfies LearningAppFeature[],
  devices: [
    { id: "desktop", image: "appDesktop", label: "Máy tính" },
    { id: "phone", image: "appPhone", label: "Điện thoại" },
  ] satisfies LearningAppDevice[],
};

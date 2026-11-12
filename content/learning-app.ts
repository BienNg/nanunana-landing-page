/**
 * The learning app included with every enrolled student's course.
 * Live since 2026-11 (confirmed by the owner on 2026-11-12); sold separately for 49 €.
 * Screenshots are placeholders until real captures replace them in images.ts.
 */
import { dictionary } from "@/lib/i18n/dictionary";
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

export const learningAppSection = dictionary(
  {
    eyebrow: "Dành riêng cho học viên",
    title: "Ứng dụng học đi kèm khoá học",
    intro:
      "NaNu NaNa tự xây dựng ứng dụng để học viên ôn lại đúng bài đã học trên lớp — trên điện thoại, máy tính bảng hoặc máy tính.",
    earlyAccess: {
      kicker: "Miễn phí cho học viên",
      title: "Đăng ký khoá học, nhận app miễn phí",
      text: "Mua riêng app có giá 49 € (khoảng 1.300.000 VND). Học viên NaNu NaNa được dùng miễn phí.",
      cta: "Tư vấn khoá học",
      /** Dropped into the consultation message when this hint is followed. */
      message: "Tôi muốn đăng ký khoá học và nhận app học tiếng Đức.",
    },
    unique: ok(
      "NaNu NaNa tự xây dựng ứng dụng này dành riêng cho học viên — để bạn ôn lại đúng bài đã học trên lớp.",
    ),
    included: "Mọi học viên đang theo học đều được cấp tài khoản miễn phí.",
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
  },
  {
    eyebrow: "Nur für unsere Lernenden",
    title: "Die Lern-App zum Kurs",
    intro:
      "NaNu NaNa hat eine eigene App gebaut, damit Sie genau die Stunde wiederholen, die Sie im Unterricht hatten — am Telefon, Tablet oder Computer.",
    earlyAccess: {
      kicker: "Kostenlos für Lernende",
      title: "Kurs buchen, App gratis dazu",
      text: "Einzeln kostet die App 49 € (ca. 1.300.000 VND). Lernende bei NaNu NaNa nutzen sie kostenlos.",
      cta: "Kursberatung anfragen",
      message: "Ich möchte einen Kurs buchen und die Lern-App dazu nutzen.",
    },
    unique: ok(
      "NaNu NaNa hat diese App nur für die eigenen Lernenden gebaut — damit Sie genau die Stunde wiederholen, die Sie im Unterricht hatten.",
    ),
    included: "Jede Person, die gerade einen Kurs besucht, erhält ein kostenloses Konto.",
    devicesLabel: "Telefon und Computer",
    features: [
      {
        id: "video",
        stat: ok("150+"),
        title: "Unterrichtsvideos",
        text: "Sehen Sie die Stunde noch einmal an, wann Sie wollen und in Ihrem Tempo.",
      },
      {
        id: "vocab",
        stat: ok("5.000+"),
        title: "Wörter und Sätze",
        text: "Genau der Wortschatz und die Sätze, die nach jeder Stunde anstehen.",
      },
      {
        id: "listening",
        title: "Hörtraining",
        text: "Hörübungen zum Kurs, für die Zeit zwischen den Stunden.",
      },
    ] satisfies LearningAppFeature[],
    devices: [
      { id: "desktop", image: "appDesktop", label: "Computer" },
      { id: "phone", image: "appPhone", label: "Telefon" },
    ] satisfies LearningAppDevice[],
  },
);

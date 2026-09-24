/**
 * Student stories — ALL PLACEHOLDERS. Replace with real stories (with the
 * student's written consent) and change verify() → ok().
 * The whole section is hidden in production while no story is confirmed.
 */
import type { StaticImageData } from "next/image";
import { verify, type Claim } from "./verify";

export type Testimonial = {
  id: string;
  name: string;
  /** e.g. "B1 → Ausbildung Điều dưỡng" */
  path: string;
  cityInGermany: string;
  quote: string;
  photo?: StaticImageData;
  status: Claim<true>;
};

export const testimonialsSection = {
  eyebrow: "Cảm nhận học viên",
  title: "Học viên nói gì về NaNu NaNa",
  intro: "Những câu chuyện thật từ các bạn đã và đang học tập, làm việc tại Đức.",
};

const sample = verify(true as const, "NỘI DUNG MẪU — thay bằng câu chuyện thật của học viên");

export const testimonials: Testimonial[] = [
  {
    id: "mau-1",
    name: "Học viên mẫu 1",
    path: "A1 → B1 · Du học nghề",
    cityInGermany: "Stuttgart",
    quote:
      "(Nội dung mẫu) Mình bắt đầu từ con số 0 và các thầy cô đã giúp mình tự tin thi B1. Nhờ được hướng dẫn hồ sơ kỹ, mình đã sang Đức học nghề.",
    status: sample,
  },
  {
    id: "mau-2",
    name: "Học viên mẫu 2",
    path: "B2 · Du học đại học",
    cityInGermany: "Leipzig",
    quote:
      "(Nội dung mẫu) Điều mình quý nhất là sự tận tâm: có thắc mắc gì về hồ sơ hay cuộc sống ở Đức đều được giải đáp rất rõ ràng.",
    status: sample,
  },
  {
    id: "mau-3",
    name: "Học viên mẫu 3",
    path: "Lớp Giao Tiếp",
    cityInGermany: "Frankfurt",
    quote:
      "(Nội dung mẫu) Lớp giao tiếp giúp mình bớt sợ nói tiếng Đức, đặc biệt là trước buổi phỏng vấn visa.",
    status: sample,
  },
];

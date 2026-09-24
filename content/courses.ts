/**
 * German courses (CEFR A1–C1 + conversation class).
 * Descriptions are neutral drafts; durations, outcomes and bullet points are
 * unconfirmed and therefore wrapped in verify().
 */
import type { CourseLevel } from "@/components/ui/CourseBadge";
import type { CourseValue } from "./form-options";
import { verify, type Claim } from "./verify";

export type Course = {
  id: string;
  level: CourseLevel;
  /** Short name used in footer and form. */
  name: string;
  /** Card title. */
  title: string;
  formValue: CourseValue;
  description: Claim;
  duration: Claim;
  bullets: Claim<string[]>;
  outcome?: Claim;
  /** Highlighted card (B1). */
  highlight?: string;
};

export const coursesSection = {
  eyebrow: "Khung tham chiếu châu Âu CEFR",
  title: "Khoá Học Tiếng Đức",
  // Old site: "Hãy khám phá thế giới tiếng Đức cùng NANU NANA!" block.
  lead: "Hãy khám phá thế giới tiếng Đức cùng NANU NANA!",
  intro: [
    "Bằng sự cống hiến và cách tư duy làm việc thông minh, chúng tôi mang đến một hành trình giúp các bạn học tiếng Đức theo cách mới.",
    "Chúng tôi xây dựng một môi trường học tập thân thiện và sáng tạo, nơi bạn có cơ hội học hỏi từ đội ngũ giáo viên giỏi, chuyên nghiệp có nhiều năm học tập, sinh sống và làm việc tại Đức. Chúng tôi tin rằng việc học tiếng Đức không chỉ dừng lại là việc học một ngôn ngữ mà còn là cơ hội để mở rộng tầm nhìn và kết nối với một thế giới mới.",
    "Bạn đang ấp ủ ước mơ được học tập, làm việc và có một khoảng thời gian trải nghiệm và ý nghĩa tại Đức, chúng tôi ở đây và xin được đồng hành cùng bạn trên hành trình này!",
  ],
  cardCta: "Đăng ký tư vấn",
};

const d = (text: string) => verify(text, "Mô tả khoá học (bản nháp) — cần xác nhận");

export const courses: Course[] = [
  {
    id: "a1",
    level: "A1",
    name: "Tiếng Đức A1",
    title: "Tiếng Đức Nhập Môn A1",
    formValue: "a1",
    description: d(
      "Làm quen với tiếng Đức: phát âm, từ vựng và mẫu câu cơ bản để giới thiệu bản thân và giao tiếp trong các tình huống hằng ngày.",
    ),
    duration: verify("8–10 tuần", "Thời lượng khoá A1?"),
    bullets: verify(
      ["Phát âm chuẩn ngay từ đầu", "Ngữ pháp nền tảng, dễ hiểu"],
      "Nội dung chính khoá A1?",
    ),
    outcome: verify("Cam kết đầu ra", "Có cam kết đầu ra không? Điều kiện?"),
  },
  {
    id: "a2",
    level: "A2",
    name: "Tiếng Đức A2",
    title: "Tiếng Đức Sơ Cấp A2",
    formValue: "a2",
    description: d(
      "Mở rộng từ vựng và ngữ pháp để trao đổi về công việc, gia đình, nơi ở và các tình huống quen thuộc trong cuộc sống.",
    ),
    duration: verify("8–10 tuần", "Thời lượng khoá A2?"),
    bullets: verify(
      ["Thì quá khứ Perfekt & Präteritum", "Viết email, tin nhắn thông dụng"],
      "Nội dung chính khoá A2?",
    ),
    outcome: verify("Cam kết đầu ra", "Có cam kết đầu ra không? Điều kiện?"),
  },
  {
    id: "b1",
    level: "B1",
    name: "Tiếng Đức B1",
    title: "Tiếng Đức B1 & Luyện Thi",
    formValue: "b1",
    highlight: "Mục Tiêu Du Học",
    description: d(
      "Trình độ quan trọng cho hồ sơ du học nghề và nhiều thủ tục tại Đức. Rèn luyện đủ 4 kỹ năng Nghe – Nói – Đọc – Viết theo format kỳ thi Goethe-Zertifikat.",
    ),
    duration: verify("10–12 tuần", "Thời lượng khoá B1?"),
    bullets: verify(
      ["Luyện đề theo format Goethe-Zertifikat B1", "Chữa bài Nói & Viết cùng giáo viên"],
      "Nội dung chính khoá B1?",
    ),
    outcome: verify("98% học viên đỗ ngay lần thi đầu", "Tỷ lệ đỗ B1 thực tế?"),
  },
  {
    id: "b2",
    level: "B2",
    name: "Tiếng Đức B2",
    title: "Tiếng Đức Trung Cấp B2",
    formValue: "b2",
    description: d(
      "Sử dụng tiếng Đức tự tin trong học tập và công việc: thảo luận, trình bày quan điểm và đọc hiểu văn bản chuyên sâu hơn.",
    ),
    duration: verify("12 tuần", "Thời lượng khoá B2?"),
    bullets: verify(
      ["Thảo luận & trình bày quan điểm", "Văn phong học thuật và công sở"],
      "Nội dung chính khoá B2?",
    ),
  },
  {
    id: "c1",
    level: "C1",
    name: "Tiếng Đức C1",
    title: "Tiếng Đức Cao Cấp C1",
    formValue: "c1",
    description: d(
      "Tiếng Đức trình độ cao cho môi trường đại học và chuyên môn: hiểu văn bản học thuật, viết và trình bày mạch lạc.",
    ),
    duration: verify("14 tuần", "Thời lượng khoá C1?"),
    bullets: verify(
      ["Chuẩn bị cho TestDaF / DSH / Goethe C1", "Viết và thuyết trình học thuật"],
      "Nội dung chính khoá C1?",
    ),
  },
  {
    id: "giao-tiep",
    level: "GT",
    name: "Lớp Giao Tiếp",
    title: "Lớp Giao Tiếp",
    formValue: "giao-tiep",
    description: d(
      "Luyện phản xạ nghe – nói trong các tình huống đời sống, học tập và công việc — dành cho bạn muốn tự tin mở lời bằng tiếng Đức.",
    ),
    duration: verify("Linh hoạt", "Thời lượng lớp giao tiếp?"),
    bullets: verify(
      ["Luyện nói theo tình huống thực tế", "Chuẩn bị phỏng vấn visa & xin việc"],
      "Nội dung chính lớp giao tiếp?",
    ),
  },
];

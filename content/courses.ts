/**
 * German courses (CEFR A1–C1 + conversation class).
 * Card copy is confirmed.
 */
import type { CourseLevel } from "@/components/ui/CourseBadge";
import type { CourseValue } from "./form-options";
import { ok, type Claim } from "./verify";

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
  /** Highlighted card (B1). */
  highlight?: string;
};

export const coursesSection = {
  eyebrow: "Khung tham chiếu châu Âu CEFR",
  title: "Khoá Học Tiếng Đức",
  // Old site: "Hãy khám phá thế giới tiếng Đức cùng NANU NANA!" block.
  lead: "Hãy khám phá thế giới tiếng Đức cùng NANU NANA!",
  intro:
    "Bằng sự cống hiến và cách tư duy làm việc thông minh, chúng tôi mang đến một hành trình giúp các bạn học tiếng Đức theo cách mới.",
  closer: {
    points: [
      {
        id: "moi-truong",
        title: "Môi trường thân thiện",
        text: "Không gian học tập sáng tạo, nơi bạn được học hỏi và tiến bộ mỗi ngày.",
      },
      {
        id: "giao-vien",
        title: "Giáo viên từng sống tại Đức",
        text: "Đội ngũ giỏi, chuyên nghiệp, có nhiều năm học tập, sinh sống và làm việc tại Đức.",
      },
      {
        id: "tam-nhin",
        title: "Mở ra một thế giới mới",
        text: "Học tiếng Đức không chỉ là học một ngôn ngữ, mà còn là cơ hội mở rộng tầm nhìn và kết nối.",
      },
    ],
    invitation:
      "Bạn đang ấp ủ ước mơ được học tập, làm việc và có một khoảng thời gian trải nghiệm ý nghĩa tại Đức. Chúng tôi ở đây và xin được đồng hành cùng bạn trên hành trình này.",
  },
  cardCta: "Đăng ký tư vấn",
};

export const courses: Course[] = [
  {
    id: "a1",
    level: "A1",
    name: "Tiếng Đức A1",
    title: "Tiếng Đức Nhập Môn A1",
    formValue: "a1",
    description: ok(
      "Làm quen với tiếng Đức: phát âm, từ vựng và mẫu câu cơ bản để giới thiệu bản thân và giao tiếp trong các tình huống hằng ngày.",
    ),
    duration: ok("40 buổi"),
    bullets: ok(["Phát âm chuẩn ngay từ đầu", "Ngữ pháp nền tảng, dễ hiểu"]),
  },
  {
    id: "a2",
    level: "A2",
    name: "Tiếng Đức A2",
    title: "Tiếng Đức Sơ Cấp A2",
    formValue: "a2",
    description: ok(
      "Mở rộng từ vựng và ngữ pháp để trao đổi về công việc, gia đình, nơi ở và các tình huống quen thuộc trong cuộc sống.",
    ),
    duration: ok("42 buổi"),
    bullets: ok(["Thì quá khứ Perfekt & Präteritum", "Viết email, tin nhắn thông dụng"]),
  },
  {
    id: "b1",
    level: "B1",
    name: "Tiếng Đức B1",
    title: "Tiếng Đức B1 & Luyện Thi",
    formValue: "b1",
    highlight: "Mục Tiêu Du Học",
    description: ok(
      "Trình độ quan trọng cho hồ sơ du học nghề và nhiều thủ tục tại Đức. Rèn luyện đủ 4 kỹ năng Nghe – Nói – Đọc – Viết theo format kỳ thi Goethe-Zertifikat.",
    ),
    duration: ok("44 buổi"),
    bullets: ok([
      "Luyện đề theo format Goethe-Zertifikat B1",
      "Chữa bài Nói & Viết cùng giáo viên",
    ]),
  },
  {
    id: "b2",
    level: "B2",
    name: "Tiếng Đức B2",
    title: "Tiếng Đức Trung Cấp B2",
    formValue: "b2",
    description: ok(
      "Sử dụng tiếng Đức tự tin trong học tập và công việc: thảo luận, trình bày quan điểm và đọc hiểu văn bản chuyên sâu hơn.",
    ),
    duration: ok("58 buổi"),
    bullets: ok(["Thảo luận & trình bày quan điểm", "Văn phong học thuật và công sở"]),
  },
  {
    id: "c1",
    level: "C1",
    name: "Tiếng Đức C1",
    title: "Tiếng Đức Cao Cấp C1",
    formValue: "c1",
    description: ok(
      "Tiếng Đức trình độ cao cho môi trường đại học và chuyên môn: hiểu văn bản học thuật, viết và trình bày mạch lạc.",
    ),
    duration: ok("58 buổi"),
    bullets: ok(["Chuẩn bị cho TestDaF / DSH / Goethe C1", "Viết và thuyết trình học thuật"]),
  },
  {
    id: "giao-tiep",
    level: "GT",
    name: "Lớp Giao Tiếp",
    title: "Lớp Giao Tiếp",
    formValue: "giao-tiep",
    description: ok(
      "Luyện phản xạ nghe – nói trong các tình huống đời sống, học tập và công việc — dành cho bạn muốn tự tin mở lời bằng tiếng Đức.",
    ),
    duration: ok("Linh hoạt"),
    bullets: ok(["Luyện nói theo tình huống thực tế", "Chuẩn bị phỏng vấn visa & xin việc"]),
  },
];

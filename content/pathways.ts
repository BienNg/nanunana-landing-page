/**
 * The two study pathways. Intros are from docs/old-site-content.md; bullets
 * derived from that copy are ok(), everything the mockup added is verify().
 */
import type { GoalValue } from "./form-options";
import type { ImageKey } from "./images";
import { ok, verify, type Claim } from "./verify";

export type Pathway = {
  id: "du-hoc-dai-hoc" | "du-hoc-nghe";
  eyebrow: string;
  title: string;
  tagline?: string;
  paragraphs: string[];
  highlight: Claim;
  bullets: Claim[];
  image: ImageKey;
  goal: GoalValue;
  cta: string;
};

export const pathwaysSection = {
  eyebrow: "Chọn lựa tương lai",
  title: "Hai con đường tới nước Đức",
  intro:
    "Dù bạn chọn giảng đường đại học hay chương trình đào tạo nghề, NaNu NaNa đồng hành cùng bạn từ lúc định hướng đến khi bạn đặt chân tới Đức.",
};

export const pathways: Pathway[] = [
  {
    id: "du-hoc-dai-hoc",
    eyebrow: "Studium in Deutschland",
    title: "Du học đại học — Chúng tôi đồng hành cùng bạn!",
    paragraphs: [
      "Học tập tại Đức mở ra vô số cơ hội hấp dẫn, nhưng bạn nên bắt đầu từ đâu?",
      "Với sự hỗ trợ của chúng tôi, bạn không chỉ tìm thấy chương trình học phù hợp mà còn được chúng tôi giải đáp các thắc mắc khi chuẩn bị hồ sơ du học cũng như hướng dẫn và đồng hành cùng bạn trên hành trình trước và sau khi sang Đức.",
      "Hãy cùng nhau biến ước mơ du học Đức của bạn thành hiện thực nha!",
    ],
    highlight: verify(
      "Miễn học phí tại hầu hết các bang",
      "Có dùng claim học phí không? Diễn đạt chính xác?",
    ),
    bullets: [
      ok("Tìm chương trình học phù hợp với bạn"),
      ok("Giải đáp thắc mắc khi chuẩn bị hồ sơ du học"),
      verify(
        "Hướng dẫn quy trình thẩm định APS và xin Zulassung (thư mời nhập học)",
        "NaNu NaNa có hỗ trợ APS & Zulassung không?",
      ),
      ok("Hướng dẫn và đồng hành trước và sau khi sang Đức"),
    ],
    image: "pathwayUniversity",
    goal: "du-hoc-dai-hoc",
    cta: "Tư vấn du học đại học",
  },
  {
    id: "du-hoc-nghe",
    eyebrow: "Ausbildung",
    title: "Du học nghề (Ausbildung)",
    tagline: "Sự kết hợp hoàn hảo giữa kỹ năng thực tế và chất lượng đào tạo bài bản.",
    paragraphs: [
      "Chúng tôi đồng hành và tư vấn làm hồ sơ du học nghề tại Đức. Từ việc định hướng lựa chọn ngành nghề phù hợp cho tới khi đặt chân tới Đức và khoảng thời gian khi bắt đầu chương trình học nghề, chúng tôi sẽ luôn ở bên cạnh bạn và hỗ trợ bạn trên hành trình này!",
    ],
    highlight: verify(
      "Trợ cấp 1.000€ – 1.400€/tháng trong khi học",
      "Mức trợ cấp Ausbildung — con số & nguồn?",
    ),
    bullets: [
      ok("Định hướng lựa chọn ngành nghề phù hợp"),
      ok("Tư vấn và đồng hành làm hồ sơ du học nghề"),
      verify(
        "Không cần chứng minh tài chính, nhận lương đào tạo từ tháng đầu",
        "Claim chứng minh tài chính có đúng không?",
      ),
      verify(
        "Cam kết việc làm 100% sau tốt nghiệp, lương khởi điểm 2.800€ – 3.500€/tháng",
        "Có cam kết việc làm không? Mức lương?",
      ),
      ok("Ở bên cạnh bạn khi đặt chân tới Đức và bắt đầu chương trình học nghề"),
    ],
    image: "pathwayVocational",
    goal: "du-hoc-nghe",
    cta: "Tư vấn du học nghề",
  },
];

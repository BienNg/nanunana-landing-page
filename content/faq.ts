/**
 * FAQ — confirmed (ok) answers appear in production and in the FAQPage JSON-LD.
 */
import { ok, type Claim } from "./verify";

export type FaqItem = { id: string; question: string; answer: Claim };

export const faqSection = {
  eyebrow: "Giải đáp thắc mắc",
  title: "Câu hỏi thường gặp",
  intro:
    "Chưa thấy câu trả lời bạn cần? Nhắn Zalo hoặc để lại thông tin, chúng tôi sẽ liên hệ lại.",
};

export const faqs: FaqItem[] = [
  {
    id: "hoc-phi",
    question: "Học phí các khoá tiếng Đức là bao nhiêu?",
    answer: ok(
      "Học phí phụ thuộc vào trình độ và hình thức học (online hoặc tại lớp). Hãy để lại thông tin, tư vấn viên sẽ gửi bạn bảng học phí chi tiết và lịch khai giảng gần nhất.",
    ),
  },
  {
    id: "online-offline",
    question: "Có lớp online không? Lịch học như thế nào?",
    answer: ok(
      "NaNu NaNa có cả lớp online và lớp tại trung tâm ở TP. Hồ Chí Minh. Lịch học được sắp xếp theo khung giờ tối và cuối tuần để phù hợp với học sinh, sinh viên và người đi làm.",
    ),
  },
  {
    id: "a1-b1",
    question: "Học từ A1 đến B1 mất bao lâu?",
    answer: ok(
      "Thông thường khoảng 7–9 tháng nếu học đều đặn, tuỳ vào cường độ lớp và thời gian tự học của bạn.",
    ),
  },
  {
    id: "dieu-kien-du-hoc-nghe",
    question: "Điều kiện để đi du học nghề (Ausbildung) là gì?",
    answer: ok(
      "Thông thường bạn cần tốt nghiệp THPT, có chứng chỉ tiếng Đức (thường từ B1 trở lên, tuỳ ngành) và hợp đồng đào tạo với một cơ sở tại Đức. Điều kiện cụ thể phụ thuộc vào ngành nghề — hãy để lại thông tin để được tư vấn riêng.",
    ),
  },
  {
    id: "chi-phi-dai-hoc",
    question: "Chi phí du học đại học ở Đức khoảng bao nhiêu?",
    answer: ok(
      "Phần lớn trường công lập tại Đức không thu học phí (trừ một số bang), nhưng bạn cần tài khoản phong toả để chứng minh tài chính và chi phí sinh hoạt hằng tháng. Tư vấn viên sẽ giúp bạn ước tính cụ thể theo thành phố và chương trình học.",
    ),
  },
  {
    id: "b1-hay-b2",
    question: "Cần tiếng Đức B1 hay B2 để du học?",
    answer: ok(
      "Chứng chỉ B1 đã đủ để nộp hồ sơ vào một số trường đại học. Sau khi sang Đức, bạn sẽ theo học khóa dự bị một năm để đạt trình độ C1 trước khi bắt đầu chương trình đại học (Studium). Chúng tôi khuyến nghị bạn học đến B2: phần lớn các trường yêu cầu trình độ này, và B2 cũng giúp bạn chuẩn bị tốt hơn khi bắt đầu cuộc sống và học tập tại Đức.",
    ),
  },
];

/**
 * FAQ — answers are PLACEHOLDERS until NaNu NaNa confirms them.
 * Only confirmed (ok) answers appear in production and in the FAQPage JSON-LD.
 */
import { verify, type Claim } from "./verify";

export type FaqItem = { id: string; question: string; answer: Claim };

export const faqSection = {
  eyebrow: "Giải đáp thắc mắc",
  title: "Câu hỏi thường gặp",
  intro:
    "Chưa thấy câu trả lời bạn cần? Nhắn Zalo hoặc để lại thông tin, chúng tôi sẽ liên hệ lại.",
};

const note = "Câu trả lời mẫu — cần NaNu NaNa xác nhận";

export const faqs: FaqItem[] = [
  {
    id: "hoc-phi",
    question: "Học phí các khoá tiếng Đức là bao nhiêu?",
    answer: verify(
      "Học phí phụ thuộc vào trình độ và hình thức học (online hoặc tại lớp). Hãy để lại thông tin, tư vấn viên sẽ gửi bạn bảng học phí chi tiết và lịch khai giảng gần nhất.",
      note,
    ),
  },
  {
    id: "online-offline",
    question: "Có lớp online không? Lịch học như thế nào?",
    answer: verify(
      "NaNu NaNa có cả lớp online và lớp tại trung tâm ở TP. Hồ Chí Minh. Lịch học được sắp xếp theo khung giờ tối và cuối tuần để phù hợp với học sinh, sinh viên và người đi làm.",
      note,
    ),
  },
  {
    id: "a1-b1",
    question: "Học từ A1 đến B1 mất bao lâu?",
    answer: verify(
      "Thông thường khoảng 7–9 tháng nếu học đều đặn, tuỳ vào cường độ lớp và thời gian tự học của bạn.",
      note,
    ),
  },
  {
    id: "dieu-kien-du-hoc-nghe",
    question: "Điều kiện để đi du học nghề (Ausbildung) là gì?",
    answer: verify(
      "Thông thường bạn cần tốt nghiệp THPT, có chứng chỉ tiếng Đức (thường từ B1 trở lên, tuỳ ngành) và hợp đồng đào tạo với một cơ sở tại Đức. Điều kiện cụ thể phụ thuộc vào ngành nghề — hãy để lại thông tin để được tư vấn riêng.",
      note,
    ),
  },
  {
    id: "chi-phi-dai-hoc",
    question: "Chi phí du học đại học ở Đức khoảng bao nhiêu?",
    answer: verify(
      "Phần lớn trường công lập tại Đức không thu học phí (trừ một số bang), nhưng bạn cần tài khoản phong toả để chứng minh tài chính và chi phí sinh hoạt hằng tháng. Tư vấn viên sẽ giúp bạn ước tính cụ thể theo thành phố và chương trình học.",
      note,
    ),
  },
  {
    id: "b1-hay-b2",
    question: "Cần tiếng Đức B1 hay B2 để du học?",
    answer: verify(
      "Du học nghề thường yêu cầu B1–B2 tuỳ ngành; du học đại học bằng tiếng Đức thường yêu cầu C1 (TestDaF/DSH) sau khi hoàn thành dự bị hoặc chương trình tiếng. Chúng tôi sẽ tư vấn lộ trình phù hợp với mục tiêu của bạn.",
      note,
    ),
  },
];

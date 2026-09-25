import { ok, verify } from "./verify";

export const contactSection = {
  badge: ok("Hỗ trợ 24/7"),
  title: "Liên hệ ngay",
  // Old site text.
  intro:
    "Nếu bạn muốn đăng ký khóa học, cần hỗ trợ để làm việc hoặc học tập tại Đức, hoặc có bất kỳ câu hỏi nào, hãy liên hệ với mình trên Facebook hoặc Zalo, đừng ngại nha!",
  channelsTitle: "Nhắn trực tiếp",
  formTitle: verify(
    "Đăng Ký Nhận Lộ Trình & Học Thử Miễn Phí",
    "Có học thử miễn phí không? Nếu không, dùng formTitleFallback.",
  ),
  formTitleFallback: "Đăng Ký Tư Vấn Miễn Phí",
  formSubtitle: verify(
    "Tư vấn viên NaNu NaNa sẽ liên hệ với bạn trong vòng 15 phút.",
    "Thời gian phản hồi thực tế?",
  ),
  formSubtitleFallback: "Để lại thông tin, NaNu NaNa sẽ liên hệ với bạn sớm nhất có thể.",
};

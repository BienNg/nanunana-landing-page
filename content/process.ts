import { ok, verify, type Claim } from "./verify";

export type ProcessStep = {
  id: string;
  title: string;
  description: Claim;
};

export const processSection = {
  eyebrow: "Từng bước rõ ràng",
  title: "Lộ trình cùng NaNu NaNa",
  intro: "Từ buổi tư vấn đầu tiên đến những ngày đầu ở Đức — bạn luôn biết bước tiếp theo là gì.",
};

const draft = "Mô tả bước (bản nháp) — cần xác nhận";

export const processSteps: ProcessStep[] = [
  {
    id: "tu-van",
    title: "Tư vấn định hướng",
    description: verify(
      "Trao đổi 1:1 để hiểu mục tiêu, trình độ và điều kiện của bạn, từ đó chọn con đường phù hợp: du học đại học, du học nghề hay học tiếng.",
      draft,
    ),
  },
  {
    id: "hoc-tieng",
    title: "Học tiếng Đức",
    description: ok(
      "Học theo lộ trình từ A1 cùng đội ngũ giáo viên có nhiều năm học tập, sinh sống và làm việc tại Đức.",
    ),
  },
  {
    id: "ho-so",
    title: "Chuẩn bị hồ sơ",
    description: verify(
      "Giải đáp thắc mắc và hướng dẫn chuẩn bị giấy tờ, chọn trường hoặc chương trình đào tạo phù hợp.",
      draft,
    ),
  },
  {
    id: "visa",
    title: "Xin visa",
    description: verify(
      "Chuẩn bị hồ sơ visa và luyện phỏng vấn tại Đại sứ quán / Tổng Lãnh sự quán Đức.",
      draft,
    ),
  },
  {
    id: "sang-duc",
    title: "Sang Đức & hỗ trợ sau khi đến",
    description: ok(
      "Đồng hành khi bạn đặt chân tới Đức và trong khoảng thời gian bắt đầu chương trình học.",
    ),
  },
];

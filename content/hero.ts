import { ok, verify } from "./verify";

export const hero = {
  /** Intake badge — must show the CURRENT intake. */
  intakeBadge: verify("Tuyển sinh kỳ mới 2026", "Kỳ tuyển sinh hiện tại (tháng/năm)?"),
  kicker: verify(
    "Trung tâm tiếng Đức & Du học hàng đầu",
    "Có dùng chữ 'hàng đầu' không? Nếu không, dùng kickerFallback.",
  ),
  kickerFallback: "Trung tâm tiếng Đức & Tư vấn du học Đức",
  titleLines: ["NANU NANA", "DU HỌC ĐỨC"] as const,
  taglineLead: "Nhắc đến du học Đức là nhắc đến NaNu NaNa",
  taglineEmphasis: "Chất lượng và sự tử tế",
  supporting:
    "Học tiếng Đức từ A1 đến C1 và được đồng hành trên hành trình du học đại học hoặc du học nghề tại Đức — từ ngày đầu định hướng đến khi bạn đặt chân tới Đức.",
  primaryCta: "Đăng Ký Tư Vấn Miễn Phí",
  secondaryCta: "Khám Phá Các Khóa Học",
  trustBullets: [
    ok("Giáo viên nhiều năm học tập, sinh sống và làm việc tại Đức"),
    ok("Đồng hành trước và sau khi bạn sang Đức"),
    verify("Học phí minh bạch, cam kết không phát sinh", "Cam kết học phí có đúng không?"),
  ],
  card: {
    motto: "Chất lượng • Sự tử tế",
    places: "Hồ Chí Minh • Hà Nội • Stuttgart",
    chips: [
      { label: "Thẩm định APS & Visa", value: verify("100% Đậu", "Tỷ lệ đậu APS & Visa thực tế?") },
      { label: "Buổi học thử", value: verify("Miễn phí", "Có học thử miễn phí không?") },
    ],
  },
};

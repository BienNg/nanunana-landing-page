import { ok } from "./verify";

export const hero = {
  /** Intake badge — must show the CURRENT intake. */
  intakeBadge: ok("Tuyển sinh kỳ mới 2027"),
  kicker: ok("Trung tâm tiếng Đức & Du học hàng đầu"),
  kickerFallback: "Trung tâm tiếng Đức & Tư vấn du học Đức",
  titleLines: ["NANU NANA", "DU HỌC ĐỨC"] as const,
  taglineLead: "Nhắc đến du học Đức là nhắc đến NaNu NaNa",
  taglineEmphasis: "Chất lượng và sự tử tế",
  supporting:
    "Học tiếng Đức từ A1 đến C1 và được đồng hành trên hành trình du học đại học hoặc du học nghề tại Đức — từ ngày đầu định hướng đến khi bạn đặt chân tới Đức.",
  primaryCta: "Nhắn Zalo",
  trustBullets: [
    ok("Giáo viên nhiều năm học tập, sinh sống và làm việc tại Đức"),
    ok("Đồng hành trước và sau khi bạn sang Đức"),
    ok("Học phí minh bạch, cam kết không phát sinh"),
  ],
  card: {
    motto: "Chất lượng • Sự tử tế",
    places: "Hồ Chí Minh • Hà Nội • Stuttgart",
    chips: [
      { label: "Thẩm định APS & Visa", value: ok("100% Đậu") },
      { label: "Buổi học thử", value: ok("Miễn phí") },
    ],
  },
};

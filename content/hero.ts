import { dictionary } from "@/lib/i18n/dictionary";
import { ok } from "./verify";

export const hero = dictionary(
  {
    /** Intake badge — must show the CURRENT intake. */
    intakeBadge: ok("Tuyển sinh kỳ mới 2027"),
    kicker: ok("Trung tâm tiếng Đức & Du học hàng đầu"),
    kickerFallback: "Trung tâm tiếng Đức & Tư vấn du học Đức",
    titleLines: ["NANU NANA", "DU HỌC ĐỨC"],
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
  },
  {
    intakeBadge: ok("Neue Aufnahme 2027"),
    kicker: ok("Führendes Deutschzentrum & Studienberatung"),
    kickerFallback: "Deutschzentrum & Beratung für Deutschland",
    titleLines: ["NANU NANA", "STUDIUM IN DEUTSCHLAND"],
    taglineLead: "Wer an ein Studium in Deutschland denkt, denkt an NaNu NaNa",
    taglineEmphasis: "Qualität und Anstand",
    supporting:
      "Lernen Sie Deutsch von A1 bis C1 und lassen Sie sich auf dem Weg zum Studium oder zur Ausbildung in Deutschland begleiten — vom ersten Gespräch bis zu Ihrer Ankunft.",
    primaryCta: "Per Zalo schreiben",
    trustBullets: [
      ok("Lehrkräfte mit vielen Jahren Studium, Leben und Arbeit in Deutschland"),
      ok("Begleitung vor und nach Ihrer Ankunft in Deutschland"),
      ok("Transparente Gebühren, ohne versteckte Kosten"),
    ],
    card: {
      motto: "Qualität • Anstand",
      places: "Ho-Chi-Minh-Stadt • Hanoi • Stuttgart",
      chips: [
        { label: "APS & Visum", value: ok("100 % Erfolg") },
        { label: "Probestunde", value: ok("Kostenlos") },
      ],
    },
  },
);

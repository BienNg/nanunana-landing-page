import { dictionary } from "@/lib/i18n/dictionary";
import { ok, type Claim } from "./verify";

export type StatIcon = "students" | "years" | "visa" | "offices";

export type Stat = {
  id: string;
  icon: StatIcon;
  /** Number to count up to. */
  value: Claim<number>;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
};

/** Every stat stays hidden in production until its value is confirmed with ok(). */
export const stats = dictionary<Stat[]>(
  [
    {
      id: "hoc-vien",
      icon: "students",
      value: ok(1000),
      suffix: "+",
      label: "Học viên",
      detail: "Đã và đang học cùng NaNu NaNa",
    },
    {
      id: "nam",
      icon: "years",
      value: ok(6),
      suffix: "+",
      label: "Năm kinh nghiệm",
      detail: "Học tập, sinh sống và làm việc tại Đức",
    },
    {
      id: "visa",
      icon: "visa",
      value: ok(100),
      suffix: "%",
      label: "Đậu APS & Visa",
      detail: "Thẩm định hồ sơ và quy trình xin visa",
    },
    {
      id: "van-phong",
      icon: "offices",
      value: ok(3),
      label: "Văn phòng",
      detail: "Hồ Chí Minh, Hà Nội và Stuttgart",
    },
  ],
  [
    {
      id: "hoc-vien",
      icon: "students",
      value: ok(1000),
      suffix: "+",
      label: "Lernende",
      detail: "Lernen oder lernten bei NaNu NaNa",
    },
    {
      id: "nam",
      icon: "years",
      value: ok(6),
      suffix: "+",
      label: "Jahre Erfahrung",
      detail: "Studium, Leben und Arbeit in Deutschland",
    },
    {
      id: "visa",
      icon: "visa",
      value: ok(100),
      suffix: "%",
      label: "APS & Visum",
      detail: "Prüfung der Unterlagen und Visumverfahren",
    },
    {
      id: "van-phong",
      icon: "offices",
      value: ok(3),
      label: "Standorte",
      detail: "Ho-Chi-Minh-Stadt, Hanoi und Stuttgart",
    },
  ],
);

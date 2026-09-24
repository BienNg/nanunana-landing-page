import { verify, type Claim } from "./verify";

export type StatIcon = "students" | "years" | "pass" | "partners";

export type Stat = {
  id: string;
  icon: StatIcon;
  /** Number to count up to (Phase 6). */
  value: Claim<number>;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
};

/** Every stat stays hidden in production until its value is confirmed with ok(). */
export const stats: Stat[] = [
  {
    id: "hoc-vien",
    icon: "students",
    value: verify(1000, "Tổng số học viên thực tế?"),
    suffix: "+",
    label: "Học viên",
    detail: "Đã và đang học cùng NaNu NaNa",
  },
  {
    id: "nam",
    icon: "years",
    value: verify(11, "Số năm kinh nghiệm của trung tâm (không phải số năm Phương ở Đức)?"),
    suffix: "+",
    label: "Năm kinh nghiệm",
    detail: "Học tập, sinh sống và làm việc tại Đức",
  },
  {
    id: "ty-le-do",
    icon: "pass",
    value: verify(98, "Tỷ lệ đỗ thực tế — đỗ gì (B1? visa?), đo thế nào?"),
    suffix: "%",
    label: "Tỷ lệ đỗ",
    detail: "Kỳ thi tiếng Đức & visa",
  },
  {
    id: "doi-tac",
    icon: "partners",
    value: verify(50, "Số đối tác đào tạo & trường ĐH thực tế?"),
    suffix: "+",
    label: "Đối tác",
    detail: "Trường học & doanh nghiệp tại Đức",
  },
];

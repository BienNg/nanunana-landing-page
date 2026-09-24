/**
 * Team — bios copied word for word from docs/old-site-content.md.
 * Do not embellish. Add a photo by importing it and setting `photo`.
 */
import type { StaticImageData } from "next/image";
import { images } from "./images";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string[];
  photo?: StaticImageData;
  /** Featured members are shown in their own section, not the grid. */
  featured?: boolean;
};

export const founder: TeamMember = {
  id: "phuong",
  name: "Phương",
  role: "Giám đốc",
  bio: [
    "Sinh viên khoa ngôn ngữ Đức - ĐH Hà Nội.",
    "Cử nhân đại học Magdeburg.",
    "Bằng giảng dạy xuất sắc Goethe, Frankfurt.",
    "Sống và làm việc ở Đức: 11 năm.",
  ],
  photo: images.founderPhuong.src,
  featured: true,
};

export const team: TeamMember[] = [
  {
    id: "julian",
    name: "Julian",
    role: "Giáo viên",
    bio: [
      "Chương trình quốc tế Ngôn ngữ & Văn hóa",
      "Bằng xuất sắc (bằng cao nhất của Thạc sĩ) tại Hamburg",
      "Ngôn ngữ: Đức, Việt, Anh, Trung",
      "Người Đức, sinh ra và lớn lên ở tây Đức",
    ],
  },
  {
    id: "nicole",
    name: "Nicole Bärlein",
    role: "Business Development",
    bio: [
      "Sinh ra và lớn lên ở Đức.",
      "Nhiều năm quản lý trong ngành F&B.",
      "Hỗ trợ các doanh nghiệp ở Đức tuyển dụng học viên người Việt Nam.",
    ],
  },
  {
    id: "ben",
    name: "Ben",
    role: "Giáo viên",
    bio: [
      "Thạc sĩ: Nghiên cứu Xã hội, ĐH Tübingen.",
      "Tiếng mẹ đẻ: tiếng Đức và tiếng Việt.",
      "Tiếng Anh C1.",
    ],
  },
  {
    id: "le-pham",
    name: "Lệ Phạm",
    role: "Giáo viên",
    bio: [
      "Thạc sĩ bằng giỏi tại ĐH Darmstadt",
      "Cử nhân bằng giỏi tại đại học Hessen",
      "Ngôn ngữ: Đức, Việt, Anh, Pháp và Trung.",
      "Lớn lên tại Đức và sống tại Wiesbaden.",
    ],
  },
  {
    id: "mai-trang",
    name: "Mai Trang",
    role: "Giáo viên",
    bio: ["Thạc sĩ, Cử nhân ĐH Leipzig.", "Ngôn ngữ: Đức.", "Sống và làm việc ở Đức: 11 năm."],
  },
  {
    id: "tuan-giao-vien",
    name: "Tuấn",
    role: "Giáo viên",
    bio: [
      "Cử nhân ĐH Leuphana-Nghiên cứu văn hoá.",
      "Ngôn ngữ: Đức.",
      "Sống và làm việc ở Đức: 8 năm.",
    ],
  },
  {
    id: "men",
    name: "Mến",
    role: "Giáo viên",
    bio: ["Cử nhân trường Rhein Main.", "Ngôn ngữ: Đức.", "Sống và làm việc ở Đức: 8 năm."],
  },
  {
    id: "thanh-nam",
    name: "Thanh Nam",
    role: "Giáo viên",
    bio: [
      "Cử nhân ĐH Dresden - Đức",
      "Tham gia trao đổi sinh viên tại Hàn Quốc.",
      "Ngôn ngữ: Đức, Việt, Anh.",
    ],
  },
  {
    id: "duc",
    name: "Đức",
    role: "Giáo viên",
    bio: [
      "Cử nhân bằng giỏi ĐH Hamburg.",
      "Học bổng dành cho sinh viên quốc tế.",
      "Ngôn ngữ: Đức.",
      "Sống và làm việc ở Đức: 8 năm.",
    ],
  },
  {
    id: "bien",
    name: "Biên",
    role: "Quản lý",
    bio: [
      "Đại học Stuttgart - Đức.",
      "Sinh ra và lớn lên tại Đức.",
      "Tiếng mẹ đẻ: tiếng Đức và tiếng Việt.",
      "Từng làm việc tại Mercedes Stuttgart.",
    ],
  },
];

export const supportTeam: TeamMember[] = [
  {
    id: "tram",
    name: "Trâm",
    role: "Quản lý nhân sự",
    bio: ["Cử nhân ĐH Sài Gòn", "Chứng chỉ Hành chính nhân sự", "Tiếng Đức B2", "Tiếng Anh B1"],
  },
  {
    id: "tuan-social-media",
    name: "Tuấn",
    role: "Social Media",
    bio: [
      "Từng sống và làm việc tại Leipzig.",
      "Bằng tiếng Đức B1.",
      "Cử nhân ĐH Công Nghệ.",
      "Khoá đào tạo Arena Multimedia.",
      "8 năm kinh nghiệm thiết kế.",
    ],
  },
  {
    id: "cam-van",
    name: "Cẩm Vân",
    role: "Bộ phận chăm sóc khách hàng",
    bio: ["Cử nhân ĐH KH xã hội & nhân văn, ĐH quốc gia Hà Nội.", "Ngôn ngữ: Việt, Anh, Hàn."],
  },
];

export const teamSection = {
  eyebrow: "Đội ngũ NaNu NaNa",
  title: "Unser Team",
  // From the old site's course intro.
  intro:
    "Đội ngũ giáo viên giỏi, chuyên nghiệp, có nhiều năm học tập, sinh sống và làm việc tại Đức.",
  supportTitle: "Bộ phận hỗ trợ",
};

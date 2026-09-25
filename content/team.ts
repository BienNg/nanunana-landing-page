/**
 * Team — bios copied word for word from docs/old-site-content.md.
 * Do not embellish. Add a photo by importing it and setting `photo`.
 */
import type { StaticImageData } from "next/image";
import { images } from "./images";
import benPhoto from "@/public/images/team/ben-giao-vien-nanunana.webp";
import haiPhoto from "@/public/images/team/hai-ho-tro-hoc-vien-sai-gon-nanunana.webp";
import julianPhoto from "@/public/images/team/julian-giao-vien-nanunana.webp";
import nicolePhoto from "@/public/images/team/nicole-baerlein-nanunana.webp";
import tramPhoto from "@/public/images/team/tram-quan-ly-nhan-su-nanunana.webp";
import tuanPhoto from "@/public/images/team/tuan-giao-vien-nanunana.webp";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string[];
  photo?: StaticImageData;
  /** Portrait alt text. Set whenever `photo` is set so image search can name the person. */
  alt?: string;
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
  alt: images.founderPhuong.alt,
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
    photo: julianPhoto,
    alt: "Chân dung Julian, giáo viên tiếng Đức tại NaNu NaNa",
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
    photo: nicolePhoto,
    alt: "Chân dung Nicole Bärlein, phụ trách phát triển kinh doanh tại NaNu NaNa",
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
    photo: benPhoto,
    alt: "Chân dung Ben, giáo viên tiếng Đức tại NaNu NaNa",
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
    photo: tuanPhoto,
    alt: "Chân dung Tuấn, giáo viên tiếng Đức tại NaNu NaNa",
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
];

export const supportTeam: TeamMember[] = [
  {
    id: "tram",
    name: "Trâm",
    role: "Quản lý nhân sự",
    bio: ["Cử nhân ĐH Sài Gòn", "Chứng chỉ Hành chính nhân sự", "Tiếng Đức B2", "Tiếng Anh B1"],
    photo: tramPhoto,
    alt: "Chân dung Trâm, quản lý nhân sự tại NaNu NaNa",
  },
  {
    id: "cam-van",
    name: "Cẩm Vân",
    role: "Bộ phận chăm sóc khách hàng",
    bio: ["Cử nhân ĐH KH xã hội & nhân văn, ĐH quốc gia Hà Nội.", "Ngôn ngữ: Việt, Anh, Hàn."],
  },
  {
    id: "hai",
    name: "Hai",
    role: "Hỗ trợ học viên",
    bio: ["Hỗ trợ học viên tại Sài Gòn."],
    photo: haiPhoto,
    alt: "Chân dung Hai, nhân viên hỗ trợ học viên tại Sài Gòn, NaNu NaNa",
  },
  {
    id: "ly",
    name: "Ly",
    role: "Hỗ trợ học viên",
    bio: ["Hỗ trợ học viên tại Hà Nội."],
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

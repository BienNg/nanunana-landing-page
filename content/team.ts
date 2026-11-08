/**
 * Team — Vietnamese bios follow docs/old-site-content.md. Do not embellish.
 * German bios are a close translation of those lines.
 */
import type { StaticImageData } from "next/image";
import { dictionary } from "@/lib/i18n/dictionary";
import founderPhuong from "@/public/images/founder-phuong.webp";
import benPhoto from "@/public/images/team/ben-giao-vien-nanunana.webp";
import haiPhoto from "@/public/images/team/hai-ho-tro-hoc-vien-sai-gon-nanunana.webp";
import hoangPhoto from "@/public/images/team/hoang-nguyen-giao-vien-nanunana.webp";
import julianPhoto from "@/public/images/team/julian-giao-vien-nanunana.webp";
import lyPhoto from "@/public/images/team/ly-ho-tro-hoc-vien-ha-noi-nanunana.webp";
import minhTrangPhoto from "@/public/images/team/minh-trang-giao-vien-nanunana.webp";
import nicolePhoto from "@/public/images/team/nicole-baerlein-nanunana.webp";
import tramPhoto from "@/public/images/team/tram-quan-ly-nhan-su-nanunana.webp";
import tuPhoto from "@/public/images/team/tu-nguyen-giao-vien-nanunana.webp";
import tuanPhoto from "@/public/images/team/tuan-giao-vien-nanunana.webp";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string[];
  /** City line, e.g. "Berlin, Deutschland". */
  location?: string;
  /** Short motto shown above the bio. Mark German lines with `lang: "de"`. */
  quote?: { text: string; lang?: "de" }[];
  photo?: StaticImageData;
  /** Portrait alt text. Set whenever `photo` is set so image search can name the person. */
  alt?: string;
  /** Featured members are shown in their own section, not the grid. */
  featured?: boolean;
};

const hoangQuote = [
  {
    text: "Mit jeder Sprache, die du lernst, erwirbst du eine neue Seele.",
    lang: "de" as const,
  },
  { text: "Mỗi ngôn ngữ mà bạn học, bạn lại có thêm một tâm hồn mới." },
];

export const founder = dictionary<TeamMember>(
  {
    id: "phuong",
    name: "Phương",
    role: "Giám đốc",
    bio: [
      "Sinh viên khoa ngôn ngữ Đức - ĐH Hà Nội.",
      "Cử nhân đại học Magdeburg.",
      "Bằng giảng dạy xuất sắc Goethe, Frankfurt.",
      "Sống và làm việc ở Đức: 11 năm.",
    ],
    photo: founderPhuong,
    alt: "Chân dung Phương, giám đốc NaNu NaNa",
    featured: true,
  },
  {
    id: "phuong",
    name: "Phương",
    role: "Geschäftsführerin",
    bio: [
      "Studium der Germanistik an der Universität Hanoi.",
      "Bachelor an der Universität Magdeburg.",
      "Lehrbefähigung mit Auszeichnung, Goethe-Institut Frankfurt.",
      "Leben und Arbeit in Deutschland: 11 Jahre.",
    ],
    photo: founderPhuong,
    alt: "Porträt von Phương, Geschäftsführerin von NaNu NaNa",
    featured: true,
  },
);

export const team = dictionary<TeamMember[]>(
  [
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
      id: "minh-trang",
      name: "Minh Trang",
      role: "Giáo viên",
      location: "Magdeburg, Deutschland",
      quote: [{ text: "Học là cơ hội chắc chắn nhất của cuộc đời!" }],
      bio: [
        "Cử nhân bằng giỏi đại học Magdeburg",
        "Học toàn bộ bằng tiếng Đức",
        "Sinh sống và làm việc 10 năm ở Đức",
        "Bằng nghiệp vụ sư phạm đại học sư phạm Hà Nội",
      ],
      photo: minhTrangPhoto,
      alt: "Chân dung Minh Trang, giáo viên tiếng Đức tại NaNu NaNa",
    },
    {
      id: "tu-nguyen",
      name: "Tú Nguyên",
      role: "Giáo viên",
      location: "Tübingen, Deutschland",
      quote: [
        {
          text: "Học ngoại ngữ cũng như hẹn hò: Lúc đầu rất ngại mở miệng, sau lại không thể ngừng nói!",
        },
      ],
      bio: [
        "Cử nhân đại học Tübingen, Đức, học toàn bộ bằng tiếng Đức",
        "Tốt nghiệp bằng sư phạm tiếng Đức tại viện Goethe",
        "Ngôn ngữ: Đức, Anh, Việt",
        "Ở Đức 9 năm",
      ],
      photo: tuPhoto,
      alt: "Chân dung Tú Nguyên, giáo viên tiếng Đức tại NaNu NaNa",
    },
    {
      id: "hoang-nguyen",
      name: "Hoàng Nguyễn",
      role: "Giáo viên",
      location: "Berlin, Deutschland",
      quote: hoangQuote,
      bio: [
        "Học tại TU Berlin",
        "Tiếng mẹ đẻ: tiếng Đức và tiếng Việt, Tiếng Anh: C1",
        "Sống tại Đức 36 năm",
      ],
      photo: hoangPhoto,
      alt: "Chân dung Hoàng Nguyễn, giáo viên tiếng Đức tại NaNu NaNa",
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
  ],
  [
    {
      id: "julian",
      name: "Julian",
      role: "Lehrkraft",
      bio: [
        "Internationales Programm Sprache und Kultur",
        "Auszeichnung (höchster Masterabschluss) in Hamburg",
        "Sprachen: Deutsch, Vietnamesisch, Englisch, Chinesisch",
        "Deutsch, geboren und aufgewachsen in Westdeutschland",
      ],
      photo: julianPhoto,
      alt: "Porträt von Julian, Deutschlehrkraft bei NaNu NaNa",
    },
    {
      id: "nicole",
      name: "Nicole Bärlein",
      role: "Business Development",
      bio: [
        "In Deutschland geboren und aufgewachsen.",
        "Viele Jahre Führung in der Gastronomie.",
        "Unterstützt Unternehmen in Deutschland bei der Einstellung vietnamesischer Lernender.",
      ],
      photo: nicolePhoto,
      alt: "Porträt von Nicole Bärlein, Business Development bei NaNu NaNa",
    },
    {
      id: "ben",
      name: "Ben",
      role: "Lehrkraft",
      bio: [
        "Master: Sozialforschung, Universität Tübingen.",
        "Muttersprachen: Deutsch und Vietnamesisch.",
        "Englisch C1.",
      ],
      photo: benPhoto,
      alt: "Porträt von Ben, Deutschlehrkraft bei NaNu NaNa",
    },
    {
      id: "minh-trang",
      name: "Minh Trang",
      role: "Lehrkraft",
      location: "Magdeburg, Deutschland",
      quote: [{ text: "Lernen ist die sicherste Chance im Leben.", lang: "de" }],
      bio: [
        "Bachelor mit gutem Abschluss, Universität Magdeburg",
        "Das ganze Studium auf Deutsch",
        "10 Jahre Leben und Arbeit in Deutschland",
        "Pädagogische Qualifikation, Pädagogische Universität Hanoi",
      ],
      photo: minhTrangPhoto,
      alt: "Porträt von Minh Trang, Deutschlehrkraft bei NaNu NaNa",
    },
    {
      id: "tu-nguyen",
      name: "Tú Nguyên",
      role: "Lehrkraft",
      location: "Tübingen, Deutschland",
      quote: [
        {
          text: "Eine Sprache lernen ist wie ein erstes Treffen: Zuerst traut man sich kaum zu sprechen, dann kann man nicht mehr aufhören.",
          lang: "de",
        },
      ],
      bio: [
        "Bachelor an der Universität Tübingen, das ganze Studium auf Deutsch",
        "Lehrbefähigung Deutsch am Goethe-Institut",
        "Sprachen: Deutsch, Englisch, Vietnamesisch",
        "9 Jahre in Deutschland",
      ],
      photo: tuPhoto,
      alt: "Porträt von Tú Nguyên, Deutschlehrkraft bei NaNu NaNa",
    },
    {
      id: "hoang-nguyen",
      name: "Hoàng Nguyễn",
      role: "Lehrkraft",
      location: "Berlin, Deutschland",
      quote: hoangQuote,
      bio: [
        "Studium an der TU Berlin",
        "Muttersprachen: Deutsch und Vietnamesisch, Englisch: C1",
        "36 Jahre in Deutschland",
      ],
      photo: hoangPhoto,
      alt: "Porträt von Hoàng Nguyễn, Deutschlehrkraft bei NaNu NaNa",
    },
    {
      id: "mai-trang",
      name: "Mai Trang",
      role: "Lehrkraft",
      bio: [
        "Master und Bachelor, Universität Leipzig.",
        "Sprache: Deutsch.",
        "Leben und Arbeit in Deutschland: 11 Jahre.",
      ],
    },
    {
      id: "tuan-giao-vien",
      name: "Tuấn",
      role: "Lehrkraft",
      bio: [
        "Bachelor, Leuphana-Universität, Kulturwissenschaften.",
        "Sprache: Deutsch.",
        "Leben und Arbeit in Deutschland: 8 Jahre.",
      ],
      photo: tuanPhoto,
      alt: "Porträt von Tuấn, Deutschlehrkraft bei NaNu NaNa",
    },
    {
      id: "duc",
      name: "Đức",
      role: "Lehrkraft",
      bio: [
        "Bachelor mit gutem Abschluss, Universität Hamburg.",
        "Stipendium für internationale Studierende.",
        "Sprache: Deutsch.",
        "Leben und Arbeit in Deutschland: 8 Jahre.",
      ],
    },
  ],
);

export const supportTeam = dictionary<TeamMember[]>(
  [
    {
      id: "tram",
      name: "Trâm",
      role: "Quản lý nhân sự",
      bio: ["Cử nhân ĐH Sài Gòn", "Chứng chỉ Hành chính nhân sự", "Tiếng Đức B2", "Tiếng Anh B1"],
      photo: tramPhoto,
      alt: "Chân dung Trâm, quản lý nhân sự tại NaNu NaNa",
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
      photo: lyPhoto,
      alt: "Chân dung Ly, nhân viên hỗ trợ học viên tại Hà Nội, NaNu NaNa",
    },
    {
      id: "cam-van",
      name: "Cẩm Vân",
      role: "Bộ phận chăm sóc khách hàng",
      bio: ["Cử nhân ĐH KH xã hội & nhân văn, ĐH quốc gia Hà Nội.", "Ngôn ngữ: Việt, Anh, Hàn."],
    },
  ],
  [
    {
      id: "tram",
      name: "Trâm",
      role: "Personalleitung",
      bio: [
        "Bachelor, Universität Saigon",
        "Zertifikat Personalverwaltung",
        "Deutsch B2",
        "Englisch B1",
      ],
      photo: tramPhoto,
      alt: "Porträt von Trâm, Personalleitung bei NaNu NaNa",
    },
    {
      id: "hai",
      name: "Hai",
      role: "Betreuung",
      bio: ["Betreuung der Lernenden in Saigon."],
      photo: haiPhoto,
      alt: "Porträt von Hai, Betreuung in Saigon, NaNu NaNa",
    },
    {
      id: "ly",
      name: "Ly",
      role: "Betreuung",
      bio: ["Betreuung der Lernenden in Hanoi."],
      photo: lyPhoto,
      alt: "Porträt von Ly, Betreuung in Hanoi, NaNu NaNa",
    },
    {
      id: "cam-van",
      name: "Cẩm Vân",
      role: "Kundenservice",
      bio: [
        "Bachelor, Universität für Sozial- und Geisteswissenschaften, Vietnam National University Hanoi.",
        "Sprachen: Vietnamesisch, Englisch, Koreanisch.",
      ],
    },
  ],
);

export const teamSection = dictionary(
  {
    eyebrow: "Đội ngũ NaNu NaNa",
    title: "Unser Team",
    intro:
      "Đội ngũ giáo viên giỏi, chuyên nghiệp, có nhiều năm học tập, sinh sống và làm việc tại Đức.",
    supportTitle: "Bộ phận hỗ trợ",
  },
  {
    eyebrow: "Das Team von NaNu NaNa",
    title: "Unser Team",
    intro:
      "Lehrkräfte mit starker Ausbildung und vielen Jahren Studium, Leben und Arbeit in Deutschland.",
    supportTitle: "Betreuung",
  },
);

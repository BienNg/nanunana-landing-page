/**
 * Careers page. Job descriptions are confirmed by NaNu NaNa; open questions
 * are wrapped in verify() and stay hidden in production.
 * Slugs stay the same under /de/tuyen-dung/[slug].
 */
import type { Locale } from "@/lib/i18n/locale";
import { site, siteCopy } from "./site";
import { isVisible, ok, type Claim } from "./verify";

/** A list item; `tag` renders as a small badge, e.g. "Bắt buộc". */
export type RoleItem = string | { text: string; tag: string };

export type RoleSection = {
  heading: string;
  intro?: Claim;
  items?: Claim<RoleItem[]>;
  /** Shown crossed out under `crossedOutLabel`: work the role does not include. */
  crossedOut?: Claim<string[]>;
  crossedOutLabel?: string;
};

export type RoleFact = { label: string; value: Claim };

export type RoleFaq = { q: string; a: Claim };

export type Role = {
  /** URL segment: /tuyen-dung/[slug] */
  slug: string;
  title: string;
  /** Whether the role is actually open. Unconfirmed roles are hidden in production. */
  open: Claim<boolean>;
  type: Claim;
  location: Claim;
  summary: Claim;
  /** Email subject; defaults to the locale prefix plus the title. */
  applySubject?: string;
  facts?: RoleFact[];
  sections: RoleSection[];
  application?: {
    send: Claim<string[]>;
    steps: Claim<string[]>;
  };
  faq?: RoleFaq[];
};

const teacherCurriculumVi: RoleSection = {
  heading: "Giáo trình đã sẵn sàng",
  intro: ok("Mọi tài liệu đã được soạn sẵn — bạn chỉ cần tập trung vào việc dạy."),
  items: ok([
    "Slide bài giảng trên Canva",
    "Tài liệu PDF cho từng bài",
    "Danh sách từ vựng kèm audio và trọng âm",
    "Flashcard trên Classroom",
    "Video giải thích ngữ pháp",
    "Ứng dụng học NaNu Go",
  ]),
  crossedOutLabel: "Bạn không cần:",
  crossedOut: ok(["Soạn bài", "Tự làm tài liệu", "Chấm bài tập"]),
};

const teacherCurriculumDe: RoleSection = {
  heading: "Der Unterricht ist vorbereitet",
  intro: ok("Alle Materialien liegen bereit — Sie konzentrieren sich aufs Unterrichten."),
  items: ok([
    "Unterrichtsfolien in Canva",
    "PDF zu jeder Lektion",
    "Wortschatzlisten mit Audio und Betonung",
    "Karteikarten in Classroom",
    "Videos zur Grammatik",
    "Lern-App NaNu Go",
  ]),
  crossedOutLabel: "Das müssen Sie nicht:",
  crossedOut: ok(["Stunden vorbereiten", "Material selbst erstellen", "Hausaufgaben korrigieren"]),
};

const teacherDutiesVi = [
  "Đồng hành cùng một lớp từ đầu đến cuối khoá (khoảng 9 tháng)",
  "Nhận xét, phản hồi cho học viên",
  "Điểm danh mỗi buổi học",
  "Tham gia các buổi họp nhóm định kỳ",
];

const teacherDutiesDe = [
  "Eine Klasse vom ersten bis zum letzten Tag begleiten (etwa 9 Monate)",
  "Rückmeldung an die Lernenden",
  "Anwesenheit in jeder Stunde erfassen",
  "An den regelmäßigen Teamsitzungen teilnehmen",
];

const teacherStepsVi = ok([
  "Gửi CV qua email",
  "Trao đổi ngắn qua video",
  "Dạy thử một buổi",
  "Nhận lớp và bắt đầu dạy",
]);

const teacherStepsDe = ok([
  "Lebenslauf per E-Mail senden",
  "Kurzes Videogespräch",
  "Eine Probestunde geben",
  "Die Klasse übernehmen und unterrichten",
]);

const teacherFaqVi: RoleFaq[] = [
  {
    q: "Tôi có cần kinh nghiệm giảng dạy không?",
    a: ok(
      "Không bắt buộc. Kinh nghiệm giảng dạy, hoặc bất kỳ kinh nghiệm nào trong lĩnh vực giáo dục, là một lợi thế.",
    ),
  },
  {
    q: "Tôi có phải soạn bài không?",
    a: ok(
      "Không. Slide, tài liệu, từ vựng, flashcard và video đã được soạn sẵn cho từng buổi học.",
    ),
  },
  {
    q: "Mỗi lớp kéo dài bao lâu?",
    a: ok("Khoảng 9 tháng. Bạn dạy cùng một lớp từ đầu đến cuối khoá."),
  },
  { q: "CV viết bằng tiếng gì?", a: ok("Tiếng Đức.") },
];

const teacherFaqDe: RoleFaq[] = [
  {
    q: "Brauche ich Unterrichtserfahrung?",
    a: ok(
      "Nicht zwingend. Unterrichtserfahrung oder andere Erfahrung im Bildungsbereich ist ein Vorteil.",
    ),
  },
  {
    q: "Muss ich den Unterricht vorbereiten?",
    a: ok(
      "Nein. Folien, Material, Wortschatz, Karteikarten und Videos liegen für jede Stunde bereit.",
    ),
  },
  {
    q: "Wie lange dauert eine Klasse?",
    a: ok("Etwa 9 Monate. Sie unterrichten dieselbe Klasse vom Anfang bis zum Ende."),
  },
  { q: "In welcher Sprache schreibe ich den Lebenslauf?", a: ok("Auf Deutsch.") },
];

const onSiteAddress = `Trực tiếp tại cơ sở của NaNu NaNa: ${site.address.street}, ${site.address.city} hoặc ${site.addressHanoi.street}, ${site.addressHanoi.city}.`;
const onSiteAddressDe = `Direkt an einem Standort von NaNu NaNa: ${site.address.street}, ${site.address.city} oder ${site.addressHanoi.street}, ${site.addressHanoi.city}.`;

const rolesVi: Role[] = [
  {
    slug: "giao-vien-sai-gon-ha-noi",
    title: "Giáo viên tiếng Đức – Sài Gòn / Hà Nội (m/w/d)",
    open: ok(true),
    type: ok("Toàn thời gian / Bán thời gian"),
    location: ok("TP. Hồ Chí Minh · Hà Nội"),
    summary: ok(
      "Dạy tiếng Đức trực tiếp tại cơ sở của NaNu NaNa ở Sài Gòn hoặc Hà Nội, trình độ A1–C1 — với giáo trình đã soạn sẵn.",
    ),
    applySubject: "Bewerbung: Deutschlehrer:in vor Ort – Sài Gòn / Hà Nội (m/w/d)",
    facts: [
      {
        label: "Hợp đồng",
        value: ok("Sài Gòn: toàn thời gian hoặc bán thời gian · Hà Nội: bán thời gian"),
      },
      { label: "Địa điểm", value: ok("Trực tiếp tại cơ sở TP. Hồ Chí Minh hoặc Hà Nội") },
      { label: "Lịch dạy", value: ok("4–7 buổi/tuần · 2,5 giờ/buổi") },
      { label: "Bắt đầu", value: ok("Theo thỏa thuận") },
    ],
    sections: [
      {
        heading: "Học viên của bạn",
        intro: ok(
          "Học viên học tiếng Đức từ trình độ A1 đến C1, học trực tiếp tại lớp. Bạn đồng hành cùng một lớp từ buổi đầu tiên đến khi kết thúc khoá — khoảng 9 tháng.",
        ),
      },
      teacherCurriculumVi,
      {
        heading: "Nhiệm vụ",
        items: ok([
          "Dạy trực tiếp tại lớp theo giáo trình có sẵn, từ 4 đến 7 buổi mỗi tuần, mỗi buổi 2,5 giờ",
          ...teacherDutiesVi,
        ]),
      },
      {
        heading: "Yêu cầu",
        items: ok<RoleItem[]>([
          { text: "Tiếng Việt là tiếng mẹ đẻ", tag: "Bắt buộc" },
          "Có bằng cấp tại Đức (Abitur, cử nhân hoặc tương đương)",
          "Có thể dạy trực tiếp tại cơ sở ở TP. Hồ Chí Minh hoặc Hà Nội",
          "Dạy tối thiểu 4 buổi mỗi tuần và theo một lớp trọn khoá",
          "Kinh nghiệm giảng dạy hoặc trong lĩnh vực giáo dục là một lợi thế",
        ]),
      },
      {
        heading: "Quyền lợi",
        items: ok([
          "Hợp đồng toàn thời gian (Sài Gòn) hoặc bán thời gian (Sài Gòn, Hà Nội)",
          "Lương theo giờ tăng theo số lớp — dạy càng nhiều, mức lương mỗi giờ càng cao",
          "Tự chọn số buổi dạy, từ 4 đến 7 buổi mỗi tuần",
          "Giáo trình và tài liệu soạn sẵn — không cần soạn bài hay chấm bài",
        ]),
      },
    ],
    application: {
      send: ok(["CV bằng tiếng Đức", "Ghi rõ bạn muốn dạy tại Sài Gòn hay Hà Nội"]),
      steps: ok([
        "Gửi CV qua email",
        "Trao đổi ngắn persönlich vor Ort",
        "Dạy thử một buổi",
        "Nhận lớp và bắt đầu dạy",
      ]),
    },
    faq: [
      {
        q: "Giờ dạy có linh hoạt không?",
        a: ok(
          "Không. Lịch dạy cố định, mỗi buổi 2,5 giờ. Bạn chọn số buổi mỗi tuần (4–7), nhưng giờ học của lớp là cố định.",
        ),
      },
      { q: "Tôi dạy ở đâu?", a: ok(onSiteAddress) },
      ...teacherFaqVi,
    ],
  },
  {
    slug: "giao-vien-online",
    title: "Giáo viên tiếng Đức Online (m/w/d)",
    open: ok(true),
    type: ok("Bán thời gian (Teilzeit)"),
    location: ok("Online · Sinh sống tại Đức"),
    summary: ok(
      "Dạy tiếng Đức online cho học viên Việt Nam tại Đức và tại Việt Nam, trình độ A1–C1 — với giáo trình đã soạn sẵn.",
    ),
    applySubject: "Bewerbung: Deutschlehrer:in Online (m/w/d)",
    facts: [
      { label: "Hợp đồng", value: ok("Bán thời gian (Teilzeit)") },
      { label: "Địa điểm", value: ok("Online — bạn cần sinh sống tại Đức") },
      { label: "Lịch dạy", value: ok("2–7 buổi/tuần · buổi tối · 90 phút/buổi") },
      { label: "Bắt đầu", value: ok("Theo thỏa thuận") },
    ],
    sections: [
      {
        heading: "Học viên của bạn",
        intro: ok(
          "Người Việt đang sinh sống tại Đức và tại Việt Nam, học tiếng Đức từ trình độ A1 đến C1. Bạn đồng hành cùng một lớp từ buổi đầu tiên đến khi kết thúc khoá — khoảng 9 tháng.",
        ),
      },
      teacherCurriculumVi,
      {
        heading: "Nhiệm vụ",
        items: ok([
          "Dạy online qua Zoom theo giáo trình có sẵn, từ 2 đến 7 buổi mỗi tuần, mỗi buổi 90 phút",
          ...teacherDutiesVi,
        ]),
      },
      {
        heading: "Yêu cầu",
        items: ok<RoleItem[]>([
          { text: "Tiếng Việt là tiếng mẹ đẻ", tag: "Bắt buộc" },
          "Có bằng cấp tại Đức (Abitur, cử nhân hoặc tương đương)",
          "Đang sinh sống tại Đức",
          "Dạy tối thiểu 2 buổi mỗi tuần và theo một lớp trọn khoá",
          "Kinh nghiệm giảng dạy hoặc trong lĩnh vực giáo dục là một lợi thế",
        ]),
      },
      {
        heading: "Quyền lợi",
        items: ok([
          "Hợp đồng bán thời gian (Teilzeit)",
          "Lương theo giờ tăng theo số lớp — dạy càng nhiều, mức lương mỗi giờ càng cao",
          "Tự chọn số buổi dạy, từ 2 đến 7 buổi mỗi tuần",
          "Giáo trình và tài liệu soạn sẵn — không cần soạn bài hay chấm bài",
          "Làm việc online tại nhà",
        ]),
      },
    ],
    application: {
      send: ok(["CV bằng tiếng Đức"]),
      steps: teacherStepsVi,
    },
    faq: [
      {
        q: "Giờ dạy có linh hoạt không?",
        a: ok(
          "Không. Lịch dạy cố định vào buổi tối, mỗi buổi 90 phút. Bạn chọn số buổi mỗi tuần (2–7), nhưng giờ học của lớp là cố định.",
        ),
      },
      {
        q: "Tôi không sống ở Đức thì có ứng tuyển được không?",
        a: ok("Không. Vị trí này dành cho ứng viên đang sinh sống tại Đức."),
      },
      ...teacherFaqVi,
    ],
  },
  {
    slug: "cham-soc-khach-hang",
    title: "Chăm sóc khách hàng – Sài Gòn / Hà Nội",
    open: ok(true),
    type: ok("Toàn thời gian / Bán thời gian"),
    location: ok("TP. Hồ Chí Minh · Hà Nội"),
    summary: ok(
      "Đồng hành cùng học viên từ ngày đầu học tiếng Đức đến khi có visa — tư vấn khoá học, theo dõi tiến độ, hỗ trợ giáo viên và làm hồ sơ visa.",
    ),
    facts: [
      { label: "Hợp đồng", value: ok("Toàn thời gian hoặc bán thời gian") },
      { label: "Địa điểm", value: ok("Tại cơ sở TP. Hồ Chí Minh hoặc Hà Nội") },
      {
        label: "Giờ làm việc",
        value: ok("Toàn thời gian: thứ 2–6, ban ngày · Bán thời gian: buổi tối và cuối tuần"),
      },
      { label: "Bắt đầu", value: ok("Theo thỏa thuận") },
    ],
    sections: [
      {
        heading: "Nhiệm vụ",
        items: ok([
          "Nắm rõ tất cả sản phẩm của NaNu NaNa: các khoá tiếng Đức A1–C1, du học đại học, du học nghề (Ausbildung) và ứng dụng NaNu Go",
          "Tư vấn và giải đáp thắc mắc cho học viên và phụ huynh",
          "Thường xuyên liên hệ học viên để theo dõi tiến độ học tập",
          "Hỗ trợ giáo viên trong công việc hằng ngày",
          "Làm hồ sơ visa cho học viên: chuẩn bị, kiểm tra và theo dõi giấy tờ đến khi hoàn tất",
        ]),
      },
      {
        heading: "Yêu cầu",
        items: ok<RoleItem[]>([
          "Thành thạo công việc văn phòng: email, soạn thảo văn bản, bảng tính (Word/Google Docs, Excel/Google Sheets)",
          "Cẩn thận, chính xác và có tổ chức khi xử lý giấy tờ, hồ sơ",
          "Giao tiếp tốt, thân thiện và kiên nhẫn qua điện thoại, tin nhắn và gặp trực tiếp",
          "Chủ động, có trách nhiệm, quản lý tốt thời gian và nhiều việc cùng lúc",
          "Có thể làm việc tại cơ sở TP. Hồ Chí Minh hoặc Hà Nội",
          "Kinh nghiệm hành chính, thư ký, chăm sóc khách hàng hoặc tư vấn là một lợi thế",
          "Biết tiếng Đức là một lợi thế, không bắt buộc",
        ]),
      },
      {
        heading: "Quyền lợi",
        items: ok([
          "Học tiếng Đức miễn phí tại NaNu NaNa",
          "Được đào tạo về sản phẩm và quy trình làm hồ sơ visa, có cơ hội phát triển trong đội ngũ",
          "Đội ngũ trẻ, quốc tế — làm việc cùng giáo viên và đồng nghiệp tại Việt Nam và Đức",
        ]),
      },
      {
        heading: "Thưởng",
        items: ok(["Thưởng theo hiệu quả công việc và lương tháng 13"]),
      },
    ],
    application: {
      send: ok([
        "CV bằng tiếng Việt",
        "Ghi rõ bạn muốn làm tại Sài Gòn hay Hà Nội, toàn thời gian hay bán thời gian",
      ]),
      steps: ok(["Gửi CV qua email", "Phỏng vấn", "Nhận việc và bắt đầu"]),
    },
    faq: [
      {
        q: "Tôi có cần biết tiếng Đức không?",
        a: ok(
          "Không bắt buộc. Biết tiếng Đức là một lợi thế, và nhân viên được học tiếng Đức miễn phí.",
        ),
      },
      {
        q: "Tôi chưa từng làm hồ sơ visa thì có ứng tuyển được không?",
        a: ok("Được. Bạn sẽ được đào tạo về quy trình làm hồ sơ visa du học Đức."),
      },
      {
        q: "Giờ làm việc như thế nào?",
        a: ok(
          "Toàn thời gian: từ thứ 2 đến thứ 6, ban ngày. Bán thời gian: buổi tối và cuối tuần.",
        ),
      },
      { q: "CV viết bằng tiếng gì?", a: ok("Tiếng Việt.") },
    ],
  },
];

const rolesDe: Role[] = [
  {
    slug: "giao-vien-sai-gon-ha-noi",
    title: "Deutschlehrkraft vor Ort – Sài Gòn / Hà Nội (m/w/d)",
    open: ok(true),
    type: ok("Vollzeit / Teilzeit"),
    location: ok("Ho-Chi-Minh-Stadt · Hanoi"),
    summary: ok(
      "Deutsch vor Ort an einem Standort von NaNu NaNa in Sài Gòn oder Hanoi unterrichten, Niveau A1–C1 — mit fertigem Unterricht.",
    ),
    applySubject: "Bewerbung: Deutschlehrer:in vor Ort – Sài Gòn / Hà Nội (m/w/d)",
    facts: [
      {
        label: "Vertrag",
        value: ok("Sài Gòn: Vollzeit oder Teilzeit · Hanoi: Teilzeit"),
      },
      { label: "Ort", value: ok("Vor Ort in Ho-Chi-Minh-Stadt oder Hanoi") },
      { label: "Unterricht", value: ok("4–7 Einheiten/Woche · 2,5 Stunden/Einheit") },
      { label: "Beginn", value: ok("Nach Vereinbarung") },
    ],
    sections: [
      {
        heading: "Ihre Lernenden",
        intro: ok(
          "Die Lernenden lernen Deutsch von A1 bis C1, vor Ort im Kurs. Sie begleiten eine Klasse von der ersten Stunde bis zum Ende — etwa 9 Monate.",
        ),
      },
      teacherCurriculumDe,
      {
        heading: "Aufgaben",
        items: ok([
          "Vor Ort nach dem vorliegenden Unterricht unterrichten, 4 bis 7 Einheiten pro Woche, je 2,5 Stunden",
          ...teacherDutiesDe,
        ]),
      },
      {
        heading: "Anforderungen",
        items: ok<RoleItem[]>([
          { text: "Vietnamesisch als Muttersprache", tag: "Erforderlich" },
          "Ein Abschluss aus Deutschland (Abitur, Bachelor oder vergleichbar)",
          "Unterricht vor Ort in Ho-Chi-Minh-Stadt oder Hanoi",
          "Mindestens 4 Einheiten pro Woche und eine Klasse über den ganzen Kurs",
          "Unterrichts- oder Bildungserfahrung ist ein Vorteil",
        ]),
      },
      {
        heading: "Was wir bieten",
        items: ok([
          "Vollzeitvertrag (Sài Gòn) oder Teilzeit (Sài Gòn, Hanoi)",
          "Stundenlohn, der mit der Zahl der Klassen steigt",
          "Sie wählen 4 bis 7 Einheiten pro Woche",
          "Unterricht und Material liegen bereit — keine Vorbereitung, keine Korrektur",
        ]),
      },
    ],
    application: {
      send: ok(["Lebenslauf auf Deutsch", "Bitte angeben, ob Sài Gòn oder Hanoi"]),
      steps: ok([
        "Lebenslauf per E-Mail senden",
        "Kurzes Gespräch persönlich vor Ort",
        "Eine Probestunde geben",
        "Die Klasse übernehmen und unterrichten",
      ]),
    },
    faq: [
      {
        q: "Sind die Unterrichtszeiten flexibel?",
        a: ok(
          "Nein. Der Plan steht fest, jede Einheit dauert 2,5 Stunden. Sie wählen die Zahl der Einheiten pro Woche (4–7), die Uhrzeit der Klasse steht fest.",
        ),
      },
      { q: "Wo unterrichte ich?", a: ok(onSiteAddressDe) },
      ...teacherFaqDe,
    ],
  },
  {
    slug: "giao-vien-online",
    title: "Deutschlehrkraft online (m/w/d)",
    open: ok(true),
    type: ok("Teilzeit"),
    location: ok("Online · Wohnsitz in Deutschland"),
    summary: ok(
      "Deutsch online für vietnamesische Lernende in Deutschland und in Vietnam unterrichten, Niveau A1–C1 — mit fertigem Unterricht.",
    ),
    applySubject: "Bewerbung: Deutschlehrer:in Online (m/w/d)",
    facts: [
      { label: "Vertrag", value: ok("Teilzeit") },
      { label: "Ort", value: ok("Online — Sie leben in Deutschland") },
      { label: "Unterricht", value: ok("2–7 Einheiten/Woche · abends · 90 Minuten") },
      { label: "Beginn", value: ok("Nach Vereinbarung") },
    ],
    sections: [
      {
        heading: "Ihre Lernenden",
        intro: ok(
          "Vietnamesinnen und Vietnamesen in Deutschland und in Vietnam lernen Deutsch von A1 bis C1. Sie begleiten eine Klasse von der ersten Stunde bis zum Ende — etwa 9 Monate.",
        ),
      },
      teacherCurriculumDe,
      {
        heading: "Aufgaben",
        items: ok([
          "Online über Zoom nach dem vorliegenden Unterricht unterrichten, 2 bis 7 Einheiten pro Woche, je 90 Minuten",
          ...teacherDutiesDe,
        ]),
      },
      {
        heading: "Anforderungen",
        items: ok<RoleItem[]>([
          { text: "Vietnamesisch als Muttersprache", tag: "Erforderlich" },
          "Ein Abschluss aus Deutschland (Abitur, Bachelor oder vergleichbar)",
          "Wohnsitz in Deutschland",
          "Mindestens 2 Einheiten pro Woche und eine Klasse über den ganzen Kurs",
          "Unterrichts- oder Bildungserfahrung ist ein Vorteil",
        ]),
      },
      {
        heading: "Was wir bieten",
        items: ok([
          "Teilzeitvertrag",
          "Stundenlohn, der mit der Zahl der Klassen steigt",
          "Sie wählen 2 bis 7 Einheiten pro Woche",
          "Unterricht und Material liegen bereit — keine Vorbereitung, keine Korrektur",
          "Arbeit von zu Hause",
        ]),
      },
    ],
    application: {
      send: ok(["Lebenslauf auf Deutsch"]),
      steps: teacherStepsDe,
    },
    faq: [
      {
        q: "Sind die Unterrichtszeiten flexibel?",
        a: ok(
          "Nein. Der Plan liegt abends fest, jede Einheit dauert 90 Minuten. Sie wählen die Zahl der Einheiten pro Woche (2–7), die Uhrzeit der Klasse steht fest.",
        ),
      },
      {
        q: "Kann ich mich bewerben, wenn ich nicht in Deutschland lebe?",
        a: ok("Nein. Diese Stelle ist für Bewerbungen mit Wohnsitz in Deutschland."),
      },
      ...teacherFaqDe,
    ],
  },
  {
    slug: "cham-soc-khach-hang",
    title: "Kundenservice – Sài Gòn / Hà Nội",
    open: ok(true),
    type: ok("Vollzeit / Teilzeit"),
    location: ok("Ho-Chi-Minh-Stadt · Hanoi"),
    summary: ok(
      "Lernende vom ersten Deutschkurs bis zum Visum begleiten — Kurse beraten, den Fortschritt verfolgen, Lehrkräfte unterstützen und Visumsunterlagen führen.",
    ),
    facts: [
      { label: "Vertrag", value: ok("Vollzeit oder Teilzeit") },
      { label: "Ort", value: ok("Am Standort in Ho-Chi-Minh-Stadt oder Hanoi") },
      {
        label: "Arbeitszeit",
        value: ok("Vollzeit: Montag–Freitag, tagsüber · Teilzeit: abends und am Wochenende"),
      },
      { label: "Beginn", value: ok("Nach Vereinbarung") },
    ],
    sections: [
      {
        heading: "Aufgaben",
        items: ok([
          "Alle Angebote von NaNu NaNa kennen: Deutschkurse A1–C1, Studium, Ausbildung und die App NaNu Go",
          "Lernende und Eltern beraten und Fragen beantworten",
          "Lernende regelmäßig zum Lernfortschritt kontaktieren",
          "Lehrkräfte im Alltag unterstützen",
          "Visumsunterlagen vorbereiten, prüfen und bis zum Abschluss verfolgen",
        ]),
      },
      {
        heading: "Anforderungen",
        items: ok<RoleItem[]>([
          "Sicher im Büro: E-Mail, Texte, Tabellen (Word/Google Docs, Excel/Google Sheets)",
          "Sorgfältig, genau und geordnet im Umgang mit Unterlagen",
          "Freundlich und geduldig am Telefon, in Nachrichten und im persönlichen Gespräch",
          "Eigenständig, verlässlich, gut im Umgang mit Zeit und mehreren Aufgaben",
          "Arbeit am Standort in Ho-Chi-Minh-Stadt oder Hanoi möglich",
          "Erfahrung in Verwaltung, Assistenz, Kundenservice oder Beratung ist ein Vorteil",
          "Deutschkenntnisse sind ein Vorteil, keine Voraussetzung",
        ]),
      },
      {
        heading: "Was wir bieten",
        items: ok([
          "Kostenloser Deutschkurs bei NaNu NaNa",
          "Einarbeitung in die Angebote und das Visumverfahren, mit Raum zur Entwicklung im Team",
          "Ein junges, internationales Team — mit Lehrkräften und Kolleginnen in Vietnam und Deutschland",
        ]),
      },
      {
        heading: "Zusatz",
        items: ok(["Leistungsabhängige Prämie und ein 13. Monatsgehalt"]),
      },
    ],
    application: {
      send: ok([
        "Lebenslauf auf Vietnamesisch",
        "Bitte angeben: Sài Gòn oder Hanoi, Vollzeit oder Teilzeit",
      ]),
      steps: ok(["Lebenslauf per E-Mail senden", "Gespräch", "Zusage und Start"]),
    },
    faq: [
      {
        q: "Muss ich Deutsch können?",
        a: ok(
          "Nicht zwingend. Deutschkenntnisse sind ein Vorteil, und das Team lernt Deutsch kostenlos.",
        ),
      },
      {
        q: "Kann ich mich bewerben, wenn ich noch keine Visumsunterlagen bearbeitet habe?",
        a: ok("Ja. Sie werden in den Ablauf der Visumsunterlagen für Deutschland eingearbeitet."),
      },
      {
        q: "Wie sind die Arbeitszeiten?",
        a: ok("Vollzeit: Montag bis Freitag, tagsüber. Teilzeit: abends und am Wochenende."),
      },
      { q: "In welcher Sprache schreibe ich den Lebenslauf?", a: ok("Auf Vietnamesisch.") },
    ],
  },
];

const roles: Record<Locale, Role[]> = { vi: rolesVi, de: rolesDe };

const pageCopy = {
  vi: {
    title: "Tuyển Dụng",
    metaTitle: "Tuyển Dụng",
    intro:
      "NaNu NaNa luôn tìm kiếm những người đồng hành tâm huyết — cùng chúng tôi giúp các bạn trẻ Việt Nam học tiếng Đức và chinh phục giấc mơ Đức với chất lượng và sự tử tế.",
    applySubjectPrefix: "[Ứng tuyển]",
    openApplication: "Ứng tuyển tự do",
    noOpenRoles:
      "Hiện chưa có vị trí đang tuyển. Bạn vẫn có thể gửi CV để chúng tôi liên hệ khi có vị trí phù hợp.",
    applyHowTo:
      "Gửi CV (tiếng Việt hoặc tiếng Đức) kèm vị trí bạn quan tâm qua email. Chúng tôi sẽ phản hồi các hồ sơ phù hợp.",
    roleApplyHowTo:
      "Gửi CV (tiếng Việt hoặc tiếng Đức) qua email. Tiêu đề email đã được điền sẵn theo vị trí này.",
    aboutHeading: "Về NaNu NaNa",
    equalOpportunity:
      "NaNu NaNa chào đón mọi ứng viên, không phân biệt giới tính, nguồn gốc dân tộc, tôn giáo hay thế giới quan, khuyết tật, tuổi tác hay xu hướng tính dục.",
    joinBadge: "Gia nhập NaNu NaNa",
    openRoles: "Vị trí đang tuyển",
    viewRole: "Xem chi tiết",
    sendCv: "Gửi CV",
    otherRole: "Chưa thấy vị trí phù hợp?",
    allRoles: "Tất cả vị trí",
    recruiting: "Tuyển dụng",
    contact: "Liên hệ",
    apply: "Ứng tuyển",
    documents: "Hồ sơ cần gửi",
    sendTo: "Gửi đến",
    subject: "Tiêu đề email",
    steps: "Quy trình",
    faq: "Câu hỏi thường gặp",
    applyRole: "Ứng tuyển vị trí này",
    sendCvEmail: "Gửi CV qua email",
    roleMeta: "Tuyển Dụng",
  },
  de: {
    title: "Karriere",
    metaTitle: "Karriere",
    intro:
      "NaNu NaNa sucht Menschen, die mit uns junge Leute aus Vietnam beim Deutschlernen und auf dem Weg nach Deutschland begleiten — mit Qualität und Anstand.",
    applySubjectPrefix: "Bewerbung:",
    openApplication: "Initiativbewerbung",
    noOpenRoles:
      "Gerade ist keine Stelle ausgeschrieben. Sie können trotzdem einen Lebenslauf senden. Wir melden uns, wenn eine passende Stelle frei wird.",
    applyHowTo:
      "Senden Sie Ihren Lebenslauf (auf Vietnamesisch oder Deutsch) mit der Stelle, die Sie interessiert. Wir antworten auf passende Bewerbungen.",
    roleApplyHowTo:
      "Senden Sie Ihren Lebenslauf (auf Vietnamesisch oder Deutsch) per E-Mail. Der Betreff ist für diese Stelle schon gesetzt.",
    aboutHeading: "Über NaNu NaNa",
    equalOpportunity:
      "NaNu NaNa begrüßt alle Bewerbungen, unabhängig von Geschlecht, ethnischer Herkunft, Religion oder Weltanschauung, Behinderung, Alter oder sexueller Identität.",
    joinBadge: "Werden Sie Teil von NaNu NaNa",
    openRoles: "Offene Stellen",
    viewRole: "Details ansehen",
    sendCv: "Lebenslauf senden",
    otherRole: "Keine passende Stelle dabei?",
    allRoles: "Alle Stellen",
    recruiting: "Karriere",
    contact: "Kontakt",
    apply: "Bewerbung",
    documents: "Das senden Sie",
    sendTo: "An",
    subject: "Betreff",
    steps: "Ablauf",
    faq: "Häufige Fragen",
    applyRole: "Auf diese Stelle bewerben",
    sendCvEmail: "Lebenslauf per E-Mail senden",
    roleMeta: "Karriere",
  },
} as const;

export function careersContent(locale: Locale) {
  const copy = pageCopy[locale];
  const brand = siteCopy[locale];
  return {
    ...copy,
    applyEmail: site.email,
    about: {
      heading: copy.aboutHeading,
      text: brand.description,
      offices: (["hcm", "hanoi"] as const).map((id) =>
        id === "hcm" ? brand.officeHcm : brand.officeHanoi,
      ),
      slogan: brand.slogan,
    },
    roles: roles[locale],
  };
}

/** @deprecated Prefer careersContent(locale). Kept name for a short migration of call sites. */
export const careers = careersContent("vi");

export function applySubject(locale: Locale, role?: Role) {
  const copy = pageCopy[locale];
  return role?.applySubject ?? `${copy.applySubjectPrefix} ${role?.title ?? copy.openApplication}`;
}

/** mailto link with the subject pre-filled for a role (or a general application). */
export function applyHref(locale: Locale, role?: Role) {
  return `mailto:${site.email}?subject=${encodeURIComponent(applySubject(locale, role))}`;
}

export function careerHref(slug: string) {
  return `/tuyen-dung/${slug}`;
}

/** Roles that may be shown in the current environment. */
export function openRoles(locale: Locale) {
  return roles[locale].filter((role) => isVisible(role.open) && role.open.value);
}

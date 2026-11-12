/**
 * Ausbildung job pages under /du-hoc-nghe/<slug>, plus the list page
 * /du-hoc-nghe/cac-nganh.
 *
 * Job facts (duration, tasks, training content, interests, school subjects,
 * traits, access) come from each job's BERUFENET page. Pay for the dual jobs
 * is the legal minimum from BIBB; visa and livelihood rules come from Make it
 * in Germany and the German embassy in Hanoi. All sources were read on
 * `berufeReviewed`. The German level is B2 as a practice note from NaNu NaNa;
 * the sourced rule (B1 for the visa, B1 or B2 for nursing) stays in the text.
 */
import type { Locale } from "@/lib/i18n/locale";
import type { GuideContent, GuideSourceId } from "./guides";
import { pflegeContent } from "./ausbildung-pflege";

export const berufSlugs = [
  "dieu-duong",
  "nha-hang",
  "khach-san",
  "lam-banh",
  "ban-hang-tiem-banh",
  "ban-hang-tiem-thit",
  "che-bien-thit",
] as const;
export type BerufSlug = (typeof berufSlugs)[number];
export const isBerufSlug = (value: string): value is BerufSlug =>
  (berufSlugs as readonly string[]).includes(value);

export const berufeReviewed = "2026-11-12";
export const berufeListHref = "/du-hoc-nghe/cac-nganh";
export const berufHref = (slug: BerufSlug) => `/du-hoc-nghe/${slug}`;

/** Official German job title, the same on both language versions. */
export const berufTitles: Record<BerufSlug, string> = {
  "dieu-duong": "Pflegefachmann/Pflegefachfrau",
  "nha-hang": "Fachmann/Fachfrau für Restaurants und Veranstaltungsgastronomie",
  "khach-san": "Hotelfachmann/Hotelfachfrau",
  "lam-banh": "Bäcker/Bäckerin",
  "ban-hang-tiem-banh":
    "Fachverkäufer/Fachverkäuferin im Lebensmittelhandwerk – Schwerpunkt Bäckerei",
  "ban-hang-tiem-thit":
    "Fachverkäufer/Fachverkäuferin im Lebensmittelhandwerk – Schwerpunkt Fleischerei",
  "che-bien-thit": "Fleischer/Fleischerin",
};

/** Short entry for the list page and the share image. */
export type BerufSummary = { name: string; short: string; group: string };

type DualFacts = BerufSummary & {
  metaTitle: string;
  description: string;
  /** Opening sentence about the job; the shared text follows. */
  lead: string;
  tasks?: string[];
  learn: string[];
  interests: string;
  subjects: string;
  traits: string[];
  /** Access notes beyond the general rule, only where BERUFENET names them. */
  access?: string[];
  source: GuideSourceId;
};

const vi = {
  overview: { label: "Du học nghề Đức", href: "/du-hoc-nghe" },
  list: { label: "Các ngành học nghề", href: berufeListHref },
};
const de = {
  overview: { label: "Ausbildung in Deutschland", href: "/du-hoc-nghe" },
  list: { label: "Ausbildungsberufe", href: berufeListHref },
};

function dualVi(slug: BerufSlug, f: DualFacts): GuideContent {
  const title = berufTitles[slug];
  return {
    eyebrow: `Du học nghề · ${f.name}`,
    title: `Du học nghề ${f.name.toLowerCase()} tại Đức: học gì, hợp với ai, lương bao nhiêu`,
    metaTitle: f.metaTitle,
    description: f.description,
    intro: `${f.lead} Tên nghề chính thức là ${title}. Trang này tóm tắt công việc, nội dung học và tố chất cần có theo trang nghề nghiệp BERUFENET của Cơ quan Lao động Liên bang Đức, cùng quy định về lương đào tạo và thị thực. Quy định có thể thay đổi, nên hãy xem lại nguồn chính thức trước khi nộp hồ sơ.`,
    quickTitle: "Trả lời nhanh",
    quick: [
      { label: "Học bao lâu?", value: "3 năm, đào tạo kép tại doanh nghiệp và trường nghề" },
      { label: "Có mất học phí không?", value: "Không, doanh nghiệp trả lương đào tạo cho bạn" },
      {
        label: "Lương tối thiểu?",
        value: "764 €/tháng năm đầu (gross), nếu bắt đầu học trong năm 2027",
      },
      {
        label: "Cần tiếng Đức gì?",
        value: "B2, vì hầu hết nơi đào tạo yêu cầu trình độ này",
      },
    ],
    sections: [
      ...(f.tasks
        ? [
            {
              id: "cong-viec",
              title: "Làm công việc gì?",
              paragraphs: ["Công việc hằng ngày gồm:"],
              points: f.tasks,
              sources: [f.source],
            },
          ]
        : []),
      {
        id: "hoc-gi",
        title: "Trong 3 năm học những gì?",
        paragraphs: [
          "Bạn học phần lớn tại doanh nghiệp đào tạo, xen kẽ với các buổi học lý thuyết tại trường nghề (Berufsschule). Nội dung đào tạo gồm:",
        ],
        points: f.learn,
        sources: [f.source],
      },
      {
        id: "ho-so",
        title: "Nghề này hợp với ai?",
        paragraphs: [
          `Nghề này hợp với người thích ${f.interests}. Ở trường phổ thông, các môn có ích nhất là ${f.subjects}.`,
          "BERUFENET nêu những tố chất quan trọng sau:",
        ],
        points: f.traits,
        sources: [f.source],
      },
      {
        id: "dieu-kien",
        title: "Cần điều kiện gì?",
        paragraphs: [
          "Với đào tạo kép, doanh nghiệp tự đặt tiêu chí tuyển chọn, ví dụ về bằng phổ thông. Để xin thị thực học nghề, quy định thường là tiếng Đức B1. Trên thực tế, hầu hết nơi đào tạo yêu cầu B2.",
          ...(f.access ? ["Riêng nghề này còn cần:"] : []),
        ],
        ...(f.access ? { points: f.access } : {}),
        sources: [f.source, "makeItVisa"],
      },
      {
        id: "luong",
        title: "Lương đào tạo bao nhiêu?",
        paragraphs: [
          "Mức lương cụ thể do doanh nghiệp, vùng và thoả ước lao động quyết định. Luật Đức quy định một mức tối thiểu. Với khoá học bắt đầu trong năm 2027, mức tối thiểu mỗi tháng (trước khấu trừ) là 764 € năm thứ nhất, 902 € năm thứ hai và 1.031 € năm thứ ba.",
          "Thoả ước lao động có thể quy định thấp hơn mức này. Doanh nghiệp không theo thoả ước thì không được trả thấp hơn quá 20 % so với mức thoả ước của ngành.",
        ],
        sources: ["bibbMindestverguetung"],
      },
      {
        id: "visa",
        title: "Thị thực và chứng minh tài chính",
        paragraphs: [
          "Theo Make it in Germany, năm 2026 tài chính được xem là đủ nếu lương đào tạo đạt ít nhất 1.048 € gross (822 € net) mỗi tháng. Nếu thấp hơn, bạn bổ sung phần thiếu bằng tài khoản phong tỏa hoặc giấy cam kết bảo lãnh.",
          "Hồ sơ nộp qua Cổng thông tin lãnh sự (Auslandsportal), gồm hợp đồng đào tạo, chứng chỉ tiếng Đức, chứng minh tài chính và bảo hiểm y tế. Lệ phí 75 €; theo Đại sứ quán Đức tại Hà Nội, thời gian xét khoảng 3 tháng.",
          "Trong thời gian học, bạn được làm thêm tối đa 20 giờ mỗi tuần. Học xong, bạn có tối đa 18 tháng để tìm việc tại Đức.",
        ],
        sources: ["makeItVisa", "embassyAusbildung"],
      },
    ],
    faqTitle: "Câu hỏi thường gặp",
    faqs: [
      {
        id: `${slug}-bao-lau`,
        question: `Học nghề ${f.name.toLowerCase()} ở Đức mất bao lâu?`,
        answer:
          "3 năm, theo hình thức đào tạo kép: thực hành tại doanh nghiệp và học lý thuyết tại trường nghề.",
      },
      {
        id: `${slug}-luong`,
        question: `Lương học nghề ${f.name.toLowerCase()} bao nhiêu?`,
        answer:
          "Tùy doanh nghiệp. Với khoá bắt đầu năm 2027, mức tối thiểu theo luật là 764 € năm đầu, 902 € năm hai và 1.031 € năm ba, mỗi tháng trước khấu trừ. Thoả ước lao động có thể khác.",
      },
      {
        id: `${slug}-tieng-duc`,
        question: "Cần tiếng Đức trình độ nào?",
        answer:
          "Hãy đặt mục tiêu B2: trên thực tế, hầu hết nơi đào tạo yêu cầu trình độ này. Quy định cho thị thực học nghề thường là B1.",
      },
      {
        id: `${slug}-hop-voi-ai`,
        question: "Nghề này hợp với ai?",
        answer: `Với người thích ${f.interests}. BERUFENET nêu các tố chất như ${f.traits.slice(0, 3).join(", ").toLowerCase()}.`,
      },
    ],
    ctaTitle: "Bắt đầu từ tiếng Đức",
    ctaText:
      "Để học nghề tại Đức, bạn cần tiếng Đức B2. NaNu NaNa có lớp A1 đến C1, online và tại Hà Nội, TP. Hồ Chí Minh. Hãy để lại thông tin để được tư vấn lộ trình.",
    cta: `Tư vấn du học nghề ${f.name.toLowerCase()}`,
    message: `Tôi muốn tìm hiểu du học nghề ${f.name.toLowerCase()} (${title}) tại Đức.`,
    goal: "du-hoc-nghe",
    parents: [vi.overview, vi.list],
    related: [
      { label: "Tất cả ngành học nghề", href: berufeListHref },
      { label: "Du học nghề Đức: tổng quan", href: "/du-hoc-nghe" },
      { label: "Khoá tiếng Đức B2", href: "/niveau/b2" },
      { label: "Chi phí du học Đức", href: "/chi-phi-du-hoc-duc" },
    ],
    shareSubtitle: "Công việc · Nội dung học · Lương · Visa",
  };
}

function dualDe(slug: BerufSlug, f: DualFacts): GuideContent {
  const title = berufTitles[slug];
  return {
    eyebrow: `Ausbildung · ${f.name}`,
    title: `Ausbildung ${title}`,
    metaTitle: f.metaTitle,
    description: f.description,
    intro: `${f.lead} Diese Seite fasst Aufgaben, Ausbildungsinhalte und das passende Profil nach BERUFENET der Bundesagentur für Arbeit zusammen, dazu die Regeln zu Vergütung und Visum. Regeln und Beträge können sich ändern; prüfen Sie vor dem Antrag die offiziellen Seiten.`,
    quickTitle: "Kurz beantwortet",
    quick: [
      { label: "Dauer", value: "3 Jahre, dual in Betrieb und Berufsschule" },
      { label: "Schulgeld", value: "Keins, der Betrieb zahlt eine Ausbildungsvergütung" },
      {
        label: "Mindestvergütung",
        value: "764 € brutto im 1. Jahr, bei Ausbildungsbeginn 2027",
      },
      { label: "Deutsch", value: "B2, das verlangen fast alle Ausbildungsbetriebe" },
    ],
    sections: [
      ...(f.tasks
        ? [
            {
              id: "cong-viec",
              title: "Was macht man in dem Beruf?",
              paragraphs: ["Zu den typischen Aufgaben gehören:"],
              points: f.tasks,
              sources: [f.source],
            },
          ]
        : []),
      {
        id: "hoc-gi",
        title: "Was lernt man in den drei Jahren?",
        paragraphs: [
          "Gelernt wird vor allem im Ausbildungsbetrieb, im Wechsel mit Unterricht an der Berufsschule. Zu den Ausbildungsinhalten gehören:",
        ],
        points: f.learn,
        sources: [f.source],
      },
      {
        id: "ho-so",
        title: "Welches Profil passt?",
        paragraphs: [
          `Der Beruf passt zu Menschen mit ${f.interests}. Hilfreiche Schulfächer sind ${f.subjects}.`,
          "BERUFENET nennt diese Eigenschaften als wichtig:",
        ],
        points: f.traits,
        sources: [f.source],
      },
      {
        id: "dieu-kien",
        title: "Voraussetzungen",
        paragraphs: [
          "Bei einer dualen Ausbildung legen die Betriebe ihre Auswahlkriterien selbst fest, etwa zum Schulabschluss. Für das Ausbildungsvisum wird normalerweise Deutsch auf B1 verlangt; in der Praxis erwarten fast alle Ausbildungsbetriebe B2.",
          ...(f.access ? ["In diesem Beruf außerdem:"] : []),
        ],
        ...(f.access ? { points: f.access } : {}),
        sources: [f.source, "makeItVisa"],
      },
      {
        id: "luong",
        title: "Ausbildungsvergütung",
        paragraphs: [
          "Die genaue Höhe hängt von Betrieb, Region und Tarifvertrag ab. Das Gesetz legt eine Untergrenze fest: Für Ausbildungen, die 2027 beginnen, sind es monatlich brutto 764 € im ersten, 902 € im zweiten und 1.031 € im dritten Jahr.",
          "Tarifverträge dürfen davon nach unten abweichen. Betriebe ohne Tarifbindung dürfen die tarifliche Vergütung der Branche um höchstens 20 % unterschreiten.",
        ],
        sources: ["bibbMindestverguetung"],
      },
      {
        id: "visa",
        title: "Visum und Finanzierung",
        paragraphs: [
          "Laut Make it in Germany gilt der Lebensunterhalt 2026 als gesichert, wenn die Vergütung mindestens 1.048 € brutto (822 € netto) im Monat beträgt. Liegt sie darunter, ergänzen Sie den Rest mit einem Sperrkonto oder einer Verpflichtungserklärung.",
          "Der Antrag läuft über das Auslandsportal, mit Ausbildungsvertrag, Deutschzertifikat, Finanzierungsnachweis und Krankenversicherung. Die Gebühr beträgt 75 €; laut Deutscher Botschaft Hanoi dauert die Bearbeitung etwa drei Monate.",
          "Während der Ausbildung dürfen Sie bis zu 20 Stunden pro Woche nebenbei arbeiten. Nach dem Abschluss haben Sie bis zu 18 Monate Zeit für die Jobsuche in Deutschland.",
        ],
        sources: ["makeItVisa", "embassyAusbildung"],
      },
    ],
    faqTitle: "Häufige Fragen",
    faqs: [
      {
        id: `${slug}-bao-lau`,
        question: "Wie lange dauert die Ausbildung?",
        answer: "Drei Jahre, dual: praktisch im Betrieb und theoretisch an der Berufsschule.",
      },
      {
        id: `${slug}-luong`,
        question: "Wie hoch ist die Ausbildungsvergütung?",
        answer:
          "Das hängt vom Betrieb ab. Bei Ausbildungsbeginn 2027 liegt die gesetzliche Mindestvergütung bei 764 €, 902 € und 1.031 € brutto im Monat im ersten bis dritten Jahr. Tarifverträge können abweichen.",
      },
      {
        id: `${slug}-tieng-duc`,
        question: "Welches Deutschniveau brauche ich?",
        answer:
          "Planen Sie mit B2: In der Praxis verlangen fast alle Ausbildungsbetriebe dieses Niveau. Für das Ausbildungsvisum wird normalerweise B1 verlangt.",
      },
      {
        id: `${slug}-hop-voi-ai`,
        question: "Für wen eignet sich der Beruf?",
        answer: `Für Menschen mit ${f.interests}. BERUFENET nennt unter anderem: ${f.traits.slice(0, 3).join(", ")}.`,
      },
    ],
    ctaTitle: "Der erste Schritt ist Deutsch",
    ctaText:
      "Für eine Ausbildung in Deutschland brauchen Sie Deutsch auf B2. NaNu NaNa bietet Kurse von A1 bis C1, online und in Hanoi und Ho-Chi-Minh-Stadt. Hinterlassen Sie Ihre Daten für eine Beratung.",
    cta: "Zur Ausbildung beraten lassen",
    message: `Ich interessiere mich für eine Ausbildung als ${title} in Deutschland.`,
    goal: "du-hoc-nghe",
    parents: [de.overview, de.list],
    related: [
      { label: "Alle Ausbildungsberufe", href: berufeListHref },
      { label: "Ausbildung in Deutschland: Überblick", href: "/du-hoc-nghe" },
      { label: "Deutschkurs B2", href: "/niveau/b2" },
      { label: "Kosten für Deutschland", href: "/chi-phi-du-hoc-duc" },
    ],
    shareSubtitle: "Aufgaben · Inhalte · Vergütung · Visum",
  };
}

type DualSlug = Exclude<BerufSlug, "dieu-duong">;

const dualFacts: Record<DualSlug, Record<Locale, DualFacts>> = {
  "nha-hang": {
    vi: {
      name: "Nhà hàng",
      group: "Khách sạn – nhà hàng",
      short: "Đón khách, tư vấn món, phục vụ, quầy bar và tổ chức tiệc, sự kiện.",
      metaTitle: "Du học nghề nhà hàng Đức: học gì, lương",
      description:
        "Ausbildung nhà hàng và tổ chức sự kiện tại Đức: học 3 năm, có lương đào tạo, công việc, nội dung học và tố chất cần có. Theo BERUFENET và nguồn chính thức.",
      lead: "Người học nghề nhà hàng đón khách, tư vấn món ăn đồ uống, phục vụ tại bàn và tổ chức các buổi tiệc, sự kiện.",
      tasks: [
        "Trang trí bàn, đón khách và giới thiệu thực đơn",
        "Tư vấn món ăn, đồ uống, nhận gọi món và phục vụ",
        "Thanh toán và làm việc tại quầy bar",
        "Lên kế hoạch và tổ chức sự kiện như tiệc cưới, tiệc chiêu đãi",
      ],
      learn: [
        "Vai trò người chủ nhà: tiếp đón và chăm sóc khách",
        "Nhận hàng, kiểm tra và bảo quản hàng hoá",
        "Sử dụng máy móc, thiết bị trong nhà hàng",
        "Chế biến các món ăn đơn giản",
        "Chuẩn bị phòng và bàn tiệc, nhận đặt chỗ",
        "Tổ chức quy trình phục vụ và phục vụ tại bàn",
        "Tư vấn và bán hàng cho khách",
      ],
      interests: "tiếp xúc, tư vấn cho người khác, tổ chức công việc và bán hàng",
      subjects: "Toán, tiếng Đức và tiếng Anh",
      traits: [
        "Chăm chỉ, sẵn sàng nỗ lực",
        "Cẩn thận",
        "Tự lập trong công việc",
        "Linh hoạt",
        "Chịu được áp lực",
        "Giao tiếp tốt, cởi mở",
        "Làm việc nhóm",
        "Bình tĩnh, biết kiềm chế",
        "Hiểu và tôn trọng các nền văn hoá khác",
        "Thân thiện, đặt khách hàng lên hàng đầu",
      ],
      access: [
        "Giấy xác nhận đã dự buổi hướng dẫn của cơ quan y tế (Gesundheitsamt) theo Luật phòng chống bệnh truyền nhiễm (Infektionsschutzgesetz)",
      ],
      source: "berufenetRestaurant",
    },
    de: {
      name: "Restaurant",
      group: "Hotellerie und Gastronomie",
      short: "Gäste empfangen, beraten, servieren, Bar und Veranstaltungen organisieren.",
      metaTitle: "Ausbildung Restaurant: Inhalte und Vergütung",
      description:
        "Ausbildung zum Fachmann oder zur Fachfrau für Restaurants und Veranstaltungsgastronomie: drei Jahre, vergütet, Aufgaben, Inhalte und Profil. Für Bewerber aus Vietnam, nach BERUFENET.",
      lead: "Fachleute für Restaurants und Veranstaltungsgastronomie empfangen und beraten Gäste, servieren am Tisch und organisieren Feiern und Veranstaltungen.",
      tasks: [
        "Tische eindecken und dekorieren, Gäste empfangen",
        "Speisen und Getränke empfehlen, Bestellungen aufnehmen, servieren",
        "Abrechnen und an der Bar arbeiten",
        "Veranstaltungen wie Hochzeiten und Bankette planen und betreuen",
      ],
      learn: [
        "Die Rolle als Gastgeber",
        "Waren annehmen, prüfen und lagern",
        "Geräte und Maschinen bedienen",
        "Einfache Speisen zubereiten",
        "Räume herrichten und Reservierungen bearbeiten",
        "Serviceabläufe organisieren und am Tisch servieren",
        "Beratungs- und Verkaufsgespräche führen",
      ],
      interests:
        "Interesse an sozial-beratenden, verwaltend-organisatorischen, kaufmännischen und praktischen Tätigkeiten",
      subjects: "Mathematik, Deutsch und Englisch",
      traits: [
        "Leistungsbereitschaft",
        "Sorgfalt",
        "Selbstständigkeit",
        "Flexibilität",
        "Psychische Belastbarkeit",
        "Kommunikations- und Kontaktfähigkeit",
        "Teamfähigkeit",
        "Selbstkontrolle",
        "Interkulturelle Kompetenz",
        "Freundliches Wesen, Kunden- und Serviceorientierung",
      ],
      access: ["Eine Belehrung durch das Gesundheitsamt nach dem Infektionsschutzgesetz"],
      source: "berufenetRestaurant",
    },
  },
  "khach-san": {
    vi: {
      name: "Khách sạn",
      group: "Khách sạn – nhà hàng",
      short: "Lễ tân, buồng phòng, nhà hàng, sự kiện và các việc văn phòng của khách sạn.",
      metaTitle: "Du học nghề khách sạn Đức: học gì, lương",
      description:
        "Ausbildung nghiệp vụ khách sạn (Hotelfachmann/Hotelfachfrau) tại Đức: học 3 năm, có lương đào tạo, công việc, nội dung học và tố chất cần có. Theo BERUFENET.",
      lead: "Người học nghề khách sạn làm việc ở nhiều bộ phận: lễ tân, buồng phòng, nhà hàng, bếp, sự kiện và văn phòng.",
      tasks: [
        "Nhận đặt phòng, đón khách và làm thủ tục",
        "Chuẩn bị và kiểm tra phòng, phối hợp với bộ phận buồng phòng",
        "Phục vụ trong nhà hàng, hỗ trợ bếp và tổ chức sự kiện",
        "Lập hoá đơn, lên lịch làm việc cho nhân viên, quản lý kho",
        "Tham gia các hoạt động tiếp thị của khách sạn",
      ],
      learn: [
        "Vai trò người chủ nhà và chăm sóc khách",
        "Sử dụng thiết bị, chế biến món ăn đơn giản và phục vụ",
        "Nhận hàng, quản lý kho",
        "Xử lý khiếu nại của khách",
        "Lễ tân, đặt phòng, gọi hàng và thanh toán",
        "Tư vấn và bán dịch vụ",
        "Quản lý kênh bán phòng và doanh thu (Channel- và Revenue-Management), tiếp thị",
        "Lập kế hoạch nhân sự",
      ],
      interests: "tiếp xúc với khách, tổ chức công việc và kinh doanh",
      subjects: "Toán, tiếng Đức, tiếng Anh và Kinh tế gia đình",
      traits: [
        "Chăm chỉ, sẵn sàng nỗ lực",
        "Cẩn thận",
        "Tự lập trong công việc",
        "Linh hoạt",
        "Chịu được áp lực",
        "Cởi mở, dễ tiếp xúc",
        "Làm việc nhóm",
        "Bình tĩnh, biết kiềm chế",
      ],
      source: "berufenetHotel",
    },
    de: {
      name: "Hotel",
      group: "Hotellerie und Gastronomie",
      short: "Empfang, Etage, Restaurant, Veranstaltungen und Büroarbeit im Hotel.",
      metaTitle: "Ausbildung Hotelfachmann/-frau: Inhalte, Gehalt",
      description:
        "Ausbildung zum Hotelfachmann oder zur Hotelfachfrau: drei Jahre, vergütet, Aufgaben, Inhalte und Profil. Für Bewerber aus Vietnam, nach BERUFENET und offiziellen Quellen.",
      lead: "Hotelfachleute arbeiten in vielen Bereichen eines Hotels: Empfang, Etage, Restaurant, Küche, Veranstaltungen und Verwaltung.",
      tasks: [
        "Reservierungen bearbeiten, Gäste empfangen und einchecken",
        "Zimmer vorbereiten und kontrollieren, mit dem Housekeeping zusammenarbeiten",
        "Im Restaurant servieren, in der Küche helfen, Veranstaltungen betreuen",
        "Rechnungen erstellen, Dienstpläne schreiben, das Lager verwalten",
        "Bei Marketingaktionen mitarbeiten",
      ],
      learn: [
        "Die Rolle als Gastgeber",
        "Geräte bedienen, einfache Speisen zubereiten und servieren",
        "Warenlieferungen annehmen und das Lager führen",
        "Reklamationen bearbeiten",
        "Empfang, Reservierung, Bestellungen und Zahlungsverkehr",
        "Beratung und Verkauf",
        "Channel- und Revenue-Management, Marketing",
        "Personaleinsatzplanung",
      ],
      interests:
        "Interesse an sozial-beratenden, verwaltend-organisatorischen und kaufmännischen Tätigkeiten",
      subjects: "Mathematik, Deutsch, Englisch und Hauswirtschaft",
      traits: [
        "Leistungsbereitschaft",
        "Sorgfalt",
        "Selbstständigkeit",
        "Flexibilität",
        "Psychische Belastbarkeit",
        "Kontaktbereitschaft",
        "Teamfähigkeit",
        "Selbstkontrolle",
      ],
      source: "berufenetHotel",
    },
  },
  "lam-banh": {
    vi: {
      name: "Làm bánh",
      group: "Chế biến thực phẩm",
      short: "Làm bánh mì, bánh ngọt và đồ ăn nhẹ theo công thức truyền thống của Đức.",
      metaTitle: "Du học nghề làm bánh Đức (Bäcker): học gì",
      description:
        "Ausbildung thợ làm bánh (Bäcker/Bäckerin) tại Đức: học 3 năm, có lương đào tạo, nội dung học và tố chất cần có. Theo BERUFENET và nguồn chính thức.",
      lead: "Thợ làm bánh ở Đức làm bánh mì, bánh mì nhỏ, bánh ngọt và đồ ăn nhẹ.",
      learn: [
        "Làm bánh mì trắng và bánh mì nhỏ (Brötchen) từ bột mì",
        "Làm các loại bột: bột ngàn lớp, bột bánh quy, bột men, bột Plunder",
        "Làm hỗn hợp bánh bông lan, phết mứt, tráng men, làm kem",
        "Ủ bột trước, làm bột chua và bánh mì lúa mạch đen, bánh mì nguyên cám",
        "Làm bánh quy trà, bánh Stollen và các loại bánh theo mùa",
        "Làm đồ ăn nhẹ, món ăn nhỏ, bánh cho tiệc và món tráng miệng",
        "Bảo quản nguyên liệu và sản phẩm đúng cách",
      ],
      interests: "làm việc bằng tay với sản phẩm cụ thể và bán hàng",
      subjects: "Toán, tiếng Đức và Hoá học",
      traits: ["Chăm chỉ, sẵn sàng nỗ lực", "Cẩn thận", "Có trách nhiệm", "Tự lập trong công việc"],
      source: "berufenetBaecker",
    },
    de: {
      name: "Bäcker",
      group: "Lebensmittelhandwerk",
      short: "Brot, Brötchen, Feingebäck und Snacks herstellen.",
      metaTitle: "Ausbildung Bäcker/in: Inhalte und Vergütung",
      description:
        "Ausbildung zum Bäcker oder zur Bäckerin: drei Jahre, vergütet, Ausbildungsinhalte und Profil. Für Bewerber aus Vietnam, nach BERUFENET und offiziellen Quellen.",
      lead: "Bäcker und Bäckerinnen stellen Brot, Brötchen, Feingebäck und Snacks her.",
      learn: [
        "Weizenbrote und Brötchen herstellen",
        "Blätter-, Mürbe-, Hefe- und Plunderteige herstellen",
        "Massen herstellen, aprikotieren, glasieren, Cremes zubereiten",
        "Vor- und Sauerteige, Roggen- und Vollkornbrote herstellen",
        "Teegebäck, Stollen und Saisongebäck herstellen",
        "Snacks, kleine Gerichte, Partygebäck und Süßspeisen zubereiten",
        "Rohstoffe und Erzeugnisse richtig lagern",
      ],
      interests: "Interesse an praktisch-konkreten und kaufmännischen Tätigkeiten",
      subjects: "Mathematik, Deutsch und Chemie",
      traits: [
        "Leistungsbereitschaft",
        "Sorgfalt",
        "Verantwortungsbewusstsein",
        "Selbstständigkeit",
      ],
      source: "berufenetBaecker",
    },
  },
  "ban-hang-tiem-banh": {
    vi: {
      name: "Bán hàng tiệm bánh",
      group: "Chế biến thực phẩm",
      short: "Tư vấn và bán bánh, trình bày quầy hàng, nhận đơn đặt hàng và tính tiền.",
      metaTitle: "Du học nghề bán hàng tiệm bánh Đức: học gì",
      description:
        "Ausbildung bán hàng tiệm bánh (Fachverkäufer/in im Lebensmittelhandwerk, Bäckerei) tại Đức: học 3 năm, có lương, nội dung học và tố chất cần có. Theo BERUFENET.",
      lead: "Người bán hàng tiệm bánh tư vấn cho khách, bày bán bánh mì và bánh ngọt, nhận đơn đặt hàng và làm việc tại quầy thu ngân.",
      learn: [
        "Tiếp xúc và tư vấn cho khách hàng",
        "Làm việc tại quầy thu ngân và tính giá bán",
        "Trang trí, bày bánh lên quầy",
        "Cắt, đóng gói sản phẩm",
        "Nhận và xử lý đơn đặt hàng",
        "Chuẩn bị các chương trình khuyến mãi",
        "Chia phần bánh kem, bánh ngọt và bày đĩa tiệc",
        "Hiểu quá trình lên men bột và làm món tráng miệng",
      ],
      interests: "bán hàng, tổ chức công việc và tư vấn cho người khác",
      subjects: "Toán và tiếng Đức",
      traits: [
        "Chăm chỉ, sẵn sàng nỗ lực",
        "Cẩn thận",
        "Tự lập trong công việc",
        "Cởi mở, dễ tiếp xúc",
        "Thân thiện, đặt khách hàng lên hàng đầu",
      ],
      source: "berufenetVerkaufBaeckerei",
    },
    de: {
      name: "Verkauf Bäckerei",
      group: "Lebensmittelhandwerk",
      short: "Kunden beraten, die Theke gestalten, Bestellungen annehmen und kassieren.",
      metaTitle: "Fachverkäufer/in Bäckerei: Ausbildung, Gehalt",
      description:
        "Ausbildung zum Fachverkäufer oder zur Fachverkäuferin im Lebensmittelhandwerk, Schwerpunkt Bäckerei: drei Jahre, vergütet, Inhalte und Profil. Nach BERUFENET.",
      lead: "Fachverkäuferinnen und Fachverkäufer in der Bäckerei beraten Kunden, präsentieren Backwaren, nehmen Bestellungen an und arbeiten an der Kasse.",
      learn: [
        "Kundenkontakt und Beratung",
        "Kassieren und Preise kalkulieren",
        "Waren garnieren und in der Theke auslegen",
        "Aufschneiden und verpacken",
        "Aufträge annehmen und bearbeiten",
        "Werbeaktionen vorbereiten",
        "Kuchen und Torten einteilen, Platten anrichten",
        "Gärvorgänge verstehen, Süßspeisen zubereiten",
      ],
      interests:
        "Interesse an kaufmännischen, verwaltend-organisatorischen und sozial-beratenden Tätigkeiten",
      subjects: "Mathematik und Deutsch",
      traits: [
        "Leistungsbereitschaft",
        "Sorgfalt",
        "Selbstständigkeit",
        "Kontaktbereitschaft",
        "Freundliches Wesen, Kunden- und Serviceorientierung",
      ],
      source: "berufenetVerkaufBaeckerei",
    },
  },
  "ban-hang-tiem-thit": {
    vi: {
      name: "Bán hàng cửa hàng thịt",
      group: "Chế biến thực phẩm",
      short: "Tư vấn khách, cắt và bày thịt, làm đĩa nguội, salad và tính tiền.",
      metaTitle: "Du học nghề bán hàng cửa hàng thịt Đức",
      description:
        "Ausbildung bán hàng cửa hàng thịt (Fachverkäufer/in im Lebensmittelhandwerk, Fleischerei) tại Đức: học 3 năm, có lương, nội dung học, tố chất. Theo BERUFENET.",
      lead: "Người bán hàng cửa hàng thịt tư vấn cho khách, cắt và bày thịt, xúc xích, làm đĩa đồ nguội và salad, nhận đơn và tính tiền.",
      learn: [
        "Tiếp xúc và tư vấn cho khách hàng",
        "Làm việc tại quầy thu ngân và tính giá bán",
        "Trang trí, bày sản phẩm lên quầy",
        "Cắt thịt thành Schnitzel, Roulade, Steak; thái và đóng gói",
        "Làm đĩa đồ nguội và đĩa tiệc buffet",
        "Làm các món salad trộn",
        "Nhận và xử lý đơn đặt hàng, chuẩn bị khuyến mãi",
      ],
      interests: "bán hàng, tổ chức công việc và tư vấn cho người khác",
      subjects: "Toán và tiếng Đức",
      traits: [
        "Chăm chỉ, sẵn sàng nỗ lực",
        "Cẩn thận",
        "Tự lập trong công việc",
        "Cởi mở, dễ tiếp xúc",
        "Thân thiện, đặt khách hàng lên hàng đầu",
      ],
      source: "berufenetVerkaufFleischerei",
    },
    de: {
      name: "Verkauf Fleischerei",
      group: "Lebensmittelhandwerk",
      short: "Kunden beraten, Fleisch zuschneiden, Platten und Salate anrichten, kassieren.",
      metaTitle: "Fachverkäufer/in Fleischerei: Ausbildung, Gehalt",
      description:
        "Ausbildung zum Fachverkäufer oder zur Fachverkäuferin im Lebensmittelhandwerk, Schwerpunkt Fleischerei: drei Jahre, vergütet, Inhalte und Profil. Nach BERUFENET.",
      lead: "Fachverkäuferinnen und Fachverkäufer in der Fleischerei beraten Kunden, schneiden Fleisch zu, richten Platten und Salate an und arbeiten an der Kasse.",
      learn: [
        "Kundenkontakt und Beratung",
        "Kassieren und Preise kalkulieren",
        "Waren garnieren und in der Theke auslegen",
        "Schnitzel, Rouladen und Steaks zuschneiden, aufschneiden und verpacken",
        "Aufschnitt- und Buffetplatten anrichten",
        "Feinkostsalate herstellen",
        "Aufträge bearbeiten und Werbeaktionen vorbereiten",
      ],
      interests:
        "Interesse an kaufmännischen, verwaltend-organisatorischen und sozial-beratenden Tätigkeiten",
      subjects: "Mathematik und Deutsch",
      traits: [
        "Leistungsbereitschaft",
        "Sorgfalt",
        "Selbstständigkeit",
        "Kontaktbereitschaft",
        "Freundliches Wesen, Kunden- und Serviceorientierung",
      ],
      source: "berufenetVerkaufFleischerei",
    },
  },
  "che-bien-thit": {
    vi: {
      name: "Chế biến thịt",
      group: "Chế biến thực phẩm",
      short: "Pha lóc thịt, làm xúc xích, thịt muối, thịt hun khói và bán hàng.",
      metaTitle: "Du học nghề chế biến thịt Đức (Fleischer)",
      description:
        "Ausbildung chế biến thịt (Fleischer/Fleischerin) tại Đức: học 3 năm, có lương đào tạo, nội dung học và tố chất cần có. Theo BERUFENET và nguồn chính thức.",
      lead: "Người làm nghề chế biến thịt đánh giá và pha lóc thịt, làm xúc xích, thịt muối, thịt hun khói và tư vấn cho khách.",
      learn: [
        "Đánh giá và pha lóc thịt heo, bò, cừu",
        "Chia phần và ướp thịt",
        "Làm các loại xúc xích luộc, xúc xích hấp và xúc xích sống",
        "Xay, trộn (Kuttern) và sấy khô",
        "Làm thịt muối và thịt hun khói, thịt xay",
        "Bảo quản, đóng gói và sử dụng máy móc",
        "Vệ sinh và kiểm tra chất lượng",
        "Tư vấn bán hàng và tính nhu cầu nhân sự",
      ],
      interests: "làm việc bằng tay với sản phẩm cụ thể, tổ chức và kiểm tra",
      subjects: "Toán, Sinh học và tiếng Đức",
      traits: ["Chăm chỉ, sẵn sàng nỗ lực", "Cẩn thận", "Có trách nhiệm", "Tự lập trong công việc"],
      access: ["Giấy chứng nhận chuyên môn (Sachkundenachweis) nếu làm công việc giết mổ"],
      source: "berufenetFleischer",
    },
    de: {
      name: "Fleischer",
      group: "Lebensmittelhandwerk",
      short: "Fleisch zerlegen, Wurst, Pökel- und Räucherwaren herstellen, verkaufen.",
      metaTitle: "Ausbildung Fleischer/in: Inhalte und Vergütung",
      description:
        "Ausbildung zum Fleischer oder zur Fleischerin: drei Jahre, vergütet, Ausbildungsinhalte und Profil. Für Bewerber aus Vietnam, nach BERUFENET und offiziellen Quellen.",
      lead: "Fleischer und Fleischerinnen beurteilen und zerlegen Fleisch, stellen Wurst, Pökel- und Räucherwaren her und beraten Kunden.",
      learn: [
        "Schweine-, Rind- und Lammfleisch beurteilen und zerlegen",
        "Fleisch portionieren und marinieren",
        "Koch-, Brüh- und Rohwurst herstellen",
        "Kuttern und Trocknen",
        "Pökel- und Räucherwaren sowie Hackfleisch herstellen",
        "Lagern, verpacken und Maschinen bedienen",
        "Hygiene und Qualitätskontrolle",
        "Verkaufsgespräche führen und den Personalbedarf planen",
      ],
      interests: "Interesse an praktisch-konkreten und organisatorisch-prüfenden Tätigkeiten",
      subjects: "Mathematik, Biologie und Deutsch",
      traits: [
        "Leistungsbereitschaft",
        "Sorgfalt",
        "Verantwortungsbewusstsein",
        "Selbstständigkeit",
      ],
      access: ["Ein Sachkundenachweis, wenn Sie Tiere schlachten"],
      source: "berufenetFleischer",
    },
  },
};

const pflegeSummary: Record<Locale, BerufSummary> = {
  vi: {
    name: "Điều dưỡng",
    group: "Điều dưỡng",
    short: "Chăm sóc người bệnh và người cao tuổi tại bệnh viện, viện dưỡng lão hoặc tại nhà.",
  },
  de: {
    name: "Pflege",
    group: "Pflege",
    short: "Kranke und ältere Menschen im Krankenhaus, Heim oder ambulant pflegen.",
  },
};

export function berufSummary(locale: Locale, slug: BerufSlug): BerufSummary {
  if (slug === "dieu-duong") return pflegeSummary[locale];
  const { name, short, group } = dualFacts[slug][locale];
  return { name, short, group };
}

export function berufContent(locale: Locale, slug: BerufSlug): GuideContent {
  if (slug === "dieu-duong") return pflegeContent[locale];
  const facts = dualFacts[slug][locale];
  return locale === "vi" ? dualVi(slug, facts) : dualDe(slug, facts);
}

export const berufeList = {
  vi: {
    eyebrow: "Du học nghề · Các ngành",
    title: "Các ngành du học nghề tại Đức",
    metaTitle: "Các ngành du học nghề Đức: học gì, hợp với ai",
    description:
      "Danh sách ngành du học nghề tại Đức: điều dưỡng, nhà hàng, khách sạn, làm bánh, bán hàng tiệm bánh, cửa hàng thịt và chế biến thịt. Học gì, hợp với ai, lương bao nhiêu.",
    intro:
      "Mỗi ngành dưới đây có trang riêng: công việc, nội dung học, tố chất cần có, lương đào tạo và thị thực, theo nguồn chính thức của Đức. Tất cả đều là khoá đào tạo 3 năm có lương, không mất học phí.",
    official: "Tên nghề chính thức",
    duration: "3 năm",
    more: "Xem chi tiết",
    sourcesNote:
      "Nguồn: BERUFENET của Cơ quan Lao động Liên bang Đức, Luật nghề điều dưỡng (PflBG), BIBB. Kiểm tra ngày",
    shareSubtitle: "Điều dưỡng · Nhà hàng · Khách sạn · Làm bánh · Thịt",
    parents: [vi.overview],
  },
  de: {
    eyebrow: "Ausbildung · Berufe",
    title: "Ausbildungsberufe in Deutschland für Bewerber aus Vietnam",
    metaTitle: "Ausbildungsberufe in Deutschland im Überblick",
    description:
      "Ausbildungsberufe im Überblick: Pflege, Restaurant, Hotel, Bäcker, Verkauf in Bäckerei und Fleischerei, Fleischer. Was man lernt, welches Profil passt, Vergütung.",
    intro:
      "Jeder Beruf hat eine eigene Seite mit Aufgaben, Ausbildungsinhalten, passendem Profil, Vergütung und Visum, nach offiziellen deutschen Quellen. Alle Ausbildungen dauern drei Jahre, sind vergütet und kosten kein Schulgeld.",
    official: "Offizielle Berufsbezeichnung",
    duration: "3 Jahre",
    more: "Mehr erfahren",
    sourcesNote:
      "Quellen: BERUFENET der Bundesagentur für Arbeit, Pflegeberufegesetz (PflBG), BIBB. Geprüft am",
    shareSubtitle: "Pflege · Restaurant · Hotel · Bäcker · Fleischer",
    parents: [de.overview],
  },
} satisfies Record<Locale, Record<string, unknown>>;

/** Link to the job pages from the pathway overview. */
export const berufeLinkLabel: Record<Locale, string> = {
  vi: "Xem tất cả ngành học nghề",
  de: "Alle Ausbildungsberufe ansehen",
};

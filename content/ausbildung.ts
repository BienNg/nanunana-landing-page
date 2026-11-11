import type { Locale } from "@/lib/i18n/locale";

export const ausbildungReviewed = "2026-11-11";
export const ausbildungSources = {
  overview: {
    title: "Make it in Germany · Ausbildung",
    href: "https://www.make-it-in-germany.com/en/study-vocational-training/training-in-germany",
  },
  models: {
    title: "Make it in Germany · Training models",
    href: "https://www.make-it-in-germany.com/en/study-vocational-training/training-in-germany/what-is-it",
  },
  duration: {
    title: "Bundesagentur für Arbeit · Vocational training",
    href: "https://www.arbeitsagentur.de/en/working-in-germany/vocational-training",
  },
  requirements: {
    title: "Make it in Germany · Requirements",
    href: "https://www.make-it-in-germany.com/en/study-vocational-training/training-in-germany/requirements",
  },
  visa: {
    title: "Make it in Germany · Training visa",
    href: "https://www.make-it-in-germany.com/en/visa-residence/types/training",
  },
  application: {
    title: "Make it in Germany · Finding a training place",
    href: "https://www.make-it-in-germany.com/en/study-vocational-training/training-in-germany/find",
  },
  professions: {
    title: "Make it in Germany · Professions",
    href: "https://www.make-it-in-germany.com/en/study-vocational-training/training-in-germany/in-demand",
  },
  nursing: {
    title: "Make it in Germany · Nursing",
    href: "https://www.make-it-in-germany.com/en/study-vocational-training/training-in-germany/in-demand/nursing",
  },
  hospitality: {
    title: "Make it in Germany · Hotel & gastronomy",
    href: "https://www.make-it-in-germany.com/en/study-vocational-training/training-in-germany/in-demand/hotel-gastronomy",
  },
  vietnam: {
    title: "Đại sứ quán Đức tại Việt Nam · Thị thực du học nghề",
    href: "https://vietnam.diplo.de/vn-vi/dichvulanhsu/05-visaeinreise/2306816-2306816",
  },
} as const;
export type AusbildungSource = keyof typeof ausbildungSources;
type Block = {
  id: string;
  title: string;
  paragraphs: string[];
  points?: string[];
  sources: AusbildungSource[];
};
type Guide = {
  title: string;
  reviewed: string;
  contents: string;
  sourceLabel: string;
  sourcesTitle: string;
  intro: string;
  comparisonTitle: string;
  comparisonHeaders: string[];
  comparisonRows: string[][];
  sections: Block[];
  faqTitle: string;
  faqs: { id: string; question: string; answer: string; source: AusbildungSource }[];
  relatedTitle: string;
  coursesLabel: string;
  universityLabel: string;
  cta: string;
  shareHeadline: string;
  shareSubtitle: string;
};
export const ausbildungGuide: Record<Locale, Guide> = {
  vi: {
    title: "Du học nghề Đức: hiểu rõ trước khi chọn",
    reviewed: "Kiểm tra nguồn ngày",
    contents: "Trong hướng dẫn này",
    sourceLabel: "Nguồn",
    sourcesTitle: "Đọc thông tin chính thức",
    intro:
      "Ausbildung là con đường học một nghề tại Đức. Trước khi chọn chương trình, hãy xem cách đào tạo, yêu cầu tiếng Đức và ngân sách thực tế của bạn.",
    comparisonTitle: "Học tại doanh nghiệp hay tại trường nghề?",
    comparisonHeaders: ["Tiêu chí", "Đào tạo kép (dual)", "Đào tạo tại trường"],
    comparisonRows: [
      ["Nơi học", "Doanh nghiệp kết hợp trường nghề", "Chủ yếu tại trường, kèm các đợt thực hành"],
      [
        "Thu nhập",
        "Có lương đào tạo hằng tháng",
        "Thường không có lương; một số ngành y tế có ngoại lệ",
      ],
      [
        "Học phí",
        "Thông thường không đóng học phí cho chương trình kép",
        "Trường công thường miễn học phí; trường tư có thể thu phí",
      ],
    ],
    sections: [
      {
        id: "thoi-gian",
        title: "Du học nghề Đức mất bao lâu?",
        paragraphs: [
          "Đào tạo nghề kép thường kéo dài 2–3,5 năm, tùy nghề, và kết thúc bằng kỳ thi. Đây là thời gian đào tạo tại Đức; bạn cần tính riêng giai đoạn học tiếng, ứng tuyển và chuẩn bị hồ sơ tại Việt Nam.",
        ],
        sources: ["duration"],
      },
      {
        id: "dieu-kien",
        title: "Điều kiện và trình độ tiếng Đức",
        paragraphs: [
          "Với đào tạo kép, doanh nghiệp quyết định tiêu chí tuyển chọn; không có một loại bằng phổ thông bắt buộc chung cho mọi nghề. Đào tạo tại trường thường yêu cầu công nhận bằng phổ thông. Hãy kiểm tra từng thông báo tuyển sinh.",
          "B1 thường là mức tiếng Đức cần cho thị thực đào tạo nghề, nhưng đơn vị đào tạo có thể đòi hỏi cao hơn. Nên chuẩn bị cả nghe giảng, giao tiếp công việc và từ vựng chuyên ngành.",
        ],
        sources: ["requirements"],
      },
      {
        id: "nganh-nghe",
        title: "Du học nghề Đức có những ngành nào?",
        paragraphs: [
          "Bạn có thể tìm hiểu điều dưỡng, khách sạn–nhà hàng, vận tải–logistics, điện–cơ khí, xây dựng, bán lẻ và chế biến thực phẩm. Chọn theo công việc hằng ngày và khả năng của mình, rồi kiểm tra vị trí đang tuyển.",
        ],
        sources: ["professions"],
      },
      {
        id: "khach-san",
        title: "Ngành khách sạn và nhà hàng",
        paragraphs: [
          "Các hướng gồm nghiệp vụ khách sạn, phục vụ nhà hàng–sự kiện và đầu bếp. Thời gian thường là 2–3 năm tùy nghề. Công việc cần giao tiếp, phối hợp và sẵn sàng làm buổi tối hoặc cuối tuần.",
          "Lương ghi trong hợp đồng thường là gross (trước khấu trừ). Khi lập ngân sách, hãy xem số tiền net thực nhận và các khoản nhà ở, ăn uống do mình chi trả.",
        ],
        sources: ["hospitality"],
      },
      {
        id: "dieu-duong",
        title: "Ausbildung điều dưỡng có gì khác?",
        paragraphs: [
          "Đào tạo điều dưỡng chuyên nghiệp toàn thời gian kéo dài ba năm, kết hợp trường điều dưỡng với thực hành tại các cơ sở chăm sóc. Yêu cầu tiếng Đức có thể là B1 hoặc B2 tùy bang; còn có yêu cầu về bằng phổ thông, sức khỏe và lý lịch.",
          "Đừng nhầm chương trình điều dưỡng chuyên nghiệp với đào tạo trợ lý điều dưỡng: thời gian, yêu cầu và bằng cấp khác nhau.",
        ],
        sources: ["nursing"],
      },
      {
        id: "chi-phi",
        title: "Chi phí, lương và chứng minh tài chính",
        paragraphs: [
          "Có lương đào tạo không đồng nghĩa chắc chắn đủ điều kiện tài chính cho thị thực. Nếu lương chưa đủ, bạn có thể cần bổ sung phần thiếu bằng tài khoản phong tỏa hoặc giấy cam kết bảo lãnh. Mức yêu cầu có thể thay đổi; xem nguồn chính thức trước khi nộp.",
          "Khi tự lập ngân sách, tách riêng các khoản dưới đây. Học phí chương trình tại Đức và phí dịch vụ tư vấn là hai khoản khác nhau.",
        ],
        points: [
          "Học tiếng và thi chứng chỉ tại Việt Nam",
          "Dịch thuật, công nhận bằng nếu cần, thị thực và bảo hiểm",
          "Vé máy bay, tiền đặt cọc nhà và chi phí sinh hoạt ban đầu",
          "Khoản thiếu hụt giữa thu nhập net và ngân sách sinh hoạt",
          "Phí dịch vụ, phạm vi hỗ trợ và điều kiện hoàn phí trong hợp đồng",
        ],
        sources: ["visa", "vietnam"],
      },
      {
        id: "ho-so",
        title: "Ứng tuyển và chuẩn bị hồ sơ",
        paragraphs: [
          "Nhiều doanh nghiệp tuyển trước ngày bắt đầu 12–18 tháng. Hãy chuẩn bị CV, thư động lực và giấy tờ theo từng tin tuyển dụng, đồng thời luyện phỏng vấn. Lịch bắt đầu và hạn nộp phải kiểm tra với nơi đào tạo.",
          "Sau khi có chỗ học, đối chiếu danh mục thị thực hiện hành của cơ quan đại diện Đức tại Việt Nam: hộ chiếu, hồ sơ học tập, chứng chỉ tiếng, giấy tờ đào tạo, tài chính và bảo hiểm. Danh mục có thể khác theo trường hợp.",
        ],
        sources: ["application", "vietnam"],
      },
    ],
    faqTitle: "Câu hỏi về du học nghề Đức",
    faqs: [
      {
        id: "hoc-phi",
        question: "Du học nghề Đức có mất học phí không?",
        answer:
          "Đào tạo kép thông thường không thu học phí; đào tạo tại trường tư có thể thu phí. Dù vậy, bạn vẫn cần dự trù sinh hoạt và chi phí chuẩn bị hồ sơ.",
        source: "models",
      },
      {
        id: "luong",
        question: "Có phải ngành nào cũng nhận 1.200–1.400 euro/tháng?",
        answer:
          "Không. Lương đào tạo phụ thuộc nghề, doanh nghiệp và năm học. Hãy kiểm tra hợp đồng cụ thể thay vì áp dụng một khoảng lương cho tất cả chương trình.",
        source: "hospitality",
      },
      {
        id: "chon-nganh",
        question: "Nên chọn ngành nào?",
        answer:
          "Hãy so sánh nhiệm vụ thực tế, yêu cầu tiếng Đức, ca làm và sở thích của bạn. Tìm hiểu nghề trước khi gửi hồ sơ; danh sách ngành trên trang là gợi ý nghiên cứu, không phải danh sách chỗ học đang tuyển của NaNu NaNa.",
        source: "application",
      },
    ],
    relatedTitle: "Chuẩn bị bước tiếp theo",
    coursesLabel: "Khoá tiếng Đức A1–C1",
    universityLabel: "So sánh với du học đại học",
    cta: "Tư vấn lộ trình du học nghề",
    shareHeadline: "DU HỌC NGHỀ ĐỨC",
    shareSubtitle: "Điều kiện · Ngành nghề · Chi phí",
  },
  de: {
    title: "Ausbildung in Deutschland: gut vorbereitet entscheiden",
    reviewed: "Quellen geprüft am",
    contents: "In diesem Ratgeber",
    sourceLabel: "Quellen",
    sourcesTitle: "Offizielle Informationen zum Weiterlesen",
    intro:
      "Eine Ausbildung führt zu einem Berufsabschluss. Vergleichen Sie vor der Bewerbung Ausbildungsform, Sprachanforderungen und Ihr persönliches Budget.",
    comparisonTitle: "Betriebliche oder schulische Ausbildung?",
    comparisonHeaders: ["Kriterium", "Duale Ausbildung", "Schulische Ausbildung"],
    comparisonRows: [
      ["Lernorte", "Betrieb und Berufsschule", "Überwiegend Schule mit Praxisphasen"],
      [
        "Einkommen",
        "Monatliche Ausbildungsvergütung",
        "Meist ohne Vergütung; Ausnahmen im Gesundheitswesen",
      ],
      [
        "Schulgeld",
        "In der Regel kein Schulgeld",
        "Öffentliche Schulen meist kostenfrei; private können Gebühren verlangen",
      ],
    ],
    sections: [
      {
        id: "thoi-gian",
        title: "Wie lange dauert die Ausbildung?",
        paragraphs: [
          "Eine duale Ausbildung dauert je nach Beruf zwei bis dreieinhalb Jahre und endet mit einer Abschlussprüfung. Die Vorbereitung in Vietnam – Sprache, Bewerbung und Unterlagen – kommt hinzu.",
        ],
        sources: ["duration"],
      },
      {
        id: "dieu-kien",
        title: "Schulabschluss und Deutschkenntnisse",
        paragraphs: [
          "Bei einer dualen Ausbildung legt der Betrieb seine Auswahlkriterien fest; ein bestimmter Schulabschluss ist nicht allgemein gesetzlich vorgeschrieben. Bei schulischer Ausbildung ist die Anerkennung des Schulabschlusses in der Regel erforderlich.",
          "Für das Ausbildungsvisum wird normalerweise B1 verlangt. Ausbildungsstellen können höhere Anforderungen haben. Bereiten Sie sich auch auf Fachsprache, Unterricht und Gespräche im Betrieb vor.",
        ],
        sources: ["requirements"],
      },
      {
        id: "nganh-nghe",
        title: "Welche Berufe kommen infrage?",
        paragraphs: [
          "Mögliche Bereiche sind Pflege, Hotellerie und Gastronomie, Transport und Logistik, Elektro- und Metallberufe, Bau, Handel und Lebensmittelhandwerk. Vergleichen Sie den Arbeitsalltag mit Ihren Interessen und recherchieren Sie konkrete Stellen.",
        ],
        sources: ["professions"],
      },
      {
        id: "khach-san",
        title: "Hotellerie und Gastronomie",
        paragraphs: [
          "Beispiele sind Hotelfach, Restaurant- und Veranstaltungsgastronomie sowie Koch oder Köchin. Je nach Beruf dauert die Ausbildung zwei bis drei Jahre. Kommunikation, Teamarbeit und die Bereitschaft zu Abend- und Wochenenddiensten sind wichtig.",
          "Vergütungsangaben sind meist Bruttobeträge. Planen Sie mit dem Nettoverdienst und prüfen Sie, welche Wohn- und Verpflegungskosten Sie selbst tragen.",
        ],
        sources: ["hospitality"],
      },
      {
        id: "dieu-duong",
        title: "Besonderheiten der Pflegeausbildung",
        paragraphs: [
          "Die Vollzeitausbildung zur Pflegefachperson dauert drei Jahre und verbindet Pflegeschule und praktische Einsätze. Je nach Bundesland werden B1 oder B2 sowie Nachweise zu Schulabschluss, gesundheitlicher Eignung und Zuverlässigkeit verlangt.",
          "Die Ausbildung zur Pflegeassistenz ist ein anderer Bildungsgang mit abweichender Dauer, Zulassung und Qualifikation.",
        ],
        sources: ["nursing"],
      },
      {
        id: "chi-phi",
        title: "Kosten, Vergütung und Finanzierungsnachweis",
        paragraphs: [
          "Eine Ausbildungsvergütung reicht nicht automatisch für den Finanzierungsnachweis. Bei einer Lücke kann ein ergänzendes Sperrkonto oder eine Verpflichtungserklärung nötig sein. Prüfen Sie vor dem Antrag die aktuellen Vorgaben.",
          "Erstellen Sie ein persönliches Budget. Schulgeld und Beratungsgebühren sind unterschiedliche Kostenpositionen.",
        ],
        points: [
          "Sprachkurs und Sprachprüfung in Vietnam",
          "Übersetzungen, gegebenenfalls Zeugnisanerkennung, Visum und Versicherung",
          "Flug, Mietkaution und erste Lebenshaltungskosten",
          "Differenz zwischen Nettoeinkommen und Lebenshaltungskosten",
          "Vertraglich vereinbarte Beratungsgebühren, Leistungen und Erstattungsbedingungen",
        ],
        sources: ["visa", "vietnam"],
      },
      {
        id: "ho-so",
        title: "Bewerbung und Unterlagen",
        paragraphs: [
          "Bewerbungsverfahren beginnen häufig zwölf bis achtzehn Monate vor Ausbildungsstart. Bereiten Sie Lebenslauf, individuelles Anschreiben und die verlangten Nachweise vor. Prüfen Sie Termine beim jeweiligen Anbieter und üben Sie das Vorstellungsgespräch.",
          "Mit einer Ausbildungszusage gleichen Sie Ihre Unterlagen mit der aktuellen Visum-Checkliste der deutschen Vertretungen in Vietnam ab: Reisepass, Bildungs- und Sprachnachweise, Ausbildungsunterlagen, Finanzierung und Versicherung. Die Anforderungen hängen vom Einzelfall ab.",
        ],
        sources: ["application", "vietnam"],
      },
    ],
    faqTitle: "Häufige Fragen zur Ausbildung",
    faqs: [
      {
        id: "hoc-phi",
        question: "Ist eine Ausbildung kostenlos?",
        answer:
          "Bei dualer Ausbildung fällt in der Regel kein Schulgeld an. Private Berufsfachschulen können Gebühren verlangen. Lebenshaltung und Vorbereitung müssen Sie trotzdem einplanen.",
        source: "models",
      },
      {
        id: "luong",
        question: "Erhalten alle Auszubildenden 1.200–1.400 Euro?",
        answer:
          "Nein. Vergütung unterscheidet sich nach Beruf, Betrieb und Ausbildungsjahr. Maßgeblich ist der konkrete Vertrag.",
        source: "hospitality",
      },
      {
        id: "chon-nganh",
        question: "Wie wähle ich einen Beruf?",
        answer:
          "Vergleichen Sie Aufgaben, Sprachbedarf und Arbeitszeiten mit Ihren Interessen. Die genannten Bereiche dienen der Orientierung und sind keine Liste aktuell verfügbarer NaNu-NaNa-Ausbildungsplätze.",
        source: "application",
      },
    ],
    relatedTitle: "Den nächsten Schritt vorbereiten",
    coursesLabel: "Deutschkurse A1–C1",
    universityLabel: "Mit einem Studium vergleichen",
    cta: "Zur Ausbildung beraten lassen",
    shareHeadline: "AUSBILDUNG IN DEUTSCHLAND",
    shareSubtitle: "Voraussetzungen · Berufe · Kosten",
  },
};

/**
 * Standalone guides: the Goethe exam in Vietnam and the costs of a student
 * visa. The Ausbildung job pages (content/ausbildung-berufe.ts) reuse the same
 * page type and the source list below.
 *
 * Every fact comes from an official page that was read on the guide's reviewed
 * date: the Goethe-Institut Hanoi and Ho Chi Minh City exam pages, the German
 * embassy's visa pages (vietnam.diplo.de), the Pflegeberufegesetz, BERUFENET,
 * BIBB and Make it in Germany. Fees for the exams are left out on purpose: Goethe
 * Hanoi announces new fees from 2026.
 */
import type { GuideSource } from "./study-guide";
import type { GoalValue } from "./form-options";
import type { Locale } from "@/lib/i18n/locale";

export const guideSlugs = ["thi-goethe", "chi-phi-du-hoc-duc"] as const;
export type GuideSlug = (typeof guideSlugs)[number];

/** The day the guide's official sources were last read. */
export const guideReviewed: Record<GuideSlug, string> = {
  "thi-goethe": "2026-11-11",
  "chi-phi-du-hoc-duc": "2026-11-11",
};
export const guideHref = (slug: GuideSlug) => `/${slug}`;

export const guideSources = {
  goetheHanoi: {
    title: "Goethe-Institut Hanoi · Deutschprüfungen",
    href: "https://www.goethe.de/ins/vn/de/sta/han/prf.html",
  },
  goetheHcm: {
    title: "Goethe-Institut Ho-Chi-Minh-Stadt · Deutschprüfungen",
    href: "https://www.goethe.de/ins/vn/de/sta/hcm/prf.html",
  },
  embassyStudy: {
    title: "Deutsche Botschaft Hanoi · Visum für ein Studium",
    href: "https://vietnam.diplo.de/vn-de/service/2306542-2306542",
  },
  embassyAusbildung: {
    title: "Đại sứ quán Đức tại Hà Nội · Thị thực du học nghề",
    href: "https://vietnam.diplo.de/vn-vi/dichvulanhsu/05-visaeinreise/2306816-2306816",
  },
  pflbg: {
    title: "Pflegeberufegesetz (PflBG) §§ 6, 11, 19, 20, 24",
    href: "https://www.gesetze-im-internet.de/pflbg/",
  },
  berufenetPflege: {
    title: "Bundesagentur für Arbeit · BERUFENET Pflegefachmann/-frau",
    href: "https://web.arbeitsagentur.de/berufenet/beruf/132173",
  },
  berufenetRestaurant: {
    title: "BERUFENET · Fachmann/-frau – Restaurants und Veranstaltungsgastronomie",
    href: "https://web.arbeitsagentur.de/berufenet/beruf/136125",
  },
  berufenetHotel: {
    title: "BERUFENET · Hotelfachmann/-frau",
    href: "https://web.arbeitsagentur.de/berufenet/beruf/10009",
  },
  berufenetBaecker: {
    title: "BERUFENET · Bäcker/in",
    href: "https://web.arbeitsagentur.de/berufenet/beruf/3626",
  },
  berufenetVerkaufBaeckerei: {
    title: "BERUFENET · Fachverkäufer/in – Lebensmittelhandwerk (Bäckerei)",
    href: "https://web.arbeitsagentur.de/berufenet/beruf/50920",
  },
  berufenetVerkaufFleischerei: {
    title: "BERUFENET · Fachverkäufer/in – Lebensmittelhandwerk (Fleischerei)",
    href: "https://web.arbeitsagentur.de/berufenet/beruf/50924",
  },
  berufenetFleischer: {
    title: "BERUFENET · Fleischer/in",
    href: "https://web.arbeitsagentur.de/berufenet/beruf/13804",
  },
  bibbMindestverguetung: {
    title: "BIBB · Mindestausbildungsvergütung",
    href: "https://www.bibb.de/de/199658.php",
  },
  makeItVisa: {
    title: "Make it in Germany · Visa for vocational training",
    href: "https://www.make-it-in-germany.com/en/visa-recognition/visa-types/training",
  },
  makeItNursing: {
    title: "Make it in Germany · Nursing Professional",
    href: "https://www.make-it-in-germany.com/en/study-vocational-training/training-in-germany/in-demand/nursing",
  },
} satisfies Record<string, GuideSource>;
export type GuideSourceId = keyof typeof guideSources;

export type GuideContent = {
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  /** Short answers shown first, for people who only want the key facts. */
  quickTitle: string;
  quick: { label: string; value: string }[];
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    points?: string[];
    sources: GuideSourceId[];
  }[];
  faqTitle: string;
  faqs: { id: string; question: string; answer: string }[];
  ctaTitle: string;
  ctaText: string;
  cta: string;
  message: string;
  goal?: GoalValue;
  /** Breadcrumb levels between Home and this page. */
  parents?: { label: string; href: string }[];
  related: { label: string; href: string }[];
  shareSubtitle: string;
};

type Labels = {
  reviewed: string;
  contents: string;
  sources: string;
  sourcesTitle: string;
  related: string;
};
export const guideLabels: Record<Locale, Labels> = {
  vi: {
    reviewed: "Kiểm tra nguồn ngày",
    contents: "Nội dung",
    sources: "Nguồn",
    sourcesTitle: "Nguồn chính thức",
    related: "Xem thêm",
  },
  de: {
    reviewed: "Quellen geprüft am",
    contents: "Inhalt",
    sources: "Quelle",
    sourcesTitle: "Offizielle Quellen",
    related: "Weiterlesen",
  },
};

export const guides: Record<GuideSlug, Record<Locale, GuideContent>> = {
  "thi-goethe": {
    vi: {
      eyebrow: "Hướng dẫn · Thi Goethe",
      title: "Thi Goethe ở Việt Nam: cần mang gì, bao lâu có kết quả",
      metaTitle: "Thi Goethe: cần mang gì, bao lâu có kết quả",
      description:
        "Thi chứng chỉ Goethe tại Hà Nội và TP. Hồ Chí Minh: giấy tờ cần mang, khi nào có kết quả, chứng chỉ điện tử, hủy hoặc đổi lịch thi. Theo trang chính thức của Viện Goethe.",
      intro:
        "Viện Goethe tại Hà Nội và TP. Hồ Chí Minh tổ chức thi tiếng Đức từ A1 đến C2. Trang này tóm tắt những điều thí sinh hay hỏi nhất, theo thông tin trên trang thi của hai viện. Quy định có thể thay đổi, nên hãy xem lại trang chính thức trước ngày thi.",
      quickTitle: "Trả lời nhanh",
      quick: [
        {
          label: "Bao lâu có kết quả?",
          value: "Thường 2–3 ngày làm việc (Hà Nội), xem trên my.goethe.de",
        },
        { label: "Có cần hộ chiếu không?", value: "Có: hộ chiếu còn hạn, bản photo và ảnh 4x6 cm" },
        { label: "Chứng chỉ?", value: "Chứng chỉ điện tử, tự tải về từ my.goethe.de" },
        { label: "Đến muộn?", value: "Không được thi và không hoàn phí (Hà Nội)" },
      ],
      sections: [
        {
          id: "dang-ky",
          title: "Đăng ký thi",
          paragraphs: [
            "Bạn đăng ký thi trực tuyến. Trước khi đặt chỗ, hãy tạo tài khoản trên my.goethe.de. Viện Goethe có các kỳ thi Goethe-Zertifikat A1, A2, B1, B2, C1 và C2; A1 đến B2 có cả bản dành cho thanh thiếu niên.",
            "Lệ phí phải trả đủ trước ngày thi, theo hạn thanh toán của từng kỳ. Viện Goethe Hà Nội lưu ý có mức lệ phí mới từ năm 2026, nên hãy xem giá hiện tại trên trang của viện.",
          ],
          sources: ["goetheHanoi"],
        },
        {
          id: "can-mang-gi",
          title: "Ngày thi cần mang gì?",
          paragraphs: [
            "Bạn phải xuất trình giấy tờ tùy thân trước khi thi. Cả hai viện đều yêu cầu:",
          ],
          points: [
            "Hộ chiếu còn hạn",
            "Bản photo hộ chiếu (Hà Nội: trên giấy A4)",
            "Một ảnh thẻ mới 4x6 cm (Hà Nội: dán ở mép phải bản photo hộ chiếu)",
          ],
          sources: ["goetheHanoi", "goetheHcm"],
        },
        {
          id: "quy-dinh",
          title: "Quy định trong phòng thi",
          paragraphs: [
            "Hãy đến sớm. Theo Viện Goethe Hà Nội, nếu đến muộn bạn không được vào thi và không được hoàn lệ phí.",
            "Không được dùng từ điển, sách ngữ pháp hay giấy ghi chú. Điện thoại phải tắt hẳn và giao cho giám thị, cuối buổi được trả lại. Chỉ câu trả lời ghi trên phiếu trả lời mới được chấm, viết bằng bút bi, bút mực hoặc bút gel màu xanh hoặc đen.",
          ],
          sources: ["goetheHanoi"],
        },
        {
          id: "ket-qua",
          title: "Kết quả và chứng chỉ",
          paragraphs: [
            "Tại Hà Nội, kết quả thường có sau 2–3 ngày làm việc trên my.goethe.de. Viện không báo kết quả qua điện thoại hay email.",
            "Từ kỳ thi ngày 08.04.2024, cả hai viện cấp chứng chỉ điện tử. Bạn tự tải về và in từ tài khoản my.goethe.de. Chứng chỉ điện tử có giá trị như bản giấy và được cơ quan như phòng visa chấp nhận mà không cần chữ ký.",
            "A1 và A2 là kỳ thi không chia module. B1, B2 và C1 chia module: bạn nhận chứng chỉ cho từng module đã đỗ, hoặc một chứng chỉ chung nếu thi đỗ cả bốn module trong cùng một kỳ.",
          ],
          sources: ["goetheHanoi", "goetheHcm"],
        },
        {
          id: "huy-doi-lich",
          title: "Hủy hoặc đổi lịch thi (Hà Nội)",
          paragraphs: [
            "Trong vòng 14 ngày kể từ khi đăng ký thành công, bạn có thể hủy và được hoàn 100% lệ phí. Sau thời hạn đó, phí hủy là 100% lệ phí.",
            "Nếu có lý do bất khả kháng như ốm đột ngột hay tai nạn, bạn có thể xin dời lịch: gửi giấy xác nhận của bác sĩ đến phòng thi của viện. Phí đổi lịch là 20% lệ phí thi lần đầu.",
          ],
          sources: ["goetheHanoi"],
        },
      ],
      faqTitle: "Câu hỏi thường gặp",
      faqs: [
        {
          id: "goethe-ket-qua",
          question: "Thi Goethe bao lâu có kết quả?",
          answer:
            "Tại Viện Goethe Hà Nội, kết quả thường có sau 2–3 ngày làm việc trên my.goethe.de. Viện không báo kết quả qua điện thoại hay email.",
        },
        {
          id: "goethe-mang-gi",
          question: "Thi Goethe cần mang gì?",
          answer:
            "Hộ chiếu còn hạn, bản photo hộ chiếu và một ảnh thẻ mới 4x6 cm. Không được mang từ điển hay tài liệu vào phòng thi; điện thoại phải tắt và giao cho giám thị.",
        },
        {
          id: "goethe-ho-chieu",
          question: "Thi Goethe có cần hộ chiếu không?",
          answer:
            "Có. Trang thi của Viện Goethe Hà Nội và TP. Hồ Chí Minh đều yêu cầu hộ chiếu còn hạn vào ngày thi.",
        },
        {
          id: "goethe-chung-chi",
          question: "Chứng chỉ Goethe điện tử có dùng để xin visa được không?",
          answer:
            "Có. Theo Viện Goethe, chứng chỉ điện tử có giá trị như bản giấy và được phòng visa chấp nhận mà không cần chữ ký.",
        },
      ],
      ctaTitle: "Chuẩn bị thi cùng NaNu NaNa",
      ctaText:
        "NaNu NaNa có lớp tiếng Đức A1 đến C1, online và tại Hà Nội, TP. Hồ Chí Minh. Hãy để lại thông tin để được tư vấn lớp phù hợp trước kỳ thi.",
      cta: "Hỏi tư vấn ôn thi",
      message: "Tôi muốn được tư vấn lớp ôn thi Goethe.",
      goal: "hoc-tieng",
      related: [
        { label: "Các khoá tiếng Đức A1–C1", href: "/niveau" },
        { label: "Học tiếng Đức online", href: "/hoc-tieng-duc-online" },
        { label: "Chi phí và visa du học Đức", href: "/chi-phi-du-hoc-duc" },
      ],
      shareSubtitle: "Giấy tờ · Kết quả · Chứng chỉ",
    },
    de: {
      eyebrow: "Ratgeber · Goethe-Prüfung",
      title: "Goethe-Prüfung in Vietnam: Was mitbringen, wann kommt das Ergebnis",
      metaTitle: "Goethe-Prüfung in Vietnam: Ausweis und Ergebnis",
      description:
        "Goethe-Zertifikat in Hanoi und Ho-Chi-Minh-Stadt: nötige Dokumente, Ergebnis, digitales Zertifikat, Rücktritt und Terminänderung. Nach den offiziellen Seiten des Goethe-Instituts.",
      intro:
        "Die Goethe-Institute in Hanoi und Ho-Chi-Minh-Stadt bieten Deutschprüfungen von A1 bis C2 an. Diese Seite fasst die häufigsten Fragen nach den Prüfungsseiten beider Institute zusammen. Regeln können sich ändern, prüfen Sie vor dem Prüfungstag die offizielle Seite.",
      quickTitle: "Kurz beantwortet",
      quick: [
        {
          label: "Wann kommt das Ergebnis?",
          value: "Meist 2–3 Arbeitstage (Hanoi), auf my.goethe.de",
        },
        { label: "Brauche ich den Pass?", value: "Ja: gültiger Pass, Passkopie und Foto 4x6 cm" },
        { label: "Zertifikat?", value: "Digital, selbst auf my.goethe.de herunterladen" },
        { label: "Zu spät?", value: "Keine Teilnahme, keine Erstattung (Hanoi)" },
      ],
      sections: [
        {
          id: "dang-ky",
          title: "Anmeldung",
          paragraphs: [
            "Die Anmeldung läuft online. Legen Sie vor der Buchung ein Konto auf my.goethe.de an. Angeboten werden die Goethe-Zertifikate A1, A2, B1, B2, C1 und C2; A1 bis B2 gibt es auch für Jugendliche.",
            "Die Gebühr ist vor dem Prüfungstermin vollständig zu zahlen, je nach Zahlungsfrist des Termins. Das Goethe-Institut Hanoi weist auf neue Gebühren ab 2026 hin; die aktuellen Preise stehen auf der Seite des Instituts.",
          ],
          sources: ["goetheHanoi"],
        },
        {
          id: "can-mang-gi",
          title: "Was bringe ich am Prüfungstag mit?",
          paragraphs: ["Vor der Prüfung müssen Sie sich ausweisen. Beide Institute verlangen:"],
          points: [
            "einen gültigen Pass",
            "eine Passkopie (Hanoi: auf DIN-A4-Papier)",
            "ein aktuelles Passfoto 4x6 cm (Hanoi: rechts auf die Passkopie geklebt)",
          ],
          sources: ["goetheHanoi", "goetheHcm"],
        },
        {
          id: "quy-dinh",
          title: "Regeln in der Prüfung",
          paragraphs: [
            "Kommen Sie rechtzeitig. Laut Goethe-Institut Hanoi können Sie bei Verspätung nicht teilnehmen, und die Gebühr wird nicht erstattet.",
            "Wörterbücher, Grammatikbücher und Notizen sind verboten. Handys werden ganz ausgeschaltet und der Aufsicht übergeben und am Ende zurückgegeben. Bewertet wird nur, was auf dem Antwortbogen steht, geschrieben mit blauem oder schwarzem Kugelschreiber, Füller, Faser- oder Gelstift.",
          ],
          sources: ["goetheHanoi"],
        },
        {
          id: "ket-qua",
          title: "Ergebnis und Zertifikat",
          paragraphs: [
            "In Hanoi steht das Ergebnis in der Regel zwei bis drei Arbeitstage nach der Prüfung auf my.goethe.de. Telefonisch oder per E-Mail teilt das Institut keine Ergebnisse mit.",
            "Seit dem Prüfungstermin 08.04.2024 stellen beide Institute digitale Zertifikate aus. Sie laden sie über Ihr my.goethe.de-Konto herunter und drucken sie selbst aus. Sie gelten wie Papierzertifikate und werden von Behörden wie Visastellen ohne Unterschrift anerkannt.",
            "A1 und A2 sind nicht modular. B1, B2 und C1 sind modular: Sie erhalten ein Zeugnis je bestandenem Modul, oder ein gemeinsames Zeugnis, wenn Sie alle vier Module an einem Termin bestehen.",
          ],
          sources: ["goetheHanoi", "goetheHcm"],
        },
        {
          id: "huy-doi-lich",
          title: "Rücktritt und Terminänderung (Hanoi)",
          paragraphs: [
            "Innerhalb von 14 Tagen nach der erfolgreichen Anmeldung können Sie stornieren und erhalten die Gebühr voll zurück. Danach beträgt die Stornogebühr 100 %.",
            "Bei höherer Gewalt wie plötzlicher Krankheit oder Unfall können Sie eine Verschiebung beantragen, mit ärztlicher Bestätigung an das Prüfungsbüro. Die Änderungsgebühr beträgt 20 % der Erstprüfungsgebühr.",
          ],
          sources: ["goetheHanoi"],
        },
      ],
      faqTitle: "Häufige Fragen",
      faqs: [
        {
          id: "goethe-ket-qua",
          question: "Wann bekomme ich das Ergebnis der Goethe-Prüfung?",
          answer:
            "Am Goethe-Institut Hanoi in der Regel zwei bis drei Arbeitstage nach der Prüfung auf my.goethe.de. Per Telefon oder E-Mail gibt es keine Auskunft.",
        },
        {
          id: "goethe-mang-gi",
          question: "Was muss ich zur Goethe-Prüfung mitbringen?",
          answer:
            "Einen gültigen Pass, eine Passkopie und ein aktuelles Passfoto 4x6 cm. Unterlagen sind im Prüfungsraum verboten; das Handy wird ausgeschaltet abgegeben.",
        },
        {
          id: "goethe-ho-chieu",
          question: "Brauche ich für die Goethe-Prüfung einen Pass?",
          answer:
            "Ja. Die Prüfungsseiten der Goethe-Institute Hanoi und Ho-Chi-Minh-Stadt verlangen am Prüfungstag einen gültigen Pass.",
        },
        {
          id: "goethe-chung-chi",
          question: "Gilt das digitale Goethe-Zertifikat für das Visum?",
          answer:
            "Ja. Laut Goethe-Institut gilt das digitale Zertifikat wie die Papierversion und wird von Visastellen ohne Unterschrift anerkannt.",
        },
      ],
      ctaTitle: "Mit NaNu NaNa zur Prüfung",
      ctaText:
        "NaNu NaNa bietet Deutschkurse von A1 bis C1 an, online und in Hanoi und Ho-Chi-Minh-Stadt. Hinterlassen Sie Ihre Daten, dann finden wir den passenden Kurs vor Ihrer Prüfung.",
      cta: "Beratung zur Prüfungsvorbereitung",
      message: "Ich interessiere mich für einen Kurs zur Vorbereitung auf die Goethe-Prüfung.",
      goal: "hoc-tieng",
      related: [
        { label: "Deutschkurse A1–C1", href: "/niveau" },
        { label: "Deutsch online lernen", href: "/hoc-tieng-duc-online" },
        { label: "Kosten und Visum fürs Studium", href: "/chi-phi-du-hoc-duc" },
      ],
      shareSubtitle: "Dokumente · Ergebnis · Zertifikat",
    },
  },
  "chi-phi-du-hoc-duc": {
    vi: {
      eyebrow: "Hướng dẫn · Chi phí & visa",
      title: "Chi phí và visa du học Đức",
      metaTitle: "Chi phí và visa du học Đức: tài khoản phong tỏa",
      description:
        "Visa du học Đức từ Việt Nam: lệ phí, thời gian xét, tài khoản phong tỏa, bảo hiểm y tế, APS và tiếng Đức B1. Theo trang chính thức của Đại sứ quán Đức tại Hà Nội.",
      intro:
        "Trang này tóm tắt các khoản chi và giấy tờ chính khi xin visa du học đại học tại Đức từ Việt Nam, theo trang “Visa du học” của Đại sứ quán Đức tại Hà Nội. Số tiền và quy định có thể thay đổi; hãy kiểm tra lại trang chính thức trước khi nộp hồ sơ.",
      quickTitle: "Con số chính",
      quick: [
        {
          label: "Lệ phí visa",
          value: "75 € (dưới 18 tuổi: 37,50 €), trả bằng VND, cộng phí dịch vụ VFS",
        },
        { label: "Chứng minh tài chính", value: "1.091 € mỗi tháng, cho năm học đầu tiên" },
        { label: "Thời gian xét", value: "Thường khoảng 12 tuần" },
        { label: "Tiếng Đức", value: "Trình độ B1 cho người xin học" },
      ],
      sections: [
        {
          id: "le-phi",
          title: "Lệ phí và thời gian xét visa",
          paragraphs: [
            "Lệ phí visa là 75 € (người dưới 18 tuổi: 37,50 €), trả bằng đồng Việt Nam. Ngoài ra có phí dịch vụ của VFS, nơi bạn nộp hồ sơ gốc và lấy sinh trắc học.",
            "Đại sứ quán không cam kết thời gian xét cụ thể. Với du học sinh, thời gian xét thường khoảng mười hai tuần, có thể lâu hơn nhiều nếu nộp sát ngày khai giảng. Vì vậy hãy nộp sớm.",
          ],
          sources: ["embassyStudy"],
        },
        {
          id: "tai-chinh",
          title: "Chứng minh tài chính: tài khoản phong tỏa",
          paragraphs: [
            "Bạn phải chứng minh đủ tiền sinh hoạt cho năm học đầu tiên khi nộp hồ sơ. Trang của Đại sứ quán ghi người xin học cần chứng minh 1.091 € mỗi tháng, tức 13.092 € cho 12 tháng. Cùng trang đó còn một chỗ ghi 992 € mỗi tháng; hãy tính theo mức cao hơn và hỏi lại Đại sứ quán nếu cần.",
            "Cách thường dùng là tài khoản phong tỏa (Sperrkonto) ở Đức. Ngoài ra có thể dùng giấy cam kết bảo lãnh chính thức của người ở Đức có đủ thu nhập, hoặc học bổng từ nguồn công.",
            "Nếu trường thu học phí, bạn cần chứng minh đã đóng bao nhiêu và sẽ chi trả phần còn lại thế nào, ví dụ bằng giấy tờ thu nhập của cha mẹ.",
          ],
          sources: ["embassyStudy"],
        },
        {
          id: "bao-hiem",
          title: "Bảo hiểm y tế",
          paragraphs: ["Đại sứ quán chấp nhận một trong ba cách:"],
          points: [
            "Bảo hiểm y tế tư nhân của Đức, bắt đầu từ ngày dự kiến nhập cảnh",
            "Bảo hiểm y tế công của Đức (thư xác nhận của quỹ bảo hiểm) cùng bảo hiểm du lịch cho ba tuần đầu",
            "Bảo hiểm tư nhân nước ngoài (kể cả của Việt Nam) đáp ứng yêu cầu, bắt đầu từ ngày dự kiến nhập cảnh",
          ],
          sources: ["embassyStudy"],
        },
        {
          id: "giay-to",
          title: "Giấy tờ học tập: APS và tiếng Đức",
          paragraphs: [
            "Bạn nộp thư mời nhập học của trường hoặc của dự bị đại học (Studienkolleg). Chứng chỉ APS là bằng chứng bạn đủ điều kiện vào đại học.",
            "Trường đại học quyết định trình độ ngôn ngữ cho từng ngành. Theo Đại sứ quán, người xin học cần chứng minh tiếng Đức trình độ B1; nếu ngành học bằng tiếng Đức, hãy nộp chứng chỉ của đơn vị thi được công nhận.",
          ],
          sources: ["embassyStudy"],
        },
      ],
      faqTitle: "Câu hỏi thường gặp",
      faqs: [
        {
          id: "chi-phi-phong-toa",
          question: "Tài khoản phong tỏa du học Đức cần bao nhiêu tiền?",
          answer:
            "Trang visa du học của Đại sứ quán Đức tại Hà Nội ghi 1.091 € mỗi tháng, tức 13.092 € cho năm học đầu tiên. Cùng trang còn một chỗ ghi 992 €; hãy tính theo mức cao hơn và kiểm tra lại trước khi nộp.",
        },
        {
          id: "chi-phi-le-phi",
          question: "Lệ phí visa du học Đức là bao nhiêu?",
          answer:
            "75 € (dưới 18 tuổi: 37,50 €), trả bằng đồng Việt Nam, cộng thêm phí dịch vụ của VFS.",
        },
        {
          id: "chi-phi-thoi-gian",
          question: "Visa du học Đức bao lâu có kết quả?",
          answer:
            "Đại sứ quán không cam kết thời gian cụ thể; với du học sinh thường khoảng 12 tuần, có thể lâu hơn nếu nộp sát ngày khai giảng.",
        },
        {
          id: "chi-phi-can-gi",
          question: "Xin visa du học Đức cần những gì?",
          answer:
            "Trong số các giấy tờ chính: thư mời nhập học, chứng chỉ APS, chứng chỉ tiếng Đức B1, chứng minh tài chính (ví dụ tài khoản phong tỏa) và bảo hiểm y tế. Danh sách đầy đủ có trên trang của Đại sứ quán.",
        },
      ],
      ctaTitle: "Lập kế hoạch du học cùng NaNu NaNa",
      ctaText:
        "Bạn muốn biết lộ trình phù hợp với mình, từ tiếng Đức đến hồ sơ? Hãy để lại thông tin, NaNu NaNa sẽ liên hệ tư vấn.",
      cta: "Hỏi tư vấn du học",
      message: "Tôi muốn được tư vấn về chi phí và hồ sơ du học Đức.",
      goal: "du-hoc-dai-hoc",
      related: [
        { label: "Du học đại học Đức", href: "/du-hoc-duc" },
        { label: "Du học nghề Đức", href: "/du-hoc-nghe" },
        { label: "Thi Goethe: cần mang gì", href: "/thi-goethe" },
      ],
      shareSubtitle: "Lệ phí · Tài khoản phong tỏa · Bảo hiểm",
    },
    de: {
      eyebrow: "Ratgeber · Kosten & Visum",
      title: "Kosten und Visum für ein Studium in Deutschland",
      metaTitle: "Studienvisum aus Vietnam: Kosten und Sperrkonto",
      description:
        "Studienvisum für Deutschland aus Vietnam: Gebühr, Bearbeitungszeit, Sperrkonto, Krankenversicherung, APS und Deutsch B1. Nach der offiziellen Seite der Deutschen Botschaft Hanoi.",
      intro:
        "Diese Seite fasst die wichtigsten Kosten und Unterlagen für ein Studienvisum aus Vietnam zusammen, nach der Seite „Visum für ein Studium“ der Deutschen Botschaft Hanoi. Beträge und Regeln können sich ändern; prüfen Sie vor dem Antrag die offizielle Seite.",
      quickTitle: "Die wichtigsten Zahlen",
      quick: [
        { label: "Visumgebühr", value: "75 € (unter 18: 37,50 €), in VND, plus VFS-Servicegebühr" },
        { label: "Finanzierungsnachweis", value: "1.091 € pro Monat, für das erste Studienjahr" },
        { label: "Bearbeitungszeit", value: "Meist etwa 12 Wochen" },
        { label: "Deutsch", value: "Niveau B1 für Studienbewerber" },
      ],
      sections: [
        {
          id: "le-phi",
          title: "Gebühr und Bearbeitungszeit",
          paragraphs: [
            "Die Visumgebühr beträgt 75 € (unter 18 Jahren 37,50 €), zahlbar in vietnamesischen Dong. Dazu kommt die Servicegebühr von VFS, wo Sie die Originale abgeben und die Biometrie erfassen lassen.",
            "Eine feste Bearbeitungsdauer sagt die Botschaft nicht zu. Bei Studierenden sind es meist etwa zwölf Wochen, im Einzelfall deutlich länger, vor allem kurz vor Semesterbeginn. Stellen Sie den Antrag deshalb früh.",
          ],
          sources: ["embassyStudy"],
        },
        {
          id: "tai-chinh",
          title: "Finanzierungsnachweis: das Sperrkonto",
          paragraphs: [
            "Bei der Antragstellung müssen Sie den Lebensunterhalt für das erste Studienjahr nachweisen. Die Seite der Botschaft nennt für Studienbewerber 1.091 € pro Monat, also 13.092 € für zwölf Monate. An einer Stelle derselben Seite stehen noch 992 €; rechnen Sie mit dem höheren Betrag und fragen Sie im Zweifel bei der Botschaft nach.",
            "Üblich ist ein Sperrkonto in Deutschland. Alternativ geht eine förmliche Verpflichtungserklärung eines Sponsors in Deutschland mit nachgewiesener Bonität oder ein Stipendium aus öffentlichen Mitteln.",
            "Erhebt die Hochschule Studiengebühren, weisen Sie nach, wie viel schon bezahlt ist und wie der Rest finanziert wird, etwa mit Einkommensnachweisen der Eltern.",
          ],
          sources: ["embassyStudy"],
        },
        {
          id: "bao-hiem",
          title: "Krankenversicherung",
          paragraphs: ["Die Botschaft akzeptiert einen dieser Nachweise:"],
          points: [
            "eine private deutsche Krankenversicherung ab dem geplanten Reisetermin",
            "eine gesetzliche deutsche Krankenversicherung (Schreiben der Krankenkasse) plus Reisekrankenversicherung für die ersten drei Wochen",
            "eine private ausländische, auch vietnamesische, Krankenversicherung, die die Anforderungen erfüllt und am Reisetermin beginnt",
          ],
          sources: ["embassyStudy"],
        },
        {
          id: "giay-to",
          title: "Studienunterlagen: APS und Deutsch",
          paragraphs: [
            "Sie legen den Zulassungsbescheid der Hochschule oder des Studienkollegs vor. Als Nachweis der Hochschulzugangsberechtigung dient ein APS-Zertifikat.",
            "Die nötigen Sprachkenntnisse legt die Hochschule fest. Laut Botschaft müssen Studienbewerber Deutsch auf Niveau B1 nachweisen; bei deutschsprachigem Studium mit dem Zertifikat eines anerkannten Prüfungsanbieters.",
          ],
          sources: ["embassyStudy"],
        },
      ],
      faqTitle: "Häufige Fragen",
      faqs: [
        {
          id: "chi-phi-phong-toa",
          question: "Wie viel Geld muss auf das Sperrkonto?",
          answer:
            "Die Seite der Deutschen Botschaft Hanoi zum Studienvisum nennt 1.091 € pro Monat, also 13.092 € für das erste Studienjahr. An einer Stelle stehen noch 992 €; rechnen Sie mit dem höheren Betrag und prüfen Sie vor dem Antrag nach.",
        },
        {
          id: "chi-phi-le-phi",
          question: "Was kostet das Studienvisum?",
          answer:
            "75 € (unter 18 Jahren 37,50 €), zahlbar in Dong, plus die Servicegebühr von VFS.",
        },
        {
          id: "chi-phi-thoi-gian",
          question: "Wie lange dauert das Studienvisum?",
          answer:
            "Die Botschaft sagt keine feste Dauer zu; bei Studierenden meist etwa 12 Wochen, kurz vor Semesterbeginn auch länger.",
        },
        {
          id: "chi-phi-can-gi",
          question: "Welche Unterlagen brauche ich für das Studienvisum?",
          answer:
            "Unter anderem den Zulassungsbescheid, das APS-Zertifikat, Deutsch B1, den Finanzierungsnachweis (etwa ein Sperrkonto) und eine Krankenversicherung. Die vollständige Liste steht auf der Seite der Botschaft.",
        },
      ],
      ctaTitle: "Studium mit NaNu NaNa planen",
      ctaText:
        "Sie möchten wissen, welcher Weg zu Ihnen passt, vom Deutschkurs bis zu den Unterlagen? Hinterlassen Sie Ihre Daten, NaNu NaNa meldet sich.",
      cta: "Beratung zum Studium",
      message:
        "Ich möchte mich zu Kosten und Unterlagen für ein Studium in Deutschland beraten lassen.",
      goal: "du-hoc-dai-hoc",
      related: [
        { label: "Studium in Deutschland", href: "/du-hoc-duc" },
        { label: "Ausbildung in Deutschland", href: "/du-hoc-nghe" },
        { label: "Goethe-Prüfung: was mitbringen", href: "/thi-goethe" },
      ],
      shareSubtitle: "Gebühr · Sperrkonto · Versicherung",
    },
  },
};

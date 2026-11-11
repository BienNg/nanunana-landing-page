import type { Locale } from "@/lib/i18n/locale";
import type { StudyGuideContent } from "./study-guide";

export const universityReviewed = "2026-11-11";
export const universitySources = {
  admission: {
    title: "DAAD · Admission requirements",
    href: "https://www.daad.de/en/studying-in-germany/requirements/overview/",
  },
  preparation: {
    title: "DAAD · Studienkolleg",
    href: "https://www.daad.de/en/studying-in-germany/requirements/studienkollegs/",
  },
  language: {
    title: "DAAD · Language requirements",
    href: "https://www.daad.de/en/studying-in-germany/living-in-germany/german-language/",
  },
  aps: {
    title: "Đại sứ quán Đức · APS Hà Nội",
    href: "https://vietnam.diplo.de/vn-de/willkommen/2546866-2546866",
  },
  tuition: {
    title: "DAAD · Tuition and funding",
    href: "https://www.daad-ukraine.org/en/studying-in-germany/funding/",
  },
  budget: {
    title: "DAAD · Living and study costs",
    href: "https://www.daad.de/en/studying-in-germany/living-in-germany/finances/",
  },
  application: {
    title: "DAAD · Application process",
    href: "https://www.daad.de/en/studying-in-germany/requirements/application-process/",
  },
  vpd: {
    title: "uni-assist · VPD",
    href: "https://www.uni-assist.de/en/how-to-apply/plan-your-application/vpd/?pk_campaign=226",
  },
  programme: {
    title: "DAAD · Choosing a degree",
    href: "https://www.daad.de/en/studying-in-germany/universities/the-right-degree-programme/",
  },
  visa: {
    title: "Đại sứ quán Đức · Thị thực du học đại học",
    href: "https://vietnam.diplo.de/vn-vi/dichvulanhsu/05-visaeinreise/2306798-2306798",
  },
  work: {
    title: "Make it in Germany · Study and residence",
    href: "https://www.make-it-in-germany.com/en/visa-recognition/visa-types/studying",
  },
  training: {
    title: "Make it in Germany · Ausbildung",
    href: "https://www.make-it-in-germany.com/en/study-vocational-training/training-in-germany",
  },
} as const;
export type UniversitySource = keyof typeof universitySources;
export const universityGuide: Record<Locale, StudyGuideContent<UniversitySource>> = {
  vi: {
    title: "Du học đại học Đức: từ chọn ngành đến hồ sơ",
    reviewed: "Kiểm tra nguồn ngày",
    contents: "Trong hướng dẫn này",
    sourceLabel: "Nguồn",
    sourcesTitle: "Đọc thông tin chính thức",
    intro:
      "Một lộ trình phù hợp bắt đầu từ bằng cấp hiện tại, ngành muốn học, ngôn ngữ giảng dạy và ngân sách. Hãy kiểm tra từng chương trình thay vì áp dụng một bộ điều kiện cho tất cả trường.",
    comparisonTitle: "Du học đại học hay du học nghề?",
    comparisonHeaders: ["Tiêu chí", "Đại học (Studium)", "Đào tạo nghề kép (Ausbildung)"],
    comparisonRows: [
      [
        "Hướng học",
        "Kiến thức học thuật và chuyên môn theo ngành",
        "Thực hành tại doanh nghiệp kết hợp trường nghề",
      ],
      ["Kết quả", "Bằng đại học theo chương trình", "Bằng nghề sau đào tạo và thi kết thúc"],
      [
        "Tài chính",
        "Tự lập kế hoạch chi phí học và sinh hoạt",
        "Có lương đào tạo; vẫn cần kiểm tra ngân sách",
      ],
    ],
    sections: [
      {
        id: "dieu-kien-dai-hoc",
        title: "Điều kiện du học đại học Đức",
        paragraphs: [
          "Bạn cần kiểm tra bằng cấp có đáp ứng điều kiện vào đại học tại Đức (HZB) hay không. Tùy quá trình học, bạn có thể đủ điều kiện vào thẳng, chỉ được học một nhóm ngành, hoặc cần học dự bị. Tra cứu cơ sở dữ liệu tuyển sinh DAAD và xác nhận với trường.",
          "Đủ điều kiện học đại học chưa đồng nghĩa được nhận vào một ngành cụ thể. Trường quyết định tuyển sinh và có thể có thêm tiêu chí riêng.",
        ],
        sources: ["admission"],
      },
      {
        id: "aps",
        title: "APS là gì và cần chuẩn bị thế nào?",
        paragraphs: [
          "APS tại Hà Nội kiểm tra điều kiện học đại học cùng kết quả học tập và bằng cấp cấp tại Việt Nam. Hãy chọn đúng thủ tục theo bậc học và tình trạng hồ sơ của mình trên trang APS.",
          "Chuẩn bị giấy tờ học tập nhất quán về tên, thời gian và kết quả. APS không thay thế quyết định tuyển sinh của trường hay quyết định cấp thị thực.",
        ],
        sources: ["aps", "admission"],
      },
      {
        id: "studienkolleg",
        title: "Có phải ai cũng học Studienkolleg?",
        paragraphs: [
          "Không. Studienkolleg dành cho lộ trình cần bổ sung điều kiện vào đại học; thường kéo dài hai học kỳ và có kỳ thi Feststellungsprüfung (FSP). Đây là chương trình dự bị học thuật theo nhóm ngành, không chỉ là khóa học tiếng.",
          "Chọn khóa dự bị phù hợp ngành và loại trường dự định học. Trước khi nộp, kiểm tra yêu cầu đầu vào, kỳ thi và phạm vi công nhận kết quả FSP.",
        ],
        sources: ["preparation"],
      },
      {
        id: "ngoai-ngu",
        title: "Cần B1, B2 hay C1?",
        paragraphs: [
          "Trường quy định chứng chỉ và mức điểm theo chương trình. Các kỳ thi thường gặp gồm TestDaF, DSH và telc Deutsch C1 Hochschule. B1 hoặc B2 không tự động đủ cho mọi ngành; hãy phân biệt điều kiện dự bị với nhập học chuyên ngành.",
          "Chương trình dạy bằng tiếng Anh thường yêu cầu chứng minh tiếng Anh theo quy định riêng. Tiếng Đức vẫn hữu ích cho sinh hoạt. Kiểm tra cả yêu cầu ngoại ngữ của thủ tục thị thực tại Việt Nam.",
        ],
        sources: ["language", "visa"],
      },
      {
        id: "chon-nganh",
        title: "Nên chọn ngành nào?",
        paragraphs: [
          "Bắt đầu từ môn học yêu thích và loại công việc bạn muốn làm. So sánh nội dung đào tạo, ngôn ngữ, điều kiện tuyển sinh và triển vọng học tiếp của từng chương trình. Đừng chọn chỉ dựa vào tên ngành.",
          "Lập danh sách trường với học phí và chi phí thành phố tương ứng. Đọc trang chính thức của ngành và hỏi International Office khi điều kiện chưa rõ.",
        ],
        sources: ["programme"],
      },
      {
        id: "hoc-phi",
        title: "Đại học Đức có miễn học phí không?",
        paragraphs: [
          "Nhiều chương trình cử nhân tại trường công không thu học phí, nhưng có ngoại lệ theo bang, trường và chương trình. Trường tư cũng có thể thu phí. Kiểm tra biểu phí áp dụng cho sinh viên ngoài EU trước khi chọn trường.",
          "Semesterbeitrag là khoản đóng góp học kỳ, khác học phí. Không có học phí vẫn cần ngân sách sinh hoạt, bảo hiểm và các khoản đóng góp của trường.",
        ],
        sources: ["tuition", "budget"],
      },
      {
        id: "ngan-sach",
        title: "Chi phí du học Đức gồm những gì?",
        paragraphs: [
          "DAAD đưa ra khoảng tham khảo 900–1.200 euro/tháng cho sinh hoạt; thực tế tùy thành phố và tiền thuê nhà. Khoản chứng minh tài chính cho thị thực là yêu cầu riêng, không phải cam kết rằng mọi chi phí sẽ nằm trong mức đó.",
          "Khi lập dự toán, tách các nhóm sau để tránh bỏ sót chi phí ban đầu:",
        ],
        points: [
          "Học tiếng, thi chứng chỉ và thủ tục APS",
          "Dịch thuật, chứng thực, phí nộp hồ sơ và thị thực",
          "Học phí nếu có, Semesterbeitrag và bảo hiểm",
          "Vé máy bay, đặt cọc nhà và đồ dùng ban đầu",
          "Tiền thuê nhà, ăn uống, đi lại và dự phòng hằng tháng",
        ],
        sources: ["budget"],
      },
      {
        id: "nop-ho-so",
        title: "Ứng tuyển và xin thư mời nhập học",
        paragraphs: [
          "Tùy trường và hồ sơ, bạn nộp trực tiếp hoặc qua đơn vị như uni-assist. Một số lộ trình cần VPD; phải làm theo hướng dẫn của trường. Đối chiếu bằng cấp, bảng điểm, bản dịch và chứng chỉ ngoại ngữ trước khi gửi.",
          "Hạn nộp và kỳ nhập học không giống nhau ở mọi ngành. Ghi lại hạn của từng chương trình, thời gian chuẩn bị giấy tờ và bước nộp tiếp cho trường nếu có.",
        ],
        sources: ["application", "vpd"],
      },
      {
        id: "thi-thuc",
        title: "Tài chính và thị thực cho hồ sơ từ Việt Nam",
        paragraphs: [
          "Đối chiếu danh mục hiện hành của cơ quan đại diện Đức: giấy tờ nhập học, APS theo diện áp dụng, chứng chỉ ngoại ngữ, tài chính và bảo hiểm. Diện đã có chỗ học và diện tìm chỗ học có thể có yêu cầu khác nhau.",
          "Tài khoản phong tỏa là một cách chứng minh tài chính; học bổng hoặc giấy cam kết bảo lãnh cũng có thể được chấp nhận theo điều kiện. Kiểm tra mức tiền và giấy tờ đúng diện trước khi nộp.",
        ],
        sources: ["visa"],
      },
      {
        id: "lam-them",
        title: "Sinh viên có được làm thêm không?",
        paragraphs: [
          "Với giấy phép cư trú du học phù hợp, sinh viên từ nước ngoài có thể làm việc trong giới hạn cho phép. Quy tắc hiện hành có cách tính 140 ngày trọn hoặc 280 nửa ngày mỗi năm, hoặc theo cơ chế 20 giờ/tuần. Hãy kiểm tra trường hợp cụ thể và điều kiện trên giấy phép.",
          "Lập ngân sách trước khi sang Đức; thu nhập làm thêm không phải nguồn được bảo đảm. Điều kiện ở giai đoạn học tiếng hoặc dự bị cần được kiểm tra riêng.",
        ],
        sources: ["work"],
      },
    ],
    faqTitle: "Câu hỏi về du học đại học Đức",
    faqs: [
      {
        id: "du-bi",
        question: "Studienkolleg có phải chỉ để học đến C1?",
        answer:
          "Không. Chương trình chuẩn bị kiến thức học thuật và ngôn ngữ theo nhóm ngành, thường kết thúc bằng FSP. Việc có cần học dự bị hay không phụ thuộc điều kiện đầu vào của bạn.",
        source: "preparation",
      },
      {
        id: "ngon-ngu",
        question: "Có thể du học Đức bằng tiếng Anh không?",
        answer:
          "Có chương trình giảng dạy bằng tiếng Anh. Hãy kiểm tra chứng chỉ, điểm và điều kiện tuyển sinh trên trang của từng chương trình.",
        source: "language",
      },
      {
        id: "viec-lam",
        question: "Có thể làm thêm để tự trả mọi chi phí không?",
        answer:
          "Không nên dựa toàn bộ ngân sách vào việc làm thêm. Công việc và thu nhập không được bảo đảm; bạn vẫn phải đáp ứng yêu cầu tài chính của hồ sơ.",
        source: "budget",
      },
    ],
    relatedTitle: "Chuẩn bị lộ trình của bạn",
    coursesLabel: "Khoá tiếng Đức A1–C1",
    alternativeLabel: "Tìm hiểu du học nghề Ausbildung",
    cta: "Tư vấn du học đại học",
    shareHeadline: "DU HỌC ĐẠI HỌC ĐỨC",
    shareSubtitle: "Điều kiện · APS · Chi phí",
  },
  de: {
    title: "Studium in Deutschland: von der Studienwahl zur Bewerbung",
    reviewed: "Quellen geprüft am",
    contents: "In diesem Ratgeber",
    sourceLabel: "Quellen",
    sourcesTitle: "Offizielle Informationen zum Weiterlesen",
    intro:
      "Ein passender Studienweg berücksichtigt Ihre Vorbildung, Ihr Wunschfach, die Unterrichtssprache und Ihr Budget. Prüfen Sie die Vorgaben des einzelnen Studiengangs.",
    comparisonTitle: "Studium oder duale Ausbildung?",
    comparisonHeaders: ["Kriterium", "Studium", "Duale Ausbildung"],
    comparisonRows: [
      [
        "Schwerpunkt",
        "Akademische und fachliche Kenntnisse",
        "Praxis im Betrieb und Unterricht an der Berufsschule",
      ],
      [
        "Abschluss",
        "Hochschulabschluss nach Studiengang",
        "Berufsabschluss nach Ausbildung und Prüfung",
      ],
      [
        "Finanzierung",
        "Studien- und Lebenshaltungskosten selbst planen",
        "Ausbildungsvergütung; Budget trotzdem prüfen",
      ],
    ],
    sections: [
      {
        id: "dieu-kien-dai-hoc",
        title: "Hochschulzugang und Zulassung",
        paragraphs: [
          "Prüfen Sie, ob Ihre Vorbildung eine Hochschulzugangsberechtigung (HZB) ergibt. Möglich sind ein direkter, ein fachgebundener Zugang oder eine Vorbereitung am Studienkolleg. Nutzen Sie die DAAD-Zulassungsdatenbank und klären Sie Ihren Fall mit der Hochschule.",
          "Eine HZB garantiert keinen Platz im Wunschfach. Über die Zulassung und zusätzliche Auswahlkriterien entscheidet die Hochschule.",
        ],
        sources: ["admission"],
      },
      {
        id: "aps",
        title: "Die APS in Hanoi",
        paragraphs: [
          "Die APS prüft Hochschulzugang, Studienleistungen und in Vietnam erworbene Bildungsnachweise. Wählen Sie auf der APS-Website das Verfahren für Ihren Bildungsstand und Ihr Studienziel.",
          "Bereiten Sie konsistente Unterlagen zu Namen, Zeiträumen und Leistungen vor. Die APS ersetzt weder die Zulassung der Hochschule noch die Visumentscheidung.",
        ],
        sources: ["aps", "admission"],
      },
      {
        id: "studienkolleg",
        title: "Wer braucht ein Studienkolleg?",
        paragraphs: [
          "Ein Studienkolleg ist für Bewerbende gedacht, deren Vorbildung noch keinen direkten Hochschulzugang ermöglicht. Es dauert üblicherweise zwei Semester und führt zur Feststellungsprüfung (FSP). Es vermittelt fachliche und sprachliche Grundlagen.",
          "Wählen Sie den Schwerpunkt passend zum Wunschfach und prüfen Sie, für welche Hochschularten und Studiengänge der Abschluss anerkannt wird.",
        ],
        sources: ["preparation"],
      },
      {
        id: "ngoai-ngu",
        title: "B1, B2 oder C1?",
        paragraphs: [
          "Die Hochschule legt anerkannte Zertifikate und Ergebnisse fest. Häufige Prüfungen sind TestDaF, DSH und telc Deutsch C1 Hochschule. B1 oder B2 genügt nicht automatisch für jeden Studiengang; Vorbereitung und Fachstudium haben unterschiedliche Anforderungen.",
          "Englischsprachige Programme verlangen eigene Englischnachweise. Deutsch hilft im Alltag. Beachten Sie zusätzlich die Visumvorgaben in Vietnam.",
        ],
        sources: ["language", "visa"],
      },
      {
        id: "chon-nganh",
        title: "Das passende Fach wählen",
        paragraphs: [
          "Vergleichen Sie Ihre Interessen und Berufsvorstellungen mit Studieninhalten, Unterrichtssprache, Zulassung und Möglichkeiten für ein weiterführendes Studium.",
          "Erstellen Sie eine Hochschulliste mit Gebühren und Standortkosten. Lesen Sie die offiziellen Studiengangsseiten und fragen Sie bei Unklarheiten das International Office.",
        ],
        sources: ["programme"],
      },
      {
        id: "hoc-phi",
        title: "Ist ein Studium gebührenfrei?",
        paragraphs: [
          "Viele Bachelorprogramme an staatlichen Hochschulen sind ohne Studiengebühren. Ausnahmen hängen von Bundesland, Hochschule und Studiengang ab; private Hochschulen können Gebühren verlangen. Prüfen Sie die Regeln für Studierende aus Nicht-EU-Staaten.",
          "Der Semesterbeitrag ist von Studiengebühren zu unterscheiden. Auch ohne Studiengebühren entstehen Kosten für Leben, Versicherung und Hochschulbeiträge.",
        ],
        sources: ["tuition", "budget"],
      },
      {
        id: "ngan-sach",
        title: "Das persönliche Budget",
        paragraphs: [
          "Die DAAD nennt 900–1.200 Euro monatlich als Orientierung für Lebenshaltungskosten. Ihr Bedarf hängt besonders von Wohnort und Miete ab. Der Finanzierungsnachweis für das Visum ist eine gesonderte Vorgabe.",
          "Planen Sie insbesondere:",
        ],
        points: [
          "Sprachkurs, Prüfung und APS-Verfahren",
          "Übersetzungen, Beglaubigungen, Bewerbungs- und Visumkosten",
          "Gegebenenfalls Studiengebühren, Semesterbeitrag und Versicherung",
          "Flug, Mietkaution und Erstausstattung",
          "Miete, Essen, Mobilität und monatliche Rücklagen",
        ],
        sources: ["budget"],
      },
      {
        id: "nop-ho-so",
        title: "Bewerbung und Zulassungsbescheid",
        paragraphs: [
          "Je nach Hochschule und Vorbildung bewerben Sie sich direkt oder über Stellen wie uni-assist. Manche Verfahren verlangen eine VPD. Maßgeblich ist die Anleitung der Hochschule. Prüfen Sie Zeugnisse, Notenübersichten, Übersetzungen und Sprachnachweise.",
          "Fristen und Studienbeginn unterscheiden sich. Notieren Sie für jeden Studiengang den Abgabetermin, die Vorbereitung der Nachweise und gegebenenfalls die anschließende Bewerbung bei der Hochschule.",
        ],
        sources: ["application", "vpd"],
      },
      {
        id: "thi-thuc",
        title: "Finanzierung und Visum aus Vietnam",
        paragraphs: [
          "Prüfen Sie die aktuelle Liste der deutschen Vertretungen: Zulassungsunterlagen, APS nach einschlägigem Verfahren, Sprache, Finanzierung und Versicherung. Studienbewerbung und bereits gesicherter Studienplatz können unterschiedlichen Vorgaben unterliegen.",
          "Neben einem Sperrkonto können unter Voraussetzungen Stipendium oder Verpflichtungserklärung als Nachweis dienen. Prüfen Sie die Beträge und Dokumente für Ihren Aufenthaltszweck.",
        ],
        sources: ["visa"],
      },
      {
        id: "lam-them",
        title: "Arbeiten während des Studiums",
        paragraphs: [
          "Mit passendem Aufenthaltstitel ist Beschäftigung im erlaubten Rahmen möglich. Aktuell bestehen unter anderem Regelungen für 140 volle oder 280 halbe Arbeitstage jährlich oder die 20-Stunden-Woche. Prüfen Sie die konkrete Berechnung und Ihren Aufenthaltstitel.",
          "Ein Nebenjob ist keine gesicherte Finanzierung. Für Sprachkurs oder Studienvorbereitung sind die jeweiligen Bedingungen gesondert zu prüfen.",
        ],
        sources: ["work"],
      },
    ],
    faqTitle: "Häufige Fragen zum Studium",
    faqs: [
      {
        id: "du-bi",
        question: "Ist das Studienkolleg nur ein C1-Sprachkurs?",
        answer:
          "Nein. Es bereitet fachlich und sprachlich auf bestimmte Studienrichtungen vor und endet normalerweise mit der FSP. Ob es nötig ist, hängt von Ihrer Vorbildung ab.",
        source: "preparation",
      },
      {
        id: "ngon-ngu",
        question: "Kann ich auf Englisch studieren?",
        answer:
          "Es gibt englischsprachige Programme. Anerkannte Sprachnachweise, Ergebnisse und Zulassungskriterien finden Sie beim jeweiligen Studiengang.",
        source: "language",
      },
      {
        id: "viec-lam",
        question: "Kann ein Nebenjob sämtliche Kosten decken?",
        answer:
          "Planen Sie nicht ausschließlich damit. Eine Stelle und ausreichendes Einkommen sind nicht garantiert; die Finanzierungsvorgaben müssen Sie trotzdem erfüllen.",
        source: "budget",
      },
    ],
    relatedTitle: "Den eigenen Weg vorbereiten",
    coursesLabel: "Deutschkurse A1–C1",
    alternativeLabel: "Ausbildung als Alternative kennenlernen",
    cta: "Zum Studium beraten lassen",
    shareHeadline: "STUDIUM IN DEUTSCHLAND",
    shareSubtitle: "Zulassung · APS · Kosten",
  },
};

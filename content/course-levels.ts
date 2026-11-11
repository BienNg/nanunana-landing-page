import type { Locale } from "@/lib/i18n/locale";
import { courses } from "./courses";

export const courseLevels = ["a1", "a2", "b1", "b2", "c1"] as const;
export type CourseSlug = (typeof courseLevels)[number];
export function isCourseSlug(value: string): value is CourseSlug {
  return courseLevels.some((level) => level === value);
}
export function courseHref(id: string) {
  return isCourseSlug(id) ? `/niveau/${id}` : `/niveau#${id}-section`;
}
export function levelCourse(locale: Locale, id: CourseSlug) {
  return courses[locale].find((course) => course.id === id)!;
}

type LevelDetail = { audience: string; focus: string; practice: string[]; preparation: string };
export const courseDetails: Record<Locale, Record<CourseSlug, LevelDetail>> = {
  vi: {
    a1: {
      audience:
        "Dành cho bạn muốn bắt đầu với phát âm, từ vựng và những mẫu câu tiếng Đức cơ bản. Nếu đã từng học, hãy nói rõ phần bạn đã biết khi hỏi tư vấn để chọn lộ trình phù hợp.",
      focus:
        "Trọng tâm là làm quen với cách phát âm và ngữ pháp nền tảng, rồi dùng câu đơn giản để giới thiệu bản thân và giao tiếp trong tình huống hằng ngày.",
      practice: [
        "Tự giới thiệu tên, nơi ở và sở thích bằng vài câu ngắn.",
        "Đọc thành tiếng các từ mới, chú ý âm và trọng âm.",
        "Tập hỏi và trả lời một câu hỏi đơn giản về bản thân.",
      ],
      preparation:
        "Trước buổi học, bạn có thể chuẩn bị một cuốn sổ từ vựng và ghi lại mục tiêu học tiếng của mình. Ưu tiên ôn đều đặn từng phần phát âm và mẫu câu thay vì cố học nhiều từ cùng lúc.",
    },
    a2: {
      audience:
        "Phù hợp để tìm hiểu nếu bạn đã quen với câu đơn giản và muốn mở rộng khả năng giao tiếp về gia đình, công việc và nơi ở. Hãy mô tả nền tảng hiện tại khi hỏi về lớp A2.",
      focus:
        "Khoá học mở rộng từ vựng và ngữ pháp cho những chủ đề quen thuộc. Nội dung đã xác nhận gồm Perfekt, Präteritum và cách viết email, tin nhắn thông dụng.",
      practice: [
        "Kể lại ngắn gọn một việc đã làm hôm qua.",
        "Viết tin nhắn để hẹn hoặc thay đổi lịch gặp.",
        "Mô tả gia đình, nơi ở hoặc công việc bằng các câu nối tiếp.",
      ],
      preparation:
        "Bạn có thể ôn các mẫu câu cơ bản đã học và phân loại từ theo chủ đề. Khi viết email, tập xác định người nhận, lý do viết và thông tin cần hỏi trước khi chọn câu chữ.",
    },
    b1: {
      audience:
        "Dành cho bạn quan tâm đến học B1 và luyện thi, đặc biệt khi đang chuẩn bị lộ trình học tập hoặc học nghề tại Đức. Mức tiếng được chấp nhận vẫn phải kiểm tra theo từng hồ sơ và chương trình.",
      focus:
        "Khoá B1 rèn bốn kỹ năng nghe, nói, đọc, viết theo định dạng Goethe-Zertifikat. Các nội dung đã xác nhận gồm luyện đề B1 và chữa bài nói, viết cùng giáo viên.",
      practice: [
        "Trình bày ý kiến về một chủ đề quen thuộc và nêu lý do.",
        "Viết một đoạn có mở đầu, nội dung chính và kết thúc.",
        "Khi luyện đề, ghi lại lỗi lặp lại ở từng kỹ năng để ôn lại.",
      ],
      preparation:
        "Hãy mang theo mục tiêu cụ thể: học để giao tiếp, chuẩn bị hồ sơ hay luyện thi. Nếu đã có kết quả thi hoặc bài viết gần đây, bạn có thể dùng chúng để mô tả phần cần cải thiện khi tư vấn.",
    },
    b2: {
      audience:
        "Phù hợp để tìm hiểu nếu bạn muốn phát triển tiếng Đức cho học tập và công việc, từ trao đổi quen thuộc sang thảo luận và trình bày quan điểm rõ hơn.",
      focus:
        "Nội dung hướng đến thảo luận, trình bày quan điểm và đọc hiểu văn bản chuyên sâu hơn. Các trọng tâm đã xác nhận là lập luận, trình bày và văn phong học thuật, công sở.",
      practice: [
        "So sánh hai phương án và giải thích lựa chọn của mình.",
        "Đọc một bài viết rồi tóm tắt ý chính bằng lời của bạn.",
        "Chỉnh một email để người nhận hiểu rõ mục đích và đề nghị.",
      ],
      preparation:
        "Bạn có thể gom các chủ đề học tập hoặc nghề nghiệp mình thường gặp. Khi đọc và viết, chú ý cách tổ chức lập luận và mối liên hệ giữa các ý, ngoài việc học từ mới.",
    },
    c1: {
      audience:
        "Dành cho bạn quan tâm đến tiếng Đức ở môi trường đại học và chuyên môn: đọc văn bản học thuật, viết và trình bày mạch lạc. Hãy xác định yêu cầu chứng chỉ của nơi tiếp nhận trước khi chọn mục tiêu.",
      focus:
        "Khoá C1 tập trung vào văn bản học thuật, viết và thuyết trình. Nội dung đã xác nhận có chuẩn bị cho TestDaF, DSH và Goethe C1; hãy trao đổi về kỳ thi cụ thể khi tư vấn.",
      practice: [
        "Tóm tắt một văn bản học thuật và phân biệt ý chính với dẫn chứng.",
        "Lập dàn ý cho bài thuyết trình theo một chủ đề chuyên môn.",
        "Đọc lại bài viết để kiểm tra tính mạch lạc và cách dùng từ.",
      ],
      preparation:
        "Bạn có thể chọn trước lĩnh vực hoặc loại văn bản cần dùng thường xuyên. Nếu học để nộp hồ sơ đại học, hãy lưu yêu cầu chứng chỉ và mức điểm của chương trình để tư vấn sát mục tiêu.",
    },
  },
  de: {
    a1: {
      audience:
        "Für Interessierte, die mit deutscher Aussprache, Wortschatz und einfachen Sätzen beginnen möchten. Wenn Sie bereits gelernt haben, beschreiben Sie bei der Beratung Ihre bisherigen Kenntnisse.",
      focus:
        "Im Mittelpunkt stehen Aussprache und Grundgrammatik sowie einfache Sätze zur Vorstellung und für vertraute Alltagssituationen.",
      practice: [
        "Stellen Sie sich mit Namen, Wohnort und Interessen kurz vor.",
        "Lesen Sie neue Wörter laut und achten Sie auf Aussprache und Betonung.",
        "Üben Sie eine einfache Frage und Antwort zur eigenen Person.",
      ],
      preparation:
        "Ein Wortschatzheft und ein klares persönliches Lernziel helfen bei der Vorbereitung. Wiederholen Sie Aussprache und Satzmuster regelmäßig in kleinen Einheiten.",
    },
    a2: {
      audience:
        "Für Interessierte, die einfache Sätze kennen und über Familie, Arbeit und Wohnen ausführlicher sprechen möchten. Beschreiben Sie bei der Anfrage Ihre bisherigen Lerninhalte.",
      focus:
        "Der Kurs erweitert Wortschatz und Grammatik für vertraute Themen. Bestätigte Inhalte sind Perfekt, Präteritum sowie gebräuchliche E-Mails und Nachrichten.",
      practice: [
        "Erzählen Sie kurz von einer Tätigkeit am Vortag.",
        "Schreiben Sie eine Nachricht, um einen Termin zu vereinbaren oder zu verschieben.",
        "Beschreiben Sie Familie, Wohnort oder Arbeit in mehreren zusammenhängenden Sätzen.",
      ],
      preparation:
        "Wiederholen Sie bekannte Satzmuster und sammeln Sie Wörter nach Themen. Überlegen Sie vor einer E-Mail, an wen Sie schreiben, warum und welche Information Sie benötigen.",
    },
    b1: {
      audience:
        "Für Interessierte an B1 und Prüfungsvorbereitung, etwa auf dem Weg zu Studium oder Ausbildung in Deutschland. Welche Nachweise akzeptiert werden, hängt vom konkreten Verfahren und Programm ab.",
      focus:
        "Der Kurs trainiert Hören, Sprechen, Lesen und Schreiben im Goethe-Zertifikat-Format. Bestätigte Inhalte sind B1-Übungsprüfungen sowie die Besprechung von Sprech- und Schreibaufgaben mit der Lehrkraft.",
      practice: [
        "Äußern Sie zu einem vertrauten Thema eine Meinung mit Begründung.",
        "Schreiben Sie einen Text mit Einleitung, Hauptteil und Schluss.",
        "Notieren Sie bei Übungsprüfungen wiederkehrende Fehler pro Fertigkeit.",
      ],
      preparation:
        "Benennen Sie Ihr Ziel: Kommunikation, Bewerbung oder Prüfung. Vorhandene Prüfungsergebnisse oder eigene Texte können helfen, Ihren Unterstützungsbedarf bei der Beratung zu beschreiben.",
    },
    b2: {
      audience:
        "Für Interessierte, die Deutsch für Studium und Beruf weiterentwickeln und über vertraute Gespräche hinaus diskutieren und Standpunkte darstellen möchten.",
      focus:
        "Der Kurs behandelt Diskussionen, begründete Standpunkte und anspruchsvollere Texte. Bestätigte Schwerpunkte sind Argumentation, Präsentation und Sprache für Studium und Büro.",
      practice: [
        "Vergleichen Sie zwei Möglichkeiten und begründen Sie Ihre Wahl.",
        "Fassen Sie einen gelesenen Artikel mit eigenen Worten zusammen.",
        "Überarbeiten Sie eine E-Mail, damit Anliegen und Bitte klar erkennbar sind.",
      ],
      preparation:
        "Sammeln Sie Themen aus Ihrem Studien- oder Berufsalltag. Achten Sie beim Lesen und Schreiben neben neuem Wortschatz auf Argumentationsaufbau und die Verknüpfung von Gedanken.",
    },
    c1: {
      audience:
        "Für Interessierte an Deutsch für Hochschule und Fachwelt: akademische Texte verstehen, klar schreiben und vortragen. Klären Sie vorab die Nachweise, die Ihre Zielinstitution verlangt.",
      focus:
        "Der Kurs konzentriert sich auf akademische Texte, Schreiben und Präsentieren. Bestätigt ist die Vorbereitung auf TestDaF, DSH und Goethe C1; sprechen Sie bei der Beratung Ihre konkrete Prüfung an.",
      practice: [
        "Fassen Sie einen Fachtext zusammen und unterscheiden Sie Kernaussagen und Belege.",
        "Erstellen Sie eine Gliederung für einen fachlichen Vortrag.",
        "Prüfen Sie einen eigenen Text auf Zusammenhang und präzise Wortwahl.",
      ],
      preparation:
        "Wählen Sie Themen oder Textsorten, die Sie regelmäßig benötigen. Für eine Hochschulbewerbung halten Sie die verlangten Sprachzertifikate und Ergebnisse Ihres Studiengangs bereit.",
    },
  },
};

export const coursePageCopy = {
  vi: {
    overview: "Tất cả khoá học",
    duration: "Số buổi học",
    audience: "Khoá học này dành cho ai?",
    focus: "Nội dung và kỹ năng trọng tâm",
    practice: "Gợi ý tự luyện theo chủ đề",
    practiceNote:
      "Các ví dụ dưới đây giúp bạn hình dung cách tự ôn; không thay thế giáo trình của lớp.",
    preparation: "Chuẩn bị trước khi học",
    planning: "Thời gian, học phí và lịch học",
    planningText:
      "Số buổi không phải số tháng. Thời gian hoàn thành phụ thuộc số buổi mỗi tuần và lịch lớp thực tế. Hãy hỏi bảng học phí, hình thức học và lịch khai giảng hiện có khi tư vấn.",
    enquiry: "Tư vấn khoá học",
    details: "Xem nội dung khoá",
    roadmap: "Các trình độ khác",
    related: "Kết nối với mục tiêu của bạn",
    university: "Hướng dẫn du học đại học Đức",
    vocational: "Hướng dẫn du học nghề Đức",
    faq: "Câu hỏi về khoá học",
    durationQ: "Khoá học kéo dài bao lâu?",
    feesQ: "Học phí và lịch khai giảng thế nào?",
    feesA:
      "Liên hệ NaNu NaNa để nhận học phí, lịch lớp và hình thức học đang có cho trình độ này. Bạn có thể gửi yêu cầu tư vấn với khoá học đã được chọn sẵn.",
    certificateQ: "Học xong có tự động được cấp chứng chỉ thi không?",
    certificateA:
      "Không. Chuẩn bị kiến thức và luyện thi khác với việc đăng ký, dự thi và nhận chứng chỉ từ đơn vị tổ chức thi. Hãy hỏi rõ mục tiêu của khoá và yêu cầu chứng chỉ của nơi tiếp nhận.",
  },
  de: {
    overview: "Alle Kurse",
    duration: "Unterrichtseinheiten",
    audience: "Für wen ist der Kurs?",
    focus: "Inhalte und Schwerpunkte",
    practice: "Anregungen zum selbstständigen Üben",
    practiceNote:
      "Diese Beispiele veranschaulichen das eigene Wiederholen und ersetzen nicht den Lehrplan des Kurses.",
    preparation: "Vorbereitung auf das Lernen",
    planning: "Dauer, Gebühren und Termine",
    planningText:
      "Einheiten sind keine Monatsangabe. Die Gesamtdauer hängt von der wöchentlichen Häufigkeit und dem tatsächlichen Kursplan ab. Erfragen Sie aktuelle Gebühren, Unterrichtsform und Starttermine bei der Beratung.",
    enquiry: "Kursberatung anfragen",
    details: "Kursdetails ansehen",
    roadmap: "Weitere Niveaus",
    related: "Passend zu Ihrem Ziel",
    university: "Ratgeber zum Studium in Deutschland",
    vocational: "Ratgeber zur Ausbildung in Deutschland",
    faq: "Fragen zum Kurs",
    durationQ: "Wie lange dauert der Kurs?",
    feesQ: "Welche Gebühren und Starttermine gelten?",
    feesA:
      "Erfragen Sie bei NaNu NaNa die aktuellen Gebühren, Termine und Unterrichtsformen für dieses Niveau. Bei Ihrer Beratungsanfrage ist der Kurs bereits ausgewählt.",
    certificateQ: "Erhalte ich nach dem Kurs automatisch ein Prüfungszertifikat?",
    certificateA:
      "Nein. Lernen und Prüfungsvorbereitung sind von Anmeldung, Prüfung und Zertifikat der prüfenden Einrichtung zu unterscheiden. Klären Sie das Kursziel und die Nachweise, die Ihre Zielinstitution verlangt.",
  },
};

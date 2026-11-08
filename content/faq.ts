/**
 * FAQ — confirmed (ok) answers appear in production and in the FAQPage JSON-LD.
 */
import { dictionary } from "@/lib/i18n/dictionary";
import { ok, type Claim } from "./verify";

export type FaqItem = { id: string; question: string; answer: Claim };

export const faqSection = dictionary(
  {
    eyebrow: "Giải đáp thắc mắc",
    title: "Câu hỏi thường gặp",
    introLead: "Chưa thấy câu trả lời bạn cần?",
    introLink: "Nhắn Zalo",
    introTail: "hoặc để lại thông tin, chúng tôi sẽ liên hệ lại.",
    chatCta: "Nhắn Zalo",
  },
  {
    eyebrow: "Antworten",
    title: "Häufige Fragen",
    introLead: "Ihre Frage ist nicht dabei?",
    introLink: "Schreiben Sie uns per Zalo",
    introTail: "oder hinterlassen Sie Ihre Daten. Wir melden uns.",
    chatCta: "Per Zalo schreiben",
  },
);

export const faqs = dictionary<FaqItem[]>(
  [
    {
      id: "hoc-phi",
      question: "Học phí các khoá tiếng Đức là bao nhiêu?",
      answer: ok(
        "Học phí phụ thuộc vào trình độ và hình thức học (online hoặc tại lớp). Hãy để lại thông tin, tư vấn viên sẽ gửi bạn bảng học phí chi tiết và lịch khai giảng gần nhất.",
      ),
    },
    {
      id: "online-offline",
      question: "Có lớp online không? Lịch học như thế nào?",
      answer: ok(
        "NaNu NaNa có cả lớp online và lớp tại trung tâm ở TP. Hồ Chí Minh. Lịch học được sắp xếp theo khung giờ tối và cuối tuần để phù hợp với học sinh, sinh viên và người đi làm.",
      ),
    },
    {
      id: "a1-b1",
      question: "Học từ A1 đến B1 mất bao lâu?",
      answer: ok(
        "Thông thường khoảng 7–9 tháng nếu học đều đặn, tuỳ vào cường độ lớp và thời gian tự học của bạn.",
      ),
    },
    {
      id: "dieu-kien-du-hoc-nghe",
      question: "Điều kiện để đi du học nghề (Ausbildung) là gì?",
      answer: ok(
        "Thông thường bạn cần tốt nghiệp THPT, có chứng chỉ tiếng Đức (thường từ B1 trở lên, tuỳ ngành) và hợp đồng đào tạo với một cơ sở tại Đức. Điều kiện cụ thể phụ thuộc vào ngành nghề — hãy để lại thông tin để được tư vấn riêng.",
      ),
    },
    {
      id: "chi-phi-dai-hoc",
      question: "Chi phí du học đại học ở Đức khoảng bao nhiêu?",
      answer: ok(
        "Phần lớn trường công lập tại Đức không thu học phí (trừ một số bang), nhưng bạn cần tài khoản phong toả để chứng minh tài chính và chi phí sinh hoạt hằng tháng. Tư vấn viên sẽ giúp bạn ước tính cụ thể theo thành phố và chương trình học.",
      ),
    },
    {
      id: "b1-hay-b2",
      question: "Cần tiếng Đức B1 hay B2 để du học?",
      answer: ok(
        "Chứng chỉ B1 đã đủ để nộp hồ sơ vào một số trường đại học. Sau khi sang Đức, bạn sẽ theo học khóa dự bị một năm để đạt trình độ C1 trước khi bắt đầu chương trình đại học (Studium). Chúng tôi khuyến nghị bạn học đến B2: phần lớn các trường yêu cầu trình độ này, và B2 cũng giúp bạn chuẩn bị tốt hơn khi bắt đầu cuộc sống và học tập tại Đức.",
      ),
    },
  ],
  [
    {
      id: "hoc-phi",
      question: "Was kosten die Deutschkurse?",
      answer: ok(
        "Die Gebühr hängt vom Niveau und von der Form ab (online oder vor Ort). Hinterlassen Sie Ihre Daten, dann senden wir Ihnen die Preisliste und den nächsten Starttermin.",
      ),
    },
    {
      id: "online-offline",
      question: "Gibt es Online-Kurse? Wie sieht der Stundenplan aus?",
      answer: ok(
        "NaNu NaNa bietet Online-Kurse und Kurse am Standort in Ho-Chi-Minh-Stadt. Die Stunden liegen abends und am Wochenende, passend zu Schule, Studium und Beruf.",
      ),
    },
    {
      id: "a1-b1",
      question: "Wie lange dauert der Weg von A1 bis B1?",
      answer: ok(
        "In der Regel etwa 7–9 Monate bei regelmäßigem Lernen, je nach Kursdichte und Ihrer Zeit zum Selbstlernen.",
      ),
    },
    {
      id: "dieu-kien-du-hoc-nghe",
      question: "Welche Voraussetzungen gelten für eine Ausbildung?",
      answer: ok(
        "In der Regel brauchen Sie den Schulabschluss der Oberstufe, ein Deutschniveau (oft ab B1, je nach Beruf) und einen Ausbildungsvertrag in Deutschland. Die genauen Bedingungen hängen vom Beruf ab — hinterlassen Sie Ihre Daten für eine persönliche Beratung.",
      ),
    },
    {
      id: "chi-phi-dai-hoc",
      question: "Was kostet ein Studium in Deutschland ungefähr?",
      answer: ok(
        "Die meisten staatlichen Hochschulen erheben keine Studiengebühren (mit Ausnahmen in einzelnen Ländern). Sie brauchen ein Sperrkonto als Finanzierungsnachweis und Geld für die Lebenshaltung. Wir schätzen die Kosten mit Ihnen nach Stadt und Programm.",
      ),
    },
    {
      id: "b1-hay-b2",
      question: "Brauche ich B1 oder B2 für das Studium?",
      answer: ok(
        "B1 reicht für die Bewerbung an einigen Hochschulen. Nach der Ankunft folgt oft ein Studienkolleg, bis Sie C1 erreichen und das Studium beginnen. Wir empfehlen B2: Die meisten Hochschulen verlangen dieses Niveau, und B2 trägt Sie besser in den Alltag und ins Lernen in Deutschland.",
      ),
    },
  ],
);

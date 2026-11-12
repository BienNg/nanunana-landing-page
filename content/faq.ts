/**
 * FAQ — confirmed (ok) answers appear in production and in the FAQPage JSON-LD.
 */
import { dictionary } from "@/lib/i18n/dictionary";
import { ok, type Claim } from "./verify";
import { courseFees, formatVnd, type CourseFee } from "./pricing";

const listedFees = (["a1", "a2", "b1", "b2"] as const).map((level) => {
  const claim = courseFees[level];
  if (claim.status !== "ok" || !claim.value) throw new Error(`${level} fee must be confirmed`);
  return [level.toUpperCase(), claim.value] as [string, CourseFee];
});
const feeList = (key: keyof CourseFee) =>
  listedFees.map(([level, fee]) => `${level} ${formatVnd(fee[key])}`).join(", ");

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
        `Học phí cả khoá: ${feeList("regular")}. Nếu đóng học phí trước ngày khai giảng ít nhất 1 tuần: ${feeList("early")}. Giá như nhau cho lớp online và lớp tại trung tâm, và học viên được tặng kèm app học tiếng Đức. Hãy để lại thông tin để nhận lịch khai giảng gần nhất.`,
      ),
    },
    {
      id: "hoan-hoc-phi",
      question: "Nếu học thử không hợp thì có được hoàn học phí không?",
      answer: ok(
        "Với lớp online: có. NaNu NaNa hoàn lại 100% học phí nếu bạn không hài lòng sau 2 buổi học đầu.",
      ),
    },
    {
      id: "online-offline",
      question: "Có lớp online không? Lịch học như thế nào?",
      answer: ok(
        "NaNu NaNa có cả lớp online và lớp tại trung tâm ở Hà Nội và TP. Hồ Chí Minh. Lịch học được sắp xếp theo khung giờ tối và cuối tuần để phù hợp với học sinh, sinh viên và người đi làm.",
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
        "Nhiều chương trình cử nhân tại trường công không thu học phí, nhưng có ngoại lệ theo bang, trường và chương trình. Bạn vẫn cần dự trù khoản đóng góp học kỳ, bảo hiểm, sinh hoạt và chứng minh tài chính theo diện thị thực. Tư vấn viên sẽ giúp bạn ước tính theo thành phố và chương trình học.",
      ),
    },
    {
      id: "b1-hay-b2",
      question: "Cần tiếng Đức B1 hay B2 để du học?",
      answer: ok(
        "Yêu cầu phụ thuộc trường, chương trình và lộ trình nhập học. Điều kiện cho dự bị hoặc thị thực không đồng nghĩa với điều kiện vào học chuyên ngành. Studienkolleg chuẩn bị cả kiến thức học thuật và ngoại ngữ, không chỉ là khóa học để đạt C1. Hãy kiểm tra chứng chỉ và mức điểm mà chương trình bạn chọn chấp nhận.",
      ),
    },
  ],
  [
    {
      id: "hoc-phi",
      question: "Was kosten die Deutschkurse?",
      answer: ok(
        `Gebühr für den ganzen Kurs: ${feeList("regular")}. Wenn Sie mindestens 1 Woche vor Kursbeginn zahlen: ${feeList("early")}. Die Preise gelten online wie vor Ort, die Lern-App ist inklusive. Hinterlassen Sie Ihre Daten, dann senden wir Ihnen den nächsten Starttermin.`,
      ),
    },
    {
      id: "hoan-hoc-phi",
      question: "Bekomme ich mein Geld zurück, wenn der Kurs nicht passt?",
      answer: ok(
        "Bei Online-Kursen ja: NaNu NaNa erstattet 100 % der Gebühr, wenn Sie nach den ersten 2 Einheiten nicht zufrieden sind.",
      ),
    },
    {
      id: "online-offline",
      question: "Gibt es Online-Kurse? Wie sieht der Stundenplan aus?",
      answer: ok(
        "NaNu NaNa bietet Online-Kurse und Kurse an den Standorten Hanoi und Ho-Chi-Minh-Stadt. Die Stunden liegen abends und am Wochenende, passend zu Schule, Studium und Beruf.",
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
        "Viele Bachelorprogramme an staatlichen Hochschulen sind ohne Studiengebühren; Ausnahmen hängen von Bundesland, Hochschule und Studiengang ab. Planen Sie Semesterbeitrag, Versicherung, Lebenshaltung und den Finanzierungsnachweis für Ihren Aufenthaltszweck ein. Wir schätzen die Kosten mit Ihnen nach Stadt und Programm.",
      ),
    },
    {
      id: "b1-hay-b2",
      question: "Brauche ich B1 oder B2 für das Studium?",
      answer: ok(
        "Die Vorgaben hängen von Hochschule, Studiengang und Zugangsweg ab. Anforderungen für Vorbereitung oder Visum sind nicht automatisch die Zulassungsvoraussetzungen für das Fachstudium. Ein Studienkolleg bereitet fachlich und sprachlich vor und ist kein reiner C1-Kurs. Prüfen Sie die anerkannten Zertifikate und Ergebnisse beim gewählten Studiengang.",
      ),
    },
  ],
);

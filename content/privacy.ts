import { dictionary } from "@/lib/i18n/dictionary";
import { site } from "./site";

export const privacyCopy = dictionary(
  {
    title: "Chính sách bảo mật",
    description: `Chính sách bảo mật và xử lý dữ liệu cá nhân của ${site.legalName}.`,
    heading: "Chính sách bảo mật",
    intro: "tôn trọng và bảo vệ dữ liệu cá nhân của bạn.",
    bindingNote: "",
    contactLabel: "Điện thoại",
    sections: [
      {
        title: "1. Thông tin chúng tôi thu thập",
        body: "Khi bạn gửi yêu cầu tư vấn, chúng tôi nhận: họ và tên, số điện thoại/Zalo, khoá học và mục tiêu quan tâm, nội dung câu hỏi, cùng thông tin kỹ thuật về nguồn truy cập (ví dụ: UTM, trang giới thiệu). Khi bạn xem trang, trang tự ghi số lần ghé, nút bạn bấm, thời gian từng mục nằm trên màn hình, và thành phố cùng quốc gia suy ra từ mạng của máy chủ. Phần này không lưu địa chỉ IP và không gắn với họ tên hay số điện thoại. Một mã ngẫu nhiên trong trình duyệt giúp đếm người xem khác nhau. Khi được cấu hình, Vercel Analytics, Google Analytics và Meta Pixel cũng ghi lượt xem và nút liên hệ. Chúng tôi không nhận nội dung tin nhắn bạn gửi trên Zalo, Messenger hay WhatsApp.",
      },
      {
        title: "2. Mục đích sử dụng",
        body: "Thông tin được dùng để liên hệ tư vấn khoá học và du học theo yêu cầu của bạn, và để cải thiện chất lượng dịch vụ.",
      },
      {
        title: "3. Lưu trữ và chia sẻ",
        body: "Yêu cầu tư vấn được gửi vào kênh Slack nội bộ của NaNu NaNa thông qua Zapier, để nhân viên liên hệ lại. Chúng tôi không gửi nội dung yêu cầu tư vấn qua email. Số liệu hành vi (lượt ghé, nút bấm, thời gian xem từng mục, thành phố và quốc gia) được lưu riêng trên Redis, không kèm họ tên hay số điện thoại.",
      },
      {
        title: "4. Quyền của bạn",
        body: "Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xoá dữ liệu cá nhân của mình, và rút lại sự đồng ý bất cứ lúc nào bằng cách liên hệ với chúng tôi.",
      },
      {
        title: "5. Liên hệ",
        body: "",
      },
    ],
  },
  {
    title: "Datenschutz",
    description: `Datenschutz und Umgang mit personenbezogenen Daten bei ${site.legalName}.`,
    heading: "Datenschutz",
    intro: "achtet Ihre personenbezogenen Daten und schützt sie.",
    bindingNote: "Die vietnamesische Fassung ist die verbindliche Version dieser Erklärung.",
    contactLabel: "Telefon",
    sections: [
      {
        title: "1. Welche Daten wir erhalten",
        body: "Wenn Sie eine Beratung anfragen, erhalten wir: Name, Telefonnummer oder Zalo, den Kurs und das Ziel, das Sie interessiert, Ihre Frage sowie technische Angaben zur Herkunft des Besuchs (zum Beispiel UTM und die verweisende Seite). Beim Ansehen der Seite zählt die Seite Besuche, welche Schaltflächen Sie wählen, wie lange ein Abschnitt auf dem Bildschirm liegt, und Stadt sowie Land, abgeleitet aus dem Netz des Servers. Dabei speichern wir keine IP-Adresse und verknüpfen die Angaben nicht mit Name oder Telefonnummer. Ein zufälliger Code im Browser hilft, verschiedene Besucher zu zählen. Wenn sie eingerichtet sind, zeichnen Vercel Analytics, Google Analytics und das Meta-Pixel ebenfalls Aufrufe und Kontaktklicks auf. Den Inhalt Ihrer Nachrichten auf Zalo, Messenger oder WhatsApp erhalten wir nicht.",
      },
      {
        title: "2. Wozu wir sie nutzen",
        body: "Die Angaben dienen dazu, Sie zur Beratung über Kurse und den Weg nach Deutschland zu kontaktieren, und dazu, den Service zu verbessern.",
      },
      {
        title: "3. Speicherung und Weitergabe",
        body: "Beratungsanfragen gehen über Zapier in den internen Slack-Kanal von NaNu NaNa, damit das Team sich melden kann. Wir senden den Inhalt der Anfrage nicht per E-Mail. Verhaltenszahlen (Besuche, Klicks, Betrachtungszeit je Abschnitt, Stadt und Land) liegen getrennt in Redis, ohne Name und ohne Telefonnummer.",
      },
      {
        title: "4. Ihre Rechte",
        body: "Sie können Auskunft, Berichtigung oder Löschung Ihrer personenbezogenen Daten verlangen und Ihre Einwilligung jederzeit widerrufen, indem Sie uns kontaktieren.",
      },
      {
        title: "5. Kontakt",
        body: "",
      },
    ],
  },
);

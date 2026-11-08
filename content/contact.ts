import { dictionary } from "@/lib/i18n/dictionary";
import { ok } from "./verify";

export const contactSection = dictionary(
  {
    badge: ok("Hỗ trợ 24/7"),
    title: "Liên hệ ngay",
    intro:
      "Nếu bạn muốn đăng ký khóa học, cần hỗ trợ để làm việc hoặc học tập tại Đức, hoặc có bất kỳ câu hỏi nào, hãy liên hệ với mình trên Facebook hoặc Zalo, đừng ngại nha!",
    channelsTitle: "Nhắn trực tiếp",
    formTitle: ok("Đăng ký tư vấn"),
    channels: {
      zalo: "Nhắn tin Zalo",
      messenger: "Facebook Messenger",
      whatsapp: "WhatsApp",
      phone: "Gọi hotline",
    },
  },
  {
    badge: ok("Erreichbar rund um die Uhr"),
    title: "Sprechen Sie mit uns",
    intro:
      "Wenn Sie einen Kurs buchen, Unterstützung für Arbeit oder Studium in Deutschland brauchen oder eine Frage haben, schreiben Sie uns auf Facebook oder Zalo.",
    channelsTitle: "Direkt schreiben",
    formTitle: ok("Beratung anfragen"),
    channels: {
      zalo: "Per Zalo schreiben",
      messenger: "Facebook Messenger",
      whatsapp: "WhatsApp",
      phone: "Anrufen",
    },
  },
);

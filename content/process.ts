import { dictionary } from "@/lib/i18n/dictionary";
import { ok, type Claim } from "./verify";
import { sectionIds } from "./nav";

export type ProcessStep = {
  id: string;
  title: string;
  description: Claim;
};

export type ProcessTrack = {
  id: (typeof sectionIds)["processUniversity"] | (typeof sectionIds)["processVocational"];
  eyebrow: string;
  /** Short label on the Studium / Ausbildung switch. */
  switchLabel: string;
  title: string;
  intro: string;
  steps: ProcessStep[];
};

export const processSection = dictionary(
  {
    eyebrow: "Từng bước rõ ràng",
    title: "Lộ trình cùng NaNu NaNa",
    intro:
      "Chọn con đường của bạn để xem từng bước, từ buổi tư vấn đầu tiên đến những ngày đầu ở Đức.",
    stepPrefix: "Bước ",
    switchAria: "Chọn lộ trình",
  },
  {
    eyebrow: "Schritt für Schritt",
    title: "Ihr Weg mit NaNu NaNa",
    intro:
      "Wählen Sie Ihren Weg und sehen Sie jeden Schritt, vom ersten Gespräch bis zu den ersten Tagen in Deutschland.",
    stepPrefix: "Schritt ",
    switchAria: "Weg wählen",
  },
);

export const processTracks = dictionary<ProcessTrack[]>(
  [
    {
      id: sectionIds.processUniversity,
      eyebrow: "Studium",
      switchLabel: "Du học đại học",
      title: "Lộ trình du học đại học",
      intro:
        "Từ buổi tư vấn đầu tiên đến những ngày đầu trên giảng đường — bạn luôn biết bước tiếp theo là gì.",
      steps: [
        {
          id: "tu-van",
          title: "Tư vấn định hướng",
          description: ok(
            "Trao đổi 1:1 để hiểu mục tiêu, trình độ và điều kiện của bạn, từ đó chọn chương trình đại học phù hợp.",
          ),
        },
        {
          id: "hoc-tieng",
          title: "Học tiếng Đức",
          description: ok(
            "Học theo lộ trình từ A1 cùng đội ngũ giáo viên có nhiều năm học tập, sinh sống và làm việc tại Đức.",
          ),
        },
        {
          id: "ho-so",
          title: "Hồ sơ & Zulassung",
          description: ok("Hướng dẫn quy trình thẩm định APS và xin Zulassung (thư mời nhập học)."),
        },
        {
          id: "visa",
          title: "Xin visa",
          description: ok(
            "Chuẩn bị đầy đủ giấy tờ và đồng hành xuyên suốt quy trình xin visa du học đại học.",
          ),
        },
        {
          id: "sang-duc",
          title: "Sang Đức & hỗ trợ sau khi đến",
          description: ok(
            "Đồng hành khi bạn đặt chân tới Đức và trong khoảng thời gian bắt đầu chương trình học.",
          ),
        },
      ],
    },
    {
      id: sectionIds.processVocational,
      eyebrow: "Ausbildung",
      switchLabel: "Du học nghề",
      title: "Lộ trình du học nghề",
      intro:
        "Từ buổi tư vấn đầu tiên đến ngày bắt đầu chương trình Ausbildung — bạn luôn biết bước tiếp theo là gì.",
      steps: [
        {
          id: "tu-van",
          title: "Tư vấn định hướng",
          description: ok(
            "Trao đổi 1:1 để hiểu mục tiêu, trình độ và điều kiện của bạn, từ đó chọn ngành nghề phù hợp.",
          ),
        },
        {
          id: "hoc-tieng",
          title: "Học tiếng Đức",
          description: ok(
            "Học theo lộ trình từ A1 cùng đội ngũ giáo viên có nhiều năm học tập, sinh sống và làm việc tại Đức.",
          ),
        },
        {
          id: "ho-so",
          title: "Hồ sơ du học nghề",
          description: ok("Tư vấn và đồng hành làm hồ sơ du học nghề."),
        },
        {
          id: "visa",
          title: "Xin visa",
          description: ok(
            "Chuẩn bị đầy đủ giấy tờ và đồng hành xuyên suốt quy trình xin visa du học nghề.",
          ),
        },
        {
          id: "sang-duc",
          title: "Sang Đức & bắt đầu học nghề",
          description: ok("Ở bên cạnh bạn khi đặt chân tới Đức và bắt đầu chương trình học nghề."),
        },
      ],
    },
  ],
  [
    {
      id: sectionIds.processUniversity,
      eyebrow: "Studium",
      switchLabel: "Studium",
      title: "Weg zum Studium",
      intro:
        "Vom ersten Gespräch bis zu den ersten Tagen im Hörsaal wissen Sie immer, was als Nächstes kommt.",
      steps: [
        {
          id: "tu-van",
          title: "Orientierung",
          description: ok(
            "Ein Gespräch unter vier Augen zu Ziel, Niveau und Voraussetzungen, danach das passende Studium.",
          ),
        },
        {
          id: "hoc-tieng",
          title: "Deutsch lernen",
          description: ok(
            "Der Weg ab A1 mit Lehrkräften, die lange in Deutschland studiert, gelebt und gearbeitet haben.",
          ),
        },
        {
          id: "ho-so",
          title: "Unterlagen & Zulassung",
          description: ok("Begleitung bei der APS-Prüfung und der Zulassung."),
        },
        {
          id: "visa",
          title: "Visum",
          description: ok("Unterlagen vollständig vorbereiten und das Visumverfahren begleiten."),
        },
        {
          id: "sang-duc",
          title: "Ankunft & Start",
          description: ok(
            "Begleitung bei Ihrer Ankunft in Deutschland und zum Start des Studiums.",
          ),
        },
      ],
    },
    {
      id: sectionIds.processVocational,
      eyebrow: "Ausbildung",
      switchLabel: "Ausbildung",
      title: "Weg zur Ausbildung",
      intro:
        "Vom ersten Gespräch bis zum Start der Ausbildung wissen Sie immer, was als Nächstes kommt.",
      steps: [
        {
          id: "tu-van",
          title: "Orientierung",
          description: ok(
            "Ein Gespräch unter vier Augen zu Ziel, Niveau und Voraussetzungen, danach der passende Beruf.",
          ),
        },
        {
          id: "hoc-tieng",
          title: "Deutsch lernen",
          description: ok(
            "Der Weg ab A1 mit Lehrkräften, die lange in Deutschland studiert, gelebt und gearbeitet haben.",
          ),
        },
        {
          id: "ho-so",
          title: "Bewerbung Ausbildung",
          description: ok("Beratung und Begleitung der Bewerbung."),
        },
        {
          id: "visa",
          title: "Visum",
          description: ok("Unterlagen vollständig vorbereiten und das Visumverfahren begleiten."),
        },
        {
          id: "sang-duc",
          title: "Ankunft & Start der Ausbildung",
          description: ok("An Ihrer Seite bei der Ankunft und zum Start der Ausbildung."),
        },
      ],
    },
  ],
);

/**
 * Online German course page (/hoc-tieng-duc-online).
 *
 * Confirmed facts come from published copy: the FAQ (online classes, evening and
 * weekend times), courses.ts (A1–C1, online or on site) and the online teacher
 * job ad in careers.ts (Zoom, 90-minute lessons, prepared material, teachers
 * living in Germany, learners in Vietnam and in Germany).
 * Group size, price and 1-on-1 lessons were confirmed by NaNu NaNa on 2026-11-11.
 */
import { ok, type Claim } from "./verify";
import type { Locale } from "@/lib/i18n/locale";

export const onlineHref = "/hoc-tieng-duc-online";

type Fact = { label: string; value: Claim };

type OnlineCopy = {
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  enquiry: string;
  message: string;
  factsTitle: string;
  facts: Fact[];
  whoTitle: string;
  who: { heading: string; text: Claim }[];
  howTitle: string;
  how: Claim<string[]>;
  levelsTitle: string;
  levelsText: string;
  openTitle: string;
  openText: string;
  shareSubtitle: string;
};

export const onlineCopy: Record<Locale, OnlineCopy> = {
  vi: {
    eyebrow: "NaNu NaNa · Online",
    title: "Học tiếng Đức online",
    metaTitle: "Học tiếng Đức online A1–C1",
    description:
      "Lớp tiếng Đức online A1–C1 qua Zoom với giáo viên đang sống tại Đức. Học buổi tối và cuối tuần, từ Việt Nam hoặc từ Đức.",
    intro:
      "Học tiếng Đức từ A1 đến C1 qua Zoom, cùng giáo viên đang sống và làm việc tại Đức. Lớp online phù hợp với học sinh, sinh viên và người đi làm ở Việt Nam, và với người Việt đang sống tại Đức.",
    enquiry: "Hỏi tư vấn lớp online",
    message: "Tôi muốn được tư vấn về lớp tiếng Đức online.",
    factsTitle: "Lớp online ở NaNu NaNa",
    facts: [
      { label: "Nền tảng", value: ok("Zoom") },
      { label: "Thời lượng mỗi buổi", value: ok("90 phút") },
      { label: "Trình độ", value: ok("A1 đến C1") },
      { label: "Lịch học", value: ok("Buổi tối và cuối tuần") },
      {
        label: "Sĩ số lớp",
        value: ok("5–9 học viên"),
      },
      {
        label: "Học phí",
        value: ok("Từ 5.900.000 VND"),
      },
    ],
    whoTitle: "Lớp online dành cho ai?",
    who: [
      {
        heading: "Học viên ở Việt Nam",
        text: ok(
          "Bạn ở xa trung tâm hoặc bận đi học, đi làm: học tại nhà theo khung giờ tối và cuối tuần.",
        ),
      },
      {
        heading: "Người Việt đang sống tại Đức",
        text: ok("Đã sống tại Đức và muốn nâng trình độ tiếng Đức: tham gia lớp Online Đức."),
      },
      {
        heading: "Học 1 kèm 1",
        text: ok(
          "Học riêng với một giáo viên, theo lịch của bạn. Theo yêu cầu, hãy liên hệ để được tư vấn.",
        ),
      },
    ],
    howTitle: "Một buổi học online diễn ra thế nào",
    how: ok([
      "Lớp học trực tiếp qua Zoom, mỗi buổi 90 phút.",
      "Giáo viên dạy theo giáo trình NaNu NaNa đã soạn sẵn cho từng trình độ.",
      "Giáo viên đang sống và làm việc tại Đức, nên bạn học cả tiếng Đức dùng hằng ngày.",
    ]),
    levelsTitle: "Chọn trình độ",
    levelsText:
      "Lớp online đi theo cùng lộ trình A1–C1 như lớp tại trung tâm. Xem nội dung từng trình độ:",
    openTitle: "Lớp online đang học",
    openText:
      "Danh sách lớp hiện tại (kể cả lớp Online VN và Online Đức) nằm ở trang chủ. Hãy để lại thông tin để được xếp vào lớp phù hợp với trình độ và lịch của bạn.",
    shareSubtitle: "Zoom · A1–C1 · Buổi tối & cuối tuần",
  },
  de: {
    eyebrow: "NaNu NaNa · Online",
    title: "Deutsch online lernen",
    metaTitle: "Deutschkurs online A1–C1",
    description:
      "Online-Deutschkurse von A1 bis C1 über Zoom, mit Lehrkräften, die in Deutschland leben. Abends und am Wochenende, aus Vietnam oder Deutschland.",
    intro:
      "Lernen Sie Deutsch von A1 bis C1 über Zoom, mit Lehrkräften, die in Deutschland leben und arbeiten. Die Online-Kurse passen für Lernende in Vietnam und für Vietnamesinnen und Vietnamesen, die schon in Deutschland leben.",
    enquiry: "Beratung zum Online-Kurs",
    message: "Ich interessiere mich für einen Online-Deutschkurs.",
    factsTitle: "Online-Kurse bei NaNu NaNa",
    facts: [
      { label: "Plattform", value: ok("Zoom") },
      { label: "Dauer pro Einheit", value: ok("90 Minuten") },
      { label: "Niveau", value: ok("A1 bis C1") },
      { label: "Zeiten", value: ok("Abends und am Wochenende") },
      {
        label: "Gruppengröße",
        value: ok("5–9 Teilnehmende"),
      },
      {
        label: "Gebühr",
        value: ok("Ab 5.900.000 VND"),
      },
    ],
    whoTitle: "Für wen sind die Online-Kurse?",
    who: [
      {
        heading: "Lernende in Vietnam",
        text: ok(
          "Sie wohnen weit vom Standort entfernt oder sind in Schule, Studium oder Beruf eingebunden: Lernen Sie abends und am Wochenende von zu Hause.",
        ),
      },
      {
        heading: "Vietnamesen in Deutschland",
        text: ok(
          "Sie leben schon in Deutschland und möchten Ihr Deutsch verbessern: im Kurs Online Deutschland.",
        ),
      },
      {
        heading: "Einzelunterricht",
        text: ok(
          "Unterricht allein mit einer Lehrkraft, nach Ihrem Zeitplan. Auf Anfrage, sprechen Sie uns an.",
        ),
      },
    ],
    howTitle: "So läuft eine Online-Einheit ab",
    how: ok([
      "Live-Unterricht über Zoom, 90 Minuten pro Einheit.",
      "Die Lehrkräfte unterrichten mit dem vorbereiteten NaNu-NaNa-Material für jedes Niveau.",
      "Die Lehrkräfte leben und arbeiten in Deutschland und bringen Alltagsdeutsch mit.",
    ]),
    levelsTitle: "Niveau wählen",
    levelsText:
      "Die Online-Kurse folgen demselben Weg von A1 bis C1 wie die Kurse vor Ort. Die Inhalte je Niveau:",
    openTitle: "Laufende Online-Kurse",
    openText:
      "Die aktuelle Kursliste (auch Online Vietnam und Online Deutschland) steht auf der Startseite. Hinterlassen Sie Ihre Daten, dann finden wir einen Kurs, der zu Niveau und Zeitplan passt.",
    shareSubtitle: "Zoom · A1–C1 · Abends & Wochenende",
  },
};

/**
 * The two study pathways. Intros are from docs/old-site-content.md.
 */
import { dictionary } from "@/lib/i18n/dictionary";
import type { GoalValue } from "./form-options";
import type { ImageKey } from "./images";
import { ok, type Claim } from "./verify";

export type Pathway = {
  id: "du-hoc-dai-hoc" | "du-hoc-nghe";
  eyebrow: string;
  title: string;
  tagline?: string;
  paragraphs: string[];
  highlight: Claim;
  bullets: Claim[];
  image: ImageKey;
  goal: GoalValue;
  cta: string;
  pageTitle: string;
  pageDescription: string;
};

export const pathwaysSection = dictionary(
  {
    eyebrow: "Chọn lựa tương lai",
    title: "Hai con đường tới nước Đức",
    intro:
      "Dù bạn chọn giảng đường đại học hay chương trình đào tạo nghề, NaNu NaNa đồng hành cùng bạn từ lúc định hướng đến khi bạn đặt chân tới Đức.",
    more: "Xem thêm",
  },
  {
    eyebrow: "Ihre Zukunft",
    title: "Zwei Wege nach Deutschland",
    intro:
      "Ob Hörsaal oder Ausbildung: NaNu NaNa begleitet Sie von der ersten Orientierung bis zu Ihrer Ankunft in Deutschland.",
    more: "Mehr dazu",
  },
);

export const pathways = dictionary<Pathway[]>(
  [
    {
      id: "du-hoc-dai-hoc",
      eyebrow: "Studium in Deutschland",
      title: "Du học đại học — Chúng tôi đồng hành cùng bạn!",
      paragraphs: [
        "Học tập tại Đức mở ra vô số cơ hội hấp dẫn, nhưng bạn nên bắt đầu từ đâu?",
        "Với sự hỗ trợ của chúng tôi, bạn không chỉ tìm thấy chương trình học phù hợp mà còn được chúng tôi giải đáp các thắc mắc khi chuẩn bị hồ sơ du học cũng như hướng dẫn và đồng hành cùng bạn trên hành trình trước và sau khi sang Đức.",
        "Hãy cùng nhau biến ước mơ du học Đức của bạn thành hiện thực nha!",
      ],
      highlight: ok("Học phí tùy trường và chương trình"),
      bullets: [
        ok("Tìm chương trình học phù hợp với bạn"),
        ok("Giải đáp thắc mắc khi chuẩn bị hồ sơ du học"),
        ok("Hướng dẫn quy trình thẩm định APS và xin Zulassung (thư mời nhập học)"),
        ok("Hướng dẫn và đồng hành trước và sau khi sang Đức"),
      ],
      image: "pathwayUniversity",
      goal: "du-hoc-dai-hoc",
      cta: "Tư vấn du học đại học",
      pageTitle: "Du học đại học tại Đức",
      pageDescription:
        "Du học đại học Đức: điều kiện, APS, Studienkolleg, ngoại ngữ, học phí và hồ sơ. Hướng dẫn có nguồn chính thức cùng lộ trình hỗ trợ của NaNu NaNa.",
    },
    {
      id: "du-hoc-nghe",
      eyebrow: "Ausbildung",
      title: "Du học nghề (Ausbildung)",
      tagline: "Sự kết hợp hoàn hảo giữa kỹ năng thực tế và chất lượng đào tạo bài bản.",
      paragraphs: [
        "Chúng tôi đồng hành và tư vấn làm hồ sơ du học nghề tại Đức. Từ việc định hướng lựa chọn ngành nghề phù hợp cho tới khi đặt chân tới Đức và khoảng thời gian khi bắt đầu chương trình học nghề, chúng tôi sẽ luôn ở bên cạnh bạn và hỗ trợ bạn trên hành trình này!",
      ],
      highlight: ok("Lương đào tạo theo hợp đồng"),
      bullets: [
        ok("Định hướng lựa chọn ngành nghề phù hợp"),
        ok("Tư vấn và đồng hành làm hồ sơ du học nghề"),
        ok("Kiểm tra lương đào tạo và yêu cầu tài chính theo từng hồ sơ"),
        ok("Ở bên cạnh bạn khi đặt chân tới Đức và bắt đầu chương trình học nghề"),
      ],
      image: "pathwayVocational",
      goal: "du-hoc-nghe",
      cta: "Tư vấn du học nghề",
      pageTitle: "Du học nghề (Ausbildung) tại Đức",
      pageDescription:
        "Du học nghề Đức: điều kiện, thời gian, ngành nghề, lương và chi phí Ausbildung. Hướng dẫn có nguồn chính thức, cùng lộ trình hỗ trợ của NaNu NaNa.",
    },
  ],
  [
    {
      id: "du-hoc-dai-hoc",
      eyebrow: "Studium in Deutschland",
      title: "Studium — wir begleiten Sie",
      paragraphs: [
        "Ein Studium in Deutschland öffnet viele Türen. Wo fangen Sie an?",
        "Mit uns finden Sie nicht nur das passende Programm. Wir beantworten Ihre Fragen zur Bewerbung und begleiten Sie vor und nach der Ankunft in Deutschland.",
        "Lassen Sie uns Ihren Plan für ein Studium in Deutschland gemeinsam umsetzen.",
      ],
      highlight: ok("Studiengebühren je nach Hochschule und Programm"),
      bullets: [
        ok("Das passende Studienprogramm finden"),
        ok("Fragen zur Bewerbung klären"),
        ok("Begleitung bei APS und Zulassung"),
        ok("Begleitung vor und nach der Ankunft in Deutschland"),
      ],
      image: "pathwayUniversity",
      goal: "du-hoc-dai-hoc",
      cta: "Studium beraten lassen",
      pageTitle: "Studium in Deutschland",
      pageDescription:
        "Studium in Deutschland: Zulassung, APS, Studienkolleg, Sprache, Kosten und Bewerbung. Ratgeber mit offiziellen Quellen und Begleitung durch NaNu NaNa.",
    },
    {
      id: "du-hoc-nghe",
      eyebrow: "Ausbildung",
      title: "Ausbildung",
      tagline: "Praxis und eine gründliche Ausbildung, zusammen.",
      paragraphs: [
        "Wir begleiten Sie bei der Bewerbung für eine Ausbildung in Deutschland. Von der Berufswahl bis zu Ihrer Ankunft und dem Start der Ausbildung bleiben wir an Ihrer Seite.",
      ],
      highlight: ok("Ausbildungsvergütung laut Vertrag"),
      bullets: [
        ok("Den passenden Beruf finden"),
        ok("Begleitung der Bewerbung"),
        ok("Ausbildungsvergütung und Finanzierung individuell prüfen"),
        ok("An Ihrer Seite bei der Ankunft und zum Start der Ausbildung"),
      ],
      image: "pathwayVocational",
      goal: "du-hoc-nghe",
      cta: "Ausbildung beraten lassen",
      pageTitle: "Ausbildung in Deutschland",
      pageDescription:
        "Ausbildung in Deutschland: Voraussetzungen, Dauer, Berufe, Vergütung und Kosten. Ratgeber mit offiziellen Quellen und Begleitung durch NaNu NaNa.",
    },
  ],
);

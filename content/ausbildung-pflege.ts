/**
 * The nursing apprenticeship (Pflegefachmann/Pflegefachfrau), sourced from the
 * Pflegeberufegesetz, BERUFENET, Make it in Germany and the German embassy in
 * Hanoi, read on 2026-11-12. B2 is a practice note from NaNu NaNa: the law
 * leaves B1 or B2 to the states, and that sentence keeps its source.
 */
import type { Locale } from "@/lib/i18n/locale";
import type { GuideContent } from "./guides";

export const pflegeContent: Record<Locale, GuideContent> = {
  vi: {
    eyebrow: "Du học nghề · Điều dưỡng",
    title: "Du học nghề điều dưỡng tại Đức: học bao lâu, lương bao nhiêu, cần gì",
    metaTitle: "Du học nghề điều dưỡng Đức: lương và điều kiện",
    description:
      "Ausbildung điều dưỡng (Pflegefachfrau/Pflegefachmann) tại Đức: học 3 năm, không mất học phí, có lương đào tạo, thực tế cần tiếng Đức B2. Học gì, hợp với ai. Theo nguồn chính thức.",
    intro:
      "Điều dưỡng là một trong những ngành học nghề được hỏi nhiều nhất. Trang này tóm tắt khoá đào tạo Pflegefachfrau/Pflegefachmann theo luật nghề điều dưỡng Đức, trang nghề nghiệp của Cơ quan Lao động Liên bang, cổng Make it in Germany và trang thị thực học nghề của Đại sứ quán Đức tại Hà Nội. Quy định và mức lương có thể thay đổi, nên hãy xem lại nguồn chính thức trước khi nộp hồ sơ.",
    quickTitle: "Trả lời nhanh",
    quick: [
      { label: "Học bao lâu?", value: "3 năm toàn thời gian (bán thời gian tối đa 5 năm)" },
      { label: "Có mất học phí không?", value: "Không, học viên không phải đóng học phí" },
      {
        label: "Có lương không?",
        value: "Có, bắt buộc theo luật. Ví dụ khu vực công: 1.491–1.653 €/tháng (gross)",
      },
      { label: "Cần tiếng Đức gì?", value: "B2, vì hầu hết nơi đào tạo yêu cầu trình độ này" },
    ],
    sections: [
      {
        id: "thoi-gian",
        title: "Học bao lâu và học ở đâu?",
        paragraphs: [
          "Khoá đào tạo điều dưỡng kéo dài 3 năm nếu học toàn thời gian, tối đa 5 năm nếu học bán thời gian, và kết thúc bằng kỳ thi cấp nhà nước. Thời gian này tính từ khi bắt đầu học tại Đức; giai đoạn học tiếng và chuẩn bị hồ sơ ở Việt Nam là riêng.",
          "Phần lý thuyết học tại trường điều dưỡng (Pflegeschule). Phần thực hành chiếm nhiều thời gian hơn, tại bệnh viện, viện dưỡng lão hoặc dịch vụ điều dưỡng tại nhà, kèm các đợt thực tập ở nơi chuyên biệt như bệnh viện nhi, bệnh viện tâm thần hay nhà an dưỡng cuối đời.",
          "Hợp đồng đào tạo bắt đầu bằng 6 tháng thử việc, trừ khi thoả ước lao động quy định khác.",
        ],
        sources: ["pflbg", "berufenetPflege", "makeItNursing"],
      },
      {
        id: "chuyen-nganh",
        title: "Học xong được bằng gì?",
        paragraphs: [
          "Hai năm đầu, mọi học viên học điều dưỡng chung. Trước năm thứ ba, bạn có thể chọn: tiếp tục học chung để lấy bằng Pflegefachfrau/Pflegefachmann, hoặc chuyển sang chăm sóc người cao tuổi (Altenpflege) hay chăm sóc trẻ em (Kinderkrankenpflege).",
          "Bằng điều dưỡng chung (Pflegefachfrau/Pflegefachmann) được công nhận trong toàn Liên minh châu Âu.",
        ],
        sources: ["makeItNursing", "berufenetPflege"],
      },
      {
        id: "hoc-gi",
        title: "Trong 3 năm học những gì?",
        paragraphs: ["Theo BERUFENET, nội dung đào tạo gồm:"],
        points: [
          "Hỗ trợ người bệnh vận động và tự chăm sóc bản thân",
          "Nâng cao sức khoẻ và phòng bệnh",
          "Giao tiếp với người bệnh và người nhà",
          "Kỹ thuật điều dưỡng, sơ cứu và chăm sóc vết thương",
          "Chăm sóc người khuyết tật và người ở giai đoạn cuối đời",
          "Lập kế hoạch, chẩn đoán điều dưỡng và đánh giá quá trình chăm sóc",
          "Bảo đảm chất lượng và các quy định pháp luật",
        ],
        sources: ["berufenetPflege"],
      },
      {
        id: "ho-so",
        title: "Nghề này hợp với ai?",
        paragraphs: [
          "Nghề này hợp với người thích giúp đỡ, tư vấn cho người khác, tổ chức công việc, làm việc thực tế và tìm hiểu kiến thức chuyên môn. Ở trường phổ thông, các môn có ích nhất là Giáo dục đạo đức, Sinh học, tiếng Đức và Kinh tế – Pháp luật.",
          "BERUFENET nêu những tố chất quan trọng sau:",
        ],
        points: [
          "Chăm chỉ, sẵn sàng nỗ lực và cẩn thận",
          "Có trách nhiệm, quyết đoán và tự lập",
          "Giữ bí mật thông tin của người bệnh",
          "Vững vàng tâm lý, chịu được áp lực",
          "Giao tiếp tốt, biết xử lý mâu thuẫn",
          "Bình tĩnh, tự tin và kiên định",
          "Biết cảm thông, thân thiện",
        ],
        sources: ["berufenetPflege"],
      },
      {
        id: "dieu-kien",
        title: "Cần điều kiện gì?",
        paragraphs: [
          "Luật nghề điều dưỡng yêu cầu bằng trung học cơ sở loại khá của Đức (mittlerer Schulabschluss) hoặc một bằng được công nhận là tương đương, hoặc đã hoàn thành 10 năm học phổ thông. Bằng của Việt Nam cần được cơ quan Đức công nhận; hãy kiểm tra việc này trước khi nộp hồ sơ.",
          "Ngoài ra thường cần:",
        ],
        points: [
          "Tiếng Đức: theo quy định là B1 hoặc B2 tùy bang. Trên thực tế, trường điều dưỡng và nơi đào tạo hầu như đều yêu cầu B2",
          "Giấy chứng nhận đủ sức khoẻ thể chất và tinh thần (cấp tại Việt Nam hoặc tại Đức)",
          "Lý lịch tư pháp để chứng minh bạn đáng tin cậy",
          "Bằng chứng đã tiêm phòng sởi (Masernschutz); một số nơi yêu cầu thực tập trước",
        ],
        sources: ["pflbg", "makeItNursing", "berufenetPflege"],
      },
      {
        id: "luong",
        title: "Lương đào tạo bao nhiêu?",
        paragraphs: [
          "Luật bắt buộc cơ sở đào tạo trả cho học viên một khoản lương đào tạo hợp lý trong suốt 3 năm. Mức cụ thể tùy nơi đào tạo, vùng và năm học.",
          "Trang nghề nghiệp của Cơ quan Lao động Liên bang (BERUFENET) đưa ra ví dụ theo thoả ước khu vực công (TVAöD-Pflege), mỗi tháng trước khấu trừ: năm thứ nhất 1.491 €, năm thứ hai 1.552 €, năm thứ ba 1.653 €. Cơ quan này ghi rõ đây chỉ là số tham khảo, không phải mức mọi nơi đều trả.",
          "Từ lương gross sẽ bị trừ bảo hiểm xã hội (y tế, hưu trí, thất nghiệp). Thuế thu nhập thường không phải đóng vì lương đào tạo thấp hơn mức miễn thuế cơ bản. Làm ca thường có thêm phụ cấp.",
        ],
        sources: ["pflbg", "berufenetPflege", "makeItNursing"],
      },
      {
        id: "hoc-phi",
        title: "Có mất học phí không?",
        paragraphs: [
          "Không. Theo luật nghề điều dưỡng, mọi thoả thuận buộc học viên trả học phí cho trường điều dưỡng hay trả tiền cho phần thực hành đều vô hiệu. BERUFENET cũng ghi khoá đào tạo miễn phí cho học viên, kể cả tài liệu học.",
          "Lưu ý: đào tạo trợ lý điều dưỡng (Pflegeassistenz) là chương trình khác. Chương trình này do từng bang quy định, thường kéo dài 1–2 năm, thường không có quyền hưởng lương đào tạo, và một số trường có thu học phí.",
        ],
        sources: ["pflbg", "berufenetPflege", "makeItNursing"],
      },
      {
        id: "visa",
        title: "Thị thực học nghề cần gì và bao lâu có kết quả?",
        paragraphs: [
          "Bạn nộp hồ sơ qua Cổng thông tin dịch vụ lãnh sự (Auslandsportal), sau đó nộp bản gốc và sinh trắc học tại VFS. Theo Đại sứ quán Đức tại Hà Nội, về nguyên tắc cần:",
        ],
        points: [
          "Hộ chiếu còn hạn, lý lịch tự khai và bài viết lý giải động cơ",
          "Bằng chứng về quá trình học tập từ trước tới nay",
          "Hợp đồng đào tạo thực hành, bằng chứng về phần học lý thuyết tại trường và bản „Tuyên bố về quan hệ lao động“",
          "Chứng minh tài chính, ví dụ tài khoản phong tỏa",
          "Chứng chỉ tiếng Đức và bảo hiểm y tế",
        ],
        sources: ["embassyAusbildung"],
      },
      {
        id: "visa-thoi-gian",
        title: "Lệ phí, thời gian xét và sau khi sang Đức",
        paragraphs: [
          "Lệ phí thị thực là 75 € (dưới 18 tuổi: 37,50 €), trả bằng tiền Đồng, cộng phí dịch vụ của VFS. Đại sứ quán không cam kết thời hạn; thời gian xét khoảng 3 tháng, có trường hợp lâu hơn. Thị thực thường có hiệu lực sớm nhất một tuần trước ngày bắt đầu học.",
          "Sau khi sang Đức, bạn nên đăng ký cư trú trong vòng 2 tuần, rồi liên hệ Sở Ngoại kiều nơi ở để xin giấy phép cư trú.",
        ],
        sources: ["embassyAusbildung"],
      },
    ],
    faqTitle: "Câu hỏi thường gặp",
    faqs: [
      {
        id: "dieu-duong-bao-lau",
        question: "Du học nghề điều dưỡng Đức mất bao lâu?",
        answer:
          "Khoá đào tạo tại Đức kéo dài 3 năm toàn thời gian (tối đa 5 năm bán thời gian) và kết thúc bằng kỳ thi cấp nhà nước. Thời gian học tiếng và chuẩn bị hồ sơ ở Việt Nam tính riêng.",
      },
      {
        id: "dieu-duong-hoc-phi",
        question: "Du học nghề điều dưỡng có mất học phí không?",
        answer:
          "Không. Theo luật nghề điều dưỡng Đức, học viên không phải trả học phí cho trường điều dưỡng; tài liệu học cũng miễn phí. Trợ lý điều dưỡng (Pflegeassistenz) là chương trình khác, có trường thu phí.",
      },
      {
        id: "dieu-duong-luong",
        question: "Lương học nghề điều dưỡng ở Đức bao nhiêu?",
        answer:
          "Mức lương tùy nơi đào tạo. Ví dụ theo thoả ước khu vực công (TVAöD-Pflege): 1.491 € năm thứ nhất, 1.552 € năm thứ hai, 1.653 € năm thứ ba, mỗi tháng trước khấu trừ. Đây là số tham khảo của Cơ quan Lao động Liên bang.",
      },
      {
        id: "dieu-duong-tieng-duc",
        question: "Học điều dưỡng ở Đức cần tiếng Đức trình độ nào?",
        answer:
          "Hãy đặt mục tiêu B2: trên thực tế, hầu hết trường điều dưỡng và nơi đào tạo yêu cầu trình độ này. Quy định chính thức ghi B1 hoặc B2, tùy bang.",
      },
      {
        id: "dieu-duong-visa",
        question: "Visa du học nghề bao lâu có kết quả?",
        answer:
          "Theo Đại sứ quán Đức tại Hà Nội, thời gian xét khoảng 3 tháng, có trường hợp lâu hơn. Hãy nộp hồ sơ sớm.",
      },
      {
        id: "dieu-duong-tro-ly",
        question: "Điều dưỡng và trợ lý điều dưỡng khác nhau thế nào?",
        answer:
          "Điều dưỡng (Pflegefachfrau/Pflegefachmann) học 3 năm, có lương đào tạo và bằng được công nhận trong EU. Trợ lý điều dưỡng (Pflegeassistenz) học 1–2 năm theo quy định của từng bang, thường không có quyền hưởng lương đào tạo, và một số trường thu học phí.",
      },
    ],
    ctaTitle: "Bắt đầu từ tiếng Đức",
    ctaText:
      "Để học điều dưỡng tại Đức, bạn cần tiếng Đức B2. NaNu NaNa có lớp A1 đến C1, online và tại Hà Nội, TP. Hồ Chí Minh. Hãy để lại thông tin để được tư vấn lộ trình.",
    cta: "Tư vấn du học nghề điều dưỡng",
    message: "Tôi muốn tìm hiểu du học nghề điều dưỡng tại Đức.",
    goal: "du-hoc-nghe",
    parents: [
      { label: "Du học nghề Đức", href: "/du-hoc-nghe" },
      { label: "Các ngành học nghề", href: "/du-hoc-nghe/cac-nganh" },
    ],
    related: [
      { label: "Tất cả ngành học nghề", href: "/du-hoc-nghe/cac-nganh" },
      { label: "Du học nghề Đức: tổng quan", href: "/du-hoc-nghe" },
      { label: "Khoá tiếng Đức B2", href: "/niveau/b2" },
      { label: "Thi Goethe: cần mang gì", href: "/thi-goethe" },
    ],
    shareSubtitle: "Nội dung học · Lương · Điều kiện · Visa",
  },
  de: {
    eyebrow: "Ausbildung · Pflege",
    title: "Pflegeausbildung in Deutschland: Dauer, Vergütung, Voraussetzungen",
    metaTitle: "Pflegeausbildung in Deutschland: Dauer, Gehalt",
    description:
      "Ausbildung zur Pflegefachfrau oder zum Pflegefachmann für Bewerber aus Vietnam: drei Jahre, kein Schulgeld, vergütet, in der Praxis Deutsch B2. Inhalte und Profil, nach offiziellen Quellen.",
    intro:
      "Die Pflege gehört zu den gefragtesten Ausbildungsberufen. Diese Seite fasst die Ausbildung zur Pflegefachfrau oder zum Pflegefachmann zusammen, nach dem Pflegeberufegesetz, BERUFENET der Bundesagentur für Arbeit, dem Portal Make it in Germany und der Seite der Deutschen Botschaft Hanoi zum Ausbildungsvisum. Regeln und Beträge können sich ändern; prüfen Sie vor dem Antrag die offiziellen Seiten.",
    quickTitle: "Kurz beantwortet",
    quick: [
      { label: "Dauer", value: "3 Jahre in Vollzeit (Teilzeit höchstens 5 Jahre)" },
      { label: "Schulgeld", value: "Keins, die Ausbildung ist für Auszubildende kostenlos" },
      {
        label: "Vergütung",
        value: "Gesetzlich vorgeschrieben. Beispiel öffentlicher Dienst: 1.491–1.653 € brutto",
      },
      { label: "Deutsch", value: "B2, das verlangen fast alle Pflegeschulen und Arbeitgeber" },
    ],
    sections: [
      {
        id: "thoi-gian",
        title: "Dauer und Lernorte",
        paragraphs: [
          "Die Ausbildung dauert in Vollzeit drei Jahre, in Teilzeit höchstens fünf Jahre, und endet mit einer staatlichen Prüfung. Sprachkurs und Bewerbung in Vietnam kommen zeitlich davor.",
          "Der Unterricht findet an einer Pflegeschule statt. Die praktische Ausbildung überwiegt: im Krankenhaus, in einer Pflegeeinrichtung oder einem ambulanten Pflegedienst, dazu Einsätze etwa in der Kinderklinik, der Psychiatrie oder im Hospiz.",
          "Das Ausbildungsverhältnis beginnt mit einer Probezeit von sechs Monaten, sofern ein Tarifvertrag nichts anderes regelt.",
        ],
        sources: ["pflbg", "berufenetPflege", "makeItNursing"],
      },
      {
        id: "chuyen-nganh",
        title: "Welcher Abschluss?",
        paragraphs: [
          "Die ersten zwei Jahre sind für alle gleich (generalistische Ausbildung). Vor dem dritten Jahr können Auszubildende den Abschluss Pflegefachfrau/Pflegefachmann behalten oder sich auf Altenpflege beziehungsweise Gesundheits- und Kinderkrankenpflege ausrichten.",
          "Der generalistische Abschluss ist in der gesamten EU anerkannt.",
        ],
        sources: ["makeItNursing", "berufenetPflege"],
      },
      {
        id: "hoc-gi",
        title: "Was lernt man in den drei Jahren?",
        paragraphs: ["Laut BERUFENET gehören zu den Ausbildungsinhalten:"],
        points: [
          "Menschen bei Bewegung und Selbstversorgung unterstützen",
          "Gesundheitsförderung und Prävention",
          "Kommunikation mit Pflegebedürftigen und Angehörigen",
          "Pflegetechniken, Erste Hilfe und Wundversorgung",
          "Pflege von Menschen mit Behinderung und in der letzten Lebensphase",
          "Pflegeprozesse planen, Pflegediagnostik und Evaluation",
          "Qualitätssicherung und rechtliche Vorschriften",
        ],
        sources: ["berufenetPflege"],
      },
      {
        id: "ho-so",
        title: "Welches Profil passt?",
        paragraphs: [
          "Der Beruf passt zu Menschen mit Interesse an sozial-beratenden, verwaltend-organisatorischen, praktisch-konkreten und theoretisch-abstrakten Tätigkeiten. Hilfreiche Schulfächer sind Ethik, Biologie, Deutsch sowie Wirtschaft und Recht.",
          "BERUFENET nennt diese Eigenschaften als wichtig:",
        ],
        points: [
          "Leistungs- und Einsatzbereitschaft, Sorgfalt",
          "Verantwortungsbewusstsein, Entscheidungsfähigkeit, Selbstständigkeit",
          "Verschwiegenheit",
          "Psychische Belastbarkeit und Stabilität",
          "Kommunikations-, Kontakt- und Konfliktfähigkeit",
          "Selbstkontrolle, Selbstsicherheit, Durchsetzungsvermögen",
          "Einfühlungsvermögen, freundliches Wesen",
        ],
        sources: ["berufenetPflege"],
      },
      {
        id: "dieu-kien",
        title: "Voraussetzungen",
        paragraphs: [
          "Das Pflegeberufegesetz verlangt den mittleren Schulabschluss oder einen als gleichwertig anerkannten Abschluss, oder eine abgeschlossene zehnjährige allgemeine Schulbildung. Ein vietnamesischer Schulabschluss muss anerkannt werden; klären Sie das vor der Bewerbung.",
          "Außerdem werden in der Regel verlangt:",
        ],
        points: [
          "Deutschkenntnisse: vorgeschrieben ist je nach Bundesland B1 oder B2. In der Praxis verlangen Pflegeschulen und Arbeitgeber fast immer B2",
          "Ein Nachweis der gesundheitlichen Eignung (aus Vietnam oder aus Deutschland)",
          "Ein Führungszeugnis oder vergleichbarer Nachweis der Zuverlässigkeit",
          "Ein Nachweis über den Masernschutz; manche Einrichtungen erwarten ein Vorpraktikum",
        ],
        sources: ["pflbg", "makeItNursing", "berufenetPflege"],
      },
      {
        id: "luong",
        title: "Ausbildungsvergütung",
        paragraphs: [
          "Der Träger der praktischen Ausbildung muss für die gesamte Ausbildung eine angemessene Vergütung zahlen. Die Höhe hängt von Arbeitgeber, Region und Ausbildungsjahr ab.",
          "BERUFENET nennt als Beispiel den Tarif des öffentlichen Dienstes (TVAöD-Pflege), monatlich brutto: 1.491 € im ersten, 1.552 € im zweiten und 1.653 € im dritten Jahr. Die Bundesagentur weist ausdrücklich darauf hin, dass diese Angaben nur der Orientierung dienen.",
          "Vom Brutto gehen Sozialversicherungsbeiträge ab. Lohnsteuer fällt meist nicht an, weil die Vergütung unter dem Grundfreibetrag liegt. Für Schichtdienst gibt es in der Regel Zuschläge.",
        ],
        sources: ["pflbg", "berufenetPflege", "makeItNursing"],
      },
      {
        id: "hoc-phi",
        title: "Schulgeld und Kosten",
        paragraphs: [
          "Schulgeld gibt es nicht: Vereinbarungen, nach denen Auszubildende für den Unterricht oder die praktische Ausbildung zahlen, sind nach dem Pflegeberufegesetz nichtig. Laut BERUFENET sind auch Lehr- und Lernmittel kostenlos.",
          "Achtung bei der Pflegeassistenz: Sie ist ein anderer, landesrechtlich geregelter Bildungsgang von meist ein bis zwei Jahren, ohne allgemeinen Anspruch auf Vergütung, und manche Schulen verlangen dort Gebühren.",
        ],
        sources: ["pflbg", "berufenetPflege", "makeItNursing"],
      },
      {
        id: "visa",
        title: "Unterlagen für das Ausbildungsvisum",
        paragraphs: [
          "Der Antrag läuft über das Auslandsportal; Originale und Biometrie geben Sie danach bei VFS ab. Laut Deutscher Botschaft Hanoi brauchen Sie grundsätzlich:",
        ],
        points: [
          "Gültigen Pass, Lebenslauf und Motivationsschreiben",
          "Nachweise über die bisherige Ausbildung",
          "Ausbildungsvertrag für den praktischen Teil, Nachweis über den schulischen Teil und die „Erklärung zum Beschäftigungsverhältnis“",
          "Finanzierungsnachweis, zum Beispiel ein Sperrkonto",
          "Deutschzertifikat und Krankenversicherung",
        ],
        sources: ["embassyAusbildung"],
      },
      {
        id: "visa-thoi-gian",
        title: "Gebühr, Bearbeitungszeit und Ankunft",
        paragraphs: [
          "Die Visumgebühr beträgt 75 € (unter 18 Jahren 37,50 €), bar in Dong, dazu die VFS-Servicegebühr. Eine feste Bearbeitungszeit sagt die Botschaft nicht zu; sie liegt bei etwa drei Monaten, im Einzelfall länger. Das Visum gilt in der Regel frühestens eine Woche vor Ausbildungsbeginn.",
          "Nach der Ankunft sollten Sie sich innerhalb von zwei Wochen anmelden und bei der Ausländerbehörde die Aufenthaltserlaubnis beantragen.",
        ],
        sources: ["embassyAusbildung"],
      },
    ],
    faqTitle: "Häufige Fragen",
    faqs: [
      {
        id: "dieu-duong-bao-lau",
        question: "Wie lange dauert die Pflegeausbildung?",
        answer:
          "Drei Jahre in Vollzeit, höchstens fünf Jahre in Teilzeit, mit staatlicher Abschlussprüfung. Sprachkurs und Bewerbung in Vietnam kommen hinzu.",
      },
      {
        id: "dieu-duong-hoc-phi",
        question: "Kostet die Pflegeausbildung Schulgeld?",
        answer:
          "Nein. Nach dem Pflegeberufegesetz dürfen Auszubildende nicht zur Zahlung von Schulgeld verpflichtet werden; Lernmittel sind ebenfalls kostenlos. Die Pflegeassistenz ist ein anderer Bildungsgang, dort verlangen manche Schulen Gebühren.",
      },
      {
        id: "dieu-duong-luong",
        question: "Wie hoch ist die Ausbildungsvergütung in der Pflege?",
        answer:
          "Das hängt vom Arbeitgeber ab. Im öffentlichen Dienst (TVAöD-Pflege) sind es laut BERUFENET 1.491 €, 1.552 € und 1.653 € brutto im Monat im ersten bis dritten Jahr. Die Angaben dienen der Orientierung.",
      },
      {
        id: "dieu-duong-tieng-duc",
        question: "Welches Deutschniveau brauche ich?",
        answer:
          "Planen Sie mit B2: In der Praxis verlangen fast alle Pflegeschulen und Arbeitgeber dieses Niveau. Vorgeschrieben ist je nach Bundesland B1 oder B2.",
      },
      {
        id: "dieu-duong-visa",
        question: "Wie lange dauert das Ausbildungsvisum?",
        answer:
          "Laut Deutscher Botschaft Hanoi etwa drei Monate, im Einzelfall länger. Stellen Sie den Antrag früh.",
      },
      {
        id: "dieu-duong-tro-ly",
        question: "Was unterscheidet Pflegefachperson und Pflegeassistenz?",
        answer:
          "Die Ausbildung zur Pflegefachperson dauert drei Jahre, ist vergütet und EU-weit anerkannt. Die Pflegeassistenz dauert ein bis zwei Jahre, ist landesrechtlich geregelt, meist ohne Vergütungsanspruch, und manche Schulen verlangen Gebühren.",
      },
    ],
    ctaTitle: "Der erste Schritt ist Deutsch",
    ctaText:
      "Für die Pflegeausbildung brauchen Sie Deutsch auf B2. NaNu NaNa bietet Kurse von A1 bis C1, online und in Hanoi und Ho-Chi-Minh-Stadt. Hinterlassen Sie Ihre Daten für eine Beratung.",
    cta: "Zur Pflegeausbildung beraten lassen",
    message: "Ich interessiere mich für eine Pflegeausbildung in Deutschland.",
    goal: "du-hoc-nghe",
    parents: [
      { label: "Ausbildung in Deutschland", href: "/du-hoc-nghe" },
      { label: "Ausbildungsberufe", href: "/du-hoc-nghe/cac-nganh" },
    ],
    related: [
      { label: "Alle Ausbildungsberufe", href: "/du-hoc-nghe/cac-nganh" },
      { label: "Ausbildung in Deutschland: Überblick", href: "/du-hoc-nghe" },
      { label: "Deutschkurs B2", href: "/niveau/b2" },
      { label: "Goethe-Prüfung in Vietnam", href: "/thi-goethe" },
    ],
    shareSubtitle: "Inhalte · Vergütung · Voraussetzungen · Visum",
  },
};

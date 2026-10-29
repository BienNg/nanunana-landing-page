/**
 * Tuyển dụng page content.
 * Job descriptions are confirmed by NaNu NaNa; open questions are wrapped in
 * verify() and stay hidden in production.
 */
import { site } from "./site";
import { isVisible, ok, type Claim } from "./verify";

/** A list item; `tag` renders as a small badge, e.g. "Bắt buộc". */
export type RoleItem = string | { text: string; tag: string };

export type RoleSection = {
  heading: string;
  intro?: Claim;
  items?: Claim<RoleItem[]>;
  /** Shown crossed out under `crossedOutLabel`: work the role does not include. */
  crossedOut?: Claim<string[]>;
  crossedOutLabel?: string;
};

export type RoleFact = { label: string; value: Claim };

export type RoleFaq = { q: string; a: Claim };

export type Role = {
  /** URL segment: /tuyen-dung/[slug] */
  slug: string;
  title: string;
  /** Whether the role is actually open. Unconfirmed roles are hidden in production. */
  open: Claim<boolean>;
  type: Claim;
  location: Claim;
  summary: Claim;
  /** Email subject; defaults to "[Ứng tuyển] <title>". */
  applySubject?: string;
  /** Key facts in the detail page header (contract, hours, start …). */
  facts?: RoleFact[];
  /** Detail page sections (learners, curriculum, tasks, requirements, benefits …). */
  sections: RoleSection[];
  application?: {
    send: Claim<string[]>;
    steps: Claim<string[]>;
  };
  faq?: RoleFaq[];
};

/** Shared by the online and in-person teacher roles. */
const teacherCurriculum: RoleSection = {
  heading: "Giáo trình đã sẵn sàng",
  intro: ok("Mọi tài liệu đã được soạn sẵn — bạn chỉ cần tập trung vào việc dạy."),
  items: ok([
    "Slide bài giảng trên Canva",
    "Tài liệu PDF cho từng bài",
    "Danh sách từ vựng kèm audio và trọng âm",
    "Flashcard trên Classroom",
    "Video giải thích ngữ pháp",
    "Ứng dụng học NaNu Go",
  ]),
  crossedOutLabel: "Bạn không cần:",
  crossedOut: ok(["Soạn bài", "Tự làm tài liệu", "Chấm bài tập"]),
};

const teacherDuties = [
  "Đồng hành cùng một lớp từ đầu đến cuối khoá (khoảng 9 tháng)",
  "Nhận xét, phản hồi cho học viên",
  "Điểm danh mỗi buổi học",
  "Tham gia các buổi họp nhóm định kỳ",
];

const teacherApplicationSteps = ok([
  "Gửi CV qua email",
  "Trao đổi ngắn qua video",
  "Dạy thử một buổi",
  "Nhận lớp và bắt đầu dạy",
]);

const teacherFaq: RoleFaq[] = [
  {
    q: "Tôi có cần kinh nghiệm giảng dạy không?",
    a: ok(
      "Không bắt buộc. Kinh nghiệm giảng dạy, hoặc bất kỳ kinh nghiệm nào trong lĩnh vực giáo dục, là một lợi thế.",
    ),
  },
  {
    q: "Tôi có phải soạn bài không?",
    a: ok(
      "Không. Slide, tài liệu, từ vựng, flashcard và video đã được soạn sẵn cho từng buổi học.",
    ),
  },
  {
    q: "Mỗi lớp kéo dài bao lâu?",
    a: ok("Khoảng 9 tháng. Bạn dạy cùng một lớp từ đầu đến cuối khoá."),
  },
  { q: "CV viết bằng tiếng gì?", a: ok("Tiếng Đức.") },
];

const roles: Role[] = [
  {
    slug: "giao-vien-sai-gon-ha-noi",
    title: "Giáo viên tiếng Đức – Sài Gòn / Hà Nội (m/w/d)",
    open: ok(true),
    type: ok("Toàn thời gian / Bán thời gian"),
    location: ok("TP. Hồ Chí Minh · Hà Nội"),
    summary: ok(
      "Dạy tiếng Đức trực tiếp tại cơ sở của NaNu NaNa ở Sài Gòn hoặc Hà Nội, trình độ A1–C1 — với giáo trình đã soạn sẵn.",
    ),
    applySubject: "Bewerbung: Deutschlehrer:in vor Ort – Sài Gòn / Hà Nội (m/w/d)",
    facts: [
      {
        label: "Hợp đồng",
        value: ok("Sài Gòn: toàn thời gian hoặc bán thời gian · Hà Nội: bán thời gian"),
      },
      { label: "Địa điểm", value: ok("Trực tiếp tại cơ sở TP. Hồ Chí Minh hoặc Hà Nội") },
      { label: "Lịch dạy", value: ok("4–7 buổi/tuần · 2,5 giờ/buổi") },
      { label: "Bắt đầu", value: ok("Theo thỏa thuận") },
    ],
    sections: [
      {
        heading: "Học viên của bạn",
        intro: ok(
          "Học viên học tiếng Đức từ trình độ A1 đến C1, học trực tiếp tại lớp. Bạn đồng hành cùng một lớp từ buổi đầu tiên đến khi kết thúc khoá — khoảng 9 tháng.",
        ),
      },
      teacherCurriculum,
      {
        heading: "Nhiệm vụ",
        items: ok([
          "Dạy trực tiếp tại lớp theo giáo trình có sẵn, từ 4 đến 7 buổi mỗi tuần, mỗi buổi 2,5 giờ",
          ...teacherDuties,
        ]),
      },
      {
        heading: "Yêu cầu",
        items: ok<RoleItem[]>([
          { text: "Tiếng Việt là tiếng mẹ đẻ", tag: "Bắt buộc" },
          "Có bằng cấp tại Đức (Abitur, cử nhân hoặc tương đương)",
          "Có thể dạy trực tiếp tại cơ sở ở TP. Hồ Chí Minh hoặc Hà Nội",
          "Dạy tối thiểu 4 buổi mỗi tuần và theo một lớp trọn khoá",
          "Kinh nghiệm giảng dạy hoặc trong lĩnh vực giáo dục là một lợi thế",
        ]),
      },
      {
        heading: "Quyền lợi",
        items: ok([
          "Hợp đồng toàn thời gian (Sài Gòn) hoặc bán thời gian (Sài Gòn, Hà Nội)",
          "Lương theo giờ tăng theo số lớp — dạy càng nhiều, mức lương mỗi giờ càng cao",
          "Tự chọn số buổi dạy, từ 4 đến 7 buổi mỗi tuần",
          "Giáo trình và tài liệu soạn sẵn — không cần soạn bài hay chấm bài",
        ]),
      },
    ],
    application: {
      send: ok(["CV bằng tiếng Đức", "Ghi rõ bạn muốn dạy tại Sài Gòn hay Hà Nội"]),
      steps: ok([
        "Gửi CV qua email",
        "Trao đổi ngắn persönlich vor Ort",
        "Dạy thử một buổi",
        "Nhận lớp và bắt đầu dạy",
      ]),
    },
    faq: [
      {
        q: "Giờ dạy có linh hoạt không?",
        a: ok(
          "Không. Lịch dạy cố định, mỗi buổi 2,5 giờ. Bạn chọn số buổi mỗi tuần (4–7), nhưng giờ học của lớp là cố định.",
        ),
      },
      {
        q: "Tôi dạy ở đâu?",
        a: ok(
          `Trực tiếp tại cơ sở của NaNu NaNa: ${site.address.street}, ${site.address.city} hoặc ${site.addressHanoi.street}, ${site.addressHanoi.city}.`,
        ),
      },
      ...teacherFaq,
    ],
  },
  {
    slug: "giao-vien-online",
    title: "Giáo viên tiếng Đức Online (m/w/d)",
    open: ok(true),
    type: ok("Bán thời gian (Teilzeit)"),
    location: ok("Online · Sinh sống tại Đức"),
    summary: ok(
      "Dạy tiếng Đức online cho học viên Việt Nam tại Đức và tại Việt Nam, trình độ A1–C1 — với giáo trình đã soạn sẵn.",
    ),
    applySubject: "Bewerbung: Deutschlehrer:in Online (m/w/d)",
    facts: [
      { label: "Hợp đồng", value: ok("Bán thời gian (Teilzeit)") },
      { label: "Địa điểm", value: ok("Online — bạn cần sinh sống tại Đức") },
      { label: "Lịch dạy", value: ok("2–7 buổi/tuần · buổi tối · 90 phút/buổi") },
      { label: "Bắt đầu", value: ok("Theo thỏa thuận") },
    ],
    sections: [
      {
        heading: "Học viên của bạn",
        intro: ok(
          "Người Việt đang sinh sống tại Đức và tại Việt Nam, học tiếng Đức từ trình độ A1 đến C1. Bạn đồng hành cùng một lớp từ buổi đầu tiên đến khi kết thúc khoá — khoảng 9 tháng.",
        ),
      },
      teacherCurriculum,
      {
        heading: "Nhiệm vụ",
        items: ok([
          "Dạy online qua Zoom theo giáo trình có sẵn, từ 2 đến 7 buổi mỗi tuần, mỗi buổi 90 phút",
          ...teacherDuties,
        ]),
      },
      {
        heading: "Yêu cầu",
        items: ok<RoleItem[]>([
          { text: "Tiếng Việt là tiếng mẹ đẻ", tag: "Bắt buộc" },
          "Có bằng cấp tại Đức (Abitur, cử nhân hoặc tương đương)",
          "Đang sinh sống tại Đức",
          "Dạy tối thiểu 2 buổi mỗi tuần và theo một lớp trọn khoá",
          "Kinh nghiệm giảng dạy hoặc trong lĩnh vực giáo dục là một lợi thế",
        ]),
      },
      {
        heading: "Quyền lợi",
        items: ok([
          "Hợp đồng bán thời gian (Teilzeit)",
          "Lương theo giờ tăng theo số lớp — dạy càng nhiều, mức lương mỗi giờ càng cao",
          "Tự chọn số buổi dạy, từ 2 đến 7 buổi mỗi tuần",
          "Giáo trình và tài liệu soạn sẵn — không cần soạn bài hay chấm bài",
          "Làm việc online tại nhà",
        ]),
      },
    ],
    application: {
      send: ok(["CV bằng tiếng Đức"]),
      steps: teacherApplicationSteps,
    },
    faq: [
      {
        q: "Giờ dạy có linh hoạt không?",
        a: ok(
          "Không. Lịch dạy cố định vào buổi tối, mỗi buổi 90 phút. Bạn chọn số buổi mỗi tuần (2–7), nhưng giờ học của lớp là cố định.",
        ),
      },
      {
        q: "Tôi không sống ở Đức thì có ứng tuyển được không?",
        a: ok("Không. Vị trí này dành cho ứng viên đang sinh sống tại Đức."),
      },
      ...teacherFaq,
    ],
  },
  {
    slug: "cham-soc-khach-hang",
    title: "Chăm sóc khách hàng – Sài Gòn / Hà Nội",
    open: ok(true),
    type: ok("Toàn thời gian / Bán thời gian"),
    location: ok("TP. Hồ Chí Minh · Hà Nội"),
    summary: ok(
      "Đồng hành cùng học viên từ ngày đầu học tiếng Đức đến khi có visa — tư vấn khoá học, theo dõi tiến độ, hỗ trợ giáo viên và làm hồ sơ visa.",
    ),
    facts: [
      { label: "Hợp đồng", value: ok("Toàn thời gian hoặc bán thời gian") },
      { label: "Địa điểm", value: ok("Tại cơ sở TP. Hồ Chí Minh hoặc Hà Nội") },
      {
        label: "Giờ làm việc",
        value: ok("Toàn thời gian: thứ 2–6, ban ngày · Bán thời gian: buổi tối và cuối tuần"),
      },
      { label: "Bắt đầu", value: ok("Theo thỏa thuận") },
    ],
    sections: [
      {
        heading: "Nhiệm vụ",
        items: ok([
          "Nắm rõ tất cả sản phẩm của NaNu NaNa: các khoá tiếng Đức A1–C1, du học đại học, du học nghề (Ausbildung) và ứng dụng NaNu Go",
          "Tư vấn và giải đáp thắc mắc cho học viên và phụ huynh",
          "Thường xuyên liên hệ học viên để theo dõi tiến độ học tập",
          "Hỗ trợ giáo viên trong công việc hằng ngày",
          "Làm hồ sơ visa cho học viên: chuẩn bị, kiểm tra và theo dõi giấy tờ đến khi hoàn tất",
        ]),
      },
      {
        heading: "Yêu cầu",
        items: ok<RoleItem[]>([
          "Thành thạo công việc văn phòng: email, soạn thảo văn bản, bảng tính (Word/Google Docs, Excel/Google Sheets)",
          "Cẩn thận, chính xác và có tổ chức khi xử lý giấy tờ, hồ sơ",
          "Giao tiếp tốt, thân thiện và kiên nhẫn qua điện thoại, tin nhắn và gặp trực tiếp",
          "Chủ động, có trách nhiệm, quản lý tốt thời gian và nhiều việc cùng lúc",
          "Có thể làm việc tại cơ sở TP. Hồ Chí Minh hoặc Hà Nội",
          "Kinh nghiệm hành chính, thư ký, chăm sóc khách hàng hoặc tư vấn là một lợi thế",
          "Biết tiếng Đức là một lợi thế, không bắt buộc",
        ]),
      },
      {
        heading: "Quyền lợi",
        items: ok([
          "Học tiếng Đức miễn phí tại NaNu NaNa",
          "Được đào tạo về sản phẩm và quy trình làm hồ sơ visa, có cơ hội phát triển trong đội ngũ",
          "Đội ngũ trẻ, quốc tế — làm việc cùng giáo viên và đồng nghiệp tại Việt Nam và Đức",
        ]),
      },
      {
        heading: "Thưởng",
        items: ok(["Thưởng theo hiệu quả công việc và lương tháng 13"]),
      },
    ],
    application: {
      send: ok([
        "CV bằng tiếng Việt",
        "Ghi rõ bạn muốn làm tại Sài Gòn hay Hà Nội, toàn thời gian hay bán thời gian",
      ]),
      steps: ok(["Gửi CV qua email", "Phỏng vấn", "Nhận việc và bắt đầu"]),
    },
    faq: [
      {
        q: "Tôi có cần biết tiếng Đức không?",
        a: ok(
          "Không bắt buộc. Biết tiếng Đức là một lợi thế, và nhân viên được học tiếng Đức miễn phí.",
        ),
      },
      {
        q: "Tôi chưa từng làm hồ sơ visa thì có ứng tuyển được không?",
        a: ok("Được. Bạn sẽ được đào tạo về quy trình làm hồ sơ visa du học Đức."),
      },
      {
        q: "Giờ làm việc như thế nào?",
        a: ok(
          "Toàn thời gian: từ thứ 2 đến thứ 6, ban ngày. Bán thời gian: buổi tối và cuối tuần.",
        ),
      },
      { q: "CV viết bằng tiếng gì?", a: ok("Tiếng Việt.") },
    ],
  },
];

export const careers = {
  title: "Tuyển Dụng",
  intro:
    "NaNu NaNa luôn tìm kiếm những người đồng hành tâm huyết — cùng chúng tôi giúp các bạn trẻ Việt Nam học tiếng Đức và chinh phục giấc mơ Đức với chất lượng và sự tử tế.",
  applyEmail: "contact@nanunana-tiengduc.com",
  applySubjectPrefix: "[Ứng tuyển]",
  noOpenRoles:
    "Hiện chưa có vị trí đang tuyển. Bạn vẫn có thể gửi CV để chúng tôi liên hệ khi có vị trí phù hợp.",
  applyHowTo:
    "Gửi CV (tiếng Việt hoặc tiếng Đức) kèm vị trí bạn quan tâm qua email. Chúng tôi sẽ phản hồi các hồ sơ phù hợp.",
  roleApplyHowTo:
    "Gửi CV (tiếng Việt hoặc tiếng Đức) qua email. Tiêu đề email đã được điền sẵn theo vị trí này.",
  about: {
    heading: "Về NaNu NaNa",
    text: site.description,
    offices: site.offices.map((o) => o.city).filter((city) => city !== "Stuttgart"),
    slogan: site.slogan,
  },
  /** Equal-treatment statement (AGG) shown at the end of every job ad. */
  equalOpportunity:
    "NaNu NaNa chào đón mọi ứng viên, không phân biệt giới tính, nguồn gốc dân tộc, tôn giáo hay thế giới quan, khuyết tật, tuổi tác hay xu hướng tính dục.",
  roles,
};

export function applySubject(role?: Role) {
  return role?.applySubject ?? `${careers.applySubjectPrefix} ${role?.title ?? "Ứng tuyển tự do"}`;
}

/** mailto link with the subject pre-filled for a role (or a general application). */
export function applyHref(role?: Role) {
  return `mailto:${careers.applyEmail}?subject=${encodeURIComponent(applySubject(role))}`;
}

export function careerHref(slug: string) {
  return `/tuyen-dung/${slug}`;
}

/** Roles that may be shown in the current environment. */
export function openRoles() {
  return careers.roles.filter((r) => isVisible(r.open) && r.open.value);
}

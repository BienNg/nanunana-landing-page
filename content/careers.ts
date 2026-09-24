/**
 * Tuyển dụng page content.
 * Open roles are placeholders until NaNu NaNa confirms them.
 */
import { verify, type Claim } from "./verify";

export type Role = {
  id: string;
  title: string;
  /** Whether the role is actually open. Unconfirmed roles are hidden in production. */
  open: Claim<boolean>;
  type: Claim;
  location: Claim;
  summary: Claim;
  requirements: Claim<string[]>;
};

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
  roles: [
    {
      id: "giao-vien-tieng-duc",
      title: "Giáo viên tiếng Đức",
      open: verify(true, "Có đang tuyển giáo viên tiếng Đức không?"),
      type: verify("Toàn thời gian / Bán thời gian", "Hình thức làm việc?"),
      location: verify("Hồ Chí Minh · Online", "Địa điểm?"),
      summary: verify(
        "Giảng dạy các lớp tiếng Đức từ A1 đến B2 theo khung CEFR, online và offline.",
        "Mô tả công việc giáo viên?",
      ),
      requirements: verify(
        ["Trình độ tiếng Đức từ C1 trở lên", "Có kinh nghiệm giảng dạy là một lợi thế"],
        "Yêu cầu tuyển dụng giáo viên?",
      ),
    },
    {
      id: "tu-van-vien",
      title: "Tư vấn viên du học",
      open: verify(true, "Có đang tuyển tư vấn viên du học không?"),
      type: verify("Toàn thời gian", "Hình thức làm việc?"),
      location: verify("Hồ Chí Minh", "Địa điểm?"),
      summary: verify(
        "Tư vấn lộ trình học tiếng Đức, du học đại học và du học nghề cho học viên và phụ huynh.",
        "Mô tả công việc tư vấn viên?",
      ),
      requirements: verify(
        ["Giao tiếp tốt, tận tâm với học viên", "Tiếng Đức B1 trở lên là một lợi thế"],
        "Yêu cầu tuyển dụng tư vấn viên?",
      ),
    },
  ] satisfies Role[],
};

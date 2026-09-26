import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description: `Chính sách bảo mật và xử lý dữ liệu cá nhân của ${site.fullName}.`,
  alternates: { canonical: "/chinh-sach-bao-mat" },
};

const sections = [
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
    body: `${site.legalName} — ${site.address.street}, ${site.address.city}. Email: ${site.email}. Điện thoại: ${site.phone.display}.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="container-page section-y">
      <article className="max-w-3xl">
        <h1 className="text-headline-xl-mobile text-ink md:text-headline-xl">Chính sách bảo mật</h1>
        <p className="mt-3 text-body-lg text-ink-muted">
          {site.fullName} tôn trọng và bảo vệ dữ liệu cá nhân của bạn.
        </p>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-headline-sm text-ink">{s.title}</h2>
              <p className="mt-2 text-body-md text-ink-muted">{s.body}</p>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}

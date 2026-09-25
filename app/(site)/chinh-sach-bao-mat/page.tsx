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
    body: "Khi bạn gửi yêu cầu tư vấn, chúng tôi nhận: họ và tên, số điện thoại/Zalo, khoá học và mục tiêu quan tâm, nội dung câu hỏi, cùng thông tin kỹ thuật về nguồn truy cập (ví dụ: UTM, trang giới thiệu). Khi bạn xem trang, chúng tôi ghi lại mục nào đã xuất hiện trên màn hình và nút liên hệ nào bạn bấm (Zalo, Messenger, WhatsApp hoặc điện thoại), qua Vercel Analytics và — khi được cấu hình — Google Analytics cùng Meta Pixel. Chúng tôi không nhận nội dung tin nhắn bạn gửi trên các ứng dụng đó.",
  },
  {
    title: "2. Mục đích sử dụng",
    body: "Thông tin được dùng để liên hệ tư vấn khoá học và du học theo yêu cầu của bạn, và để cải thiện chất lượng dịch vụ.",
  },
  {
    title: "3. Lưu trữ và chia sẻ",
    body: "Yêu cầu tư vấn chỉ được lưu trong email của công ty và được giữ trong một năm. Chỉ NaNu NaNa được xem các email này. Chúng tôi không chia sẻ nội dung yêu cầu tư vấn với đối tác hay bên thứ ba.",
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

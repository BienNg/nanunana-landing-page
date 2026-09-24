import { ArrowLeft } from "lucide-react";
import { contactHref } from "@/content/nav";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center section-y text-center">
      <p className="text-label-sm text-brand-teal-dark uppercase">Lỗi 404</p>
      <h1 className="mt-3 text-headline-xl-mobile text-ink md:text-headline-xl">
        Không tìm thấy trang bạn cần
      </h1>
      <p className="mt-3 max-w-md text-body-md text-ink-muted">
        Có thể đường dẫn đã thay đổi. Hãy quay lại trang chủ hoặc để lại thông tin để được tư vấn.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <LinkButton href="/" variant="outline">
          <ArrowLeft aria-hidden /> Về trang chủ
        </LinkButton>
        <LinkButton href={contactHref}>Tư Vấn Miễn Phí</LinkButton>
      </div>
    </div>
  );
}

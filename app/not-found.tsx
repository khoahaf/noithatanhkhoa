import Link from "next/link";
import { SITE } from "@/constants/site";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-eyebrow text-xs text-gold-deep">404</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl italic text-ink sm:text-4xl">
        Không tìm thấy trang bạn cần
      </h1>
      <p className="mt-3 max-w-md text-sm text-ink/60">
        Trang này có thể đã bị di chuyển hoặc không còn tồn tại. Quay lại trang
        chủ để tiếp tục khám phá nội thất Anh Khoa.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="flex h-12 items-center border border-gold px-6 text-eyebrow text-xs text-gold-deep transition-colors hover:bg-gold hover:text-night"
        >
          Về Trang Chủ
        </Link>
        <a
          href={`tel:${SITE.phone.replace(/\s/g, "")}`}
          className="flex h-12 items-center px-6 text-eyebrow text-xs text-ink/70 underline decoration-line underline-offset-4 hover:text-gold-deep"
        >
          Gọi {SITE.phone}
        </a>
      </div>
    </section>
  );
}

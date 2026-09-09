"use client";

import { SITE } from "@/constants/site";
import "./globals.css";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="vi">
      <body className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center text-ink">
        <p className="text-eyebrow text-xs text-gold-deep">Đã có lỗi xảy ra</p>
        <h1 className="mt-4 max-w-md font-[family-name:var(--font-display)] text-3xl italic sm:text-4xl">
          Rất tiếc, có trục trặc kỹ thuật
        </h1>
        <p className="mt-3 max-w-md text-sm text-ink/60">
          Vui lòng thử lại, hoặc liên hệ trực tiếp {SITE.phone} nếu vấn đề vẫn
          tiếp diễn.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="flex h-12 items-center border border-gold px-6 text-eyebrow text-xs text-gold-deep transition-colors hover:bg-gold hover:text-night"
          >
            Thử Lại
          </button>
          <a
            href="/"
            className="flex h-12 items-center px-6 text-eyebrow text-xs text-ink/70 underline decoration-line underline-offset-4 hover:text-gold-deep"
          >
            Về Trang Chủ
          </a>
        </div>
      </body>
    </html>
  );
}

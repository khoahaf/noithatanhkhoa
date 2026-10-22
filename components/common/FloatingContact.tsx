"use client";

import { MessageCircle, Phone } from "lucide-react";
import { PHONE_HREF, SITE, ZALO_URL } from "@/constants/site";

/**
 * Desktop: hai nút tròn nổi góc phải.
 * Mobile: một thanh liên hệ cố định dưới đáy (không đè lên nút của card sản phẩm);
 * body có padding-bottom tương ứng trong globals.css.
 */
export function FloatingContact() {
  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 sm:flex">
        <a
          href={PHONE_HREF}
          aria-label={`Gọi hotline ${SITE.phone}`}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-paper text-gold-deep shadow-lg transition-colors hover:bg-paper-dim"
        >
          <Phone className="h-5 w-5" strokeWidth={1.6} />
        </a>
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
        >
          <span className="flex items-center gap-2 rounded-full bg-night px-4 py-2 text-xs text-paper shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Sẵn sàng hỗ trợ · phản hồi trong 5 phút
          </span>
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0068ff] text-white shadow-lg transition-transform group-hover:scale-105">
            <MessageCircle className="h-6 w-6" strokeWidth={1.8} />
            <span className="absolute -right-1 -top-1 rounded-full bg-gold-deep px-1.5 py-0.5 text-[0.65rem] font-semibold leading-none text-paper">
              Zalo
            </span>
          </span>
        </a>
      </div>

      <nav
        aria-label="Liên hệ nhanh"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.4fr] gap-2 border-t border-line bg-paper/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur sm:hidden"
      >
        <a
          href={PHONE_HREF}
          className="flex h-12 items-center justify-center gap-2 border border-gold/50 text-sm font-medium text-gold-deep"
        >
          <Phone className="h-4 w-4" strokeWidth={1.6} />
          Gọi ngay
        </a>
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 items-center justify-center gap-2 bg-[#0068ff] text-sm font-medium text-white"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
          Chat Zalo
          <span className="flex items-center gap-1 text-xs font-normal text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            ~5 phút
          </span>
        </a>
      </nav>
    </>
  );
}

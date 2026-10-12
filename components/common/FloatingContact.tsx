"use client";

import { MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/constants/site";
import { ZALO_URL } from "@/lib/zalo";

export function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <a
        href={`tel:${SITE.phone.replace(/\s/g, "")}`}
        aria-label={`Gọi hotline ${SITE.phone}`}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-paper text-gold-deep shadow-lg transition-colors hover:bg-paper-dim"
      >
        <Phone className="h-5 w-5" strokeWidth={1.6} />
      </a>
      <a
        href={ZALO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo với Anh Khoa — phản hồi trong 5 phút"
        className="group flex items-center gap-3"
      >
        <span className="hidden items-center gap-2 rounded-full bg-night px-4 py-2 text-xs text-paper shadow-lg sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Sẵn sàng hỗ trợ · phản hồi trong 5 phút
        </span>
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0068ff] text-white shadow-lg transition-transform group-hover:scale-105">
          <MessageCircle className="h-6 w-6" strokeWidth={1.8} />
          <span className="absolute -right-1 -top-1 rounded-full bg-gold px-1.5 py-0.5 text-[0.6rem] font-semibold leading-none text-paper">
            Zalo
          </span>
          <span className="absolute -bottom-0.5 -left-0.5 h-3.5 w-3.5 rounded-full border-2 border-paper bg-emerald-400 sm:hidden" />
        </span>
      </a>
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/constants/site";

export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="lien-he" className="scroll-mt-20 py-16 sm:py-20">
      <div className="container-page grid gap-14 md:grid-cols-2">
        <div>
          <p className="text-eyebrow text-xs text-gold-deep">Liên Hệ</p>
          <p className="mt-4 max-w-md font-[family-name:var(--font-display)] text-3xl italic leading-snug text-ink sm:text-4xl">
            Ghé thăm showroom, hoặc để lại lời nhắn — Anh Khoa sẽ liên hệ tư vấn trong 24 giờ.
          </p>

          <ul className="mt-10 space-y-5 text-sm text-ink/75">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
              <span>
                {SITE.address}
                <br />
                <span className="text-ink/50">{SITE.hours}</span>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-gold-deep">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
              <a href={`mailto:${SITE.email}`} className="hover:text-gold-deep">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="border border-line/60 bg-paper-dim p-6 sm:p-8">
          {sent ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
              <p className="font-[family-name:var(--font-display)] text-2xl italic text-ink">
                Cảm ơn bạn đã liên hệ
              </p>
              <p className="mt-2 text-sm text-ink/60">
                Đội ngũ Anh Khoa sẽ gọi lại để tư vấn trong thời gian sớm nhất.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="c-name" className="text-eyebrow text-[0.62rem] text-ink/50">
                  Họ tên
                </label>
                <input
                  id="c-name"
                  required
                  type="text"
                  className="mt-2 h-11 w-full border border-ink/15 bg-paper px-3.5 text-sm text-ink placeholder:text-ink/35 focus:border-gold"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div>
                <label htmlFor="c-phone" className="text-eyebrow text-[0.62rem] text-ink/50">
                  Số điện thoại
                </label>
                <input
                  id="c-phone"
                  required
                  type="tel"
                  className="mt-2 h-11 w-full border border-ink/15 bg-paper px-3.5 text-sm text-ink placeholder:text-ink/35 focus:border-gold"
                  placeholder="09xx xxx xxx"
                />
              </div>
              <div>
                <label htmlFor="c-message" className="text-eyebrow text-[0.62rem] text-ink/50">
                  Bạn quan tâm điều gì?
                </label>
                <textarea
                  id="c-message"
                  rows={3}
                  className="mt-2 w-full resize-none border border-ink/15 bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-gold"
                  placeholder="VD: Tư vấn Bộ sưu tập Hoàng Kim Tự Nhiên cho phòng khách 20m²"
                />
              </div>
              <button
                type="submit"
                className="h-12 w-full bg-night text-eyebrow text-xs text-gold-light transition-colors hover:bg-night-soft"
              >
                Gửi Yêu Cầu Tư Vấn
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

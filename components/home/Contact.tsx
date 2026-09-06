"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, ShoppingBag } from "lucide-react";
import { SITE } from "@/constants/site";
import { cartTotal, useCartStore, type CartItem } from "@/store/cartStore";
import { formatVND } from "@/lib/utils";
import { useMounted } from "@/lib/useMounted";

function buildCartMessage(items: CartItem[]) {
  if (items.length === 0) return "";
  const lines = items.map((i) => `- ${i.name} x${i.quantity}`);
  return `Tôi quan tâm các sản phẩm sau, nhờ Anh Khoa tư vấn giúp:\n${lines.join("\n")}`;
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const [message, setMessage] = useState("");
  const lastAutoMessage = useRef("");

  // Keep the message in sync with the cart, but only while the visitor
  // hasn't typed something of their own over the auto-generated summary.
  useEffect(() => {
    if (!mounted) return;
    const generated = buildCartMessage(items);
    const previousAuto = lastAutoMessage.current;
    lastAutoMessage.current = generated;
    setMessage((current) => (current === previousAuto ? generated : current));
  }, [mounted, items]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
    clearCart();
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
              {mounted && items.length > 0 && (
                <div className="border border-gold/40 bg-paper p-4">
                  <p className="flex items-center gap-2 text-eyebrow text-[0.62rem] text-gold-deep">
                    <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Sản phẩm trong giỏ ({items.length})
                  </p>
                  <ul className="mt-2.5 space-y-1 text-sm text-ink/75">
                    {items.map((item) => (
                      <li key={item.slug} className="flex justify-between gap-3">
                        <span>
                          {item.name} <span className="text-ink/40">x{item.quantity}</span>
                        </span>
                        <span className="shrink-0 font-[family-name:var(--font-mono)] text-xs text-ink/60">
                          {formatVND(item.price * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2.5 flex justify-between border-t border-line/50 pt-2.5 text-sm">
                    <span className="text-ink/60">Tạm tính</span>
                    <span className="font-[family-name:var(--font-mono)] text-ink">
                      {formatVND(cartTotal(items))}
                    </span>
                  </div>
                </div>
              )}
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
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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

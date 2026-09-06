"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { cartTotal, useCartStore } from "@/store/cartStore";
import { formatVND } from "@/lib/utils";
import { useMounted } from "@/lib/useMounted";

export function CartDrawer() {
  const mounted = useMounted();
  const isOpen = useCartStore((s) => s.isOpen);
  const items = useCartStore((s) => s.items);
  const close = useCartStore((s) => s.close);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  if (!mounted) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-night/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-paper shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Giỏ hàng"
        aria-hidden={!isOpen}
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-line/60 px-6">
          <p className="text-eyebrow text-xs text-ink">
            Giỏ Hàng {items.length > 0 && `(${items.length})`}
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Đóng giỏ hàng"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink/60 hover:bg-paper-dim hover:text-ink"
          >
            <X className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-8 w-8 text-ink/25" strokeWidth={1.25} />
            <p className="text-sm text-ink/60">Giỏ hàng của bạn đang trống.</p>
            <button
              type="button"
              onClick={close}
              className="mt-2 text-eyebrow text-[0.68rem] text-gold-deep underline underline-offset-4"
            >
              Tiếp tục xem sản phẩm
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <ul className="divide-y divide-line/50">
                {items.map((item) => (
                  <li key={item.slug} className="flex gap-4 py-5">
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-paper-dim">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-[family-name:var(--font-display)] text-base leading-snug text-ink">
                          {item.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug)}
                          aria-label={`Xoá ${item.name} khỏi giỏ`}
                          className="shrink-0 text-ink/35 hover:text-ink"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-line">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                            aria-label="Giảm số lượng"
                            className="flex h-7 w-7 items-center justify-center text-ink/70 hover:text-gold-deep"
                          >
                            <Minus className="h-3 w-3" strokeWidth={1.5} />
                          </button>
                          <span className="w-7 text-center font-[family-name:var(--font-mono)] text-xs text-ink">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                            aria-label="Tăng số lượng"
                            className="flex h-7 w-7 items-center justify-center text-ink/70 hover:text-gold-deep"
                          >
                            <Plus className="h-3 w-3" strokeWidth={1.5} />
                          </button>
                        </div>
                        <span className="font-[family-name:var(--font-mono)] text-sm text-gold-deep">
                          {formatVND(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="shrink-0 border-t border-line/60 px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink/60">Tạm tính</span>
                <span className="font-[family-name:var(--font-mono)] text-base text-ink">
                  {formatVND(cartTotal(items))}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-ink/45">
                Giá trên chưa bao gồm chi phí giao hàng &amp; lắp đặt.
              </p>
              <Link
                href="#lien-he"
                onClick={close}
                className="mt-4 flex h-12 w-full items-center justify-center bg-night text-eyebrow text-xs text-gold-light transition-colors hover:bg-night-soft"
              >
                Gửi Giỏ Hàng Để Được Tư Vấn
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

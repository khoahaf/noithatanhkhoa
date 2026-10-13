"use client";

import Image from "next/image";
import { useRef } from "react";
import { Heart, Minus, Plus, Trash2, X } from "lucide-react";
import { PRICE_NOTE } from "@/constants/site";
import { useCartStore } from "@/store/cartStore";
import { useMounted } from "@/lib/useMounted";
import { useDialog } from "@/lib/useDialog";

/** "Danh sách quan tâm" — hàng may đo không có giá cố định nên không gọi là giỏ hàng. */
export function CartDrawer() {
  const mounted = useMounted();
  const isOpen = useCartStore((s) => s.isOpen);
  const items = useCartStore((s) => s.items);
  const close = useCartStore((s) => s.close);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const panelRef = useRef<HTMLElement>(null);
  useDialog(mounted && isOpen, close, panelRef);

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
        ref={panelRef}
        inert={!isOpen}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-paper shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Danh sách quan tâm"
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-line/60 px-6">
          <p className="text-eyebrow text-xs text-ink">
            Danh Sách Quan Tâm {items.length > 0 && `(${items.length})`}
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Đóng danh sách quan tâm"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink/60 hover:bg-paper-dim hover:text-ink"
          >
            <X className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <Heart className="h-8 w-8 text-ink/25" strokeWidth={1.25} />
            <p className="text-[15px] text-ink/60">
              Chưa có mẫu nào. Bấm “Thêm vào danh sách” ở mẫu bạn thích để nhờ Anh Khoa tư vấn cùng lúc.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-2 text-eyebrow text-xs text-gold-deep underline underline-offset-4"
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
                          aria-label={`Bỏ ${item.name} khỏi danh sách`}
                          className="-m-3 shrink-0 p-3 text-ink/35 hover:text-ink"
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
                            className="flex h-11 w-11 items-center justify-center text-ink/70 hover:text-gold-deep"
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
                            className="flex h-11 w-11 items-center justify-center text-ink/70 hover:text-gold-deep"
                          >
                            <Plus className="h-3 w-3" strokeWidth={1.5} />
                          </button>
                        </div>
                        <span className="text-xs text-gold-deep">{PRICE_NOTE}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="shrink-0 border-t border-line/60 px-6 py-5">
              <p className="text-sm leading-relaxed text-ink/60">
                Báo giá theo kích thước căn hộ của bạn, sau khi đo đạc và chốt chất liệu.
              </p>
              <a
                href="#lien-he"
                onClick={close}
                className="mt-4 flex h-12 w-full items-center justify-center bg-night text-eyebrow text-xs text-gold-light transition-colors hover:bg-night-soft"
              >
                Nhận Báo Giá Cho Danh Sách Này
              </a>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

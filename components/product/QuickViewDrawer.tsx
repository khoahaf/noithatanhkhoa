"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Check, Heart, MessageCircle, X } from "lucide-react";
import { getProduct } from "@/data/products";
import { PRICE_NOTE, PRODUCT_TAG } from "@/constants/site";
import { cn, formatSizeMM } from "@/lib/utils";
import { openZaloWithMessage, quoteMessage } from "@/lib/zalo";
import { useCatalogStore } from "@/store/catalogStore";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";
import { useDialog } from "@/lib/useDialog";
import { SizeDiagram } from "./SizeDiagram";

export function QuickViewDrawer() {
  const slug = useCatalogStore((s) => s.quickView);
  const close = useCatalogStore((s) => s.closeQuickView);
  const product = slug ? getProduct(slug) : undefined;
  const isOpen = Boolean(product);

  const panelRef = useRef<HTMLElement>(null);
  useDialog(isOpen, close, panelRef);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-night/45 transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={close}
        aria-hidden="true"
      />
      <aside
        ref={panelRef}
        inert={!isOpen}
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col bg-paper shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label={product ? `Chi tiết ${product.name}` : "Chi tiết sản phẩm"}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line/70 px-6">
          <p className="text-eyebrow text-xs text-ink/70">Chi Tiết Sản Phẩm</p>
          <button
            type="button"
            onClick={close}
            aria-label="Đóng"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink/70 hover:bg-paper-dim hover:text-ink"
          >
            <X className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
        </div>
        {/* key: reset ảnh đang chọn mỗi khi đổi sản phẩm */}
        {product && <QuickViewBody key={product.slug} product={product} />}
      </aside>
    </>
  );
}

function QuickViewBody({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<boolean | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const closeQuickView = useCatalogStore((s) => s.closeQuickView);
  const dims = product.size ? formatSizeMM(product.size) : product.dimensions;

  async function requestQuote() {
    setCopied(await openZaloWithMessage(quoteMessage(product.name, dims)));
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="relative aspect-[4/3] bg-paper-dim">
          <Image
            src={product.gallery[active] ?? product.image}
            alt={product.name}
            fill
            sizes="(min-width: 640px) 576px, 100vw"
            className="object-cover"
          />
        </div>
        {product.gallery.length > 1 && (
          <div className="flex gap-2 px-6 pt-3">
            {product.gallery.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Xem ảnh ${i + 1}`}
                aria-pressed={i === active}
                className={cn(
                  "relative h-16 w-16 overflow-hidden border-2 transition-colors",
                  i === active ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <Image src={src} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="px-6 pb-8 pt-6">
          <p className="text-eyebrow text-xs text-gold-deep">
            {product.tag} · {PRODUCT_TAG}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl leading-tight text-ink">
            {product.name}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{product.description}</p>

          <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
            {product.features && (
              <div className="flex justify-between gap-4 py-3">
                <dt className="shrink-0 text-ink/70">Đặc tính</dt>
                <dd className="text-right text-ink">{product.features}</dd>
              </div>
            )}
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-ink/70">Chất liệu</dt>
              <dd className="text-right text-ink">{product.material}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-ink/70">Kích thước mẫu (D x S x C)</dt>
              <dd className="text-right font-[family-name:var(--font-mono)] text-[13px] text-ink">
                {dims}
              </dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-ink/70">Giá tham khảo theo kích thước mẫu</dt>
              <dd className="text-right font-medium text-gold-deep">{PRICE_NOTE}</dd>
            </div>
          </dl>

          {product.size && (
            <div className="mt-6 border border-line bg-paper-dim/60 p-5">
              <p className="mb-3 text-eyebrow text-xs text-ink/70">
                Tỷ lệ so với người cao 170 cm
              </p>
              <SizeDiagram size={product.size} />
              <p className="mt-2 text-xs text-ink/70">
                Có thể may đo theo kích thước riêng cho không gian của bạn.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 space-y-2.5 border-t border-line/70 px-6 py-4">
        <button
          type="button"
          onClick={requestQuote}
          className="flex h-12 w-full items-center justify-center gap-2 bg-[#0068ff] text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
          Gửi yêu cầu báo giá mẫu này qua Zalo
        </button>
        {copied !== null && (
          <p className="flex items-center gap-1.5 text-xs text-ink/70" role="status">
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Đã chép sẵn tin nhắn kèm tên mẫu — dán vào Zalo để gửi.
              </>
            ) : (
              <>Hãy nhắn tên mẫu “{product.name}” cho Anh Khoa trên Zalo vừa mở.</>
            )}
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            addItem({
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
            });
            closeQuickView();
          }}
          className="flex h-11 w-full items-center justify-center gap-2 border border-gold text-eyebrow text-xs text-gold-deep transition-colors hover:bg-gold-deep hover:text-paper"
        >
          <Heart className="h-3.5 w-3.5" strokeWidth={1.5} />
          Thêm vào danh sách quan tâm
        </button>
      </div>
    </>
  );
}

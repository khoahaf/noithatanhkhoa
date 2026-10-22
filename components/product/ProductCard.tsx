"use client";

import Image from "next/image";
import type { Product } from "@/types";
import { CTA, PRICE_NOTE, PRODUCT_TAG } from "@/constants/site";
import { cn, formatSizeMM } from "@/lib/utils";
import { useCatalogStore } from "@/store/catalogStore";
import { useCartStore } from "@/store/cartStore";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const openQuickView = useCatalogStore((s) => s.openQuickView);
  const addItem = useCartStore((s) => s.addItem);
  const altImage = product.gallery.find((g) => g !== product.image);
  const open = () => openQuickView(product.slug);
  const dims = product.size ? formatSizeMM(product.size) : product.dimensions;

  return (
    <div className={cn("group flex flex-col", className)}>
      <div className="relative">
        <button
          type="button"
          onClick={open}
          aria-label={`Xem chi tiết ${product.name}`}
          className="relative block aspect-square w-full overflow-hidden bg-paper-dim"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
            className={cn(
              "object-cover transition-all duration-700 ease-out",
              altImage ? "group-hover:opacity-0" : "group-hover:scale-105"
            )}
          />
          {/* Hover: chuyển sang ảnh đặt trong không gian / cận chất liệu */}
          {altImage && (
            <Image
              src={altImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
              className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
          <span className="absolute inset-x-3 bottom-3 hidden bg-paper/95 py-2.5 text-center text-eyebrow text-xs text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
            Xem Chi Tiết
          </span>
        </button>
        {/* Đặt ngoài nút ảnh để tên truy cập của nút khớp chữ hiển thị "Xem Chi Tiết". */}
        {product.isNew && (
          <span className="pointer-events-none absolute left-3 top-3 bg-night px-2.5 py-1 text-eyebrow text-xs text-gold-light">
            Mới
          </span>
        )}
      </div>

      <p className="mt-4 self-start text-balance border border-gold/40 px-2 py-0.5 text-xs leading-snug text-gold-deep">
        {PRODUCT_TAG}
      </p>
      <button type="button" onClick={open} className="min-h-11 py-2 text-left">
        <span className="text-[15px] font-semibold leading-snug text-ink transition-colors hover:text-gold-deep">
          {product.name}
        </span>
      </button>
      <p className="text-xs leading-relaxed text-ink/70">
        Kích thước mẫu:{" "}
        <span className="font-[family-name:var(--font-mono)] text-ink/80 min-[360px]:whitespace-nowrap">{dims}</span>
        {product.size && (
          <>
            {" "}
            <span className="whitespace-nowrap">(D x S x C)</span>
          </>
        )}
      </p>
      <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-ink/70 sm:text-sm">
        {product.features ?? product.material}
      </p>
      <p className="mt-2 text-balance text-[13px] leading-snug text-ink/70 sm:text-sm">
        Giá tham khảo theo kích thước mẫu:{" "}
        <span className="whitespace-nowrap font-medium text-gold-deep">{PRICE_NOTE}</span>
      </p>
      <div className="min-h-3 flex-1" />
      {/* Thêm mẫu vào danh sách (form Liên Hệ tự điền tên mẫu) rồi cuộn tới form. */}
      <a
        href="#lien-he"
        onClick={() =>
          addItem(
            { slug: product.slug, name: product.name, price: product.price, image: product.image },
            1,
            false
          )
        }
        className="mt-auto flex min-h-11 w-full items-center justify-center whitespace-nowrap border border-gold px-1 py-2 text-center text-xs font-medium leading-snug sm:px-3 sm:text-[13px] text-gold-deep transition-colors hover:bg-gold-deep hover:text-paper sm:w-auto sm:self-start"
      >
        {CTA.productQuote}
      </a>
    </div>
  );
}

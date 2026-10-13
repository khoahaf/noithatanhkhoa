"use client";

import Image from "next/image";
import type { Product } from "@/types";
import { cn, formatMillions, formatSizeMM } from "@/lib/utils";
import { useCatalogStore } from "@/store/catalogStore";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const openQuickView = useCatalogStore((s) => s.openQuickView);
  const altImage = product.gallery.find((g) => g !== product.image);
  const open = () => openQuickView(product.slug);

  return (
    <div className={cn("group flex flex-col", className)}>
      <button
        type="button"
        onClick={open}
        aria-label={`Xem chi tiết ${product.name}`}
        className="relative aspect-square overflow-hidden bg-paper-dim"
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
        {product.isNew && (
          <span className="absolute left-3 top-3 bg-night px-2.5 py-1 text-eyebrow text-xs text-gold-light">
            Mới
          </span>
        )}
        <span className="absolute inset-x-3 bottom-3 hidden bg-paper/95 py-2.5 text-center text-eyebrow text-xs text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
          Xem Chi Tiết
        </span>
      </button>

      <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-gold-deep">{product.tag}</p>
      <button type="button" onClick={open} className="mt-1.5 text-left">
        <span className="text-[15px] font-semibold leading-snug text-ink transition-colors hover:text-gold-deep">
          {product.name}
        </span>
      </button>
      {product.size && (
        <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-ink/60">
          {formatSizeMM(product.size)}
        </p>
      )}
      <p className="mt-2 text-sm text-ink/60">
        Giá tham khảo từ{" "}
        <span className="whitespace-nowrap font-[family-name:var(--font-mono)] text-sm text-ink">
          {formatMillions(product.price)}
        </span>
      </p>
      <button
        type="button"
        onClick={open}
        className="mt-3 min-h-9 w-full border border-gold px-3 py-2 text-[13px] font-medium leading-snug text-gold-deep sm:w-auto sm:self-start transition-colors hover:bg-gold hover:text-paper"
      >
        Xem chi tiết &amp; kích thước
      </button>
    </div>
  );
}

"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { formatVND, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className={cn("group", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-dim">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 80vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {(product.isNew || product.compareAtPrice) && (
          <span className="absolute left-3 top-3 bg-night px-2.5 py-1 text-eyebrow text-[0.6rem] text-gold-light">
            {product.isNew ? "Mới" : "Ưu đãi"}
          </span>
        )}
        <button
          type="button"
          onClick={() =>
            addItem({
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
            })
          }
          aria-label={`Thêm ${product.name} vào giỏ`}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-paper/95 text-ink opacity-0 shadow-sm transition-all duration-300 hover:bg-gold hover:text-night group-hover:opacity-100 focus-visible:opacity-100"
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
      <p className="mt-3.5 font-[family-name:var(--font-display)] text-lg leading-snug text-ink">
        {product.name}
      </p>
      <div className="mt-1 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-sm">
          <span className="text-gold-deep">{formatVND(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-ink/35 line-through">
              {formatVND(product.compareAtPrice)}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() =>
            addItem({
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
            })
          }
          className="text-eyebrow text-[0.62rem] text-ink/60 underline decoration-line underline-offset-4 transition-colors hover:text-gold-deep sm:hidden"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}

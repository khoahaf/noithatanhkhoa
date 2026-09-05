import Image from "next/image";
import type { Product } from "@/types";
import { formatVND, cn } from "@/lib/utils";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
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
      </div>
      <p className="mt-3.5 font-[family-name:var(--font-display)] text-lg leading-snug text-ink">
        {product.name}
      </p>
      <div className="mt-1 flex items-center gap-2 font-[family-name:var(--font-mono)] text-sm">
        <span className="text-gold-deep">{formatVND(product.price)}</span>
        {product.compareAtPrice && (
          <span className="text-ink/35 line-through">
            {formatVND(product.compareAtPrice)}
          </span>
        )}
      </div>
    </div>
  );
}

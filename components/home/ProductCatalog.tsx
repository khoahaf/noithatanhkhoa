"use client";

import { X } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { categories } from "@/data/categories";
import { getCollection } from "@/data/collections";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { useCatalogStore } from "@/store/catalogStore";

const tabs = [{ slug: "all", name: "Tất Cả" }, ...categories];

export function ProductCatalog() {
  const category = useCatalogStore((s) => s.category);
  const collectionSlug = useCatalogStore((s) => s.collection);
  const setCategory = useCatalogStore((s) => s.setCategory);
  const setCollection = useCatalogStore((s) => s.setCollection);
  const collection = collectionSlug ? getCollection(collectionSlug) : undefined;

  const list = collection
    ? products.filter((p) => collection.productSlugs.includes(p.slug))
    : category === "all"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <section id="san-pham" className="section-y scroll-mt-20">
      <div className="container-page">
        <div className="rule-diamond mb-8">
          <h2 className="text-eyebrow shrink-0 text-xs text-gold-deep">Sản Phẩm Tiêu Biểu</h2>
        </div>

        <div
          role="group"
          aria-label="Lọc theo không gian"
          className="no-scrollbar -mx-5 mb-4 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:justify-center md:px-0"
        >
          {tabs.map((t) => {
            const active = !collection && category === t.slug;
            return (
              <button
                key={t.slug}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(t.slug)}
                className={cn(
                  "h-11 shrink-0 border px-5 text-[13px] font-medium tracking-wide transition-colors",
                  active
                    ? "border-night bg-night text-gold-light"
                    : "border-line text-ink/75 hover:border-gold hover:text-gold-deep"
                )}
              >
                {t.name}
              </button>
            );
          })}
        </div>

        <div className="mb-10 flex min-h-8 flex-wrap items-center justify-center gap-3 text-sm text-ink/60" aria-live="polite">
          {collection ? (
            <>
              <span>
                Bộ sưu tập <strong className="font-semibold text-ink">{collection.name}</strong> ·{" "}
                {list.length} mẫu
              </span>
              <button
                type="button"
                onClick={() => setCollection(null)}
                className="inline-flex min-h-11 items-center gap-1 border border-line px-3 text-ink/70 hover:border-gold hover:text-gold-deep"
              >
                <X className="h-3.5 w-3.5" strokeWidth={1.5} />
                Bỏ lọc
              </button>
            </>
          ) : (
            <span>{list.length} mẫu · bấm vào mẫu để xem chi tiết & kích thước</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

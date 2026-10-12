"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { useCatalogStore } from "@/store/catalogStore";

const tabs = [{ slug: "all", name: "Tất Cả" }, ...categories];

export function ProductCatalog() {
  const category = useCatalogStore((s) => s.category);
  const setCategory = useCatalogStore((s) => s.setCategory);
  const list =
    category === "all" ? products : products.filter((p) => p.category === category);

  return (
    <section id="san-pham" className="section-y scroll-mt-20">
      <div className="container-page">
        <div className="rule-diamond mb-8">
          <p className="text-eyebrow shrink-0 text-xs text-gold-deep">Sản Phẩm</p>
        </div>

        <div
          role="tablist"
          aria-label="Lọc theo không gian"
          className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:justify-center md:px-0"
        >
          {tabs.map((t) => (
            <button
              key={t.slug}
              type="button"
              role="tab"
              aria-selected={category === t.slug}
              onClick={() => setCategory(t.slug)}
              className={cn(
                "h-10 shrink-0 border px-5 text-eyebrow text-[0.65rem] transition-colors",
                category === t.slug
                  ? "border-night bg-night text-gold-light"
                  : "border-line text-ink/70 hover:border-gold hover:text-gold-deep"
              )}
            >
              {t.name}
            </button>
          ))}
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

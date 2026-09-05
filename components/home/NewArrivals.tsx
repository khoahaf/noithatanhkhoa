import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";

export function NewArrivals() {
  const list = products.filter((p) => p.isNew || p.featured).slice(0, 8);
  return (
    <section id="san-pham" className="scroll-mt-20 py-16 sm:py-20">
      <div className="container-page mb-10 flex items-end justify-between gap-4">
        <div className="rule-diamond flex-1">
          <p className="text-eyebrow shrink-0 text-xs text-gold-deep">
            Sản Phẩm Mới &amp; Nổi Bật
          </p>
        </div>
        <Link
          href="#lien-he"
          className="hidden shrink-0 text-eyebrow text-[0.65rem] text-ink/60 hover:text-gold-deep sm:block"
        >
          Liên Hệ Đặt Hàng →
        </Link>
      </div>
      <div className="no-scrollbar container-page flex gap-5 overflow-x-auto pb-2">
        {list.map((p) => (
          <ProductCard
            key={p.slug}
            product={p}
            className="w-[68vw] shrink-0 sm:w-[38vw] md:w-[26vw] lg:w-[21vw]"
          />
        ))}
      </div>
    </section>
  );
}

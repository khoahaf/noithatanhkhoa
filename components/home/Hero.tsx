"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowDown, Plus } from "lucide-react";
import { CTA, PRICE_NOTE } from "@/constants/site";
import { getProduct } from "@/data/products";
import { cn } from "@/lib/utils";
import { img } from "@/lib/images";
import { useCatalogStore } from "@/store/catalogStore";
import type { Hotspot } from "@/types";

const hotspots: Hotspot[] = [
  { top: "64%", left: "27%", label: "Armchair Nắng Vàng", productSlug: "armchair-nang-vang" },
  { top: "52%", left: "70%", label: "Bộ Sưu Tập Mộc Tịnh", collectionSlug: "moc-tinh" },
];

export function Hero() {
  const [active, setActive] = useState<number | null>(null);
  const openQuickView = useCatalogStore((s) => s.openQuickView);
  const setCollection = useCatalogStore((s) => s.setCollection);

  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden bg-night">
      <Image
        src={img.heroLivingRoom}
        alt="Không gian phòng khách với armchair vàng và tường tranh nghệ thuật"
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/15 to-night/40" />

      {hotspots.map((h, i) => {
        const product = h.productSlug ? getProduct(h.productSlug) : undefined;
        return (
          <div
            key={h.label}
            style={{ top: h.top, left: h.left }}
            className="absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:block"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <button
              type="button"
              onClick={() => setActive(active === i ? null : i)}
              aria-expanded={active === i}
              aria-label={h.label}
              className="relative flex h-8 w-8 items-center justify-center"
            >
              <span className="hotspot-ring absolute inset-0 rounded-full border border-gold-light" />
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold-light shadow-[0_0_0_6px_rgba(217,194,154,0.15)]">
                <Plus className="h-2.5 w-2.5 text-night" strokeWidth={3} />
              </span>
            </button>
            <div
              className={cn(
                "absolute left-1/2 top-[calc(100%+10px)] w-56 -translate-x-1/2 border border-gold/25 bg-night/95 p-4 text-left shadow-xl backdrop-blur transition-all duration-200",
                active === i
                  ? "pointer-events-auto visible translate-y-0 opacity-100"
                  : "pointer-events-none invisible -translate-y-1 opacity-0"
              )}
            >
              <p className="font-[family-name:var(--font-display)] text-lg text-paper">{h.label}</p>
              {product && (
                <p className="mt-1 text-sm text-paper/60">
                  Giá tham khảo: <span className="text-gold-light">{PRICE_NOTE}</span>
                </p>
              )}
              {product ? (
                <button
                  type="button"
                  onClick={() => openQuickView(product.slug)}
                  className="mt-3 text-eyebrow text-xs text-gold-light underline decoration-gold/40 underline-offset-4"
                >
                  Xem chi tiết &amp; kích thước
                </button>
              ) : (
                <a
                  href="#san-pham"
                  onClick={() => h.collectionSlug && setCollection(h.collectionSlug)}
                  className="mt-3 inline-block text-eyebrow text-xs text-gold-light underline decoration-gold/40 underline-offset-4"
                >
                  Xem các mẫu trong bộ
                </a>
              )}
            </div>
          </div>
        );
      })}

      <div className="container-page relative z-[5] flex h-full flex-col justify-end pb-20 pt-32 sm:pb-24">
        <p className="text-eyebrow text-xs text-gold-light">Nội Thất Anh Khoa</p>
        <h1 className="mt-5 max-w-xl font-[family-name:var(--font-display)] text-[2.5rem] italic leading-[1.25] text-paper lg:text-[3rem]">
          Sống an nhiên,
          <br />
          trong từng góc nhỏ.
        </h1>
        <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-paper/80">
          Từng đường vân gỗ và chi tiết mạ đồng được chế tác để kiến tạo chốn về
          an yên. Thiết kế tinh giản, may đo chuẩn xác cho từng mét vuông căn hộ của bạn.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#lien-he"
            className="flex h-12 items-center bg-gold px-7 text-eyebrow text-xs text-paper transition-colors hover:bg-gold-deep"
          >
            {CTA.heroPrimary}
          </a>
          <a
            href="#bo-suu-tap"
            className="flex h-12 items-center gap-2 border border-gold-light/60 px-6 text-eyebrow text-xs text-paper/90 transition-colors hover:border-gold-light hover:text-gold-light"
          >
            {CTA.heroSecondary}
            <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}

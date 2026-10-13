"use client";

import Image from "next/image";
import { categories } from "@/data/categories";
import { useCatalogStore } from "@/store/catalogStore";

export function SpaceNav() {
  const setCategory = useCatalogStore((s) => s.setCategory);

  return (
    <section id="bo-suu-tap" className="container-page section-y scroll-mt-20">
      <div className="rule-diamond mb-3">
        <h2 className="text-eyebrow min-w-0 text-center text-xs text-gold-deep">
          Chọn Không Gian Cho Tổ Ấm
        </h2>
      </div>
      <p className="mx-auto mb-10 max-w-xl text-center text-[15px] leading-relaxed text-ink/65">
        Giải pháp nội thất đồng bộ phong cách, tối ưu hóa diện tích sinh hoạt gia đình.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {categories.map((c) => (
          // Cuộn xuống catalog và bật sẵn bộ lọc đúng nhóm.
          <a
            key={c.slug}
            href="#san-pham"
            onClick={() => setCategory(c.slug)}
            className="group relative flex aspect-[3/4.4] items-end overflow-hidden bg-night sm:aspect-[3/4]"
          >
            <Image
              src={c.image}
              alt={c.name}
              fill
              sizes="(min-width:768px) 20vw, 45vw"
              className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/30 to-transparent" />
            <div className="relative z-[1] p-4">
              <h3 className="font-[family-name:var(--font-display)] text-xl leading-tight text-paper">
                {c.name}
              </h3>
              <p className="mt-1.5 text-xs leading-snug text-paper/80">
                {c.tagline}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

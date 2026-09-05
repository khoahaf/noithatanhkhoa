"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import { formatVND, cn } from "@/lib/utils";
import { img } from "@/lib/images";
import type { Hotspot } from "@/types";

const hotspots: Hotspot[] = [
  {
    top: "64%",
    left: "27%",
    label: "Armchair Nắng Vàng",
    price: 19500000,
    href: "#san-pham",
  },
  {
    top: "52%",
    left: "70%",
    label: "Bộ Sưu Tập Mộc Tịnh",
    href: "#bo-suu-tap",
  },
];

export function Hero() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden bg-night">
      <Image
        src={img.heroLivingRoom}
        alt="Không gian phòng khách với armchair vàng và tường tranh nghệ thuật"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/15 to-night/40" />

      {hotspots.map((h, i) => (
        <button
          key={h.label}
          type="button"
          onClick={() => setActive(active === i ? null : i)}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
          style={{ top: h.top, left: h.left }}
          className="absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:block"
          aria-label={h.label}
        >
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span className="hotspot-ring absolute inset-0 rounded-full border border-gold-light" />
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold-light shadow-[0_0_0_6px_rgba(231,205,134,0.15)]">
              <Plus className="h-2.5 w-2.5 text-night" strokeWidth={3} />
            </span>
          </span>
          <div
            className={cn(
              "absolute left-1/2 top-[calc(100%+10px)] w-52 -translate-x-1/2 border border-gold/25 bg-night/95 p-4 text-left shadow-xl backdrop-blur transition-all duration-200",
              active === i
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0"
            )}
          >
            <p className="font-[family-name:var(--font-display)] text-base text-paper">
              {h.label}
            </p>
            {h.price && (
              <p className="mt-1 font-[family-name:var(--font-mono)] text-sm text-gold-light">
                {formatVND(h.price)}
              </p>
            )}
            <Link
              href={h.href}
              className="mt-2 inline-block text-eyebrow text-[0.62rem] text-gold-light underline decoration-gold/40 underline-offset-4"
            >
              Khám phá
            </Link>
          </div>
        </button>
      ))}

      <div className="container-page relative z-[5] flex h-full flex-col justify-end pb-20 pt-32 sm:pb-24">
        <p className="text-eyebrow text-xs text-gold-light">Nội Thất Anh Khoa</p>
        <h1 className="mt-5 max-w-xl font-[family-name:var(--font-display)] text-5xl italic leading-[1.08] text-paper sm:text-6xl md:text-7xl">
          Sống an nhiên,
          <br />
          trong từng góc nhỏ.
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/70">
          Từng đường vân gỗ, từng chi tiết mạ đồng được chọn lựa để kiến tạo
          một không gian sống bạn muốn trở về mỗi ngày.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <Link
            href="#bo-suu-tap"
            className="flex h-12 items-center bg-gold px-7 text-eyebrow text-xs text-night transition-colors hover:bg-gold-light"
          >
            Khám Phá Bộ Sưu Tập
          </Link>
          <Link
            href="#san-pham"
            className="text-eyebrow text-xs text-paper/80 underline decoration-gold/30 underline-offset-8 transition-colors hover:text-gold-light"
          >
            Xem Sản Phẩm Nổi Bật
          </Link>
        </div>
      </div>
    </section>
  );
}

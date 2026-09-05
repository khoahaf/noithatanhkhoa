import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";

export function SpaceNav() {
  return (
    <section className="container-page py-16 sm:py-20">
      <div className="rule-diamond mb-10">
        <p className="text-eyebrow shrink-0 text-xs text-gold-deep">
          Chọn Không Gian Của Bạn
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href="#san-pham"
            className="group relative flex aspect-[3/4] items-end overflow-hidden bg-night"
          >
            <Image
              src={c.image}
              alt={c.name}
              fill
              sizes="(min-width:768px) 20vw, 45vw"
              className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/10 to-transparent" />
            <div className="relative z-[1] p-4">
              <p className="font-[family-name:var(--font-display)] text-xl text-paper">
                {c.name}
              </p>
              <p className="mt-1 text-[0.7rem] leading-snug text-paper/60">
                {c.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

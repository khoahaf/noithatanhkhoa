import Image from "next/image";
import { collections } from "@/data/collections";

export function FeaturedCollections() {
  const [wide, ...rest] = collections;
  return (
    <section id="bo-suu-tap" className="scroll-mt-20 bg-paper-dim py-16 sm:py-20">
      <div className="container-page">
        <div className="rule-diamond mb-10">
          <p className="text-eyebrow shrink-0 text-xs text-gold-deep">
            Bộ Sưu Tập Nổi Bật
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <CollectionTile collection={wide} tall />
          <div className="grid gap-3">
            {rest.map((c) => (
              <CollectionTile key={c.slug} collection={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CollectionTile({
  collection,
  tall,
}: {
  collection: (typeof collections)[number];
  tall?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden bg-night ${
        tall ? "aspect-[4/5] md:aspect-auto md:h-full" : "aspect-[16/9]"
      }`}
    >
      <Image
        src={collection.heroImage}
        alt={collection.name}
        fill
        sizes="(min-width:768px) 50vw, 100vw"
        className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/10 to-transparent" />
      <div className="relative z-[1] flex h-full flex-col justify-end p-6 sm:p-8">
        <p className="text-eyebrow text-[0.65rem] text-gold-light">
          {collection.tagline}
        </p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-3xl italic text-paper sm:text-4xl">
          {collection.name}
        </p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper/60">
          {collection.description}
        </p>
      </div>
    </div>
  );
}

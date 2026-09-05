import Image from "next/image";
import { img } from "@/lib/images";

const photos = [
  { src: img.livingRoomBlue, tall: false },
  { src: img.bedroomArt, tall: true },
  { src: img.livingRoomStripe, tall: false },
  { src: img.openLivingDining, tall: false },
  { src: img.livingRoomGreen, tall: true },
  { src: img.bedroomLux, tall: false },
];

export function InstagramGallery() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="rule-diamond mb-3">
          <p className="text-eyebrow shrink-0 text-xs text-gold-deep">
            Không Gian Của Bạn
          </p>
        </div>
        <p className="mb-10 max-w-md text-sm text-ink/55">
          Gắn thẻ{" "}
          <span className="font-[family-name:var(--font-mono)] text-gold-deep">
            @anhkhoa.vn
          </span>{" "}
          để góc nhà bạn xuất hiện tại đây.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {photos.map((p, i) => (
            <div
              key={i}
              className={`relative overflow-hidden bg-paper-dim ${
                p.tall ? "row-span-2 aspect-[3/4]" : "aspect-square"
              }`}
            >
              <Image
                src={p.src}
                alt="Không gian sống của khách hàng Anh Khoa"
                fill
                sizes="(min-width:768px) 16vw, 45vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

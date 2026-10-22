import Image from "next/image";
import { img } from "@/lib/images";
import { SITE } from "@/constants/site";

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
    <section className="section-y">
      <div className="container-page">
        <div className="rule-diamond mb-3">
          <h2 className="text-eyebrow shrink-0 text-xs text-gold-deep">
            Góc Nhà Khách Hàng
          </h2>
        </div>
        <p className="mb-10 max-w-md text-[15px] text-ink/70">
          Gắn thẻ{" "}
          {SITE.social.instagram ? (
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-mono)] text-gold-deep underline underline-offset-4"
            >
              {SITE.social.instagramHandle}
            </a>
          ) : (
            <span className="font-[family-name:var(--font-mono)] text-gold-deep">
              {SITE.social.instagramHandle}
            </span>
          )}{" "}
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

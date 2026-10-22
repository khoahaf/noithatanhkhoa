import Image from "next/image";
import { img } from "@/lib/images";
import { SITE } from "@/constants/site";

// Ảnh minh hoạ (Unsplash), không phải nhà khách hàng — alt mô tả đúng nội dung từng ảnh.
const photos = [
  { src: img.livingRoomBlue, tall: false, alt: "Phòng khách sáng với sofa xanh dương và kệ tivi trắng" },
  { src: img.bedroomArt, tall: true, alt: "Sofa trắng gối xanh dưới bức tranh hoa khổ lớn" },
  { src: img.livingRoomStripe, tall: false, alt: "Phòng khách sofa xám, đôn da cam và bàn trà gỗ" },
  { src: img.openLivingDining, tall: false, alt: "Phòng khách liền phòng ăn với ghế bành và cửa kính lớn" },
  { src: img.livingRoomGreen, tall: true, alt: "Sofa xám phủ chăn len, bàn gỗ tròn và cây xanh" },
  { src: img.bedroomLux, tall: false, alt: "Phòng ngủ tường xanh nhạt với đèn mây và cây treo" },
];

export function InstagramGallery() {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="rule-diamond mb-3">
          <h2 className="text-eyebrow shrink-0 text-xs text-gold-deep">
            Cảm Hứng Không Gian
          </h2>
        </div>
        <p className="mb-10 max-w-md text-[15px] text-ink/70">
          Gợi ý bố trí và phối đồ để bạn hình dung tổ ấm của mình. Theo dõi{" "}
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
          để xem thêm.
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
                alt={p.alt}
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

import { Hand, Leaf, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: Leaf,
    title: "Chất Liệu Thật",
    body: "Gỗ tự nhiên, da thật, vải dệt cao cấp — không giả, không rút gọn.",
  },
  {
    icon: Hand,
    title: "Chế Tác Thủ Công",
    body: "Mỗi đường chỉ, mỗi chi tiết mạ đồng đều qua tay người thợ lành nghề.",
  },
  {
    icon: Sparkles,
    title: "Không Gian Chữa Lành",
    body: "Thiết kế để bạn chậm lại, thở sâu hơn, và thấy nhà thật sự là nhà.",
  },
];

export function Philosophy() {
  return (
    <section id="cau-chuyen" className="scroll-mt-20 bg-night py-20 text-paper sm:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-eyebrow text-xs text-gold-light">Triết Lý Anh Khoa</p>
          <p className="mt-5 font-[family-name:var(--font-display)] text-3xl italic leading-snug sm:text-4xl">
            Nội thất không chỉ để nhìn — mà để sống cùng, mỗi ngày.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-12 sm:grid-cols-3">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div key={title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/30">
                <Icon className="h-6 w-6 text-gold-light" strokeWidth={1.3} />
              </div>
              <p className="mt-5 font-[family-name:var(--font-display)] text-xl">
                {title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-paper/55">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

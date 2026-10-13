const paragraphs = [
  "Tại Nội Thất Anh Khoa, chúng tôi tin rằng một món đồ nội thất tốt không chỉ cần đẹp mắt khi chụp ảnh, mà phải mang lại cảm giác dễ chịu và bền bỉ suốt nhiều năm sử dụng.",
  "Từng thanh gỗ được xử lý kỹ lưỡng để hạn chế tối đa cong vênh dưới thời tiết nhiệt đới. Từng đường mộng ghép và góc bo cạnh được những người thợ mộc lành nghề tỉ mỉ hoàn thiện bằng tay, đảm bảo không có dằm sắc, an toàn cho cả trẻ nhỏ và người lớn tuổi.",
  "Chúng tôi không sản xuất hàng loạt đại trà. Mỗi sản phẩm xuất xưởng đều được cân chỉnh kích thước vừa vặn với chính ngôi nhà và thói quen sinh hoạt của gia đình bạn.",
];

const highlights = [
  { value: "100%", label: "Sản phẩm được kiểm tra mộng khớp kỹ thuật trước khi xuất xưởng." },
  { value: "03 Năm", label: "Bảo hành kết cấu khung mộc và hỗ trợ bảo trì định kỳ." },
];

export function Philosophy() {
  return (
    <section id="cau-chuyen" className="scroll-mt-20 section-y bg-night text-paper">
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <p className="text-eyebrow text-xs text-gold-light">Câu Chuyện Anh Khoa</p>
          <h2 className="mt-5 max-w-xl font-[family-name:var(--font-display)] text-3xl italic leading-snug sm:text-4xl">
            Giữ trọn nét mộc bản, chăm chút từng nếp nhà.
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-[15px] leading-relaxed text-paper/75">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>

        <dl className="grid content-center gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {highlights.map(({ value, label }) => (
            <div key={value} className="border-l-2 border-gold pl-6">
              <dt className="font-[family-name:var(--font-display)] text-5xl text-gold-light sm:text-6xl">
                {value}
              </dt>
              <dd className="mt-2 max-w-xs text-[15px] leading-relaxed text-paper/75">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

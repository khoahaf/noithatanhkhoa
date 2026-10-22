"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, Heart, Loader2, Lock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { CTA, PHONE_HREF, SITE } from "@/constants/site";
import { useCartStore, type CartItem } from "@/store/cartStore";
import { useMounted } from "@/lib/useMounted";
import { hasLeadEndpoint, normalizeVNPhone, submitLead } from "@/lib/leads";
import { openZaloWithMessage } from "@/lib/zalo";

function buildCartMessage(items: CartItem[]) {
  if (items.length === 0) return "";
  const lines = items.map((i) => `- ${i.name} x${i.quantity}`);
  return `Tôi quan tâm các mẫu sau, nhờ Anh Khoa tư vấn giúp:\n${lines.join("\n")}`;
}

const STEPS = [
  "Tiếp nhận nhu cầu và mặt bằng căn hộ qua Zalo hoặc Điện thoại.",
  "Tư vấn bản vẽ kích thước và gửi mẫu vật liệu tham khảo miễn phí.",
  "Khảo sát hiện trạng tận nơi, thống nhất phương án và hẹn ngày bàn giao.",
];

type Status = "idle" | "sending" | "sent" | "error" | "fallback";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [copied, setCopied] = useState<boolean | null>(null);
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const [message, setMessage] = useState("");
  const lastAutoMessage = useRef("");

  // Keep the message in sync with the list, but only while the visitor
  // hasn't typed something of their own over the auto-generated summary.
  useEffect(() => {
    if (!mounted) return;
    const generated = buildCartMessage(items);
    const previousAuto = lastAutoMessage.current;
    lastAutoMessage.current = generated;
    setMessage((current) => (current === previousAuto ? generated : current));
  }, [mounted, items]);

  const zaloText = `Chào Anh Khoa, tôi là ${name.trim()} (${phone.trim()}).${
    message.trim() ? `\n${message.trim()}` : " Tôi cần tư vấn nội thất."
  }`;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const normalized = normalizeVNPhone(phone);
    if (!normalized) {
      setPhoneError("Số điện thoại cần 10 số và bắt đầu bằng 0, ví dụ 0912 345 678.");
      return;
    }
    setPhoneError("");
    setStatus("sending");
    const result = await submitLead("tu-van", {
      name: name.trim(),
      phone: normalized,
      message: message.trim(),
    });
    if (result === "sent") {
      setStatus("sent");
      clearCart(); // chỉ xoá khi chắc chắn shop đã nhận được
    } else {
      setStatus(result === "error" ? "error" : "fallback");
    }
  }

  async function sendViaZalo() {
    setCopied(await openZaloWithMessage(zaloText));
  }

  return (
    <section id="lien-he" className="section-y scroll-mt-20">
      <div className="container-page grid gap-14 md:grid-cols-2">
        <div>
          <p className="text-eyebrow text-xs text-gold-deep">Liên Hệ</p>
          <h2 className="mt-4 max-w-md font-[family-name:var(--font-display)] text-3xl italic leading-snug text-ink sm:text-4xl">
            Để chúng tôi lắng nghe ngôi nhà của bạn.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/70">
            Gửi cho chúng tôi diện tích căn hộ hoặc mẫu sản phẩm bạn quan tâm. Đội ngũ kỹ thuật
            sẽ gửi gợi ý kích thước và dự toán chi tiết.
          </p>

          <ol className="mt-8 max-w-md space-y-4">
            {STEPS.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/50 font-[family-name:var(--font-mono)] text-sm text-gold-deep">
                  {i + 1}
                </span>
                <p className="pt-1.5 text-[15px] leading-relaxed text-ink/80">
                  <span className="font-semibold text-ink">Bước {i + 1}:</span> {step}
                </p>
              </li>
            ))}
          </ol>

          <ul className="mt-10 space-y-5 border-t border-line pt-8 text-[15px] text-ink/75">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
              <span>
                {SITE.address}
                <br />
                <span className="text-ink/70">{SITE.hours}</span>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
              <a href={PHONE_HREF} className="inline-block py-2.5 hover:text-gold-deep">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
              <a href={`mailto:${SITE.email}`} className="inline-block py-2.5 hover:text-gold-deep">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="border border-line/60 bg-paper-dim p-6 sm:p-8">
          {status === "sent" ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center" role="status">
              <p className="font-[family-name:var(--font-display)] text-2xl italic text-ink">
                Anh Khoa đã nhận được yêu cầu
              </p>
              <p className="mt-2 text-[15px] text-ink/70">
                Chúng tôi sẽ gọi lại số {phone} trong vòng 24 giờ. Cần gấp? Gọi{" "}
                <a href={PHONE_HREF} className="text-gold-deep underline underline-offset-4">
                  {SITE.phone}
                </a>
                .
              </p>
            </div>
          ) : status === "fallback" || status === "error" ? (
            <div className="space-y-4" role="status">
              <p className="flex items-start gap-2 text-[15px] text-ink">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.5} />
                {status === "error"
                  ? "Chưa gửi được do lỗi kết nối. Bạn gửi nhanh qua Zalo hoặc gọi trực tiếp nhé — thông tin đã soạn sẵn bên dưới."
                  : "Gửi nhanh nhất qua Zalo hoặc gọi trực tiếp — thông tin đã được soạn sẵn bên dưới."}
              </p>
              <pre className="whitespace-pre-wrap border border-line bg-paper p-3 font-[family-name:var(--font-sans)] text-sm text-ink/75">
                {zaloText}
              </pre>
              <button
                type="button"
                onClick={sendViaZalo}
                className="flex h-12 w-full items-center justify-center gap-2 bg-[#0068ff] text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                Gửi nội dung này qua Zalo
              </button>
              {copied !== null && (
                <p className="text-sm text-ink/70">
                  {copied
                    ? "Đã chép nội dung — dán vào ô chat Zalo để gửi."
                    : "Hãy chép nội dung phía trên và dán vào Zalo."}
                </p>
              )}
              <a
                href={PHONE_HREF}
                className="flex h-12 w-full items-center justify-center gap-2 border border-gold text-eyebrow text-xs text-gold-deep transition-colors hover:bg-gold hover:text-paper"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
                Gọi {SITE.phone}
              </a>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="min-h-11 w-full text-sm text-ink/70 underline underline-offset-4 hover:text-ink"
              >
                Sửa lại thông tin
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {mounted && items.length > 0 && (
                <div className="border border-gold/40 bg-paper p-4">
                  <p className="flex items-center gap-2 text-eyebrow text-xs text-gold-deep">
                    <Heart className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Mẫu bạn quan tâm ({items.length})
                  </p>
                  <ul className="mt-2.5 space-y-1 text-sm text-ink/75">
                    {items.map((item) => (
                      <li key={item.slug}>
                        {item.name} <span className="text-ink/40">x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <label htmlFor="c-name" className="text-eyebrow text-xs text-ink/70">
                  Họ tên
                </label>
                <input
                  id="c-name"
                  name="name"
                  required
                  autoComplete="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 h-12 w-full border border-ink/15 bg-paper px-3.5 text-[15px] text-ink placeholder:text-ink/35 focus:border-gold"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div>
                <label htmlFor="c-phone" className="text-eyebrow text-xs text-ink/70">
                  Số điện thoại
                </label>
                <input
                  id="c-phone"
                  name="phone"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (phoneError) setPhoneError("");
                  }}
                  aria-invalid={Boolean(phoneError)}
                  aria-describedby={phoneError ? "c-phone-error" : undefined}
                  className="mt-2 h-12 w-full border border-ink/15 bg-paper px-3.5 text-[15px] text-ink placeholder:text-ink/35 focus:border-gold aria-[invalid=true]:border-red-700"
                  placeholder="0912 345 678"
                />
                {phoneError && (
                  <p id="c-phone-error" className="mt-1.5 text-sm text-red-700">
                    {phoneError}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="c-message" className="text-eyebrow text-xs text-ink/70">
                  Bạn quan tâm điều gì? (không bắt buộc)
                </label>
                <textarea
                  id="c-message"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 w-full resize-none border border-ink/15 bg-paper px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink/35 focus:border-gold"
                  placeholder="VD: Căn hộ 70m², cần tư vấn sofa văng cho phòng khách 18m²"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending" || !name.trim() || !phone.trim()}
                className="flex h-12 w-full items-center justify-center gap-2 bg-night text-eyebrow text-xs text-gold-light transition-colors hover:bg-night-soft disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
                {status === "sending" ? "Đang gửi…" : CTA.formSubmit}
              </button>
              {!hasLeadEndpoint() && (
                // Chưa nối nơi nhận thông tin: báo trước để khách không bất ngờ khi phải gửi tiếp qua Zalo.
                <p className="text-[13px] leading-relaxed text-ink/70">
                  Sau khi bấm gửi, nội dung được soạn sẵn để bạn gửi tiếp qua Zalo hoặc gọi điện cho Anh Khoa.
                </p>
              )}
              <p className="flex items-start gap-2 text-[13px] leading-relaxed text-ink/70">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" strokeWidth={1.5} aria-hidden="true" />
                Cam kết bảo mật thông tin. Tư vấn giải pháp kỹ thuật đúng nhu cầu, không chèo kéo bán hàng.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

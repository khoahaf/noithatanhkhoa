"use client";

import { useState, type FormEvent } from "react";
import { hasLeadEndpoint, submitLead } from "@/lib/leads";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Chưa có nơi nhận email thì ẩn hẳn khối này, thay vì nhận email rồi bỏ đi.
  if (!hasLeadEndpoint()) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    setStatus((await submitLead("nhan-tin", { email })) === "sent" ? "sent" : "error");
  }

  return (
    <section className="section-y bg-paper-dim">
      <div className="container-page flex flex-col items-center text-center">
        <p className="text-eyebrow text-xs text-gold-deep">Đừng Bỏ Lỡ</p>
        <p className="mt-4 max-w-md font-[family-name:var(--font-display)] text-2xl italic text-ink sm:text-3xl">
          Nhận ưu đãi và bộ sưu tập mới trước tiên
        </p>
        {status === "sent" ? (
          <p className="mt-7 text-[15px] text-gold-deep" role="status">
            Đăng ký thành công! Anh Khoa sẽ gửi những điều đẹp đẽ đến {email}.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Địa chỉ email
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email của bạn"
              className="h-12 flex-1 border border-ink/15 bg-paper px-4 text-[15px] text-ink placeholder:text-ink/40 focus:border-gold"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="h-12 shrink-0 bg-night px-7 text-eyebrow text-xs text-gold-light transition-colors hover:bg-night-soft disabled:opacity-50"
            >
              {status === "sending" ? "Đang gửi…" : "Đăng Ký"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-red-700" role="alert">
            Chưa đăng ký được do lỗi kết nối, bạn thử lại giúp nhé.
          </p>
        )}
      </div>
    </section>
  );
}

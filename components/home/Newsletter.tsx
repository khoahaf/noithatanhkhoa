"use client";

import { useState, type FormEvent } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  }

  return (
    <section className="bg-paper-dim py-16 sm:py-20">
      <div className="container-page flex flex-col items-center text-center">
        <p className="text-eyebrow text-xs text-gold-deep">Đừng Bỏ Lỡ</p>
        <p className="mt-4 max-w-md font-[family-name:var(--font-display)] text-2xl italic text-ink sm:text-3xl">
          Nhận ưu đãi và bộ sưu tập mới trước tiên
        </p>
        {sent ? (
          <p className="mt-7 text-sm text-gold-deep">
            Cảm ơn bạn! Anh Khoa sẽ sớm gửi những điều đẹp đẽ đến hộp thư của bạn.
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
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email của bạn"
              className="h-12 flex-1 border border-ink/15 bg-paper px-4 text-sm text-ink placeholder:text-ink/40 focus:border-gold"
            />
            <button
              type="submit"
              className="h-12 shrink-0 bg-night px-7 text-eyebrow text-xs text-gold-light transition-colors hover:bg-night-soft"
            >
              Đăng Ký
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { CTA, NAV } from "@/constants/site";
import { cn } from "@/lib/utils";
import { cartCount, useCartStore } from "@/store/cartStore";
import { useMounted } from "@/lib/useMounted";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.open);
  const count = mounted ? cartCount(items) : 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "border-line/60 bg-paper/95 backdrop-blur"
          : "border-transparent bg-paper/0"
      )}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" aria-label="Về đầu trang Anh Khoa" onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center">
          <Logo tone="ink" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-eyebrow text-[0.8rem] text-ink/80 transition-colors hover:text-gold-deep"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-4">
          <Link
            href="#lien-he"
            className="hidden h-11 items-center border border-gold px-5 text-eyebrow text-xs text-gold-deep transition-colors hover:bg-gold hover:text-paper md:flex"
          >
            {CTA.header}
          </Link>
          <button
            type="button"
            onClick={openCart}
            aria-label={count > 0 ? `Danh sách quan tâm (${count} mẫu)` : "Danh sách quan tâm"}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:text-gold-deep"
          >
            <Heart className="h-[19px] w-[19px]" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 font-[family-name:var(--font-mono)] text-xs leading-none text-paper">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink md:hidden"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X className="h-[18px] w-[18px]" strokeWidth={1.5} />
            ) : (
              <Menu className="h-[18px] w-[18px]" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-line/60 bg-paper md:hidden">
          <div className="container-page flex flex-col py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-line/40 py-3.5 text-[0.95rem] tracking-wide text-ink/90 last:border-none"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="#lien-he"
              onClick={() => setMenuOpen(false)}
              className="mt-4 flex h-12 items-center justify-center bg-gold text-eyebrow text-xs text-paper"
            >
              {CTA.header}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

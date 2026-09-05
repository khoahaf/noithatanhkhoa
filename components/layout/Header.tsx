"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { NAV } from "@/constants/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <Link href="/" aria-label="Về đầu trang Anh Khoa" onClick={() => setMenuOpen(false)}>
          <Logo tone="ink" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-eyebrow text-[0.72rem] text-ink/80 transition-colors hover:text-gold-deep"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#lien-he"
            className="hidden h-10 items-center border border-gold px-5 text-eyebrow text-[0.68rem] text-gold-deep transition-colors hover:bg-gold hover:text-night md:flex"
          >
            Liên Hệ Ngay
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink md:hidden"
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
          </div>
        </nav>
      )}
    </header>
  );
}

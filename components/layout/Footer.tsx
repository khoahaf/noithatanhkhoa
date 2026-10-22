import Link from "next/link";
import { Camera, MessageCircle, Share2 } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { FOOTER_BRAND, FOOTER_COMMITMENTS, NAV, PHONE_HREF, SITE, ZALO_URL } from "@/constants/site";

export function Footer() {
  return (
    <footer className="bg-night text-paper/90">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div>
          <Logo tone="gold" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/60">
            {FOOTER_BRAND}
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Share2, href: SITE.social.facebook, label: "Facebook" },
              { Icon: Camera, href: SITE.social.instagram, label: "Instagram" },
              { Icon: MessageCircle, href: ZALO_URL, label: "Zalo" },
            ]
              // Chưa có trang thật thì ẩn, không trỏ về trang chủ Facebook/Instagram chung.
              .filter((s) => s.href)
              .map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold-light transition-colors hover:border-gold hover:bg-gold/10"
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-eyebrow text-xs text-gold-light">Khám Phá</p>
          <ul className="mt-4 space-y-0 text-sm text-paper/70">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-3 transition-colors hover:text-gold-light">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-eyebrow text-xs text-gold-light">Chính Sách</p>
          <ul className="mt-4 space-y-3 text-sm text-paper/70">
            <li>Vận chuyển &amp; lắp đặt</li>
            <li>Bảo hành kết cấu 03 năm</li>
            <li>Đổi trả trong 15 ngày</li>
            <li>Chăm sóc chất liệu</li>
          </ul>
        </div>

        <div>
          <p className="text-eyebrow text-xs text-gold-light">Ghé Thăm Showroom</p>
          <ul className="mt-4 space-y-1 text-sm text-paper/70">
            <li>{SITE.address}</li>
            <li>{SITE.hours}</li>
            <li>
              <a href={PHONE_HREF} className="inline-block py-3 transition-colors hover:text-gold-light">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="inline-block py-3 transition-colors hover:text-gold-light">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/15">
        <p className="container-page py-5 text-center text-sm text-gold-light/90">
          {FOOTER_COMMITMENTS.join(" • ")}
        </p>
      </div>

      <div className="border-t border-gold/15">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-paper/65 md:flex-row">
          <p>&copy; {new Date().getFullYear()} {SITE.fullName}. Đã đăng ký bản quyền.</p>
          <p className="text-eyebrow text-xs">{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

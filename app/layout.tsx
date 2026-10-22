import type { Metadata } from "next";
import { Be_Vietnam_Pro, Cormorant_Garamond, IBM_Plex_Mono, Prata } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { QuickViewDrawer } from "@/components/product/QuickViewDrawer";
import { FloatingContact } from "@/components/common/FloatingContact";
import { SITE } from "@/constants/site";
import { img } from "@/lib/images";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  // Chỉ dùng 400 (thường + nghiêng) — tải thêm độ đậm khác chỉ làm chậm ảnh Hero trên mobile.
  weight: ["400"],
  style: ["normal", "italic"],
});

const prata = Prata({
  variable: "--font-prata",
  subsets: ["latin", "vietnamese"],
  weight: ["400"],
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "vietnamese"],
  weight: ["400"],
  // Chỉ dùng cho thông số kích thước bên dưới màn hình đầu — không cần tải trước.
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.fullName} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  // URL tuyệt đối: metadataBase có basePath, "/" tương đối sẽ bị tính về gốc domain.
  alternates: { canonical: `${SITE.url}/` },
  // Ảnh + mô tả khi khách chia sẻ link qua Zalo / Facebook / Messenger.
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: SITE.fullName,
    title: `${SITE.fullName} | ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: img.heroLivingRoom.replace("w=1600", "w=1200&h=630"),
        width: 1200,
        height: 630,
        alt: "Phòng khách với armchair vàng — Nội Thất Anh Khoa",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${cormorant.variable} ${prata.variable} ${beVietnam.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <a
          href="#noi-dung"
          className="sr-only z-50 bg-night text-sm text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:px-4 focus:py-3"
        >
          Bỏ qua tới nội dung chính
        </a>
        <Header />
        <main id="noi-dung" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <QuickViewDrawer />
        <FloatingContact />
      </body>
    </html>
  );
}

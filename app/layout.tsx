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
  weight: ["400", "500", "600", "700"],
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
  weight: ["300", "400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.fullName} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <QuickViewDrawer />
        <FloatingContact />
      </body>
    </html>
  );
}

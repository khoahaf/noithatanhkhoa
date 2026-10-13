"use client";

/**
 * Loader cho next/image: GitHub Pages (static export) không có server tối ưu ảnh,
 * nên để chính CDN Unsplash cắt ảnh theo đúng bề rộng màn hình cần — điện thoại
 * nhận ảnh ~400–800px thay vì 1600px.
 */
export default function unsplashLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 70));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  return url.toString();
}

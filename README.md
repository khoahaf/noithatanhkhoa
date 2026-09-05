# Nội Thất Anh Khoa

Landing page nội thất cao cấp cho thương hiệu **Anh Khoa** — "Kiến tạo không gian sống". Xây bằng Next.js (App Router) + Tailwind CSS v4, một trang duy nhất với điều hướng cuộn mượt tới các mục Sản Phẩm, Bộ Sưu Tập, Câu Chuyện và Liên Hệ.

> Dữ liệu sản phẩm, bộ sưu tập và ảnh (Unsplash) hiện là **demo** để minh hoạ bố cục. Logo hiện dùng biểu tượng vẽ tay tạm thời — thay bằng file logo thật của Anh Khoa trong `components/common/Logo.tsx` khi có.

## Công nghệ

- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4
- next/font: Cormorant Garamond (display), Prata (nhãn/wordmark), Be Vietnam Pro (nội dung), IBM Plex Mono (giá/số liệu) — tất cả hỗ trợ tiếng Việt

## Chạy dự án

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Cấu trúc

```
app/                  Trang chủ (landing page một trang), layout, metadata
components/
  common/             Logo
  layout/             Header, Footer
  home/               Các section của trang chủ (Hero, SpaceNav, NewArrivals, ...)
  product/            ProductCard
data/                 Dữ liệu mẫu: sản phẩm, danh mục, bộ sưu tập
lib/                  Helpers (format tiền VND, ảnh Unsplash, cn)
constants/            Thông tin thương hiệu, menu điều hướng
types/                Kiểu dữ liệu TypeScript
```

## Triển khai

Đẩy code lên GitHub rồi kết nối repo với [Vercel](https://vercel.com/new) để deploy — Vercel tự nhận diện cấu hình Next.js mặc định.

# Nội Thất Anh Khoa

Landing page nội thất cao cấp cho thương hiệu **Anh Khoa** — "Kiến tạo không gian sống". Xây bằng Next.js (App Router) + Tailwind CSS v4, một trang duy nhất với điều hướng cuộn mượt tới các mục Sản Phẩm, Bộ Sưu Tập, Câu Chuyện và Liên Hệ. Có giỏ hàng.

> Dữ liệu sản phẩm, bộ sưu tập và ảnh (Unsplash) hiện là **demo** để minh hoạ bố cục. Logo hiện dùng biểu tượng vẽ tay tạm thời — thay bằng file logo thật của Anh Khoa trong `components/common/Logo.tsx` khi có.

## Công nghệ

- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4
- Zustand (giỏ hàng, lưu vào localStorage)
- next/font: Cormorant Garamond (display), Prata (nhãn/wordmark), Be Vietnam Pro (nội dung), IBM Plex Mono (giá/số liệu) — tất cả hỗ trợ tiếng Việt

## Giỏ hàng

- Khách bấm "Thêm vào giỏ" trên từng sản phẩm → giỏ hàng (icon trên header) mở ra, lưu lại kể cả khi tải lại trang.
- Vì đồ nội thất giá trị lớn cần đặt cọc trước khi giao, trang hướng khách để lại thông tin ở mục Liên Hệ (form tự động điền sẵn danh sách sản phẩm trong giỏ) hoặc gọi điện trực tiếp — trang **chưa** xử lý thanh toán/đặt cọc online.

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
  cart/               CartDrawer (giỏ hàng)
store/                Zustand store cho giỏ hàng
data/                 Dữ liệu mẫu: sản phẩm, danh mục, bộ sưu tập
lib/                  Helpers (format tiền VND, ảnh Unsplash, cn, hook useMounted)
constants/            Thông tin thương hiệu, menu điều hướng
types/                Kiểu dữ liệu TypeScript
```

## Triển khai

Không còn API route động nào, nên trang có thể xuất tĩnh và deploy lên GitHub Pages:

```bash
DEPLOY_TARGET=github-pages npm run build
```

Đẩy thư mục build tĩnh lên nhánh GitHub Pages, hoặc deploy y nguyên repo lên Vercel/Netlify nếu muốn.

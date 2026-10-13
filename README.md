# Nội Thất Anh Khoa

Landing page nội thất cao cấp cho thương hiệu **Anh Khoa** — "Kiến tạo không gian sống". Xây bằng Next.js (App Router) + Tailwind CSS v4, một trang duy nhất với điều hướng cuộn mượt tới các mục Sản Phẩm, Bộ Sưu Tập, Câu Chuyện và Liên Hệ. Có bộ lọc sản phẩm, xem chi tiết kèm hình tỷ lệ, danh sách quan tâm và liên hệ nhanh qua Zalo/Hotline.

> Dữ liệu sản phẩm, bộ sưu tập và ảnh (Unsplash) hiện là **demo** để minh hoạ bố cục. Logo hiện dùng biểu tượng vẽ tay tạm thời — thay bằng file logo thật của Anh Khoa trong `components/common/Logo.tsx` khi có.

## Công nghệ

- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4
- Zustand (danh sách quan tâm lưu vào localStorage; bộ lọc + xem chi tiết)
- next/font: Cormorant Garamond (display), Prata (nhãn/wordmark), Be Vietnam Pro (nội dung), IBM Plex Mono (giá/số liệu) — tất cả hỗ trợ tiếng Việt

## Danh sách quan tâm & nhận thông tin khách

- Khách bấm "Thêm vào danh sách quan tâm" trong cửa sổ chi tiết → danh sách (icon trái tim trên header) mở ra, lưu lại kể cả khi tải lại trang. Giá luôn hiển thị là **giá tham khảo** vì hàng may đo được báo giá sau khi đo đạc.
- Form Liên Hệ tự điền sẵn các mẫu trong danh sách. Form chỉ báo "đã nhận" khi thực sự gửi thành công tới `NEXT_PUBLIC_LEAD_ENDPOINT` — cách thiết lập Google Sheet + Telegram xem [docs/nhan-thong-tin-khach.md](docs/nhan-thong-tin-khach.md). Chưa thiết lập thì form chuyển khách sang gửi qua Zalo / gọi điện, và khối "Đăng ký nhận tin" tự ẩn.
- Mọi thông tin liên hệ (SĐT, Zalo, email, Facebook, Instagram) nằm trong `constants/site.ts`. Link mạng xã hội để trống thì icon tự ẩn.

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
  cart/               CartDrawer (danh sách quan tâm)
store/                Zustand store: danh sách quan tâm, bộ lọc catalog
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

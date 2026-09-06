# Nội Thất Anh Khoa

Landing page nội thất cao cấp cho thương hiệu **Anh Khoa** — "Kiến tạo không gian sống". Xây bằng Next.js (App Router) + Tailwind CSS v4, một trang duy nhất với điều hướng cuộn mượt tới các mục Sản Phẩm, Bộ Sưu Tập, Câu Chuyện và Liên Hệ. Có giỏ hàng và chatbot AI tư vấn.

> Dữ liệu sản phẩm, bộ sưu tập và ảnh (Unsplash) hiện là **demo** để minh hoạ bố cục. Logo hiện dùng biểu tượng vẽ tay tạm thời — thay bằng file logo thật của Anh Khoa trong `components/common/Logo.tsx` khi có.

## Công nghệ

- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4
- Zustand (giỏ hàng, lưu vào localStorage)
- next/font: Cormorant Garamond (display), Prata (nhãn/wordmark), Be Vietnam Pro (nội dung), IBM Plex Mono (giá/số liệu) — tất cả hỗ trợ tiếng Việt

## Giỏ hàng & Chatbot tư vấn

- Khách bấm "Thêm vào giỏ" trên từng sản phẩm → giỏ hàng (icon trên header) mở ra, lưu lại kể cả khi tải lại trang.
- Khi thêm sản phẩm, khung chat AI ở góc dưới bên trái cũng tự mở kèm lời chào — khách có thể hỏi thêm và được trợ lý AI (Claude) tư vấn dựa trên danh sách sản phẩm thật của shop.
- Vì đồ nội thất giá trị lớn cần đặt cọc trước khi giao, chatbot sẽ hướng khách để lại thông tin ở mục Liên Hệ (form tự động điền sẵn danh sách sản phẩm trong giỏ) hoặc gọi điện trực tiếp — trang **chưa** xử lý thanh toán/đặt cọc online.

### Cấu hình chatbot (bắt buộc để chat hoạt động)

Chatbot gọi Claude API từ một API route phía server (`app/api/chat/route.ts`) để giữ bí mật API key — **không thể chạy trên hosting tĩnh như GitHub Pages**, cần hosting hỗ trợ server function (vd. Vercel).

1. Sao chép `.env.example` thành `.env.local`.
2. Điền `ANTHROPIC_API_KEY=` bằng API key thật lấy tại [console.anthropic.com](https://console.anthropic.com/).
3. Khi deploy lên Vercel, thêm biến môi trường `ANTHROPIC_API_KEY` tương tự trong Project Settings → Environment Variables.

Nếu chưa cấu hình key, chatbot vẫn hiển thị bình thường nhưng sẽ báo khách liên hệ trực tiếp thay vì trả lời tự động.

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
app/api/chat/         API route xử lý chatbot (gọi Claude API, giấu key phía server)
components/
  common/             Logo
  layout/             Header, Footer
  home/               Các section của trang chủ (Hero, SpaceNav, NewArrivals, ...)
  product/            ProductCard
  cart/               CartDrawer (giỏ hàng)
  chat/               ChatWidget (chatbot tư vấn)
store/                Zustand store cho giỏ hàng
data/                 Dữ liệu mẫu: sản phẩm, danh mục, bộ sưu tập
lib/                  Helpers (format tiền VND, ảnh Unsplash, cn, hook useMounted)
constants/            Thông tin thương hiệu, menu điều hướng
types/                Kiểu dữ liệu TypeScript
```

## Triển khai

Vì có chatbot chạy server function (giữ API key an toàn), trang cần hosting hỗ trợ server — dùng **Vercel**:

1. Đẩy code lên GitHub (đã có sẵn tại repo hiện tại).
2. Vào [vercel.com/new](https://vercel.com/new), import repo GitHub này.
3. Thêm biến môi trường `ANTHROPIC_API_KEY` trong Project Settings → Environment Variables.
4. Vercel tự deploy mỗi khi có commit mới trên nhánh `main`.

> Bản build tĩnh cho GitHub Pages (`DEPLOY_TARGET=github-pages npm run build`) vẫn dùng được cho trang không có chatbot/giỏ hàng cần server, nhưng từ khi thêm API route chatbot, lệnh build tĩnh này sẽ báo lỗi vì route động không thể xuất ra file tĩnh. Vercel là hướng triển khai chính thức từ nay.

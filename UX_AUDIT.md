# UX/UI Audit — Nội Thất Anh Khoa

- **Ngày audit:** 22/10/2026
- **Phiên bản kiểm tra:** commit `903bbfd` (trùng với bản đang chạy tại https://khoahaf.github.io/noithatanhkhoa/)
- **Phạm vi:** landing page một trang (`app/page.tsx`), trang 404, trang lỗi toàn cục, các ngăn kéo "Chi tiết sản phẩm" và "Danh sách quan tâm", thanh liên hệ nổi.

> Trạng thái mỗi phát hiện được cập nhật ở cuối tài liệu (mục E) sau khi sửa và kiểm thử lại.

---

## A. Tổng quan

### A1. Bối cảnh dự án (Giai đoạn 1)

| Hạng mục | Thực tế trong repo |
|---|---|
| Framework | Next.js 16.3 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4 |
| Triển khai | Static export → nhánh `gh-pages` (GitHub Pages, `basePath: /noithatanhkhoa`) |
| Trạng thái | Zustand: `cartStore` (danh sách quan tâm, lưu localStorage), `catalogStore` (bộ lọc, ngăn kéo chi tiết) |
| Design tokens | `app/globals.css`: 9 màu (`ink`, `paper`, `paper-dim`, `night`, `night-soft`, `gold-deep`, `gold`, `gold-light`, `line`), 4 font (Cormorant Garamond, Prata, Be Vietnam Pro, IBM Plex Mono), `.section-y`, `.container-page`, `.text-eyebrow` |
| Nội dung | `constants/site.ts` (liên hệ, CTA, cam kết), `data/*.ts` (sản phẩm, danh mục, bộ sưu tập; ảnh Unsplash demo) |
| Công cụ kiểm tra có sẵn | `npm run lint` (ESLint), `tsc --noEmit`. **Không có test tự động.** |
| Tài liệu UX / persona / design system | **Không có** trong repo. Chỉ có `README.md` và `docs/nhan-thong-tin-khach.md` |

**Mục tiêu website** (suy ra từ nội dung và cấu trúc, chưa có tài liệu sản phẩm xác nhận): giới thiệu xưởng nội thất may đo và **thu thập yêu cầu tư vấn/báo giá** qua form, Zalo hoặc điện thoại. Không có thanh toán online.

**Nhóm người dùng giả định** (chưa có dữ liệu thật): chủ căn hộ đang hoàn thiện nội thất, quan tâm kích thước vừa với căn hộ, độ bền và an toàn cho gia đình.

**Hành động chuyển đổi chính:** (1) gửi form "Gửi Yêu Cầu Tư Vấn Ngay", (2) chat Zalo, (3) gọi hotline, (4) "Nhận Báo Giá Mẫu Này" trên từng sản phẩm.

### A2. Đã kiểm tra

| Khu vực | Cách kiểm tra |
|---|---|
| Toàn bộ mã nguồn component, data, constants, config | Đọc code |
| Responsive tại **375, 390, 768, 1024, 1440 px** (thêm 320 px từ đợt trước) | Trình duyệt tích hợp, giả lập viewport. Đo bằng script DOM: tràn ngang, phần tử vượt khung, vùng chạm < 44 px, ảnh chụp ở các điểm có lỗi |
| Hành trình: tìm hiểu thương hiệu → lọc theo không gian → xem chi tiết → báo giá → gửi form → phản hồi | Thao tác thật trên bản dev (`localhost:3080`) |
| Bàn phím | Phím Tab thật (kiểm tra `:focus-visible`), Esc với ngăn kéo và menu mobile |
| Khả năng truy cập, SEO, Best practices, Hiệu năng | **Lighthouse 12.8.2** (chạy qua `npx`, không cài vào dự án) trên web thật, mobile + desktop. Script đo tương phản WCAG trên DOM |
| Console | Đọc console trình duyệt trên bản dev |
| Liên kết | Đối chiếu mọi `href="#..."` với id tồn tại; liệt kê link ngoài, `tel:`, `mailto:` |

### A3. Chưa kiểm tra được và lý do

| Khu vực | Lý do |
|---|---|
| **Dữ liệu người dùng thật** (analytics, heatmap, phỏng vấn, CrUX) | Repo không có analytics. Google chưa đủ dữ liệu thực tế (CrUX) cho trang này. Mọi nhận định về hành vi người dùng trong báo cáo là **giả thuyết** |
| Safari / iOS thật, Android thật | Chỉ có trình duyệt Chromium giả lập viewport. Các hành vi riêng của Safari (chặn popup Zalo, `100vh`, safe-area) **cần kiểm tra trên máy thật** |
| Trình đọc màn hình thật (NVDA, VoiceOver) | Không có trong môi trường. Chỉ kiểm tra cấu trúc ARIA/heading bằng code và Lighthouse (axe) |
| Gửi form tới hệ thống thật | Chưa có `NEXT_PUBLIC_LEAD_ENDPOINT`. Chỉ kiểm tra được nhánh "chưa cấu hình" |
| Ảnh chụp toàn trang | Khung trình duyệt đôi khi không vẽ lại khi cửa sổ ứng dụng bị ẩn. Phần lớn số đo lấy bằng DOM; ảnh chụp chỉ dùng tại điểm lỗi (header 768 px) |

### A4. Vấn đề nghiêm trọng nhất

1. **UX-01 / UX-02 (P0):** thông tin khách để lại **chưa đến được shop**, và SĐT/Zalo/email/địa chỉ vẫn là **dữ liệu mẫu**. Cả 4 kênh chuyển đổi đều chưa hoạt động thật. Cần thông tin từ chủ shop, không sửa được bằng code.
2. **UX-03 (P1):** header **vỡ ở tablet (768–1023 px)**: chữ menu gãy dòng, nút CTA tràn khung, icon danh sách quan tâm bị bóp.
3. **UX-06 (P1):** **63 phần tử chữ** không đạt tương phản WCAG AA. Chủ yếu là chữ xám phụ (giá, kích thước) và nút vàng chính ở Hero.
4. **UX-04, UX-05 (P1, cần quyết định):** mục menu "Bộ Sưu Tập" dẫn tới một khối khác tên. Khối "Góc Nhà Khách Hàng" dùng ảnh stock nhưng gắn nhãn là nhà khách hàng thật.

### A5. Điểm mạnh cần giữ

- Bố cục cao cấp, nhất quán: nền be ấm, chữ than chì, điểm nhấn vàng đồng, serif nghiêng cho tiêu đề. Phù hợp ngành nội thất may đo, **không** mang cảm giác template chung chung.
- **Không lệch bố cục (CLS = 0)**. Best Practices 100, SEO 100 (Lighthouse).
- Hành trình chính rõ: chọn không gian → bộ lọc tự bật → xem chi tiết có **hình tỷ lệ so với người 170 cm** → "Nhận Báo Giá Mẫu Này" tự điền tên mẫu vào form.
- Form **trung thực**: kiểm tra SĐT Việt Nam; không bao giờ báo "đã gửi" khi chưa gửi được; giữ nguyên danh sách quan tâm khi lỗi.
- Ngăn kéo chi tiết và danh sách quan tâm: focus vào trong khi mở, Esc đóng, khoá Tab khi đóng (`inert`), trả focus về chỗ cũ.
- Mobile: thanh [Gọi ngay] [Chat Zalo] cố định; mọi vùng chạm ≥ 44 px; không tràn ngang ở 320–1440 px (trừ header 768 px).
- Không có lỗi console. Không có anchor link hỏng. Không có id trùng.

---

## B. Danh sách phát hiện

Ký hiệu bằng chứng: **[XM]** lỗi đã xác minh trên trình duyệt/công cụ · **[CR]** phát hiện qua code review · **[TD]** cần kiểm tra thêm trên trình duyệt hoặc thiết bị thật · **[GT]** giả thuyết cần người dùng thật xác nhận.

### P0 — Chức năng cốt lõi chưa hoạt động

#### UX-01 · Form tư vấn chưa gửi được tới shop — `components/home/Contact.tsx`, `lib/leads.ts` [XM]
- **Vấn đề:** `SITE.leadEndpoint` rỗng (`constants/site.ts:28`). Bấm "Gửi Yêu Cầu Tư Vấn Ngay" với dữ liệu hợp lệ thì form chuyển sang khung "Gửi nhanh nhất qua Zalo…", không phát sinh request nào.
- **Ảnh hưởng:** khách đã điền form vẫn phải làm thêm một bước (gửi lại qua Zalo). Kênh chuyển đổi chính chưa thu được lead nào.
- **Đề xuất:** chủ shop tạo Google Apps Script theo `docs/nhan-thong-tin-khach.md`, rồi build với `NEXT_PUBLIC_LEAD_ENDPOINT`. **Trong lúc chờ:** báo trước cho khách ngay dưới nút gửi rằng bước tiếp theo là Zalo/gọi điện, để họ không bất ngờ.
- **Tiêu chí xác nhận:** gửi form → xuất hiện một dòng mới trong Google Sheet; giao diện báo "Anh Khoa đã nhận được yêu cầu".

#### UX-02 · Thông tin liên hệ là dữ liệu mẫu — `constants/site.ts:12-16` [XM]
- **Vấn đề:** `0909 123 456`, `zalo.me/0909123456`, `hello@anhkhoa.vn`, `12 Nguyễn Huệ, Quận 1` là số liệu mẫu. Các link này xuất hiện ở 6 vị trí (header mobile, thanh đáy, Liên Hệ, Footer, chi tiết sản phẩm, 404).
- **Ảnh hưởng:** khách bấm Gọi/Zalo sẽ không liên lạc được với shop.
- **Đề xuất:** thay bằng thông tin thật (chỉ cần sửa 1 file).
- **Tiêu chí xác nhận:** mọi `tel:`, `zalo.me`, `mailto:` trỏ tới kênh thật của shop.

### P1 — Ảnh hưởng lớn đến hành trình

#### UX-03 · Header vỡ ở tablet 768–1023 px — `components/layout/Header.tsx:41,53` [XM]
- **Bằng chứng:** tại 768 px, menu desktop bật từ breakpoint `md`: "Bộ Sưu Tập" gãy thành 3 dòng (cao 61 px), nút "Tư Vấn Không Gian" vượt khung 12 px, icon danh sách quan tâm bị bóp còn 20 px. Tại 1024 px icon còn 36 px (< 44). Đã xác nhận bằng ảnh chụp.
- **Ảnh hưởng:** người dùng tablet thấy điều hướng lộn xộn; nút danh sách quan tâm khó bấm.
- **Đề xuất:** chỉ hiện menu desktop từ `lg` (≥ 1024 px), dưới mức đó dùng menu thu gọn. Thêm `shrink-0` cho các nút icon.
- **Tiêu chí xác nhận:** ở 768 và 1024 px không phần tử nào trong header vượt khung, các mục menu nằm trên 1 dòng, nút icon ≥ 44 × 44 px.

#### UX-04 · Menu "Bộ Sưu Tập" dẫn tới khối khác tên — `constants/site.ts` (NAV), `SpaceNav.tsx`, `FeaturedCollections.tsx` [XM] [GT]
- **Bằng chứng:** `#bo-suu-tap` là khối "Chọn Không Gian Cho Tổ Ấm" (theo đặc tả nội dung). Khối thực sự tên "Bộ Sưu Tập Nổi Bật" có id `#bo-suu-tap-noi-bat` và nằm sau khu sản phẩm.
- **Ảnh hưởng (giả thuyết):** khách bấm "Bộ Sưu Tập" mong thấy các bộ sưu tập nhưng lại thấy danh mục không gian, nên có thể nghĩ trang thiếu nội dung.
- **Đề xuất (cần chủ shop chọn):** (a) đổi nhãn menu thành "Không Gian"; (b) chuyển khối "Bộ Sưu Tập Nổi Bật" lên ngay sau "Chọn Không Gian"; (c) giữ nguyên theo đặc tả.
- **Tiêu chí xác nhận:** nhãn menu khớp với tiêu đề khối mà nó dẫn tới.

#### UX-05 · Ảnh stock gắn nhãn "Góc Nhà Khách Hàng" — `components/home/InstagramGallery.tsx` [CR]
- **Bằng chứng:** 6 ảnh Unsplash cùng alt "Không gian sống của khách hàng Anh Khoa". Tiêu đề khối là "Góc Nhà Khách Hàng".
- **Ảnh hưởng:** trình bày ảnh minh hoạ như nhà khách hàng thật là rủi ro niềm tin (và rủi ro pháp lý quảng cáo) khi trang chính thức hoạt động. Cùng nguyên tắc với khối "Dự án thực tế" đang được ẩn.
- **Đề xuất (cần chủ shop chọn):** (a) ẩn khối tới khi có ảnh khách thật; (b) đổi thành "Cảm Hứng Không Gian" và sửa alt mô tả đúng nội dung ảnh; (c) giữ nguyên.
- **Tiêu chí xác nhận:** không còn ảnh minh hoạ nào được ghi là của khách hàng.

#### UX-06 · Tương phản chữ không đạt WCAG AA (63 phần tử) [XM]
- **Bằng chứng (Lighthouse + script đo):**

| Nhóm | Màu chữ trên nền | Tỉ lệ | Vị trí |
|---|---|---|---|
| Chữ phụ `text-ink/60` (giá, kích thước, đếm mẫu, gắn thẻ) | #7d7b77 / #f9f8f5 | 3,97 | ProductCard, ProductCatalog, InstagramGallery |
| Nhãn form `text-ink/60` trên `paper-dim` | #79756f / #f0ebe1 | 3,85 | Contact |
| Mô tả Trust bar `text-ink/65` | #6f6c65 / #f0ebe1 | 4,40–4,47 | TrustBar |
| Giờ mở cửa `text-ink/50` | #928f8c / #f9f8f5 | 3,02 | Contact |
| Microcopy bảo mật `text-ink/60` | — | 3,86 | Contact |
| Chữ footer `text-paper/40`, logo vàng, "~5 phút" | — | 3,56–4,11 | Footer, thanh đáy |
| **Nút chính Hero** chữ `paper` trên `bg-gold` | #f9f8f5 / #9e7d47 | **3,61** | Hero |
| Tiêu đề nhỏ `gold-deep` trên `paper-dim` | #8c6d46 / #f0ebe1 | 4,02 | Bộ Sưu Tập Nổi Bật |

- **Ảnh hưởng:** khó đọc giá, kích thước, nhãn form, nhất là với người lớn tuổi, ngoài trời hoặc màn hình kém.
- **Đề xuất:** tăng độ đậm các mức xám phụ (`ink/50–65` → `ink/70–75`), không đổi màu thương hiệu. Riêng **nút vàng Hero** và **chữ vàng trên nền be đậm** cần đổi token màu, tức là quyết định thiết kế cần chủ shop chọn: làm đậm `gold-deep` từ #8C6D46 thành khoảng #7A5D38, hoặc giữ nguyên.
- **Tiêu chí xác nhận:** Lighthouse `color-contrast` không còn phần tử chữ xám phụ; phần vàng theo lựa chọn đã duyệt.

### P2 — Usability, accessibility, hiệu năng

#### UX-07 · Menu mobile không đóng bằng Esc, thiếu `aria-controls` — `Header.tsx:73-111` [XM]
- **Bằng chứng:** mở menu, nhấn Esc thì `aria-expanded` vẫn là `true`. Nút không có `aria-controls`.
- **Đề xuất:** Esc đóng menu và trả focus về nút; thêm `id` cho menu và `aria-controls`.
- **Tiêu chí xác nhận:** Esc đóng menu; `aria-controls` trỏ đúng id.

#### UX-08 · Nhãn đọc màn hình không khớp chữ hiển thị — logo, ảnh sản phẩm [XM]
- **Bằng chứng:** Lighthouse `label-content-name-mismatch` (7–8 phần tử). Logo có `aria-label="Về đầu trang Anh Khoa"` trong khi chữ hiển thị là "ANH KHOA KIẾN TẠO KHÔNG GIAN SỐNG". Nút ảnh sản phẩm chứa nhãn "Mới" nhưng `aria-label` lại là "Xem chi tiết …".
- **Ảnh hưởng:** người dùng điều khiển bằng giọng nói ("bấm Anh Khoa") có thể không kích hoạt được.
- **Đề xuất:** để logo lấy tên từ nội dung; đưa nhãn "Mới" ra ngoài nút ảnh.
- **Tiêu chí xác nhận:** Lighthouse không còn `label-content-name-mismatch`.

#### UX-09 · Thiếu liên kết "Bỏ qua tới nội dung chính" — `app/layout.tsx` [XM]
- **Đề xuất:** thêm skip link chỉ hiện khi focus bằng bàn phím, trỏ tới `<main id="noi-dung">`.
- **Tiêu chí xác nhận:** Tab lần đầu hiện link; Enter đưa focus vào main.

#### UX-10 · Thứ bậc heading không đầy đủ — `FeaturedCollections.tsx:14,58`, `InstagramGallery.tsx:19` [XM]
- **Bằng chứng:** "Bộ Sưu Tập Nổi Bật", "Góc Nhà Khách Hàng" và tên từng bộ sưu tập là `<p>`. Dàn heading quan sát được: H1 → H2 Chọn Không Gian → H3×5 → H2 Sản Phẩm → H2 Câu Chuyện → H2 Liên Hệ.
- **Ảnh hưởng:** người dùng trình đọc màn hình nhảy theo heading sẽ bỏ sót 2 khối.
- **Đề xuất:** chuyển thành `h2`/`h3` và giữ nguyên class hiển thị.
- **Tiêu chí xác nhận:** mọi khối nội dung có một `h2`.

#### UX-11 · LCP mobile chậm (4,2 s giả lập), tải trước 20 file font — `app/layout.tsx:12-35`, `Hero.tsx:29` [XM] [GT]
- **Bằng chứng:** Lighthouse mobile: Performance 85, LCP 4,2 s (ngưỡng tốt ≤ 2,5 s); lần đo trước, giai đoạn "render delay" chiếm 1,76 s. HTML build có **20 `<link rel=preload>` font**. Code chỉ dùng Cormorant 400 (thường + nghiêng), Be Vietnam 400/500/600, Plex Mono 400, nhưng đang tải Cormorant 400–700 và Be Vietnam 300–700. Console Next 16 cảnh báo ảnh LCP nên dùng `loading="eager"` (`priority` đã bị bỏ trong Next 16).
- **Đề xuất:** chỉ tải đúng các độ đậm đang dùng (không đổi giao diện); dùng `loading="eager"` + `fetchPriority="high"` cho ảnh Hero.
- **Tiêu chí xác nhận:** số font preload giảm; Lighthouse mobile LCP giảm (số đo giả lập, có dao động).

#### UX-12 · Nút Back trên điện thoại không đóng ngăn kéo — `lib/useDialog.ts` [CR] [TD]
- **Bằng chứng:** mở ngăn kéo không ghi vào lịch sử trình duyệt, nên nút/cử chỉ Back sẽ rời trang thay vì đóng ngăn kéo.
- **Ảnh hưởng (giả thuyết):** người dùng Android quen dùng Back để đóng cửa sổ, có thể bị văng khỏi trang.
- **Đề xuất:** đẩy một mục lịch sử khi mở ngăn kéo và đóng ngăn kéo khi bấm Back. Cần kiểm tra kỹ với anchor link (`#lien-he`) trên máy thật.
- **Tiêu chí xác nhận:** trên Android, Back đóng ngăn kéo và vẫn ở lại trang.

#### UX-13 · Chính sách ở footer trông như link nhưng không bấm được; "Đổi trả trong 15 ngày" chưa xác minh — `Footer.tsx:51-58` [XM] [GT]
- **Bằng chứng:** 4 dòng chính sách cùng kiểu chữ với cột link bên cạnh nhưng không phải link. "Đổi trả trong 15 ngày" không có trong đặc tả nội dung và có thể mâu thuẫn với hàng may đo.
- **Đề xuất (cần chủ shop chọn):** xác nhận hoặc bỏ chính sách đổi trả. Về hiển thị: đổi các dòng chính sách sang kiểu chữ "thông tin" (không giống link), hoặc làm trang chính sách thật.
- **Tiêu chí xác nhận:** không còn chữ trông như link mà không bấm được; nội dung chính sách được chủ shop xác nhận.

### P3 — Tinh chỉnh

| ID | Vấn đề | Bằng chứng | Đề xuất |
|---|---|---|---|
| UX-14 | Nút gửi form bị vô hiệu khi chưa nhập, không giải thích lý do | [XM] `Contact.tsx` `disabled={... !name.trim() \|\| !phone.trim()}` | Theo dõi bằng dữ liệu thật; hiện tại placeholder đã gợi ý. Không sửa |
| UX-15 | Favicon là icon mặc định của Next.js | [XM] `app/favicon.ico` 25 931 byte, đúng file mặc định của create-next-app | Tạo `app/icon.svg` từ biểu tượng logo hiện có |
| UX-16 | Thiếu `canonical` | [XM] không có `<link rel=canonical>` | Thêm `alternates.canonical` |
| UX-17 | Chưa có dữ liệu cấu trúc LocalBusiness/FurnitureStore | [XM] 0 thẻ JSON-LD | Thêm **sau khi** có địa chỉ/SĐT thật (UX-02), tránh khai báo dữ liệu mẫu cho Google |
| UX-18 | 5 file SVG mặc định không được dùng trong `public/` | [XM] grep: 0 tham chiếu | Giữ lại, chờ chủ dự án đồng ý mới xoá |
| UX-19 | Điểm nóng Hero 32 px, link menu desktop cao 20 px | [XM] | Đạt WCAG 2.5.8 nhờ khoảng cách ≥ 24 px; không sửa |
| UX-20 | Không có link chia sẻ trực tiếp tới một sản phẩm | [CR] ngăn kéo không đổi URL | Cân nhắc `#sp=<slug>` khi có nhu cầu chia sẻ mẫu qua Zalo |

---

## C. Kế hoạch sửa

| Đợt | Nội dung | Phát hiện | Cần chủ shop quyết định? |
|---|---|---|---|
| **Đợt 1 – P1 kỹ thuật** | Header tablet; tương phản chữ xám phụ; báo trước bước Zalo khi form chưa nối | UX-03, UX-06 (phần xám), UX-01 (tạm) | Không |
| **Đợt 2 – P2 truy cập + hiệu năng** | Menu Esc + aria-controls; nhãn khớp chữ; skip link; heading; font + ảnh LCP | UX-07, 08, 09, 10, 11 | Không |
| **Đợt 3 – P3 an toàn** | Favicon từ logo; canonical | UX-15, 16 | Không |
| **Chờ quyết định** | Màu vàng chính; nhãn menu "Bộ Sưu Tập"; khối ảnh stock; chính sách đổi trả | UX-04, 05, 06 (phần vàng), 13 | **Có** |
| **Chờ dữ liệu** | Endpoint form, liên hệ thật, JSON-LD | UX-01, 02, 17 | **Có** |
| **Để sau** | Nút Back đóng ngăn kéo (cần thử trên Android thật); link chia sẻ sản phẩm | UX-12, 20 | — |

Nguyên tắc: không đổi bố cục, màu thương hiệu, nội dung kinh doanh, routing hay dữ liệu ngoài các mục trên.

---

## D. Giả thuyết cần người dùng thật xác nhận

- Khách có thực sự nhầm khi bấm "Bộ Sưu Tập" và gặp khối "Chọn Không Gian" không (UX-04)?
- Giá "Liên hệ tư vấn" trên mọi sản phẩm có làm khách rời trang vì không ước lượng được ngân sách không? Nên đo tỉ lệ bấm "Nhận Báo Giá Mẫu Này" khi đã có analytics.
- Khách mobile có dùng nút Back để đóng ngăn kéo không (UX-12)?
- Thứ tự khối (Sản phẩm trước Câu chuyện) có phù hợp với khách cần niềm tin trước khi xem sản phẩm không?

Để kiểm chứng: cài analytics (GA4/Clarity) sau khi có dữ liệu thật, rồi quan sát 5–8 khách thao tác trên điện thoại.

---

## E. Trạng thái sau khi sửa

### E1. Kết quả từng phát hiện

| ID | Trạng thái | Đã làm | Cách kiểm tra lại |
|---|---|---|---|
| UX-01 | ⏸ **Chờ dữ liệu** · sửa tạm ✅ | Thêm dòng báo trước dưới nút gửi (chỉ hiện khi chưa có endpoint): "Sau khi bấm gửi, nội dung được soạn sẵn để bạn gửi tiếp qua Zalo…" | Đã kiểm tra: dòng hiện ở 375 px; luồng gửi → khung Zalo vẫn đúng |
| UX-02 | ⏸ **Chờ dữ liệu** | — | — |
| UX-03 | ✅ Đã sửa, đã kiểm tra | Menu đầy đủ chỉ hiện từ `xl` (≥ 1280 px), dưới mức đó dùng menu thu gọn. Thêm `shrink-0`, `whitespace-nowrap` | 768, 1024, 1280, 1440 px: 0 phần tử tràn header, nút icon 44 × 44. Ảnh chụp 768 px trước/sau |
| UX-04 | ✅ Đã sửa theo quyết định (chủ shop giao: "chọn cái hợp lý nhất") | Giữ nguyên mọi câu chữ đặc tả, chỉ sửa đích đến: menu/footer **"Bộ Sưu Tập" → "Không Gian"** (dẫn tới "Chọn Không Gian Cho Tổ Ấm"); nút Hero **"Khám Phá Bộ Sưu Tập ↓" → `#bo-suu-tap-noi-bat`** (khối "Bộ Sưu Tập Nổi Bật") | Script đối chiếu: mọi link `#…` ở header, footer và Hero đều dẫn tới khối có tiêu đề khớp nhãn |
| UX-05 | ✅ Đã sửa theo quyết định "Đổi thành Cảm Hứng" | Tiêu đề **"Cảm Hứng Không Gian"**; mô tả "Gợi ý bố trí và phối đồ…"; 6 alt mô tả đúng nội dung từng ảnh (đã xem từng ảnh). Ghi chú trong code: ảnh minh hoạ, không phải nhà khách | 6/6 ảnh có alt riêng, không còn câu "của khách hàng" |
| UX-06 | ✅ Đã sửa (phần vàng theo quyết định "Làm đậm vàng nhẹ") | `text-ink/50–65` → `text-ink/70` (38 chỗ), chữ bản quyền footer `paper/40` → `paper/65`, "~5 phút" bỏ độ mờ; đổi token vàng (xem cột bên) | Lighthouse: **63 → 1 phần tử**: chỉ còn logo "ANH KHOA" ở footer (4,11). **Logo được WCAG 1.4.3 miễn yêu cầu tương phản**, nên giữ màu thương hiệu. Token `gold-deep` #8C6D46 → **#7A5D38**; nút/huy hiệu nền vàng có chữ sáng chuyển sang `gold-deep` (paper trên #7A5D38 ≈ 5,7:1; #7A5D38 trên `paper-dim` ≈ 5,1:1) |
| UX-07 | ✅ Đã sửa, đã kiểm tra | Esc đóng menu và trả focus về nút; `aria-controls="menu-di-dong"` | Đã kiểm tra ở 768 px |
| UX-08 | ✅ Đã sửa, đã kiểm tra | Logo lấy tên từ chữ hiển thị; nhãn "Mới" đưa ra ngoài nút ảnh; bỏ `aria-label` không khớp ở nút Zalo nổi (desktop) | Lighthouse không còn `label-content-name-mismatch` (mobile + desktop) |
| UX-09 | ✅ Đã sửa, đã kiểm tra | Skip link "Bỏ qua tới nội dung chính" → `<main id="noi-dung">` | Nhấn Tab thật: link hiện, cao 44 px; Enter → focus vào `MAIN` |
| UX-10 | ✅ Đã sửa, đã kiểm tra | "Bộ Sưu Tập Nổi Bật", "Góc Nhà Khách Hàng" → `h2`; tên bộ sưu tập → `h3`. Giữ nguyên class hiển thị | Dàn heading: H1 → 5 H2 nội dung + H2 Liên hệ, mỗi khối một H2 |
| UX-11 | ✅ Đã sửa, đã kiểm tra (số đo giả lập) | Cormorant chỉ tải 400 (thường + nghiêng); Be Vietnam 400/500/600; Plex Mono 400 và không tải trước. Ảnh Hero: `priority` (bị bỏ ở Next 16) → `loading="eager"` + `fetchPriority="high"` | Font preload **20 → 12**. Cảnh báo LCP trong console đã hết. Lighthouse cùng máy chủ cục bộ: xem E2 |
| UX-12 | ⏭ Để sau | — | Cần thử trên Android thật |
| UX-13 | ✅ Nội dung đã sửa theo quyết định "Bỏ dòng này" · hiển thị giữ nguyên | "Đổi trả trong 15 ngày" → "Khảo sát tận nơi miễn phí" (đã có trong cam kết dịch vụ). Các dòng chính sách vẫn là chữ thường, chưa có trang chính sách riêng | Footer hiển thị 4 dòng mới |
| UX-14 | Không sửa (đã ghi nhận) | — | — |
| UX-15 | ✅ Đã sửa, đã kiểm tra | `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png` dựng từ biểu tượng ngôi nhà trong `Logo.tsx` (nền `night`, nét `gold-light`) | HTML build có `<link rel="icon" … svg>` và `apple-touch-icon` |
| UX-16 | ✅ Đã sửa, đã kiểm tra | `alternates.canonical` dạng URL tuyệt đối (vì `metadataBase` có basePath) | HTML build: `canonical = https://khoahaf.github.io/noithatanhkhoa/` |
| UX-17 | ⏸ Chờ dữ liệu thật (UX-02) | — | — |
| UX-18 | Giữ nguyên | Không xoá file khi chưa có xác nhận | — |
| UX-19, UX-20 | Không sửa (đã ghi nhận) | — | — |

### E2. So sánh trước / sau (Lighthouse 12.8.2)

Cả hai bản đều chạy trên **cùng một máy chủ tĩnh cục bộ** (`python -m http.server`, không nén gzip). Vì vậy số tuyệt đối chậm hơn web thật; chỉ nên so sánh tương đối. Bản "trước" là nội dung nhánh `gh-pages` (commit `903bbfd`).

| Chỉ số | Trước (mobile, 2 lần) | Sau (mobile) | Trước (desktop) | Sau (desktop) |
|---|---|---|---|---|
| Performance | 70 / 68 | 71 / 72 | 92 | 94–95 |
| LCP | 8,0 s / 8,8 s | 7,2 s / 7,9 s / 7,5 s | 1,8 s | 1,5–1,6 s |
| Accessibility | 96 | **97** | 96 | **97** |
| Phần tử thiếu tương phản | 63 | **3** → **1** sau khi đổi màu vàng (chỉ còn logo, được miễn) | 63 | **4** → **1** |
| `label-content-name-mismatch` | 7 | **0** | 8 | **0** |
| Best Practices / SEO | 100 / 100 | 100 / 100 | 100 / 100 | 100 / 100 |

**Trên web thật** (GitHub Pages, sau khi deploy `bfe906a`, Lighthouse đo 1 lần, số giả lập có dao động):

| | Trước audit (mobile / desktop) | Sau (mobile / desktop) |
|---|---|---|
| Performance | 85 / 98 | 84 / 98 |
| LCP | 4,2 s / 1,1 s | **3,6 s** / 1,2 s |
| Accessibility | 96 / 96 | **97 / 97** |
| Phần tử thiếu tương phản | 63 | **1** (logo, được miễn) |

### E3. Kiểm thử hồi quy (sau khi sửa)

- `tsc --noEmit` ✅ · `npm run lint` ✅ · `DEPLOY_TARGET=github-pages npm run build` ✅ (thêm 2 route tĩnh `/icon.svg`, `/apple-icon.png`).
- Responsive **375 / 390 / 768 / 1024 / 1280 / 1440 px**: 0 tràn ngang, 0 phần tử vượt khung, mọi vùng chạm mobile ≥ 44 px.
- Luồng tại 390 px: lọc theo không gian (Bàn Ghế Phòng Ăn → 4 mẫu) ✅; lọc theo bộ sưu tập ✅; mở/đóng chi tiết, focus vào trong và trả về ✅; "Nhận Báo Giá Mẫu Này" điền sẵn tên mẫu ✅; danh sách quan tâm mở và đóng bằng Esc ✅; SĐT sai báo lỗi ✅; SĐT đúng → khung Zalo ✅.
- Console: không có lỗi.

### E4. Còn tồn tại / giới hạn

- **P0 chưa giải quyết** (UX-01, UX-02): cần thông tin thật từ chủ shop.
- Các quyết định thiết kế (UX-04, 05, 06, 13) đã được chủ shop chọn ngày 22/10/2026 và đã áp dụng.
- Lighthouse vẫn báo 1 lỗi tương phản cho logo footer (điểm Accessibility 97). Đây là ngoại lệ hợp lệ theo WCAG; muốn đạt 100 thì phải đổi logo footer sang `gold-light`, tức là thay đổi nhận diện, cần chủ shop đồng ý.
- **LCP mobile vẫn trên ngưỡng 2,5 s** trong điều kiện giả lập. Giảm tiếp cần quyết định thiết kế: bớt font (vd. thay Prata bằng Cormorant cho chữ nhỏ viết hoa), hoặc chuyển hosting sang nơi có cache dài (GitHub Pages cố định cache 10 phút).
- Chưa kiểm tra trên Safari/iOS, Android thật hay trình đọc màn hình thật. Mọi nhận định hành vi trong mục D vẫn là giả thuyết.

/**
 * MỌI THÔNG TIN LIÊN HỆ NẰM Ở ĐÂY — sửa một chỗ, cả trang cập nhật.
 * phone / zaloPhone: số do chủ shop cung cấp (27/10/2026). ⚠️ email / address vẫn là dữ liệu mẫu.
 */
export const SITE = {
  name: "Anh Khoa",
  fullName: "Nội Thất Anh Khoa",
  tagline: "Kiến tạo không gian sống",
  description:
    "Nội thất Anh Khoa — sofa, giường, bàn ghế và phụ kiện trang trí cao cấp, may đo theo kích thước riêng, kiến tạo không gian sống ấm áp và bền vững.",
  url: "https://khoahaf.github.io/noithatanhkhoa",
  phone: "0355 833 874",
  zaloPhone: "0355833874",
  email: "hello@anhkhoa.vn",
  address: "12 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
  hours: "8:00 – 20:00, Thứ Hai – Chủ Nhật",
  /** Để trống ("") thì icon tương ứng tự ẩn — không trỏ về trang chủ Facebook/Instagram chung. */
  social: {
    facebook: "",
    instagram: "",
    instagramHandle: "@anhkhoa.vn",
  },
  /**
   * Nơi nhận thông tin khách để lại (form tư vấn + đăng ký nhận tin).
   * Đặt biến môi trường NEXT_PUBLIC_LEAD_ENDPOINT lúc build — xem docs/nhan-thong-tin-khach.md.
   * Khi chưa đặt, form KHÔNG giả vờ "đã gửi" mà chuyển khách sang gửi qua Zalo / gọi điện.
   */
  leadEndpoint: process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "",
};

export const PHONE_HREF = `tel:${SITE.phone.replace(/\s/g, "")}`;
export const ZALO_URL = `https://zalo.me/${SITE.zaloPhone}`;

/** Nhãn nút theo đặc tả nội dung bán hàng. */
export const CTA = {
  header: "Tư Vấn Không Gian",
  heroPrimary: "Nhận Tư Vấn Kích Thước",
  heroSecondary: "Khám Phá Bộ Sưu Tập",
  productQuote: "Nhận Báo Giá Mẫu Này",
  formSubmit: "Gửi Yêu Cầu Tư Vấn Ngay",
} as const;

/** Hàng may đo: không niêm yết giá cứng. */
export const PRICE_NOTE = "Liên hệ tư vấn";
export const PRODUCT_TAG = "May đo theo kích thước riêng";

export const FOOTER_BRAND =
  "Nội Thất Anh Khoa - Xưởng chế tác và giải pháp nội thất may đo theo không gian căn hộ.";
export const FOOTER_COMMITMENTS = [
  "Khảo sát tận nơi miễn phí",
  "Tùy chỉnh kích thước theo yêu cầu",
  "Bảo hành kết cấu 03 năm",
] as const;

export const NAV = [
  { label: "Sản Phẩm", href: "#san-pham" },
  // Nhãn khớp tiêu đề khối "Chọn Không Gian Cho Tổ Ấm" (#bo-suu-tap) mà nó dẫn tới.
  { label: "Không Gian", href: "#bo-suu-tap" },
  { label: "Câu Chuyện", href: "#cau-chuyen" },
  { label: "Liên Hệ", href: "#lien-he" },
];

export const TRUST = [
  { title: "May Đo Vừa Vặn", body: "Tùy chỉnh kích thước chuẩn xác theo từng căn hộ." },
  { title: "Vật Liệu Tuyển Chọn", body: "Cốt gỗ sấy hạn chế cong vênh, sơn an toàn sức khỏe." },
  { title: "Khảo Sát Tận Nhà", body: "Hỗ trợ đo đạc hiện trạng và ướm mẫu vật liệu miễn phí." },
  { title: "Bảo Hành 03 Năm", body: "Bảo hành kết cấu khung mộc, hỗ trợ bảo trì đồng hành." },
] as const;

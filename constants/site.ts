/**
 * MỌI THÔNG TIN LIÊN HỆ NẰM Ở ĐÂY — sửa một chỗ, cả trang cập nhật.
 * ⚠️ phone / zaloPhone / email / address hiện là SỐ MẪU, cần thay bằng thông tin thật.
 */
export const SITE = {
  name: "Anh Khoa",
  fullName: "Nội Thất Anh Khoa",
  tagline: "Kiến tạo không gian sống",
  description:
    "Nội thất Anh Khoa — sofa, giường, bàn ghế và phụ kiện trang trí cao cấp, may đo theo kích thước riêng, kiến tạo không gian sống ấm áp và bền vững.",
  url: "https://khoahaf.github.io/noithatanhkhoa",
  phone: "0909 123 456",
  zaloPhone: "0909123456",
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

/** Tên gọi thống nhất cho mọi nút dẫn tới tư vấn. */
export const CTA_CONSULT = "Nhận Tư Vấn";

export const NAV = [
  { label: "Sản Phẩm", href: "#san-pham" },
  { label: "Bộ Sưu Tập", href: "#bo-suu-tap" },
  { label: "Câu Chuyện", href: "#cau-chuyen" },
  { label: "Liên Hệ", href: "#lien-he" },
];

export const TRUST = [
  "Gỗ chuẩn xuất khẩu",
  "May đo theo kích thước riêng",
  "Miễn phí vận chuyển & lắp đặt nội thành",
  "Bảo hành kết cấu 3 năm",
] as const;

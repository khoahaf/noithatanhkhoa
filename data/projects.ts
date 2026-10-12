import { img } from "@/lib/images";

export type Project = {
  slug: string;
  title: string;
  location: string;
  area: string;
  /** Ảnh hiện trạng bàn giao (trước khi thi công). */
  before: string;
  /** Ảnh sau khi Anh Khoa hoàn thiện. */
  after: string;
  quote: string;
  client: string;
};

/**
 * DEMO — chưa phải dự án/khách hàng thật. Khối <Projects /> đang được ẩn khỏi
 * app/page.tsx (và mục "Dự Án" khỏi NAV) cho tới khi có dữ liệu thật.
 * Trước khi đưa lên trang chính thức, thay `before`/`after` bằng cặp ảnh thật
 * chụp CÙNG một góc của cùng một căn hộ, và `quote`/`client` bằng lời nhận xét
 * thật đã được khách đồng ý cho đăng. Khi `before` trùng `after`, khối slider
 * tự làm ảnh "trước" thành bản thô (xám, nhạt) chỉ để minh hoạ tương tác.
 */
export const projects: Project[] = [
  {
    slug: "can-ho-thao-dien",
    title: "Căn hộ 2 phòng ngủ",
    location: "Thảo Điền, TP. Thủ Đức",
    area: "86 m²",
    before: img.livingRoomGreen,
    after: img.livingRoomGreen,
    quote:
      "Nhà bàn giao thô, hai vợ chồng không biết bắt đầu từ đâu. Anh Khoa đo đạc tận nơi, may sofa vừa khít khoảng tường — giờ chiều nào cũng muốn về sớm.",
    client: "Chị Minh Thư",
  },
  {
    slug: "penthouse-quan-7",
    title: "Penthouse phong cách Đêm Sài Gòn",
    location: "Phú Mỹ Hưng, Quận 7",
    area: "140 m²",
    before: img.livingRoomLeather,
    after: img.livingRoomLeather,
    quote:
      "Tôi thích nhất là đội lắp đặt: gọn gàng, đúng hẹn, và chỉnh lại từng chi tiết cho tới khi tôi ưng mới thôi.",
    client: "Anh Quốc Bảo",
  },
  {
    slug: "nha-pho-binh-thanh",
    title: "Phòng ngủ master nhà phố",
    location: "Bình Thạnh",
    area: "24 m²",
    before: img.bedroomLux,
    after: img.bedroomLux,
    quote:
      "Phòng ngủ nhỏ nhưng giờ thoáng hẳn. Giường đo theo kích thước riêng nên vẫn còn chỗ cho góc đọc sách.",
    client: "Chị Hạnh Nguyên",
  },
];

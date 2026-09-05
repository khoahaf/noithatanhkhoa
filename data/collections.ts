import { img } from "@/lib/images";
import type { Collection } from "@/types";

export const collections: Collection[] = [
  {
    slug: "hoang-kim-tu-nhien",
    name: "Hoàng Kim Tự Nhiên",
    tagline: "Ánh đồng ấm giữa chất liệu mộc",
    description:
      "Bộ sưu tập tôn vinh sự giao thoa giữa gỗ tự nhiên và ánh kim loại mạ đồng — lấy cảm hứng từ những buổi hoàng hôn chậm rãi, nơi ánh sáng vàng phủ lên từng thớ gỗ.",
    heroImage: img.loftLamp,
    productSlugs: [
      "sofa-tho-nau",
      "armchair-co-dien-trang",
      "tu-dau-giuong-hoang-gia",
      "dong-ho-hoang-kim",
    ],
  },
  {
    slug: "moc-tinh",
    name: "Mộc Tịnh",
    tagline: "Tối giản, tĩnh tại, đủ đầy",
    description:
      "Đường nét gọn gàng, bảng màu trung tính và chất liệu thật — Mộc Tịnh dành cho những không gian sống muốn buông bỏ mọi chi tiết thừa để tìm lại sự tĩnh tại.",
    heroImage: img.livingRoomClock,
    productSlugs: [
      "ghe-an-den-huyen",
      "ghe-an-tinh-khoi",
      "ban-an-go-soi",
      "tu-dau-giuong-la-xanh",
    ],
  },
  {
    slug: "dem-sai-gon",
    name: "Đêm Sài Gòn",
    tagline: "Sang trọng, trầm ấm, riêng tư",
    description:
      "Gam màu trầm sâu và chất liệu nhung cao cấp gợi nhắc những căn hộ penthouse giữa lòng thành phố không ngủ — nơi mỗi buổi tối trở thành một nghi thức nghỉ ngơi xứng đáng.",
    heroImage: img.livingRoomLeather,
    productSlugs: [
      "sofa-hoang-hon",
      "sofa-lua-vang",
      "giuong-dem-vang",
      "ban-tra-da-cam-thach",
    ],
  },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

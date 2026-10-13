import { img } from "@/lib/images";
import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "sofa",
    name: "Sofa & Phòng Khách",
    tagline: "Đệm mút nâng đỡ êm ái, gầm chân cao thoáng dễ vệ sinh, tối ưu lối đi.",
    image: img.livingRoomGreen,
  },
  {
    slug: "ghe-an",
    name: "Bàn Ghế Phòng Ăn",
    tagline: "Cạnh bàn bo mộc an toàn cho trẻ nhỏ, kết cấu vững chãi cho bữa cơm sum vầy.",
    image: img.openLivingDining,
  },
  {
    slug: "phong-ngu",
    name: "Không Gian Phòng Ngủ",
    tagline: "Giường tủ gỗ mộc thanh thoát, tối ưu góc để đồ, nâng niu giấc ngủ sâu.",
    image: img.bedroomNeutral,
  },
  {
    slug: "ban",
    name: "Góc Làm Việc & Bàn Trà",
    tagline: "Gọn gàng, tinh tế, biến góc nhỏ thành nơi tập trung và tái tạo năng lượng.",
    image: img.diningScene,
  },
  {
    slug: "phu-kien",
    name: "Phụ Kiện Trang Trí",
    tagline: "Chi tiết mạ đồng và mộc bản, hoàn thiện vẻ đẹp thanh lịch cho ngôi nhà.",
    image: img.livingRoomBlue,
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

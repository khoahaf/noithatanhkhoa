import { img } from "@/lib/images";
import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "sofa",
    name: "Sofa & Armchair",
    tagline: "Nơi mọi cuộc trò chuyện chậm lại",
    image: img.livingRoomGreen,
  },
  {
    slug: "ghe-an",
    name: "Ghế Ăn",
    tagline: "Ngồi vào là muốn nán lại thêm một bữa",
    image: img.openLivingDining,
  },
  {
    slug: "ban",
    name: "Bàn",
    tagline: "Trung tâm của mọi bữa cơm sum vầy",
    image: img.diningScene,
  },
  {
    slug: "phong-ngu",
    name: "Phòng Ngủ",
    tagline: "Giấc ngủ sâu bắt đầu từ một không gian đẹp",
    image: img.bedroomNeutral,
  },
  {
    slug: "phu-kien",
    name: "Phụ Kiện Trang Trí",
    tagline: "Chi tiết nhỏ, cảm xúc lớn",
    image: img.livingRoomBlue,
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

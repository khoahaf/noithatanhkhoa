export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  gallery: string[];
  material: string;
  /** Nhãn chất liệu ngắn hiển thị trên card, vd "Gỗ Sồi · Nhung Ý". */
  tag: string;
  dimensions: string;
  /** Dài × Sâu × Cao (cm) — dùng cho thông số mm và hình minh hoạ tỷ lệ. */
  size?: { w: number; d: number; h: number };
  description: string;
  isNew?: boolean;
  featured?: boolean;
};

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  productSlugs: string[];
};

export type Hotspot = {
  top: string;
  left: string;
  label: string;
  /** Mở Quick View của sản phẩm này. */
  productSlug?: string;
  /** Hoặc lọc catalog theo bộ sưu tập này. */
  collectionSlug?: string;
};

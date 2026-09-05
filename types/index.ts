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
  dimensions: string;
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
  price?: number;
  href: string;
};

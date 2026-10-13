"use client";

import { create } from "zustand";

type CatalogState = {
  /** Slug danh mục đang lọc, hoặc "all". */
  category: string;
  /** Slug bộ sưu tập đang lọc (ưu tiên hơn danh mục), hoặc null. */
  collection: string | null;
  /** Slug sản phẩm đang mở trong Quick View, hoặc null. */
  quickView: string | null;
  setCategory: (category: string) => void;
  setCollection: (collection: string | null) => void;
  openQuickView: (slug: string) => void;
  closeQuickView: () => void;
};

export const useCatalogStore = create<CatalogState>()((set) => ({
  category: "all",
  collection: null,
  quickView: null,
  setCategory: (category) => set({ category, collection: null }),
  setCollection: (collection) => set({ collection, category: "all" }),
  openQuickView: (slug) => set({ quickView: slug }),
  closeQuickView: () => set({ quickView: null }),
}));

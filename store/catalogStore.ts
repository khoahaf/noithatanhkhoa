"use client";

import { create } from "zustand";

type CatalogState = {
  /** Slug danh mục đang lọc, hoặc "all". */
  category: string;
  /** Slug sản phẩm đang mở trong Quick View, hoặc null. */
  quickView: string | null;
  setCategory: (category: string) => void;
  openQuickView: (slug: string) => void;
  closeQuickView: () => void;
};

export const useCatalogStore = create<CatalogState>()((set) => ({
  category: "all",
  quickView: null,
  setCategory: (category) => set({ category }),
  openQuickView: (slug) => set({ quickView: slug }),
  closeQuickView: () => set({ quickView: null }),
}));

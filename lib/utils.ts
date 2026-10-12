import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatVND(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount) + " ₫";
}

/** "Giá tham khảo từ" — làm tròn theo triệu, vd 68.500.000 → "68,5 triệu". */
export function formatMillions(amount: number) {
  const millions = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 1 }).format(
    amount / 1_000_000
  );
  return `${millions} triệu`;
}

/** Kích thước cm → "2100 × 900 × 800 mm" (Dài × Sâu × Cao). */
export function formatSizeMM(size: { w: number; d: number; h: number }) {
  return `${size.w * 10} × ${size.d * 10} × ${size.h * 10} mm`;
}

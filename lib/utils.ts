import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatVND(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount) + " ₫";
}

/** Kích thước cm → "2000 x 850 x 800 mm" (Dài x Sâu x Cao). */
export function formatSizeMM(size: { w: number; d: number; h: number }) {
  return `${size.w * 10} x ${size.d * 10} x ${size.h * 10} mm`;
}

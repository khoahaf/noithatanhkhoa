import { SITE } from "@/constants/site";

export const ZALO_URL = `https://zalo.me/${SITE.zaloPhone}`;

/**
 * Link zalo.me không hỗ trợ điền sẵn tin nhắn, nên ta chép nội dung vào
 * clipboard trước rồi mở Zalo — khách chỉ cần dán và gửi.
 */
export async function openZaloWithMessage(message: string) {
  let copied = false;
  try {
    await navigator.clipboard.writeText(message);
    copied = true;
  } catch {
    // Clipboard bị chặn (http, quyền trình duyệt) — vẫn mở Zalo bình thường.
  }
  window.open(ZALO_URL, "_blank", "noopener,noreferrer");
  return copied;
}

export function quoteMessage(productName: string, dims?: string) {
  return `Chào Anh Khoa, tôi muốn nhận báo giá mẫu "${productName}"${
    dims ? ` (${dims})` : ""
  }. Nhờ tư vấn giúp kích thước phù hợp với không gian nhà tôi.`;
}

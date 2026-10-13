import { ZALO_URL } from "@/constants/site";

export { ZALO_URL };

/**
 * Link zalo.me không hỗ trợ điền sẵn tin nhắn, nên ta chép nội dung vào
 * clipboard rồi mở Zalo — khách chỉ cần dán và gửi.
 *
 * window.open phải chạy ĐỒNG BỘ trong cú bấm: nếu chờ clipboard xong mới mở,
 * Safari/iOS coi đó không còn là thao tác của người dùng và chặn cửa sổ.
 */
export function openZaloWithMessage(message: string): Promise<boolean> {
  const copy = navigator.clipboard?.writeText(message);
  window.open(ZALO_URL, "_blank", "noopener,noreferrer");
  if (!copy) return Promise.resolve(false);
  return copy.then(
    () => true,
    () => false
  );
}

export function quoteMessage(productName: string, dims?: string) {
  return `Chào Anh Khoa, tôi muốn nhận báo giá mẫu "${productName}"${
    dims ? ` (${dims})` : ""
  }. Nhờ tư vấn giúp kích thước phù hợp với không gian nhà tôi.`;
}

# Nhận thông tin khách từ form về Google Sheet (+ báo Telegram)

Web chạy trên GitHub Pages (không có server), nên form gửi thông tin tới một
**Google Apps Script** miễn phí. Script ghi từng khách vào Google Sheet và báo ngay về Telegram.

Khi **chưa** cấu hình, form không giả vờ "đã gửi": khách được chuyển sang gửi qua
Zalo hoặc gọi điện, với nội dung soạn sẵn. Khối "Đăng ký nhận tin" sẽ tự ẩn.

## Bước 1 — Tạo Sheet và script

1. Tạo Google Sheet mới, đặt tên `Khách Anh Khoa`.
2. Menu **Tiện ích mở rộng → Apps Script**, xoá code mẫu, dán đoạn sau:

```js
// Điền nếu muốn nhận báo qua Telegram (để trống nếu không dùng)
const TELEGRAM_BOT_TOKEN = "";
const TELEGRAM_CHAT_ID = "";

function doPost(e) {
  const p = e.parameter;
  const sheet = SpreadsheetApp.getActive().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Thời gian", "Loại", "Họ tên", "SĐT", "Email", "Nội dung", "Trang"]);
  }
  sheet.appendRow([new Date(), p.type, p.name || "", p.phone || "", p.email || "", p.message || "", p.page || ""]);

  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    const text = p.type === "nhan-tin"
      ? `📩 Đăng ký nhận tin: ${p.email}`
      : `🛋 Khách cần tư vấn\n${p.name} — ${p.phone}\n${p.message || ""}`;
    UrlFetchApp.fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "post",
      payload: { chat_id: TELEGRAM_CHAT_ID, text },
    });
  }
  return ContentService.createTextOutput("ok");
}
```

3. **Triển khai → Tùy chọn triển khai mới → Ứng dụng web**
   - Thực thi dưới dạng: **Tôi**
   - Ai có quyền truy cập: **Bất kỳ ai**
4. Chép **URL ứng dụng web** (dạng `https://script.google.com/macros/s/.../exec`).

## Bước 2 — Build lại web với URL đó

```bash
NEXT_PUBLIC_LEAD_ENDPOINT="https://script.google.com/macros/s/XXXX/exec" DEPLOY_TARGET=github-pages npm run build
```

Sau đó đẩy thư mục `out/` lên nhánh `gh-pages` như các lần trước.

> Có thể dùng dịch vụ khác (Formspree, Getform, webhook riêng): đặt URL đó vào
> `NEXT_PUBLIC_LEAD_ENDPOINT`, form sẽ gửi JSON và chỉ báo thành công khi dịch vụ trả về OK.

## Bước 3 — Kiểm tra

Gửi thử form trên web → một dòng mới xuất hiện trong Sheet (và tin Telegram nếu có cấu hình).

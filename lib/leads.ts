import { SITE } from "@/constants/site";

export type LeadResult = "sent" | "error" | "no-endpoint";

export function hasLeadEndpoint() {
  return SITE.leadEndpoint.length > 0;
}

/** Số di động VN: 10 số, bắt đầu bằng 0 (chấp nhận khoảng trắng, dấu chấm, +84). */
export function normalizeVNPhone(raw: string) {
  const digits = raw.replace(/[\s.\-()]/g, "").replace(/^\+?84/, "0");
  return /^0\d{9}$/.test(digits) ? digits : null;
}

/**
 * Gửi thông tin khách tới endpoint đã cấu hình.
 * - Google Apps Script (script.google.com) không trả header CORS, nên gửi
 *   no-cors dạng form: không đọc được phản hồi, coi là thành công nếu không lỗi mạng.
 * - Dịch vụ khác (Formspree, Getform, webhook riêng…) gửi JSON và kiểm tra res.ok.
 */
export async function submitLead(
  type: "tu-van" | "nhan-tin",
  fields: Record<string, string>
): Promise<LeadResult> {
  if (!hasLeadEndpoint()) return "no-endpoint";
  const payload = { type, page: window.location.href, sentAt: new Date().toISOString(), ...fields };
  try {
    if (SITE.leadEndpoint.includes("script.google.com")) {
      await fetch(SITE.leadEndpoint, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(payload),
      });
      return "sent";
    }
    const res = await fetch(SITE.leadEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok ? "sent" : "error";
  } catch {
    return "error";
  }
}

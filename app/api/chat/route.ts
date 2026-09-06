import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { SITE } from "@/constants/site";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

// In-memory, per-instance rate limit. Not distributed-safe across serverless
// instances, but it stops casual/scripted abuse from running up API costs.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string) {
  const now = Date.now();
  const bucket = rateBuckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
}

function buildSystemPrompt() {
  const catalog = products
    .map((p) => `- ${p.name} (${p.category}): ${p.price.toLocaleString("vi-VN")}đ`)
    .join("\n");

  return `Bạn là trợ lý tư vấn nội thất của thương hiệu "${SITE.fullName}" (${SITE.tagline}).
Trả lời ngắn gọn, thân thiện, tự nhiên bằng tiếng Việt, tối đa vài câu mỗi lượt.
Vì sản phẩm có giá trị lớn, khách cần đặt cọc trước khi được giao hàng — nếu khách muốn chốt đơn,
hãy hướng dẫn họ để lại thông tin ở mục Liên Hệ trên trang hoặc gọi số ${SITE.phone} để được tư vấn đặt cọc.
Không tự bịa thông tin sản phẩm ngoài danh sách dưới đây.

Danh sách sản phẩm hiện có:
${catalog}

Địa chỉ showroom: ${SITE.address}. Giờ mở cửa: ${SITE.hours}.`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Chatbot chưa được cấu hình. Vui lòng gọi trực tiếp hoặc để lại thông tin ở mục Liên Hệ.",
      },
      { status: 503 }
    );
  }

  // Reject cross-site browser requests (a same-origin request either omits
  // Origin or sends one matching our own host).
  const origin = req.headers.get("origin");
  if (origin) {
    const originHost = (() => {
      try {
        return new URL(origin).host;
      } catch {
        return null;
      }
    })();
    if (originHost !== req.headers.get("host")) {
      return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 403 });
    }
  }

  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { error: "Bạn gửi hơi nhanh, vui lòng thử lại sau ít phút." },
      { status: 429 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 400 });
  }
  const isValid = messages.every(
    (m) =>
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.length > 0 &&
      m.content.length <= MAX_MESSAGE_LENGTH
  );
  if (!isValid) {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 400 });
  }

  let response: Response;
  try {
    response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: buildSystemPrompt(),
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });
  } catch (err) {
    console.error("Anthropic API request failed", err);
    return NextResponse.json(
      { error: "Không thể kết nối trợ lý lúc này, vui lòng thử lại sau." },
      { status: 502 }
    );
  }

  if (!response.ok) {
    const detail = await response.text();
    console.error("Anthropic API error", response.status, detail);
    return NextResponse.json(
      { error: "Không thể kết nối trợ lý lúc này, vui lòng thử lại sau." },
      { status: 502 }
    );
  }

  const data = await response.json();
  const text: string =
    data.content?.find((block: { type: string }) => block.type === "text")?.text ??
    "Xin lỗi, tôi chưa có câu trả lời phù hợp lúc này.";

  return NextResponse.json({ reply: text });
}

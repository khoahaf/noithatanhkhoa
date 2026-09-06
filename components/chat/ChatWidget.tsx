"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { cartCount, useCartStore } from "@/store/cartStore";
import { useMounted } from "@/lib/useMounted";
import { cn } from "@/lib/utils";

type ChatMessage = { role: "user" | "assistant"; content: string };

export function ChatWidget() {
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const prevCount = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted) return;
    const count = cartCount(items);
    if (count > prevCount.current) {
      const lastItem = items[items.length - 1];
      setOpen(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: lastItem
            ? `Bạn vừa thêm "${lastItem.name}" vào giỏ. Mình có thể tư vấn thêm về sản phẩm này hoặc không gian phù hợp — bạn cứ hỏi nhé!`
            : "Bạn cần Anh Khoa tư vấn thêm gì không?",
        },
      ]);
    }
    prevCount.current = count;
  }, [mounted, items]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, loading]);

  if (!mounted) return null;

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-20) }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.ok
            ? data.reply
            : (data.error ?? "Không thể kết nối trợ lý lúc này, vui lòng thử lại sau."),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Không thể kết nối trợ lý lúc này, vui lòng thử lại sau." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[28rem] w-[20rem] flex-col overflow-hidden border border-line/60 bg-paper shadow-xl sm:w-[22rem]">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line/60 bg-night px-4">
            <p className="text-eyebrow text-[0.68rem] text-gold-light">Tư Vấn Cùng Anh Khoa</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Đóng chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-gold-light/80 hover:text-gold-light"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 && (
              <p className="text-sm text-ink/50">
                Chào bạn, mình là trợ lý của Anh Khoa. Bạn cần tư vấn sản phẩm nào?
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "ml-auto bg-night text-paper"
                    : "bg-paper-dim text-ink"
                )}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] bg-paper-dim px-3.5 py-2.5 text-sm text-ink/50">
                Đang trả lời…
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="flex shrink-0 gap-2 border-t border-line/60 p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi của bạn…"
              className="h-11 flex-1 border border-ink/15 bg-paper px-3 text-sm text-ink placeholder:text-ink/35 focus:border-gold"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Gửi"
              className="flex h-11 w-11 shrink-0 items-center justify-center bg-night text-gold-light transition-colors hover:bg-night-soft disabled:opacity-40"
            >
              <Send className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Đóng chat tư vấn" : "Mở chat tư vấn"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-night text-gold-light shadow-lg transition-transform hover:scale-105"
      >
        {open ? (
          <X className="h-6 w-6" strokeWidth={1.5} />
        ) : (
          <MessageCircle className="h-6 w-6" strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}

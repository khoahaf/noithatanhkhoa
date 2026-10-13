"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Hành vi chuẩn cho ngăn kéo/cửa sổ: đưa focus vào trong khi mở, giữ phím Tab
 * quanh quẩn bên trong, Esc để đóng, khoá cuộn trang phía sau, và trả focus về
 * đúng nút đã mở nó khi đóng. Phần tử khi đóng nên được đặt `inert` để bàn phím
 * không lọt vào các nút đang nằm ngoài màn hình.
 */
export function useDialog(isOpen: boolean, close: () => void, ref: RefObject<HTMLElement | null>) {
  const closeRef = useRef(close);
  useEffect(() => {
    closeRef.current = close;
  }, [close]);

  useEffect(() => {
    if (!isOpen) return;
    const panel = ref.current;
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Chờ một nhịp để panel hết `inert` rồi mới focus.
    const timer = window.setTimeout(() => {
      panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 0);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeRef.current();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [isOpen, ref]);
}

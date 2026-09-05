import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 44"
      fill="none"
      className={cn("h-7 w-7", className)}
      aria-hidden="true"
    >
      <path
        d="M4 22 L24 4 L44 22"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 18 V40 H38 V18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 28 V40 M29 28 V40 M19 34 H29"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="24" cy="10.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function Logo({
  className,
  tone = "gold",
}: {
  className?: string;
  tone?: "gold" | "ink";
}) {
  const color = tone === "gold" ? "text-gold" : "text-ink";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={color} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-[family-name:var(--font-wordmark)] text-[1.15rem] tracking-[0.22em]",
            color
          )}
        >
          ANH KHOA
        </span>
        <span className="mt-1 text-[0.55rem] tracking-[0.24em] text-current opacity-70 uppercase">
          Kiến tạo không gian sống
        </span>
      </span>
    </span>
  );
}

import { Home, Ruler, ShieldCheck, TreePine } from "lucide-react";
import { TRUST } from "@/constants/site";

const icons = [Ruler, TreePine, Home, ShieldCheck];

export function TrustBar() {
  return (
    <section aria-label="Cam kết dịch vụ của Nội Thất Anh Khoa" className="border-b border-line bg-paper-dim">
      <ul className="container-page grid grid-cols-2 gap-x-4 gap-y-6 py-7 lg:grid-cols-4 lg:gap-x-8 lg:py-9">
        {TRUST.map(({ title, body }, i) => {
          const Icon = icons[i];
          return (
            <li key={title} className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40">
                <Icon className="h-[18px] w-[18px] text-gold-deep" strokeWidth={1.4} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[15px] font-semibold leading-snug text-ink">{title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink/70 sm:text-sm">{body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

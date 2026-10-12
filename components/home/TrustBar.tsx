import { Ruler, ShieldCheck, TreePine, Truck } from "lucide-react";
import { TRUST } from "@/constants/site";

const icons = [TreePine, Ruler, Truck, ShieldCheck];

export function TrustBar() {
  return (
    <section aria-label="Cam kết của Anh Khoa" className="border-b border-line bg-paper-dim">
      <ul className="container-page grid grid-cols-2 gap-x-4 gap-y-5 py-6 lg:grid-cols-4 lg:py-7">
        {TRUST.map((text, i) => {
          const Icon = icons[i];
          return (
            <li key={text} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40">
                <Icon className="h-[18px] w-[18px] text-gold-deep" strokeWidth={1.4} />
              </span>
              <span className="text-[13px] leading-snug text-ink/80 sm:text-sm">{text}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

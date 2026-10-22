"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronsLeftRight, Quote } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function Projects() {
  const [index, setIndex] = useState(0);
  const project = projects[index];

  return (
    <section id="du-an" className="section-y scroll-mt-20 bg-paper-dim">
      <div className="container-page">
        <div className="rule-diamond mb-3">
          <p className="text-eyebrow shrink-0 text-xs text-gold-deep">
            Dự Án Thực Tế
          </p>
        </div>
        <p className="mx-auto mb-10 max-w-lg text-center text-[15px] text-ink/70">
          Kéo thanh trượt để xem không gian trước và sau khi Anh Khoa hoàn thiện.
        </p>

        <div className="grid items-center gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          {/* key: đưa thanh trượt về giữa mỗi khi đổi dự án */}
          <BeforeAfter key={project.slug} project={project} />

          <div>
            <p className="text-eyebrow text-xs text-gold-deep">
              {project.location} · {project.area}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl leading-tight text-ink">
              {project.title}
            </h3>
            <figure className="mt-6 border-l-2 border-gold pl-5">
              <Quote className="h-5 w-5 text-gold" strokeWidth={1.4} />
              <blockquote className="mt-2 font-[family-name:var(--font-display)] text-xl italic leading-relaxed text-ink/85">
                {project.quote}
              </blockquote>
              <figcaption className="mt-4 text-sm text-ink/70">— {project.client}</figcaption>
            </figure>

            <div className="mt-8 flex gap-2" role="tablist" aria-label="Chọn dự án">
              {projects.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={p.title}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-10 bg-gold" : "w-5 bg-ink/15 hover:bg-ink/30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfter({ project }: { project: Project }) {
  const [pos, setPos] = useState(50);
  const sameShot = project.before === project.after;

  return (
    <div className="relative aspect-[4/3] select-none overflow-hidden bg-night">
      <Image
        src={project.after}
        alt={`${project.title} sau khi hoàn thiện`}
        fill
        sizes="(min-width:1024px) 60vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={project.before}
          alt={`${project.title} trước khi thi công`}
          fill
          sizes="(min-width:1024px) 60vw, 100vw"
          className={cn("object-cover", sameShot && "brightness-110 contrast-75 grayscale")}
        />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 bg-night/80 px-3 py-1 text-eyebrow text-xs text-paper">
        Trước
      </span>
      <span className="pointer-events-none absolute right-4 top-4 bg-gold-deep px-3 py-1 text-eyebrow text-xs text-paper">
        Sau
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-paper"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-lg">
          <ChevronsLeftRight className="h-5 w-5" strokeWidth={1.5} />
        </span>
      </div>

      {/* Input range phủ toàn khung: kéo chuột, chạm và phím mũi tên đều dùng được */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="So sánh trước và sau"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

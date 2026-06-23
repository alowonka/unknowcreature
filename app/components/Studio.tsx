"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getDictionary } from "@/app/i18n";

gsap.registerPlugin(ScrollTrigger);

/**
 * Studio: título fijado (pin, solo desktop) mientras la línea de tiempo hace scroll,
 * y el banner grupal con escala que se "asienta" por scrub. Las entradas usan `.reveal`.
 */
export default function Studio() {
  const root = useRef<HTMLElement>(null);
  const t = getDictionary().studio;

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // banner: escala 1.18 -> 1 ligada al scroll
      const wrap = el.querySelector(".reveal-img");
      const img = wrap?.querySelector("img");
      if (wrap && img) {
        gsap.fromTo(
          img,
          { scale: 1.18 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: wrap, start: "top 90%", end: "bottom top", scrub: true },
          },
        );
      }

      // pin del título (solo desktop)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 96px",
          end: "bottom 70%",
          pin: "#studio-pin",
          pinSpacing: false,
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="studio" ref={root} className="relative py-24 md:py-36">
      <div className="mx-auto max-w-8xl px-6 md:px-8 grid lg:grid-cols-12 gap-12">
        {/* pinned left */}
        <div className="lg:col-span-5">
          <div id="studio-pin" className="lg:py-10">
            <p className="font-mono text-xs tracking-[0.35em] uppercase text-blood mb-6">
              {t.eyebrow}
            </p>
            <h2
              className="font-display font-black uppercase leading-[0.95] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.3rem,4.6vw,4.2rem)" }}
            >
              {t.headingLineOne}
              <br />
              {t.headingLineTwo}
            </h2>
            <p className="mt-6 text-ash leading-relaxed max-w-md">{t.description}</p>
          </div>
        </div>

        {/* scrolling right */}
        <div className="lg:col-span-7 space-y-12">
          {t.timeline.map((item) => (
            <div key={item.year} className="reveal">
              <span className="font-display text-5xl md:text-6xl font-black text-gradient">
                {item.year}
              </span>
              <p className="mt-3 text-ash leading-relaxed max-w-xl">
                {item.bodyPre} <span className="text-bone">{item.bodyHighlight}</span>
                {item.bodyPost}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* group banner: image scale + fade */}
      <div className="mx-auto max-w-8xl px-6 md:px-8 mt-24">
        <div className="reveal-img overflow-hidden rounded-3xl border border-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/team/team-07.jpg" alt={t.bannerAlt} className="w-full object-cover" />
        </div>
        <p className="mt-4 font-mono text-[11px] tracking-[0.25em] uppercase text-ash-2 text-center">
          {t.bannerCaption}
        </p>
      </div>
    </section>
  );
}

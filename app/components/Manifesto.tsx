"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getDictionary } from "@/app/i18n";

gsap.registerPlugin(ScrollTrigger);

/**
 * Manifiesto "Who we are": cada palabra arranca atenuada (`.has-js .word`) y se
 * ilumina con scrub ligado al scroll. El texto se parte en palabras en el render.
 */
export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const t = getDictionary().manifesto;

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // fromTo fija el inicio en 0.12 explícitamente: el scrub no depende de que
      // GSAP lea el valor del CSS `.has-js .word` en el momento justo.
      gsap.fromTo(
        el.querySelectorAll(".word"),
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const words = t.body.trim().split(/\s+/);

  return (
    <section className="relative py-32 md:py-52">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-xs tracking-[0.35em] uppercase text-blood mb-10">
          {t.eyebrow}
        </p>
        <p
          ref={ref}
          className="font-display font-medium leading-[1.18] tracking-[-0.01em]"
          style={{ fontSize: "clamp(1.7rem, 4.2vw, 3.3rem)" }}
        >
          {words.map((w, i) => (
            <Fragment key={i}>
              <span className="word">{w}</span>
              {i < words.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}

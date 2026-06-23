"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { getDictionary } from "@/app/i18n";

const CIRC = 289;

/**
 * Game teaser con "hold to blast": mantener presionado llena el anillo (1.8s);
 * al completarse, un burst + flash revelan la criatura, que queda despierta.
 */
export default function GameTeaser() {
  const g = getDictionary().game;
  const btnRef = useRef<HTMLButtonElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const coreRef = useRef<HTMLSpanElement>(null);
  const isoRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const burstRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const ring = ringRef.current;
    const core = coreRef.current;
    const iso = isoRef.current;
    const glow = glowRef.current;
    const burst = burstRef.current;
    const label = labelRef.current;
    const bg = bgRef.current;
    const flash = flashRef.current;
    if (!btn || !ring || !core || !iso || !glow || !burst || !label || !bg || !flash) return;

    let done = false;
    let tween: gsap.core.Tween | null = null;
    let pulse: gsap.core.Tween | null = null;

    function wake() {
      done = true;
      gsap.set(burst, { scale: 1, opacity: 0.9 });
      gsap.to(burst, { scale: 2.3, opacity: 0, duration: 0.7, ease: "power2.out" });
      gsap.fromTo(flash, { opacity: 0.6 }, { opacity: 0, duration: 0.9, ease: "power2.out" });
      gsap.to(iso, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.8)" });
      gsap.to(glow, { opacity: 1, duration: 0.7, ease: "power2.out" });
      gsap.to(bg, { opacity: 0.7, duration: 0.8 });
      gsap.to(core, { scale: 1, duration: 0.3 });
      label!.classList.remove("text-blood");
      label!.classList.add("text-blood-bright");
      label!.innerHTML = `${g.holdLabelDonePre} <span class="text-bone">${g.holdLabelDoneHighlight}</span>`;
    }

    function start(e: PointerEvent) {
      if (done) return;
      e.preventDefault();
      label!.textContent = g.holdLabelWaking;
      label!.classList.add("text-blood");
      gsap.to(bg, { opacity: 0.45, duration: 0.6 });
      pulse = gsap.to(core, { scale: 1.04, duration: 0.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      tween = gsap.to(ring, {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: "power1.in",
        onComplete: () => {
          pulse?.kill();
          wake();
        },
      });
    }

    function cancel() {
      if (done) return;
      tween?.kill();
      pulse?.kill();
      gsap.to(ring, { strokeDashoffset: CIRC, duration: 0.4, ease: "power2.out" });
      gsap.to(core, { scale: 1, duration: 0.3 });
      gsap.to(bg, { opacity: 0.2, duration: 0.5 });
      label!.textContent = g.holdLabelIdle;
      label!.classList.remove("text-blood");
    }

    const onContext = (e: Event) => e.preventDefault();

    btn.addEventListener("pointerdown", start);
    window.addEventListener("pointerup", cancel);
    btn.addEventListener("pointercancel", cancel);
    btn.addEventListener("contextmenu", onContext);

    return () => {
      btn.removeEventListener("pointerdown", start);
      window.removeEventListener("pointerup", cancel);
      btn.removeEventListener("pointercancel", cancel);
      btn.removeEventListener("contextmenu", onContext);
      tween?.kill();
      pulse?.kill();
    };
  }, [g]);

  return (
    <section id="game" className="relative py-28 md:py-44 overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-20 transition-opacity duration-700 ease-out"
      >
        <video className="h-full w-full object-cover" autoPlay muted loop playsInline>
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-ink/85" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(80% 60% at 50% 45%, transparent 25%, #0A0708 100%)" }}
      />
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 bg-blood opacity-0 mix-blend-screen"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center flex flex-col items-center">
        <p className="font-mono text-xs tracking-[0.4em] uppercase text-blood mb-6">{g.eyebrow}</p>
        <h2
          className="font-display font-black uppercase leading-[0.95] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2.4rem,6vw,5rem)" }}
        >
          {g.headingLineOne}
          <br />
          <span className="text-gradient">{g.headingHighlight}</span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-ash text-lg leading-relaxed">{g.description}</p>

        {/* HOLD TO BLAST */}
        <div className="mt-14 flex flex-col items-center gap-6 select-none">
          <button
            ref={btnRef}
            type="button"
            aria-label={g.buttonLabel}
            className="group relative h-44 w-44 rounded-full outline-none touch-none cursor-pointer"
          >
            <span
              ref={glowRef}
              className="pointer-events-none absolute -inset-6 rounded-full opacity-0"
              style={{ background: "radial-gradient(circle, rgba(225,21,48,.5), transparent 60%)" }}
            />
            <span
              ref={burstRef}
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-blood opacity-0"
            />
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
              <circle
                ref={ringRef}
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#E11530"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="289"
                strokeDashoffset="289"
                style={{ filter: "drop-shadow(0 0 6px rgba(225,21,48,.8))" }}
              />
            </svg>
            <span
              ref={coreRef}
              className="absolute inset-3 rounded-full transition-transform duration-300 group-active:scale-95"
              style={{ background: "radial-gradient(circle at 50% 45%, rgba(34,14,20,.7), rgba(10,7,8,.95) 72%)" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={isoRef}
              src="/creature.svg"
              alt={g.isoAlt}
              className="pointer-events-none absolute inset-0 m-auto h-28 w-28 object-contain opacity-0"
              style={{ filter: "drop-shadow(0 0 16px rgba(225,21,48,.7))", transform: "scale(.5)" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </button>
          <p
            ref={labelRef}
            className="font-mono text-[11px] tracking-[0.35em] uppercase text-ash transition-colors"
          >
            {g.holdLabelIdle}
          </p>
        </div>
      </div>
    </section>
  );
}

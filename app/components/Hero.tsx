"use client";

import { useRef, useState } from "react";
import Magnetic from "./Magnetic";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) void v.play();
  };

  return (
    <section id="top" className="relative w-full flex flex-col min-h-screen">
      {/* VIDEO STAGE */}
      <div className="relative w-full h-[48vh] md:h-[56vh] shrink-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b12] via-[#120a10] to-ink" />
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/hero-intro.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(125% 105% at 50% 38%, transparent 42%, rgba(10,7,8,.55) 88%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 md:h-48 bg-gradient-to-b from-transparent to-ink" />

        <button
          onClick={toggleSound}
          className="absolute z-10 bottom-5 right-5 flex items-center gap-2 rounded-full border border-white/10 bg-ink-2/60 backdrop-blur px-4 py-2 text-[11px] font-mono uppercase tracking-widest text-ash hover:text-bone transition"
        >
          {muted ? "Sound off" : "Sound on"}
        </button>
      </div>

      {/* TEXT STAGE */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10 w-full max-w-6xl mx-auto">
        <p
          data-hero
          className="font-mono text-[11px] md:text-xs tracking-[0.45em] text-ash uppercase mb-6"
        >
          Est. 2024 — Mérida <span className="text-blood">&times;</span> Houston
        </p>
        <h1
          data-hero
          className="font-display font-black uppercase leading-[0.92] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2.7rem, 7vw, 6rem)" }}
        >
          We give shape<br className="hidden sm:block" /> to the{" "}
          <span className="text-gradient">unknown</span>
        </h1>
        <p
          data-hero
          className="mx-auto mt-7 max-w-2xl text-base md:text-lg text-ash leading-relaxed"
        >
          A Mexican-American game studio crafting original worlds, unforgettable
          creatures, and games that teach — built by five Yucatecans who have
          been at this for two decades.
        </p>
        <div
          data-hero
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Magnetic>
            <a
              href="#notify"
              className="block rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white glow-blood"
            >
              Get notified about the launch
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#studio"
              className="block rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-bone hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              Meet the studio
            </a>
          </Magnetic>
        </div>
      </div>

      {/* scroll cue */}
      <div className="shrink-0 pb-7 flex flex-col items-center gap-2 text-ash-2">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <span className="h-9 w-px bg-gradient-to-b from-blood to-transparent animate-pulse" />
      </div>
    </section>
  );
}

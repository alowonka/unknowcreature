"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal-on-scroll global para cualquier elemento con clase `.reveal`.
 * Replica el handler inline del prototipo: el CSS los oculta (`.has-js .reveal`)
 * y este componente los vuelve a entrar al cruzar el viewport.
 * No renderiza nada; opera sobre el DOM ya montado por las secciones server.
 */
export default function Reveals() {
  useEffect(() => {
    // Con reduced-motion el CSS ya deja los .reveal visibles; no animamos.
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });
    });

    // Recalcular posiciones cuando fuentes/imágenes terminan de cargar.
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") ScrollTrigger.refresh();
    else window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, []);

  return null;
}

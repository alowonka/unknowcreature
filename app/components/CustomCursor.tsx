"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

/**
 * Custom cursor (à la Trionn): a trailing ring + an exact dot, desktop/fine-pointer only.
 * Adds `has-js` (gate for reveals) and `has-cursor` (hides native cursor) on the root.
 * Hover state uses event delegation so it works for elements mounted later.
 */
export default function CustomCursor() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-js");

    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    root.classList.add("has-cursor");

    const ring = document.getElementById("cursor-ring");
    const dot = document.getElementById("cursor-dot");
    if (!ring || !dot) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("pointermove", onMove);

    const onTick = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      dot.style.transform = `translate(${tx}px, ${ty}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
    };
    gsap.ticker.add(onTick);

    const SEL = "a, button, .magnetic, [data-hover]";
    const onOver = (e: Event) => {
      if ((e.target as Element)?.closest?.(SEL)) ring.classList.add("is-active");
    };
    const onOut = (e: Event) => {
      if ((e.target as Element)?.closest?.(SEL)) ring.classList.remove("is-active");
    };
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      gsap.ticker.remove(onTick);
      root.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div id="cursor-ring" />
      <div id="cursor-dot" />
    </>
  );
}

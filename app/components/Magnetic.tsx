"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";

/**
 * Wraps a child so it's magnetically pulled toward the cursor while hovered,
 * springing back on leave. Used on primary CTAs.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * (strength + 0.15),
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    if (ref.current) {
      gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
    }
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

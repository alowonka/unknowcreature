import { getDictionary } from "@/app/i18n";

export default function Stats() {
  const items = getDictionary().stats.items;
  return (
    <section className="relative border-b border-white/5 py-12 md:py-16">
      <div className="mx-auto max-w-8xl px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-y-10">
        {items.map((raw, i) => {
          const s = raw as { value: string; valueSuffix?: string; label: string };
          return (
            <div
              key={i}
              className={`reveal text-center ${i < items.length - 1 ? "md:border-r border-white/5" : ""}`}
            >
              <div className="font-display text-4xl md:text-6xl font-black text-gradient leading-none">
                {s.value}
                {s.valueSuffix ? <span className="text-blood">{s.valueSuffix}</span> : null}
              </div>
              <p className="mt-3 font-mono text-[11px] tracking-[0.2em] uppercase text-ash">
                {s.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

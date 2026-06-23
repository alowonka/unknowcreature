import { Fragment } from "react";
import { getDictionary } from "@/app/i18n";

function Row({ items, hidden = false }: { items: string[]; hidden?: boolean }) {
  return (
    <span
      aria-hidden={hidden || undefined}
      className="flex items-center gap-10 text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-ash-2"
    >
      {items.map((item) => (
        <Fragment key={item}>
          <span>{item}</span>
          <span className="text-blood">&#9670;</span>
        </Fragment>
      ))}
    </span>
  );
}

export default function Marquee() {
  const items = getDictionary().marquee.items;
  return (
    <section className="marquee relative border-y border-white/5 bg-ink-2/40 py-6 overflow-hidden">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {/* duplicado para loop sin costuras */}
        <Row items={items} />
        <Row items={items} hidden />
      </div>
    </section>
  );
}

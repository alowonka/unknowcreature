import { getDictionary } from "@/app/i18n";

const smallCardImages = ["/craft/characters.jpg", "/craft/animation.jpg", "/craft/engineering.jpg"];

export default function WhatWeDo() {
  const t = getDictionary().whatWeDo;
  return (
    <section id="craft" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <div className="max-w-3xl mb-14 reveal">
          <h2
            className="font-display font-black uppercase leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}
          >
            {t.headingLineOne}
            <br />
            <span className="text-gradient">{t.headingHighlight}</span>
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-6 auto-rows-[minmax(0,1fr)] gap-4"
          style={{ gridAutoFlow: "dense" }}
        >
          {/* big card: original games */}
          <article className="reveal group md:col-span-3 relative overflow-hidden rounded-3xl border border-white/5 bg-ink-2 min-h-[340px] p-8 flex flex-col justify-end">
            <div
              className="absolute inset-0 opacity-30 group-hover:opacity-45 transition-opacity duration-700"
              style={{ background: "url('/team/team-07.jpg') center/cover", filter: "saturate(.7) contrast(1.05)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-blood mb-3">
                {t.originalGames.eyebrow}
              </p>
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">
                {t.originalGames.title}
              </h3>
              <p className="text-ash max-w-md leading-relaxed">{t.originalGames.text}</p>
            </div>
          </article>

          {/* edu games: video */}
          <article className="reveal group md:col-span-3 relative overflow-hidden rounded-3xl border border-white/5 bg-ink-2 min-h-[340px] p-8 flex flex-col justify-end">
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-700"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/craft/educational.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-grape mb-3">
                {t.educationalGames.eyebrow}
              </p>
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">
                {t.educationalGames.title}
              </h3>
              <p className="text-ash max-w-md leading-relaxed">{t.educationalGames.text}</p>
            </div>
          </article>

          {/* small cards: characters / animation / engineering */}
          {t.smallCards.map((c, i) => (
            <article
              key={i}
              className="reveal group md:col-span-2 relative overflow-hidden rounded-3xl border border-white/5 bg-ink-3 min-h-[260px] p-7 flex flex-col justify-end"
            >
              <div
                className="absolute inset-0 opacity-45 group-hover:opacity-65 transition-opacity duration-700"
                style={{ background: `url('${smallCardImages[i]}') center/cover`, filter: "saturate(.9) contrast(1.05)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/20" />
              <div className="relative">
                <h3 className="font-display text-2xl font-bold mb-2">{c.title}</h3>
                <p className="text-ash text-sm leading-relaxed">{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

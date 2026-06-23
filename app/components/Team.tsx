import { getDictionary } from "@/app/i18n";

// Datos no-textuales (foto, color de rol) que se quedan en el componente,
// emparejados por índice con t.members del diccionario.
const memberMeta = [
  { img: "/team/team-02.jpg", roleColor: "text-blood" },
  { img: "/team/team-05.jpg", roleColor: "text-grape" },
  { img: "/team/team-09.jpg", roleColor: "text-grape" },
  { img: "/team/team-08.jpg", roleColor: "text-grape" },
  { img: "/team/team-06.jpg", roleColor: "text-grape" },
];

type Member = {
  role: string;
  name: string;
  title: string;
  bio?: string;
  bioPre?: string;
  bioHighlight?: string;
  bioPost?: string;
};

export default function Team() {
  const t = getDictionary().team;
  return (
    <section id="team" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14 reveal">
          <h2
            className="font-display font-black uppercase leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}
          >
            {t.headingLineOne}
            <br />
            <span className="text-gradient">{t.headingHighlight}</span>
          </h2>
          <p className="text-ash max-w-sm">{t.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.members.map((raw, i) => {
            const m = raw as Member;
            const meta = memberMeta[i];
            return (
              <article
                key={m.name}
                className="member group relative overflow-hidden rounded-3xl border border-white/5 bg-ink-2"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={meta.img} alt={m.name} className="h-full w-full object-cover object-top" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/85 to-transparent p-6 pt-16">
                  <span className={`font-mono text-[10px] tracking-[0.3em] uppercase ${meta.roleColor}`}>
                    {m.role}
                  </span>
                  <h3 className="font-display text-2xl font-bold mt-1">{m.name}</h3>
                  <p className="text-ash text-sm">{m.title}</p>
                  <div className="bio overflow-hidden">
                    <p className="text-ash text-sm leading-relaxed mt-3">
                      {m.bioHighlight ? (
                        <>
                          {m.bioPre} <span className="text-bone">{m.bioHighlight}</span>
                          {m.bioPost}
                        </>
                      ) : (
                        m.bio
                      )}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}

          {/* 6th cell: careers CTA */}
          <article className="relative overflow-hidden rounded-3xl border border-blood/30 bg-ink-2 flex flex-col items-center justify-center text-center gap-6 p-8 min-h-[300px]">
            <div className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-brand opacity-25 blur-3xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-vertical.png"
              alt={t.careers.logoAlt}
              className="relative h-40 md:h-44 w-auto"
            />
            <div className="relative">
              <h3 className="font-display text-2xl font-bold leading-tight">{t.careers.title}</h3>
              <a
                href="#notify"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blood-bright link-underline"
              >
                {t.careers.cta} <span>&rarr;</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

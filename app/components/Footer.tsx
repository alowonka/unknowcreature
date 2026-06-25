import { getDictionary } from "@/app/i18n";

const exploreHrefs = ["#studio", "#craft", "#team", "#game"];
const followHrefs = [
  "https://www.instagram.com/unknowncreaturegames/",
  "https://www.facebook.com/unknowncreaturegames",
];

export default function Footer() {
  const t = getDictionary().footer;
  return (
    <footer className="relative border-t border-white/5 pt-20 pb-10">
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-12 pb-16">
          <div className="max-w-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-horizontal.png"
              alt={t.logoAlt}
              className="h-16 md:h-20 w-auto mb-6"
            />
            <p className="text-ash leading-relaxed">{t.tagline}</p>
            <a
              href="mailto:hello@unknowncreaturegames.com"
              className="mt-6 block w-fit font-display text-lg md:text-xl text-bone link-underline"
            >
              {t.email}
            </a>
            <a
              href="tel:+12818465669"
              className="mt-2 block w-fit font-display text-base md:text-lg text-ash hover:text-bone transition-colors link-underline"
            >
              {t.phone}
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-ash-2 mb-4">
                {t.exploreHeading}
              </p>
              <ul className="space-y-3 text-ash">
                {t.exploreLinks.map((l, i) => (
                  <li key={exploreHrefs[i]}>
                    <a
                      href={exploreHrefs[i]}
                      className="hover:text-bone transition-colors link-underline"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-ash-2 mb-4">
                {t.followHeading}
              </p>
              <ul className="space-y-3 text-ash">
                {t.followLinks.map((l, i) => (
                  <li key={followHrefs[i]}>
                    <a
                      href={followHrefs[i]}
                      target="_blank"
                      rel="noopener"
                      className="hover:text-bone transition-colors link-underline"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-ash-2 mb-4">
                {t.studiosHeading}
              </p>
              <ul className="space-y-3 text-ash">
                {t.studios.map((s, i) => (
                  <li key={i}>
                    {s.city} <span className="text-ash-2">{s.country}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8 text-ash-2 text-sm">
          <p>{t.copyright}</p>
          <p className="font-mono text-[11px] tracking-widest uppercase">{t.signature}</p>
        </div>
      </div>
    </footer>
  );
}

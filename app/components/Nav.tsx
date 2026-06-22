import Magnetic from "./Magnetic";

const links = [
  { href: "#studio", label: "Studio" },
  { href: "#craft", label: "What we do" },
  { href: "#team", label: "Team" },
  { href: "#game", label: "The Game" },
];

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-8xl px-5 md:px-8 py-4">
        <nav className="flex items-center justify-between rounded-full border border-white/5 bg-ink-2/50 backdrop-blur-xl px-4 md:px-6 py-3">
          <a href="#top" className="flex items-center gap-3 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-horizontal.png"
              alt="Unknown Creature Games"
              className="h-10 md:h-12 w-auto"
            />
          </a>
          <div className="hidden lg:flex items-center gap-9 text-sm text-ash">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-underline hover:text-bone transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
          <Magnetic>
            <a
              href="#notify"
              className="group flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white"
            >
              Get notified
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </Magnetic>
        </nav>
      </div>
    </header>
  );
}

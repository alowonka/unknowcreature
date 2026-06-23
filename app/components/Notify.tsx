"use client";

import { useState } from "react";
import Magnetic from "./Magnetic";
import { getDictionary, DEFAULT_LOCALE } from "@/app/i18n";

type Status = "idle" | "loading" | "ok" | "error";

/**
 * Notify: captura de email → POST a /api/notify (inserta en Supabase server-side).
 */
export default function Notify() {
  const t = getDictionary().notify;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, locale: DEFAULT_LOCALE }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const loading = status === "loading";

  return (
    <section id="notify" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2
          className="font-display font-black uppercase leading-[0.92] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2.6rem,7vw,6rem)" }}
        >
          {t.headingLineOne}
          <br />
          {t.headingLineTwo} <span className="text-gradient">{t.headingHighlight}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-ash text-lg">{t.description}</p>
        <form onSubmit={onSubmit} className="mx-auto mt-10 flex flex-col sm:flex-row gap-3 max-w-xl">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder={t.placeholder}
            className="flex-1 rounded-full border border-white/10 bg-ink-2 px-6 py-4 text-bone placeholder:text-ash-2 focus:outline-none focus:border-blood transition-colors disabled:opacity-60"
          />
          <Magnetic>
            <button
              disabled={loading}
              className="rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white whitespace-nowrap glow-blood disabled:opacity-70"
            >
              {loading ? t.submitLoading : t.submitIdle}
            </button>
          </Magnetic>
        </form>
        {status === "ok" && (
          <p className="mt-4 text-sm text-blood-bright">
            {t.successPre} {t.successEmail}
            {t.successPost}
          </p>
        )}
        {status === "error" && <p className="mt-4 text-sm text-blood">{t.error}</p>}
        <p className="mt-4 font-mono text-[11px] tracking-widest uppercase text-ash-2">
          {t.languageNote}
        </p>
      </div>
    </section>
  );
}

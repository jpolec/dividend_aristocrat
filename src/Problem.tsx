import { useT } from "./i18n";

export function Problem() {
  const { t } = useT();
  return (
    <section id="problem" className="py-20 sm:py-24" style={{ background: "var(--aris-paper)" }}>
      <div className="mx-auto max-w-[1240px] px-5 sm:px-7">
        <div className="max-w-3xl mb-12">
          <div className="eyebrow">{t.problemEyebrow}</div>
          <h2 className="font-serif-display text-[30px] sm:text-[40px] lg:text-[46px] text-[var(--aris-ink)] my-4">
            {t.problemTitle}
          </h2>
          <p className="text-[17px] text-[var(--aris-muted)] leading-relaxed max-w-2xl">
            {t.problemIntro}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.problemCards.map((c, i) => (
            <div
              key={i}
              className="rounded-md px-6 py-7 transition-all hover:-translate-y-1 hover:shadow-[0_22px_50px_-28px_rgba(12,18,14,.25)]"
              style={{ background: "var(--aris-offwhite)", border: "1px solid var(--aris-line-dark)" }}
            >
              <div className="font-mono-mark text-[12px] text-[var(--aris-gold)] tracking-wider">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-serif-display text-[21px] text-[var(--aris-ink)] mt-3 mb-2">{c.title}</h3>
              <p className="text-[14.5px] text-[var(--aris-muted)] leading-[1.55]">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Bridge callout */}
        <div
          className="mt-12 rounded-lg px-8 py-6 flex items-center gap-5 flex-wrap text-[var(--aris-paper)]"
          style={{ background: "var(--aris-green-950)" }}
        >
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10 shrink-0 text-[var(--aris-gold)]">
            <circle cx="24" cy="24" r="20" />
            <path d="M24 14v20M14 24h20" strokeLinecap="round" />
          </svg>
          <p className="font-serif-display text-[18px] sm:text-[19px] text-[var(--aris-paper)]/88 leading-[1.4] flex-1 min-w-[280px]">
            {t.problemBridge}
          </p>
        </div>
      </div>
    </section>
  );
}

import { useT } from "./i18n";
import { useInView } from "./useInView";

const TERMINAL_BARS: { k: string; v: string; w: number; pass?: boolean }[] = [
  { k: "Dividend streak", v: "23 yrs", w: 88 },
  { k: "FCF payout coverage", v: "1.9×", w: 76 },
  { k: "Net debt / EBITDA", v: "1.4×", w: 82 },
  { k: "Earnings stability", v: "High", w: 91 },
  { k: "Valuation context", v: "Fair", w: 64 },
  { k: "Composite quality", v: "A · 84/100", w: 84, pass: true },
];

export function HowWeFilter() {
  const { t } = useT();
  const terminal = useInView<HTMLDivElement>();
  return (
    <section id="method" className="py-14 sm:py-20 lg:py-24" style={{ background: "var(--aris-paper-2)" }}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
        <div className="max-w-3xl mb-12">
          <div className="eyebrow">{t.howWeFilterTitle === "How we filter" ? "Our Methodology" : "Methodology"}</div>
          <h2 className="font-serif-display text-[24px] sm:text-[32px] md:text-[40px] lg:text-[46px] text-[var(--aris-ink)] my-4">
            {t.howWeFilterTitle}
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[var(--aris-muted)] leading-relaxed max-w-2xl">
            {t.howWeFilterIntro}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Steps list */}
          <div className="flex flex-col">
            {t.howWeFilterMetrics.map((m, i) => (
              <div
                key={i}
                className="flex gap-5 py-4 sm:py-5 border-b border-[var(--aris-line)] hover:ps-2 transition-all"
              >
                <div className="font-mono-mark text-[13px] text-[var(--aris-gold)] shrink-0 pt-1 w-8">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-serif-display text-[18px] text-[var(--aris-ink)] mb-1">{m.label}</h3>
                  <p className="text-[13.5px] text-[var(--aris-muted)] leading-[1.5]">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal widget */}
          <div
            ref={terminal.ref}
            className={`aris-fade aris-d2 ${terminal.inView ? "in" : ""} rounded-lg overflow-hidden`}
            style={{
              background: "#06120c",
              border: "1px solid var(--aris-line)",
              boxShadow: "0 40px 90px -50px #000",
            }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--aris-line)] bg-[var(--aris-green-900)]/50">
              <i className="h-2 w-2 rounded-full bg-[#2a3b32] block" />
              <i className="h-2 w-2 rounded-full bg-[#2a3b32] block" />
              <i className="h-2 w-2 rounded-full bg-[#2a3b32] block" />
              <span className="font-mono-mark text-[11px] tracking-[0.15em] ms-2 text-[var(--aris-muted-light)]">
                QUALITY SCREEN — LIVE
              </span>
            </div>
            <div className="px-5 py-6">
              {TERMINAL_BARS.map((row, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-2.5 font-mono-mark text-[12.5px] ${
                    i < TERMINAL_BARS.length - 1 ? "border-b border-[rgba(198,166,103,.1)]" : ""
                  }`}
                >
                  <span className="text-[var(--aris-paper)]/60">{row.k}</span>
                  <span className={`flex items-center gap-2.5 ${row.pass ? "text-[var(--aris-emerald-bright)]" : "text-[var(--aris-paper)]"}`}>
                    {row.v}
                    {!row.pass && (
                      <div className="w-[88px] h-[5px] bg-white/8 rounded overflow-hidden">
                        <div className="aris-bar-fill" style={{ ["--w" as string]: `${row.w}%` }} />
                      </div>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-md border border-amber-500/30 bg-amber-50 px-4 py-3 max-w-3xl">
          <p className="text-sm text-amber-900 leading-snug">
            <span className="text-amber-700 font-semibold">●&nbsp;</span>
            {t.howWeFilterStat}
          </p>
        </div>
      </div>
    </section>
  );
}

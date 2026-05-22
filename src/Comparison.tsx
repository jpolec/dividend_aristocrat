import { useT } from "./i18n";

export function Comparison() {
  const { t } = useT();
  return (
    <section className="py-14 sm:py-20 lg:py-24 text-[var(--aris-paper)]" style={{ background: "var(--aris-green-950)" }}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="eyebrow">Complementary, Not Competing</div>
          <h2 className="font-serif-display text-[24px] sm:text-[32px] md:text-[40px] lg:text-[46px] text-[var(--aris-paper)] my-4">
            {t.comparisonTitle}
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[var(--aris-paper)]/60 mx-auto max-w-2xl leading-relaxed">
            {t.comparisonIntro}
          </p>
        </div>

        <div className="rounded-xl overflow-hidden border border-[var(--aris-line)] grid md:grid-cols-2">
          {/* Left: real estate concentration */}
          <div className="py-2">
            <div className="px-7 py-6 font-serif-display text-[22px] text-[var(--aris-paper)]/70 border-b border-[var(--aris-line)]">
              {t.comparisonLeft}
            </div>
            {t.comparisonRows.map((row, i) => (
              <div
                key={i}
                className={`px-7 py-4 text-[14.5px] text-[var(--aris-paper)]/55 flex items-center gap-3 ${
                  i < t.comparisonRows.length - 1 ? "border-b border-[rgba(198,166,103,.08)]" : ""
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0 text-[var(--aris-muted-light)]">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </svg>
                <span>{row.left}</span>
              </div>
            ))}
          </div>

          {/* Right: dividend diversification */}
          <div className="py-2 md:border-s border-[var(--aris-line)]" style={{ background: "rgba(15,40,29,.4)" }}>
            <div className="px-7 py-6 font-serif-display text-[22px] text-[var(--aris-gold-soft)] border-b border-[var(--aris-line)]">
              {t.comparisonRight}
            </div>
            {t.comparisonRows.map((row, i) => (
              <div
                key={i}
                className={`px-7 py-4 text-[14.5px] text-[var(--aris-paper)] flex items-center gap-3 ${
                  i < t.comparisonRows.length - 1 ? "border-b border-[rgba(198,166,103,.08)]" : ""
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0 text-[var(--aris-emerald-bright)]">
                  <path d="M5 12l4 4L19 6" />
                </svg>
                <span>{row.right}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center mt-8 text-[13px] text-[var(--aris-paper)]/50 italic max-w-2xl mx-auto leading-relaxed">
          {t.comparisonNote}
        </p>
      </div>
    </section>
  );
}

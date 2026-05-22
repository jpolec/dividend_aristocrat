import { useT } from "./i18n";

export function ShariaSection() {
  const { t } = useT();
  return (
    <section id="sharia" className="py-14 sm:py-20 lg:py-24" style={{ background: "var(--aris-paper-2)" }}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-7 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <div className="eyebrow">Halal-Aware Filtering</div>
          <h2 className="font-serif-display text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-[var(--aris-ink)] my-4">
            {t.shariaTitle}
          </h2>
          <p className="text-[16px] text-[var(--aris-muted)] leading-relaxed">{t.shariaIntro}</p>

          <div className="flex flex-wrap gap-3 mt-6">
            {t.shariaBullets.map((b, i) => (
              <span
                key={i}
                className="flex items-center gap-2.5 bg-[var(--aris-offwhite)] border border-[var(--aris-line-dark)] rounded-full px-4 py-2.5 text-[13.5px] font-medium text-[var(--aris-ink)]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-[var(--aris-emerald)] shrink-0">
                  <path d="M5 12l4 4L19 6" />
                </svg>
                {b.split(":")[0]}
              </span>
            ))}
          </div>

          <div
            className="mt-6 px-5 py-4 text-[13.5px] text-[var(--aris-muted)] rounded-r-md"
            style={{ borderInlineStart: "3px solid var(--aris-gold)", background: "var(--aris-paper)" }}
          >
            {t.shariaDisclaimer}
          </div>
        </div>

        {/* Donut */}
        <div className="flex justify-center">
          <svg viewBox="0 0 280 280" className="w-full max-w-[300px]">
            <circle cx="140" cy="140" r="120" fill="none" stroke="var(--aris-line-dark)" strokeWidth="1" />
            <circle cx="140" cy="140" r="90" fill="none" stroke="var(--aris-line-dark)" strokeWidth="1" />
            <circle
              cx="140"
              cy="140"
              r="118"
              fill="none"
              stroke="var(--aris-emerald)"
              strokeWidth="3"
              strokeDasharray="520 740"
              strokeLinecap="round"
              transform="rotate(-90 140 140)"
              opacity=".8"
            />
            <text x="140" y="128" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="40" fill="var(--aris-ink)">~70%</text>
            <text x="140" y="156" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--aris-muted)" letterSpacing="2">PASS SCREEN</text>
            <text x="140" y="174" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--aris-muted)">ILLUSTRATIVE</text>
          </svg>
        </div>
      </div>
    </section>
  );
}

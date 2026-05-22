import { useT } from "./i18n";
import { useInView } from "./useInView";

export function Hero() {
  const { t } = useT();
  const visual = useInView<HTMLDivElement>();
  return (
    <section
      className="relative overflow-hidden text-[var(--aris-paper)]"
      style={{
        background: `
          radial-gradient(120% 80% at 80% 0%, rgba(36,154,100,.13), transparent 55%),
          radial-gradient(90% 70% at 0% 100%, rgba(198,166,103,.08), transparent 50%),
          linear-gradient(160deg, var(--aris-green-950), var(--aris-green-900) 55%, var(--aris-charcoal))
        `,
      }}
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-7 pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 grid lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-16 items-center">
        <div className="min-w-0">
          <div className="eyebrow">Premium Income Research · GCC</div>
          <h1 className="font-serif-display text-[28px] sm:text-[40px] md:text-[52px] lg:text-[60px] xl:text-[72px] text-[var(--aris-paper)] my-4 sm:my-5">
            {t.heroHeadline.split(" — ")[0]}
            {t.heroHeadline.includes(" — ") && (
              <>
                <span className="inline-block"> </span>
                <em className="not-italic">— </em>
                <em className="italic text-[var(--aris-gold-soft)]">{t.heroHeadline.split(" — ").slice(1).join(" — ")}</em>
              </>
            )}
          </h1>
          <p className="text-[15px] sm:text-[18px] md:text-[19px] text-[var(--aris-paper)]/70 leading-[1.55] max-w-xl">
            {t.heroSubheadline}
          </p>
          <div className="mt-7 sm:mt-9 flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-3.5">
            <a
              href="#sample"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[var(--aris-gold)] hover:bg-[var(--aris-gold-soft)] text-[var(--aris-green-950)] px-5 sm:px-6 py-3 sm:py-3.5 text-[13px] sm:text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(198,166,103,.5)]"
            >
              {t.heroCtaSecondary} →
            </a>
            <a
              href="#method"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-[var(--aris-paper)]/30 hover:border-[var(--aris-gold)] hover:text-[var(--aris-gold)] text-[var(--aris-paper)] px-5 sm:px-6 py-3 sm:py-3.5 text-[13px] sm:text-sm font-semibold transition"
            >
              {t.pricingCta}
            </a>
          </div>
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-x-5 sm:gap-x-7 gap-y-2.5">
            {t.trustBar.map(item => (
              <div key={item} className="flex items-center gap-2 text-[12px] sm:text-[13px] text-[var(--aris-paper)]/60">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-[var(--aris-gold)] shrink-0">
                  <path d="M5 12l4 4L19 6" />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual: animated dividend growth card */}
        <div
          ref={visual.ref}
          className={`aris-fade aris-d2 ${visual.inView ? "in" : ""} rounded-lg p-4 sm:p-6 lg:p-7 relative min-w-0`}
          style={{
            background: "linear-gradient(165deg, rgba(15,40,29,.9), rgba(8,22,15,.7))",
            border: "1px solid var(--aris-line)",
            boxShadow: "0 40px 90px -40px rgba(0,0,0,.7)",
          }}
        >
          <div className="flex items-start justify-between mb-2 gap-2">
            <div className="min-w-0">
              <div className="font-mono-mark text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[var(--aris-muted-light)] truncate">
                Illustrative dividend income
              </div>
              <div className="font-serif-display text-[22px] sm:text-[28px] text-[var(--aris-paper)] mt-1">Compounding</div>
            </div>
            <div className="font-mono-mark text-[10px] sm:text-[11px] text-[var(--aris-emerald-bright)] bg-emerald-500/10 border border-emerald-500/25 px-2 py-1 rounded-sm shrink-0">
              Educational
            </div>
          </div>

          <svg viewBox="0 0 480 220" className="w-full h-auto block mt-2">
            <defs>
              <linearGradient id="aris-goldgrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c6a667" stopOpacity=".35" />
                <stop offset="100%" stopColor="#c6a667" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g stroke="rgba(255,255,255,.06)" strokeWidth="1">
              <line x1="0" y1="50" x2="480" y2="50" />
              <line x1="0" y1="100" x2="480" y2="100" />
              <line x1="0" y1="150" x2="480" y2="150" />
              <line x1="0" y1="200" x2="480" y2="200" />
            </g>
            <path className="aris-spark-area" d="M0,190 C60,185 90,170 140,150 C190,130 220,120 270,95 C320,70 350,55 400,38 C430,28 460,22 480,18 L480,210 L0,210 Z" />
            <path className="aris-spark-line" d="M0,190 C60,185 90,170 140,150 C190,130 220,120 270,95 C320,70 350,55 400,38 C430,28 460,22 480,18" />
            <circle className="aris-dot" cx="480" cy="18" r="4.5" fill="#c6a667" />
            <circle className="aris-dot" cx="480" cy="18" r="9" fill="#c6a667" opacity=".2" />
          </svg>

          <div className="flex justify-between font-mono-mark text-[10px] text-[var(--aris-muted-light)] mt-2.5 tracking-wider">
            <span>Y1</span><span>Y5</span><span>Y10</span><span>Y15</span><span>Y20</span>
          </div>

          <p className="text-[10.5px] text-[var(--aris-muted-light)] mt-4 italic leading-[1.4]">
            Illustration of how reinvested dividends may compound over time. For educational purposes only. Not a forecast, projection, or guarantee of future results.
          </p>
        </div>
      </div>

      {/* Trust strip across full width */}
      <div className="relative border-t border-[var(--aris-line)] py-5">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7 flex flex-wrap justify-center items-center gap-y-2 gap-x-5 sm:gap-x-10">
          {t.trustStripPoints.map(p => (
            <span key={p} className="flex items-center gap-2 text-[11.5px] sm:text-[12.5px] text-[var(--aris-paper)]/62 font-medium">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-[var(--aris-gold)] shrink-0">
                <path d="M5 12l4 4L19 6" />
              </svg>
              {p}
            </span>
          ))}
        </div>
        <div className="mt-3 text-center text-[11px] sm:text-[12px] text-[var(--aris-paper)]/55 px-4">
          🇸🇦 🇦🇪 🇶🇦 🇰🇼 🇧🇭 🇪🇬 &nbsp;<span className="break-words">{t.trustStripCountries}</span>
        </div>
      </div>
    </section>
  );
}

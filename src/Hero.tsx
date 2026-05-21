import { useT } from "./i18n";

export function Hero() {
  const { t } = useT();
  return (
    <section className="relative overflow-hidden rounded-2xl border border-amber-200/60 bg-gradient-to-br from-emerald-50 via-amber-50/50 to-emerald-50 px-5 py-10 sm:px-8 sm:py-14 md:px-12 md:py-16">
      <div className="pointer-events-none absolute -top-24 -end-24 h-64 sm:h-80 w-64 sm:w-80 rounded-full bg-amber-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -start-24 h-64 sm:h-80 w-64 sm:w-80 rounded-full bg-emerald-400/20 blur-3xl" />

      <div className="relative max-w-3xl">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight tracking-tight text-emerald-950">
          {t.heroHeadline}
        </h2>
        <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-slate-700">
          {t.heroSubheadline}
        </p>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base font-medium text-amber-700">
          {t.pricingLine}
        </p>
        <div className="mt-5 sm:mt-7 flex flex-wrap gap-3">
          <a
            href="#subscribe"
            className="inline-flex items-center rounded-md bg-emerald-700 text-white px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-semibold hover:bg-emerald-800 transition shadow-sm"
          >
            {t.pricingCta} →
          </a>
          <a
            href="#picks"
            className="inline-flex items-center rounded-md border border-amber-400 bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-medium text-amber-800 hover:bg-amber-50 transition"
          >
            {t.heroCtaSecondary}
          </a>
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative mt-8 sm:mt-10 border-t border-amber-200/70 pt-5">
        <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">
          {t.trustStripLabel}
        </div>
        <div className="mt-1 text-sm sm:text-base font-medium text-slate-800">
          🇸🇦 🇦🇪 🇶🇦 🇰🇼 🇪🇬 &nbsp;{t.trustStripCountries}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
          {t.trustStripPoints.map(p => (
            <li key={p} className="flex items-center gap-1">
              <span className="text-amber-600">✓</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

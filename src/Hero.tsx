import { useT } from "./i18n";

// Premium institutional hero: split layout on desktop (text + abstract chart art)
export function Hero() {
  const { t } = useT();
  return (
    <section className="relative overflow-hidden rounded-2xl border border-stone-200 bg-gradient-to-br from-stone-50 via-white to-emerald-50/40 px-5 py-10 sm:px-8 sm:py-14 md:px-12 md:py-16">
      <div className="pointer-events-none absolute -top-32 -end-32 h-80 w-80 rounded-full bg-amber-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -start-32 h-80 w-80 rounded-full bg-emerald-700/10 blur-3xl" />

      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* Left: copy */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            GCC Investment Research
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-emerald-950">
            {t.heroHeadline}
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
            {t.heroSubheadline}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#picks"
              className="inline-flex items-center rounded-md bg-emerald-900 text-white px-5 py-3 text-sm font-semibold hover:bg-emerald-950 transition shadow-sm"
            >
              {t.pricingCta} →
            </a>
            <a
              href="#methodology"
              className="inline-flex items-center rounded-md border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 hover:border-amber-400 hover:bg-amber-50/50 transition"
            >
              {t.heroCtaSecondary}
            </a>
          </div>

          <p className="mt-4 text-xs text-slate-500">{t.pricingLine}</p>

          {/* Trust bar (payment + commitment) */}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600">
            {t.trustBar.map(item => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <span className="text-amber-600">✓</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right: chart art — abstract dividend growth visual */}
        <div className="relative hidden lg:block">
          <ChartArt />
        </div>
      </div>

      {/* Geographic trust strip */}
      <div className="relative mt-10 border-t border-stone-200/80 pt-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          {t.trustStripLabel}
        </div>
        <div className="mt-1.5 text-sm sm:text-base font-medium text-slate-800">
          🇸🇦 🇦🇪 🇶🇦 🇰🇼 🇧🇭 🇪🇬 &nbsp;{t.trustStripCountries}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-600">
          {t.trustStripPoints.map(p => (
            <li key={p} className="flex items-center gap-1.5">
              <span className="text-emerald-700">●</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Abstract dividend-growth chart art — pure SVG, no interactivity
function ChartArt() {
  // Hand-picked points to look like a smooth compounding curve
  const W = 480;
  const H = 360;
  const points = [
    [0, 320], [60, 305], [120, 285], [180, 255], [240, 218],
    [300, 175], [360, 130], [420, 85], [480, 50],
  ] as const;
  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const area = `${path} L ${W} ${H} L 0 ${H} Z`;

  // Bars below (dividend payments visualization)
  const bars = Array.from({ length: 20 }, (_, i) => {
    const x = (i / 20) * W + 6;
    const h = 8 + i * 1.5; // growing
    return { x, h };
  });

  return (
    <div className="relative aspect-[4/3] w-full rounded-2xl bg-white border border-stone-200 shadow-md p-4 sm:p-5 overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between text-xs">
        <div>
          <div className="font-semibold text-slate-700">Sample dividend growth</div>
          <div className="text-slate-400">Illustrative · long horizon</div>
        </div>
        <div className="px-2 py-1 rounded bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-200">
          +CAGR
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full h-auto block">
        <defs>
          <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#047857" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* grid */}
        {[0.25, 0.5, 0.75].map(f => (
          <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="#f1f5f9" strokeWidth="1" />
        ))}
        {/* bars */}
        {bars.map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={H - 20 - b.h}
            width="14"
            height={b.h}
            rx="1.5"
            fill="#fbbf24"
            opacity="0.55"
          />
        ))}
        {/* area + line */}
        <path d={area} fill="url(#heroFill)" />
        <path d={path} fill="none" stroke="#047857" strokeWidth="2.5" />
        {/* end dot */}
        <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="5" fill="#047857" stroke="white" strokeWidth="2" />
      </svg>

      {/* Mini KPIs */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-md bg-stone-50 border border-stone-200 py-1.5">
          <div className="text-[10px] text-slate-500">Avg yield</div>
          <div className="text-sm font-semibold text-emerald-800 tabular-nums">3.4%</div>
        </div>
        <div className="rounded-md bg-stone-50 border border-stone-200 py-1.5">
          <div className="text-[10px] text-slate-500">5Y growth</div>
          <div className="text-sm font-semibold text-emerald-800 tabular-nums">+6.8%</div>
        </div>
        <div className="rounded-md bg-stone-50 border border-stone-200 py-1.5">
          <div className="text-[10px] text-slate-500">Names</div>
          <div className="text-sm font-semibold text-emerald-800 tabular-nums">~50</div>
        </div>
      </div>
    </div>
  );
}

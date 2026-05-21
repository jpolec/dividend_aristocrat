import { useT, type Testimonial } from "./i18n";

const COUNTRY_FLAG: Record<string, string> = {
  AE: "🇦🇪",
  SA: "🇸🇦",
  QA: "🇶🇦",
  KW: "🇰🇼",
  EG: "🇪🇬",
};

const AVATAR_PALETTE: { bg: string; ring: string }[] = [
  { bg: "bg-emerald-100 text-emerald-800", ring: "ring-emerald-200" },
  { bg: "bg-amber-100 text-amber-800", ring: "ring-amber-200" },
  { bg: "bg-sky-100 text-sky-800", ring: "ring-sky-200" },
  { bg: "bg-rose-100 text-rose-800", ring: "ring-rose-200" },
  { bg: "bg-violet-100 text-violet-800", ring: "ring-violet-200" },
];

function Avatar({ author, idx }: { author: string; idx: number }) {
  // Take first letters of each word, max 2
  const initials = author
    .split(/\s+/)
    .map(w => w[0]?.toUpperCase())
    .filter(Boolean)
    .slice(0, 2)
    .join("");
  const palette = AVATAR_PALETTE[idx % AVATAR_PALETTE.length];
  return (
    <div
      className={`flex items-center justify-center h-10 w-10 rounded-full font-semibold text-sm shrink-0 ${palette.bg} ring-2 ${palette.ring}`}
    >
      {initials}
    </div>
  );
}

function TestimonialCard({ tt, idx }: { tt: Testimonial; idx: number }) {
  return (
    <figure className="rounded-xl border bg-white/80 backdrop-blur px-4 sm:px-5 py-3 sm:py-4 shadow-sm">
      <blockquote className="text-sm md:text-base leading-relaxed text-slate-800">
        <span className="text-emerald-600 me-1">&ldquo;</span>
        {tt.quote}
        <span className="text-emerald-600 ms-1">&rdquo;</span>
      </blockquote>
      <figcaption className="mt-3 flex items-center gap-3">
        <Avatar author={tt.author} idx={idx} />
        <div className="text-xs">
          <div className="font-medium text-slate-800">{tt.author}</div>
          <div className="text-slate-500">
            {tt.location} {COUNTRY_FLAG[tt.country] ?? ""}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

export function Hero() {
  const { t } = useT();
  return (
    <>
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-5 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16">
        <div className="pointer-events-none absolute -top-20 -end-20 h-56 sm:h-72 w-56 sm:w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -start-20 h-56 sm:h-72 w-56 sm:w-72 rounded-full bg-sky-400/20 blur-3xl" />

        <div className="relative max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight tracking-tight text-slate-900">
            {t.heroHeadline}
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-slate-600">
            {t.heroSubheadline}
          </p>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base font-medium text-emerald-700">
            {t.pricingLine}
          </p>
          <div className="mt-5 sm:mt-7 flex flex-wrap gap-3">
            <a
              href="#subscribe"
              className="inline-flex items-center rounded-md bg-emerald-600 text-white px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-semibold hover:bg-emerald-700 transition shadow-sm"
            >
              {t.pricingCta} →
            </a>
            <a
              href="#picks"
              className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              {t.heroCtaSecondary}
            </a>
          </div>
        </div>

        {/* Trust strip */}
        <div className="relative mt-8 sm:mt-10 border-t border-slate-200/70 pt-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {t.trustStripLabel}
          </div>
          <div className="mt-1 text-sm sm:text-base font-medium text-slate-800">
            🇸🇦 🇦🇪 🇶🇦 🇰🇼 🇪🇬 &nbsp;{t.trustStripCountries}
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
            {t.trustStripPoints.map(p => (
              <li key={p} className="flex items-center gap-1">
                <span className="text-emerald-600">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-slate-800">
          {t.testimonialsTitle}
        </h3>
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.testimonials.map((tt, i) => (
            <TestimonialCard key={i} tt={tt} idx={i} />
          ))}
        </div>
      </section>
    </>
  );
}

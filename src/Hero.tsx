import { useT } from "./i18n";

export function Hero() {
  const { t } = useT();
  return (
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
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-medium text-emerald-700">
          {t.pricingLine}
        </p>
        <a
          href="#subscribe"
          className="mt-5 sm:mt-7 inline-flex items-center rounded-md bg-emerald-600 text-white px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-medium hover:bg-emerald-700 transition"
        >
          {t.pricingCta} →
        </a>
      </div>

      <div className="relative mt-8 sm:mt-12 grid gap-3 sm:gap-4 sm:grid-cols-2">
        {t.testimonials.map((tt, i) => (
          <figure
            key={i}
            className="rounded-xl border bg-white/80 backdrop-blur px-4 sm:px-5 py-3 sm:py-4 shadow-sm"
          >
            <blockquote className="text-sm md:text-base leading-relaxed text-slate-800">
              <span className="text-emerald-600 me-1">&ldquo;</span>
              {tt.quote}
              <span className="text-emerald-600 ms-1">&rdquo;</span>
            </blockquote>
            <figcaption className="mt-2 sm:mt-3 text-xs text-slate-500">
              — <span className="font-medium text-slate-700">{tt.author}</span>, {tt.location}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

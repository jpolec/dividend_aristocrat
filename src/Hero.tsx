import { useT } from "./i18n";

export function Hero() {
  const { t } = useT();
  return (
    <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-emerald-50 via-white to-sky-50 dark:from-emerald-950/30 dark:via-background dark:to-sky-950/30 px-6 py-12 md:px-12 md:py-16">
      <div className="pointer-events-none absolute -top-20 -end-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -start-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />

      <div className="relative max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
          {t.heroHeadline}
        </h2>
        <p className="mt-5 text-lg md:text-xl text-muted-foreground">
          {t.heroSubheadline}
        </p>
        <a
          href="#subscribe"
          className="mt-7 inline-flex items-center rounded-md bg-emerald-600 text-white px-5 py-3 text-sm font-medium hover:bg-emerald-700 transition"
        >
          {t.subSubmit} →
        </a>
      </div>

      <div className="relative mt-12 grid gap-4 md:grid-cols-2">
        {t.testimonials.map((tt, i) => (
          <figure
            key={i}
            className="rounded-xl border bg-background/80 backdrop-blur px-5 py-4 shadow-sm"
          >
            <blockquote className="text-sm md:text-base leading-relaxed text-foreground">
              <span className="text-emerald-600 dark:text-emerald-400 me-1">&ldquo;</span>
              {tt.quote}
              <span className="text-emerald-600 dark:text-emerald-400 ms-1">&rdquo;</span>
            </blockquote>
            <figcaption className="mt-3 text-xs text-muted-foreground">
              — <span className="font-medium text-foreground">{tt.author}</span>, {tt.location}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

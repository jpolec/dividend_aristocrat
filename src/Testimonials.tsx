import { useT, type Testimonial } from "./i18n";

const COUNTRY_FLAG: Record<string, string> = {
  AE: "🇦🇪",
  SA: "🇸🇦",
  QA: "🇶🇦",
  KW: "🇰🇼",
  EG: "🇪🇬",
};

function TestimonialCard({ tt }: { tt: Testimonial }) {
  const initial = tt.author.charAt(0).toUpperCase();
  return (
    <figure
      className="rounded-lg p-7 transition-transform hover:-translate-y-1"
      style={{
        background: "rgba(15,40,29,.32)",
        border: "1px solid var(--aris-line)",
      }}
    >
      <blockquote className="font-serif-display text-[18px] sm:text-[19px] leading-[1.45] text-[var(--aris-paper)] mb-5">
        &ldquo;{tt.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-full flex items-center justify-center font-serif-display text-[16px] text-[var(--aris-green-950)] shrink-0"
          style={{ background: "linear-gradient(135deg, var(--aris-emerald), var(--aris-gold))" }}
        >
          {initial}
        </div>
        <div className="text-[13px]">
          <div className="font-semibold text-[var(--aris-paper)]">{tt.author}</div>
          <div className="text-[var(--aris-muted-light)] text-[12px]">
            {tt.location} {COUNTRY_FLAG[tt.country] ?? ""}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const { t } = useT();
  return (
    <section className="py-14 sm:py-20 lg:py-24 text-[var(--aris-paper)]" style={{ background: "var(--aris-charcoal)" }}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
        <div className="max-w-3xl mb-12">
          <div className="eyebrow">From Our Members</div>
          <h2 className="font-serif-display text-[24px] sm:text-[32px] md:text-[40px] lg:text-[46px] text-[var(--aris-paper)] my-4">
            {t.testimonialsTitle}
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.testimonials.slice(0, 3).map((tt, i) => (
            <TestimonialCard key={i} tt={tt} />
          ))}
        </div>
        <p className="text-center mt-8 text-[12px] text-[var(--aris-paper)]/40 italic">
          Member experiences reflect individual views on our research service and are not statements about investment performance or results.
        </p>
      </div>
    </section>
  );
}

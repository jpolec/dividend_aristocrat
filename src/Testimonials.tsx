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
  { bg: "bg-yellow-100 text-yellow-800", ring: "ring-yellow-200" },
  { bg: "bg-orange-100 text-orange-800", ring: "ring-orange-200" },
  { bg: "bg-teal-100 text-teal-800", ring: "ring-teal-200" },
];

function Avatar({ author, idx }: { author: string; idx: number }) {
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
    <figure className="rounded-xl border border-amber-100 bg-white px-4 sm:px-5 py-4 shadow-sm">
      <blockquote className="text-sm md:text-base leading-relaxed text-slate-800">
        <span className="text-amber-600 me-1 text-lg leading-none">&ldquo;</span>
        {tt.quote}
        <span className="text-amber-600 ms-1 text-lg leading-none">&rdquo;</span>
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

export function Testimonials() {
  const { t } = useT();
  return (
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
  );
}

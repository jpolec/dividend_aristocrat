import { GUIDE_COPY, GUIDE_COUNTRIES } from "./investorGuideData";
import { useT } from "./i18n";

export function InvestorGuidesStrip() {
  const { lang } = useT();
  const copy = GUIDE_COPY[lang];

  return (
    <section className="relative z-10 -mt-px py-7 sm:py-8" style={{ background: "var(--aris-green-950)" }}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
        <div
          className="rounded-lg px-4 sm:px-5 lg:px-6 py-5 sm:py-6"
          style={{
            background: "linear-gradient(135deg, rgba(15,40,29,.95), rgba(8,22,15,.86))",
            border: "1px solid var(--aris-line)",
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 mb-5">
            <div className="max-w-3xl">
              <div className="eyebrow">{copy.stripEyebrow}</div>
              <h2 className="font-serif-display text-[24px] sm:text-[30px] lg:text-[36px] text-[var(--aris-paper)] mt-2 mb-2">
                {copy.stripTitle}
              </h2>
              <p className="text-[13.5px] sm:text-[15px] leading-relaxed text-[var(--aris-paper)]/62">
                {copy.stripIntro}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-2.5 sm:gap-3">
            {GUIDE_COUNTRIES.map(country => (
              <a
                key={country.slug}
                href={`/investor-guides/${country.slug}`}
                className="group rounded-md px-3 py-3.5 min-h-[118px] flex flex-col justify-between transition hover:-translate-y-0.5"
                style={{
                  background: "rgba(246,243,234,.055)",
                  border: "1px solid rgba(198,166,103,.2)",
                }}
              >
                <span>
                  <span className="block text-[24px] leading-none mb-2" aria-hidden="true">
                    {country.flag}
                  </span>
                  <span className="block text-[14px] sm:text-[15px] font-semibold text-[var(--aris-paper)] group-hover:text-[var(--aris-gold)] transition">
                    {country.names[lang]}
                  </span>
                  <span className="mt-1.5 block text-[11.5px] leading-snug text-[var(--aris-paper)]/52">
                    {country.teaser[lang]}
                  </span>
                </span>
                <span className="mt-3 font-mono-mark text-[10px] uppercase tracking-wider text-[var(--aris-gold)]">
                  {copy.stripCta}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useT } from "./i18n";

const PILLAR_ICONS: React.ReactNode[] = [
  // dividend history — chart up
  <svg key="hist" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 18l5-6 4 3 5-7 4 4" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 21h18" /></svg>,
  // free cash flow — dollar
  <svg key="fcf" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2v20M7 6h7a3 3 0 010 6H8a3 3 0 000 6h8" strokeLinecap="round" /></svg>,
  // payout discipline — clock
  <svg key="pay" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" strokeLinecap="round" /></svg>,
  // balance sheet — building
  <svg key="bs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 21V8l8-5 8 5v13M4 21h16M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  // global — globe
  <svg key="glob" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" /></svg>,
];

export function WhyDividend() {
  const { t } = useT();
  return (
    <section id="why" className="py-20 sm:py-24 text-[var(--aris-paper)]" style={{ background: "var(--aris-green-950)" }}>
      <div className="mx-auto max-w-[1240px] px-5 sm:px-7">
        <div className="max-w-3xl mb-12">
          <div className="eyebrow">Why Dividend Companies</div>
          <h2 className="font-serif-display text-[30px] sm:text-[40px] lg:text-[46px] text-[var(--aris-paper)] my-4">
            {t.whyTitle}
          </h2>
          <p className="text-[17px] text-[var(--aris-paper)]/60 leading-relaxed max-w-2xl">
            {t.whyIntro}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {t.whyCards.map((card, i) => (
            <div
              key={i}
              className="rounded-md p-6 transition-all hover:-translate-y-1"
              style={{
                background: "rgba(15,40,29,.35)",
                border: "1px solid var(--aris-line)",
              }}
            >
              <div className="h-7 w-7 text-[var(--aris-gold)] mb-4">
                {PILLAR_ICONS[i]}
              </div>
              <h3 className="font-serif-display text-[18px] text-[var(--aris-paper)] mb-2">{card.title}</h3>
              <p className="text-[13px] text-[var(--aris-paper)]/58 leading-[1.5]">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

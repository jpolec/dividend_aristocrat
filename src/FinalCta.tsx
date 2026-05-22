import { useT } from "./i18n";

export function FinalCta() {
  const { t } = useT();
  return (
    <section
      className="py-24 sm:py-28 text-[var(--aris-paper)] text-center"
      style={{
        background: `
          radial-gradient(100% 90% at 50% 0%, rgba(36,154,100,.14), transparent 60%),
          linear-gradient(160deg, var(--aris-green-950), var(--aris-charcoal))
        `,
      }}
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
        <div className="eyebrow">{t.finalEyebrow}</div>
        <h2 className="font-serif-display text-[24px] sm:text-[34px] md:text-[46px] lg:text-[58px] text-[var(--aris-paper)] my-5">
          {t.finalTitle.split(" — ")[0]}
          {t.finalTitle.includes(" — ") && (
            <>
              {" — "}
              <em className="italic text-[var(--aris-gold-soft)]">
                {t.finalTitle.split(" — ").slice(1).join(" — ")}
              </em>
            </>
          )}
        </h2>
        <p className="text-[17px] text-[var(--aris-paper)]/65 max-w-xl mx-auto mb-9 leading-relaxed">
          {t.finalIntro}
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <a
            href="#pricing"
            className="inline-flex items-center rounded-sm bg-[var(--aris-gold)] hover:bg-[var(--aris-gold-soft)] text-[var(--aris-green-950)] px-6 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5"
          >
            {t.navStartCta}
          </a>
          <a
            href="#sample"
            className="inline-flex items-center rounded-sm border border-[var(--aris-paper)]/30 hover:border-[var(--aris-gold)] hover:text-[var(--aris-gold)] text-[var(--aris-paper)] px-6 py-3.5 text-sm font-semibold transition"
          >
            {t.heroCtaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}

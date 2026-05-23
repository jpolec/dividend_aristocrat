import { useT } from "./i18n";

export function RiskNotice() {
  const { t } = useT();
  return (
    <section
      className="py-7 sm:py-9"
      style={{ background: "linear-gradient(180deg, #f6eed8 0%, var(--aris-paper-2) 100%)" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
        <div className="rounded-lg border border-[rgba(198,166,103,.45)] bg-[rgba(198,166,103,.08)] px-4 py-4 sm:px-6 sm:py-5">
          <div className="font-mono-mark text-[10.5px] uppercase tracking-[0.18em] text-[var(--aris-gold)]">
            {t.disclaimerWarningTitle}
          </div>
          <h2 className="mt-2 font-serif-display text-[20px] sm:text-[25px] text-[var(--aris-ink)]">
            {t.riskNoticeTitle}
          </h2>
          <p className="mt-2 max-w-4xl text-[13.5px] sm:text-[14.5px] leading-relaxed text-[var(--aris-muted)]">
            {t.riskNoticeBody}
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-[12px]">
            <a href="/terms" className="font-semibold text-[var(--aris-emerald)] hover:text-[var(--aris-gold)]">Terms</a>
            <a href="/risk" className="font-semibold text-[var(--aris-emerald)] hover:text-[var(--aris-gold)]">Risk statement</a>
          </div>
        </div>
      </div>
    </section>
  );
}

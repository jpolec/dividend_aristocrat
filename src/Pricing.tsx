import { useEffect, useState } from "react";
import { useT, type Lang } from "./i18n";

type Currency = "usd" | "aed" | "sar" | "qar" | "pln";
type Tier = "monthly" | "annual";

const PRICES: Record<Currency, { monthly: string; annual: string; symbol: string; label: string }> = {
  aed: { monthly: "AED 19", annual: "AED 199", symbol: "AED", label: "🇦🇪 AED" },
  sar: { monthly: "SAR 19", annual: "SAR 199", symbol: "SAR", label: "🇸🇦 SAR" },
  qar: { monthly: "QAR 19", annual: "QAR 199", symbol: "QAR", label: "🇶🇦 QAR" },
  usd: { monthly: "$5", annual: "$50", symbol: "USD", label: "🇺🇸 USD" },
  pln: { monthly: "19 zł", annual: "199 zł", symbol: "PLN", label: "🇵🇱 PLN" },
};

// Default to a Gulf-friendly currency by language; users with explicit AR get AED.
function defaultCurrency(lang: Lang): Currency {
  if (lang === "pl") return "pln";
  if (lang === "ar") return "aed";
  // English default: AED — the audience is GCC-focused, not US-focused.
  return "aed";
}

export function Pricing() {
  const { t, lang } = useT();
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState<Currency>(defaultCurrency(lang));
  const [busyTier, setBusyTier] = useState<Tier | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paid, setPaid] = useState<"success" | "canceled" | null>(null);

  useEffect(() => setCurrency(defaultCurrency(lang)), [lang]);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("paid");
    if (p === "success") setPaid("success");
    if (p === "canceled") setPaid("canceled");
    if (p) {
      const u = new URL(window.location.href);
      u.searchParams.delete("paid");
      window.history.replaceState({}, "", u.toString());
    }
  }, []);

  async function buy(tier: Tier) {
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email above.");
      return;
    }
    setBusyTier(tier);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lang, currency, tier }),
      });
      const j = await res.json();
      if (!res.ok || !j.url) throw new Error(j?.error ?? `HTTP ${res.status}`);
      window.location.href = j.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setBusyTier(null);
    }
  }

  const price = PRICES[currency];

  return (
    <section id="pricing" className="py-14 sm:py-20 lg:py-24" style={{ background: "var(--aris-paper)" }}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="eyebrow">{t.pricingEyebrow}</div>
          <h2 className="font-serif-display text-[24px] sm:text-[32px] md:text-[40px] lg:text-[46px] text-[var(--aris-ink)] my-4">
            {t.pricingPageTitle}
          </h2>
          <p className="text-[16px] text-[var(--aris-muted)] mx-auto max-w-2xl">
            {t.pricingPageIntro}
          </p>
        </div>

        {paid === "success" && (
          <div className="max-w-2xl mx-auto mb-6 rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            ✓ Subscription confirmed. Welcome.
          </div>
        )}
        {paid === "canceled" && (
          <div className="max-w-2xl mx-auto mb-6 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Payment was canceled — you weren't charged.
          </div>
        )}

        {/* Email + currency selector */}
        <div className="max-w-2xl mx-auto mb-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
          <div className="flex-1 flex flex-col gap-1">
            <label className="font-mono-mark text-[10.5px] tracking-wider uppercase text-[var(--aris-muted)]">
              {t.subEmail}
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11 rounded-sm border border-[var(--aris-line-dark)] bg-white px-4 text-[15px] focus:outline-none focus:border-[var(--aris-gold)]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-mono-mark text-[10.5px] tracking-wider uppercase text-[var(--aris-muted)]">
              {t.chartCurrency}
            </label>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value as Currency)}
              className="h-11 rounded-sm border border-[var(--aris-line-dark)] bg-white px-4 text-[15px] focus:outline-none focus:border-[var(--aris-gold)]"
            >
              {Object.keys(PRICES).map(c => (
                <option key={c} value={c}>{PRICES[c as Currency].label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid gap-5 sm:grid-cols-2 max-w-3xl mx-auto items-stretch">
          {/* Monthly */}
          <div
            className="rounded-xl p-6 sm:p-8 flex flex-col transition-all hover:-translate-y-1 hover:shadow-[0_30px_70px_-40px_rgba(12,18,14,.3)]"
            style={{ background: "var(--aris-offwhite)", border: "1px solid var(--aris-line-dark)" }}
          >
            <div className="font-mono-mark text-[12px] tracking-[0.18em] uppercase text-[var(--aris-gold)]">
              {t.pricingMonthlyLabel}
            </div>
            <div className="font-serif-display text-[36px] sm:text-[46px] text-[var(--aris-ink)] mt-3 leading-none">
              {price.monthly}
              <span className="text-[14px] text-[var(--aris-muted)] font-sans">{t.pricingPerMonth}</span>
            </div>
            <ul className="my-6 flex flex-col gap-3 flex-1">
              {t.pricingMonthlyFeatures.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-[14px] text-[var(--aris-ink)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-[var(--aris-emerald)] shrink-0 mt-1">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => buy("monthly")}
              disabled={busyTier === "monthly"}
              className="rounded-sm border border-[var(--aris-ink)] hover:bg-[var(--aris-ink)] hover:text-[var(--aris-paper)] text-[var(--aris-ink)] px-5 py-3 text-sm font-semibold transition"
            >
              {busyTier === "monthly" ? "…" : t.pricingStartMonthly}
            </button>
          </div>

          {/* Annual (featured) */}
          <div
            className="relative rounded-xl p-6 sm:p-8 flex flex-col transition-all hover:-translate-y-1 sm:scale-[1.02]"
            style={{
              background: "var(--aris-green-950)",
              border: "1px solid var(--aris-gold)",
              color: "var(--aris-paper)",
            }}
          >
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono-mark text-[10px] tracking-wider uppercase font-semibold rounded-full px-4 py-1.5"
              style={{ background: "var(--aris-gold)", color: "var(--aris-green-950)" }}
            >
              {t.pricingBestValueBadge}
            </div>
            <div className="font-mono-mark text-[12px] tracking-[0.18em] uppercase text-[var(--aris-gold-soft)]">
              {t.pricingAnnualLabel}
            </div>
            <div className="font-serif-display text-[36px] sm:text-[46px] text-[var(--aris-paper)] mt-3 leading-none">
              {price.annual}
              <span className="text-[14px] text-[var(--aris-paper)]/60 font-sans">{t.pricingPerYear}</span>
            </div>
            <ul className="my-6 flex flex-col gap-3 flex-1">
              {t.pricingAnnualFeatures.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-[14px] text-[var(--aris-paper)]/85">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-[var(--aris-gold)] shrink-0 mt-1">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => buy("annual")}
              disabled={busyTier === "annual"}
              className="rounded-sm bg-[var(--aris-gold)] hover:bg-[var(--aris-gold-soft)] text-[var(--aris-green-950)] px-5 py-3 text-sm font-semibold transition"
            >
              {busyTier === "annual" ? "…" : t.pricingStartAnnual}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-center mt-5 text-sm text-rose-700">{error}</p>
        )}

        <div className="flex items-center justify-center gap-2 flex-wrap mt-9">
          {["Apple Pay", "Mada", "Tabby", "Tamara", "Visa", "Mastercard"].map(p => (
            <span
              key={p}
              className="font-mono-mark text-[11px] text-[var(--aris-muted)] border border-[var(--aris-line-dark)] rounded-sm px-3 py-2 bg-[var(--aris-offwhite)]"
            >
              {p}
            </span>
          ))}
        </div>
        <p className="text-center mt-6 text-[13px] text-[var(--aris-muted)]">
          {t.pricingPaymentsNote}
        </p>
      </div>
    </section>
  );
}

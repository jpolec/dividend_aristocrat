import { useMemo, useState } from "react";
import { useT } from "./i18n";
import { useInView } from "./useInView";

type Currency = "AED" | "SAR" | "QAR" | "USD" | "PLN";
const CURRENCIES: Currency[] = ["AED", "SAR", "QAR", "USD", "PLN"];

function compoundSeries(monthly: number, annualYieldPct: number, years: number) {
  const r = annualYieldPct / 100 / 12;
  const points: { year: number; balance: number }[] = [{ year: 0, balance: 0 }];
  let balance = 0;
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + monthly;
    }
    points.push({ year: y, balance });
  }
  return points;
}

function fmt(n: number, currency: string) {
  return `${currency} ${Math.round(n).toLocaleString()}`;
}

export function CompoundChart() {
  const { t } = useT();
  const { ref, inView } = useInView<HTMLDivElement>();

  const [monthly, setMonthly] = useState(2000);
  const [divYield, setDivYield] = useState(10);
  const [reYield, setReYield] = useState(4);
  const [years, setYears] = useState(20);
  const [currency, setCurrency] = useState<Currency>("AED");

  const dividend = useMemo(() => compoundSeries(monthly, divYield, years), [monthly, divYield, years]);
  const realEstate = useMemo(() => compoundSeries(monthly, reYield, years), [monthly, reYield, years]);
  const divFinal = dividend[dividend.length - 1].balance;
  const reFinal = realEstate[realEstate.length - 1].balance;
  const diff = divFinal - reFinal;
  const contributed = monthly * 12 * years;

  // SVG geometry
  const W = 760;
  const H = 320;
  const PAD = { top: 16, right: 18, bottom: 32, left: 16 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const maxY = Math.max(divFinal, reFinal, 1);
  const xAt = (i: number) => PAD.left + (i / (dividend.length - 1)) * innerW;
  const yAt = (v: number) => PAD.top + innerH - (v / maxY) * innerH;
  const path = (pts: typeof dividend) => pts.map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(p.balance)}`).join(" ");

  return (
    <section
      className="py-14 sm:py-20 lg:py-24"
      style={{
        background: "linear-gradient(180deg, var(--aris-paper-2) 0%, #f5ecd4 100%)",
      }}
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
        <div className="max-w-3xl mb-10">
          <div className="eyebrow">{t.chartCompareEyebrow}</div>
          <h2 className="font-serif-display text-[24px] sm:text-[32px] md:text-[40px] lg:text-[46px] text-[var(--aris-ink)] my-4">
            {t.chartCompareTitle}
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[var(--aris-muted)] leading-relaxed max-w-2xl">
            {t.chartCompareIntro}
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "var(--aris-offwhite)", border: "1px solid var(--aris-line-dark)", boxShadow: "0 30px 70px -45px rgba(12,18,14,.3)" }}
        >
          {/* Controls */}
          <div className="px-4 sm:px-7 py-5 border-b border-[var(--aris-line)] bg-amber-50/45">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <Slider
                label={`${t.chartMonthly} (${currency})`}
                value={monthly}
                min={500}
                max={10000}
                step={100}
                onChange={setMonthly}
                display={monthly.toLocaleString()}
              />
              <Slider
                label={t.chartDividendYieldLabel}
                value={divYield}
                min={5}
                max={15}
                step={0.5}
                onChange={setDivYield}
                display={`${divYield.toFixed(1)}%`}
                accent="emerald"
              />
              <Slider
                label={t.chartRealEstateYieldLabel}
                value={reYield}
                min={2}
                max={8}
                step={0.5}
                onChange={setReYield}
                display={`${reYield.toFixed(1)}%`}
                accent="muted"
              />
              <Slider
                label={t.chartYears}
                value={years}
                min={5}
                max={30}
                step={1}
                onChange={setYears}
                display={`${years}`}
              />
              <div className="flex flex-col gap-1">
                <label className="font-mono-mark text-[10.5px] tracking-wider uppercase text-[var(--aris-muted)]">
                  {t.chartCurrency}
                </label>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value as Currency)}
                  className="h-10 rounded-sm border border-[var(--aris-line-dark)] bg-white px-3 text-[14px] focus:outline-none focus:border-[var(--aris-gold)]"
                >
                  {CURRENCIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Result stats — Dividend is the headline; RE + Difference are supporting context */}
          <div className="grid lg:grid-cols-[1.6fr_1fr_1fr]">
            <StatBlock
              label={t.chartDividendPathLabel}
              value={fmt(divFinal, currency)}
              sub={`${divYield.toFixed(1)}% · ${years}y · ${t.chartContributed.toLowerCase()}: ${fmt(contributed, currency)}`}
              tone="hero"
              emphasize
            />
            <StatBlock
              label={t.chartRealEstatePathLabel}
              value={fmt(reFinal, currency)}
              sub={`${reYield.toFixed(1)}% · ${years}y`}
              tone="muted"
            />
            <StatBlock
              label={t.chartDifferenceLabel}
              value={`+${fmt(diff, currency)}`}
              sub={`vs ${t.chartRealEstatePathLabel.toLowerCase()}`}
              tone="gold"
            />
          </div>

          {/* Chart */}
          <div ref={ref} className={`aris-fade ${inView ? "in" : ""} px-4 sm:px-7 pt-4 pb-6`}>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
              <defs>
                <linearGradient id="aris-cmp-div" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c6a667" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#c6a667" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* horizontal grid */}
              {[0.25, 0.5, 0.75, 1].map(f => (
                <line
                  key={f}
                  x1={PAD.left}
                  x2={W - PAD.right}
                  y1={PAD.top + innerH * (1 - f)}
                  y2={PAD.top + innerH * (1 - f)}
                  stroke="#e5e0d3"
                  strokeDasharray="3 4"
                />
              ))}

              {/* dividend area */}
              <path d={`${path(dividend)} L ${xAt(dividend.length - 1)} ${yAt(0)} L ${xAt(0)} ${yAt(0)} Z`} fill="url(#aris-cmp-div)" />

              {/* real-estate line (muted) */}
              <path d={path(realEstate)} fill="none" stroke="#9aa39c" strokeWidth="2" strokeDasharray="6 5" />

              {/* dividend line (gold) */}
              <path d={path(dividend)} fill="none" stroke="#c6a667" strokeWidth="2.6" />

              {/* end dots */}
              <circle cx={xAt(dividend.length - 1)} cy={yAt(divFinal)} r="5" fill="#c6a667" stroke="white" strokeWidth="2" />
              <circle cx={xAt(realEstate.length - 1)} cy={yAt(reFinal)} r="4" fill="#9aa39c" stroke="white" strokeWidth="2" />

              {/* x labels */}
              {dividend.map((p, i) => {
                if (dividend.length > 11 && i % Math.ceil(dividend.length / 8) !== 0 && i !== dividend.length - 1) return null;
                return (
                  <text key={i} x={xAt(i)} y={H - 10} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="#6f7a73">
                    {p.year === 0 ? "Y0" : `Y${p.year}`}
                  </text>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-[12.5px]">
              <span className="flex items-center gap-2">
                <span className="inline-block h-[3px] w-7 rounded" style={{ background: "#c6a667" }} />
                <span className="text-[var(--aris-ink)]">{t.chartDividendPathLabel} · {divYield.toFixed(1)}%</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-0 w-7" style={{ borderTop: "2px dashed #9aa39c" }} />
                <span className="text-[var(--aris-muted)]">{t.chartRealEstatePathLabel} · {reYield.toFixed(1)}%</span>
              </span>
            </div>
          </div>

          {/* Flexibility note */}
          <div className="px-4 sm:px-7 pt-2 pb-6">
            <div
              className="rounded-md px-4 py-3 text-[13.5px] leading-relaxed text-[var(--aris-ink)]"
              style={{ borderInlineStart: "3px solid var(--aris-gold)", background: "var(--aris-paper-2)" }}
            >
              <span className="font-semibold">●&nbsp;</span>
              {t.chartFlexibilityNote}
            </div>
            <p className="text-[12px] text-[var(--aris-muted)] italic mt-3">
              {t.chartDisclaimerNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  accent = "gold",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
  accent?: "gold" | "emerald" | "muted";
}) {
  const accentCls = accent === "emerald" ? "accent-emerald-700" : accent === "muted" ? "accent-slate-500" : "accent-amber-600";
  const txt = accent === "emerald" ? "text-[var(--aris-emerald)]" : accent === "muted" ? "text-[var(--aris-muted)]" : "text-[var(--aris-gold)]";
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between">
        <label className="font-mono-mark text-[10.5px] tracking-wider uppercase text-[var(--aris-muted)]">
          {label}
        </label>
        <span className={`text-[13px] font-semibold tabular-nums ${txt}`}>{display}</span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={e => onChange(Number(e.target.value))}
        className={`w-full ${accentCls}`}
      />
    </div>
  );
}

function StatBlock({
  label,
  value,
  sub,
  tone,
  emphasize,
}: {
  label: string;
  value: string;
  sub?: string;
  tone: "hero" | "muted" | "gold";
  emphasize?: boolean;
}) {
  // Hero = the dividend final value: dark gradient, biggest type, gold accents
  // Gold = the difference: lighter gold tint, medium type
  // Muted = real estate: plain offwhite, smaller type
  const bg = tone === "hero"
    ? "linear-gradient(135deg, var(--aris-green-950), var(--aris-charcoal))"
    : tone === "gold"
      ? "linear-gradient(135deg, rgba(198,166,103,.18), rgba(198,166,103,.04))"
      : "var(--aris-offwhite)";
  const border = tone === "hero" ? "none" : "1px solid var(--aris-line-dark)";
  const labelColor = tone === "hero"
    ? "var(--aris-gold)"
    : tone === "gold"
      ? "#9c7c3a"
      : "var(--aris-muted)";
  const valColor = tone === "hero"
    ? "var(--aris-paper)"
    : tone === "gold"
      ? "#7a5f24"
      : "var(--aris-ink)";
  const subColor = tone === "hero" ? "rgba(246,243,234,.6)" : "var(--aris-muted)";

  const sizeCls = emphasize
    ? "text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px]"
    : tone === "gold"
      ? "text-[22px] sm:text-[26px]"
      : "text-[20px] sm:text-[24px]";

  return (
    <div
      className={`px-4 sm:px-7 ${emphasize ? "py-7 sm:py-9" : "py-5 sm:py-6"} flex flex-col justify-center`}
      style={{ background: bg, borderTop: tone === "hero" ? "none" : border }}
    >
      <div className="font-mono-mark text-[10.5px] tracking-[0.15em] uppercase" style={{ color: labelColor }}>
        {label}
      </div>
      <div className={`font-serif-display tabular-nums mt-1.5 leading-[1.05] ${sizeCls}`} style={{ color: valColor }}>
        {value}
      </div>
      {sub && <div className="text-[11.5px] mt-2 leading-relaxed" style={{ color: subColor }}>{sub}</div>}
    </div>
  );
}

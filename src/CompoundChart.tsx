import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useT } from "./i18n";

type Currency = "AED" | "SAR" | "QAR" | "USD" | "PLN";
const CURRENCIES: Currency[] = ["AED", "SAR", "QAR", "USD", "PLN"];

function compoundSeries(monthly: number, annualYieldPct: number, years: number) {
  // Monthly compounding: each month deposit `monthly`, then multiply existing balance by (1 + yield/12)
  const r = annualYieldPct / 100 / 12;
  const points: { year: number; balance: number; contributed: number }[] = [];
  let balance = 0;
  let contributed = 0;
  points.push({ year: 0, balance: 0, contributed: 0 });
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + monthly;
      contributed += monthly;
    }
    points.push({ year: y, balance, contributed });
  }
  return points;
}

function fmtNumber(n: number, currency: string) {
  const rounded = Math.round(n);
  return `${currency} ${rounded.toLocaleString()}`;
}

export function CompoundChart() {
  const { t } = useT();
  const [monthly, setMonthly] = useState(1000);
  const [yieldPct, setYieldPct] = useState(10);
  const [years, setYears] = useState(5);
  const [currency, setCurrency] = useState<Currency>("AED");

  const points = useMemo(() => compoundSeries(monthly, yieldPct, years), [monthly, yieldPct, years]);
  const finalPt = points[points.length - 1];
  const growth = finalPt.balance - finalPt.contributed;

  // SVG chart dimensions
  const W = 720;
  const H = 280;
  const PAD = { top: 12, right: 16, bottom: 28, left: 12 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const maxY = Math.max(finalPt.balance, 1);
  const xAt = (i: number) => PAD.left + (i / (points.length - 1)) * innerW;
  const yAt = (v: number) => PAD.top + innerH - (v / maxY) * innerH;

  // Build paths
  const balancePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(p.balance)}`).join(" ");
  const contribPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(p.contributed)}`).join(" ");
  const balanceArea = `${balancePath} L ${xAt(points.length - 1)} ${yAt(0)} L ${xAt(0)} ${yAt(0)} Z`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.chartTitle}</CardTitle>
        <CardDescription>{t.chartIntro}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Sliders */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Slider
            label={`${t.chartMonthly} (${currency})`}
            value={monthly}
            min={100}
            max={10000}
            step={100}
            onChange={setMonthly}
            display={monthly.toLocaleString()}
          />
          <Slider
            label={`${t.chartYield} (%)`}
            value={yieldPct}
            min={3}
            max={15}
            step={0.5}
            onChange={setYieldPct}
            display={`${yieldPct.toFixed(1)}%`}
          />
          <Slider
            label={t.chartYears}
            value={years}
            min={1}
            max={30}
            step={1}
            onChange={setYears}
            display={`${years}`}
          />
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">{t.chartCurrency}</label>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value as Currency)}
              className="h-9 rounded-md border bg-white px-3 text-sm"
            >
              {CURRENCIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Big number cards — gold + deep emerald palette */}
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard label={t.chartContributed} value={fmtNumber(finalPt.contributed, currency)} tone="muted" />
          <StatCard label={t.chartGrowth} value={fmtNumber(growth, currency)} tone="growth" />
          <StatCard label={t.chartFinal} value={fmtNumber(finalPt.balance, currency)} tone="primary" emphasize />
        </div>

        {/* Chart */}
        <div className="relative w-full overflow-hidden rounded-lg border bg-gradient-to-b from-white to-slate-50">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
            <defs>
              <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d97706" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#fcd34d" stopOpacity="0.08" />
              </linearGradient>
            </defs>

            {/* horizontal grid lines */}
            {[0.25, 0.5, 0.75, 1].map(f => (
              <line
                key={f}
                x1={PAD.left}
                x2={W - PAD.right}
                y1={PAD.top + innerH * (1 - f)}
                y2={PAD.top + innerH * (1 - f)}
                stroke="#fde68a"
                strokeDasharray="3 3"
              />
            ))}

            {/* balance area (gold) */}
            <path d={balanceArea} fill="url(#growthFill)" />

            {/* contributions line (dashed slate) */}
            <path d={contribPath} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 4" />

            {/* balance line (deep emerald) */}
            <path d={balancePath} fill="none" stroke="#047857" strokeWidth="2.5" />

            {/* end point dot */}
            <circle cx={xAt(points.length - 1)} cy={yAt(finalPt.balance)} r="5" fill="#047857" stroke="white" strokeWidth="2" />

            {/* x-axis year labels */}
            {points.map((p, i) => {
              if (points.length > 16 && i % Math.ceil(points.length / 10) !== 0 && i !== points.length - 1) return null;
              return (
                <text
                  key={i}
                  x={xAt(i)}
                  y={H - 8}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#64748b"
                >
                  {p.year === 0 ? "0" : `Y${p.year}`}
                </text>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 px-4 pb-3 text-xs">
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-5 bg-emerald-700 rounded" />
              {t.chartFinal}
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-0.5 w-5 bg-slate-400" style={{ borderTop: "2px dashed #94a3b8" }} />
              {t.chartContributed}
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">{t.chartDisclaimerNote}</p>
      </CardContent>
    </Card>
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
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between">
        <label className="text-xs text-muted-foreground">{label}</label>
        <span className="text-sm font-semibold tabular-nums text-amber-700">{display}</span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-amber-600"
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
  emphasize,
}: {
  label: string;
  value: string;
  tone: "muted" | "growth" | "primary";
  emphasize?: boolean;
}) {
  const toneCls =
    tone === "primary"
      ? "border-emerald-300 bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-900"
      : tone === "growth"
        ? "border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100 text-amber-900"
        : "border-slate-200 bg-slate-50 text-slate-800";
  return (
    <div className={`rounded-lg border px-4 py-3 ${toneCls}`}>
      <div className="text-xs opacity-70">{label}</div>
      <div className={`tabular-nums font-bold mt-0.5 ${emphasize ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}>
        {value}
      </div>
    </div>
  );
}

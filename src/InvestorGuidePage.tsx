import { GUIDE_CONTENT, GUIDE_COPY, GUIDE_COUNTRIES, GUIDE_QUESTIONS, type GuideCopy, type GuideCountry, type GuidePageContent, type GuideSlug } from "./investorGuideData";
import { useT, type Lang } from "./i18n";

function slugFromPath(): GuideSlug | null {
  if (typeof window === "undefined") return null;
  const slug = window.location.pathname.split("/").filter(Boolean)[1] as GuideSlug | undefined;
  return slug && GUIDE_CONTENT[slug] ? slug : null;
}

export function InvestorGuidePage() {
  const { lang } = useT();
  const copy = GUIDE_COPY[lang];
  const slug = slugFromPath();

  if (!slug) return <InvestorGuideIndex />;

  const country = GUIDE_COUNTRIES.find(item => item.slug === slug)!;
  const content = GUIDE_CONTENT[slug][lang];

  return (
    <main style={{ background: "var(--aris-paper)" }}>
      <section
        className="text-[var(--aris-paper)] pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16"
        style={{
          background:
            "radial-gradient(90% 70% at 88% 12%, rgba(198,166,103,.14), transparent 55%), linear-gradient(155deg, var(--aris-green-950), var(--aris-green-900) 60%, var(--aris-charcoal))",
        }}
      >
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <a href="/investor-guides" className="inline-flex text-[13px] text-[var(--aris-paper)]/58 hover:text-[var(--aris-gold)] transition mb-7">
            ← {copy.backLabel}
          </a>
          <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-8 lg:gap-14 items-center">
            <div>
              <div className="eyebrow">{copy.pageEyebrow}</div>
              <h1 className="font-serif-display text-[34px] sm:text-[48px] lg:text-[64px] text-[var(--aris-paper)] mt-4 mb-5">
                {content.headline}
              </h1>
              <p className="text-[16px] sm:text-[19px] leading-[1.62] text-[var(--aris-paper)]/70 max-w-2xl">
                {content.intro}
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a
                  href="/#pricing"
                  className="inline-flex items-center justify-center rounded-sm bg-[var(--aris-gold)] hover:bg-[var(--aris-gold-soft)] text-[var(--aris-green-950)] px-5 py-3 text-sm font-semibold transition"
                >
                  {copy.membershipCta}
                </a>
                <a
                  href="/#sample"
                  className="inline-flex items-center justify-center rounded-sm border border-[var(--aris-paper)]/28 hover:border-[var(--aris-gold)] hover:text-[var(--aris-gold)] text-[var(--aris-paper)] px-5 py-3 text-sm font-semibold transition"
                >
                  {copy.sampleCta}
                </a>
              </div>
            </div>
            <div
              className="rounded-lg p-5 sm:p-6"
              style={{ background: "rgba(15,40,29,.58)", border: "1px solid var(--aris-line)" }}
            >
              <div className="text-[48px] leading-none mb-5" aria-hidden="true">
                {country.flag}
              </div>
              <GuideHeroStat label={copy.residentLabel} value={country.names[lang]} />
              <GuideHeroStat label={copy.currencyLabel} value={country.currency} />
              <GuideHeroStat label={copy.exampleLabel} value={country.exampleCapital} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20" style={{ background: "var(--aris-offwhite)" }}>
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7 grid lg:grid-cols-[.95fr_1.05fr] gap-10 lg:gap-14">
          <div>
            <div className="eyebrow">{copy.overviewTitle}</div>
            <h2 className="font-serif-display text-[26px] sm:text-[38px] lg:text-[46px] text-[var(--aris-ink)] mt-4 mb-5">
              {copy.overviewTitle}
            </h2>
            <div className="space-y-4">
              {content.overview.map(paragraph => (
                <p key={paragraph} className="text-[15px] sm:text-[17px] leading-relaxed text-[var(--aris-muted)]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <LocalExample copy={copy} content={content} />
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20" style={{ background: "var(--aris-paper-2)" }}>
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <TwoColumnCards title={copy.practicalTitle} items={content.practical} />
          <div className="mt-12">
            <TwoColumnCards title={copy.whatYouNeedTitle} items={content.needs} />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20" style={{ background: "var(--aris-offwhite)" }}>
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="grid xl:grid-cols-[.9fr_1.1fr] gap-10 lg:gap-14 items-start">
            <ReportPreview copy={copy} />
            <SimulationPanel copy={copy} country={country} />
          </div>
          <LocalInvestorQuestions country={country} lang={lang} />
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20" style={{ background: "var(--aris-paper-2)" }}>
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7 grid lg:grid-cols-2 gap-10 lg:gap-14">
          <PointPanel title={copy.highYieldTitle} intro={copy.highYieldIntro} items={copy.highYieldPoints} />
          <PointPanel title={copy.shariaTitle} intro={copy.shariaIntro} items={copy.shariaPoints} />
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 text-[var(--aris-paper)]" style={{ background: "var(--aris-green-950)" }}>
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7 grid lg:grid-cols-2 gap-10 lg:gap-14">
          <Checklist title={copy.researchTitle} items={content.research} />
          <Checklist title={copy.riskTitle} items={content.risks} warn />
        </div>
      </section>

      <section className="py-12 sm:py-16" style={{ background: "var(--aris-paper)" }}>
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div
            className="rounded-md px-5 sm:px-7 py-6 sm:py-7 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between"
            style={{ background: "var(--aris-offwhite)", border: "1px solid var(--aris-line-dark)" }}
          >
            <p className="text-[13.5px] sm:text-[14.5px] leading-relaxed text-[var(--aris-muted)] max-w-3xl">
              {copy.disclaimer}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a href="/#method" className="inline-flex items-center justify-center rounded-sm bg-[var(--aris-gold)] hover:bg-[var(--aris-gold-soft)] text-[var(--aris-green-950)] px-5 py-3 text-sm font-semibold transition">
                {copy.methodologyCta}
              </a>
              <a href="/#sample" className="inline-flex items-center justify-center rounded-sm border border-[var(--aris-line-dark)] hover:border-[var(--aris-gold)] text-[var(--aris-ink)] px-5 py-3 text-sm font-semibold transition">
                {copy.sampleCta}
              </a>
              <a href="/#pricing" className="inline-flex items-center justify-center rounded-sm bg-[var(--aris-gold)] hover:bg-[var(--aris-gold-soft)] text-[var(--aris-green-950)] px-5 py-3 text-sm font-semibold transition">
                {copy.membershipCta}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InvestorGuideIndex() {
  const { lang } = useT();
  const copy = GUIDE_COPY[lang];

  return (
    <main className="pt-28 sm:pt-36 pb-16" style={{ background: "var(--aris-paper)" }}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
        <div className="max-w-3xl mb-10">
          <div className="eyebrow">{copy.stripEyebrow}</div>
          <h1 className="font-serif-display text-[34px] sm:text-[48px] lg:text-[60px] text-[var(--aris-ink)] mt-4 mb-5">
            {copy.indexTitle}
          </h1>
          <p className="text-[16px] sm:text-[18px] leading-relaxed text-[var(--aris-muted)]">
            {copy.indexIntro}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {GUIDE_COUNTRIES.map(country => (
            <a
              key={country.slug}
              href={`/investor-guides/${country.slug}`}
              className="rounded-md p-5 transition hover:-translate-y-0.5"
              style={{ background: "var(--aris-offwhite)", border: "1px solid var(--aris-line-dark)" }}
            >
              <span className="block text-[32px] leading-none mb-4" aria-hidden="true">
                {country.flag}
              </span>
              <span className="font-serif-display text-[24px] text-[var(--aris-ink)] block mb-2">
                {country.names[lang]}
              </span>
              <span className="text-[13.5px] leading-relaxed text-[var(--aris-muted)] block">
                {country.teaser[lang]}
              </span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

function GuideHeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-[var(--aris-line)] py-4 first:border-t-0 first:pt-0 last:pb-0">
      <div className="font-mono-mark text-[10.5px] uppercase tracking-wider text-[var(--aris-gold)] mb-1">
        {label}
      </div>
      <div className="font-serif-display text-[25px] text-[var(--aris-paper)]">{value}</div>
    </div>
  );
}

function LocalExample({ copy, content }: { copy: GuideCopy; content: GuidePageContent }) {
  return (
    <div
      className="rounded-lg p-5 sm:p-6"
      style={{ background: "var(--aris-paper)", border: "1px solid var(--aris-line-dark)" }}
    >
      <div className="eyebrow">{copy.sampleTitle}</div>
      <h3 className="font-serif-display text-[24px] sm:text-[30px] text-[var(--aris-ink)] mt-3 mb-3">
        {copy.sampleTitle}
      </h3>
      <p className="text-[13.5px] sm:text-[14.5px] leading-relaxed text-[var(--aris-muted)] mb-5">
        {copy.sampleIntro}
      </p>
      <div className="grid gap-3">
        {content.sample.map(item => (
          <div key={item.label} className="rounded-sm px-4 py-3" style={{ background: "var(--aris-offwhite)", border: "1px solid var(--aris-line-dark)" }}>
            <div className="font-mono-mark text-[10.5px] uppercase tracking-wider text-[var(--aris-muted)]">
              {item.label}
            </div>
            <div className="font-serif-display text-[26px] text-[var(--aris-ink)] mt-1">
              {item.value}
            </div>
            <p className="text-[12.5px] leading-snug text-[var(--aris-muted)] mt-1">
              {item.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportPreview({ copy }: { copy: GuideCopy }) {
  return (
    <div>
      <div className="eyebrow">{copy.reportPreviewTitle}</div>
      <h2 className="font-serif-display text-[26px] sm:text-[36px] lg:text-[44px] text-[var(--aris-ink)] mt-4 mb-4">
        {copy.reportPreviewTitle}
      </h2>
      <p className="text-[15px] sm:text-[17px] leading-relaxed text-[var(--aris-muted)] mb-6">
        {copy.reportPreviewIntro}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {copy.reportPreviewMetrics.map(metric => (
          <div
            key={metric.label}
            className="rounded-md p-4"
            style={{ background: "var(--aris-paper)", border: "1px solid var(--aris-line-dark)" }}
          >
            <div className="font-mono-mark text-[10.5px] uppercase tracking-wider text-[var(--aris-muted)]">
              {metric.label}
            </div>
            <div className="font-serif-display text-[26px] text-[var(--aris-ink)] mt-1">
              {metric.value}
            </div>
            <p className="text-[12.5px] leading-snug text-[var(--aris-muted)] mt-1">
              {metric.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimulationPanel({ copy, country }: { copy: GuideCopy; country: GuideCountry }) {
  const sim = runSimulation(country.simulation);
  const currency = country.currency;

  return (
    <div
      className="rounded-lg p-5 sm:p-6"
      style={{ background: "var(--aris-paper)", border: "1px solid var(--aris-line-dark)" }}
    >
      <div className="eyebrow">{copy.simulationTitle}</div>
      <h2 className="font-serif-display text-[26px] sm:text-[36px] lg:text-[44px] text-[var(--aris-ink)] mt-4 mb-4">
        {copy.simulationTitle}
      </h2>
      <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--aris-muted)] mb-5">
        {copy.simulationIntro}
      </p>

      <div className="grid gap-3 sm:grid-cols-3 mb-5">
        <MiniStat label={copy.simulationStart} value={formatMoney(country.simulation.start, currency)} />
        <MiniStat label={copy.simulationMonthly} value={formatMoney(country.simulation.monthly, currency)} />
        <MiniStat label={copy.simulationYield} value={`${country.simulation.grossYieldPct.toFixed(1)}%`} />
      </div>

      <SimulationChart copy={copy} sim={sim} currency={currency} />

      <div className="grid gap-3 sm:grid-cols-2 mt-5">
        <MiniStat label={copy.simulationFinalValue} value={formatMoney(sim.finalValue, currency)} emphasize />
        <MiniStat label={copy.simulationNetDividends} value={formatMoney(sim.netDividends, currency)} emphasize />
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-[var(--aris-muted)] italic">
        {copy.simulationDisclaimer}
      </p>
    </div>
  );
}

function LocalInvestorQuestions({ country, lang }: { country: GuideCountry; lang: Lang }) {
  const copy = GUIDE_QUESTIONS[lang];
  const gross = country.simulation.start * (country.simulation.grossYieldPct / 100);
  const withheld = gross * (country.simulation.withholdingPct / 100);
  const net = gross - withheld;
  const moneyArgs = {
    start: formatMoney(country.simulation.start, country.currency),
    yieldPct: `${country.simulation.grossYieldPct.toFixed(1)}%`,
    gross: formatMoney(gross, country.currency),
    withheld: formatMoney(withheld, country.currency),
    net: formatMoney(net, country.currency),
    withholdingPct: `${country.simulation.withholdingPct.toFixed(0)}%`,
  };
  const smallerArgs = {
    capital: formatMoney(country.simulation.start, country.currency),
    monthly: formatMoney(country.simulation.monthly, country.currency),
  };
  const cards = [
    { title: copy.w8benTitle, body: copy.w8benBody },
    { title: copy.withholdingTitle, body: copy.withholdingBody },
    { title: copy.localNetTitle, body: copy.localNetBody(moneyArgs), highlight: true },
    { title: copy.brokerTitle, body: copy.brokerBody },
    { title: copy.propertyTitle, body: copy.propertyBody },
    { title: copy.halalTitle, body: copy.halalBody },
    { title: copy.smallerStartTitle, body: copy.smallerStartBody(smallerArgs), highlight: true },
  ];

  return (
    <div className="mt-10 lg:mt-14">
      <div className="max-w-3xl mb-7">
        <h2 className="font-serif-display text-[26px] sm:text-[36px] lg:text-[44px] text-[var(--aris-ink)] mb-4">
          {copy.title}
        </h2>
        <p className="text-[15px] sm:text-[17px] leading-relaxed text-[var(--aris-muted)]">
          {copy.intro}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map(card => (
          <article
            key={card.title}
            className={`rounded-md p-5 sm:p-6 ${card.highlight ? "xl:col-span-1" : ""}`}
            style={{
              background: card.highlight ? "var(--aris-green-950)" : "var(--aris-paper)",
              border: "1px solid var(--aris-line-dark)",
            }}
          >
            <h3 className={`font-serif-display text-[21px] mb-2 ${card.highlight ? "text-[var(--aris-paper)]" : "text-[var(--aris-ink)]"}`}>
              {card.title}
            </h3>
            <p className={`text-[14px] leading-[1.62] ${card.highlight ? "text-[var(--aris-paper)]/70" : "text-[var(--aris-muted)]"}`}>
              {card.body}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-4 text-[12px] leading-relaxed text-[var(--aris-muted)] italic">
        {copy.taxNote}
      </p>
    </div>
  );
}

function MiniStat({ label, value, emphasize = false }: { label: string; value: string; emphasize?: boolean }) {
  return (
    <div
      className="rounded-sm px-4 py-3"
      style={{
        background: emphasize ? "var(--aris-green-950)" : "var(--aris-offwhite)",
        border: "1px solid var(--aris-line-dark)",
      }}
    >
      <div className={`font-mono-mark text-[10.5px] uppercase tracking-wider ${emphasize ? "text-[var(--aris-gold)]" : "text-[var(--aris-muted)]"}`}>
        {label}
      </div>
      <div className={`font-serif-display text-[22px] sm:text-[25px] mt-1 ${emphasize ? "text-[var(--aris-paper)]" : "text-[var(--aris-ink)]"}`}>
        {value}
      </div>
    </div>
  );
}

type SimulationInput = {
  start: number;
  monthly: number;
  grossYieldPct: number;
  withholdingPct: number;
  years: number;
};

type SimulationResult = {
  points: { year: number; balance: number; contributed: number; netDividends: number }[];
  contributed: number;
  netDividends: number;
  finalValue: number;
};

function runSimulation(input: SimulationInput): SimulationResult {
  const monthlyGrossYield = input.grossYieldPct / 100 / 12;
  const withholdingRate = input.withholdingPct / 100;
  const totalMonths = input.years * 12;
  let balance = input.start;
  let contributed = input.start;
  let netDividends = 0;
  let currentYearNet = 0;
  const points: SimulationResult["points"] = [
    { year: 0, balance, contributed, netDividends: 0 },
  ];

  for (let month = 1; month <= totalMonths; month++) {
    balance += input.monthly;
    contributed += input.monthly;
    const gross = balance * monthlyGrossYield;
    const tax = gross * withholdingRate;
    const net = gross - tax;
    netDividends += net;
    currentYearNet += net;
    balance += net;

    if (month % 12 === 0) {
      points.push({
        year: month / 12,
        balance,
        contributed,
        netDividends: currentYearNet,
      });
      currentYearNet = 0;
    }
  }

  return {
    points,
    contributed,
    netDividends,
    finalValue: balance,
  };
}

function SimulationChart({ copy, sim, currency }: { copy: GuideCopy; sim: SimulationResult; currency: string }) {
  const W = 760;
  const H = 300;
  const PAD = { top: 18, right: 20, bottom: 34, left: 42 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const maxY = Math.max(...sim.points.map(p => p.balance), 1);
  const xAt = (i: number) => PAD.left + (i / (sim.points.length - 1)) * innerW;
  const yAt = (value: number) => PAD.top + innerH - (value / maxY) * innerH;
  const balancePath = sim.points.map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(p.balance)}`).join(" ");
  const contributedPath = sim.points.map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(p.contributed)}`).join(" ");
  const gainArea = [
    balancePath,
    ...sim.points.slice().reverse().map((p, i) => `L ${xAt(sim.points.length - 1 - i)} ${yAt(p.contributed)}`),
    "Z",
  ].join(" ");

  return (
    <div className="rounded-md p-3 sm:p-4" style={{ background: "var(--aris-offwhite)", border: "1px solid var(--aris-line-dark)" }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label={copy.simulationTitle}>
        <defs>
          <linearGradient id="guide-sim-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c6a667" stopOpacity=".32" />
            <stop offset="100%" stopColor="#c6a667" stopOpacity=".03" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map(f => (
          <line
            key={f}
            x1={PAD.left}
            x2={W - PAD.right}
            y1={PAD.top + innerH * (1 - f)}
            y2={PAD.top + innerH * (1 - f)}
            stroke="#e5e0d3"
            strokeDasharray="4 5"
          />
        ))}
        <path d={gainArea} fill="url(#guide-sim-area)" />
        <path d={contributedPath} fill="none" stroke="#9aa39d" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" />
        <path d={balancePath} fill="none" stroke="#c6a667" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {sim.points.map((point, i) => (
          <g key={point.year}>
            <circle cx={xAt(i)} cy={yAt(point.balance)} r="4.5" fill="#c6a667" stroke="white" strokeWidth="2" />
            <circle cx={xAt(i)} cy={yAt(point.contributed)} r="3.2" fill="#9aa39d" stroke="white" strokeWidth="1.5" />
            <text x={xAt(i)} y={H - 10} textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fill="#6f7a73">
              Y{point.year}
            </text>
          </g>
        ))}
        <text x={PAD.left} y="14" fontSize="12" fontFamily="var(--font-mono)" fill="#6f7a73">
          {formatCompact(maxY, currency)}
        </text>
      </svg>
      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-[var(--aris-muted)]">
        <span className="inline-flex items-center gap-2">
          <span className="h-[3px] w-7 rounded bg-[var(--aris-gold)]" />
          {copy.simulationFinalValue}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-0 w-7 border-t-2 border-dashed border-[#9aa39d]" />
          {copy.simulationAddedCapital}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[var(--aris-gold)] opacity-35" />
          {copy.simulationNetDividends}
        </span>
      </div>
    </div>
  );
}

function PointPanel({ title, intro, items }: { title: string; intro: string; items: { title: string; body: string }[] }) {
  return (
    <div>
      <div className="eyebrow">{title}</div>
      <h2 className="font-serif-display text-[26px] sm:text-[36px] lg:text-[44px] text-[var(--aris-ink)] mt-4 mb-4">
        {title}
      </h2>
      <p className="text-[15px] sm:text-[17px] leading-relaxed text-[var(--aris-muted)] mb-6">
        {intro}
      </p>
      <div className="grid gap-3">
        {items.map(item => (
          <div
            key={item.title}
            className="rounded-md p-4"
            style={{ background: "var(--aris-offwhite)", border: "1px solid var(--aris-line-dark)" }}
          >
            <h3 className="font-serif-display text-[20px] text-[var(--aris-ink)] mb-1.5">{item.title}</h3>
            <p className="text-[13.5px] leading-relaxed text-[var(--aris-muted)]">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatMoney(value: number, currency: string) {
  return `${currency} ${Math.round(value).toLocaleString()}`;
}

function formatCompact(value: number, currency: string) {
  if (value >= 1_000_000) return `${currency} ${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${currency} ${(value / 1_000).toFixed(0)}K`;
  return formatMoney(value, currency);
}

function TwoColumnCards({ title, items }: { title: string; items: { title: string; body: string }[] }) {
  return (
    <div>
      <div className="max-w-3xl mb-7">
        <h2 className="font-serif-display text-[26px] sm:text-[36px] lg:text-[44px] text-[var(--aris-ink)]">
          {title}
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map(item => (
          <article
            key={item.title}
            className="rounded-md p-5 sm:p-6"
            style={{ background: "var(--aris-offwhite)", border: "1px solid var(--aris-line-dark)" }}
          >
            <h3 className="font-serif-display text-[21px] text-[var(--aris-ink)] mb-2">{item.title}</h3>
            <p className="text-[14px] leading-[1.6] text-[var(--aris-muted)]">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function Checklist({ title, items, warn = false }: { title: string; items: string[]; warn?: boolean }) {
  return (
    <div>
      <div className="eyebrow">{title}</div>
      <h2 className="font-serif-display text-[26px] sm:text-[36px] lg:text-[44px] text-[var(--aris-paper)] mt-4 mb-6">
        {title}
      </h2>
      <div className="grid gap-3">
        {items.map(item => (
          <div key={item} className="flex gap-3 rounded-md px-4 py-3" style={{ background: "rgba(246,243,234,.055)", border: "1px solid var(--aris-line)" }}>
            <span className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${warn ? "bg-amber-400" : "bg-[var(--aris-gold)]"}`} />
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--aris-paper)]/68">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

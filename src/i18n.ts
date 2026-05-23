import { createContext, useContext } from "react";

export type Lang = "pl" | "en" | "ar";
export const LANGS: { code: Lang; label: string; short: string; flag: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English", short: "EN", flag: "🇬🇧", dir: "ltr" },
  { code: "ar", label: "العربية", short: "AR", flag: "🇸🇦", dir: "rtl" },
  { code: "pl", label: "Polski", short: "PL", flag: "🇵🇱", dir: "ltr" },
];

export type Testimonial = { quote: string; author: string; location: string; country: string };

type Dict = {
  heroHeadline: string;
  heroSubheadline: string;
  pricingLine: string;
  pricingCta: string;
  heroCtaSecondary: string;
  trustStripLabel: string;
  trustStripCountries: string;
  trustStripPoints: string[];
  testimonialsTitle: string;
  testimonials: Testimonial[];
  // compound chart
  chartTitle: string;
  chartIntro: string;
  chartMonthly: string;
  chartYield: string;
  chartYears: string;
  chartCurrency: string;
  chartFinal: string;
  chartContributed: string;
  chartGrowth: string;
  chartYearAxis: string;
  chartDisclaimerNote: string;
  // dual-curve compare chart
  chartCompareEyebrow: string;
  chartCompareTitle: string;
  chartCompareIntro: string;
  chartDividendYieldLabel: string;
  chartRealEstateYieldLabel: string;
  chartDividendPathLabel: string;
  chartRealEstatePathLabel: string;
  chartDifferenceLabel: string;
  chartFlexibilityNote: string;
  // how it works
  howTitle: string;
  howSteps: { title: string; desc: string }[];
  // faq
  faqTitle: string;
  faq: { q: string; a: string }[];
  // trust bar (below hero CTAs)
  trustBar: string[];
  // why dividend companies
  whyTitle: string;
  whyIntro: string;
  whyCards: { title: string; desc: string }[];
  // how we filter
  howWeFilterTitle: string;
  howWeFilterIntro: string;
  howWeFilterMetrics: { label: string; desc: string }[];
  howWeFilterStat: string;
  // Quality-First intro
  qualityFirstEyebrow: string;
  qualityFirstTitle: string;
  qualityFirstBody: string;
  qualityFirstBadges: string[];
  // sample research
  sampleResearchTitle: string;
  sampleResearchIntro: string;
  sampleResearchHeaders: { symbol: string; company: string; yield: string; growth5y: string; payout: string; quality: string };
  sampleResearchDisclaimer: string;
  // comparison
  comparisonTitle: string;
  comparisonIntro: string;
  comparisonLeft: string;
  comparisonRight: string;
  comparisonRows: { dimension: string; left: string; right: string }[];
  comparisonNote: string;
  // concrete example
  comparisonExampleEyebrow: string;
  comparisonExampleTitle: string;
  comparisonExampleCapital: string;
  comparisonExamplePropertyLabel: string;
  comparisonExamplePropertyDetail: string;
  comparisonExamplePropertyValue: string;
  comparisonExampleDividendLabel: string;
  comparisonExampleDividendDetail: string;
  comparisonExampleDividendValue: string;
  comparisonExampleDelta: string;
  comparisonExampleNote: string;
  // sharia
  shariaTitle: string;
  shariaIntro: string;
  shariaBullets: string[];
  shariaDisclaimer: string;
  // header / nav
  navTheCase: string;
  navMethodology: string;
  navSample: string;
  navMembership: string;
  navFaq: string;
  navStartCta: string;
  brandName: string;
  brandSub: string;
  // problem section
  problemEyebrow: string;
  problemTitle: string;
  problemIntro: string;
  problemCards: { title: string; desc: string }[];
  problemBridge: string;
  // pricing tiers
  pricingEyebrow: string;
  pricingPageTitle: string;
  pricingPageIntro: string;
  pricingMonthlyLabel: string;
  pricingAnnualLabel: string;
  pricingBestValueBadge: string;
  pricingPerMonth: string;
  pricingPerYear: string;
  pricingStartMonthly: string;
  pricingStartAnnual: string;
  pricingMonthlyFeatures: string[];
  pricingAnnualFeatures: string[];
  pricingPaymentsNote: string;
  // final CTA section
  finalEyebrow: string;
  finalTitle: string;
  finalIntro: string;
  // footer
  footerDisclaimer: string;
  disclaimerWarningTitle: string;
  disclaimerParas: string[];
  footerBrandTagline: string;
  footerColPlatform: string;
  footerColCompany: string;
  footerColLegal: string;
  footerLinks: { platform: string[]; company: string[]; legal: string[] };
  footerCopyright: string;
  footerLocale: string;
  title: string;
  subtitle: string;
  source: string;
  loadingBase: string;
  shown: (a: number, b: number) => string;
  enriching: string;
  enrichedOf: (a: number, b: number) => string;
  cacheFresh: string;
  cacheAge: (s: string) => string;
  search: string;
  searchPh: string;
  sector: string;
  allSectors: string;
  minDividend: string;
  fetchCount: string;
  enrichTopN: string;
  showFunds: string;
  refresh: string;
  loading: string;
  clearCache: string;
  noResults: string;
  // table headers
  thSymbol: string;
  thName: string;
  thSector: string;
  thPrice: string;
  thYtd: string;
  thOneY: string;
  thAnnualDiv: string;
  thProjYield: string;
  thYearsPaid: string;
  thConfidence: string;
  thTotal5y: string;
  thMarketCap: string;
  footer: string;
  // subscription
  subTitle: string;
  subDesc: string;
  subEmail: string;
  subLang: string;
  subSubmit: string;
  subSubmitting: string;
  subSuccess: string;
  subError: string;
  subInvalid: string;
  // email digest
  digestSubject: (d: string) => string;
  digestIntro: string;
  digestRank: string;
  digestUnsubscribe: string;
};

const en: Dict = {
  heroHeadline: "Build a Second Income Stream — Alongside Your Property",
  heroSubheadline:
    "Research on established U.S. dividend companies for Gulf investors. Lower starting capital than a real-estate deposit — with potential for higher recurring income than typical rental yields, and full liquidity.",
  pricingLine: "30-day money-back guarantee · Cancel anytime",
  pricingCta: "View This Week's Research",
  heroCtaSecondary: "See How We Screen Companies",
  trustStripLabel: "Used by investors across",
  trustStripCountries: "Saudi Arabia • UAE • Qatar • Kuwait • Bahrain • Egypt",
  trustStripPoints: [
    "Disciplined institutional methodology",
    "Halal-aware filtering",
    "Multi-currency pricing (SAR, AED, QAR, KWD, USD)",
    "Cancel anytime",
  ],
  trustBar: [
    "30-day money-back guarantee",
    "Cancel anytime",
    "Secure card checkout",
    "Arabic & English support",
  ],
  whyTitle: "Why dividend companies",
  whyIntro:
    "Financially durable businesses with multi-decade track records of paying — and growing — dividends. The research focus is on companies built for the long term.",
  whyCards: [
    {
      title: "Dividend history",
      desc: "Companies with 10+, 25+ and 50+ years of consecutive dividend payments. A long history is a signal of disciplined capital allocation.",
    },
    {
      title: "Free cash flow",
      desc: "We look for businesses that fund their dividends from cash flow — not from balance-sheet engineering or debt.",
    },
    {
      title: "Payout discipline",
      desc: "Sustainable payout ratios with room to grow. Excessive payout ratios are a yellow flag, not a signal of strength.",
    },
    {
      title: "Balance sheet strength",
      desc: "Conservative leverage, interest coverage, and credit quality. Strong balance sheets weather downturns without cutting dividends.",
    },
    {
      title: "Global diversification",
      desc: "Exposure to U.S. multinationals with revenue across continents. A second source of income alongside local real estate exposure.",
    },
  ],
  howWeFilterTitle: "How we filter",
  howWeFilterIntro:
    "From the universe of publicly traded U.S. dividend payers, our methodology narrows down to a tight shortlist using objective criteria.",
  howWeFilterMetrics: [
    { label: "Dividend history", desc: "Minimum 10 consecutive years of payments; preference for 25+ years (Dividend Aristocrats)." },
    { label: "Payout ratio", desc: "Sustainable level relative to earnings and free cash flow." },
    { label: "Free cash flow coverage", desc: "Dividends comfortably covered by operating cash flow after capex." },
    { label: "Leverage", desc: "Net debt / EBITDA reviewed against sector norms. High leverage is excluded." },
    { label: "Earnings consistency", desc: "Earnings stability across cycles, not just peak years." },
    { label: "Valuation discipline", desc: "Multiples assessed against historical and peer ranges — no premium-priced names." },
    { label: "Sector diversification", desc: "Concentration limits across sectors to keep the watchlist diversified." },
    { label: "Halal-aware exclusions", desc: "Sector-level exclusions for alcohol, gambling, conventional banking and tobacco." },
  ],
  howWeFilterStat:
    "From ~3,000 dividend-paying companies in the U.S. market, the methodology typically narrows to ~40–80 names per quarter.",
  qualityFirstEyebrow: "Quality-First Approach",
  qualityFirstTitle: "Established companies with proven payment track records",
  qualityFirstBody:
    "Our screening focuses on companies with multi-decade dividend histories — established, cash-generative businesses with disciplined capital allocation. Every name passes a structured 8-dimension financial quality screen. We do not pursue speculative or unproven names; the research is positioned for long-term income builders, not traders.",
  qualityFirstBadges: [
    "Multi-decade dividend records",
    "Cash-flow-funded payouts",
    "Conservative balance sheets",
    "Disciplined screening",
  ],
  sampleResearchTitle: "Sample research preview",
  sampleResearchIntro:
    "An indicative view of what the weekly research looks like. Live values are fetched against our screening criteria.",
  sampleResearchHeaders: {
    symbol: "Symbol",
    company: "Company",
    yield: "Yield",
    growth5y: "5Y div. growth",
    payout: "Payout",
    quality: "Quality",
  },
  sampleResearchDisclaimer:
    "Examples shown to illustrate the methodology. Not buy or sell recommendations. Past performance is not indicative of future results.",
  comparisonTitle: "Real estate concentration vs global dividend diversification",
  comparisonIntro:
    "Property remains a meaningful asset class for many GCC investors. Global dividend companies offer complementary exposure — they do not replace property.",
  comparisonLeft: "Property concentration",
  comparisonRight: "Global dividend diversification",
  comparisonRows: [
    { dimension: "Starting capital", left: "Often AED 500K – 2M+", right: "Possible to begin with much less" },
    { dimension: "Liquidity", left: "Months to exit a single asset", right: "Generally settled within days" },
    { dimension: "Geographic exposure", left: "Concentrated in one market", right: "Multinational, multi-region" },
    { dimension: "Currency", left: "Local currency", right: "Primarily USD-denominated" },
    { dimension: "Operational load", left: "Maintenance, tenants, fees", right: "Passive holding of shares" },
    { dimension: "Concentration risk", left: "Single asset, single market", right: "Diversified across companies and sectors" },
  ],
  comparisonNote:
    "This is illustrative. Both asset classes have distinct risks, costs and benefits. Diversification across both may be more durable than concentration in either.",
  comparisonExampleEyebrow: "Concrete example",
  comparisonExampleTitle: "What AED 1,500,000 could mean",
  comparisonExampleCapital: "Starting capital",
  comparisonExamplePropertyLabel: "Property path",
  comparisonExamplePropertyDetail: "AED 1.5M apartment · 4% rental yield",
  comparisonExamplePropertyValue: "AED 60,000 / year",
  comparisonExampleDividendLabel: "Dividend portfolio path",
  comparisonExampleDividendDetail: "Same capital · 10% target yield",
  comparisonExampleDividendValue: "AED 150,000 / year",
  comparisonExampleDelta: "Difference",
  comparisonExampleNote:
    "Illustrative only. Net rental yields after maintenance, vacancies, agency and service-charge fees are typically lower. Dividend yields are not guaranteed and can be reduced or suspended. Both paths carry risk including loss of capital.",
  shariaTitle: "Halal-aware screening",
  shariaIntro:
    "The research methodology applies sector-level exclusions designed to respect Islamic finance principles. We do NOT claim formal Sharia certification.",
  shariaBullets: [
    "Sector exclusions: alcohol, tobacco, gambling, adult entertainment, weapons, conventional banking.",
    "Leverage screening: companies with excessive interest-bearing debt are excluded.",
    "Income-purity awareness: businesses with material non-permissible revenue lines are flagged.",
    "Periodic review: screens are re-applied each quarter as company structures evolve.",
  ],
  shariaDisclaimer:
    "Halal-aware screening is a research input. It is NOT a substitute for guidance from a qualified Sharia scholar. Final compliance assessment remains your responsibility.",
  testimonialsTitle: "What investors say",
  testimonials: [
    {
      quote:
        "The research quality feels far more disciplined than typical retail newsletters. Useful for a professional reader.",
      author: "Ahmed K.",
      location: "Dubai",
      country: "AE",
    },
    {
      quote:
        "Helpful framework for understanding dividend-focused global diversification — without the noise of trading content.",
      author: "Faisal A.",
      location: "Riyadh",
      country: "SA",
    },
    {
      quote:
        "I wanted exposure outside local property markets without speculative trading. This service is positioned exactly for that.",
      author: "Omar H.",
      location: "Doha",
      country: "QA",
    },
    {
      quote:
        "Quiet, well-structured research. The halal-aware screening saves a step I would otherwise have to do myself.",
      author: "Khalid M.",
      location: "Kuwait City",
      country: "KW",
    },
    {
      quote:
        "Reads like a professional research desk note rather than marketing. That alone earns time and attention.",
      author: "Youssef R.",
      location: "Cairo",
      country: "EG",
    },
  ],
  chartTitle: "What 1,000 / month could become",
  chartIntro:
    "Adjust monthly contribution, target yield and time horizon. This is an illustration of compounding — not a guarantee of returns.",
  chartMonthly: "Monthly contribution",
  chartYield: "Target annual yield",
  chartYears: "Years",
  chartCurrency: "Currency",
  chartFinal: "Final portfolio value",
  chartContributed: "Total contributed",
  chartGrowth: "Growth from compounding",
  chartYearAxis: "Year",
  chartDisclaimerNote:
    "Illustrative only. Assumes constant monthly contributions and the chosen annual return reinvested. Actual results vary.",
  chartCompareEyebrow: "The Math of Compounding",
  chartCompareTitle: "A few percentage points, multiplied by time, change everything.",
  chartCompareIntro:
    "An illustration of monthly investing at different annual yields. The longer you compound, the more the gap widens — and you don't need a large starting capital.",
  chartDividendYieldLabel: "Dividend portfolio %",
  chartRealEstateYieldLabel: "Real-estate yield %",
  chartDividendPathLabel: "Dividend strategy",
  chartRealEstatePathLabel: "Real-estate baseline",
  chartDifferenceLabel: "Difference at end",
  chartFlexibilityNote:
    "Flexibility matters: you can start with a modest amount such as 2,000 AED / month. Time and consistency tend to matter more than the size of any single contribution.",
  howTitle: "How it works",
  howSteps: [
    {
      title: "We screen U.S. dividend stocks",
      desc: "Our system scans dividend companies across the U.S. market for income potential, stability and attractive valuations.",
    },
    {
      title: "You receive weekly picks",
      desc: "Every week you get a curated list of dividend opportunities directly by email.",
    },
    {
      title: "Build long-term income",
      desc: "Start with a smaller amount than real estate and gradually build a diversified portfolio designed for recurring income.",
    },
  ],
  faqTitle: "Questions investors ask",
  faq: [
    {
      q: "Is this financial advice?",
      a: "No. The platform is a research and screening tool. It publishes educational and informational content only. Nothing here constitutes personalized investment advice. Please consult a licensed advisor in your jurisdiction before making investment decisions.",
    },
    {
      q: "Are dividends guaranteed?",
      a: "No. Dividend payments are decisions by the issuing company's board and can be reduced or suspended at any time. The research focuses on companies with disciplined histories of payment — but no future dividend is guaranteed.",
    },
    {
      q: "How much money do I need to start?",
      a: "There is no minimum on our side — the brokerage you use determines minimums. Many investors begin with materially less capital than a real estate investment would require.",
    },
    {
      q: "What markets do you cover?",
      a: "Primarily U.S.-listed dividend-paying companies. Selective coverage of multinationals with broad geographic revenue exposure.",
    },
    {
      q: "Why dividend companies?",
      a: "Dividend-paying companies tend to be more mature, with disciplined capital allocation and lower volatility than the broader equity market. The research focus is on durable income generation over the long term.",
    },
    {
      q: "Why not only real estate?",
      a: "Real estate remains a meaningful asset class. The research is positioned as complementary diversification — global, liquid, and USD-denominated exposure alongside local property.",
    },
    {
      q: "What is halal-aware screening?",
      a: "Sector-level exclusions designed to respect Islamic finance principles (no alcohol, gambling, tobacco, conventional banking, etc.). This is a research input — not a substitute for guidance from a qualified Sharia scholar.",
    },
    {
      q: "How often are updates published?",
      a: "Weekly. Each issue includes the latest screening output, methodology notes and a small number of name-level analyses.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. Cancel anytime from your account. A 30-day money-back guarantee applies to your first payment.",
    },
    {
      q: "Is this suitable for beginners?",
      a: "The platform is positioned for sophisticated investors and professionals. The content is accessible but assumes basic familiarity with equity investing.",
    },
  ],
  footerDisclaimer:
    "Investing involves risk, including possible loss of capital. Dividend yields are not guaranteed and past performance does not guarantee future results. The platform provides research and educational content only and is not a licensed financial advisor.",
  disclaimerWarningTitle: "THIS IS NOT INVESTMENT ADVICE",
  disclaimerParas: [
    "The information published on this platform is provided strictly for educational and informational purposes. It is NOT a recommendation, solicitation, or offer to buy, sell, or hold any financial instrument. None of the content constitutes investment advice within the meaning of MiFID II or any applicable national regulation.",
    "We are NOT a licensed investment advisor, broker, dealer, asset manager, or financial planner. We do not have any individual relationship with users that constitutes investment advisory services. No content is personalized to your situation, objectives, risk tolerance, or financial circumstances.",
    "We do NOT manage your money, access your brokerage account, place orders, rebalance portfolios, monitor your holdings, or decide what you should buy or sell. You make every investment decision yourself and remain fully responsible for the consequences.",
    "Investing in stocks carries substantial risk, including the risk of total loss of capital. Dividend payments are NOT guaranteed and may be reduced, suspended, or eliminated by issuers at any time without notice. Past dividend performance, stock prices, and yields are not indicative of future results. Currency, country, and tax risks may further affect your returns.",
    "You alone are responsible for your investment decisions. You should consult with a licensed financial advisor in your own jurisdiction before making any investment decision. Effective January 1, 2026, applicable regulations in certain jurisdictions further restrict the scope of permissible educational financial content. By using this platform you acknowledge that all material is general educational content only and you accept full responsibility for any action taken on its basis.",
  ],
  navTheCase: "The Case",
  navMethodology: "Methodology",
  navSample: "Sample Research",
  navMembership: "Membership",
  navFaq: "FAQ",
  navStartCta: "Start Membership",
  brandName: "Aristocrat",
  brandSub: "Dividend Research",
  problemEyebrow: "The Concentration Question",
  problemTitle: "Much of Gulf wealth sits in one place.",
  problemIntro:
    "Real estate has built generations of wealth across the region — and remains a cornerstone for many. Yet a portfolio anchored to a single asset, in a single market, carries trade-offs worth examining.",
  problemCards: [
    {
      title: "High upfront capital",
      desc: "A single property often requires capital that could otherwise fund a diversified position across many companies.",
    },
    {
      title: "Illiquidity",
      desc: "Selling property takes time and negotiation. Listed companies can typically be entered or exited far more readily.",
    },
    {
      title: "Concentration risk",
      desc: "One asset class, one geography, one currency. Diversification across regions and sectors can soften single-market exposure.",
    },
    {
      title: "Operational burden",
      desc: "Tenants, maintenance, and management demand attention. Owning shares in established companies carries no such overhead.",
    },
  ],
  problemBridge:
    "The question isn't property or equities. It's whether globally diversified, income-producing companies belong alongside what you already own — adding liquidity, currency exposure, and breadth.",
  pricingEyebrow: "Membership",
  pricingPageTitle: "One platform. Choose your rhythm.",
  pricingPageIntro:
    "Every plan includes full research access, weekly updates, the screening library, and Arabic support. Cancel anytime.",
  pricingMonthlyLabel: "Monthly",
  pricingAnnualLabel: "Annual",
  pricingBestValueBadge: "Best Value · Save 30%",
  pricingPerMonth: "/mo",
  pricingPerYear: "/yr",
  pricingStartMonthly: "Start Monthly",
  pricingStartAnnual: "Start Annual",
  pricingMonthlyFeatures: [
    "Full research library access",
    "Weekly research updates",
    "Halal-aware screening views",
    "Arabic & English support",
  ],
  pricingAnnualFeatures: [
    "Everything in Monthly",
    "Two months free vs monthly",
    "Quarterly deep-dive reports",
    "Priority research requests",
  ],
  pricingPaymentsNote:
    "30-day money-back guarantee · Cancel anytime · Local-currency billing available.",
  finalEyebrow: "Begin",
  finalTitle: "Access institutional-style dividend intelligence.",
  finalIntro:
    "Start with sample research, explore the methodology, and decide for yourself. Backed by a 30-day money-back guarantee.",
  footerBrandTagline:
    "Premium, income-focused investment research for sophisticated investors across the GCC. Educational research and screening — not investment advice.",
  footerColPlatform: "Platform",
  footerColCompany: "Company",
  footerColLegal: "Legal",
  footerLinks: {
    platform: ["Methodology", "Sample Research", "Halal-Aware Filtering", "Membership"],
    company: ["About", "FAQ", "Contact", "Arabic Support"],
    legal: ["Terms of Service", "Privacy Policy", "Risk Statement", "Refund Policy"],
  },
  footerCopyright: "© 2026 Aristocrat Dividend Research. All rights reserved.",
  footerLocale: "Crafted for GCC investors · Available in العربية & English",
  title: "Dividend Companies",
  subtitle: "All actively traded dividend-paying companies. Source: api.quantjourney.cloud",
  source: "api.quantjourney.cloud",
  loadingBase: "loading…",
  shown: (a, b) => `${a} shown / ${b} fetched`,
  enriching: "enriching historical data…",
  enrichedOf: (a, b) => `${a} of ${b} enriched`,
  cacheFresh: "fresh from API",
  cacheAge: s => `cache: ${s}`,
  search: "Search",
  searchPh: "symbol, name, industry",
  sector: "Sector",
  allSectors: "All",
  minDividend: "Min dividend $/share",
  fetchCount: "Fetch",
  enrichTopN: "Enrich top N",
  showFunds: "Show funds & ETFs",
  refresh: "Refresh",
  loading: "Loading…",
  clearCache: "Clear cache",
  noResults: "No results",
  thSymbol: "Symbol",
  thName: "Name",
  thSector: "Sector",
  thPrice: "Price",
  thYtd: "YTD",
  thOneY: "1Y",
  thAnnualDiv: "Annual div.",
  thProjYield: "Proj. yield",
  thYearsPaid: "Years paid",
  thConfidence: "Confidence",
  thTotal5y: "Total 5y",
  thMarketCap: "Market cap",
  footer:
    "Confidence = 50% · years_paid/5 + 30% · no_YoY_cut + 20% · YoY_growth. Proj. yield = last annual dividend / current price. Total 5y = total dividends paid over last 5 years (from cash flow).",
  subTitle: "Weekly digest",
  subDesc: "Subscribe to receive the top 10 dividend stocks once a week.",
  subEmail: "Email",
  subLang: "Language",
  subSubmit: "Subscribe",
  subSubmitting: "Subscribing…",
  subSuccess: "Subscribed. You'll get the next weekly digest by email.",
  subError: "Could not subscribe — try again.",
  subInvalid: "Please enter a valid email.",
  digestSubject: d => `Top 10 dividend stocks — ${d}`,
  digestIntro: "Your weekly picks, ranked by payment consistency and projected yield:",
  digestRank: "Rank",
  digestUnsubscribe: "Unsubscribe",
};

const pl: Dict = {
  heroHeadline: "Drugi strumień dochodu — równolegle do nieruchomości",
  heroSubheadline:
    "Research o sprawdzonych amerykańskich spółkach dywidendowych dla inwestorów z Zatoki. Mniejszy kapitał startowy niż wkład własny do mieszkania — z potencjałem wyższego powtarzalnego dochodu niż typowy yield z najmu, i pełną płynnością.",
  pricingLine: "30-dniowa gwarancja zwrotu · Rezygnacja w każdej chwili",
  pricingCta: "Zobacz research z tego tygodnia",
  heroCtaSecondary: "Jak filtrujemy spółki",
  trustStripLabel: "Korzystają inwestorzy z",
  trustStripCountries: "Arabia Saudyjska • ZEA • Katar • Kuwejt • Bahrajn • Egipt",
  trustStripPoints: [
    "Zdyscyplinowana metodologia instytucjonalna",
    "Halal-aware screening",
    "Lokalne waluty (SAR, AED, QAR, KWD, USD)",
    "Rezygnacja w każdej chwili",
  ],
  trustBar: [
    "30-dniowa gwarancja zwrotu",
    "Rezygnacja w każdej chwili",
    "Bezpieczna płatność kartą",
    "Wsparcie po arabsku i angielsku",
  ],
  whyTitle: "Dlaczego spółki dywidendowe",
  whyIntro:
    "Finansowo solidne biznesy z wieloletnią historią wypłat — i wzrostu — dywidend. Research koncentruje się na spółkach budowanych na długi termin.",
  whyCards: [
    {
      title: "Historia dywidend",
      desc: "Spółki z 10+, 25+ i 50+ latami nieprzerwanych wypłat. Długa historia to sygnał zdyscyplinowanej alokacji kapitału.",
    },
    {
      title: "Wolne przepływy gotówkowe",
      desc: "Szukamy biznesów, które finansują dywidendy z gotówki — nie z inżynierii bilansowej ani długu.",
    },
    {
      title: "Dyscyplina wypłat",
      desc: "Zrównoważone wskaźniki payout z miejscem na wzrost. Wysoki payout to żółta lampka, nie sygnał siły.",
    },
    {
      title: "Siła bilansu",
      desc: "Konserwatywne zadłużenie, pokrycie odsetek, jakość kredytowa. Silne bilanse przechodzą przez bessy bez cięcia dywidend.",
    },
    {
      title: "Globalna dywersyfikacja",
      desc: "Ekspozycja na amerykańskie korporacje z przychodami z różnych kontynentów. Drugie źródło dochodu obok lokalnych nieruchomości.",
    },
  ],
  howWeFilterTitle: "Jak filtrujemy",
  howWeFilterIntro:
    "Ze zbioru notowanych w USA spółek wypłacających dywidendy metodologia zawęża listę do wąskiej shortlisty według obiektywnych kryteriów.",
  howWeFilterMetrics: [
    { label: "Historia dywidend", desc: "Minimum 10 kolejnych lat wypłat; preferencja 25+ lat (Dividend Aristocrats)." },
    { label: "Payout ratio", desc: "Zrównoważony poziom względem zysku i wolnych przepływów." },
    { label: "Pokrycie z FCF", desc: "Dywidendy komfortowo pokryte z przepływów operacyjnych po capeksie." },
    { label: "Zadłużenie", desc: "Net debt / EBITDA oceniane względem norm sektora. Wysoka dźwignia wyłączana." },
    { label: "Stabilność zysków", desc: "Stabilność zysków przez cykl, nie tylko w szczycie." },
    { label: "Dyscyplina wyceny", desc: "Mnożniki oceniane względem historii i sektora — bez nadmiernie wycenionych nazw." },
    { label: "Dywersyfikacja sektorowa", desc: "Limity koncentracji sektorowej, by lista pozostała zdywersyfikowana." },
    { label: "Halal-aware exclusions", desc: "Sektorowe wyłączenia: alkohol, hazard, bankowość konwencjonalna, tytoń." },
  ],
  howWeFilterStat:
    "Z ~3 000 spółek dywidendowych w USA metodologia zawęża zwykle do ~40–80 nazwisk kwartalnie.",
  qualityFirstEyebrow: "Podejście Quality-First",
  qualityFirstTitle: "Sprawdzone spółki z udokumentowaną historią wypłat",
  qualityFirstBody:
    "Screening skupia się na spółkach z wieloletnią historią dywidend — biznesy ustabilizowane, generujące gotówkę, ze zdyscyplinowaną alokacją kapitału. Każda nazwa przechodzi 8-wymiarowy screen jakości finansowej. Nie zajmujemy się spekulacją ani niesprawdzonymi nazwami; research jest dla budowania dochodu w długim terminie, nie dla traderów.",
  qualityFirstBadges: [
    "Wieloletnie historie dywidend",
    "Wypłaty pokryte cash flow",
    "Konserwatywne bilanse",
    "Zdyscyplinowany screening",
  ],
  sampleResearchTitle: "Próbka researchu",
  sampleResearchIntro:
    "Poglądowy widok cotygodniowego researchu. Bieżące wartości pobierane są względem kryteriów screeningu.",
  sampleResearchHeaders: {
    symbol: "Symbol",
    company: "Spółka",
    yield: "Yield",
    growth5y: "Wzrost div. 5Y",
    payout: "Payout",
    quality: "Jakość",
  },
  sampleResearchDisclaimer:
    "Przykłady pokazane dla ilustracji metodologii. Nie są rekomendacją kupna ani sprzedaży. Wyniki historyczne nie gwarantują przyszłych.",
  comparisonTitle: "Koncentracja w nieruchomościach a globalna dywersyfikacja dywidendowa",
  comparisonIntro:
    "Nieruchomości pozostają sensowną klasą aktywów dla wielu inwestorów z Zatoki. Globalne spółki dywidendowe oferują uzupełniającą ekspozycję — nie zastępują nieruchomości.",
  comparisonLeft: "Koncentracja w nieruchomościach",
  comparisonRight: "Globalna dywersyfikacja dywidendowa",
  comparisonRows: [
    { dimension: "Kapitał początkowy", left: "Często 500 tys. – 2 mln+ AED", right: "Można zacząć od znacznie mniej" },
    { dimension: "Płynność", left: "Miesiące na wyjście z jednego aktywa", right: "Zwykle rozliczenie w dniach" },
    { dimension: "Ekspozycja geograficzna", left: "Skoncentrowana na jednym rynku", right: "Wielonarodowa, wieloregionalna" },
    { dimension: "Waluta", left: "Lokalna", right: "Głównie USD" },
    { dimension: "Obciążenie operacyjne", left: "Utrzymanie, najemcy, opłaty", right: "Pasywne trzymanie akcji" },
    { dimension: "Ryzyko koncentracji", left: "Jedno aktywo, jeden rynek", right: "Zdywersyfikowane po spółkach i sektorach" },
  ],
  comparisonNote:
    "To ilustracja. Obie klasy aktywów mają odrębne ryzyka, koszty i korzyści. Dywersyfikacja między nimi może być trwalsza niż koncentracja w jednej.",
  comparisonExampleEyebrow: "Konkretny przykład",
  comparisonExampleTitle: "Co może dać 1 500 000 AED",
  comparisonExampleCapital: "Kapitał startowy",
  comparisonExamplePropertyLabel: "Ścieżka nieruchomościowa",
  comparisonExamplePropertyDetail: "Mieszkanie za 1,5 mln AED · 4% yield z najmu",
  comparisonExamplePropertyValue: "60 000 AED / rok",
  comparisonExampleDividendLabel: "Ścieżka dywidendowa",
  comparisonExampleDividendDetail: "Ten sam kapitał · 10% docelowy yield",
  comparisonExampleDividendValue: "150 000 AED / rok",
  comparisonExampleDelta: "Różnica",
  comparisonExampleNote:
    "Wyłącznie ilustracja. Netto yield z najmu po opłatach (utrzymanie, pustostany, prowizje agencji, opłaty wspólnoty) jest zwykle niższy. Stopy dywidend nie są gwarantowane — mogą zostać obniżone lub zawieszone. Obie ścieżki niosą ryzyko, w tym utraty kapitału.",
  shariaTitle: "Halal-aware screening",
  shariaIntro:
    "Metodologia stosuje wyłączenia sektorowe respektujące zasady finansów islamskich. NIE ogłaszamy formalnej certyfikacji Sharia.",
  shariaBullets: [
    "Wyłączenia sektorowe: alkohol, tytoń, hazard, treści dla dorosłych, broń, konwencjonalna bankowość.",
    "Screening zadłużenia: spółki z nadmiernym oprocentowanym długiem są wyłączane.",
    "Czystość przychodów: biznesy z istotnymi pozaszariackimi liniami przychodów są oznaczane.",
    "Cykliczny przegląd: screeny stosowane co kwartał wraz ze zmianami struktur spółek.",
  ],
  shariaDisclaimer:
    "Halal-aware screening to dane wejściowe do researchu. NIE zastępuje opinii wykwalifikowanego uczonego Sharia. Końcowa ocena zgodności pozostaje Twoją odpowiedzialnością.",
  testimonialsTitle: "Co mówią inwestorzy",
  testimonials: [
    {
      quote:
        "Jakość researchu jest znacznie bardziej zdyscyplinowana niż typowe newslettery detaliczne. Wartościowa lektura dla profesjonalisty.",
      author: "Ahmed K.",
      location: "Dubaj",
      country: "AE",
    },
    {
      quote:
        "Pomocne ramy do zrozumienia dywidendowej dywersyfikacji globalnej — bez szumu treści tradingowych.",
      author: "Faisal A.",
      location: "Rijad",
      country: "SA",
    },
    {
      quote:
        "Chciałem ekspozycji poza lokalnym rynkiem nieruchomości bez spekulacyjnego tradingu. Ta usługa jest dokładnie pod to.",
      author: "Omar H.",
      location: "Doha",
      country: "QA",
    },
    {
      quote:
        "Cichy, dobrze ustrukturyzowany research. Halal-aware screening oszczędza krok, który musiałbym zrobić sam.",
      author: "Khalid M.",
      location: "Kuwejt",
      country: "KW",
    },
    {
      quote:
        "Czyta się jak notatkę z profesjonalnego desku researchowego, nie jak marketing. To samo w sobie zasługuje na uwagę.",
      author: "Youssef R.",
      location: "Kair",
      country: "EG",
    },
  ],
  chartTitle: "Ile może urosnąć 1 000 miesięcznie",
  chartIntro:
    "Pokrętła obok zmieniają wpłatę, oczekiwany yield i horyzont czasowy. To ilustracja procentu składanego — nie gwarancja zwrotu.",
  chartMonthly: "Wpłata miesięczna",
  chartYield: "Docelowy yield roczny",
  chartYears: "Lata",
  chartCurrency: "Waluta",
  chartFinal: "Wartość końcowa portfela",
  chartContributed: "Wpłacono łącznie",
  chartGrowth: "Zysk z procentu składanego",
  chartYearAxis: "Rok",
  chartDisclaimerNote:
    "Wyłącznie ilustracja. Zakłada stałe wpłaty i wybrany roczny zwrot reinwestowany. Rzeczywiste wyniki mogą się różnić.",
  chartCompareEyebrow: "Matematyka procentu składanego",
  chartCompareTitle: "Kilka punktów procentowych razy czas — to zmienia wszystko.",
  chartCompareIntro:
    "Ilustracja miesięcznego inwestowania przy różnych rocznych zwrotach. Im dłużej procent składany pracuje, tym większa różnica — i nie potrzebujesz dużego kapitału na start.",
  chartDividendYieldLabel: "Yield portfela dywidendowego %",
  chartRealEstateYieldLabel: "Yield nieruchomości %",
  chartDividendPathLabel: "Strategia dywidendowa",
  chartRealEstatePathLabel: "Baza nieruchomości",
  chartDifferenceLabel: "Różnica na końcu",
  chartFlexibilityNote:
    "Elastyczność ma znaczenie: możesz zacząć od skromnej kwoty, na przykład 2 000 AED / miesiąc. Czas i konsekwencja mają większe znaczenie niż wielkość pojedynczej wpłaty.",
  howTitle: "Jak to działa",
  howSteps: [
    {
      title: "Skanujemy amerykańskie spółki dywidendowe",
      desc: "System przegląda spółki z rynku USA pod kątem potencjału dochodowego, stabilności i atrakcyjnej wyceny.",
    },
    {
      title: "Co tydzień dostajesz typy",
      desc: "Wybraną listę okazji dywidendowych dostarczamy mailem co tydzień.",
    },
    {
      title: "Budujesz długoterminowy dochód",
      desc: "Zaczynasz z mniejszą kwotą niż przy nieruchomości i stopniowo budujesz zdywersyfikowany portfel dochodowy.",
    },
  ],
  faqTitle: "Pytania, które padają najczęściej",
  faq: [
    {
      q: "Czy to porada inwestycyjna?",
      a: "Nie. Platforma jest narzędziem researchu i screeningu. Publikuje treści edukacyjne i informacyjne. Żadna treść nie stanowi spersonalizowanej porady inwestycyjnej. Skonsultuj się z licencjonowanym doradcą w swojej jurysdykcji przed decyzjami inwestycyjnymi.",
    },
    {
      q: "Czy dywidendy są gwarantowane?",
      a: "Nie. Wypłaty dywidend to decyzja zarządu emitenta i mogą zostać obniżone lub zawieszone w dowolnym momencie. Research skupia się na spółkach o zdyscyplinowanej historii wypłat — ale żadna przyszła dywidenda nie jest gwarantowana.",
    },
    {
      q: "Ile pieniędzy potrzebuję na start?",
      a: "Po naszej stronie nie ma minimum — minima narzuca broker, z którego korzystasz. Wielu inwestorów zaczyna z istotnie mniejszym kapitałem niż wymagała by inwestycja w nieruchomość.",
    },
    {
      q: "Jakie rynki obejmujecie?",
      a: "Głównie spółki dywidendowe notowane w USA. Selektywne pokrycie międzynarodowych korporacji z szerokim geograficznym profilem przychodów.",
    },
    {
      q: "Dlaczego spółki dywidendowe?",
      a: "Spółki wypłacające dywidendy są zwykle bardziej dojrzałe, ze zdyscyplinowaną alokacją kapitału i niższą zmiennością niż szeroki rynek. Research koncentruje się na trwałej generacji dochodu w długim terminie.",
    },
    {
      q: "Dlaczego nie tylko nieruchomości?",
      a: "Nieruchomości pozostają sensowną klasą aktywów. Research pozycjonujemy jako uzupełniającą dywersyfikację — globalną, płynną i denominowaną w USD obok lokalnych nieruchomości.",
    },
    {
      q: "Czym jest halal-aware screening?",
      a: "Wyłączenia sektorowe respektujące zasady finansów islamskich (bez alkoholu, hazardu, tytoniu, konwencjonalnej bankowości itd.). To dane wejściowe do researchu — nie zastępują opinii wykwalifikowanego uczonego Sharia.",
    },
    {
      q: "Jak często są publikowane aktualizacje?",
      a: "Co tydzień. Każdy numer zawiera najnowszy wynik screeningu, notatki metodologiczne i kilka analiz na poziomie nazw.",
    },
    {
      q: "Czy mogę zrezygnować w każdej chwili?",
      a: "Tak. Rezygnacja z poziomu konta. Pierwsza płatność objęta 30-dniową gwarancją zwrotu.",
    },
    {
      q: "Czy to jest dla początkujących?",
      a: "Platforma jest pozycjonowana dla świadomych inwestorów i profesjonalistów. Treść jest dostępna, ale zakłada podstawową znajomość inwestowania w akcje.",
    },
  ],
  footerDisclaimer:
    "Inwestowanie wiąże się z ryzykiem, w tym możliwością utraty kapitału. Stopy dywidend nie są gwarantowane, a wyniki historyczne nie są gwarancją przyszłych. Platforma dostarcza wyłącznie treści edukacyjne i badawcze — nie jest licencjonowanym doradcą finansowym.",
  disclaimerWarningTitle: "TO NIE JEST PORADA INWESTYCYJNA",
  disclaimerParas: [
    "Treści publikowane na tej platformie mają charakter wyłącznie edukacyjny i informacyjny. NIE stanowią rekomendacji, oferty ani zachęty do kupna, sprzedaży lub zatrzymania jakichkolwiek instrumentów finansowych w rozumieniu Ustawy o obrocie instrumentami finansowymi, ani porady inwestycyjnej w rozumieniu MiFID II i przepisów KNF.",
    "Nie jesteśmy licencjonowanym doradcą inwestycyjnym, brokerem, dealerem, zarządzającym aktywami ani planistą finansowym. Nie świadczymy usług doradztwa inwestycyjnego wobec żadnego indywidualnego użytkownika. Żadne treści nie są dostosowane do Twojej sytuacji, celów, tolerancji ryzyka ani sytuacji finansowej.",
    "NIE zarządzamy Twoimi pieniędzmi, nie mamy dostępu do Twojego rachunku maklerskiego, nie składamy zleceń, nie rebalansujemy portfela, nie monitorujemy Twoich pozycji i nie decydujemy, co masz kupić lub sprzedać. Każdą decyzję inwestycyjną podejmujesz samodzielnie i ponosisz pełną odpowiedzialność za jej skutki.",
    "Inwestowanie w akcje wiąże się ze znacznym ryzykiem, w tym ryzykiem całkowitej utraty kapitału. Wypłaty dywidend NIE są gwarantowane i mogą zostać obniżone, zawieszone lub zlikwidowane przez emitentów w dowolnym momencie, bez uprzedzenia. Historyczne stopy dywidend, ceny akcji i wyniki nie są gwarancją przyszłych. Ryzyko walutowe, krajowe i podatkowe może dodatkowo wpłynąć na zwroty.",
    "Decyzje inwestycyjne podejmujesz wyłącznie na własną odpowiedzialność. Przed jakąkolwiek decyzją inwestycyjną skonsultuj się z licencjonowanym doradcą inwestycyjnym w swojej jurysdykcji. Od 1 stycznia 2026 r. obowiązujące przepisy w niektórych jurysdykcjach dalej ograniczają zakres dozwolonych treści edukacyjno-finansowych. Korzystając z platformy potwierdzasz, że wszystkie materiały mają charakter wyłącznie ogólnoedukacyjny i przyjmujesz pełną odpowiedzialność za jakiekolwiek działania podjęte na ich podstawie.",
  ],
  navTheCase: "Sprawa",
  navMethodology: "Metodologia",
  navSample: "Próbka",
  navMembership: "Członkostwo",
  navFaq: "FAQ",
  navStartCta: "Zacznij członkostwo",
  brandName: "Aristocrat",
  brandSub: "Dividend Research",
  problemEyebrow: "Pytanie o koncentrację",
  problemTitle: "Spora część majątku w regionie Zatoki tkwi w jednym miejscu.",
  problemIntro:
    "Nieruchomości budowały pokoleniami majątek w regionie — i wciąż są fundamentem dla wielu. Jednak portfel zakotwiczony w jednym aktywie, na jednym rynku, niesie kompromisy warte rozważenia.",
  problemCards: [
    {
      title: "Wysoki kapitał na start",
      desc: "Jedna nieruchomość często wymaga kapitału, który mógłby sfinansować zdywersyfikowaną pozycję w wielu spółkach.",
    },
    {
      title: "Brak płynności",
      desc: "Sprzedaż nieruchomości zajmuje miesiące i wymaga negocjacji. Wejście i wyjście z akcji jest zwykle dużo łatwiejsze.",
    },
    {
      title: "Ryzyko koncentracji",
      desc: "Jedna klasa aktywów, jedna geografia, jedna waluta. Dywersyfikacja po regionach i sektorach łagodzi ekspozycję na pojedynczy rynek.",
    },
    {
      title: "Obciążenie operacyjne",
      desc: "Najemcy, remonty, zarządzanie — wymagają uwagi. Posiadanie akcji ustabilizowanych spółek takich kosztów nie generuje.",
    },
  ],
  problemBridge:
    "Pytanie nie brzmi: nieruchomości czy akcje. Brzmi: czy globalnie zdywersyfikowane spółki dochodowe pasują obok tego, co już masz — dokładając płynność, ekspozycję walutową i zasięg.",
  pricingEyebrow: "Członkostwo",
  pricingPageTitle: "Jedna platforma. Wybierz swój rytm.",
  pricingPageIntro:
    "Każdy plan zawiera pełen dostęp do researchu, cotygodniowe aktualizacje, bibliotekę screeningu i wsparcie po arabsku. Rezygnacja w każdej chwili.",
  pricingMonthlyLabel: "Miesięcznie",
  pricingAnnualLabel: "Rocznie",
  pricingBestValueBadge: "Najlepsza wartość · Oszczędź 30%",
  pricingPerMonth: "/mies.",
  pricingPerYear: "/rok",
  pricingStartMonthly: "Zacznij miesięcznie",
  pricingStartAnnual: "Zacznij rocznie",
  pricingMonthlyFeatures: [
    "Pełny dostęp do biblioteki researchu",
    "Cotygodniowe aktualizacje",
    "Widoki halal-aware screening",
    "Wsparcie po arabsku i angielsku",
  ],
  pricingAnnualFeatures: [
    "Wszystko z planu miesięcznego",
    "Dwa miesiące gratis względem miesięcznego",
    "Kwartalne raporty deep-dive",
    "Priorytet w zgłoszeniach do researchu",
  ],
  pricingPaymentsNote:
    "30-dniowa gwarancja zwrotu · Rezygnacja w każdej chwili · Możliwa rozliczanie w walucie lokalnej.",
  finalEyebrow: "Zaczynamy",
  finalTitle: "Sięgnij po dywidendowy research w stylu instytucjonalnym.",
  finalIntro:
    "Zacznij od próbki, poznaj metodologię i zdecyduj samodzielnie. Wszystko z 30-dniową gwarancją zwrotu.",
  footerBrandTagline:
    "Premium research inwestycyjny skupiony na dochodzie, dla świadomych inwestorów z regionu GCC. Research i screening edukacyjny — nie porada inwestycyjna.",
  footerColPlatform: "Platforma",
  footerColCompany: "Spółka",
  footerColLegal: "Aspekty prawne",
  footerLinks: {
    platform: ["Metodologia", "Próbka", "Halal-Aware Filtering", "Członkostwo"],
    company: ["O nas", "FAQ", "Kontakt", "Wsparcie arabskie"],
    legal: ["Regulamin", "Polityka prywatności", "Oświadczenie o ryzyku", "Polityka zwrotów"],
  },
  footerCopyright: "© 2026 Aristocrat Dividend Research. Wszelkie prawa zastrzeżone.",
  footerLocale: "Stworzone dla inwestorów GCC · Dostępne w العربية i English",
  title: "Spółki dywidendowe",
  subtitle: "Aktywnie notowane spółki wypłacające dywidendę. Źródło: api.quantjourney.cloud",
  source: "api.quantjourney.cloud",
  loadingBase: "ładuję bazę…",
  shown: (a, b) => `${a} wyświetlonych / ${b} pobranych`,
  enriching: "wzbogacam dane historyczne…",
  enrichedOf: (a, b) => `${a} z ${b} wzbogaconych`,
  cacheFresh: "świeżo z API",
  cacheAge: s => `cache: ${s}`,
  search: "Szukaj",
  searchPh: "symbol, nazwa, branża",
  sector: "Sektor",
  allSectors: "Wszystkie",
  minDividend: "Min. dywidenda $/akcję",
  fetchCount: "Pobierz",
  enrichTopN: "Wzbogać top N",
  showFunds: "Pokaż fundy i ETF-y",
  refresh: "Odśwież",
  loading: "Ładuję…",
  clearCache: "Wyczyść cache",
  noResults: "Brak wyników",
  thSymbol: "Symbol",
  thName: "Nazwa",
  thSector: "Sektor",
  thPrice: "Cena",
  thYtd: "YTD",
  thOneY: "1Y",
  thAnnualDiv: "Dywid./rok",
  thProjYield: "Yield proj.",
  thYearsPaid: "Lata płac.",
  thConfidence: "Pewność",
  thTotal5y: "Suma 5y",
  thMarketCap: "Mkt cap",
  footer:
    "Pewność = 50% · lata_z_dywidendą/5 + 30% · brak_cięcia_YoY + 20% · wzrost_YoY. Yield proj. = ostatnia roczna dywidenda / aktualna cena. Suma 5y = łączna wypłata dywidend w ostatnich 5 latach (z cash flow).",
  subTitle: "Cotygodniowy newsletter",
  subDesc: "Zapisz się, by raz w tygodniu dostać top 10 najlepszych spółek dywidendowych.",
  subEmail: "Email",
  subLang: "Język",
  subSubmit: "Zapisz się",
  subSubmitting: "Zapisuję…",
  subSuccess: "Zapisano. Otrzymasz najbliższy tygodniowy raport na maila.",
  subError: "Nie udało się zapisać — spróbuj ponownie.",
  subInvalid: "Podaj prawidłowy adres email.",
  digestSubject: d => `Top 10 spółek dywidendowych — ${d}`,
  digestIntro: "Twoje cotygodniowe wybory, ranking po stabilności wypłat i prognozowanym yieldzie:",
  digestRank: "Pozycja",
  digestUnsubscribe: "Wypisz się",
};

const ar: Dict = {
  heroHeadline: "ابنِ مصدر دخل ثانٍ — إلى جانب عقارك",
  heroSubheadline:
    "أبحاث عن شركات أمريكية راسخة موزّعة لأرباح، لمستثمري الخليج. رأس مال ابتدائي أقل من دفعة أولى للعقار — مع إمكانية دخل متكرر أعلى من عائد الإيجار النموذجي، وسيولة كاملة.",
  pricingLine: "ضمان استرداد المال خلال 30 يومًا · إلغاء في أي وقت",
  pricingCta: "شاهد أبحاث هذا الأسبوع",
  heroCtaSecondary: "كيف نفحص الشركات",
  trustStripLabel: "يستخدمها مستثمرون من",
  trustStripCountries: "السعودية • الإمارات • قطر • الكويت • البحرين • مصر",
  trustStripPoints: [
    "منهجية مؤسسية منضبطة",
    "فحص متوافق مع الحلال",
    "تسعير بعملات متعددة (SAR, AED, QAR, KWD, USD)",
    "إلغاء في أي وقت",
  ],
  trustBar: [
    "ضمان استرداد المال خلال 30 يومًا",
    "إلغاء في أي وقت",
    "دفع آمن بالبطاقة",
    "دعم بالعربية والإنجليزية",
  ],
  whyTitle: "لماذا شركات توزيعات الأرباح",
  whyIntro:
    "شركات مالياً متينة بسجل عقود من دفع — وزيادة — توزيعات الأرباح. يتركز البحث على الشركات المبنية للمدى الطويل.",
  whyCards: [
    {
      title: "تاريخ توزيعات الأرباح",
      desc: "شركات بسجل 10+، 25+، و50+ سنة من توزيعات متتالية. التاريخ الطويل مؤشر على تخصيص رأس المال المنضبط.",
    },
    {
      title: "التدفق النقدي الحر",
      desc: "نبحث عن أعمال تموّل توزيعاتها من التدفق النقدي — لا من هندسة الميزانية أو الديون.",
    },
    {
      title: "انضباط نسبة التوزيع",
      desc: "نسب توزيع مستدامة مع مجال للنمو. النسب المرتفعة جدًا علامة تحذير لا قوة.",
    },
    {
      title: "قوة الميزانية العمومية",
      desc: "ديون محافظة، تغطية فوائد، جودة ائتمانية. الميزانيات القوية تتحمل الانكماشات دون قطع توزيعات الأرباح.",
    },
    {
      title: "تنويع عالمي",
      desc: "تعرّض لشركات أمريكية متعددة الجنسيات بإيرادات عبر القارات. مصدر دخل ثانٍ إلى جانب التعرض العقاري المحلي.",
    },
  ],
  howWeFilterTitle: "كيف نفحص",
  howWeFilterIntro:
    "من بين كل الشركات الأمريكية الموزعة لأرباح، تضيق المنهجية القائمة إلى قائمة قصيرة وفق معايير موضوعية.",
  howWeFilterMetrics: [
    { label: "تاريخ التوزيعات", desc: "10 سنوات متتالية على الأقل؛ تفضيل 25+ سنة (Dividend Aristocrats)." },
    { label: "نسبة التوزيع", desc: "مستوى مستدام نسبة إلى الأرباح والتدفق النقدي الحر." },
    { label: "تغطية FCF", desc: "توزيعات مغطاة بشكل مريح من التدفق التشغيلي بعد المصاريف الرأسمالية." },
    { label: "الرافعة المالية", desc: "صافي الدين / EBITDA يُقيَّم مقابل معايير القطاع. الرافعة العالية مستبعدة." },
    { label: "ثبات الأرباح", desc: "ثبات الأرباح عبر الدورات، لا فقط في سنوات الذروة." },
    { label: "انضباط التقييم", desc: "تقييم المضاعفات مقابل النطاقات التاريخية ونظرائها — لا أسماء بأسعار مبالغ فيها." },
    { label: "تنويع القطاعات", desc: "حدود تركيز عبر القطاعات للحفاظ على تنوع قائمة المراقبة." },
    { label: "استبعادات متوافقة مع الحلال", desc: "استبعادات قطاعية للكحول والقمار والبنوك التقليدية والتبغ." },
  ],
  howWeFilterStat:
    "من ~3,000 شركة موزعة لأرباح في السوق الأمريكي، تضيق المنهجية عادةً إلى ~40–80 اسمًا كل ربع سنة.",
  qualityFirstEyebrow: "منهج الجودة أولاً",
  qualityFirstTitle: "شركات راسخة بسجل دفع موثّق",
  qualityFirstBody:
    "يركّز الفحص على شركات بسجل توزيعات يمتدّ لعقود — شركات راسخة ومولّدة للنقد بتخصيص منضبط لرأس المال. كلّ اسم يجتاز فحص جودة مالية من 8 أبعاد. لا نسعى للمضاربة أو لأسماء غير مثبتة؛ الأبحاث موجّهة لبناء دخل طويل الأجل، لا للتداول.",
  qualityFirstBadges: [
    "سجل توزيعات عبر عقود",
    "توزيعات مدفوعة من التدفق النقدي",
    "ميزانيات محافظة",
    "فحص منضبط",
  ],
  sampleResearchTitle: "معاينة الأبحاث",
  sampleResearchIntro:
    "عرض توضيحي لكيفية ظهور الأبحاث الأسبوعية. تُحدَّث القيم الحية مقابل معايير الفحص.",
  sampleResearchHeaders: {
    symbol: "الرمز",
    company: "الشركة",
    yield: "العائد",
    growth5y: "نمو التوزيعات 5 سنوات",
    payout: "نسبة التوزيع",
    quality: "الجودة",
  },
  sampleResearchDisclaimer:
    "أمثلة لتوضيح المنهجية. ليست توصيات شراء أو بيع. الأداء السابق لا يدل على النتائج المستقبلية.",
  comparisonTitle: "تركّز عقاري مقابل تنويع توزيعات أرباح عالمي",
  comparisonIntro:
    "تبقى العقارات فئة أصول مهمة لكثير من مستثمري الخليج. تُقدّم شركات توزيعات الأرباح العالمية تعرّضًا مكمّلًا — لا بديلًا.",
  comparisonLeft: "تركّز عقاري",
  comparisonRight: "تنويع توزيعات أرباح عالمي",
  comparisonRows: [
    { dimension: "رأس المال الابتدائي", left: "غالبًا 500 ألف – 2 مليون+ درهم", right: "يمكن البدء بمبلغ أقل بكثير" },
    { dimension: "السيولة", left: "أشهر للخروج من أصل واحد", right: "تسوية عادةً خلال أيام" },
    { dimension: "التعرّض الجغرافي", left: "تركيز في سوق واحد", right: "متعدد الجنسيات، متعدد المناطق" },
    { dimension: "العملة", left: "العملة المحلية", right: "بالدولار أساسًا" },
    { dimension: "العبء التشغيلي", left: "صيانة، مستأجرون، رسوم", right: "احتفاظ سلبي بالأسهم" },
    { dimension: "مخاطر التركيز", left: "أصل واحد، سوق واحد", right: "متنوع عبر شركات وقطاعات" },
  ],
  comparisonNote:
    "هذا للتوضيح. لكلتا فئتي الأصول مخاطرها وتكاليفها وفوائدها. التنويع بينهما قد يكون أكثر متانة من التركز في واحدة.",
  comparisonExampleEyebrow: "مثال ملموس",
  comparisonExampleTitle: "ماذا قد يعني 1,500,000 درهم",
  comparisonExampleCapital: "رأس المال الابتدائي",
  comparisonExamplePropertyLabel: "مسار العقار",
  comparisonExamplePropertyDetail: "شقة بـ 1.5 مليون درهم · عائد إيجار 4%",
  comparisonExamplePropertyValue: "60,000 درهم / سنة",
  comparisonExampleDividendLabel: "مسار توزيعات الأرباح",
  comparisonExampleDividendDetail: "نفس رأس المال · 10% عائد مستهدف",
  comparisonExampleDividendValue: "150,000 درهم / سنة",
  comparisonExampleDelta: "الفرق",
  comparisonExampleNote:
    "للتوضيح فقط. صافي عائد الإيجار بعد الصيانة، الفترات الفارغة، عمولات الوكلاء ورسوم الخدمة يكون عادةً أقل. عوائد توزيعات الأرباح ليست مضمونة وقد تُخفض أو تُعلَّق. كلا المسارين ينطوي على مخاطر، بما فيها خسارة رأس المال.",
  shariaTitle: "فحص متوافق مع الحلال",
  shariaIntro:
    "تطبّق منهجية البحث استبعادات قطاعية مصممة لاحترام مبادئ التمويل الإسلامي. لا نزعم شهادة شرعية رسمية.",
  shariaBullets: [
    "استبعادات قطاعية: الكحول، التبغ، القمار، ترفيه البالغين، الأسلحة، البنوك التقليدية.",
    "فحص الرافعة: تُستبعد الشركات ذات الديون المتراكمة المفرطة.",
    "نقاء الإيرادات: تُعلَّم الأعمال ذات خطوط إيرادات غير مسموح بها.",
    "مراجعة دورية: تُعاد تطبيق الفحوصات كل ربع سنة مع تطور هياكل الشركات.",
  ],
  shariaDisclaimer:
    "الفحص المتوافق مع الحلال مُدخل بحثي. ليس بديلًا عن إرشاد عالم شرعي مؤهل. التقييم النهائي للامتثال يقع على عاتقك.",
  testimonialsTitle: "ماذا يقول المستثمرون",
  testimonials: [
    {
      quote:
        "جودة الأبحاث أكثر انضباطًا بكثير من النشرات الإخبارية للأفراد. مفيدة لقارئ محترف.",
      author: "أحمد ك.",
      location: "دبي",
      country: "AE",
    },
    {
      quote:
        "إطار مفيد لفهم التنويع العالمي القائم على توزيعات الأرباح — دون ضجيج محتوى التداول.",
      author: "فيصل ع.",
      location: "الرياض",
      country: "SA",
    },
    {
      quote:
        "أردت تعرّضًا خارج أسواق العقارات المحلية دون تداول مضارب. هذه الخدمة موضوعة بالضبط لهذا الغرض.",
      author: "عمر ح.",
      location: "الدوحة",
      country: "QA",
    },
    {
      quote:
        "أبحاث هادئة ومنظمة جيدًا. الفحص المتوافق مع الحلال يوفر خطوة كنت سأقوم بها بنفسي.",
      author: "خالد م.",
      location: "مدينة الكويت",
      country: "KW",
    },
    {
      quote:
        "يُقرأ كملاحظة من مكتب أبحاث محترف، لا كتسويق. هذا وحده يستحق الوقت والاهتمام.",
      author: "يوسف ر.",
      location: "القاهرة",
      country: "EG",
    },
  ],
  chartTitle: "إلى أين قد تصل 1000 شهريًا",
  chartIntro:
    "اضبط المساهمة الشهرية والعائد المستهدف والمدة الزمنية. هذا توضيح للفائدة المركبة — وليس ضمانًا للعائد.",
  chartMonthly: "المساهمة الشهرية",
  chartYield: "العائد السنوي المستهدف",
  chartYears: "السنوات",
  chartCurrency: "العملة",
  chartFinal: "القيمة النهائية للمحفظة",
  chartContributed: "إجمالي المساهمات",
  chartGrowth: "النمو من الفائدة المركبة",
  chartYearAxis: "السنة",
  chartDisclaimerNote:
    "للتوضيح فقط. يفترض مساهمات شهرية ثابتة وإعادة استثمار العائد المختار. النتائج الفعلية قد تختلف.",
  chartCompareEyebrow: "حسابات الفائدة المركبة",
  chartCompareTitle: "نقاط مئوية قليلة، مضروبة في الزمن، تُغيّر كلّ شيء.",
  chartCompareIntro:
    "محاكاة للاستثمار الشهري عند عوائد سنوية مختلفة. كلّما طالت فترة تراكم الفائدة المركبة، اتسعت الفجوة — ولا تحتاج إلى رأس مال كبير في البداية.",
  chartDividendYieldLabel: "% عائد محفظة التوزيعات",
  chartRealEstateYieldLabel: "% عائد العقارات",
  chartDividendPathLabel: "استراتيجية التوزيعات",
  chartRealEstatePathLabel: "خط الأساس العقاري",
  chartDifferenceLabel: "الفرق في النهاية",
  chartFlexibilityNote:
    "المرونة مهمّة: يمكنك البدء بمبلغ متواضع مثل 2,000 درهم شهريًا. الوقت والاستمرارية أهمّ من حجم أي مساهمة منفردة.",
  howTitle: "كيف تعمل المنصة",
  howSteps: [
    {
      title: "نفحص أسهم توزيعات الأرباح الأمريكية",
      desc: "يفحص نظامنا الشركات الموزّعة للأرباح في السوق الأمريكي بحثًا عن إمكانات الدخل والاستقرار والتقييمات الجذابة.",
    },
    {
      title: "تتلقى الاختيارات أسبوعيًا",
      desc: "كل أسبوع تحصل على قائمة منسقة من فرص توزيعات الأرباح مباشرة عبر البريد الإلكتروني.",
    },
    {
      title: "ابنِ دخلًا طويل الأجل",
      desc: "ابدأ بمبلغ أقل من الاستثمار العقاري وابنِ تدريجيًا محفظة متنوعة مصممة للدخل المتكرر.",
    },
  ],
  faqTitle: "أسئلة المستثمرين",
  faq: [
    {
      q: "هل هذه استشارة استثمارية؟",
      a: "لا. المنصة أداة أبحاث وفحص. تنشر محتوى تعليمي وإعلامي فقط. لا شيء هنا يُشكّل استشارة استثمارية شخصية. يُرجى استشارة مستشار مرخص في منطقتك قبل اتخاذ قرارات استثمارية.",
    },
    {
      q: "هل توزيعات الأرباح مضمونة؟",
      a: "لا. توزيعات الأرباح قرارات مجلس إدارة الشركة المُصدِرة ويمكن تخفيضها أو تعليقها في أي وقت. تركز الأبحاث على شركات ذات سجل منضبط — لكن لا يوجد ضمان لأي توزيع مستقبلي.",
    },
    {
      q: "كم من المال أحتاج للبدء؟",
      a: "لا حد أدنى من جانبنا — يحدد الوسيط الذي تستخدمه الحد الأدنى. يبدأ كثير من المستثمرين برأس مال أقل بكثير مما يتطلبه الاستثمار العقاري.",
    },
    {
      q: "ما الأسواق التي تغطونها؟",
      a: "بشكل أساسي الشركات الأمريكية الموزعة لأرباح. تغطية انتقائية للشركات متعددة الجنسيات ذات الإيرادات الواسعة جغرافيًا.",
    },
    {
      q: "لماذا شركات توزيعات الأرباح؟",
      a: "تميل شركات توزيعات الأرباح إلى أن تكون أكثر نضجًا، بتخصيص رأس مال منضبط وتقلب أقل من السوق الواسع. التركيز البحثي على توليد دخل دائم طويل الأجل.",
    },
    {
      q: "لماذا لا العقارات فقط؟",
      a: "تبقى العقارات فئة أصول مهمة. الأبحاث موضوعة كتنويع مكمّل — تعرّض عالمي وسائل ومُسعَّر بالدولار إلى جانب العقارات المحلية.",
    },
    {
      q: "ما الفحص المتوافق مع الحلال؟",
      a: "استبعادات قطاعية مصممة لاحترام مبادئ التمويل الإسلامي (لا كحول، قمار، تبغ، بنوك تقليدية، إلخ). هذا مُدخل بحثي — لا يُعد بديلًا عن إرشاد عالم شرعي مؤهل.",
    },
    {
      q: "ما تكرار نشر التحديثات؟",
      a: "أسبوعيًا. يتضمن كل عدد أحدث مخرجات الفحص وملاحظات منهجية وعددًا قليلًا من التحليلات على مستوى الأسماء.",
    },
    {
      q: "هل يمكنني الإلغاء في أي وقت؟",
      a: "نعم. الإلغاء من الحساب في أي وقت. ضمان استرداد المال لمدة 30 يومًا يطبق على أول دفعة لك.",
    },
    {
      q: "هل هذه مناسبة للمبتدئين؟",
      a: "المنصة موجهة للمستثمرين المتمرسين والمحترفين. المحتوى متاح لكن يفترض إلمامًا أساسيًا بالاستثمار في الأسهم.",
    },
  ],
  footerDisclaimer:
    "الاستثمار ينطوي على مخاطر، بما في ذلك احتمال خسارة رأس المال. عوائد توزيعات الأرباح غير مضمونة والأداء السابق لا يضمن نتائج مستقبلية. تقدم المنصة أبحاثًا ومحتوى تعليميًا فقط، وليست مستشارًا ماليًا مرخصًا.",
  disclaimerWarningTitle: "هذه ليست استشارة استثمارية",
  disclaimerParas: [
    "المعلومات المنشورة على هذه المنصة مقدمة حصريًا لأغراض تعليمية ومعلوماتية. وهي ليست توصية أو دعوة أو عرضًا لشراء أو بيع أو الاحتفاظ بأي أداة مالية. لا يشكل أي محتوى استشارة استثمارية بمفهوم MiFID II أو أي لائحة وطنية مطبقة.",
    "نحن لسنا مستشارًا استثماريًا مرخصًا أو وسيطًا أو تاجرًا أو مدير أصول أو مخططًا ماليًا. ليس لدينا أي علاقة فردية مع المستخدمين تشكل خدمات استشارية استثمارية. لا يوجد محتوى مخصص لوضعك أو أهدافك أو تحمّلك للمخاطر أو ظروفك المالية.",
    "نحن لا ندير أموالك، ولا ندخل إلى حساب الوساطة الخاص بك، ولا نضع الأوامر، ولا نعيد موازنة المحافظ، ولا نراقب ممتلكاتك، ولا نقرر ما يجب عليك شراؤه أو بيعه. أنت تتخذ كل قرار استثماري بنفسك وتتحمل المسؤولية الكاملة عن نتائجه.",
    "الاستثمار في الأسهم ينطوي على مخاطر كبيرة، بما في ذلك خطر الخسارة الكاملة لرأس المال. توزيعات الأرباح غير مضمونة وقد يتم تخفيضها أو تعليقها أو إلغاؤها من قبل الجهات المصدرة في أي وقت دون إشعار. الأداء السابق وأسعار الأسهم والعوائد ليست مؤشرًا على النتائج المستقبلية. قد تؤثر مخاطر العملة والدولة والضرائب على عائداتك أيضًا.",
    "أنت وحدك مسؤول عن قراراتك الاستثمارية. يجب عليك استشارة مستشار مالي مرخص في منطقتك القضائية قبل اتخاذ أي قرار استثماري. اعتبارًا من 1 يناير 2026، تقيد اللوائح المعمول بها في بعض الولايات القضائية نطاق المحتوى التعليمي المالي المسموح به. باستخدامك لهذه المنصة، فإنك تقر بأن جميع المواد ذات طابع تعليمي عام فقط وتتحمل المسؤولية الكاملة عن أي إجراء تتخذه بناءً عليها.",
  ],
  navTheCase: "الفكرة",
  navMethodology: "المنهجية",
  navSample: "نموذج الأبحاث",
  navMembership: "العضوية",
  navFaq: "الأسئلة",
  navStartCta: "ابدأ العضوية",
  brandName: "Aristocrat",
  brandSub: "أبحاث توزيعات الأرباح",
  problemEyebrow: "مسألة التركيز",
  problemTitle: "جزء كبير من ثروات الخليج يتركّز في مكان واحد.",
  problemIntro:
    "بنى العقار أجيالاً من الثروة في المنطقة — ويبقى ركيزة للكثيرين. لكن محفظة مرتكزة على أصل واحد، في سوق واحد، تنطوي على مفاضلات تستحقّ التأمّل.",
  problemCards: [
    {
      title: "رأس مال أوّلي مرتفع",
      desc: "غالباً ما يتطلّب عقار واحد رأس مالٍ كان يمكن أن يموّل مراكز متنوّعة عبر شركات عديدة.",
    },
    {
      title: "ضعف السيولة",
      desc: "بيع العقار يستغرق وقتاً وتفاوضاً. أمّا الشركات المدرجة فيمكن عادةً الدخول إليها والخروج منها بسهولة أكبر.",
    },
    {
      title: "مخاطر التركيز",
      desc: "فئة أصول واحدة، جغرافيا واحدة، عملة واحدة. التنويع عبر المناطق والقطاعات قد يخفّف التعرّض لسوق واحد.",
    },
    {
      title: "عبء التشغيل",
      desc: "المستأجرون والصيانة والإدارة تتطلّب اهتماماً. أمّا امتلاك أسهم في شركات راسخة فلا يحمل هذا العبء.",
    },
  ],
  problemBridge:
    "السؤال ليس العقار أو الأسهم. بل هل تستحقّ الشركات العالمية المنوّعة المدرّة للدخل أن تكون إلى جانب ما تملكه — لتضيف سيولة وتنويعاً للعملة واتساعاً.",
  pricingEyebrow: "العضوية",
  pricingPageTitle: "منصة واحدة. اختر إيقاعك.",
  pricingPageIntro:
    "كلّ خطة تشمل وصولاً كاملاً للأبحاث، وتحديثات أسبوعية، ومكتبة الفحص، ودعماً بالعربية. ألغِ في أيّ وقت.",
  pricingMonthlyLabel: "شهري",
  pricingAnnualLabel: "سنوي",
  pricingBestValueBadge: "الأفضل قيمةً · وفّر 30%",
  pricingPerMonth: "/شهر",
  pricingPerYear: "/سنة",
  pricingStartMonthly: "ابدأ شهرياً",
  pricingStartAnnual: "ابدأ سنوياً",
  pricingMonthlyFeatures: [
    "وصول كامل لمكتبة الأبحاث",
    "تحديثات أسبوعية للأبحاث",
    "عروض الفحص المراعي للضوابط",
    "دعم بالعربية والإنجليزية",
  ],
  pricingAnnualFeatures: [
    "كلّ ما في الخطة الشهرية",
    "شهران مجاناً مقابل الشهري",
    "تقارير معمّقة فصلية",
    "أولوية في طلبات الأبحاث",
  ],
  pricingPaymentsNote:
    "ضمان استرداد المال لمدة 30 يومًا · إلغاء في أي وقت · فوترة بالعملة المحلية متاحة.",
  finalEyebrow: "ابدأ",
  finalTitle: "احصل على ذكاء توزيعات الأرباح بأسلوب مؤسّسي.",
  finalIntro:
    "ابدأ بنموذج الأبحاث، استكشف المنهجية، وقرّر بنفسك. مدعوماً بضمان استرداد المال خلال 30 يومًا.",
  footerBrandTagline:
    "أبحاث استثمارية متميّزة ومُركّزة على الدخل لمستثمرين متمرّسين في دول الخليج. أبحاث وفحص تعليمي — وليست نصيحة استثمارية.",
  footerColPlatform: "المنصة",
  footerColCompany: "الشركة",
  footerColLegal: "قانوني",
  footerLinks: {
    platform: ["المنهجية", "نموذج الأبحاث", "الفحص الشرعي", "العضوية"],
    company: ["عن المنصة", "الأسئلة الشائعة", "تواصل معنا", "الدعم بالعربية"],
    legal: ["شروط الخدمة", "سياسة الخصوصية", "بيان المخاطر", "سياسة الاسترداد"],
  },
  footerCopyright: "© 2026 Aristocrat Dividend Research. جميع الحقوق محفوظة.",
  footerLocale: "صُمِّم لمستثمري الخليج · متوفّر بالعربية والإنجليزية",
  title: "شركات توزيع الأرباح",
  subtitle: "جميع الشركات النشطة التي توزع أرباحًا. المصدر: api.quantjourney.cloud",
  source: "api.quantjourney.cloud",
  loadingBase: "جارٍ التحميل…",
  shown: (a, b) => `${a} معروضة / ${b} تم تحميلها`,
  enriching: "جارٍ إثراء البيانات التاريخية…",
  enrichedOf: (a, b) => `تم إثراء ${a} من ${b}`,
  cacheFresh: "بيانات جديدة من واجهة برمجة التطبيقات",
  cacheAge: s => `الذاكرة المؤقتة: ${s}`,
  search: "بحث",
  searchPh: "الرمز، الاسم، الصناعة",
  sector: "القطاع",
  allSectors: "الكل",
  minDividend: "أدنى توزيع أرباح $/سهم",
  fetchCount: "اجلب",
  enrichTopN: "إثراء أعلى N",
  showFunds: "إظهار الصناديق و ETF",
  refresh: "تحديث",
  loading: "جارٍ التحميل…",
  clearCache: "مسح الذاكرة المؤقتة",
  noResults: "لا توجد نتائج",
  thSymbol: "الرمز",
  thName: "الاسم",
  thSector: "القطاع",
  thPrice: "السعر",
  thYtd: "منذ بداية السنة",
  thOneY: "سنة",
  thAnnualDiv: "التوزيع السنوي",
  thProjYield: "العائد المتوقع",
  thYearsPaid: "سنوات الدفع",
  thConfidence: "الثقة",
  thTotal5y: "إجمالي 5 سنوات",
  thMarketCap: "القيمة السوقية",
  footer:
    "الثقة = 50% · سنوات_الدفع/5 + 30% · بدون_خفض_سنوي + 20% · النمو_السنوي. العائد المتوقع = آخر توزيع سنوي / السعر الحالي. إجمالي 5 سنوات = مجموع توزيعات الأرباح خلال آخر 5 سنوات.",
  subTitle: "النشرة الأسبوعية",
  subDesc: "اشترك لتلقي أفضل 10 شركات توزيع أرباح أسبوعيًا.",
  subEmail: "البريد الإلكتروني",
  subLang: "اللغة",
  subSubmit: "اشترك",
  subSubmitting: "جارٍ الاشتراك…",
  subSuccess: "تم الاشتراك. ستتلقى التقرير الأسبوعي التالي عبر البريد الإلكتروني.",
  subError: "تعذر الاشتراك — حاول مرة أخرى.",
  subInvalid: "الرجاء إدخال بريد إلكتروني صحيح.",
  digestSubject: d => `أفضل 10 شركات توزيع أرباح — ${d}`,
  digestIntro: "اختياراتك الأسبوعية، مرتبة حسب استقرار الدفع والعائد المتوقع:",
  digestRank: "المرتبة",
  digestUnsubscribe: "إلغاء الاشتراك",
};

export const DICTS: Record<Lang, Dict> = { en, pl, ar };

export const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "en",
  setLang: () => {},
  t: en,
});

export function useT() {
  return useContext(LangCtx);
}

export function dirOf(lang: Lang): "ltr" | "rtl" {
  return LANGS.find(l => l.code === lang)?.dir ?? "ltr";
}

import type { Lang } from "./i18n";

export type GuideSlug = "uae" | "saudi-arabia" | "qatar" | "kuwait" | "bahrain" | "oman" | "egypt";

export type GuideCountry = {
  slug: GuideSlug;
  flag: string;
  currency: string;
  names: Record<Lang, string>;
  teaser: Record<Lang, string>;
  exampleCapital: string;
  simulation: {
    start: number;
    monthly: number;
    grossYieldPct: number;
    withholdingPct: number;
    years: number;
  };
};

export type GuideCopy = {
  stripEyebrow: string;
  stripTitle: string;
  stripIntro: string;
  stripCta: string;
  indexTitle: string;
  indexIntro: string;
  pageEyebrow: string;
  residentLabel: string;
  currencyLabel: string;
  exampleLabel: string;
  overviewTitle: string;
  practicalTitle: string;
  whatYouNeedTitle: string;
  sampleTitle: string;
  sampleIntro: string;
  simulationTitle: string;
  simulationIntro: string;
  simulationStart: string;
  simulationMonthly: string;
  simulationYield: string;
  simulationAddedCapital: string;
  simulationNetDividends: string;
  simulationFinalValue: string;
  simulationDisclaimer: string;
  reportPreviewTitle: string;
  reportPreviewIntro: string;
  reportPreviewMetrics: { label: string; value: string; note: string }[];
  highYieldTitle: string;
  highYieldIntro: string;
  highYieldPoints: { title: string; body: string }[];
  shariaTitle: string;
  shariaIntro: string;
  shariaPoints: { title: string; body: string }[];
  researchTitle: string;
  riskTitle: string;
  backLabel: string;
  methodologyCta: string;
  sampleCta: string;
  membershipCta: string;
  disclaimer: string;
};

export type GuidePageContent = {
  headline: string;
  intro: string;
  overview: string[];
  practical: { title: string; body: string }[];
  needs: { title: string; body: string }[];
  sample: { label: string; value: string; note: string }[];
  research: string[];
  risks: string[];
};

type LocalNetArgs = {
  start: string;
  yieldPct: string;
  gross: string;
  withheld: string;
  net: string;
  withholdingPct: string;
};

type SmallerStartArgs = {
  capital: string;
  monthly: string;
};

export type GuideQuestionCopy = {
  title: string;
  intro: string;
  w8benTitle: string;
  w8benBody: string;
  withholdingTitle: string;
  withholdingBody: string;
  brokerTitle: string;
  brokerBody: string;
  propertyTitle: string;
  propertyBody: string;
  halalTitle: string;
  halalBody: string;
  localNetTitle: string;
  localNetBody: (args: LocalNetArgs) => string;
  smallerStartTitle: string;
  smallerStartBody: (args: SmallerStartArgs) => string;
  taxNote: string;
};

export const GUIDE_COUNTRIES: GuideCountry[] = [
  {
    slug: "uae",
    flag: "🇦🇪",
    currency: "AED",
    names: { en: "UAE", pl: "ZEA", ar: "الإمارات" },
    teaser: {
      en: "AED, Dubai real-estate comparison, broker access and USD dividend income.",
      pl: "AED, porównanie z nieruchomościami w Dubaju, broker i dochód w USD.",
      ar: "الدرهم، مقارنة بعقار دبي، الوصول للوسيط ودخل توزيعات بالدولار.",
    },
    exampleCapital: "AED 50,000",
    simulation: { start: 50000, monthly: 5000, grossYieldPct: 5, withholdingPct: 30, years: 10 },
  },
  {
    slug: "saudi-arabia",
    flag: "🇸🇦",
    currency: "SAR",
    names: { en: "Saudi Arabia", pl: "Arabia Saudyjska", ar: "السعودية" },
    teaser: {
      en: "SAR context, Sharia-aware screening, withholding and global diversification.",
      pl: "SAR, filtr halal/Sharia-aware, withholding i globalna dywersyfikacja.",
      ar: "الريال، فحص مراعي للضوابط الشرعية، الاقتطاع والتنويع العالمي.",
    },
    exampleCapital: "SAR 50,000",
    simulation: { start: 50000, monthly: 5000, grossYieldPct: 5, withholdingPct: 30, years: 10 },
  },
  {
    slug: "qatar",
    flag: "🇶🇦",
    currency: "QAR",
    names: { en: "Qatar", pl: "Katar", ar: "قطر" },
    teaser: {
      en: "QAR, wealth preservation, institution-style research and income workflow.",
      pl: "QAR, ochrona majątku, research instytucjonalny i workflow dochodu.",
      ar: "الريال القطري، حفظ الثروة، أبحاث بأسلوب مؤسسي وسير دخل واضح.",
    },
    exampleCapital: "QAR 50,000",
    simulation: { start: 50000, monthly: 5000, grossYieldPct: 5, withholdingPct: 30, years: 10 },
  },
  {
    slug: "kuwait",
    flag: "🇰🇼",
    currency: "KWD",
    names: { en: "Kuwait", pl: "Kuwejt", ar: "الكويت" },
    teaser: {
      en: "KWD, concentrated local exposure, U.S. dividend research and risk notes.",
      pl: "KWD, lokalna koncentracja, research dywidend USA i ryzyka.",
      ar: "الدينار، التعرض المحلي المركز، أبحاث توزيعات أمريكية وملاحظات المخاطر.",
    },
    exampleCapital: "KWD 5,000",
    simulation: { start: 5000, monthly: 500, grossYieldPct: 5, withholdingPct: 30, years: 10 },
  },
  {
    slug: "bahrain",
    flag: "🇧🇭",
    currency: "BHD",
    names: { en: "Bahrain", pl: "Bahrajn", ar: "البحرين" },
    teaser: {
      en: "BHD, financial-market familiarity, broker process and income examples.",
      pl: "BHD, znajomość rynków, proces brokera i przykłady dochodu.",
      ar: "الدينار البحريني، معرفة الأسواق، إجراءات الوسيط وأمثلة الدخل.",
    },
    exampleCapital: "BHD 5,000",
    simulation: { start: 5000, monthly: 500, grossYieldPct: 5, withholdingPct: 30, years: 10 },
  },
  {
    slug: "oman",
    flag: "🇴🇲",
    currency: "OMR",
    names: { en: "Oman", pl: "Oman", ar: "عُمان" },
    teaser: {
      en: "OMR, conservative income building, USD exposure and dividend discipline.",
      pl: "OMR, konserwatywne budowanie dochodu, USD i dyscyplina dywidend.",
      ar: "الريال العماني، بناء دخل محافظ، التعرض للدولار وانضباط التوزيعات.",
    },
    exampleCapital: "OMR 5,000",
    simulation: { start: 5000, monthly: 500, grossYieldPct: 5, withholdingPct: 30, years: 10 },
  },
  {
    slug: "egypt",
    flag: "🇪🇬",
    currency: "USD",
    names: { en: "Egypt", pl: "Egipt", ar: "مصر" },
    teaser: {
      en: "USD income angle, smaller starting amounts, currency risk and education.",
      pl: "Dochód w USD, mniejsze kwoty startowe, waluta i edukacja.",
      ar: "دخل بالدولار، مبالغ بداية أصغر، مخاطر العملة والتعليم.",
    },
    exampleCapital: "USD 1,000",
    simulation: { start: 1000, monthly: 100, grossYieldPct: 5, withholdingPct: 30, years: 10 },
  },
];

export const GUIDE_COPY: Record<Lang, GuideCopy> = {
  en: {
    stripEyebrow: "Investor Guides",
    stripTitle: "Investor guides by country",
    stripIntro: "Choose where you invest from and see why disciplined U.S. dividend research can fit your local currency, wealth and income context.",
    stripCta: "Open guide",
    indexTitle: "Investor guides by country",
    indexIntro: "Choose your country of residence or the place you invest from. Each guide shows how our dividend research is positioned for local currency, wealth habits, Sharia-aware needs and income-building goals.",
    pageEyebrow: "Country investor guide",
    residentLabel: "Investing from",
    currencyLabel: "Local currency context",
    exampleLabel: "Illustrative starting point",
    overviewTitle: "Why it fits your market",
    practicalTitle: "Make U.S. dividends easier to judge",
    whatYouNeedTitle: "What Aristocrat gives you",
    sampleTitle: "A practical income lens",
    sampleIntro: "Use familiar local amounts to understand the research workflow. These examples are educational only, not return promises.",
    simulationTitle: "10-year income illustration",
    simulationIntro: "A simple 10-year view using the local starting amount and monthly addition. The chart shows capital being added over time, then focuses on the two numbers that matter: what the account could show after 10 years and the additional gain created by reinvested net dividends.",
    simulationStart: "Starting capital",
    simulationMonthly: "Monthly addition",
    simulationYield: "Gross dividend yield",
    simulationAddedCapital: "Capital added",
    simulationNetDividends: "Additional gain after 10 years",
    simulationFinalValue: "Amount after 10 years",
    simulationDisclaimer: "Illustration only. Dividend yields, taxes, withholding, fees, FX, share prices and company payouts can change. This is not a forecast or recommendation.",
    reportPreviewTitle: "Inside a member report",
    reportPreviewIntro: "The product is not just a list of tickers. Each serious name needs a compact research view that helps you understand income quality before you act.",
    reportPreviewMetrics: [
      { label: "Dividend safety", value: "A-", note: "History, payout ratio and cash-flow coverage" },
      { label: "FCF coverage", value: "1.8x", note: "Dividend covered by free cash flow" },
      { label: "Payout ratio", value: "58%", note: "Room for stress before a cut" },
      { label: "Balance sheet", value: "Low risk", note: "Leverage reviewed against sector norms" },
      { label: "Valuation", value: "Fair", note: "Compared with history and peers" },
      { label: "Halal-aware flag", value: "Review", note: "Sector and financial-ratio context" },
    ],
    highYieldTitle: "Why not just buy the highest yield?",
    highYieldIntro: "Because the highest yield is often where the market is already warning you. The research filters for dividend durability, not headline yield.",
    highYieldPoints: [
      { title: "Yield can rise when price falls", body: "A 9% yield may mean the share price collapsed before a dividend cut." },
      { title: "Debt can pressure payouts", body: "High leverage and weak cash flow can turn income into a balance-sheet problem." },
      { title: "Durability beats excitement", body: "A lower but better-covered dividend can be more useful than a high yield that disappears." },
    ],
    shariaTitle: "Halal-aware screening in the workflow",
    shariaIntro: "For investors who care about Sharia constraints, the research highlights exclusions and financial context clearly. It is not a fatwa or certification.",
    shariaPoints: [
      { title: "Sector exclusions", body: "Alcohol, gambling, conventional banking and other sensitive sectors are flagged or excluded." },
      { title: "Financial-ratio awareness", body: "Debt, interest income and balance-sheet context are reviewed as part of the screen." },
      { title: "Transparent status", body: "Reports show whether a name passes, requires review or should be excluded from a halal-aware view." },
    ],
    researchTitle: "What you receive as a member",
    riskTitle: "Straight risk notes",
    backLabel: "All country guides",
    methodologyCta: "Review methodology",
    sampleCta: "See sample research",
    membershipCta: "View membership",
    disclaimer: "Educational research only. Not investment, tax, legal or Sharia advice. U.S. dividends, broker access, withholding, reporting and currency conversion depend on your personal circumstances and should be verified with qualified professionals.",
  },
  pl: {
    stripEyebrow: "Przewodniki",
    stripTitle: "Przewodniki inwestora według kraju",
    stripIntro: "Wybierz, skąd inwestujesz, i zobacz, dlaczego zdyscyplinowany research dywidend USA może pasować do Twojej waluty, majątku i celów dochodowych.",
    stripCta: "Otwórz przewodnik",
    indexTitle: "Przewodniki inwestora według kraju",
    indexIntro: "Wybierz kraj rezydencji albo miejsce, z którego inwestujesz. Każdy przewodnik pokazuje, jak nasz research dywidendowy odnosi się do lokalnej waluty, sposobu budowania majątku, potrzeb halal/Sharia-aware i celu dochodu.",
    pageEyebrow: "Przewodnik krajowy",
    residentLabel: "Inwestowanie z",
    currencyLabel: "Kontekst waluty",
    exampleLabel: "Przykładowy punkt startu",
    overviewTitle: "Dlaczego pasuje do Twojego rynku",
    practicalTitle: "Jak łatwiej ocenić dywidendy USA",
    whatYouNeedTitle: "Co daje Aristocrat",
    sampleTitle: "Praktyczna perspektywa dochodu",
    sampleIntro: "Znane lokalne kwoty pomagają zrozumieć workflow researchu. Przykłady są edukacyjne i nie są obietnicą wyniku.",
    simulationTitle: "10-letnia ilustracja dochodu",
    simulationIntro: "Prosty widok na 10 lat z lokalną kwotą startową i miesięczną dopłatą. Wykres pokazuje dopłacany kapitał w czasie, a na końcu skupia się na dwóch liczbach: ile może być po 10 latach i ile dodatkowo daje reinwestowanie dywidend netto.",
    simulationStart: "Kapitał startowy",
    simulationMonthly: "Miesięczna dopłata",
    simulationYield: "Dywidenda brutto",
    simulationAddedCapital: "Wpłacony kapitał",
    simulationNetDividends: "Dodatkowy zysk po 10 latach",
    simulationFinalValue: "Kwota po 10 latach",
    simulationDisclaimer: "Wyłącznie ilustracja. Stopy dywidend, podatki, withholding, opłaty, FX, ceny akcji i wypłaty spółek mogą się zmieniać. To nie jest prognoza ani rekomendacja.",
    reportPreviewTitle: "W środku raportu członka",
    reportPreviewIntro: "Produkt nie jest tylko listą tickerów. Każda poważna spółka potrzebuje zwartego widoku researchu, który pomaga ocenić jakość dochodu przed decyzją.",
    reportPreviewMetrics: [
      { label: "Bezpieczeństwo dywidendy", value: "A-", note: "Historia, payout ratio i pokrycie cash flow" },
      { label: "Pokrycie FCF", value: "1.8x", note: "Dywidenda pokryta wolnymi przepływami" },
      { label: "Payout ratio", value: "58%", note: "Bufor zanim wypłata stanie się napięta" },
      { label: "Bilans", value: "Niskie ryzyko", note: "Dług oceniany na tle sektora" },
      { label: "Wycena", value: "Fair", note: "Na tle historii i porównywalnych spółek" },
      { label: "Flaga halal-aware", value: "Review", note: "Sektor i wskaźniki finansowe w kontekście" },
    ],
    highYieldTitle: "Dlaczego nie kupić po prostu najwyższego yieldu?",
    highYieldIntro: "Bo najwyższy yield często jest ostrzeżeniem rynku. Research filtruje trwałość dywidendy, nie sam nagłówek z procentem.",
    highYieldPoints: [
      { title: "Yield rośnie, gdy cena spada", body: "Yield 9% może oznaczać, że cena akcji spadła przed przyszłym cięciem dywidendy." },
      { title: "Dług naciska na wypłaty", body: "Wysoka dźwignia i słaby cash flow mogą zamienić dochód w problem bilansu." },
      { title: "Trwałość ponad ekscytację", body: "Niższa, ale lepiej pokryta dywidenda bywa bardziej użyteczna niż wysoki yield, który znika." },
    ],
    shariaTitle: "Halal-aware screening w workflow",
    shariaIntro: "Dla inwestorów wrażliwych na Sharia research jasno pokazuje wykluczenia i kontekst finansowy. To nie jest fatwa ani certyfikacja.",
    shariaPoints: [
      { title: "Wykluczenia sektorowe", body: "Alkohol, hazard, konwencjonalna bankowość i inne wrażliwe sektory są flagowane lub wykluczane." },
      { title: "Świadomość wskaźników", body: "Dług, przychody odsetkowe i bilans są oceniane jako część screeningu." },
      { title: "Przejrzysty status", body: "Raporty pokazują, czy spółka przechodzi, wymaga przeglądu albo odpada z widoku halal-aware." },
    ],
    researchTitle: "Co otrzymujesz jako członek",
    riskTitle: "Uczciwie o ryzyku",
    backLabel: "Wszystkie przewodniki",
    methodologyCta: "Zobacz metodologię",
    sampleCta: "Zobacz próbkę researchu",
    membershipCta: "Zobacz członkostwo",
    disclaimer: "Wyłącznie research edukacyjny. To nie jest porada inwestycyjna, podatkowa, prawna ani Sharia. Dywidendy z USA, dostęp brokerski, withholding, raportowanie i przewalutowanie zależą od Twojej sytuacji i wymagają weryfikacji u specjalistów.",
  },
  ar: {
    stripEyebrow: "أدلة المستثمر",
    stripTitle: "أدلة المستثمر حسب البلد",
    stripIntro: "اختر البلد الذي تستثمر منه، وشاهد لماذا يمكن لأبحاث التوزيعات الأمريكية المنضبطة أن تناسب عملتك وسياق ثروتك وأهداف الدخل.",
    stripCta: "افتح الدليل",
    indexTitle: "أدلة المستثمر حسب البلد",
    indexIntro: "اختر بلد الإقامة أو المكان الذي تستثمر منه. يوضح كل دليل كيف ترتبط أبحاثنا بعملتك المحلية، وطريقة بناء الثروة، والحاجة إلى فلاتر مراعية للضوابط، وأهداف الدخل.",
    pageEyebrow: "دليل المستثمر المحلي",
    residentLabel: "الاستثمار من",
    currencyLabel: "سياق العملة المحلية",
    exampleLabel: "نقطة بداية توضيحية",
    overviewTitle: "لماذا يناسب سوقك",
    practicalTitle: "طريقة أوضح لتقييم توزيعات أمريكا",
    whatYouNeedTitle: "ما الذي يقدمه Aristocrat",
    sampleTitle: "نظرة عملية إلى الدخل",
    sampleIntro: "استخدام مبالغ مألوفة محليا يساعدك على فهم سير البحث. الأمثلة تعليمية وليست وعودا بالعائد.",
    simulationTitle: "تصور دخل خلال 10 سنوات",
    simulationIntro: "تصور بسيط لعشر سنوات باستخدام مبلغ بداية وإضافة شهرية مألوفين محليا. يوضح الرسم رأس المال المضاف مع الوقت، ثم يركز على رقمين فقط: المبلغ بعد 10 سنوات والربح الإضافي من إعادة استثمار التوزيعات الصافية.",
    simulationStart: "رأس مال البداية",
    simulationMonthly: "الإضافة الشهرية",
    simulationYield: "عائد التوزيع الإجمالي",
    simulationAddedCapital: "رأس المال المضاف",
    simulationNetDividends: "ربح إضافي بعد 10 سنوات",
    simulationFinalValue: "المبلغ بعد 10 سنوات",
    simulationDisclaimer: "للتوضيح فقط. عوائد التوزيعات والضرائب والاقتطاع والرسوم والصرف وأسعار الأسهم ومدفوعات الشركات قد تتغير. هذا ليس توقعا أو توصية.",
    reportPreviewTitle: "داخل تقرير العضو",
    reportPreviewIntro: "المنتج ليس مجرد قائمة رموز. كل اسم جاد يحتاج إلى عرض بحث مختصر يساعدك على فهم جودة الدخل قبل أي قرار.",
    reportPreviewMetrics: [
      { label: "سلامة التوزيع", value: "A-", note: "التاريخ ونسبة الدفع وتغطية التدفق النقدي" },
      { label: "تغطية FCF", value: "1.8x", note: "التوزيع مغطى بالتدفقات النقدية الحرة" },
      { label: "نسبة الدفع", value: "58%", note: "هامش قبل أن يصبح الدفع مضغوطا" },
      { label: "الميزانية", value: "مخاطر منخفضة", note: "الرافعة مقارنة بمعايير القطاع" },
      { label: "التقييم", value: "عادل", note: "مقارنة بالتاريخ والشركات المشابهة" },
      { label: "علامة halal-aware", value: "مراجعة", note: "سياق القطاع والنسب المالية" },
    ],
    highYieldTitle: "لماذا لا تشتري أعلى عائد فقط؟",
    highYieldIntro: "لأن أعلى عائد غالبا يكون تحذيرا من السوق. البحث يركز على متانة التوزيع لا على الرقم الظاهر فقط.",
    highYieldPoints: [
      { title: "العائد يرتفع عندما يهبط السعر", body: "عائد 9% قد يعني أن سعر السهم انهار قبل خفض محتمل للتوزيع." },
      { title: "الدين يضغط على المدفوعات", body: "الرافعة العالية وضعف التدفق النقدي قد يحول الدخل إلى مشكلة في الميزانية." },
      { title: "المتانة أهم من الإثارة", body: "توزيع أقل لكنه مغطى بشكل أفضل قد يكون أنفع من عائد مرتفع يختفي." },
    ],
    shariaTitle: "فحص مراعي للضوابط داخل سير العمل",
    shariaIntro: "لمن يهتمون بقيود الشريعة، يوضح البحث الاستبعادات والسياق المالي بوضوح. هذا ليس فتوى أو شهادة.",
    shariaPoints: [
      { title: "استبعادات قطاعية", body: "الكحول والمقامرة والبنوك التقليدية وقطاعات حساسة أخرى يتم وسمها أو استبعادها." },
      { title: "وعي بالنسب المالية", body: "الدين ودخل الفوائد وسياق الميزانية تتم مراجعتها كجزء من الفحص." },
      { title: "حالة واضحة", body: "توضح التقارير هل يجتاز الاسم الفحص أو يحتاج مراجعة أو يستبعد من العرض المراعي للضوابط." },
    ],
    researchTitle: "ما الذي تحصل عليه كعضو",
    riskTitle: "مخاطر واضحة بلا مبالغة",
    backLabel: "كل أدلة البلدان",
    methodologyCta: "راجع المنهجية",
    sampleCta: "شاهد نموذج البحث",
    membershipCta: "شاهد العضوية",
    disclaimer: "أبحاث تعليمية فقط. ليست نصيحة استثمارية أو ضريبية أو قانونية أو شرعية. توزيعات الأسهم الأمريكية، والوصول للوسيط، والاقتطاع، والتقارير، وتحويل العملة تعتمد على ظروفك ويجب التحقق منها مع مختصين.",
  },
};

export const GUIDE_QUESTIONS: Record<Lang, GuideQuestionCopy> = {
  en: {
    title: "Practical questions before you start",
    intro: "These are the questions serious investors usually ask before turning U.S. dividend research into a funded account.",
    w8benTitle: "What about W-8BEN?",
    w8benBody: "Your broker normally collects W-8BEN to document that you are a non-U.S. beneficial owner and to apply the correct U.S. withholding treatment where available.",
    withholdingTitle: "What about withholding?",
    withholdingBody: "U.S. dividends can be reduced before they reach your account. The examples use a conservative 30% U.S. withholding assumption before broker fees, FX and any local tax reporting.",
    brokerTitle: "Which broker supports my country?",
    brokerBody: "Check for U.S. stock access, W-8BEN workflow, USD funding, dividend cash payments, clear statements and transfer routes from your local bank.",
    propertyTitle: "How do dividends compare with property?",
    propertyBody: "Compare net rental yield after vacancy, service charges, maintenance and agent fees with net dividend yield after withholding, broker costs and FX. Liquidity and concentration are different too.",
    halalTitle: "Is it halal-aware?",
    halalBody: "The research highlights sector exclusions plus debt, interest-income and balance-sheet flags. Each name can be treated as pass, review or excluded. It is research support, not a fatwa.",
    localNetTitle: "How much remains net?",
    localNetBody: ({ start, yieldPct, gross, withheld, net, withholdingPct }) =>
      `On ${start} at a ${yieldPct} gross yield, the illustration shows ${gross} gross annual dividends, about ${withheld} withheld at ${withholdingPct}, and about ${net} before broker fees, FX and any local reporting.`,
    smallerStartTitle: "Can I start below a property deposit?",
    smallerStartBody: ({ capital, monthly }) =>
      `Yes. The local example starts with ${capital} and adds ${monthly} monthly, so the income sleeve can be built gradually instead of waiting for a large property deposit.`,
    taxNote: "Educational example only. Tax treaties, broker documentation, account type, fees, FX and local reporting can change the result.",
  },
  pl: {
    title: "Praktyczne pytania przed startem",
    intro: "To są pytania, które poważny inwestor zwykle zadaje, zanim zamieni research dywidend USA w realnie zasilony rachunek.",
    w8benTitle: "Co z W-8BEN?",
    w8benBody: "Broker zwykle zbiera W-8BEN, żeby potwierdzić, że jesteś non-U.S. beneficial owner i zastosować właściwe traktowanie withholding tam, gdzie jest dostępne.",
    withholdingTitle: "Co z withholding?",
    withholdingBody: "Dywidendy z USA mogą być pomniejszone zanim trafią na rachunek. Przykłady używają konserwatywnego założenia 30% withholding przed opłatami brokera, FX i lokalnym raportowaniem.",
    brokerTitle: "Jaki broker obsługuje mój kraj?",
    brokerBody: "Sprawdź dostęp do akcji USA, proces W-8BEN, zasilanie w USD, wypłaty dywidend gotówką, czytelne statementy i ścieżkę przelewów z lokalnego banku.",
    propertyTitle: "Jak porównać dywidendy z nieruchomością?",
    propertyBody: "Porównuj net rental yield po pustostanach, service charges, maintenance i prowizjach z net dividend yield po withholding, kosztach brokera i FX. Płynność i koncentracja też są inne.",
    halalTitle: "Czy to jest halal-aware?",
    halalBody: "Research pokazuje wykluczenia sektorowe oraz flagi długu, przychodów odsetkowych i bilansu. Spółka może mieć status pass, review albo excluded. To wsparcie researchu, nie fatwa.",
    localNetTitle: "Ile zostaje netto?",
    localNetBody: ({ start, yieldPct, gross, withheld, net, withholdingPct }) =>
      `Przy ${start} i ${yieldPct} dywidendy brutto ilustracja pokazuje ${gross} rocznych dywidend brutto, około ${withheld} withholding przy ${withholdingPct} i około ${net} przed opłatami brokera, FX i lokalnym raportowaniem.`,
    smallerStartTitle: "Czy można zacząć poniżej property deposit?",
    smallerStartBody: ({ capital, monthly }) =>
      `Tak. Lokalny przykład startuje od ${capital} i dopłaca ${monthly} miesięcznie, więc część dochodową można budować stopniowo, bez czekania na duży depozyt pod nieruchomość.`,
    taxNote: "Wyłącznie przykład edukacyjny. Umowy podatkowe, dokumentacja brokera, typ rachunku, opłaty, FX i lokalne raportowanie mogą zmienić wynik.",
  },
  ar: {
    title: "أسئلة عملية قبل البدء",
    intro: "هذه هي الأسئلة التي يطرحها المستثمر الجاد عادة قبل تحويل بحث التوزيعات الأمريكية إلى حساب ممول فعليا.",
    w8benTitle: "ماذا عن W-8BEN؟",
    w8benBody: "عادة يطلب الوسيط نموذج W-8BEN لتوثيق أنك مالك مستفيد غير أمريكي، ولتطبيق معاملة الاقتطاع الأمريكية المناسبة عندما تكون متاحة.",
    withholdingTitle: "ماذا عن الاقتطاع؟",
    withholdingBody: "قد تنخفض توزيعات الأسهم الأمريكية قبل وصولها إلى حسابك. تستخدم الأمثلة افتراض اقتطاع أمريكي محافظ قدره 30% قبل رسوم الوسيط والصرف وأي تقارير محلية.",
    brokerTitle: "أي وسيط يدعم بلدي؟",
    brokerBody: "تحقق من الوصول إلى الأسهم الأمريكية، وسير W-8BEN، وتمويل الدولار، ودفع التوزيعات نقدا، وكشوف واضحة، ومسارات تحويل من بنكك المحلي.",
    propertyTitle: "كيف أقارن التوزيعات بالعقار؟",
    propertyBody: "قارن عائد الإيجار الصافي بعد الشغور ورسوم الخدمة والصيانة والعمولات مع عائد التوزيعات الصافي بعد الاقتطاع ورسوم الوسيط والصرف. السيولة والتركيز مختلفان أيضا.",
    halalTitle: "هل هو مراعي للضوابط؟",
    halalBody: "يوضح البحث الاستبعادات القطاعية ورايات الدين ودخل الفوائد والميزانية. يمكن تصنيف كل اسم: اجتاز، يحتاج مراجعة، أو مستبعد. هذا دعم بحثي وليس فتوى.",
    localNetTitle: "كم يبقى صافيا؟",
    localNetBody: ({ start, yieldPct, gross, withheld, net, withholdingPct }) =>
      `على ${start} وبعائد إجمالي ${yieldPct}، يوضح المثال ${gross} كتوزيعات سنوية إجمالية، ونحو ${withheld} مقتطعة عند ${withholdingPct}، ونحو ${net} قبل رسوم الوسيط والصرف وأي تقارير محلية.`,
    smallerStartTitle: "هل أبدأ بأقل من دفعة عقار؟",
    smallerStartBody: ({ capital, monthly }) =>
      `نعم. يبدأ المثال المحلي من ${capital} مع إضافة ${monthly} شهريا، لذلك يمكن بناء جزء الدخل تدريجيا بدلا من انتظار دفعة عقارية كبيرة.`,
    taxNote: "مثال تعليمي فقط. المعاهدات الضريبية ووثائق الوسيط ونوع الحساب والرسوم والصرف والتقارير المحلية قد تغير النتيجة.",
  },
};

export const GUIDE_CONTENT: Record<GuideSlug, Record<Lang, GuidePageContent>> = {
  uae: {
    en: {
      headline: "Dividend investing for UAE residents",
      intro: "For UAE residents who already understand property, business income and cash savings, Aristocrat adds a disciplined way to evaluate liquid U.S. dividend companies for a second income stream.",
      overview: [
        "Dubai and Abu Dhabi property can be powerful wealth builders, but they are concentrated, capital-heavy and operational. U.S. dividend companies offer a different profile: smaller tickets, daily liquidity and exposure to global businesses that pay shareholders from cash flow.",
        "Our research is built for investors who want the work done before they open a ticker: dividend history, payout discipline, balance sheet, valuation context, risk notes and halal-aware exclusions in one structured workflow.",
      ],
      practical: [
        { title: "AED income view", body: "See U.S. dividends through AED-sized examples, then compare the potential income with cash, property and business cash flow." },
        { title: "Property-plus, not property-or", body: "Keep real estate as a core wealth pillar while adding a liquid income sleeve that can be adjusted without selling a property." },
        { title: "Quality before ticker picking", body: "Start with payout safety, cash-flow coverage, valuation and risk before any stock symbol feels worth considering." },
      ],
      needs: [
        { title: "Focused weekly shortlist", body: "A smaller set of dividend companies that already passed quality, payout and valuation checks." },
        { title: "Full reasoning", body: "Each report shows the dividend record, cash-flow support, balance sheet, valuation and what could go wrong." },
        { title: "Income discipline", body: "The workflow keeps attention on sustainable net income instead of the highest yield or social-media ideas." },
      ],
      sample: [
        { label: "Starting capital", value: "AED 50,000", note: "A familiar first allocation size for testing an income sleeve." },
        { label: "Monthly addition", value: "AED 5,000", note: "A repeatable savings rhythm beside property or business income." },
        { label: "Member focus", value: "Net income quality", note: "Dividend durability, payout coverage and risk before headline yield." },
      ],
      research: [
        "Weekly dividend-company shortlist with quality and risk context.",
        "Company-level reports covering cash flow, payout ratio, balance sheet, valuation and dividend history.",
        "Halal-aware filtering notes and plain-language risk flags before a name reaches your watchlist.",
      ],
      risks: [
        "U.S. dividend withholding may reduce gross income before it reaches your account.",
        "AED is linked to USD, but broker fees, transfer costs and execution spreads still matter.",
        "Dividend stocks are equities. Capital value can decline even if dividends continue.",
      ],
    },
    pl: {
      headline: "Inwestowanie dywidendowe dla rezydentów ZEA",
      intro: "Dla rezydentów ZEA, którzy rozumieją nieruchomości, biznes i gotówkę, Aristocrat dodaje uporządkowany sposób oceny płynnych spółek dywidendowych z USA jako drugiego źródła dochodu.",
      overview: [
        "Nieruchomości w Dubaju i Abu Dhabi mogą świetnie budować majątek, ale są skoncentrowane, kapitałochłonne i operacyjne. Spółki dywidendowe z USA dają inny profil: niższy próg wejścia, codzienną płynność i ekspozycję na globalne biznesy wypłacające gotówkę akcjonariuszom.",
        "Nasz research jest dla inwestorów, którzy chcą dostać pracę analityczną przed tickerem: historia dywidend, dyscyplina wypłat, bilans, wycena, ryzyka i halal-aware exclusions w jednym procesie.",
      ],
      practical: [
        { title: "Dochód w perspektywie AED", body: "Dywidendy z USA są pokazane przez lokalne kwoty, żeby łatwiej porównać je z gotówką, nieruchomościami i dochodem z biznesu." },
        { title: "Obok nieruchomości", body: "Nieruchomości mogą zostać głównym filarem majątku, a płynna część dywidendowa daje elastyczność bez sprzedaży lokalu." },
        { title: "Jakość przed tickerami", body: "Najpierw bezpieczeństwo wypłaty, pokrycie cash flow, wycena i ryzyko. Dopiero potem symbol spółki." },
      ],
      needs: [
        { title: "Krótka lista co tydzień", body: "Mniejszy zestaw spółek dywidendowych, które przeszły filtry jakości, wypłaty i wyceny." },
        { title: "Pełne uzasadnienie", body: "Raport pokazuje historię dywidend, wsparcie cash flow, bilans, wycenę i to, co może pójść źle." },
        { title: "Dyscyplina dochodu", body: "Proces trzyma uwagę na trwałym dochodzie netto, nie na najwyższym yieldu z internetu." },
      ],
      sample: [
        { label: "Kapitał startowy", value: "AED 50,000", note: "Znany lokalnie rozmiar pierwszej alokacji do części dochodowej." },
        { label: "Miesięczna dopłata", value: "AED 5,000", note: "Regularny rytm oszczędzania obok nieruchomości lub biznesu." },
        { label: "Fokus członka", value: "Jakość dochodu netto", note: "Trwałość dywidendy, pokrycie wypłaty i ryzyko przed headline yield." },
      ],
      research: [
        "Cotygodniowa lista spółek dywidendowych z kontekstem jakości i ryzyka.",
        "Raporty spółek obejmujące cash flow, payout ratio, bilans, wycenę i historię dywidend.",
        "Notatki halal-aware i proste flagi ryzyka zanim spółka trafi na watchlistę.",
      ],
      risks: [
        "Withholding od dywidend USA może zmniejszyć dochód brutto zanim trafi na rachunek.",
        "AED jest powiązany z USD, ale opłaty brokerskie, przelewy i spread nadal mają znaczenie.",
        "Spółki dywidendowe to akcje. Kapitał może spaść nawet przy utrzymanej dywidendzie.",
      ],
    },
    ar: {
      headline: "الاستثمار في التوزيعات للمقيمين في الإمارات",
      intro: "للمقيمين في الإمارات الذين يعرفون العقار والدخل التجاري والنقد، يضيف Aristocrat طريقة منضبطة لتقييم شركات توزيعات أمريكية سائلة كمصدر دخل ثانٍ.",
      overview: [
        "قد يكون عقار دبي وأبوظبي أداة قوية لبناء الثروة، لكنه مركز ويتطلب رأس مال وتشغيلا. شركات التوزيعات الأمريكية تقدم ملفا مختلفا: مبالغ أصغر، سيولة يومية، وتعرضا لشركات عالمية تدفع نقدا للمساهمين.",
        "أبحاثنا مصممة لمن يريد العمل التحليلي قبل الرمز: تاريخ التوزيعات، انضباط الدفع، الميزانية، التقييم، المخاطر، والاستبعادات المراعية للضوابط في سير واحد.",
      ],
      practical: [
        { title: "إطار بالدرهم", body: "نستخدم مبالغ مألوفة محليا ثم نربطها بدخل توزيعات بالدولار حتى تصبح الفكرة ملموسة." },
        { title: "بجانب العقار", body: "يمكن أن يبقى العقار ركنا أساسيا للثروة، بينما يضيف جزء التوزيعات سيولة يمكن تعديلها دون بيع أصل كبير." },
        { title: "الجودة قبل الرمز", body: "تبدأ الرؤية من سلامة التوزيع وتغطية التدفق النقدي والتقييم والمخاطر قبل الاهتمام برمز السهم." },
      ],
      needs: [
        { title: "قائمة مختصرة أسبوعية", body: "مجموعة أصغر من شركات التوزيعات التي اجتازت فلاتر الجودة والدفع والتقييم." },
        { title: "منطق كامل", body: "كل اسم قوي يحتاج إلى السبب: سجل التوزيعات، التغطية النقدية، الدين، التقييم والمخاطر." },
        { title: "انضباط الدخل", body: "يساعدك المسار على التركيز على دخل صاف مستدام لا على أعلى عائد منتشر في الإنترنت." },
      ],
      sample: [
        { label: "رأس مال البداية", value: "AED 50,000", note: "حجم مألوف لتجربة جزء دخل أولي." },
        { label: "إضافة شهرية", value: "AED 5,000", note: "إيقاع ادخار متكرر بجانب العقار أو دخل العمل." },
        { label: "تركيز العضو", value: "جودة الدخل الصافي", note: "استدامة التوزيع وتغطيته والمخاطر قبل العائد الظاهر." },
      ],
      research: [
        "قائمة أسبوعية لشركات توزيعات مع سياق الجودة والمخاطر.",
        "تقارير على مستوى الشركة تشمل التدفق النقدي ونسبة الدفع والميزانية والتقييم وتاريخ التوزيعات.",
        "ملاحظات مراعية للضوابط ورايات مخاطر واضحة قبل دخول الاسم إلى قائمة المتابعة.",
      ],
      risks: [
        "قد يقلل الاقتطاع على التوزيعات الأمريكية الدخل الإجمالي قبل وصوله إلى حسابك.",
        "الدرهم مرتبط بالدولار، لكن رسوم الوسيط والتحويل وفروق التنفيذ ما زالت مهمة.",
        "أسهم التوزيعات تبقى أسهما. قد تنخفض قيمة رأس المال حتى لو استمرت التوزيعات.",
      ],
    },
  },
  "saudi-arabia": makeGccContent("Saudi", "Saudi Arabia", "Arabii Saudyjskiej", "SAR", "SAR 50,000", "SAR 5,000", "السعودية", "الريال", "SAR 50,000", "SAR 5,000"),
  qatar: makeGccContent("Qatari", "Qatar", "Kataru", "QAR", "QAR 50,000", "QAR 5,000", "قطر", "الريال القطري", "QAR 50,000", "QAR 5,000"),
  kuwait: makeGccContent("Kuwaiti", "Kuwait", "Kuwejtu", "KWD", "KWD 5,000", "KWD 500", "الكويت", "الدينار الكويتي", "KWD 5,000", "KWD 500"),
  bahrain: makeGccContent("Bahraini", "Bahrain", "Bahrajnu", "BHD", "BHD 5,000", "BHD 500", "البحرين", "الدينار البحريني", "BHD 5,000", "BHD 500"),
  oman: makeGccContent("Omani", "Oman", "Omanu", "OMR", "OMR 5,000", "OMR 500", "عُمان", "الريال العماني", "OMR 5,000", "OMR 500"),
  egypt: {
    en: {
      headline: "Dividend investing for Egyptian investors",
      intro: "For Egypt-based investors, Aristocrat makes U.S. dividend research approachable: USD-focused income education, smaller starting examples and a disciplined way to separate quality companies from high-yield traps.",
      overview: [
        "The appeal is not only dividends. It is the ability to learn, think and evaluate income-producing businesses in USD terms while local currency volatility makes long-term planning harder.",
        "The product is built for the investor who wants a structured education-first path before allocating serious capital: dividend mechanics, company quality, payout safety, risks and watchlist discipline.",
      ],
      practical: [
        { title: "A clearer USD income view", body: "Dividend income is shown in USD terms, with a clear split between real business quality and a tempting headline yield." },
        { title: "Starting small still makes sense", body: "The USD 1,000 and USD 100/month example makes the first step understandable before larger allocations." },
        { title: "Quality before yield traps", body: "Aristocrat focuses on durable dividend businesses, not stocks that only look attractive because the price collapsed." },
      ],
      needs: [
        { title: "Plain-language company reports", body: "Each report explains the business, the dividend, the cash flow and the main risk without burying the decision in ratios." },
        { title: "A watchlist you can follow", body: "Track quality names over time instead of reacting to market noise or random ideas from social media." },
        { title: "Confidence without hype", body: "The risk is stated clearly: dividends can be cut, prices can fall and USD exposure is still equity risk." },
      ],
      sample: [
        { label: "Starting capital", value: "USD 1,000", note: "A practical education-first example before larger decisions." },
        { label: "Monthly addition", value: "USD 100", note: "A small recurring contribution lens for long-term habit building." },
        { label: "Member focus", value: "Learn quality income", note: "Understand dividend durability before chasing yield." },
      ],
      research: [
        "Dividend basics translated into company-level research.",
        "Quality screens for dividend history, free cash flow, payout ratio, balance sheet and valuation.",
        "Watchlist updates and plain-language risk notes for investors building confidence step by step.",
      ],
      risks: [
        "Currency conversion and access to USD can materially change the real result.",
        "Broker availability, funding rules and reporting obligations can change and must be verified locally.",
        "U.S. stocks can fall in USD terms; currency exposure does not remove equity risk.",
      ],
    },
    pl: {
      headline: "Inwestowanie dywidendowe dla inwestorów z Egiptu",
      intro: "Dla inwestorów z Egiptu Aristocrat upraszcza research dywidend USA: edukacja o dochodzie w USD, mniejsze przykłady startowe i zdyscyplinowany sposób oddzielania jakości od pułapek wysokiego yieldu.",
      overview: [
        "Atrakcyjne są nie tylko dywidendy, ale też nauka oceny biznesów dochodowych w USD, szczególnie gdy zmienność lokalnej waluty utrudnia długoterminowe planowanie.",
        "Produkt jest dla inwestora, który chce ścieżki edukacyjnej przed większą alokacją: mechanika dywidend, jakość spółki, bezpieczeństwo wypłaty, ryzyka i dyscyplina watchlisty.",
      ],
      practical: [
        { title: "Czytelny dochód w USD", body: "Dywidendy są pokazane w USD, z jasnym rozróżnieniem między jakością biznesu a kuszącym headline yieldem." },
        { title: "Mały start też ma sens", body: "Przykład USD 1,000 i USD 100 miesięcznie pokazuje pierwszy krok przed większą alokacją." },
        { title: "Jakość przed pułapkami yieldu", body: "Aristocrat skupia się na trwałych biznesach dywidendowych, nie spółkach atrakcyjnych tylko po załamaniu ceny." },
      ],
      needs: [
        { title: "Raporty prostym językiem", body: "Każdy raport tłumaczy biznes, dywidendę, cash flow i główne ryzyko bez zasypywania samymi wskaźnikami." },
        { title: "Watchlista do śledzenia", body: "Możesz obserwować jakościowe spółki w czasie, zamiast reagować na szum rynku i przypadkowe pomysły z social mediów." },
        { title: "Pewność bez hype'u", body: "Ryzyko jest nazwane jasno: dywidendy mogą być cięte, ceny akcji mogą spadać, a USD nadal oznacza ryzyko akcji." },
      ],
      sample: [
        { label: "Kapitał startowy", value: "USD 1,000", note: "Praktyczny przykład edukacyjny przed większymi decyzjami." },
        { label: "Miesięczna dopłata", value: "USD 100", note: "Mała regularna kwota jako perspektywa budowania nawyku." },
        { label: "Fokus członka", value: "Nauka jakości dochodu", note: "Zrozumienie trwałości dywidendy przed gonieniem yieldu." },
      ],
      research: [
        "Podstawy dywidend przełożone na research konkretnych spółek.",
        "Screening jakości: historia dywidend, FCF, payout ratio, bilans i wycena.",
        "Aktualizacje watchlisty i proste notatki ryzyka dla inwestorów budujących pewność krok po kroku.",
      ],
      risks: [
        "Przewalutowanie i dostęp do USD mogą istotnie zmienić realny wynik.",
        "Dostępność brokerów, zasady zasilania i obowiązki raportowe mogą się zmieniać i wymagają lokalnej weryfikacji.",
        "Akcje USA mogą spadać w USD. Ekspozycja walutowa nie usuwa ryzyka akcji.",
      ],
    },
    ar: {
      headline: "الاستثمار في التوزيعات للمستثمرين في مصر",
      intro: "للمستثمرين في مصر، يجعل Aristocrat أبحاث التوزيعات الأمريكية أكثر وضوحا: تعليم حول الدخل بالدولار، أمثلة بمبالغ أصغر، وطريقة منضبطة للتمييز بين الشركات الجيدة وفخاخ العائد المرتفع.",
      overview: [
        "الجاذبية ليست التوزيعات فقط، بل تعلم تقييم شركات منتجة للدخل بالدولار، خاصة عندما تجعل تقلبات العملة المحلية التخطيط طويل الأجل أصعب.",
        "المنتج مخصص للمستثمر الذي يريد مسارا تعليميا منظما قبل تخصيص رأس مال أكبر: آلية التوزيعات، جودة الشركة، سلامة الدفع، المخاطر، وانضباط قائمة المتابعة.",
      ],
      practical: [
        { title: "نظرة أوضح إلى الدخل بالدولار", body: "تظهر التوزيعات بالدولار مع فصل واضح بين جودة النشاط والعائد الظاهر الذي قد يكون خادعا." },
        { title: "البداية الصغيرة لها معنى", body: "مثال USD 1,000 و USD 100 شهريا يجعل الخطوة الأولى مفهومة قبل تخصيص مبالغ أكبر." },
        { title: "الجودة قبل فخ العائد", body: "يركز Aristocrat على شركات توزيعات متينة، لا على أسهم تبدو جذابة فقط لأن السعر انهار." },
      ],
      needs: [
        { title: "تقارير بلغة واضحة", body: "كل تقرير يشرح النشاط والتوزيع والتدفق النقدي والمخاطر الرئيسية دون إغراق القرار بالنسب فقط." },
        { title: "قائمة متابعة يمكن اتباعها", body: "تابع الشركات الجيدة بمرور الوقت بدلا من رد الفعل لضجيج السوق وأفكار وسائل التواصل." },
        { title: "ثقة بلا مبالغة", body: "تظهر المخاطر بوضوح: قد تخفض التوزيعات، وقد تهبط الأسعار، والتعرض للدولار يبقى تعرضا للأسهم." },
      ],
      sample: [
        { label: "رأس مال البداية", value: "USD 1,000", note: "مثال تعليمي عملي قبل قرارات أكبر." },
        { label: "إضافة شهرية", value: "USD 100", note: "مبلغ صغير متكرر كعدسة لبناء عادة طويلة الأجل." },
        { label: "تركيز العضو", value: "تعلم جودة الدخل", note: "فهم استدامة التوزيع قبل مطاردة العائد." },
      ],
      research: [
        "أساسيات التوزيعات مترجمة إلى بحث على مستوى الشركات.",
        "فلاتر جودة لتاريخ التوزيعات والتدفقات النقدية الحرة ونسبة الدفع والميزانية والتقييم.",
        "تحديثات قائمة متابعة وملاحظات مخاطر واضحة لمستثمرين يبنون الثقة خطوة بخطوة.",
      ],
      risks: [
        "تحويل العملة والوصول إلى الدولار يمكن أن يغيرا النتيجة الفعلية بشكل كبير.",
        "توافر الوسطاء وقواعد التمويل والالتزامات المحلية قد تتغير ويجب التحقق منها محليا.",
        "قد تنخفض الأسهم الأمريكية بالدولار. التعرض للعملة لا يزيل مخاطر الأسهم.",
      ],
    },
  },
};

function makeGccContent(
  adjective: string,
  country: string,
  plCountry: string,
  currency: string,
  capital: string,
  monthly: string,
  arCountry: string,
  arCurrency: string,
  arCapital: string,
  arMonthly: string,
): Record<Lang, GuidePageContent> {
  return {
    en: {
      headline: `Dividend investing for ${country} residents`,
      intro: `${adjective} investors often look for disciplined income beyond local property, deposits and concentrated regional exposure. Aristocrat turns U.S. dividend investing into a structured research workflow built for that decision.`,
      overview: [
        `Savings in ${currency} can be strong, but portfolios often remain concentrated in local assets. A researched U.S. dividend sleeve adds global business exposure, recurring income potential and daily liquidity.`,
        "The product is built for investors who want selectivity: durable dividend records, free-cash-flow support, balance-sheet discipline, valuation context and Sharia-aware exclusions where relevant.",
      ],
      practical: [
        { title: `${currency} income lens`, body: `U.S. dividends are easier to judge when the example starts from familiar ${currency} amounts and local wealth decisions.` },
        { title: "Institutional-style filter", body: "Every shortlist starts with dividend history, payout quality, cash-flow coverage, leverage and valuation context." },
        { title: "Halal-aware context", body: "Sector exclusions and financial-ratio awareness are visible when they matter, so the first review is clearer." },
      ],
      needs: [
        { title: "Curated shortlist", body: "A focused set of companies to review, not an overwhelming screener full of noise." },
        { title: "Research you can read", body: "Reports explain why a company passes, what supports the dividend and what could break the thesis." },
        { title: "A calmer process", body: "The workflow helps avoid impulsive yield chasing and keeps attention on durable income quality." },
      ],
      sample: [
        { label: "Starting capital", value: capital, note: "A practical local-sized example for a first income sleeve." },
        { label: "Monthly addition", value: monthly, note: "A recurring contribution rhythm for long-term income building." },
        { label: "Member focus", value: "Quality shortlist", note: "A filtered set of names with dividend, valuation and risk context." },
      ],
      research: [
        "Weekly dividend shortlist built from a structured quality screen.",
        "Company reports covering dividend history, payout ratio, free cash flow, balance sheet and valuation.",
        "Risk notes, halal-aware flags and watchlist updates so members can make their own decision with better context.",
      ],
      risks: [
        "U.S. dividends may be reduced by withholding before reaching the account.",
        "Broker availability, transfer channels and reporting obligations can vary and change.",
        "A dividend portfolio is still an equity portfolio; prices can fall and dividends can be cut.",
      ],
    },
    pl: {
      headline: `Inwestowanie dywidendowe dla rezydentów ${plCountry}`,
      intro: `Inwestorzy z ${plCountry} często szukają uporządkowanego dochodu poza lokalnymi nieruchomościami, depozytami i koncentracją regionalną. Aristocrat zamienia inwestowanie dywidendowe USA w przejrzysty workflow researchu.`,
      overview: [
        `Oszczędności w ${currency} mogą być mocne, ale portfele często zostają skoncentrowane lokalnie. Research dywidend USA dodaje ekspozycję na globalne biznesy, potencjał powtarzalnego dochodu i codzienną płynność.`,
        "Produkt jest dla inwestorów, którzy chcą selekcji: trwałej historii dywidend, wsparcia FCF, dyscypliny bilansu, kontekstu wyceny i filtrów halal/Sharia-aware tam, gdzie są istotne.",
      ],
      practical: [
        { title: `Dochód w perspektywie ${currency}`, body: `Dywidendy USA łatwiej ocenić, gdy przykład zaczyna się od znanych kwot w ${currency} i lokalnych decyzji majątkowych.` },
        { title: "Filtr jak w instytucji", body: "Każda shortlist zaczyna się od historii dywidend, jakości wypłat, pokrycia cash flow, długu i kontekstu wyceny." },
        { title: "Kontekst halal-aware", body: "Wykluczenia sektorowe i wskaźniki finansowe są widoczne tam, gdzie mają znaczenie dla pierwszej oceny." },
      ],
      needs: [
        { title: "Wyselekcjonowana shortlist", body: "Skupiona lista spółek do oceny, a nie hałaśliwy screener pełen przypadkowych nazw." },
        { title: "Research, który da się czytać", body: "Raporty tłumaczą, dlaczego spółka przechodzi filtr, co wspiera dywidendę i co może zepsuć tezę." },
        { title: "Spokojniejszy proces", body: "Workflow ogranicza impulsywne gonienie yieldu i trzyma uwagę na jakości trwałego dochodu." },
      ],
      sample: [
        { label: "Kapitał startowy", value: capital, note: "Lokalny przykład pierwszej części portfela nastawionej na dochód." },
        { label: "Miesięczna dopłata", value: monthly, note: "Rytm regularnego budowania długoterminowego dochodu." },
        { label: "Fokus członka", value: "Jakościowa shortlist", note: "Wybrane spółki z kontekstem dywidend, wyceny i ryzyka." },
      ],
      research: [
        "Cotygodniowa shortlist dywidendowa zbudowana na uporządkowanym screeningu jakości.",
        "Raporty spółek obejmujące historię dywidend, payout ratio, FCF, bilans i wycenę.",
        "Notatki ryzyka, flagi halal-aware i aktualizacje watchlisty, żeby członek decydował z lepszym kontekstem.",
      ],
      risks: [
        "Dywidendy USA mogą zostać pomniejszone przez withholding przed trafieniem na rachunek.",
        "Dostępność brokerów, transfery i obowiązki raportowe mogą się różnić i zmieniać.",
        "Portfel dywidendowy nadal jest portfelem akcji; ceny mogą spadać, a dywidendy mogą zostać obcięte.",
      ],
    },
    ar: {
      headline: `الاستثمار في التوزيعات للمقيمين في ${arCountry}`,
      intro: `غالبا يبحث مستثمرو ${arCountry} عن دخل منظم خارج العقار المحلي والودائع والتعرض الإقليمي المركز. يحول Aristocrat الاستثمار في التوزيعات الأمريكية إلى سير بحث واضح ومنضبط.`,
      overview: [
        `قد تكون المدخرات بعملة ${arCurrency} قوية، لكن المحافظ تبقى غالبا مركزة محليا. يضيف بحث التوزيعات الأمريكية تعرضا لشركات عالمية، وإمكانية دخل متكرر، وسيولة يومية.`,
        "المنتج مخصص لمن يريد انتقائية: تاريخ توزيعات متين، دعم من التدفقات النقدية الحرة، انضباط الميزانية، سياق التقييم، وفلاتر مراعية للضوابط عند الحاجة.",
      ],
      practical: [
        { title: `نظرة دخل بعملة ${arCurrency}`, body: `تصبح توزيعات أمريكا أسهل في التقييم عندما يبدأ المثال من مبالغ مألوفة بعملة ${arCurrency} وقرارات ثروة محلية.` },
        { title: "فلتر بأسلوب مؤسسي", body: "كل قائمة مختصرة تبدأ من تاريخ التوزيعات وجودة الدفع وتغطية التدفقات النقدية والرافعة وسياق التقييم." },
        { title: "سياق مراعي للضوابط", body: "تظهر الاستبعادات القطاعية والنسب المالية عندما تكون مهمة حتى تكون المراجعة الأولى أوضح." },
      ],
      needs: [
        { title: "قائمة مختصرة منتقاة", body: "مجموعة مركزة من الشركات للمراجعة، لا فاحص مليء بالضجيج." },
        { title: "بحث قابل للقراءة", body: "تشرح التقارير لماذا اجتازت الشركة الفلتر، وما الذي يدعم التوزيع، وما الذي قد يضعف الفكرة." },
        { title: "عملية أهدأ", body: "يساعد سير العمل على تجنب مطاردة العائد المرتفع والتركيز على جودة الدخل المستدام." },
      ],
      sample: [
        { label: "رأس مال البداية", value: arCapital, note: "مثال محلي لحجم أول جزء مخصص للدخل." },
        { label: "إضافة شهرية", value: arMonthly, note: "إيقاع مساهمة متكررة لبناء دخل طويل الأجل." },
        { label: "تركيز العضو", value: "قائمة جودة مختصرة", note: "أسماء مختارة مع سياق التوزيعات والتقييم والمخاطر." },
      ],
      research: [
        "قائمة توزيعات أسبوعية مبنية على فحص جودة منظم.",
        "تقارير شركات تشمل تاريخ التوزيعات ونسبة الدفع والتدفقات النقدية الحرة والميزانية والتقييم.",
        "ملاحظات مخاطر ورايات مراعية للضوابط وتحديثات قائمة المتابعة حتى يقرر العضو بسياق أفضل.",
      ],
      risks: [
        "قد يتم تقليل توزيعات الأسهم الأمريكية بالاقتطاع قبل وصولها إلى الحساب.",
        "توافر الوسطاء وقنوات التحويل والالتزامات المحلية قد تختلف وتتغير.",
        "محفظة التوزيعات تبقى محفظة أسهم؛ قد تنخفض الأسعار وقد تخفض الشركات التوزيعات.",
      ],
    },
  };
}

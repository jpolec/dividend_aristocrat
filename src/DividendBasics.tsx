import { useT, type Lang } from "./i18n";

type BasicsCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  bullets: string[];
  articleTitle: string;
  articleIntro: string;
  articleSections: { title: string; body: string[] }[];
  typeGraphicLabels: { cash: string; shares: string; special: string };
  flowTitle: string;
  flowIntro: string;
  flowLabels: {
    company: string;
    board: string;
    shareholder: string;
    profit: string;
    approval: string;
    payment: string;
  };
  fundamentalsTitle: string;
  fundamentalsIntro: string;
  fundamentals: { title: string; body: string }[];
  formulaTitle: string;
  formulaIntro: string;
  annualDividend: string;
  sharePrice: string;
  dividendYield: string;
  timelineTitle: string;
  timelineIntro: string;
  dates: { title: string; body: string }[];
  exTitle: string;
  exIntro: string;
  beforeEx: string;
  afterEx: string;
  dividendValue: string;
  reinvestTitle: string;
  reinvestIntro: string;
  reinvestPoints: { title: string; body: string }[];
  risksTitle: string;
  risksIntro: string;
  risks: { title: string; body: string }[];
  ctaTitle: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const COPY: Record<Lang, BasicsCopy> = {
  en: {
    eyebrow: "Dividend Basics",
    title: "Dividends Explained",
    intro:
      "A dividend is a distribution of company value to shareholders. It is usually paid in cash, but it can also be paid as additional shares. The important point is simple: the company decides to return part of its profits or reserves to owners.",
    bullets: [
      "Income can arrive without selling the share.",
      "The payment is not guaranteed and can change.",
      "Total return combines dividends and price movement.",
    ],
    articleTitle: "Dividends explained, in practical terms",
    articleIntro:
      "A dividend is not a bonus detached from the business. It is one way a company allocates capital after it has paid employees, suppliers, lenders, taxes, reinvestment needs, and other obligations.",
    articleSections: [
      {
        title: "Common dividend types",
        body: [
          "Cash dividends are the standard form: a fixed amount per share is credited to eligible holders.",
          "Stock dividends pay additional shares instead of cash. Special dividends are one-off distributions, usually linked to unusually strong cash generation, asset sales, or excess capital.",
        ],
      },
      {
        title: "Who decides",
        body: [
          "The board, and in some markets the shareholder meeting, approves the dividend. Management can propose a payment, but the company is never permanently locked into a dividend policy.",
          "That is why dividend history is useful evidence, not a guarantee.",
        ],
      },
      {
        title: "Why companies pay dividends",
        body: [
          "Companies may use dividends to return surplus capital, reward shareholders, signal confidence in cash flow, and impose capital discipline on management.",
          "A mature business with fewer high-return reinvestment opportunities may reasonably distribute more cash than a fast-growing company still funding expansion.",
        ],
      },
      {
        title: "Why investors care",
        body: [
          "Dividends can create recurring income without selling shares. They can also make total return more visible, especially when reinvested over long periods.",
          "The quality question is whether the dividend is supported by free cash flow and a resilient balance sheet.",
        ],
      },
      {
        title: "Taxes and withholding",
        body: [
          "Gross dividend and net dividend are not the same thing. Withholding tax, local income tax, treaty relief, broker setup, and currency conversion can change the amount you actually receive.",
          "Always evaluate dividend income after tax and after currency conversion.",
        ],
      },
      {
        title: "Governance signal",
        body: [
          "A stable dividend policy can communicate discipline, but it can also become a burden if management protects the payout at the expense of the balance sheet.",
          "The best dividend analysis connects the payment to capital allocation, leverage, cash flow quality, and business durability.",
        ],
      },
    ],
    typeGraphicLabels: { cash: "Cash", shares: "Shares", special: "Special" },
    flowTitle: "The basic cash flow",
    flowIntro:
      "A profitable company generates cash, the board proposes or approves a distribution, and eligible shareholders receive the payment through the market infrastructure and their broker.",
    flowLabels: {
      company: "Company",
      board: "Approval",
      shareholder: "Shareholder",
      profit: "Profit or reserves",
      approval: "Declared dividend",
      payment: "Cash credited",
    },
    fundamentalsTitle: "Three ideas matter first",
    fundamentalsIntro:
      "Before looking at a dividend stock, separate the payment itself from the health of the company funding it.",
    fundamentals: [
      {
        title: "Dividend amount",
        body: "The cash paid per share, for example USD 0.50 per quarter. More shares means a larger gross payment.",
      },
      {
        title: "Dividend yield",
        body: "The annual dividend divided by the current share price. A high yield can be attractive, but it can also signal stress.",
      },
      {
        title: "Payout discipline",
        body: "A sustainable dividend is usually funded by earnings and free cash flow, not by borrowing or accounting optics.",
      },
    ],
    formulaTitle: "How dividend yield is calculated",
    formulaIntro:
      "Yield changes when the dividend changes or when the share price moves. That is why yield should never be read alone.",
    annualDividend: "Annual dividend per share",
    sharePrice: "Current share price",
    dividendYield: "Dividend yield",
    timelineTitle: "The payment calendar",
    timelineIntro:
      "The exact dates differ by market and company, but the sequence is usually the same.",
    dates: [
      {
        title: "Declaration date",
        body: "The company announces the amount, form of payment, and key dates.",
      },
      {
        title: "Ex-dividend date",
        body: "Buyers on or after this date usually do not receive the upcoming dividend.",
      },
      {
        title: "Record date",
        body: "The company or depository identifies which shareholders are entitled to the payment.",
      },
      {
        title: "Payment date",
        body: "The cash or shares are credited through the broker or custodian.",
      },
    ],
    exTitle: "What happens on the ex-dividend date?",
    exIntro:
      "When a share starts trading without the right to the next dividend, the price often adjusts down by roughly the dividend amount. That adjustment is not free money lost; it reflects value moving from the share price to the shareholder's cash account.",
    beforeEx: "Before ex-date",
    afterEx: "After ex-date",
    dividendValue: "Dividend value",
    reinvestTitle: "Why reinvestment changes the picture",
    reinvestIntro:
      "A single dividend is just cash flow. Reinvested dividends can buy more shares, which may generate additional future dividends. This is the compounding mechanism long-term income investors care about.",
    reinvestPoints: [
      {
        title: "Cash income",
        body: "Take the payment and use it elsewhere. Useful for investors who need recurring income.",
      },
      {
        title: "Reinvestment",
        body: "Use dividends to buy more shares. This can increase the number of income-producing units over time.",
      },
      {
        title: "Total return",
        body: "Evaluate price change plus dividends received, not yield alone.",
      },
    ],
    risksTitle: "What can go wrong?",
    risksIntro:
      "Dividend investing still carries equity risk. A good explanation of dividends is incomplete without the failure cases.",
    risks: [
      {
        title: "Dividend cuts",
        body: "Management can reduce, suspend, or cancel dividends when cash flow weakens or priorities change.",
      },
      {
        title: "Yield traps",
        body: "A yield can jump because the share price has fallen. The market may be pricing in a future cut.",
      },
      {
        title: "Taxes and withholding",
        body: "Net income depends on your country, broker setup, treaties, and the type of distribution.",
      },
      {
        title: "Currency risk",
        body: "Foreign dividends may fluctuate after conversion into your spending currency.",
      },
    ],
    ctaTitle: "Ready to evaluate dividend companies?",
    ctaBody:
      "The next step is not chasing the highest yield. It is filtering for businesses with durable cash flow, sensible payout ratios, and balance sheets that can support distributions through cycles.",
    ctaPrimary: "See our methodology",
    ctaSecondary: "Browse sample research",
  },
  pl: {
    eyebrow: "Podstawy dywidend",
    title: "Dywidendy wyjaśnione",
    intro:
      "Dywidenda to przekazanie części wartości spółki akcjonariuszom. Najczęściej jest wypłacana gotówką, czasem w formie dodatkowych akcji. Najprościej: spółka decyduje, że część zysków lub rezerw wraca do właścicieli.",
    bullets: [
      "Dochód może pojawić się bez sprzedaży akcji.",
      "Wypłata nie jest gwarantowana i może się zmienić.",
      "Całkowity wynik łączy dywidendy oraz zmianę ceny akcji.",
    ],
    articleTitle: "Dywidendy wyjaśnione praktycznie",
    articleIntro:
      "Dywidenda nie jest bonusem oderwanym od biznesu. To jeden ze sposobów alokacji kapitału po opłaceniu pracowników, dostawców, wierzycieli, podatków, inwestycji i innych zobowiązań.",
    articleSections: [
      {
        title: "Najczęstsze typy dywidend",
        body: [
          "Dywidenda gotówkowa to standard: określona kwota na akcję trafia do uprawnionych akcjonariuszy.",
          "Dywidenda w akcjach polega na przekazaniu dodatkowych akcji zamiast gotówki. Dywidenda specjalna jest jednorazowa i zwykle wynika z wyjątkowo mocnych przepływów, sprzedaży aktywów albo nadmiaru kapitału.",
        ],
      },
      {
        title: "Kto podejmuje decyzję",
        body: [
          "Dywidendę zatwierdza zarząd, rada albo walne zgromadzenie, zależnie od rynku i statutu spółki. Zarząd może zaproponować wypłatę, ale spółka nie jest na zawsze związana jedną polityką dywidendową.",
          "Dlatego historia wypłat jest ważnym dowodem, ale nie gwarancją.",
        ],
      },
      {
        title: "Dlaczego spółki płacą dywidendy",
        body: [
          "Spółki mogą wypłacać dywidendy, żeby zwrócić nadwyżkę kapitału, wynagrodzić akcjonariuszy, pokazać zaufanie do przyszłych przepływów i narzucić dyscyplinę w alokacji kapitału.",
          "Dojrzały biznes z mniejszą liczbą bardzo rentownych projektów może rozsądnie wypłacać więcej gotówki niż szybko rosnąca firma finansująca ekspansję.",
        ],
      },
      {
        title: "Dlaczego inwestorzy zwracają na nie uwagę",
        body: [
          "Dywidendy mogą tworzyć powtarzalny dochód bez sprzedaży akcji. Ułatwiają też zrozumienie całkowitej stopy zwrotu, szczególnie gdy są reinwestowane przez wiele lat.",
          "Kluczowe pytanie brzmi: czy wypłata jest pokryta wolnymi przepływami pieniężnymi i wsparta odpornym bilansem.",
        ],
      },
      {
        title: "Podatki i withholding",
        body: [
          "Dywidenda brutto i netto to nie to samo. Podatek u źródła, lokalny podatek dochodowy, umowy o unikaniu podwójnego opodatkowania, ustawienia brokera i przewalutowanie zmieniają kwotę faktycznie otrzymaną.",
          "Dochód dywidendowy warto oceniać po podatkach i po przeliczeniu walutowym.",
        ],
      },
      {
        title: "Sygnał ładu korporacyjnego",
        body: [
          "Stabilna polityka dywidendowa może komunikować dyscyplinę, ale może też stać się ciężarem, jeśli zarząd broni wypłaty kosztem bilansu.",
          "Dobra analiza dywidend łączy samą wypłatę z alokacją kapitału, zadłużeniem, jakością przepływów i trwałością biznesu.",
        ],
      },
    ],
    typeGraphicLabels: { cash: "Gotówka", shares: "Akcje", special: "Specjalna" },
    flowTitle: "Podstawowy przepływ gotówki",
    flowIntro:
      "Rentowna spółka generuje gotówkę, zarząd lub walne zgromadzenie zatwierdza wypłatę, a uprawnieni akcjonariusze otrzymują środki przez infrastrukturę rynku i swojego brokera.",
    flowLabels: {
      company: "Spółka",
      board: "Zatwierdzenie",
      shareholder: "Akcjonariusz",
      profit: "Zysk lub rezerwy",
      approval: "Ogłoszona dywidenda",
      payment: "Gotówka na rachunku",
    },
    fundamentalsTitle: "Najpierw liczą się trzy pojęcia",
    fundamentalsIntro:
      "Przed analizą spółki dywidendowej oddziel samą wypłatę od kondycji biznesu, który ją finansuje.",
    fundamentals: [
      {
        title: "Kwota dywidendy",
        body: "Gotówka wypłacana na jedną akcję, np. 0,50 USD kwartalnie. Więcej akcji oznacza większą wypłatę brutto.",
      },
      {
        title: "Stopa dywidendy",
        body: "Roczna dywidenda podzielona przez obecną cenę akcji. Wysoki yield może być atrakcyjny, ale może też sygnalizować problemy.",
      },
      {
        title: "Dyscyplina wypłat",
        body: "Trwała dywidenda zwykle jest finansowana z zysków i wolnych przepływów pieniężnych, a nie z długu.",
      },
    ],
    formulaTitle: "Jak liczy się stopę dywidendy",
    formulaIntro:
      "Yield zmienia się, gdy zmienia się dywidenda albo cena akcji. Dlatego nie powinno się czytać go w oderwaniu od reszty analizy.",
    annualDividend: "Roczna dywidenda na akcję",
    sharePrice: "Aktualna cena akcji",
    dividendYield: "Stopa dywidendy",
    timelineTitle: "Kalendarz wypłaty",
    timelineIntro:
      "Konkretne daty różnią się między rynkami i spółkami, ale kolejność zwykle wygląda podobnie.",
    dates: [
      {
        title: "Dzień ogłoszenia",
        body: "Spółka ogłasza kwotę, formę wypłaty oraz najważniejsze daty.",
      },
      {
        title: "Dzień ex-dividend",
        body: "Kupujący w tym dniu lub później zwykle nie otrzymuje najbliższej dywidendy.",
      },
      {
        title: "Dzień ustalenia prawa",
        body: "Spółka lub depozyt wskazuje, którzy akcjonariusze są uprawnieni do wypłaty.",
      },
      {
        title: "Dzień wypłaty",
        body: "Gotówka lub akcje trafiają na rachunek przez brokera albo depozytariusza.",
      },
    ],
    exTitle: "Co dzieje się w dniu ex-dividend?",
    exIntro:
      "Gdy akcja zaczyna być notowana bez prawa do najbliższej dywidendy, jej cena często spada mniej więcej o wartość wypłaty. To nie jest darmowy zysk ani nagła strata. Część wartości przechodzi z ceny akcji na rachunek gotówkowy akcjonariusza.",
    beforeEx: "Przed ex-date",
    afterEx: "Po ex-date",
    dividendValue: "Wartość dywidendy",
    reinvestTitle: "Dlaczego reinwestowanie zmienia obraz",
    reinvestIntro:
      "Pojedyncza dywidenda to tylko przepływ gotówki. Reinwestowane dywidendy mogą kupować kolejne akcje, które w przyszłości również mogą generować wypłaty. To mechanizm procentu składanego ważny dla inwestorów dochodowych.",
    reinvestPoints: [
      {
        title: "Dochód gotówkowy",
        body: "Odbierasz wypłatę i używasz jej gdzie indziej. To ważne dla inwestorów potrzebujących regularnego dochodu.",
      },
      {
        title: "Reinwestowanie",
        body: "Przeznaczasz dywidendy na zakup kolejnych akcji. Z czasem może to zwiększać liczbę aktywów generujących dochód.",
      },
      {
        title: "Całkowita stopa zwrotu",
        body: "Patrz na zmianę ceny plus otrzymane dywidendy, a nie wyłącznie na sam yield.",
      },
    ],
    risksTitle: "Co może pójść źle?",
    risksIntro:
      "Inwestowanie dywidendowe nadal jest inwestowaniem w akcje. Dobre wyjaśnienie dywidend musi uwzględniać scenariusze ryzyka.",
    risks: [
      {
        title: "Obniżenie dywidendy",
        body: "Zarząd może zmniejszyć, zawiesić albo usunąć dywidendę, gdy przepływy słabną lub zmieniają się priorytety.",
      },
      {
        title: "Pułapki wysokiego yieldu",
        body: "Stopa dywidendy może wzrosnąć dlatego, że spadła cena akcji. Rynek może wyceniać przyszłe cięcie wypłaty.",
      },
      {
        title: "Podatki i withholding tax",
        body: "Dochód netto zależy od kraju, brokera, umów podatkowych i typu wypłaty.",
      },
      {
        title: "Ryzyko walutowe",
        body: "Zagraniczne dywidendy mogą zmieniać wartość po przeliczeniu na walutę, w której wydajesz pieniądze.",
      },
    ],
    ctaTitle: "Chcesz oceniać spółki dywidendowe?",
    ctaBody:
      "Następny krok to nie pogoń za najwyższym yieldem. To filtrowanie firm z trwałymi przepływami pieniężnymi, rozsądnym payout ratio i bilansem, który może wspierać wypłaty przez pełen cykl.",
    ctaPrimary: "Zobacz metodologię",
    ctaSecondary: "Zobacz próbkę researchu",
  },
  ar: {
    eyebrow: "أساسيات التوزيعات",
    title: "شرح توزيعات الأرباح",
    intro:
      "توزيعات الأرباح هي تحويل جزء من قيمة الشركة إلى المساهمين. غالبا تكون نقدا، وقد تكون أحيانا في شكل أسهم إضافية. الفكرة الأساسية بسيطة: تقرر الشركة إعادة جزء من الأرباح أو الاحتياطيات إلى المالكين.",
    bullets: [
      "يمكن أن يصل الدخل من دون بيع السهم.",
      "التوزيع غير مضمون ويمكن أن يتغير.",
      "العائد الكلي يجمع بين التوزيعات وحركة سعر السهم.",
    ],
    articleTitle: "شرح توزيعات الأرباح بشكل عملي",
    articleIntro:
      "توزيع الأرباح ليس مكافأة منفصلة عن نشاط الشركة. إنه إحدى طرق تخصيص رأس المال بعد دفع أجور الموظفين والموردين والدائنين والضرائب واحتياجات الاستثمار والالتزامات الأخرى.",
    articleSections: [
      {
        title: "الأنواع الشائعة للتوزيعات",
        body: [
          "التوزيع النقدي هو الشكل الأكثر شيوعا: يتم قيد مبلغ محدد لكل سهم للمساهمين المستحقين.",
          "توزيع الأسهم يمنح أسهما إضافية بدلا من النقد. أما التوزيع الخاص فهو دفعة غير متكررة ترتبط غالبا بتدفقات نقدية قوية، أو بيع أصول، أو فائض رأس مال.",
        ],
      },
      {
        title: "من يتخذ القرار",
        body: [
          "يعتمد اعتماد التوزيع على مجلس الإدارة أو اجتماع المساهمين حسب السوق ونظام الشركة. يمكن للإدارة اقتراح الدفع، لكن الشركة لا تبقى ملزمة دائما بسياسة توزيع واحدة.",
          "لذلك فإن تاريخ التوزيعات دليل مهم، لكنه ليس ضمانا.",
        ],
      },
      {
        title: "لماذا تدفع الشركات توزيعات",
        body: [
          "قد تستخدم الشركات التوزيعات لإعادة رأس المال الفائض، ومكافأة المساهمين، وإظهار الثقة في التدفقات النقدية، وفرض انضباط في تخصيص رأس المال.",
          "الشركة الناضجة ذات فرص النمو الأقل قد توزع نقدا أكثر من شركة سريعة النمو ما زالت تمول التوسع.",
        ],
      },
      {
        title: "لماذا يهتم المستثمرون",
        body: [
          "يمكن للتوزيعات أن توفر دخلا متكررا من دون بيع الأسهم. كما تجعل العائد الكلي أوضح، خاصة عند إعادة استثمارها لسنوات طويلة.",
          "السؤال المهم هو ما إذا كان التوزيع مدعوما بتدفقات نقدية حرة وميزانية قوية.",
        ],
      },
      {
        title: "الضرائب والاقتطاع",
        body: [
          "التوزيع الإجمالي لا يساوي التوزيع الصافي. ضريبة الاقتطاع، والضرائب المحلية، والاتفاقيات الضريبية، وإعدادات الوسيط، وتحويل العملة يمكن أن تغير المبلغ الذي تستلمه فعليا.",
          "يجب تقييم دخل التوزيعات بعد الضرائب وبعد تحويل العملة.",
        ],
      },
      {
        title: "إشارة للحوكمة",
        body: [
          "سياسة توزيع مستقرة قد تعبر عن الانضباط، لكنها قد تصبح عبئا إذا حمت الإدارة التوزيع على حساب الميزانية.",
          "التحليل الجيد للتوزيعات يربط الدفعة بتخصيص رأس المال، والرافعة المالية، وجودة التدفقات النقدية، ومتانة النشاط.",
        ],
      },
    ],
    typeGraphicLabels: { cash: "نقد", shares: "أسهم", special: "خاص" },
    flowTitle: "التدفق النقدي الأساسي",
    flowIntro:
      "الشركة الرابحة تولد نقدا، ثم تتم الموافقة على التوزيع، وبعدها يحصل المساهمون المؤهلون على المبلغ عبر بنية السوق والوسيط.",
    flowLabels: {
      company: "الشركة",
      board: "الموافقة",
      shareholder: "المساهم",
      profit: "أرباح أو احتياطيات",
      approval: "توزيع معلن",
      payment: "نقد في الحساب",
    },
    fundamentalsTitle: "ثلاث أفكار أولا",
    fundamentalsIntro:
      "قبل النظر إلى سهم توزيعات، افصل بين مبلغ التوزيع نفسه وبين صحة الشركة التي تموله.",
    fundamentals: [
      {
        title: "مبلغ التوزيع",
        body: "النقد المدفوع لكل سهم، مثلا 0.50 دولار كل ربع سنة. كلما زاد عدد الأسهم زاد إجمالي المبلغ قبل الضرائب.",
      },
      {
        title: "عائد التوزيع",
        body: "التوزيع السنوي مقسوما على سعر السهم الحالي. العائد المرتفع قد يكون جذابا، لكنه قد يشير أيضا إلى ضغوط.",
      },
      {
        title: "انضباط الدفع",
        body: "التوزيع المستدام يمول عادة من الأرباح والتدفقات النقدية الحرة، وليس من الاقتراض.",
      },
    ],
    formulaTitle: "كيف يحسب عائد التوزيع",
    formulaIntro:
      "يتغير العائد عندما يتغير التوزيع أو يتحرك سعر السهم. لذلك لا ينبغي قراءة العائد وحده.",
    annualDividend: "التوزيع السنوي لكل سهم",
    sharePrice: "سعر السهم الحالي",
    dividendYield: "عائد التوزيع",
    timelineTitle: "تقويم الدفع",
    timelineIntro:
      "تختلف التواريخ الدقيقة حسب السوق والشركة، لكن التسلسل غالبا يكون مشابها.",
    dates: [
      {
        title: "تاريخ الإعلان",
        body: "تعلن الشركة المبلغ، وطريقة الدفع، والتواريخ المهمة.",
      },
      {
        title: "تاريخ الاستبعاد",
        body: "من يشتري في هذا اليوم أو بعده غالبا لا يحصل على التوزيع القادم.",
      },
      {
        title: "تاريخ التسجيل",
        body: "تحدد الشركة أو جهة الإيداع المساهمين المستحقين للدفع.",
      },
      {
        title: "تاريخ الدفع",
        body: "يتم قيد النقد أو الأسهم عبر الوسيط أو أمين الحفظ.",
      },
    ],
    exTitle: "ماذا يحدث في تاريخ الاستبعاد؟",
    exIntro:
      "عندما يبدأ السهم التداول من دون حق الحصول على التوزيع القادم، غالبا ينخفض السعر تقريبا بمقدار التوزيع. هذا ليس ربحا مجانيا ولا خسارة مفاجئة؛ بل انتقال جزء من القيمة من سعر السهم إلى حساب النقد لدى المساهم.",
    beforeEx: "قبل تاريخ الاستبعاد",
    afterEx: "بعد تاريخ الاستبعاد",
    dividendValue: "قيمة التوزيع",
    reinvestTitle: "لماذا يغير إعادة الاستثمار الصورة",
    reinvestIntro:
      "التوزيع الواحد هو تدفق نقدي فقط. أما التوزيعات المعاد استثمارها فقد تشتري أسهما إضافية، وقد تولد هذه الأسهم توزيعات مستقبلية. هذه هي آلية التركيب التي يهتم بها مستثمرو الدخل على المدى الطويل.",
    reinvestPoints: [
      {
        title: "دخل نقدي",
        body: "تأخذ الدفعة وتستخدمها في مكان آخر. هذا مفيد لمن يحتاجون دخلا متكررا.",
      },
      {
        title: "إعادة الاستثمار",
        body: "تستخدم التوزيعات لشراء أسهم إضافية. قد يزيد ذلك عدد الوحدات المنتجة للدخل بمرور الوقت.",
      },
      {
        title: "العائد الكلي",
        body: "قيّم تغير السعر مع التوزيعات المستلمة، وليس العائد فقط.",
      },
    ],
    risksTitle: "ما المخاطر؟",
    risksIntro:
      "الاستثمار في التوزيعات يبقى استثمارا في الأسهم. لا يكتمل شرح التوزيعات من دون ذكر حالات الفشل.",
    risks: [
      {
        title: "خفض التوزيعات",
        body: "يمكن للإدارة خفض التوزيع أو تعليقه أو إلغاؤه عندما تضعف التدفقات النقدية أو تتغير الأولويات.",
      },
      {
        title: "فخ العائد المرتفع",
        body: "قد يرتفع العائد لأن سعر السهم انخفض. قد يكون السوق يتوقع خفضا مستقبليا.",
      },
      {
        title: "الضرائب والاقتطاع",
        body: "الدخل الصافي يعتمد على بلدك، والوسيط، والاتفاقيات الضريبية، ونوع التوزيع.",
      },
      {
        title: "مخاطر العملة",
        body: "قد تتغير قيمة التوزيعات الأجنبية بعد تحويلها إلى العملة التي تنفق بها.",
      },
    ],
    ctaTitle: "هل تريد تقييم شركات التوزيعات؟",
    ctaBody:
      "الخطوة التالية ليست مطاردة أعلى عائد. بل فرز الشركات ذات التدفقات النقدية المتينة، ونسب الدفع المعقولة، والميزانيات القادرة على دعم التوزيعات عبر الدورات.",
    ctaPrimary: "اطلع على المنهجية",
    ctaSecondary: "تصفح نموذج الأبحاث",
  },
};

export function DividendBasics() {
  const { lang } = useT();
  const copy = COPY[lang];

  return (
    <main>
      <section
        className="relative overflow-hidden text-[var(--aris-paper)]"
        style={{
          background:
            "radial-gradient(95% 70% at 88% 12%, rgba(198,166,103,.16), transparent 55%), linear-gradient(155deg, var(--aris-green-950), var(--aris-green-900) 58%, var(--aris-charcoal))",
        }}
      >
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7 pt-28 sm:pt-36 lg:pt-40 pb-14 sm:pb-20 grid lg:grid-cols-[1.02fr_.98fr] gap-10 lg:gap-14 items-center">
          <div className="min-w-0">
            <div className="eyebrow">{copy.eyebrow}</div>
            <h1 className="font-serif-display text-[34px] sm:text-[46px] lg:text-[64px] text-[var(--aris-paper)] mt-4 mb-5">
              {copy.title}
            </h1>
            <p className="text-[16px] sm:text-[19px] leading-[1.62] text-[var(--aris-paper)]/72 max-w-2xl">
              {copy.intro}
            </p>
            <div className="mt-7 grid gap-3 max-w-2xl">
              {copy.bullets.map(item => (
                <div key={item} className="flex items-start gap-3 text-[14px] sm:text-[15px] text-[var(--aris-paper)]/72">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--aris-gold)] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <DividendFlowGraphic copy={copy} />
        </div>
      </section>

      <LocalArticle copy={copy} />

      <section className="py-14 sm:py-20 lg:py-24" style={{ background: "var(--aris-paper)" }}>
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="max-w-3xl mb-10">
            <div className="eyebrow">{copy.fundamentalsTitle}</div>
            <h2 className="font-serif-display text-[26px] sm:text-[36px] lg:text-[46px] text-[var(--aris-ink)] my-4">
              {copy.fundamentalsTitle}
            </h2>
            <p className="text-[15px] sm:text-[17px] text-[var(--aris-muted)] leading-relaxed">
              {copy.fundamentalsIntro}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {copy.fundamentals.map((item, index) => (
              <div
                key={item.title}
                className="rounded-md p-5 sm:p-6"
                style={{ background: "var(--aris-offwhite)", border: "1px solid var(--aris-line-dark)" }}
              >
                <div className="font-mono-mark text-[12px] text-[var(--aris-gold)] mb-4">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif-display text-[21px] text-[var(--aris-ink)] mb-3">{item.title}</h3>
                <p className="text-[14px] leading-[1.6] text-[var(--aris-muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-24" style={{ background: "var(--aris-paper-2)" }}>
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7 grid lg:grid-cols-[.95fr_1.05fr] gap-10 lg:gap-14 items-start">
          <div>
            <div className="eyebrow">{copy.formulaTitle}</div>
            <h2 className="font-serif-display text-[26px] sm:text-[36px] lg:text-[44px] text-[var(--aris-ink)] mt-4 mb-4">
              {copy.formulaTitle}
            </h2>
            <p className="text-[15px] sm:text-[17px] text-[var(--aris-muted)] leading-relaxed">
              {copy.formulaIntro}
            </p>
            <YieldFormula copy={copy} />
          </div>

          <div>
            <div className="eyebrow">{copy.timelineTitle}</div>
            <h2 className="font-serif-display text-[26px] sm:text-[36px] lg:text-[44px] text-[var(--aris-ink)] mt-4 mb-4">
              {copy.timelineTitle}
            </h2>
            <p className="text-[15px] sm:text-[17px] text-[var(--aris-muted)] leading-relaxed">
              {copy.timelineIntro}
            </p>
            <Timeline dates={copy.dates} />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-24 text-[var(--aris-paper)]" style={{ background: "var(--aris-green-950)" }}>
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="eyebrow">{copy.exTitle}</div>
            <h2 className="font-serif-display text-[26px] sm:text-[36px] lg:text-[46px] text-[var(--aris-paper)] mt-4 mb-4">
              {copy.exTitle}
            </h2>
            <p className="text-[15px] sm:text-[17px] text-[var(--aris-paper)]/68 leading-relaxed">
              {copy.exIntro}
            </p>
          </div>
          <ExDateGraphic copy={copy} />
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-24" style={{ background: "var(--aris-offwhite)" }}>
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
          <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-10 lg:gap-14 items-start">
            <div>
              <div className="eyebrow">{copy.reinvestTitle}</div>
              <h2 className="font-serif-display text-[26px] sm:text-[36px] lg:text-[46px] text-[var(--aris-ink)] mt-4 mb-4">
                {copy.reinvestTitle}
              </h2>
              <p className="text-[15px] sm:text-[17px] text-[var(--aris-muted)] leading-relaxed">
                {copy.reinvestIntro}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {copy.reinvestPoints.map(point => (
                <div
                  key={point.title}
                  className="rounded-md p-5"
                  style={{ background: "var(--aris-paper)", border: "1px solid var(--aris-line-dark)" }}
                >
                  <h3 className="font-serif-display text-[19px] text-[var(--aris-ink)] mb-2">{point.title}</h3>
                  <p className="text-[13.5px] leading-[1.55] text-[var(--aris-muted)]">{point.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 sm:mt-18">
            <div className="max-w-3xl mb-8">
              <div className="eyebrow">{copy.risksTitle}</div>
              <h2 className="font-serif-display text-[26px] sm:text-[36px] lg:text-[44px] text-[var(--aris-ink)] mt-4 mb-4">
                {copy.risksTitle}
              </h2>
              <p className="text-[15px] sm:text-[17px] text-[var(--aris-muted)] leading-relaxed">
                {copy.risksIntro}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {copy.risks.map(risk => (
                <div
                  key={risk.title}
                  className="rounded-md p-5"
                  style={{ background: "var(--aris-green-950)", color: "var(--aris-paper)", border: "1px solid var(--aris-line)" }}
                >
                  <h3 className="font-serif-display text-[19px] text-[var(--aris-paper)] mb-2">{risk.title}</h3>
                  <p className="text-[13.5px] leading-[1.55] text-[var(--aris-paper)]/62">{risk.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 text-[var(--aris-paper)]" style={{ background: "var(--aris-ink)" }}>
        <div className="mx-auto max-w-[1240px] px-4 sm:px-7 flex flex-col lg:flex-row gap-7 lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="font-serif-display text-[26px] sm:text-[36px] lg:text-[44px] text-[var(--aris-paper)] mb-4">
              {copy.ctaTitle}
            </h2>
            <p className="text-[15px] sm:text-[17px] leading-relaxed text-[var(--aris-paper)]/66">
              {copy.ctaBody}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="/#method"
              className="inline-flex items-center justify-center rounded-sm bg-[var(--aris-gold)] hover:bg-[var(--aris-gold-soft)] text-[var(--aris-green-950)] px-5 py-3 text-sm font-semibold transition"
            >
              {copy.ctaPrimary}
            </a>
            <a
              href="/#sample"
              className="inline-flex items-center justify-center rounded-sm border border-[var(--aris-paper)]/25 hover:border-[var(--aris-gold)] hover:text-[var(--aris-gold)] text-[var(--aris-paper)] px-5 py-3 text-sm font-semibold transition"
            >
              {copy.ctaSecondary}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function LocalArticle({ copy }: { copy: BasicsCopy }) {
  return (
    <section className="py-14 sm:py-20 lg:py-24" style={{ background: "var(--aris-offwhite)" }}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
        <div className="grid lg:grid-cols-[.92fr_1.08fr] gap-10 lg:gap-14 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="eyebrow">{copy.articleTitle}</div>
            <h2 className="font-serif-display text-[26px] sm:text-[38px] lg:text-[48px] text-[var(--aris-ink)] mt-4 mb-4">
              {copy.articleTitle}
            </h2>
            <p className="text-[15px] sm:text-[17px] text-[var(--aris-muted)] leading-relaxed">
              {copy.articleIntro}
            </p>
            <DividendTypesGraphic labels={copy.typeGraphicLabels} />
          </div>

          <div className="grid gap-4">
            {copy.articleSections.map((section, index) => (
              <article
                key={section.title}
                className="rounded-md p-5 sm:p-6"
                style={{ background: "var(--aris-paper)", border: "1px solid var(--aris-line-dark)" }}
              >
                <div className="font-mono-mark text-[12px] text-[var(--aris-gold)] mb-3">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif-display text-[21px] sm:text-[24px] text-[var(--aris-ink)] mb-3">
                  {section.title}
                </h3>
                <div className="space-y-3">
                  {section.body.map(paragraph => (
                    <p key={paragraph} className="text-[14px] sm:text-[15px] leading-[1.65] text-[var(--aris-muted)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DividendTypesGraphic({ labels }: { labels: BasicsCopy["typeGraphicLabels"] }) {
  return (
    <div
      className="mt-7 rounded-md p-4 sm:p-5"
      style={{ background: "var(--aris-green-950)", border: "1px solid var(--aris-line)" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 620 310" className="w-full h-auto block">
        <defs>
          <linearGradient id="type-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d8bf8e" />
            <stop offset="100%" stopColor="#c6a667" />
          </linearGradient>
          <linearGradient id="type-green" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#249a64" />
            <stop offset="100%" stopColor="#1a6b48" />
          </linearGradient>
        </defs>
        <rect x="30" y="36" width="560" height="238" rx="18" fill="rgba(246,243,234,.045)" stroke="rgba(198,166,103,.22)" />
        <g transform="translate(74 84)">
          <rect width="128" height="118" rx="12" fill="rgba(246,243,234,.06)" stroke="rgba(198,166,103,.34)" />
          <circle cx="64" cy="42" r="25" fill="url(#type-gold)" />
          <path d="M51 42h26M64 29v26" stroke="#08160f" strokeWidth="5" strokeLinecap="round" />
          <text x="64" y="90" textAnchor="middle" fill="#f6f3ea" fontSize="17" fontWeight="700" fontFamily="system-ui, sans-serif">{labels.cash}</text>
        </g>
        <g transform="translate(246 84)">
          <rect width="128" height="118" rx="12" fill="rgba(246,243,234,.06)" stroke="rgba(198,166,103,.34)" />
          <circle cx="64" cy="42" r="25" fill="url(#type-green)" />
          <path d="M50 54h28l10-19H60zM57 43h24" fill="none" stroke="#08160f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <text x="64" y="90" textAnchor="middle" fill="#f6f3ea" fontSize="17" fontWeight="700" fontFamily="system-ui, sans-serif">{labels.shares}</text>
        </g>
        <g transform="translate(418 84)">
          <rect width="128" height="118" rx="12" fill="rgba(246,243,234,.06)" stroke="rgba(198,166,103,.34)" />
          <circle cx="64" cy="42" r="25" fill="#f6f3ea" />
          <path d="M64 26l5 12 13 1-10 8 3 13-11-7-11 7 3-13-10-8 13-1z" fill="#c6a667" />
          <text x="64" y="90" textAnchor="middle" fill="#f6f3ea" fontSize="17" fontWeight="700" fontFamily="system-ui, sans-serif">{labels.special}</text>
        </g>
        <path d="M138 226c72 34 174 34 244 0s122-38 174-8" fill="none" stroke="#c6a667" strokeWidth="3" strokeLinecap="round" strokeDasharray="7 8" />
      </svg>
    </div>
  );
}

function DividendFlowGraphic({ copy }: { copy: BasicsCopy }) {
  return (
    <div
      className="rounded-lg p-4 sm:p-6 lg:p-7"
      style={{
        background: "linear-gradient(165deg, rgba(15,40,29,.9), rgba(8,22,15,.74))",
        border: "1px solid var(--aris-line)",
        boxShadow: "0 40px 90px -45px rgba(0,0,0,.75)",
      }}
    >
      <div className="mb-5">
        <h2 className="font-serif-display text-[24px] sm:text-[30px] text-[var(--aris-paper)] mb-2">
          {copy.flowTitle}
        </h2>
        <p className="text-[13.5px] sm:text-[14.5px] leading-relaxed text-[var(--aris-paper)]/62">
          {copy.flowIntro}
        </p>
      </div>

      <svg viewBox="0 0 760 320" className="w-full h-auto block" aria-hidden="true">
        <defs>
          <linearGradient id="basics-flow-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d8bf8e" />
            <stop offset="100%" stopColor="#c6a667" />
          </linearGradient>
          <marker id="basics-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#c6a667" />
          </marker>
        </defs>

        <g fill="none" stroke="rgba(246,243,234,.08)" strokeWidth="1">
          <path d="M72 258H688" />
          <path d="M72 78H688" />
        </g>

        <FlowNode x={64} y={92} label={copy.flowLabels.company} sub={copy.flowLabels.profit} />
        <FlowNode x={294} y={92} label={copy.flowLabels.board} sub={copy.flowLabels.approval} />
        <FlowNode x={524} y={92} label={copy.flowLabels.shareholder} sub={copy.flowLabels.payment} />

        <path d="M228 162H286" stroke="#c6a667" strokeWidth="3" markerEnd="url(#basics-arrow)" />
        <path d="M458 162H516" stroke="#c6a667" strokeWidth="3" markerEnd="url(#basics-arrow)" />

        <g transform="translate(95 242)">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <rect key={i} x={i * 22} y={-12 - i * 9} width="12" height={12 + i * 9} rx="2" fill={i > 2 ? "#c6a667" : "rgba(198,166,103,.45)"} />
          ))}
        </g>
        <path d="M370 244c34-42 78-58 132-72" fill="none" stroke="#249a64" strokeWidth="3" strokeLinecap="round" />
        <circle cx="508" cy="170" r="5" fill="#249a64" />
      </svg>
    </div>
  );
}

function FlowNode({ x, y, label, sub }: { x: number; y: number; label: string; sub: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="166" height="140" rx="10" fill="rgba(246,243,234,.055)" stroke="rgba(198,166,103,.35)" />
      <circle cx="83" cy="48" r="27" fill="url(#basics-flow-gold)" opacity=".92" />
      <path d="M70 51l9 9 18-25" fill="none" stroke="#08160f" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="83" y="94" textAnchor="middle" fontSize="18" fontWeight="700" fill="#f6f3ea" fontFamily="system-ui, sans-serif">
        {label}
      </text>
      <text x="83" y="118" textAnchor="middle" fontSize="13" fill="rgba(246,243,234,.62)" fontFamily="system-ui, sans-serif">
        {sub}
      </text>
    </g>
  );
}

function YieldFormula({ copy }: { copy: BasicsCopy }) {
  return (
    <div
      className="mt-7 rounded-md p-5 sm:p-6"
      style={{ background: "var(--aris-offwhite)", border: "1px solid var(--aris-line-dark)" }}
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center text-center">
        <FormulaCell label={copy.annualDividend} value="$2.00" />
        <div className="hidden sm:block text-[var(--aris-gold)] text-2xl font-semibold">÷</div>
        <FormulaCell label={copy.sharePrice} value="$50.00" />
        <div className="hidden sm:block text-[var(--aris-gold)] text-2xl font-semibold">=</div>
        <FormulaCell label={copy.dividendYield} value="4.0%" accent />
      </div>
      <div className="mt-5 h-3 rounded-full bg-[var(--aris-paper-2)] overflow-hidden">
        <div className="h-full w-[40%] bg-[var(--aris-gold)] rounded-full" />
      </div>
    </div>
  );
}

function FormulaCell({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-sm px-3 py-4" style={{ background: accent ? "var(--aris-green-950)" : "var(--aris-paper)" }}>
      <div className={`font-serif-display text-[26px] ${accent ? "text-[var(--aris-gold)]" : "text-[var(--aris-ink)]"}`}>{value}</div>
      <div className={`mt-1 text-[11.5px] leading-snug ${accent ? "text-[var(--aris-paper)]/62" : "text-[var(--aris-muted)]"}`}>{label}</div>
    </div>
  );
}

function Timeline({ dates }: { dates: BasicsCopy["dates"] }) {
  return (
    <div className="mt-7">
      <div className="hidden md:grid grid-cols-4 gap-3 mb-4">
        {dates.map((date, i) => (
          <div key={date.title} className="text-center">
            <div className="mx-auto mb-3 h-9 w-9 rounded-full bg-[var(--aris-green-950)] text-[var(--aris-gold)] flex items-center justify-center font-mono-mark text-[12px]">
              {i + 1}
            </div>
            <div className="h-px bg-[var(--aris-line-dark)] -mt-[30px] mb-[29px]" />
          </div>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        {dates.map(date => (
          <div
            key={date.title}
            className="rounded-md p-4"
            style={{ background: "var(--aris-offwhite)", border: "1px solid var(--aris-line-dark)" }}
          >
            <h3 className="font-serif-display text-[18px] text-[var(--aris-ink)] mb-2">{date.title}</h3>
            <p className="text-[13px] leading-[1.55] text-[var(--aris-muted)]">{date.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExDateGraphic({ copy }: { copy: BasicsCopy }) {
  return (
    <div
      className="rounded-lg p-4 sm:p-6"
      style={{ background: "rgba(15,40,29,.55)", border: "1px solid var(--aris-line)" }}
    >
      <svg viewBox="0 0 680 340" className="w-full h-auto block" role="img" aria-label={copy.exTitle}>
        <defs>
          <linearGradient id="basics-ex-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c6a667" stopOpacity=".28" />
            <stop offset="100%" stopColor="#c6a667" stopOpacity="0" />
          </linearGradient>
          <marker id="basics-ex-drop" viewBox="0 0 10 10" refX="5" refY="8" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 0 L 5 10 z" fill="#f6f3ea" />
          </marker>
        </defs>
        <g stroke="rgba(246,243,234,.1)" strokeWidth="1">
          {[70, 130, 190, 250].map(y => (
            <line key={y} x1="48" x2="632" y1={y} y2={y} strokeDasharray="4 6" />
          ))}
        </g>
        <path d="M58 108 C150 104 222 104 310 106 L354 106 L354 152 C438 150 530 148 622 146" fill="none" stroke="#c6a667" strokeWidth="4" strokeLinecap="round" />
        <path d="M58 108 C150 104 222 104 310 106 L354 106 L354 152 C438 150 530 148 622 146 L622 292 L58 292 Z" fill="url(#basics-ex-area)" />
        <line x1="354" x2="354" y1="60" y2="288" stroke="#249a64" strokeWidth="2" strokeDasharray="6 6" />
        <path d="M330 110 L330 148" stroke="#f6f3ea" strokeWidth="2" markerEnd="url(#basics-ex-drop)" />
        <circle cx="354" cy="106" r="6" fill="#c6a667" stroke="#08160f" strokeWidth="3" />
        <circle cx="354" cy="152" r="6" fill="#249a64" stroke="#08160f" strokeWidth="3" />
        <text x="58" y="318" fill="rgba(246,243,234,.58)" fontSize="14" fontFamily="system-ui, sans-serif">$100</text>
        <text x="584" y="318" fill="rgba(246,243,234,.58)" fontSize="14" fontFamily="system-ui, sans-serif">$95</text>
        <text x="318" y="44" fill="#249a64" fontSize="14" fontWeight="700" fontFamily="system-ui, sans-serif">EX</text>
      </svg>
      <div className="mt-4 grid gap-3 sm:grid-cols-3 text-[13px]">
        <LegendItem color="#c6a667" label={copy.beforeEx} />
        <LegendItem color="#249a64" label={copy.afterEx} />
        <LegendItem color="#f6f3ea" label={copy.dividendValue} />
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[var(--aris-paper)]/68">
      <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: color }} />
      <span>{label}</span>
    </div>
  );
}

import { useT, type Lang } from "./i18n";

const CONTACT_EMAIL = "support@dividendaristocrat.com";

type Page = {
  title: string;
  eyebrow: string;
  intro: string;
  sections: Array<{ title: string; body: string[] }>;
};

const enPages: Record<string, Page> = {
  "/terms": {
    eyebrow: "Legal",
    title: "Terms of Service",
    intro: "These terms govern access to Aristocrat Dividend Research. The service provides educational research and screening tools only.",
    sections: [
      {
        title: "Educational research only",
        body: [
          "We publish general financial research, dividend screening, market commentary, and educational materials. We do not provide investment advice, portfolio management, brokerage, asset management, or financial planning services.",
          "Nothing on the platform is personalized to your objectives, financial situation, risk tolerance, tax position, or jurisdiction.",
        ],
      },
      {
        title: "User responsibility",
        body: [
          "You are responsible for your own financial decisions. Before buying, selling, or holding any security, consult an appropriately licensed professional in your jurisdiction.",
          "You agree not to treat our research as a recommendation, instruction, or promise of future return.",
        ],
      },
      {
        title: "Subscription access",
        body: [
          "Paid access is for the subscribing user only. You may not resell, redistribute, scrape, or republish the research without written permission.",
          "We may update, change, suspend, or discontinue parts of the service as the product develops.",
        ],
      },
    ],
  },
  "/privacy": {
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro: "We collect only the information needed to operate subscriptions, payments, support, and product analytics.",
    sections: [
      {
        title: "Information we collect",
        body: [
          "We may collect your email address, language preference, subscription status, payment identifiers from Stripe, support messages, and basic technical logs.",
          "Payment card details are handled by Stripe. We do not store full card numbers on our servers.",
        ],
      },
      {
        title: "How we use information",
        body: [
          "We use information to provide access, send research updates, process subscriptions, handle refunds, improve reliability, prevent abuse, and respond to support requests.",
          "We do not sell personal information.",
        ],
      },
      {
        title: "Data requests",
        body: [
          `For privacy requests, contact ${CONTACT_EMAIL}. Include the email address used for your subscription so we can identify the account.`,
        ],
      },
    ],
  },
  "/risk": {
    eyebrow: "Disclosures",
    title: "Risk Statement",
    intro: "Dividend investing involves meaningful risk. Dividend income is not guaranteed and securities can lose value.",
    sections: [
      {
        title: "Market and capital risk",
        body: [
          "Stocks, REITs, BDCs, ADRs, and other securities can decline substantially, including to zero. Past performance does not predict future results.",
          "Dividend yields can look high because a share price has fallen. A high yield is not automatically attractive or safe.",
        ],
      },
      {
        title: "Dividend risk",
        body: [
          "Dividends may be reduced, suspended, delayed, or eliminated by issuers at any time. Dividend history is not a guarantee of future payments.",
          "Tax, currency, interest-rate, credit, liquidity, and country risks may affect returns.",
        ],
      },
      {
        title: "No personal advice",
        body: [
          "Our research is educational and general. It is not tailored to your personal circumstances and should not be used as the sole basis for an investment decision.",
        ],
      },
    ],
  },
  "/refund": {
    eyebrow: "Membership",
    title: "Refund Policy",
    intro: "We want users to evaluate the research calmly. The current membership includes a 30-day money-back guarantee.",
    sections: [
      {
        title: "30-day refund window",
        body: [
          "If you are not satisfied, contact us within 30 days of your first payment and request a refund.",
          "Refunds are returned to the original payment method through Stripe. Bank and card processing times may vary.",
        ],
      },
      {
        title: "Subscription cancellation",
        body: [
          "You may cancel future renewals. Cancellation stops future billing but does not automatically refund prior charges outside the stated refund window.",
        ],
      },
      {
        title: "How to request a refund",
        body: [
          `Email ${CONTACT_EMAIL} from the address used for purchase and include “Refund request” in the subject line.`,
        ],
      },
    ],
  },
  "/arabic-support": {
    eyebrow: "Support",
    title: "Arabic Support",
    intro: "Arabic support is available for platform access, research navigation, billing questions, and general product help.",
    sections: [
      {
        title: "What we can help with",
        body: [
          "We can help with account access, payment issues, language settings, research navigation, and understanding how to read our methodology.",
          "Arabic support does not include personalized investment advice or recommendations.",
        ],
      },
      {
        title: "Contact",
        body: [
          `Email ${CONTACT_EMAIL}. You may write in Arabic or English.`,
        ],
      },
    ],
  },
  "/contact": {
    eyebrow: "Contact",
    title: "Contact",
    intro: CONTACT_EMAIL,
    sections: [],
  },
  "/about": {
    eyebrow: "Company",
    title: "About Us",
    intro: "Aristocrat Dividend Research focuses on educational financial analysis for income-oriented investors.",
    sections: [
      {
        title: "What we do",
        body: [
          "We have worked with financial analysis, screening, research workflows, and market data for years. The platform turns that experience into structured dividend-company research for investors who want a disciplined process.",
          "Our focus is on dividend history, payout discipline, balance-sheet context, valuation context, currency exposure, and long-term business durability.",
        ],
      },
      {
        title: "What we do not do",
        body: [
          "We do not provide personalized investment advice. We do not manage money, execute trades, or tell users what to buy or sell.",
          "Our role is education, research, and decision support. Your financial decisions remain your responsibility.",
        ],
      },
    ],
  },
};

const plPages: Record<string, Page> = {
  "/terms": {
    eyebrow: "Informacje prawne",
    title: "Regulamin świadczenia usługi",
    intro: "Ten regulamin określa zasady dostępu do Aristocrat Dividend Research. Usługa obejmuje wyłącznie edukacyjne materiały badawcze i narzędzia analityczne.",
    sections: [
      {
        title: "Wyłącznie edukacja i research",
        body: [
          "Publikujemy ogólne analizy finansowe, screeningi dywidendowe, komentarze rynkowe i materiały edukacyjne. Nie świadczymy usług doradztwa inwestycyjnego, zarządzania portfelem, pośrednictwa maklerskiego, zarządzania aktywami ani planowania finansowego.",
          "Żadna treść w serwisie nie jest dostosowana do Twoich celów, sytuacji finansowej, tolerancji ryzyka, sytuacji podatkowej ani jurysdykcji.",
        ],
      },
      {
        title: "Odpowiedzialność użytkownika",
        body: [
          "Samodzielnie odpowiadasz za swoje decyzje finansowe. Przed zakupem, sprzedażą lub utrzymywaniem jakiegokolwiek instrumentu finansowego skonsultuj się z odpowiednio licencjonowanym specjalistą w swojej jurysdykcji.",
          "Zgadzasz się nie traktować naszych materiałów jako rekomendacji, instrukcji inwestycyjnej ani obietnicy przyszłego wyniku.",
        ],
      },
      {
        title: "Dostęp subskrypcyjny",
        body: [
          "Płatny dostęp jest przeznaczony wyłącznie dla subskrybującego użytkownika. Nie wolno odsprzedawać, redystrybuować, scrapować ani ponownie publikować materiałów bez pisemnej zgody.",
          "Możemy aktualizować, zmieniać, zawieszać lub wycofywać części usługi w miarę rozwoju produktu.",
        ],
      },
    ],
  },
  "/privacy": {
    eyebrow: "Informacje prawne",
    title: "Polityka prywatności",
    intro: "Zbieramy tylko informacje potrzebne do obsługi subskrypcji, płatności, wsparcia i podstawowej analityki produktu.",
    sections: [
      {
        title: "Jakie informacje zbieramy",
        body: [
          "Możemy zbierać adres email, preferencję językową, status subskrypcji, identyfikatory płatności ze Stripe, wiadomości do wsparcia oraz podstawowe logi techniczne.",
          "Dane kart płatniczych obsługuje Stripe. Nie przechowujemy pełnych numerów kart na naszych serwerach.",
        ],
      },
      {
        title: "Jak wykorzystujemy informacje",
        body: [
          "Wykorzystujemy dane do zapewnienia dostępu, wysyłania aktualizacji researchu, obsługi subskrypcji, zwrotów, poprawy niezawodności, zapobiegania nadużyciom i odpowiadania na zgłoszenia.",
          "Nie sprzedajemy danych osobowych.",
        ],
      },
      {
        title: "Wnioski dotyczące danych",
        body: [
          `W sprawach prywatności napisz na ${CONTACT_EMAIL}. Podaj adres email użyty przy subskrypcji, abyśmy mogli zidentyfikować konto.`,
        ],
      },
    ],
  },
  "/risk": {
    eyebrow: "Oświadczenia",
    title: "Oświadczenie o ryzyku",
    intro: "Inwestowanie dywidendowe wiąże się z istotnym ryzykiem. Dochód z dywidend nie jest gwarantowany, a wartość papierów wartościowych może spaść.",
    sections: [
      {
        title: "Ryzyko rynkowe i ryzyko kapitału",
        body: [
          "Akcje, REIT-y, BDC, ADR-y i inne instrumenty mogą znacząco stracić na wartości, nawet do zera. Wyniki historyczne nie przewidują wyników przyszłych.",
          "Wysoka stopa dywidendy może wynikać ze spadku ceny akcji. Wysoki yield nie oznacza automatycznie atrakcyjnej ani bezpiecznej inwestycji.",
        ],
      },
      {
        title: "Ryzyko dywidendy",
        body: [
          "Emitenci mogą w dowolnym momencie obniżyć, zawiesić, opóźnić albo całkowicie wstrzymać dywidendy. Historia wypłat nie gwarantuje przyszłych wypłat.",
          "Na wynik mogą wpływać podatki, waluty, stopy procentowe, kredyt, płynność i ryzyka kraju.",
        ],
      },
      {
        title: "Brak indywidualnego doradztwa",
        body: [
          "Nasze materiały są edukacyjne i ogólne. Nie są dostosowane do Twojej indywidualnej sytuacji i nie powinny być jedyną podstawą decyzji inwestycyjnej.",
        ],
      },
    ],
  },
  "/refund": {
    eyebrow: "Subskrypcja",
    title: "Polityka zwrotów",
    intro: "Chcemy, aby użytkownicy mogli spokojnie ocenić research. Aktualna subskrypcja obejmuje 30-dniową gwarancję zwrotu pieniędzy.",
    sections: [
      {
        title: "30-dniowe okno zwrotu",
        body: [
          "Jeżeli nie jesteś zadowolony, skontaktuj się z nami w ciągu 30 dni od pierwszej płatności i poproś o zwrot.",
          "Zwroty są realizowane przez Stripe na pierwotną metodę płatności. Czas księgowania zależy od banku i operatora karty.",
        ],
      },
      {
        title: "Anulowanie subskrypcji",
        body: [
          "Możesz anulować przyszłe odnowienia. Anulowanie zatrzymuje przyszłe płatności, ale nie oznacza automatycznego zwrotu wcześniejszych opłat poza wskazanym oknem zwrotu.",
        ],
      },
      {
        title: "Jak poprosić o zwrot",
        body: [
          `Napisz na ${CONTACT_EMAIL} z adresu użytego przy zakupie i dodaj w temacie “Refund request”.`,
        ],
      },
    ],
  },
  "/arabic-support": {
    eyebrow: "Wsparcie",
    title: "Wsparcie po arabsku",
    intro: "Wsparcie po arabsku obejmuje dostęp do platformy, poruszanie się po researchu, pytania billingowe i ogólną pomoc produktową.",
    sections: [
      {
        title: "W czym pomagamy",
        body: [
          "Pomagamy przy dostępie do konta, problemach z płatnościami, ustawieniach języka, nawigacji po researchu i zrozumieniu metodologii.",
          "Wsparcie po arabsku nie obejmuje indywidualnych porad inwestycyjnych ani rekomendacji.",
        ],
      },
      {
        title: "Kontakt",
        body: [
          `Napisz na ${CONTACT_EMAIL}. Możesz pisać po arabsku lub po angielsku.`,
        ],
      },
    ],
  },
  "/contact": {
    eyebrow: "Kontakt",
    title: "Kontakt",
    intro: CONTACT_EMAIL,
    sections: [],
  },
  "/about": {
    eyebrow: "Firma",
    title: "O nas",
    intro: "Aristocrat Dividend Research koncentruje się na edukacyjnej analizie finansowej dla inwestorów nastawionych na dochód.",
    sections: [
      {
        title: "Czym się zajmujemy",
        body: [
          "Od lat pracujemy z analizą finansową, screeningiem, procesami researchu i danymi rynkowymi. Platforma przekłada to doświadczenie na uporządkowany research spółek dywidendowych dla inwestorów, którzy chcą działać według procesu.",
          "Skupiamy się na historii dywidend, dyscyplinie wypłat, bilansie, wycenie, ekspozycji walutowej i długoterminowej trwałości biznesu.",
        ],
      },
      {
        title: "Czego nie robimy",
        body: [
          "Nie świadczymy indywidualnego doradztwa inwestycyjnego. Nie zarządzamy pieniędzmi, nie wykonujemy transakcji i nie mówimy użytkownikom, co mają kupić lub sprzedać.",
          "Naszą rolą jest edukacja, research i wsparcie procesu decyzyjnego. Twoje decyzje finansowe pozostają Twoją odpowiedzialnością.",
        ],
      },
    ],
  },
};

const arPages: Record<string, Page> = {
  "/terms": {
    eyebrow: "قانوني",
    title: "شروط الخدمة",
    intro: "تنظم هذه الشروط الوصول إلى Aristocrat Dividend Research. تقدم الخدمة أبحاثا تعليمية وأدوات فرز وتحليل فقط.",
    sections: [
      {
        title: "أبحاث تعليمية فقط",
        body: [
          "ننشر أبحاثا مالية عامة، وفرزا لأسهم توزيعات الأرباح، وتعليقات سوقية، ومواد تعليمية. لا نقدم استشارات استثمارية، أو إدارة محافظ، أو وساطة، أو إدارة أصول، أو تخطيطا ماليا.",
          "لا يتم تخصيص أي محتوى على المنصة وفقا لأهدافك أو وضعك المالي أو تحملك للمخاطر أو وضعك الضريبي أو بلدك.",
        ],
      },
      {
        title: "مسؤولية المستخدم",
        body: [
          "أنت مسؤول عن قراراتك المالية. قبل شراء أو بيع أو الاحتفاظ بأي ورقة مالية، استشر مختصا مرخصا في بلدك.",
          "توافق على عدم اعتبار أبحاثنا توصية أو أمرا استثماريا أو وعدا بعائد مستقبلي.",
        ],
      },
      {
        title: "الوصول عبر الاشتراك",
        body: [
          "الوصول المدفوع مخصص للمستخدم المشترك فقط. لا يجوز بيع الأبحاث أو إعادة توزيعها أو نسخها آليا أو إعادة نشرها من دون موافقة مكتوبة.",
          "قد نقوم بتحديث أو تغيير أو تعليق أو إيقاف أجزاء من الخدمة مع تطور المنتج.",
        ],
      },
    ],
  },
  "/privacy": {
    eyebrow: "قانوني",
    title: "سياسة الخصوصية",
    intro: "نجمع فقط المعلومات اللازمة لتشغيل الاشتراكات والمدفوعات والدعم وتحليلات المنتج الأساسية.",
    sections: [
      {
        title: "المعلومات التي نجمعها",
        body: [
          "قد نجمع عنوان البريد الإلكتروني، وتفضيل اللغة، وحالة الاشتراك، ومعرفات الدفع من Stripe، ورسائل الدعم، وسجلات تقنية أساسية.",
          "تتم معالجة بيانات البطاقات بواسطة Stripe. لا نخزن أرقام البطاقات الكاملة على خوادمنا.",
        ],
      },
      {
        title: "كيف نستخدم المعلومات",
        body: [
          "نستخدم المعلومات لتوفير الوصول، وإرسال تحديثات الأبحاث، ومعالجة الاشتراكات، والتعامل مع طلبات الاسترداد، وتحسين الاعتمادية، ومنع إساءة الاستخدام، والرد على طلبات الدعم.",
          "لا نبيع المعلومات الشخصية.",
        ],
      },
      {
        title: "طلبات البيانات",
        body: [
          `لطلبات الخصوصية، تواصل معنا عبر ${CONTACT_EMAIL}. يرجى ذكر البريد المستخدم في الاشتراك حتى نتمكن من تحديد الحساب.`,
        ],
      },
    ],
  },
  "/risk": {
    eyebrow: "إفصاحات",
    title: "بيان المخاطر",
    intro: "ينطوي الاستثمار في توزيعات الأرباح على مخاطر مهمة. دخل التوزيعات غير مضمون، وقد تنخفض قيمة الأوراق المالية.",
    sections: [
      {
        title: "مخاطر السوق ورأس المال",
        body: [
          "قد تنخفض الأسهم وصناديق REIT وشركات BDC وشهادات ADR وغيرها من الأوراق المالية انخفاضا كبيرا، وقد تصل قيمتها إلى الصفر. الأداء السابق لا يتنبأ بالنتائج المستقبلية.",
          "قد يبدو العائد على التوزيعات مرتفعا لأن سعر السهم انخفض. العائد المرتفع لا يعني تلقائيا أن الاستثمار جذاب أو آمن.",
        ],
      },
      {
        title: "مخاطر التوزيعات",
        body: [
          "يمكن للشركات خفض التوزيعات أو تعليقها أو تأخيرها أو إلغاؤها في أي وقت. تاريخ التوزيعات لا يضمن المدفوعات المستقبلية.",
          "قد تؤثر الضرائب والعملات وأسعار الفائدة والائتمان والسيولة ومخاطر البلد في النتائج.",
        ],
      },
      {
        title: "لا توجد استشارة شخصية",
        body: [
          "أبحاثنا تعليمية وعامة. ليست مخصصة لظروفك الشخصية ولا ينبغي استخدامها كأساس وحيد لاتخاذ قرار استثماري.",
        ],
      },
    ],
  },
  "/refund": {
    eyebrow: "الاشتراك",
    title: "سياسة الاسترداد",
    intro: "نريد أن يتمكن المستخدمون من تقييم الأبحاث بهدوء. الاشتراك الحالي يتضمن ضمان استرداد خلال 30 يوما.",
    sections: [
      {
        title: "نافذة استرداد 30 يوما",
        body: [
          "إذا لم تكن راضيا، تواصل معنا خلال 30 يوما من أول دفعة واطلب الاسترداد.",
          "تتم إعادة المبالغ إلى وسيلة الدفع الأصلية عبر Stripe. قد تختلف مدة المعالجة حسب البنك ومزود البطاقة.",
        ],
      },
      {
        title: "إلغاء الاشتراك",
        body: [
          "يمكنك إلغاء التجديدات المستقبلية. الإلغاء يوقف الفوترة المستقبلية، لكنه لا يعني تلقائيا رد الرسوم السابقة خارج نافذة الاسترداد المحددة.",
        ],
      },
      {
        title: "كيفية طلب الاسترداد",
        body: [
          `راسل ${CONTACT_EMAIL} من البريد المستخدم في الشراء واكتب “Refund request” في عنوان الرسالة.`,
        ],
      },
    ],
  },
  "/arabic-support": {
    eyebrow: "الدعم",
    title: "الدعم باللغة العربية",
    intro: "يتوفر الدعم باللغة العربية للوصول إلى المنصة، والتنقل في الأبحاث، وأسئلة الفوترة، والمساعدة العامة في المنتج.",
    sections: [
      {
        title: "كيف يمكننا المساعدة",
        body: [
          "نساعد في الوصول إلى الحساب، ومشكلات الدفع، وإعدادات اللغة، والتنقل داخل الأبحاث، وفهم طريقة قراءة المنهجية.",
          "الدعم باللغة العربية لا يشمل استشارات استثمارية شخصية أو توصيات.",
        ],
      },
      {
        title: "تواصل",
        body: [
          `راسل ${CONTACT_EMAIL}. يمكنك الكتابة بالعربية أو الإنجليزية.`,
        ],
      },
    ],
  },
  "/contact": {
    eyebrow: "تواصل",
    title: "تواصل معنا",
    intro: CONTACT_EMAIL,
    sections: [],
  },
  "/about": {
    eyebrow: "الشركة",
    title: "من نحن",
    intro: "تركز Aristocrat Dividend Research على التحليل المالي التعليمي للمستثمرين المهتمين بالدخل.",
    sections: [
      {
        title: "ماذا نفعل",
        body: [
          "عملنا لسنوات في التحليل المالي، وعمليات الفرز، وسير عمل الأبحاث، وبيانات السوق. تحول المنصة هذه الخبرة إلى أبحاث منظمة عن شركات توزيعات الأرباح للمستثمرين الذين يريدون عملية منضبطة.",
          "نركز على تاريخ التوزيعات، وانضباط الدفع، وسياق الميزانية، وسياق التقييم، والتعرض للعملات، ومتانة الأعمال على المدى الطويل.",
        ],
      },
      {
        title: "ما الذي لا نفعله",
        body: [
          "لا نقدم استشارات استثمارية شخصية. لا ندير الأموال، ولا ننفذ الصفقات، ولا نقول للمستخدمين ماذا يشترون أو يبيعون.",
          "دورنا هو التعليم والبحث ودعم عملية القرار. تبقى قراراتك المالية مسؤوليتك.",
        ],
      },
    ],
  },
};

const legalAdditions: Record<Lang, Partial<Record<string, Page["sections"]>>> = {
  en: {
    "/terms": [
      {
        title: "Acceptance and scope",
        body: [
          "By accessing the website, subscribing, opening an email, downloading research, or using any related feature, you agree to these terms. If you do not agree, do not use the service.",
          "These terms apply to the website, email research, sample reports, paid reports, dashboards, partner links, checkout flows, support communications, and any other content made available under the Aristocrat Dividend Research name.",
        ],
      },
      {
        title: "No investment adviser, broker, fiduciary, or client relationship",
        body: [
          "Aristocrat Dividend Research is not acting as your investment adviser, broker, dealer, asset manager, fiduciary, tax adviser, legal adviser, accountant, or financial planner.",
          "No advisory, fiduciary, brokerage, discretionary management, custody, or client relationship is created by your use of the service, by payment of a subscription fee, by receiving research, or by any support response.",
        ],
      },
      {
        title: "No suitability review or personalized recommendation",
        body: [
          "We do not know and do not review your full financial position, objectives, investment horizon, liquidity needs, tax position, religious requirements, risk tolerance, existing portfolio, or regulatory status.",
          "Any company, yield, ranking, watchlist, score, screen, table, chart, simulation, or methodology output is general information. It is not a personalized recommendation, investment instruction, or statement that a security is suitable for you.",
        ],
      },
      {
        title: "Data, research, and methodology limitations",
        body: [
          "Research may use third-party data providers, issuer filings, market data, calculated metrics, internal screening rules, estimates, and editorial judgement. Data can be delayed, incomplete, stale, restated, misclassified, or unavailable.",
          "We may change methodologies, scoring, filters, universes, definitions, coverage, and data providers at any time. A past inclusion of a company does not mean it will remain covered or continue to meet any screen.",
        ],
      },
      {
        title: "No warranty and no guaranteed outcome",
        body: [
          "The service is provided on an “as is” and “as available” basis. We do not warrant that the service will be uninterrupted, error-free, complete, accurate, timely, profitable, suitable for any purpose, or available in every jurisdiction.",
          "We do not guarantee any dividend, yield, price return, capital preservation, tax result, currency result, halal or Sharia outcome, portfolio result, or investment performance.",
        ],
      },
      {
        title: "User decisions and independent verification",
        body: [
          "You are solely responsible for all investment, tax, legal, religious, and financial decisions you make. Before acting, independently verify all information from primary sources and consult licensed professionals in your jurisdiction.",
          "You should not rely on a single table, score, email, chart, yield, simulation, or report as the only basis for buying, selling, holding, avoiding, or sizing any security.",
        ],
      },
      {
        title: "Subscriptions, billing, renewals, and cancellation",
        body: [
          "Paid subscriptions may renew automatically unless cancelled before the renewal date. Prices, currencies, taxes, payment methods, and plan features may vary by region and may change prospectively.",
          "Payments are processed by Stripe or another payment provider. We do not store full card numbers, CVC codes, or raw payment credentials on our servers. Your payment provider may apply its own terms, privacy policy, fraud checks, and processing rules.",
        ],
      },
      {
        title: "Intellectual property and permitted use",
        body: [
          "All research, screens, rankings, text, tables, charts, designs, methodology descriptions, email content, and platform materials are owned by us or our licensors and are protected by intellectual-property laws.",
          "Your subscription gives you a limited, personal, revocable, non-transferable right to access the service for your own internal educational use. You may not resell, syndicate, scrape, copy in bulk, publish, train models on, or redistribute the content without written permission.",
        ],
      },
      {
        title: "Conflicts, compensation, and editorial independence",
        body: [
          "Unless expressly disclosed, we are not paid by covered companies to publish research about them. Subscription fees, affiliate links, partner links, or referral programs may create commercial incentives, and we will seek to disclose material arrangements where relevant.",
          "Users should assume that authors, operators, contractors, or related persons may hold positions in securities mentioned unless a specific report states otherwise. Such holdings do not make any content a recommendation.",
        ],
      },
      {
        title: "Limitation of liability",
        body: [
          "To the maximum extent permitted by applicable law, we will not be liable for investment losses, lost profits, lost opportunities, lost data, business interruption, tax consequences, currency losses, indirect losses, consequential losses, special damages, or punitive damages arising from use of the service.",
          "Where liability cannot be excluded, our aggregate liability will be limited to the amount you paid for the service during the three months before the event giving rise to the claim, unless mandatory law requires a higher amount.",
        ],
      },
      {
        title: "Indemnity and misuse",
        body: [
          "You agree to indemnify and hold us harmless from claims, losses, damages, costs, and expenses arising from your misuse of the service, breach of these terms, unlawful redistribution, violation of third-party rights, or investment decisions made by you or by anyone relying on your redistribution of our materials.",
        ],
      },
      {
        title: "Governing law, mandatory consumer rights, and changes",
        body: [
          "These terms are intended to operate to the fullest extent permitted by law. Nothing in them limits mandatory rights that cannot legally be waived in your jurisdiction.",
          "If a specific contracting entity, governing law, or venue is stated on an invoice, checkout page, or written agreement, that designation applies. Otherwise, disputes will be handled under the laws and courts connected with the operator’s registered place of business, subject to mandatory consumer-protection rules.",
          "We may update these terms from time to time. Continued use after publication of revised terms means you accept the updated version.",
        ],
      },
    ],
    "/privacy": [
      {
        title: "Controller and contact point",
        body: [
          `Aristocrat Dividend Research acts as the controller for personal data collected through the website, subscription flow, research delivery, and support interactions, unless a third-party provider acts as an independent controller for its own processing. Contact: ${CONTACT_EMAIL}.`,
          "If a formal legal entity is identified on an invoice, checkout page, or written agreement, that entity is the controller for the relevant account relationship.",
        ],
      },
      {
        title: "Categories of personal data",
        body: [
          "We may process account data such as email address, language preference, country or region, subscription status, plan selection, consent records, support messages, and cancellation or refund requests.",
          "We may process technical data such as IP address, device type, browser, approximate location, referring URL, pages visited, timestamps, logs, security events, cookie identifiers, and interaction data.",
          "We may receive payment-related identifiers from Stripe, including customer ID, subscription ID, checkout session ID, payment status, charge or invoice status, refund status, currency, amount, and limited billing details. We do not receive or store full card numbers or CVC codes.",
        ],
      },
      {
        title: "Sources of data",
        body: [
          "We collect data directly from you when you subscribe, contact support, change language, submit forms, or use the service.",
          "We may receive limited data from service providers such as Stripe, email delivery providers, hosting providers, analytics tools, fraud-prevention tools, and referral or partner systems.",
        ],
      },
      {
        title: "Purposes and legal bases",
        body: [
          "We process data to provide the service, authenticate access, deliver research, process payments, manage subscriptions, respond to support, prevent abuse, secure the platform, comply with law, maintain records, improve the product, and send service or marketing communications where permitted.",
          "Depending on your location, our legal bases may include performance of a contract, legitimate interests, consent, compliance with legal obligations, establishment or defence of legal claims, and fraud prevention.",
        ],
      },
      {
        title: "Processors and third-party recipients",
        body: [
          "We may share data with processors and providers that help us operate the service, including hosting, database, email delivery, payment processing, customer support, analytics, security, logging, legal, accounting, and compliance providers.",
          "Stripe processes payment and transaction data under its own privacy terms and may act as an independent controller for certain payment, fraud, compliance, and network purposes.",
          "We may disclose data where required by law, court order, regulator, payment-network rule, tax authority, law-enforcement request, fraud investigation, corporate transaction, or to protect rights, safety, and security.",
        ],
      },
      {
        title: "International transfers",
        body: [
          "Your data may be processed in countries other than your country of residence, including by providers in the United States, European Economic Area, United Kingdom, or other locations where our infrastructure or providers operate.",
          "Where required, we rely on appropriate safeguards such as contractual protections, standard contractual clauses, adequacy decisions, provider compliance programs, or other lawful transfer mechanisms.",
        ],
      },
      {
        title: "Retention",
        body: [
          "We retain personal data only as long as reasonably needed for the purposes described in this policy, including account operation, research delivery, billing, tax, accounting, security, fraud prevention, dispute resolution, legal compliance, and backup retention.",
          "Payment, invoice, support, and security records may be retained longer where required for audit, tax, chargeback, regulatory, or legal-defence purposes. When data is no longer needed, we delete, anonymize, or restrict it where feasible.",
        ],
      },
      {
        title: "Your rights",
        body: [
          "Depending on your jurisdiction, you may have rights to access, correct, delete, restrict, object to processing, withdraw consent, request portability, opt out of marketing, or lodge a complaint with a data-protection authority.",
          `To exercise rights, email ${CONTACT_EMAIL} from the email address linked to your subscription. We may need to verify your identity before acting on a request.`,
        ],
      },
      {
        title: "Cookies, analytics, and marketing",
        body: [
          "We may use cookies or similar technologies for language preference, session continuity, security, analytics, attribution, and product improvement. Browser settings may allow you to block or delete cookies, but some features may stop working.",
          "Marketing emails can be unsubscribed from using the link in the email or by contacting support. We may still send transactional or service messages related to your account, payment, legal notices, or security.",
        ],
      },
      {
        title: "Security and children",
        body: [
          "We use reasonable technical and organizational measures designed to protect personal data, but no internet service is completely secure. You are responsible for keeping access links, email accounts, and devices secure.",
          "The service is not directed to children and is not intended for users below the age required to enter a binding subscription contract in their jurisdiction.",
        ],
      },
      {
        title: "Changes to this policy",
        body: [
          "We may update this policy as the service, providers, legal requirements, or data practices change. The updated version will be posted on this page with effect from publication unless a later date is stated.",
        ],
      },
    ],
    "/risk": [
      {
        title: "Read this before using any research",
        body: [
          "All investment activity involves risk. You can lose money, including the entire amount invested. Dividend strategies are not low-risk merely because they focus on income-producing companies.",
          "The research is educational and general. It should be treated as one input into your own process, not as a decision system, guarantee, or substitute for licensed advice.",
        ],
      },
      {
        title: "Equity and issuer risk",
        body: [
          "Shares represent ownership interests in businesses. Company earnings, management decisions, competition, litigation, regulation, financing conditions, accounting issues, fraud, dilution, and insolvency can materially reduce share value.",
          "Even large, established companies can suffer permanent impairment. A long operating history or dividend record does not eliminate business risk.",
        ],
      },
      {
        title: "Dividend and high-yield risk",
        body: [
          "Dividends are discretionary and may be reduced, suspended, delayed, paid irregularly, or eliminated. Boards may prioritize debt reduction, acquisitions, capital spending, regulation, or liquidity over distributions.",
          "High dividend yield can indicate financial stress, falling share price, unsustainable payout, leverage, cyclical earnings, or market expectation of a cut. Yield alone is not a measure of safety.",
        ],
      },
      {
        title: "BDC, REIT, credit, and leverage risk",
        body: [
          "Business development companies, mortgage REITs, equity REITs, lenders, and other income vehicles can have special risks, including leverage, interest-rate sensitivity, credit losses, refinancing risk, asset valuation uncertainty, distribution volatility, and regulatory constraints.",
          "Income vehicles may finance distributions partly through leverage, asset sales, capital markets, or return of capital. Reported yield may not equal sustainable economic income.",
        ],
      },
      {
        title: "Currency, tax, withholding, and cross-border risk",
        body: [
          "Many securities are priced and pay dividends in currencies different from your home currency. Exchange-rate moves can materially reduce local-currency returns even if the security performs well in its listing currency.",
          "Taxes, withholding, treaty eligibility, account type, residence, reporting obligations, and local rules can materially change your net return. We do not provide tax advice.",
        ],
      },
      {
        title: "Market, liquidity, and concentration risk",
        body: [
          "Markets can fall rapidly due to recessions, inflation, interest rates, geopolitical events, pandemics, banking stress, liquidity shocks, or investor sentiment. Liquidity can disappear when you need it most.",
          "Concentrating in high-yield names, one sector, one country, one currency, or one theme can increase losses. Diversification does not guarantee a profit or prevent loss.",
        ],
      },
      {
        title: "Data, model, and screening risk",
        body: [
          "Screens, scores, tables, charts, and simulations depend on data quality and assumptions. Provider data may be wrong, late, restated, missing, mapped incorrectly, or inconsistent across sources.",
          "Backtests, examples, compounding simulations, target yields, and sample portfolios are hypothetical or illustrative unless expressly stated otherwise. They do not predict future results.",
        ],
      },
      {
        title: "Halal-aware and Sharia limitations",
        body: [
          "Halal-aware filtering is a research input based on sector and financial screens. It is not a fatwa, not a formal Sharia certification, and not a substitute for review by a qualified Sharia scholar.",
          "Company activities, revenue mix, debt, cash, interest income, and purification requirements can change over time and may require interpretation beyond our screening process.",
        ],
      },
      {
        title: "Broker, execution, and operational risk",
        body: [
          "We do not execute trades, hold custody, select brokers for you, or monitor your account. Brokerage outages, order errors, spreads, settlement rules, fees, margin, corporate actions, and account restrictions can affect outcomes.",
        ],
      },
      {
        title: "Your obligation",
        body: [
          "Before investing, verify data from issuer filings and primary sources, understand the instrument, read relevant risk disclosures, consider your full financial situation, and consult licensed investment, tax, legal, and religious professionals where appropriate.",
        ],
      },
    ],
  },
  pl: {
    "/terms": [
      {
        title: "Akceptacja i zakres",
        body: [
          "Korzystając ze strony, subskrybując usługę, otwierając email, pobierając research albo używając dowolnej funkcji, akceptujesz niniejszy regulamin. Jeżeli się nie zgadzasz, nie korzystaj z usługi.",
          "Regulamin obejmuje stronę internetową, emaile z researchem, raporty próbne, raporty płatne, dashboardy, linki partnerskie, proces płatności, komunikację ze wsparciem oraz wszystkie materiały udostępniane pod nazwą Aristocrat Dividend Research.",
        ],
      },
      {
        title: "Brak doradcy, brokera, powiernika i relacji klient-doradca",
        body: [
          "Aristocrat Dividend Research nie działa jako Twój doradca inwestycyjny, broker, dealer, zarządzający aktywami, powiernik, doradca podatkowy, prawny, księgowy ani planista finansowy.",
          "Korzystanie z usługi, opłacenie subskrypcji, otrzymanie researchu albo odpowiedź wsparcia nie tworzy relacji doradczej, powierniczej, maklerskiej, zarządzania portfelem, przechowywania aktywów ani indywidualnej relacji klienta.",
        ],
      },
      {
        title: "Brak badania odpowiedniości i rekomendacji indywidualnej",
        body: [
          "Nie znamy i nie analizujemy pełnej Twojej sytuacji finansowej, celów, horyzontu inwestycyjnego, potrzeb płynnościowych, podatków, wymagań religijnych, tolerancji ryzyka, istniejącego portfela ani statusu regulacyjnego.",
          "Każda spółka, stopa dywidendy, ranking, watchlista, score, filtr, tabela, wykres, symulacja albo wynik metodologii jest informacją ogólną. Nie jest rekomendacją indywidualną, instrukcją inwestycyjną ani stwierdzeniem, że dany instrument jest dla Ciebie odpowiedni.",
        ],
      },
      {
        title: "Ograniczenia danych, researchu i metodologii",
        body: [
          "Research może korzystać z zewnętrznych dostawców danych, raportów emitentów, danych rynkowych, obliczonych wskaźników, wewnętrznych reguł screeningu, szacunków i oceny redakcyjnej. Dane mogą być opóźnione, niepełne, nieaktualne, skorygowane po czasie, błędnie sklasyfikowane albo niedostępne.",
          "Możemy w dowolnym czasie zmieniać metodologie, scoring, filtry, zakres analizowanych spółek, definicje, pokrycie i dostawców danych. Historyczne uwzględnienie spółki nie oznacza, że pozostanie objęta researchem albo będzie dalej spełniała kryteria.",
        ],
      },
      {
        title: "Brak gwarancji",
        body: [
          "Usługa jest udostępniana w stanie “takim, jaki jest” i “w miarę dostępności”. Nie gwarantujemy, że będzie nieprzerwana, bezbłędna, kompletna, dokładna, aktualna, zyskowna, odpowiednia do określonego celu albo dostępna w każdej jurysdykcji.",
          "Nie gwarantujemy dywidendy, stopy dywidendy, zwrotu z ceny, ochrony kapitału, wyniku podatkowego, wyniku walutowego, zgodności halal lub Sharia, wyniku portfela ani żadnej stopy zwrotu.",
        ],
      },
      {
        title: "Twoje decyzje i niezależna weryfikacja",
        body: [
          "Wyłącznie Ty odpowiadasz za swoje decyzje inwestycyjne, podatkowe, prawne, religijne i finansowe. Przed działaniem samodzielnie zweryfikuj informacje w źródłach pierwotnych i skonsultuj się z licencjonowanymi specjalistami w swojej jurysdykcji.",
          "Nie należy opierać zakupu, sprzedaży, trzymania, unikania ani wielkości pozycji na jednej tabeli, ocenie, wiadomości email, wykresie, stopie dywidendy, symulacji lub raporcie.",
        ],
      },
      {
        title: "Subskrypcje, płatności i anulowanie",
        body: [
          "Płatne subskrypcje mogą odnawiać się automatycznie, chyba że zostaną anulowane przed datą odnowienia. Ceny, waluty, podatki, metody płatności i funkcje planów mogą różnić się regionalnie i mogą zmieniać się na przyszłość.",
          "Płatności obsługuje Stripe albo inny operator płatności. Nie przechowujemy pełnych numerów kart, kodów CVC ani surowych danych płatniczych na naszych serwerach. Operator płatności może stosować własne warunki, politykę prywatności, kontrole antyfraudowe i reguły przetwarzania.",
        ],
      },
      {
        title: "Własność intelektualna i dozwolone użycie",
        body: [
          "Cały research, screeningi, rankingi, teksty, tabele, wykresy, opisy metodologii, treści emaili i materiały platformy należą do nas albo naszych licencjodawców i są chronione prawami własności intelektualnej.",
          "Subskrypcja daje ograniczone, osobiste, odwołalne i niezbywalne prawo dostępu do usługi wyłącznie do własnego użytku edukacyjnego. Nie wolno odsprzedawać, syndykować, scrapować, masowo kopiować, publikować, trenować modeli na treściach ani redystrybuować materiałów bez pisemnej zgody.",
        ],
      },
      {
        title: "Konflikty interesów i niezależność redakcyjna",
        body: [
          "O ile nie ujawniono inaczej, nie otrzymujemy wynagrodzenia od analizowanych spółek za publikację researchu na ich temat. Opłaty subskrypcyjne, linki afiliacyjne, linki partnerskie albo programy referralowe mogą tworzyć bodźce komercyjne; istotne ustalenia będziemy ujawniać tam, gdzie ma to znaczenie.",
          "Użytkownik powinien zakładać, że autorzy, operatorzy, wykonawcy lub osoby powiązane mogą posiadać pozycje w omawianych instrumentach, chyba że konkretny raport stanowi inaczej. Takie posiadanie nie zmienia treści w rekomendację.",
        ],
      },
      {
        title: "Ograniczenie odpowiedzialności",
        body: [
          "W maksymalnym zakresie dozwolonym przez prawo nie odpowiadamy za straty inwestycyjne, utracone zyski, utracone okazje, utratę danych, przerwy biznesowe, skutki podatkowe, straty walutowe, szkody pośrednie, następcze, szczególne ani karne wynikające z korzystania z usługi.",
          "Jeżeli odpowiedzialności nie można wyłączyć, nasza łączna odpowiedzialność będzie ograniczona do kwoty zapłaconej przez Ciebie za usługę w okresie trzech miesięcy poprzedzających zdarzenie powodujące roszczenie, chyba że bezwzględnie obowiązujące prawo wymaga wyższej kwoty.",
        ],
      },
      {
        title: "Odszkodowanie i nadużycia",
        body: [
          "Zgadzasz się zwolnić nas z odpowiedzialności i pokryć roszczenia, straty, szkody, koszty oraz wydatki wynikające z niewłaściwego użycia usługi, naruszenia regulaminu, bezprawnej redystrybucji, naruszenia praw osób trzecich albo decyzji inwestycyjnych podjętych przez Ciebie lub osoby polegające na materiałach, które im przekazałeś.",
        ],
      },
      {
        title: "Prawo właściwe, prawa konsumenta i zmiany",
        body: [
          "Regulamin ma działać w najszerszym zakresie dozwolonym przez prawo. Nic w nim nie ogranicza praw obowiązkowych, których nie można skutecznie wyłączyć w Twojej jurysdykcji.",
          "Jeżeli faktura, checkout albo pisemna umowa wskazuje konkretny podmiot, prawo właściwe lub sąd, stosuje się takie wskazanie. W przeciwnym razie spory będą rozpatrywane według prawa i sądów związanych z zarejestrowaną siedzibą operatora, z zastrzeżeniem obowiązkowych przepisów ochrony konsumenta.",
          "Możemy okresowo aktualizować regulamin. Dalsze korzystanie z usługi po publikacji zmian oznacza akceptację nowej wersji.",
        ],
      },
    ],
    "/privacy": [
      {
        title: "Administrator danych i kontakt",
        body: [
          `Aristocrat Dividend Research działa jako administrator danych osobowych zbieranych przez stronę, proces subskrypcji, wysyłkę researchu i komunikację ze wsparciem, chyba że zewnętrzny dostawca działa jako niezależny administrator dla własnego przetwarzania. Kontakt: ${CONTACT_EMAIL}.`,
          "Jeżeli faktura, checkout albo pisemna umowa wskazuje formalny podmiot prawny, ten podmiot jest administratorem dla danej relacji konta.",
        ],
      },
      {
        title: "Kategorie danych osobowych",
        body: [
          "Możemy przetwarzać dane konta, takie jak adres email, preferencja językowa, kraj lub region, status subskrypcji, wybrany plan, zapisy zgód, wiadomości do wsparcia oraz prośby o anulowanie lub zwrot.",
          "Możemy przetwarzać dane techniczne, takie jak adres IP, typ urządzenia, przeglądarka, przybliżona lokalizacja, adres odsyłający, odwiedzone strony, znaczniki czasu, logi, zdarzenia bezpieczeństwa, identyfikatory cookies i dane interakcji.",
          "Od Stripe możemy otrzymywać identyfikatory płatnicze, w tym ID klienta, ID subskrypcji, ID sesji checkout, status płatności, status obciążenia lub faktury, status zwrotu, walutę, kwotę i ograniczone dane rozliczeniowe. Nie otrzymujemy ani nie przechowujemy pełnych numerów kart ani kodów CVC.",
        ],
      },
      {
        title: "Źródła danych",
        body: [
          "Zbieramy dane bezpośrednio od Ciebie, gdy subskrybujesz, kontaktujesz się ze wsparciem, zmieniasz język, wysyłasz formularz albo korzystasz z usługi.",
          "Możemy otrzymywać ograniczone dane od dostawców usług, takich jak Stripe, dostawcy emaili, hosting, analityka, narzędzia antyfraudowe oraz systemy referralowe lub partnerskie.",
        ],
      },
      {
        title: "Cele i podstawy prawne",
        body: [
          "Przetwarzamy dane w celu świadczenia usługi, autoryzacji dostępu, dostarczania researchu, obsługi płatności, zarządzania subskrypcją, odpowiedzi na wsparcie, zapobiegania nadużyciom, zabezpieczenia platformy, zgodności z prawem, prowadzenia dokumentacji, ulepszania produktu oraz wysyłki komunikatów serwisowych lub marketingowych tam, gdzie jest to dozwolone.",
          "W zależności od Twojej lokalizacji podstawami prawnymi mogą być wykonanie umowy, prawnie uzasadniony interes, zgoda, obowiązek prawny, ustalenie lub obrona roszczeń oraz zapobieganie oszustwom.",
        ],
      },
      {
        title: "Procesorzy i odbiorcy",
        body: [
          "Możemy udostępniać dane dostawcom pomagającym działać usłudze, w tym hostingowi, bazom danych, wysyłce emaili, obsłudze płatności, wsparciu klienta, analityce, bezpieczeństwu, logowaniu, prawnikom, księgowym i podmiotom compliance.",
          "Stripe przetwarza dane płatności i transakcji zgodnie ze swoją polityką prywatności i może działać jako niezależny administrator dla niektórych celów płatniczych, antyfraudowych, compliance i sieci płatniczych.",
          "Możemy ujawnić dane, gdy wymaga tego prawo, sąd, regulator, zasady sieci płatniczej, organ podatkowy, organy ścigania, dochodzenie antyfraudowe, transakcja korporacyjna albo ochrona praw, bezpieczeństwa i integralności usługi.",
        ],
      },
      {
        title: "Transfery międzynarodowe",
        body: [
          "Dane mogą być przetwarzane poza krajem Twojego zamieszkania, w tym przez dostawców w Stanach Zjednoczonych, Europejskim Obszarze Gospodarczym, Wielkiej Brytanii albo innych miejscach, w których działa infrastruktura lub nasi dostawcy.",
          "Tam, gdzie jest to wymagane, stosujemy odpowiednie zabezpieczenia, takie jak klauzule umowne, standardowe klauzule umowne, decyzje stwierdzające odpowiedni poziom ochrony, programy zgodności dostawców albo inne legalne mechanizmy transferu.",
        ],
      },
      {
        title: "Okres przechowywania",
        body: [
          "Przechowujemy dane osobowe tylko tak długo, jak jest to rozsądnie potrzebne do celów opisanych w tej polityce, w tym obsługi konta, dostarczania researchu, rozliczeń, podatków, księgowości, bezpieczeństwa, zapobiegania oszustwom, rozwiązywania sporów, zgodności z prawem i kopii zapasowych.",
          "Dane płatności, faktur, wsparcia i bezpieczeństwa mogą być przechowywane dłużej, jeżeli jest to potrzebne do audytu, podatków, chargebacków, regulacji albo obrony prawnej. Gdy dane nie są już potrzebne, usuwamy je, anonimizujemy albo ograniczamy, gdy jest to wykonalne.",
        ],
      },
      {
        title: "Twoje prawa",
        body: [
          "W zależności od jurysdykcji możesz mieć prawo dostępu, sprostowania, usunięcia, ograniczenia przetwarzania, sprzeciwu, wycofania zgody, przeniesienia danych, rezygnacji z marketingu albo złożenia skargi do organu ochrony danych.",
          `Aby skorzystać z praw, napisz na ${CONTACT_EMAIL} z adresu email powiązanego z subskrypcją. Możemy wymagać weryfikacji tożsamości przed realizacją wniosku.`,
        ],
      },
      {
        title: "Cookies, analityka i marketing",
        body: [
          "Możemy używać cookies lub podobnych technologii do zapamiętania języka, utrzymania sesji, bezpieczeństwa, analityki, atrybucji i ulepszania produktu. Ustawienia przeglądarki mogą pozwalać na blokowanie lub usuwanie cookies, ale niektóre funkcje mogą przestać działać.",
          "Z marketingu email można zrezygnować przez link w wiadomości albo kontakt ze wsparciem. Nadal możemy wysyłać wiadomości transakcyjne lub serwisowe dotyczące konta, płatności, prawnych zawiadomień albo bezpieczeństwa.",
        ],
      },
      {
        title: "Bezpieczeństwo i dzieci",
        body: [
          "Stosujemy rozsądne środki techniczne i organizacyjne zaprojektowane do ochrony danych osobowych, ale żadna usługa internetowa nie jest całkowicie bezpieczna. Odpowiadasz za bezpieczeństwo linków dostępowych, konta email i urządzeń.",
          "Usługa nie jest kierowana do dzieci i nie jest przeznaczona dla osób poniżej wieku wymaganego do zawarcia wiążącej umowy subskrypcyjnej w ich jurysdykcji.",
        ],
      },
      {
        title: "Zmiany polityki",
        body: [
          "Możemy aktualizować tę politykę wraz ze zmianami usługi, dostawców, wymogów prawnych albo praktyk przetwarzania danych. Nowa wersja będzie publikowana na tej stronie i obowiązuje od publikacji, chyba że wskazano późniejszą datę.",
        ],
      },
    ],
    "/risk": [
      {
        title: "Przeczytaj przed użyciem researchu",
        body: [
          "Każda aktywność inwestycyjna wiąże się z ryzykiem. Możesz stracić pieniądze, w tym całość zainwestowanego kapitału. Strategie dywidendowe nie są niskiego ryzyka tylko dlatego, że skupiają się na spółkach wypłacających dochód.",
          "Research ma charakter edukacyjny i ogólny. Powinien być jednym z elementów Twojego procesu, a nie systemem decyzyjnym, gwarancją ani substytutem licencjonowanej porady.",
        ],
      },
      {
        title: "Ryzyko akcji i emitenta",
        body: [
          "Akcje oznaczają udział w przedsiębiorstwie. Wyniki spółki, decyzje zarządu, konkurencja, spory prawne, regulacje, finansowanie, księgowość, oszustwa, rozwodnienie i niewypłacalność mogą istotnie obniżyć wartość akcji.",
          "Nawet duże, uznane spółki mogą trwale stracić na wartości. Długa historia działalności albo wypłat dywidend nie eliminuje ryzyka biznesowego.",
        ],
      },
      {
        title: "Ryzyko dywidendy i wysokiego yieldu",
        body: [
          "Dywidendy są uznaniowe i mogą zostać obniżone, zawieszone, opóźnione, wypłacane nieregularnie albo całkowicie zniesione. Zarządy mogą priorytetowo traktować redukcję długu, przejęcia, inwestycje, wymogi regulacyjne lub płynność.",
          "Wysoka stopa dywidendy może oznaczać stres finansowy, spadek ceny akcji, niezrównoważony payout, dźwignię, cykliczne zyski albo oczekiwanie rynku na obniżkę dywidendy. Yield sam w sobie nie mierzy bezpieczeństwa.",
        ],
      },
      {
        title: "Ryzyko BDC, REIT, kredytu i dźwigni",
        body: [
          "BDC, mortgage REIT, equity REIT, pożyczkodawcy i inne instrumenty dochodowe mają szczególne ryzyka, w tym dźwignię, wrażliwość na stopy procentowe, straty kredytowe, refinansowanie, niepewność wyceny aktywów, zmienność dystrybucji i ograniczenia regulacyjne.",
          "Instrumenty dochodowe mogą finansować wypłaty częściowo dźwignią, sprzedażą aktywów, rynkiem kapitałowym albo zwrotem kapitału. Raportowany yield nie musi oznaczać trwałego dochodu ekonomicznego.",
        ],
      },
      {
        title: "Ryzyko walutowe, podatkowe i transgraniczne",
        body: [
          "Wiele instrumentów jest notowanych i wypłaca dywidendy w walutach innych niż Twoja waluta bazowa. Ruchy kursowe mogą istotnie obniżyć lokalną stopę zwrotu, nawet gdy instrument dobrze radzi sobie w walucie notowania.",
          "Podatki, withholding tax, umowy o unikaniu podwójnego opodatkowania, typ konta, rezydencja, obowiązki raportowe i lokalne przepisy mogą znacząco zmienić zwrot netto. Nie świadczymy doradztwa podatkowego.",
        ],
      },
      {
        title: "Ryzyko rynku, płynności i koncentracji",
        body: [
          "Rynki mogą szybko spadać z powodu recesji, inflacji, stóp procentowych, geopolityki, pandemii, stresu bankowego, szoków płynności albo sentymentu inwestorów. Płynność może zniknąć wtedy, gdy jest najbardziej potrzebna.",
          "Koncentracja w wysokim yieldzie, jednym sektorze, kraju, walucie lub temacie może zwiększać straty. Dywersyfikacja nie gwarantuje zysku ani nie chroni przed stratą.",
        ],
      },
      {
        title: "Ryzyko danych, modeli i screeningu",
        body: [
          "Screeny, score, tabele, wykresy i symulacje zależą od jakości danych i założeń. Dane dostawców mogą być błędne, spóźnione, skorygowane po czasie, brakujące, źle zmapowane lub niespójne między źródłami.",
          "Backtesty, przykłady, symulacje procentu składanego, docelowe yieldy i przykładowe portfele są hipotetyczne lub ilustracyjne, chyba że wyraźnie wskazano inaczej. Nie przewidują przyszłych wyników.",
        ],
      },
      {
        title: "Ograniczenia halal-aware i Sharia",
        body: [
          "Filtrowanie halal-aware jest elementem researchu opartym na ekranach sektorowych i finansowych. Nie jest fatwą, formalnym certyfikatem Sharia ani substytutem oceny kwalifikowanego uczonego Sharia.",
          "Działalność spółki, struktura przychodów, dług, gotówka, odsetki i wymogi oczyszczenia dochodu mogą zmieniać się w czasie i wymagać interpretacji poza naszym screeningiem.",
        ],
      },
      {
        title: "Ryzyko brokera, wykonania i operacyjne",
        body: [
          "Nie wykonujemy transakcji, nie przechowujemy aktywów, nie wybieramy za Ciebie brokera i nie monitorujemy Twojego rachunku. Awarie brokera, błędy zleceń, spready, rozliczenie, opłaty, margin, zdarzenia korporacyjne i ograniczenia konta mogą wpływać na wynik.",
        ],
      },
      {
        title: "Twój obowiązek",
        body: [
          "Przed inwestycją zweryfikuj dane w raportach emitentów i źródłach pierwotnych, zrozum instrument, przeczytaj właściwe disclosures, oceń pełną sytuację finansową i skonsultuj się z licencjonowanymi specjalistami inwestycyjnymi, podatkowymi, prawnymi i religijnymi tam, gdzie jest to właściwe.",
        ],
      },
    ],
  },
  ar: {
    "/terms": [
      {
        title: "القبول والنطاق",
        body: [
          "باستخدام الموقع أو الاشتراك أو فتح بريد إلكتروني أو تنزيل بحث أو استخدام أي ميزة مرتبطة بالخدمة، فإنك توافق على هذه الشروط. إذا لم توافق، فلا تستخدم الخدمة.",
          "تنطبق هذه الشروط على الموقع، ورسائل الأبحاث، والتقارير التجريبية، والتقارير المدفوعة، ولوحات التحكم، وروابط الشركاء، ومسارات الدفع، ومراسلات الدعم، وأي محتوى آخر يصدر باسم Aristocrat Dividend Research.",
        ],
      },
      {
        title: "لسنا مستشارا استثماريا أو وسيطا أو أمينا",
        body: [
          "لا تعمل Aristocrat Dividend Research كمستشارك الاستثماري أو وسيطك أو مدير أصولك أو أمينك أو مستشارك الضريبي أو القانوني أو المحاسبي أو مخططك المالي.",
          "لا ينشأ أي ارتباط استشاري أو ائتماني أو وساطة أو إدارة تقديرية أو حفظ أصول أو علاقة عميل بمجرد استخدام الخدمة أو دفع الاشتراك أو تلقي الأبحاث أو الحصول على رد من الدعم.",
        ],
      },
      {
        title: "لا توجد مراجعة ملاءمة أو توصية شخصية",
        body: [
          "نحن لا نعرف ولا نراجع وضعك المالي الكامل أو أهدافك أو أفقك الاستثماري أو احتياجاتك للسيولة أو وضعك الضريبي أو متطلباتك الدينية أو تحملك للمخاطر أو محفظتك الحالية أو وضعك التنظيمي.",
          "أي شركة أو عائد أو ترتيب أو قائمة مراقبة أو درجة أو فلتر أو جدول أو رسم أو محاكاة أو نتيجة منهجية هي معلومات عامة، وليست توصية شخصية أو تعليمات استثمارية أو بيانا بأن ورقة مالية مناسبة لك.",
        ],
      },
      {
        title: "قيود البيانات والأبحاث والمنهجية",
        body: [
          "قد تعتمد الأبحاث على مزودي بيانات خارجيين، وإفصاحات الشركات، وبيانات السوق، ومؤشرات محسوبة، وقواعد فرز داخلية، وتقديرات، وحكم تحريري. قد تكون البيانات متأخرة أو ناقصة أو قديمة أو معاد عرضها أو مصنفة خطأ أو غير متاحة.",
          "يجوز لنا تغيير المنهجيات والدرجات والفلاتر ونطاق الشركات والتعريفات والتغطية ومزودي البيانات في أي وقت. إدراج شركة سابقا لا يعني أنها ستبقى مغطاة أو ستواصل اجتياز أي فلتر.",
        ],
      },
      {
        title: "لا ضمانات",
        body: [
          "تقدم الخدمة كما هي وكما تتاح. لا نضمن أن تكون الخدمة مستمرة أو خالية من الأخطاء أو كاملة أو دقيقة أو محدثة أو مربحة أو مناسبة لأي غرض أو متاحة في كل بلد.",
          "لا نضمن أي توزيعات أرباح أو عائد أو ارتفاع سعر أو حماية رأس المال أو نتيجة ضريبية أو نتيجة عملة أو نتيجة حلال أو شرعية أو نتيجة محفظة أو أداء استثماري.",
        ],
      },
      {
        title: "قراراتك والتحقق المستقل",
        body: [
          "أنت وحدك مسؤول عن جميع قراراتك الاستثمارية والضريبية والقانونية والدينية والمالية. قبل التصرف، تحقق من المعلومات من المصادر الأصلية واستشر مختصين مرخصين في بلدك.",
          "لا ينبغي الاعتماد على جدول واحد أو درجة واحدة أو بريد واحد أو رسم واحد أو عائد واحد أو محاكاة واحدة أو تقرير واحد كأساس وحيد للشراء أو البيع أو الاحتفاظ أو التجنب أو تحديد حجم المركز.",
        ],
      },
      {
        title: "الاشتراكات والمدفوعات والإلغاء",
        body: [
          "قد تتجدد الاشتراكات المدفوعة تلقائيا ما لم يتم إلغاؤها قبل تاريخ التجديد. قد تختلف الأسعار والعملات والضرائب وطرق الدفع ومزايا الخطط حسب المنطقة وقد تتغير مستقبلا.",
          "تتم معالجة المدفوعات بواسطة Stripe أو مزود دفع آخر. لا نخزن أرقام البطاقات الكاملة أو رموز CVC أو بيانات الدفع الخام على خوادمنا. قد يطبق مزود الدفع شروطه وسياسة خصوصيته وفحوص الاحتيال وقواعد المعالجة الخاصة به.",
        ],
      },
      {
        title: "الملكية الفكرية والاستخدام المسموح",
        body: [
          "جميع الأبحاث والفلاتر والترتيبات والنصوص والجداول والرسوم وأوصاف المنهجية ورسائل البريد ومواد المنصة مملوكة لنا أو لمرخصينا ومحمية بقوانين الملكية الفكرية.",
          "يمنحك الاشتراك حقا محدودا وشخصيا وقابلا للإلغاء وغير قابل للتحويل للوصول إلى الخدمة لاستخدامك التعليمي الداخلي فقط. لا يجوز إعادة البيع أو النشر الجماعي أو النسخ الآلي أو النسخ بالجملة أو النشر أو تدريب النماذج على المحتوى أو إعادة التوزيع دون إذن مكتوب.",
        ],
      },
      {
        title: "تعارض المصالح والاستقلال التحريري",
        body: [
          "ما لم يتم الإفصاح خلاف ذلك، لا نتلقى أموالا من الشركات المغطاة لنشر أبحاث عنها. رسوم الاشتراك أو الروابط التابعة أو روابط الشركاء أو برامج الإحالة قد تنشئ حوافز تجارية، وسنسعى إلى الإفصاح عن الترتيبات الجوهرية عند الحاجة.",
          "ينبغي للمستخدم أن يفترض أن المؤلفين أو المشغلين أو المتعاقدين أو الأشخاص المرتبطين قد يملكون مراكز في أوراق مالية مذكورة ما لم يذكر تقرير محدد خلاف ذلك. وجود هذه المراكز لا يجعل المحتوى توصية.",
        ],
      },
      {
        title: "تحديد المسؤولية",
        body: [
          "إلى أقصى حد يسمح به القانون، لن نكون مسؤولين عن خسائر الاستثمار أو الأرباح الفائتة أو الفرص الضائعة أو فقدان البيانات أو توقف الأعمال أو النتائج الضريبية أو خسائر العملة أو الأضرار غير المباشرة أو التبعية أو الخاصة أو العقابية الناتجة عن استخدام الخدمة.",
          "إذا تعذر استبعاد المسؤولية، فإن مسؤوليتنا الإجمالية تقتصر على المبلغ الذي دفعته للخدمة خلال الأشهر الثلاثة السابقة للحدث الذي نشأ عنه الطلب، ما لم يفرض القانون الإلزامي مبلغا أعلى.",
        ],
      },
      {
        title: "التعويض وسوء الاستخدام",
        body: [
          "توافق على تعويضنا وإبراء مسؤوليتنا عن المطالبات والخسائر والأضرار والتكاليف والمصاريف الناشئة عن إساءة استخدامك للخدمة أو خرق هذه الشروط أو إعادة التوزيع غير القانونية أو انتهاك حقوق الغير أو قرارات الاستثمار التي تتخذها أنت أو أي شخص يعتمد على مواد قمت بإعادة توزيعها.",
        ],
      },
      {
        title: "القانون الواجب والحقوق الإلزامية والتغييرات",
        body: [
          "تهدف هذه الشروط إلى العمل إلى أقصى حد يسمح به القانون. لا يحد أي شيء فيها من الحقوق الإلزامية التي لا يجوز التنازل عنها قانونا في بلدك.",
          "إذا ورد كيان تعاقدي أو قانون واجب أو جهة قضائية محددة في فاتورة أو صفحة الدفع أو اتفاق مكتوب، فيطبق ذلك التحديد. وإلا فستتم معالجة النزاعات وفق القانون والمحاكم المرتبطة بالمقر المسجل للمشغل، مع مراعاة قواعد حماية المستهلك الإلزامية.",
          "قد نحدث هذه الشروط من وقت لآخر. استمرار استخدام الخدمة بعد نشر الشروط المعدلة يعني قبولك للنسخة المحدثة.",
        ],
      },
    ],
    "/privacy": [
      {
        title: "المتحكم ونقطة التواصل",
        body: [
          `تعمل Aristocrat Dividend Research كمتحكم في البيانات الشخصية التي يتم جمعها عبر الموقع ومسار الاشتراك وتسليم الأبحاث وتفاعلات الدعم، إلا إذا كان مزود خارجي يعمل كمتحكم مستقل لمعالجته الخاصة. التواصل: ${CONTACT_EMAIL}.`,
          "إذا تم تحديد كيان قانوني رسمي في فاتورة أو صفحة دفع أو اتفاق مكتوب، فإن ذلك الكيان هو المتحكم في علاقة الحساب ذات الصلة.",
        ],
      },
      {
        title: "فئات البيانات الشخصية",
        body: [
          "قد نعالج بيانات الحساب مثل البريد الإلكتروني، وتفضيل اللغة، والبلد أو المنطقة، وحالة الاشتراك، والخطة المختارة، وسجلات الموافقة، ورسائل الدعم، وطلبات الإلغاء أو الاسترداد.",
          "قد نعالج بيانات تقنية مثل عنوان IP ونوع الجهاز والمتصفح والموقع التقريبي والرابط المرجعي والصفحات التي تمت زيارتها والطوابع الزمنية والسجلات وأحداث الأمان ومعرفات cookies وبيانات التفاعل.",
          "قد نتلقى معرفات متعلقة بالدفع من Stripe، بما في ذلك معرف العميل، ومعرف الاشتراك، ومعرف جلسة checkout، وحالة الدفع، وحالة العملية أو الفاتورة، وحالة الاسترداد، والعملة، والمبلغ، وتفاصيل فوترة محدودة. لا نتلقى ولا نخزن أرقام البطاقات الكاملة أو رموز CVC.",
        ],
      },
      {
        title: "مصادر البيانات",
        body: [
          "نجمع البيانات منك مباشرة عندما تشترك أو تتواصل مع الدعم أو تغير اللغة أو ترسل نماذج أو تستخدم الخدمة.",
          "قد نتلقى بيانات محدودة من مزودي الخدمات مثل Stripe ومزودي البريد الإلكتروني والاستضافة وأدوات التحليلات ومنع الاحتيال وأنظمة الإحالة أو الشركاء.",
        ],
      },
      {
        title: "الأغراض والأسس القانونية",
        body: [
          "نعالج البيانات لتقديم الخدمة، وتوثيق الوصول، وتسليم الأبحاث، ومعالجة المدفوعات، وإدارة الاشتراكات، والرد على الدعم، ومنع إساءة الاستخدام، وتأمين المنصة، والامتثال للقانون، والاحتفاظ بالسجلات، وتحسين المنتج، وإرسال رسائل الخدمة أو التسويق حيث يسمح بذلك.",
          "بحسب موقعك، قد تشمل الأسس القانونية تنفيذ العقد، والمصالح المشروعة، والموافقة، والامتثال للالتزامات القانونية، وإقامة أو الدفاع عن المطالبات القانونية، ومنع الاحتيال.",
        ],
      },
      {
        title: "المعالجون والمستلمون",
        body: [
          "قد نشارك البيانات مع مزودين يساعدوننا في تشغيل الخدمة، بما في ذلك الاستضافة وقواعد البيانات وتسليم البريد ومعالجة الدفع ودعم العملاء والتحليلات والأمان والسجلات والخدمات القانونية والمحاسبية والامتثال.",
          "يعالج Stripe بيانات الدفع والمعاملات وفقا لشروط الخصوصية الخاصة به، وقد يعمل كمتحكم مستقل لبعض أغراض الدفع والاحتيال والامتثال وشبكات الدفع.",
          "قد نفصح عن البيانات عندما يقتضي القانون أو أمر المحكمة أو الجهة التنظيمية أو قواعد شبكة الدفع أو مصلحة الضرائب أو طلب إنفاذ القانون أو تحقيق الاحتيال أو صفقة مؤسسية أو حماية الحقوق والسلامة والأمان.",
        ],
      },
      {
        title: "النقل الدولي",
        body: [
          "قد تتم معالجة بياناتك في دول غير بلد إقامتك، بما في ذلك بواسطة مزودين في الولايات المتحدة أو المنطقة الاقتصادية الأوروبية أو المملكة المتحدة أو مواقع أخرى تعمل فيها بنيتنا أو مزودونا.",
          "عند الحاجة، نعتمد على ضمانات مناسبة مثل الحماية التعاقدية أو البنود التعاقدية القياسية أو قرارات الملاءمة أو برامج امتثال المزودين أو آليات نقل قانونية أخرى.",
        ],
      },
      {
        title: "الاحتفاظ",
        body: [
          "نحتفظ بالبيانات الشخصية فقط طالما كان ذلك ضروريا بشكل معقول للأغراض الموضحة في هذه السياسة، بما في ذلك تشغيل الحساب وتسليم الأبحاث والفوترة والضرائب والمحاسبة والأمان ومنع الاحتيال وتسوية النزاعات والامتثال القانوني والنسخ الاحتياطي.",
          "قد يتم الاحتفاظ بسجلات الدفع والفواتير والدعم والأمان لمدة أطول عند الحاجة للتدقيق أو الضرائب أو الاعتراضات على الدفع أو المتطلبات التنظيمية أو الدفاع القانوني. عندما لا نحتاج البيانات، نحذفها أو نجعلها مجهولة أو نقيدها حيثما أمكن.",
        ],
      },
      {
        title: "حقوقك",
        body: [
          "بحسب بلدك، قد تكون لديك حقوق الوصول والتصحيح والحذف والتقييد والاعتراض وسحب الموافقة ونقل البيانات وإلغاء التسويق أو تقديم شكوى إلى جهة حماية البيانات.",
          `لممارسة الحقوق، راسل ${CONTACT_EMAIL} من البريد الإلكتروني المرتبط باشتراكك. قد نحتاج إلى التحقق من هويتك قبل تنفيذ الطلب.`,
        ],
      },
      {
        title: "Cookies والتحليلات والتسويق",
        body: [
          "قد نستخدم cookies أو تقنيات مشابهة لتفضيل اللغة واستمرارية الجلسة والأمان والتحليلات والإسناد وتحسين المنتج. قد تسمح إعدادات المتصفح بحظر أو حذف cookies، لكن بعض الميزات قد تتوقف.",
          "يمكن إلغاء رسائل التسويق عبر رابط الإلغاء في البريد أو بالتواصل مع الدعم. قد نستمر في إرسال رسائل معاملات أو خدمة تتعلق بحسابك أو الدفع أو الإشعارات القانونية أو الأمان.",
        ],
      },
      {
        title: "الأمان والأطفال",
        body: [
          "نستخدم تدابير تقنية وتنظيمية معقولة مصممة لحماية البيانات الشخصية، لكن لا توجد خدمة إنترنت آمنة بالكامل. أنت مسؤول عن تأمين روابط الوصول وحساب البريد والأجهزة.",
          "الخدمة غير موجهة للأطفال وليست مخصصة لمن هم دون السن المطلوب لإبرام عقد اشتراك ملزم في بلدهم.",
        ],
      },
      {
        title: "تغييرات السياسة",
        body: [
          "قد نحدث هذه السياسة مع تغير الخدمة أو المزودين أو المتطلبات القانونية أو ممارسات البيانات. سيتم نشر النسخة المحدثة على هذه الصفحة وتصبح نافذة من تاريخ النشر ما لم يذكر تاريخ لاحق.",
        ],
      },
    ],
    "/risk": [
      {
        title: "اقرأ هذا قبل استخدام أي بحث",
        body: [
          "كل نشاط استثماري ينطوي على مخاطر. قد تخسر المال، بما في ذلك كامل المبلغ المستثمر. استراتيجيات التوزيعات ليست منخفضة المخاطر لمجرد أنها تركز على شركات تدفع دخلا.",
          "الأبحاث تعليمية وعامة. يجب اعتبارها مدخلا واحدا في عمليتك الخاصة، وليست نظام قرار أو ضمانا أو بديلا عن نصيحة مرخصة.",
        ],
      },
      {
        title: "مخاطر الأسهم والمصدر",
        body: [
          "تمثل الأسهم حصص ملكية في شركات. يمكن أن تؤدي الأرباح وقرارات الإدارة والمنافسة والدعاوى والتنظيم والتمويل والمحاسبة والاحتيال والتخفيف والإفلاس إلى خفض قيمة السهم بشكل جوهري.",
          "حتى الشركات الكبيرة والراسخة قد تتعرض لتدهور دائم. التاريخ الطويل أو سجل التوزيعات لا يلغي مخاطر الأعمال.",
        ],
      },
      {
        title: "مخاطر التوزيعات والعائد المرتفع",
        body: [
          "التوزيعات اختيارية وقد تخفض أو تعلق أو تؤجل أو تدفع بشكل غير منتظم أو تلغى. قد تعطي مجالس الإدارة أولوية لخفض الدين أو الاستحواذ أو الإنفاق الرأسمالي أو التنظيم أو السيولة بدلا من التوزيعات.",
          "العائد المرتفع قد يشير إلى ضغوط مالية أو انخفاض سعر السهم أو عدم استدامة الدفع أو الرافعة أو أرباح دورية أو توقع السوق لخفض التوزيع. العائد وحده ليس مقياسا للأمان.",
        ],
      },
      {
        title: "مخاطر BDC وREIT والائتمان والرافعة",
        body: [
          "شركات BDC وREIT العقارية والرهنية والمقرضون وأدوات الدخل الأخرى قد تتضمن مخاطر خاصة، بما في ذلك الرافعة، وحساسية أسعار الفائدة، وخسائر الائتمان، ومخاطر إعادة التمويل، وعدم اليقين في تقييم الأصول، وتقلب التوزيعات، والقيود التنظيمية.",
          "قد تمول أدوات الدخل التوزيعات جزئيا عبر الرافعة أو بيع الأصول أو أسواق رأس المال أو رد رأس المال. العائد المعلن لا يساوي بالضرورة دخلا اقتصاديا مستداما.",
        ],
      },
      {
        title: "مخاطر العملة والضرائب وعبر الحدود",
        body: [
          "كثير من الأوراق المالية تسعر وتدفع توزيعات بعملات تختلف عن عملتك المحلية. تحركات الصرف قد تخفض العائد بالعملة المحلية بشكل جوهري حتى إذا كان أداء الورقة جيدا بعملة الإدراج.",
          "الضرائب والاستقطاع والمعاهدات ونوع الحساب والإقامة والالتزامات التقارير والقواعد المحلية قد تغير العائد الصافي بشكل جوهري. نحن لا نقدم نصائح ضريبية.",
        ],
      },
      {
        title: "مخاطر السوق والسيولة والتركيز",
        body: [
          "قد تهبط الأسواق بسرعة بسبب الركود أو التضخم أو أسعار الفائدة أو الأحداث الجيوسياسية أو الأوبئة أو ضغوط البنوك أو صدمات السيولة أو معنويات المستثمرين. قد تختفي السيولة عندما تحتاجها أكثر.",
          "التركيز في أسماء ذات عائد مرتفع أو قطاع واحد أو بلد واحد أو عملة واحدة أو فكرة واحدة قد يزيد الخسائر. التنويع لا يضمن الربح ولا يمنع الخسارة.",
        ],
      },
      {
        title: "مخاطر البيانات والنماذج والفرز",
        body: [
          "تعتمد الفلاتر والدرجات والجداول والرسوم والمحاكاة على جودة البيانات والافتراضات. قد تكون بيانات المزودين خاطئة أو متأخرة أو معاد عرضها أو ناقصة أو مربوطة بشكل غير صحيح أو غير متسقة بين المصادر.",
          "الاختبارات التاريخية والأمثلة ومحاكاة التركيب والعوائد المستهدفة والمحافظ النموذجية افتراضية أو توضيحية ما لم يذكر خلاف ذلك صراحة. لا تتنبأ بالنتائج المستقبلية.",
        ],
      },
      {
        title: "حدود الفلترة المتوافقة مع الحلال والشريعة",
        body: [
          "الفلترة الحلال هي مدخل بحثي قائم على فلاتر قطاعية ومالية. ليست فتوى وليست شهادة شرعية رسمية وليست بديلا عن مراجعة عالم شرعي مؤهل.",
          "قد تتغير أنشطة الشركة ومزيج الإيرادات والدين والنقد ودخل الفوائد ومتطلبات التطهير مع الوقت وقد تتطلب تفسيرا يتجاوز عملية الفرز لدينا.",
        ],
      },
      {
        title: "مخاطر الوسيط والتنفيذ والتشغيل",
        body: [
          "نحن لا ننفذ الصفقات ولا نحفظ الأصول ولا نختار الوسيط لك ولا نراقب حسابك. قد تؤثر أعطال الوسيط وأخطاء الأوامر والفروقات وقواعد التسوية والرسوم والهامش وإجراءات الشركات وقيود الحساب في النتائج.",
        ],
      },
      {
        title: "واجبك",
        body: [
          "قبل الاستثمار، تحقق من البيانات من إفصاحات الشركات والمصادر الأصلية، وافهم الأداة، واقرأ إفصاحات المخاطر ذات الصلة، وقيّم وضعك المالي الكامل، واستشر مختصين مرخصين في الاستثمار والضرائب والقانون والدين حيث يكون ذلك مناسبا.",
        ],
      },
    ],
  },
};

const pagesByLang: Record<Lang, Record<string, Page>> = {
  en: enPages,
  pl: plPages,
  ar: arPages,
};

export function StaticPage({ path }: { path: string }) {
  const { lang } = useT();
  const localizedPages = pagesByLang[lang] ?? enPages;
  const basePage = localizedPages[path] ?? localizedPages["/about"];
  const page = {
    ...basePage,
    sections: [...basePage.sections, ...(legalAdditions[lang]?.[path] ?? [])],
  };
  const homeLabel = lang === "pl" ? "Strona główna" : lang === "ar" ? "الرئيسية" : "Home";
  return (
    <main
      className="min-h-screen pt-28 pb-16"
      style={{
        background: "linear-gradient(180deg, var(--aris-paper-2) 0%, #f5ecd4 55%, var(--aris-paper) 100%)",
      }}
    >
      <div className="mx-auto max-w-[900px] px-4 sm:px-7">
        <a href="/" className="text-sm text-[var(--aris-muted)] hover:text-[var(--aris-ink)]">
          {lang === "ar" ? `${homeLabel} →` : `← ${homeLabel}`}
        </a>
        <div className="mt-8">
          <div className="eyebrow">{page.eyebrow}</div>
          <h1 className="font-serif-display text-[34px] sm:text-[46px] text-[var(--aris-ink)] my-5">{page.title}</h1>
          <p className="text-[17px] leading-relaxed text-[var(--aris-muted)] max-w-2xl">{page.intro}</p>
        </div>

        <div className="mt-10 rounded-xl border border-[var(--aris-line)] bg-[var(--aris-offwhite)] px-5 sm:px-7 py-6 sm:py-8">
          {page.sections.length === 0 ? (
            <p className="font-mono-mark text-[15px] text-[var(--aris-ink)]">{page.intro}</p>
          ) : (
            <div className="space-y-8">
              {page.sections.map(section => (
                <section key={section.title}>
                  <h2 className="font-serif-display text-[22px] text-[var(--aris-ink)] mb-3">{section.title}</h2>
                  <div className="space-y-3 text-[14.5px] leading-relaxed text-[var(--aris-muted)]">
                    {section.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

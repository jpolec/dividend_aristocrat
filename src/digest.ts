import { listSubscribers, markSent, getJobLastRun, setJobLastRun, type Lang } from "./subscribers";

type Pick = {
  symbol: string;
  companyName: string;
  sector: string | null;
  price: number;
  lastAnnualDividend: number;
  projectedYield: number;
  yearsPaid: number;
  confidence: number;
  totalPaid5y: number;
  ytd: number | null;
  oneYear: number | null;
};

type DigestStrings = {
  subject: (d: string) => string;
  intro: string;
  rank: string;
  thSymbol: string;
  thName: string;
  thPrice: string;
  thYtd: string;
  thOneY: string;
  thAnnualDiv: string;
  thProjYield: string;
  thYearsPaid: string;
  thConfidence: string;
  unsubscribe: string;
  footer: string;
};

const STRINGS: Record<Lang, DigestStrings> = {
  en: {
    subject: d => `Top 10 dividend stocks — ${d}`,
    intro: "Your weekly picks, ranked by payment consistency and projected yield.",
    rank: "#",
    thSymbol: "Symbol",
    thName: "Name",
    thPrice: "Price",
    thYtd: "YTD",
    thOneY: "1Y",
    thAnnualDiv: "Annual div.",
    thProjYield: "Proj. yield",
    thYearsPaid: "Years paid",
    thConfidence: "Confidence",
    unsubscribe: "Unsubscribe",
    footer:
      "Confidence = 50% · years_paid/5 + 30% · no_YoY_cut + 20% · YoY_growth. Data: api.quantjourney.cloud.",
  },
  pl: {
    subject: d => `Top 10 spółek dywidendowych — ${d}`,
    intro: "Twoje cotygodniowe wybory, ranking po stabilności wypłat i prognozowanym yieldzie.",
    rank: "#",
    thSymbol: "Symbol",
    thName: "Nazwa",
    thPrice: "Cena",
    thYtd: "YTD",
    thOneY: "1Y",
    thAnnualDiv: "Dywid./rok",
    thProjYield: "Yield proj.",
    thYearsPaid: "Lata płac.",
    thConfidence: "Pewność",
    unsubscribe: "Wypisz się",
    footer:
      "Pewność = 50% · lata_z_dywidendą/5 + 30% · brak_cięcia_YoY + 20% · wzrost_YoY. Dane: api.quantjourney.cloud.",
  },
  ar: {
    subject: d => `أفضل 10 شركات توزيع أرباح — ${d}`,
    intro: "اختياراتك الأسبوعية، مرتبة حسب استقرار الدفع والعائد المتوقع.",
    rank: "المرتبة",
    thSymbol: "الرمز",
    thName: "الاسم",
    thPrice: "السعر",
    thYtd: "منذ بداية السنة",
    thOneY: "سنة",
    thAnnualDiv: "التوزيع السنوي",
    thProjYield: "العائد المتوقع",
    thYearsPaid: "سنوات الدفع",
    thConfidence: "الثقة",
    unsubscribe: "إلغاء الاشتراك",
    footer:
      "الثقة = 50% · سنوات_الدفع/5 + 30% · بدون_خفض_سنوي + 20% · النمو_السنوي. البيانات: api.quantjourney.cloud.",
  },
};

const fmtPct = (v: number | null) => (v == null ? "—" : `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`);
const fmtUsd = (v: number) => `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export async function selectTopPicks(baseUrl: string): Promise<Pick[]> {
  // Fetch the screener output through our own server so caching applies
  const baseRes = await fetch(`${baseUrl}/api/dividends?limit=200&min_dividend=0.5`);
  if (!baseRes.ok) throw new Error(`screener fetch failed: ${baseRes.status}`);
  const base = (await baseRes.json()) as {
    rows: Array<{
      symbol: string;
      companyName: string;
      sector: string | null;
      price: number;
      lastAnnualDividend: number;
      marketCap: number | null;
    }>;
  };

  // Enrich top 80 by market cap (cap candidate pool)
  const candidates = base.rows
    .slice()
    .sort((a, b) => (b.marketCap ?? 0) - (a.marketCap ?? 0))
    .slice(0, 80);

  const enrichRes = await fetch(`${baseUrl}/api/dividends/enriched`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symbols: candidates.map(c => c.symbol) }),
  });
  if (!enrichRes.ok) throw new Error(`enrich fetch failed: ${enrichRes.status}`);
  const enrich = (await enrichRes.json()) as {
    enriched: Array<{
      symbol: string;
      yearsPaid: number;
      confidence: number;
      totalPaid5y: number;
      ytd: number | null;
      oneYear: number | null;
    }>;
  };
  const eMap = new Map(enrich.enriched.map(e => [e.symbol, e]));

  const merged: Pick[] = candidates.map(c => {
    const e = eMap.get(c.symbol);
    return {
      symbol: c.symbol,
      companyName: c.companyName,
      sector: c.sector,
      price: c.price,
      lastAnnualDividend: c.lastAnnualDividend,
      projectedYield: c.price > 0 ? (c.lastAnnualDividend / c.price) * 100 : 0,
      yearsPaid: e?.yearsPaid ?? 0,
      confidence: e?.confidence ?? 0,
      totalPaid5y: e?.totalPaid5y ?? 0,
      ytd: e?.ytd ?? null,
      oneYear: e?.oneYear ?? null,
    };
  });

  // Rank: require yearsPaid >= 5, then sort by confidence desc, then projectedYield desc
  const ranked = merged
    .filter(p => p.yearsPaid >= 5 && p.projectedYield > 0)
    .sort((a, b) => b.confidence - a.confidence || b.projectedYield - a.projectedYield)
    .slice(0, 10);

  return ranked;
}

export function renderDigestHtml(picks: Pick[], lang: Lang, unsubscribeUrl: string): { subject: string; html: string; text: string } {
  const S = STRINGS[lang];
  const date = new Date().toISOString().slice(0, 10);
  const subject = S.subject(date);
  const dir = lang === "ar" ? "rtl" : "ltr";

  const rows = picks
    .map(
      (p, i) => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;color:#888;">${i + 1}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;font-family:monospace;font-weight:600;">${escapeHtml(p.symbol)}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(p.companyName)}<br><span style="color:#888;font-size:12px;">${escapeHtml(p.sector ?? "")}</span></td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:end;">${fmtUsd(p.price)}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:end;color:${(p.ytd ?? 0) >= 0 ? "#059669" : "#dc2626"};">${fmtPct(p.ytd)}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:end;color:${(p.oneYear ?? 0) >= 0 ? "#059669" : "#dc2626"};">${fmtPct(p.oneYear)}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:end;">${fmtUsd(p.lastAnnualDividend)}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:end;font-weight:600;color:#059669;">${p.projectedYield.toFixed(2)}%</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${p.yearsPaid}/5</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:end;font-weight:600;">${p.confidence.toFixed(0)}%</td>
        </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="${lang}" dir="${dir}">
  <head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
  <body style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;background:#f8fafc;margin:0;padding:24px;color:#0f172a;">
    <div style="max-width:900px;margin:0 auto;background:white;border-radius:8px;padding:24px;border:1px solid #e5e7eb;">
      <h1 style="margin:0 0 8px;font-size:22px;">${escapeHtml(subject)}</h1>
      <p style="margin:0 0 16px;color:#64748b;">${escapeHtml(S.intro)}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#f1f5f9;text-align:start;">
            <th style="padding:8px;">${escapeHtml(S.rank)}</th>
            <th style="padding:8px;">${escapeHtml(S.thSymbol)}</th>
            <th style="padding:8px;">${escapeHtml(S.thName)}</th>
            <th style="padding:8px;text-align:end;">${escapeHtml(S.thPrice)}</th>
            <th style="padding:8px;text-align:end;">${escapeHtml(S.thYtd)}</th>
            <th style="padding:8px;text-align:end;">${escapeHtml(S.thOneY)}</th>
            <th style="padding:8px;text-align:end;">${escapeHtml(S.thAnnualDiv)}</th>
            <th style="padding:8px;text-align:end;">${escapeHtml(S.thProjYield)}</th>
            <th style="padding:8px;text-align:center;">${escapeHtml(S.thYearsPaid)}</th>
            <th style="padding:8px;text-align:end;">${escapeHtml(S.thConfidence)}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;">${escapeHtml(S.footer)}</p>
      <p style="margin:8px 0 0;font-size:12px;"><a href="${unsubscribeUrl}" style="color:#64748b;">${escapeHtml(S.unsubscribe)}</a></p>
    </div>
  </body>
</html>`;

  const text = [
    subject,
    "",
    S.intro,
    "",
    ...picks.map(
      (p, i) =>
        `${i + 1}. ${p.symbol} — ${p.companyName} | ${fmtUsd(p.price)} | YTD ${fmtPct(p.ytd)} | 1Y ${fmtPct(p.oneYear)} | div ${fmtUsd(p.lastAnnualDividend)} (${p.projectedYield.toFixed(2)}%) | ${p.yearsPaid}/5 | ${p.confidence.toFixed(0)}%`,
    ),
    "",
    S.footer,
    "",
    `${S.unsubscribe}: ${unsubscribeUrl}`,
  ].join("\n");

  return { subject, html, text };
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const MAILTRAP_API_TOKEN = process.env.MAILTRAP_API_TOKEN;
const MAILTRAP_INBOX_ID = process.env.MAILTRAP_INBOX_ID; // if set → use sandbox
const FROM_ADDR = process.env.DIGEST_FROM ?? "Dividends <onboarding@resend.dev>";

function parseFromAddr(s: string): { email: string; name?: string } {
  const m = s.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
  if (m) return { name: m[1] || undefined, email: m[2] };
  return { email: s.trim() };
}

async function sendViaMailtrap(to: string, subject: string, html: string, text: string) {
  const base = MAILTRAP_INBOX_ID
    ? `https://sandbox.api.mailtrap.io/api/send/${MAILTRAP_INBOX_ID}`
    : "https://send.api.mailtrap.io/api/send";
  const from = parseFromAddr(FROM_ADDR);
  const res = await fetch(base, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MAILTRAP_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: { email: from.email, name: from.name ?? "Dividends" },
      to: [{ email: to }],
      subject,
      html,
      text,
    }),
  });
  if (!res.ok) throw new Error(`Mailtrap ${res.status}: ${await res.text()}`);
  return { ok: true, logged: false, via: MAILTRAP_INBOX_ID ? "mailtrap-sandbox" : "mailtrap" };
}

async function sendViaResend(to: string, subject: string, html: string, text: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM_ADDR, to, subject, html, text }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return { ok: true, logged: false, via: "resend" };
}

export async function sendEmail(to: string, subject: string, html: string, text: string) {
  if (MAILTRAP_API_TOKEN) return sendViaMailtrap(to, subject, html, text);
  if (RESEND_API_KEY) return sendViaResend(to, subject, html, text);
  console.log(`\n────── EMAIL (no transport configured — logged only) ──────`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Text preview:\n${text.slice(0, 600)}${text.length > 600 ? "…" : ""}`);
  console.log(`────────────────────────────────────────────────────────────\n`);
  return { ok: true, logged: true, via: "console" };
}

export async function runDigest(baseUrl: string, opts: { dryRun?: boolean; only?: string } = {}) {
  const subs = listSubscribers();
  const targets = opts.only ? subs.filter(s => s.email === opts.only) : subs;
  if (targets.length === 0) return { sent: 0, picks: 0, note: "no subscribers" };

  const picks = await selectTopPicks(baseUrl);
  if (picks.length === 0) return { sent: 0, picks: 0, note: "no qualifying picks" };

  const byLang = new Map<Lang, ReturnType<typeof renderDigestHtml>>();
  for (const lang of new Set(targets.map(t => t.lang))) {
    const unsub = `${baseUrl}/api/unsubscribe?email=`;
    byLang.set(lang, renderDigestHtml(picks, lang, unsub));
  }

  let sent = 0;
  for (const sub of targets) {
    const rendered = byLang.get(sub.lang)!;
    const unsubUrl = `${baseUrl}/api/unsubscribe?email=${encodeURIComponent(sub.email)}`;
    const html = rendered.html.replaceAll(`${baseUrl}/api/unsubscribe?email=`, unsubUrl);
    const text = rendered.text.replaceAll(`${baseUrl}/api/unsubscribe?email=`, unsubUrl);
    if (opts.dryRun) {
      console.log(`[dry-run] would send to ${sub.email} (${sub.lang}): ${rendered.subject}`);
    } else {
      await sendEmail(sub.email, rendered.subject, html, text);
      markSent(sub.email);
    }
    sent++;
  }
  if (!opts.dryRun) setJobLastRun("weekly_digest");
  return { sent, picks: picks.length };
}

export function shouldRunWeekly(): boolean {
  const last = getJobLastRun("weekly_digest");
  if (last == null) return true;
  return Date.now() - last >= 7 * 24 * 60 * 60 * 1000;
}

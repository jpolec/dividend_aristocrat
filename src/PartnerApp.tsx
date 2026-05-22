import { useEffect, useState } from "react";

const NDA_TEXT = `By accepting this Non-Disclosure Agreement ("NDA"), the Partner agrees to keep confidential any non-public information about Aristocrat Dividend Research ("the Platform"), including its subscribers, screening methodology, pricing structures, financial details, and business operations. The Partner will not disclose such information to third parties without explicit written consent from the Platform. This confidentiality obligation survives termination of the partnership.`;

const AGREEMENT_TEXT = `By signing this Partner Agreement, you agree to:

1. Promote Aristocrat Dividend Research ("the Platform") in compliance with all applicable laws and regulations in your jurisdiction.

2. Include #ad, #partner and #educational disclosure in all marketing posts and communications referencing the Platform.

3. NOT make promises about investment returns, dividend amounts, or financial outcomes. The Platform is educational research, not financial advice.

4. Use only approved marketing assets, copy and creative provided in the Partner portal. Do not create or use materials that misrepresent the Platform.

5. Receive a commission equal to 100% of the new customer's first payment (whether monthly or annual subscription) for any customer who signs up using your unique partner code within 90 days of clicking your tracking link. No commission is paid on renewals or subsequent payments.

6. Commissions are confirmed 7 days after the customer's first payment (after the refund window). Payouts are made monthly upon your request, subject to a minimum balance.

7. Acknowledge that the Platform provides educational research and screening tools only, and is not a licensed financial advisor, broker, or asset manager in any jurisdiction.

8. Allow termination of this partnership by either party at any time, in writing, without cause.

9. Comply with all local regulations regarding the promotion of financial-services content in your country of residence and the countries you target.

10. Indemnify the Platform against any claims arising from your marketing activities that violate the above terms.

This Agreement is governed by the laws of the United Arab Emirates (DIFC). Any disputes shall be resolved through arbitration in Dubai.`;

type PartnerData = {
  partner: {
    code: string;
    email: string;
    name: string;
    status: string;
    commission_pct: number;
    signed_nda_at: number | null;
    signed_nda_signature: string | null;
    signed_agreement_at: number | null;
    signed_agreement_signature: string | null;
    payment_method: string | null;
    payment_details: string | null;
  };
  stats: {
    clicks: number;
    conversions: number;
    balance: Record<string, { pending: number; confirmed: number; paid: number; reversed: number }>;
    commissions: Array<{ id: number; customer_email: string; amount_cents: number; currency: string; status: string; created_at: number }>;
  };
  payouts: Array<{ id: number; amount_cents: number; currency: string; method: string; status: string; requested_at: number; paid_at: number | null; paid_reference: string | null }>;
};

export function PartnerApp() {
  const path = window.location.pathname;
  const search = window.location.search;

  // Magic-link redirect
  if (path === "/partner/verify") {
    window.location.href = `/api/partners/verify${search}`;
    return null;
  }

  if (path === "/partner/apply") return <ApplyForm />;
  if (path === "/partner/login") return <LoginForm />;
  if (path === "/partner/dashboard") return <Dashboard />;
  return <Landing />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--aris-paper)", minHeight: "100vh", color: "var(--aris-ink)" }}>
      <header className="border-b border-[var(--aris-line-dark)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-7 py-4 flex items-center justify-between">
          <a href="/partner" className="flex items-center gap-2.5">
            <svg className="h-7 w-7" viewBox="0 0 40 40" fill="none">
              <path d="M20 3L34 11V29L20 37L6 29V11L20 3Z" stroke="#c6a667" strokeWidth="1.4" />
              <path d="M13 26V18L20 22L27 14V26" stroke="#c6a667" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="27" cy="14" r="1.8" fill="#c6a667" />
            </svg>
            <span>
              <span className="block font-serif-display text-[19px] text-[var(--aris-ink)]">Aristocrat</span>
              <span className="block font-mono-mark text-[9px] tracking-[0.3em] uppercase text-[var(--aris-gold)] -mt-0.5">Partner Program</span>
            </span>
          </a>
          <a href="/" className="text-sm text-[var(--aris-muted)] hover:text-[var(--aris-ink)]">← back to site</a>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 sm:px-7 py-10 sm:py-14">{children}</main>
    </div>
  );
}

// ─── Landing ────────────────────────────────────────────────────────────────
function Landing() {
  return (
    <Shell>
      <div className="max-w-2xl">
        <div className="eyebrow">Partner Program</div>
        <h1 className="font-serif-display text-[28px] sm:text-[40px] lg:text-[48px] text-[var(--aris-ink)] my-4">
          Earn 100% of the first payment — for every customer you refer.
        </h1>
        <p className="text-[15px] sm:text-[17px] text-[var(--aris-muted)] leading-relaxed mb-6">
          Promote Aristocrat Dividend Research to your audience. Get a unique partner code.
          For every new paying customer who signs up using your link, you receive <strong>100% of their first payment</strong>.
          No flat fees, no caps — just performance-based.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { n: "100%", l: "of first payment" },
            { n: "90 days", l: "cookie attribution" },
            { n: "Monthly", l: "payouts on request" },
          ].map(s => (
            <div key={s.l} className="rounded-lg border border-[var(--aris-line-dark)] bg-[var(--aris-offwhite)] p-5">
              <div className="font-serif-display text-[26px] text-[var(--aris-ink)]">{s.n}</div>
              <div className="text-[12.5px] text-[var(--aris-muted)] mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mb-10">
          <a href="/partner/apply" className="inline-flex items-center rounded-sm bg-[var(--aris-gold)] hover:bg-[var(--aris-gold-soft)] text-[var(--aris-green-950)] px-5 py-3 text-sm font-semibold transition">
            Apply now →
          </a>
          <a href="/partner/login" className="inline-flex items-center rounded-sm border border-[var(--aris-line-dark)] text-[var(--aris-ink)] hover:border-[var(--aris-gold)] hover:text-[var(--aris-gold)] px-5 py-3 text-sm font-semibold transition">
            Sign in
          </a>
        </div>

        <h3 className="font-serif-display text-[20px] text-[var(--aris-ink)] mb-3">How it works</h3>
        <ol className="space-y-3 text-[14px] text-[var(--aris-muted)]">
          <li><span className="font-mono-mark text-[var(--aris-gold)] me-2">01</span>Apply with your name + social handle. You're approved instantly and receive a unique partner code (e.g. <code>AHMED2F</code>).</li>
          <li><span className="font-mono-mark text-[var(--aris-gold)] me-2">02</span>Sign the digital NDA and Partner Agreement in your dashboard.</li>
          <li><span className="font-mono-mark text-[var(--aris-gold)] me-2">03</span>Share your tracking link (<code>aristocrat.com/r/YOURCODE</code>) on socials, in DMs, in your content.</li>
          <li><span className="font-mono-mark text-[var(--aris-gold)] me-2">04</span>For each customer who signs up using your link, you earn 100% of their first payment.</li>
          <li><span className="font-mono-mark text-[var(--aris-gold)] me-2">05</span>Request payout when ready. Paid via bank transfer or Wise within 5 business days.</li>
        </ol>

        <div className="mt-10 rounded-md border border-amber-300/50 bg-amber-50 px-4 py-3 text-[13px] text-amber-900 leading-relaxed">
          <strong>Compliance note:</strong> partners must include <code>#ad</code>, <code>#partner</code> and <code>#educational</code> in all promotional content,
          and may not make promises about investment returns. Aristocrat is an educational research platform, not a licensed financial advisor.
        </div>
      </div>
    </Shell>
  );
}

// ─── Apply ──────────────────────────────────────────────────────────────────
function ApplyForm() {
  const [form, setForm] = useState({ email: "", name: "", social_handle: "", country: "", estimated_reach: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [msg, setMsg] = useState<string>("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/partners/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error ?? `HTTP ${res.status}`);
      setStatus("success");
      setMsg(`Your partner code: ${j.code}. Check your email for a login link to access your dashboard and sign the partner agreement.`);
    } catch (e) {
      setStatus("error");
      setMsg(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <Shell>
      <div className="max-w-xl">
        <div className="eyebrow">Apply</div>
        <h1 className="font-serif-display text-[28px] sm:text-[36px] text-[var(--aris-ink)] my-3">Become a partner</h1>
        <p className="text-[15px] text-[var(--aris-muted)] mb-6">
          You'll receive your unique partner code immediately. We'll email you a login link to access your dashboard and sign the partner agreement.
        </p>

        {status === "success" ? (
          <div className="rounded-md border border-emerald-300 bg-emerald-50 p-5">
            <div className="font-semibold text-emerald-900 mb-2">✓ Application received</div>
            <p className="text-[14px] text-emerald-900 leading-relaxed">{msg}</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <Field label="Full name" value={form.name} onChange={v => setForm({ ...form, name: v })} required />
            <Field label="Email" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} required />
            <Field label="Primary social handle (X, IG, TikTok, LinkedIn URL)" value={form.social_handle} onChange={v => setForm({ ...form, social_handle: v })} />
            <Field label="Country of residence" value={form.country} onChange={v => setForm({ ...form, country: v })} />
            <Field label="Estimated audience reach" value={form.estimated_reach} onChange={v => setForm({ ...form, estimated_reach: v })} placeholder="e.g. 25k followers on X + 8k on LinkedIn" />
            {status === "error" && <div className="text-sm text-rose-700">{msg}</div>}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-sm bg-[var(--aris-gold)] hover:bg-[var(--aris-gold-soft)] text-[var(--aris-green-950)] px-6 py-3 text-sm font-semibold"
            >
              {status === "submitting" ? "Submitting…" : "Apply →"}
            </button>
          </form>
        )}
      </div>
    </Shell>
  );
}

function Field({ label, value, onChange, type = "text", required, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="font-mono-mark text-[10.5px] tracking-wider uppercase text-[var(--aris-muted)] mb-1">{label}</div>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full h-11 rounded-sm border border-[var(--aris-line-dark)] bg-white px-4 text-[15px] focus:outline-none focus:border-[var(--aris-gold)]"
      />
    </label>
  );
}

// ─── Login ──────────────────────────────────────────────────────────────────
function LoginForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/partners/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error ?? `HTTP ${res.status}`);
      setStatus("success");
      setMsg("Check your email for a login link (valid 24h).");
    } catch (e) {
      setStatus("error");
      setMsg(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <Shell>
      <div className="max-w-md">
        <h1 className="font-serif-display text-[28px] text-[var(--aris-ink)] mb-3">Partner sign in</h1>
        <p className="text-[14px] text-[var(--aris-muted)] mb-6">Enter your email — we'll send you a login link.</p>
        {status === "success" ? (
          <div className="rounded-md border border-emerald-300 bg-emerald-50 p-4 text-[14px] text-emerald-900">{msg}</div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <Field label="Email" type="email" value={email} onChange={setEmail} required />
            {status === "error" && <div className="text-sm text-rose-700">{msg}</div>}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-sm bg-[var(--aris-gold)] hover:bg-[var(--aris-gold-soft)] text-[var(--aris-green-950)] px-6 py-3 text-sm font-semibold"
            >
              {status === "submitting" ? "Sending…" : "Send login link"}
            </button>
          </form>
        )}
      </div>
    </Shell>
  );
}

// ─── Dashboard ──────────────────────────────────────────────────────────────
function Dashboard() {
  const [data, setData] = useState<PartnerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"overview" | "sign" | "payout" | "assets">("overview");

  async function reload() {
    try {
      const res = await fetch("/api/partners/me");
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/partner/login";
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }
      const j = await res.json();
      setData(j);
    } catch (e) {
      setError(String(e));
    }
  }

  useEffect(() => { reload(); }, []);

  if (error) return <Shell><div className="text-rose-700">{error}</div></Shell>;
  if (!data) return <Shell><div className="text-[var(--aris-muted)]">Loading…</div></Shell>;

  const needsToSign = !data.partner.signed_nda_at || !data.partner.signed_agreement_at;
  const referralUrl = `${window.location.origin}/r/${data.partner.code}`;

  return (
    <Shell>
      {needsToSign && tab !== "sign" && (
        <div className="mb-6 rounded-md border-2 border-amber-400 bg-amber-50 px-4 py-3 flex items-center justify-between gap-3">
          <span className="text-[14px] text-amber-900">
            ⚠ Please sign the Partner Agreement before promoting. <strong>You won't earn commissions until signed.</strong>
          </span>
          <button onClick={() => setTab("sign")} className="rounded-sm bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 text-sm font-semibold whitespace-nowrap">
            Sign now
          </button>
        </div>
      )}

      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="eyebrow">Dashboard</div>
          <h1 className="font-serif-display text-[26px] sm:text-[32px] text-[var(--aris-ink)] mt-2">Welcome, {data.partner.name}</h1>
          <div className="mt-1 text-[13px] text-[var(--aris-muted)]">
            Status: <span className={`font-medium ${data.partner.status === "active" ? "text-emerald-700" : "text-amber-700"}`}>{data.partner.status}</span>
            {" · "}Commission: <span className="font-medium">{data.partner.commission_pct}% of first payment</span>
          </div>
        </div>
        <button onClick={async () => { await fetch("/api/partners/logout", { method: "POST" }); window.location.href = "/partner"; }} className="text-sm text-[var(--aris-muted)] hover:text-[var(--aris-ink)]">
          Sign out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--aris-line-dark)] mb-6 overflow-x-auto">
        {(["overview", "sign", "payout", "assets"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium transition border-b-2 ${
              tab === t ? "border-[var(--aris-gold)] text-[var(--aris-ink)]" : "border-transparent text-[var(--aris-muted)] hover:text-[var(--aris-ink)]"
            }`}
          >
            {t === "overview" ? "Overview" : t === "sign" ? (needsToSign ? "Sign Agreement" : "Documents") : t === "payout" ? "Payout" : "Marketing Assets"}
          </button>
        ))}
      </div>

      {tab === "overview" && <Overview data={data} referralUrl={referralUrl} />}
      {tab === "sign" && <SignTab data={data} onSigned={reload} />}
      {tab === "payout" && <PayoutTab data={data} onChange={reload} />}
      {tab === "assets" && <AssetsTab code={data.partner.code} referralUrl={referralUrl} />}
    </Shell>
  );
}

function Overview({ data, referralUrl }: { data: PartnerData; referralUrl: string }) {
  const balanceCurrencies = Object.keys(data.stats.balance);
  return (
    <div className="space-y-6">
      {/* Code + link */}
      <div className="rounded-lg border-2 border-[var(--aris-gold)] bg-gradient-to-br from-[var(--aris-offwhite)] to-amber-50/30 p-5 sm:p-6">
        <div className="eyebrow">Your code</div>
        <div className="font-serif-display text-[32px] sm:text-[44px] tracking-wider text-[var(--aris-ink)] my-2">{data.partner.code}</div>
        <div className="text-[13px] text-[var(--aris-muted)] mb-3">Share this link — every click is tracked for 90 days.</div>
        <div className="flex items-center gap-2 flex-wrap">
          <code className="font-mono-mark text-[13px] bg-white border border-[var(--aris-line-dark)] px-3 py-2 rounded-sm break-all flex-1 min-w-0">{referralUrl}</code>
          <button
            onClick={() => navigator.clipboard.writeText(referralUrl)}
            className="rounded-sm bg-[var(--aris-ink)] hover:bg-black text-white px-4 py-2 text-sm font-semibold"
          >Copy</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-3">
        <StatCard label="Clicks (lifetime)" value={data.stats.clicks.toString()} />
        <StatCard label="Conversions" value={data.stats.conversions.toString()} />
        <StatCard label="Conversion rate" value={data.stats.clicks > 0 ? `${((data.stats.conversions / data.stats.clicks) * 100).toFixed(1)}%` : "—"} />
      </div>

      {/* Balance */}
      <div className="rounded-lg border border-[var(--aris-line-dark)] bg-[var(--aris-offwhite)] p-5">
        <h3 className="font-serif-display text-[18px] mb-3">Balance</h3>
        {balanceCurrencies.length === 0 ? (
          <div className="text-[13px] text-[var(--aris-muted)]">No commissions yet.</div>
        ) : (
          <div className="space-y-2">
            {balanceCurrencies.map(cur => {
              const b = data.stats.balance[cur];
              return (
                <div key={cur} className="grid grid-cols-4 gap-2 text-[13px]">
                  <div className="font-mono-mark uppercase text-[var(--aris-muted)]">{cur}</div>
                  <div><span className="text-[var(--aris-muted)] me-1">Pending</span><span className="tabular-nums">{(b.pending / 100).toFixed(2)}</span></div>
                  <div><span className="text-emerald-700 me-1">Confirmed</span><span className="tabular-nums font-semibold">{(b.confirmed / 100).toFixed(2)}</span></div>
                  <div><span className="text-[var(--aris-muted)] me-1">Paid</span><span className="tabular-nums">{(b.paid / 100).toFixed(2)}</span></div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent commissions */}
      <div>
        <h3 className="font-serif-display text-[18px] mb-3">Recent commissions</h3>
        <div className="rounded-lg border border-[var(--aris-line-dark)] overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-[var(--aris-offwhite)]">
              <tr className="text-left">
                <th className="px-3 py-2 font-mono-mark text-[10px] uppercase text-[var(--aris-muted)]">Customer</th>
                <th className="px-3 py-2 font-mono-mark text-[10px] uppercase text-[var(--aris-muted)]">Amount</th>
                <th className="px-3 py-2 font-mono-mark text-[10px] uppercase text-[var(--aris-muted)]">Status</th>
                <th className="px-3 py-2 font-mono-mark text-[10px] uppercase text-[var(--aris-muted)]">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.stats.commissions.length === 0 && (
                <tr><td colSpan={4} className="px-3 py-6 text-center text-[var(--aris-muted)]">No commissions yet</td></tr>
              )}
              {data.stats.commissions.map(c => (
                <tr key={c.id} className="border-t border-[var(--aris-line-dark)]">
                  <td className="px-3 py-2 font-mono-mark">{c.customer_email}</td>
                  <td className="px-3 py-2 tabular-nums">{(c.amount_cents / 100).toFixed(2)} {c.currency.toUpperCase()}</td>
                  <td className="px-3 py-2"><StatusBadge status={c.status} /></td>
                  <td className="px-3 py-2 text-[var(--aris-muted)]">{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--aris-line-dark)] bg-[var(--aris-offwhite)] px-5 py-4">
      <div className="font-mono-mark text-[10px] uppercase tracking-wider text-[var(--aris-muted)]">{label}</div>
      <div className="font-serif-display text-[24px] text-[var(--aris-ink)] mt-1 tabular-nums">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const cls = status === "confirmed" ? "bg-emerald-100 text-emerald-800"
    : status === "pending" ? "bg-amber-100 text-amber-800"
    : status === "paid" ? "bg-sky-100 text-sky-800"
    : "bg-stone-200 text-[var(--aris-muted)]";
  return <span className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full ${cls}`}>{status}</span>;
}

function SignTab({ data, onSigned }: { data: PartnerData; onSigned: () => void }) {
  const ndaSigned = !!data.partner.signed_nda_at;
  const agreementSigned = !!data.partner.signed_agreement_at;
  const bothSigned = ndaSigned && agreementSigned;

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Progress */}
      <div className="rounded-md border border-[var(--aris-line-dark)] bg-[var(--aris-offwhite)] p-4 flex items-center gap-4">
        <Step n={1} done={ndaSigned} label="NDA" />
        <div className={`flex-1 h-px ${ndaSigned ? "bg-emerald-400" : "bg-[var(--aris-line-dark)]"}`} />
        <Step n={2} done={agreementSigned} label="Agreement" />
        <div className="ms-auto text-[13px] font-medium text-[var(--aris-muted)]">
          {bothSigned ? "Complete ✓" : ndaSigned ? "1 of 2 done" : "0 of 2 done"}
        </div>
      </div>

      <p className="text-[14px] text-[var(--aris-muted)]">
        Each document must be signed separately. Type your full legal name as signature — by doing so you confirm legal acceptance. Your IP and timestamp are recorded as proof of signing.
      </p>

      <DocumentCard
        which="nda"
        title="Non-Disclosure Agreement (NDA)"
        stepLabel="Step 1 of 2"
        body={NDA_TEXT}
        signedAt={data.partner.signed_nda_at}
        signedBy={data.partner.signed_nda_signature}
        onSigned={onSigned}
      />

      <DocumentCard
        which="agreement"
        title="Partner Agreement"
        stepLabel="Step 2 of 2"
        body={AGREEMENT_TEXT}
        signedAt={data.partner.signed_agreement_at}
        signedBy={data.partner.signed_agreement_signature}
        onSigned={onSigned}
        locked={!ndaSigned}
        lockedMessage="Please sign the NDA first."
      />
    </div>
  );
}

function Step({ n, done, label }: { n: number; done: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center justify-center h-7 w-7 rounded-full text-[12px] font-semibold ${
          done ? "bg-emerald-600 text-white" : "bg-stone-200 text-[var(--aris-muted)]"
        }`}
      >
        {done ? "✓" : n}
      </div>
      <span className={`text-[13px] font-medium ${done ? "text-emerald-700" : "text-[var(--aris-ink)]"}`}>{label}</span>
    </div>
  );
}

function DocumentCard({
  which,
  title,
  stepLabel,
  body,
  signedAt,
  signedBy,
  onSigned,
  locked,
  lockedMessage,
}: {
  which: "nda" | "agreement";
  title: string;
  stepLabel: string;
  body: string;
  signedAt: number | null;
  signedBy: string | null;
  onSigned: () => void;
  locked?: boolean;
  lockedMessage?: string;
}) {
  const [accept, setAccept] = useState(false);
  const [signature, setSignature] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/partners/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ which, signature, accept }),
      });
      if (!res.ok) {
        const j = await res.json();
        throw new Error(j?.error ?? `HTTP ${res.status}`);
      }
      onSigned();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  // Already signed → show confirmation + collapsible view
  if (signedAt) {
    return (
      <div className="rounded-md border-2 border-emerald-200 bg-emerald-50/40 p-5">
        <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
          <h3 className="font-serif-display text-[18px]">{title}</h3>
          <span className="text-[12px] font-mono-mark text-emerald-700">{stepLabel}</span>
        </div>
        <div className="text-[13px] text-emerald-900">
          ✓ Signed by <strong>{signedBy ?? "—"}</strong> on {new Date(signedAt).toLocaleString()}
        </div>
        <details className="mt-3">
          <summary className="cursor-pointer text-[13px] text-[var(--aris-muted)]">View document text</summary>
          <p className="mt-3 text-[13px] text-[var(--aris-muted)] whitespace-pre-wrap leading-relaxed">{body}</p>
        </details>
      </div>
    );
  }

  if (locked) {
    return (
      <div className="rounded-md border border-[var(--aris-line-dark)] bg-stone-50 p-5 opacity-60">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <h3 className="font-serif-display text-[18px]">{title}</h3>
          <span className="text-[12px] font-mono-mark text-[var(--aris-muted)]">{stepLabel}</span>
        </div>
        <p className="text-[13px] text-[var(--aris-muted)] mt-2">🔒 {lockedMessage}</p>
      </div>
    );
  }

  // Active signing card
  return (
    <div className="rounded-md border-2 border-[var(--aris-gold)] bg-amber-50/20 p-5">
      <div className="flex items-baseline justify-between flex-wrap gap-2 mb-3">
        <h3 className="font-serif-display text-[18px]">{title}</h3>
        <span className="text-[12px] font-mono-mark text-[var(--aris-gold)]">{stepLabel}</span>
      </div>
      <div className="rounded border border-[var(--aris-line-dark)] bg-white p-4 max-h-[300px] overflow-y-auto">
        <p className="text-[13px] text-[var(--aris-ink)] whitespace-pre-wrap leading-relaxed">{body}</p>
      </div>

      <label className="mt-4 flex items-start gap-2 cursor-pointer">
        <input type="checkbox" checked={accept} onChange={e => setAccept(e.target.checked)} className="mt-1" />
        <span className="text-[14px]">
          I have read and accept the {which === "nda" ? "Non-Disclosure Agreement" : "Partner Agreement"}.
        </span>
      </label>

      <div className="mt-4">
        <div className="font-mono-mark text-[10.5px] tracking-wider uppercase text-[var(--aris-muted)] mb-1">
          Type your full legal name to sign this document
        </div>
        <input
          value={signature}
          onChange={e => setSignature(e.target.value)}
          placeholder="John Doe"
          className="w-full sm:w-96 h-11 rounded-sm border border-[var(--aris-line-dark)] bg-white px-4 text-[16px] font-serif-display italic"
        />
        <div className="mt-1 text-[11px] text-[var(--aris-muted)]">
          Your IP and timestamp will be recorded as legal proof of signing.
        </div>
      </div>

      {error && <div className="mt-3 text-sm text-rose-700">{error}</div>}

      <button
        onClick={submit}
        disabled={busy || !accept || signature.trim().length < 2}
        className="mt-4 rounded-sm bg-[var(--aris-gold)] hover:bg-[var(--aris-gold-soft)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--aris-green-950)] px-6 py-3 text-sm font-semibold"
      >
        {busy ? "Signing…" : `Sign ${which === "nda" ? "NDA" : "Partner Agreement"}`}
      </button>
    </div>
  );
}

function PayoutTab({ data, onChange }: { data: PartnerData; onChange: () => void }) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState(Object.keys(data.stats.balance)[0] ?? "usd");
  const [method, setMethod] = useState("bank_transfer");
  const [details, setDetails] = useState(data.partner.payment_details ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const availableConfirmed = data.stats.balance[currency]?.confirmed ?? 0;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setBusy(true);
    try {
      // Save payment details for future
      await fetch("/api/partners/payment-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, details }),
      });
      const res = await fetch("/api/partners/payout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount), currency, method, methodDetails: details }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error ?? `HTTP ${res.status}`);
      setSuccess(`Payout request #${j.payoutId} submitted. We'll process it within 5 business days.`);
      setAmount("");
      onChange();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-5">
      <h3 className="font-serif-display text-[20px]">Request payout</h3>

      <div className="rounded-md border border-[var(--aris-line-dark)] bg-[var(--aris-offwhite)] p-4">
        <div className="text-[13px] text-[var(--aris-muted)]">Available confirmed balance ({currency.toUpperCase()})</div>
        <div className="font-serif-display text-[28px] text-emerald-700 tabular-nums mt-1">
          {(availableConfirmed / 100).toFixed(2)}
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Amount" type="number" value={amount} onChange={setAmount} required />
          <label className="block">
            <div className="font-mono-mark text-[10.5px] tracking-wider uppercase text-[var(--aris-muted)] mb-1">Currency</div>
            <select value={currency} onChange={e => setCurrency(e.target.value)} className="w-full h-11 rounded-sm border border-[var(--aris-line-dark)] bg-white px-4 text-[15px]">
              {Object.keys(data.stats.balance).map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
            </select>
          </label>
        </div>

        <label className="block">
          <div className="font-mono-mark text-[10.5px] tracking-wider uppercase text-[var(--aris-muted)] mb-1">Payout method</div>
          <select value={method} onChange={e => setMethod(e.target.value)} className="w-full h-11 rounded-sm border border-[var(--aris-line-dark)] bg-white px-4 text-[15px]">
            <option value="bank_transfer">Bank transfer (IBAN)</option>
            <option value="wise">Wise</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>

        <label className="block">
          <div className="font-mono-mark text-[10.5px] tracking-wider uppercase text-[var(--aris-muted)] mb-1">Payment details</div>
          <textarea
            value={details}
            onChange={e => setDetails(e.target.value)}
            rows={3}
            placeholder="e.g. IBAN: AE07 0331 2345 6789 0123 4567 · Bank: Emirates NBD · Holder: Ahmed K."
            className="w-full rounded-sm border border-[var(--aris-line-dark)] bg-white px-4 py-3 text-[14px]"
            required
          />
        </label>

        {error && <div className="text-sm text-rose-700">{error}</div>}
        {success && <div className="text-sm text-emerald-700">{success}</div>}

        <button type="submit" disabled={busy} className="rounded-sm bg-[var(--aris-gold)] hover:bg-[var(--aris-gold-soft)] text-[var(--aris-green-950)] px-6 py-3 text-sm font-semibold">
          {busy ? "Submitting…" : "Request payout"}
        </button>
      </form>

      <div>
        <h4 className="font-serif-display text-[16px] mt-6 mb-2">Payout history</h4>
        <div className="rounded-md border border-[var(--aris-line-dark)] overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-[var(--aris-offwhite)]">
              <tr className="text-left"><th className="px-3 py-2">Amount</th><th className="px-3 py-2">Method</th><th className="px-3 py-2">Status</th><th className="px-3 py-2">Requested</th><th className="px-3 py-2">Paid</th></tr>
            </thead>
            <tbody>
              {data.payouts.length === 0 && <tr><td colSpan={5} className="px-3 py-6 text-center text-[var(--aris-muted)]">No payouts yet</td></tr>}
              {data.payouts.map(p => (
                <tr key={p.id} className="border-t border-[var(--aris-line-dark)]">
                  <td className="px-3 py-2 tabular-nums">{(p.amount_cents / 100).toFixed(2)} {p.currency.toUpperCase()}</td>
                  <td className="px-3 py-2">{p.method}</td>
                  <td className="px-3 py-2"><StatusBadge status={p.status} /></td>
                  <td className="px-3 py-2 text-[var(--aris-muted)]">{new Date(p.requested_at).toLocaleDateString()}</td>
                  <td className="px-3 py-2 text-[var(--aris-muted)]">{p.paid_at ? new Date(p.paid_at).toLocaleDateString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AssetsTab({ code, referralUrl }: { code: string; referralUrl: string }) {
  const copyTemplates = [
    { lang: "English (short)", text: `Discover U.S. dividend research for Gulf investors. Lower starting capital than property — and target higher recurring income than rental yields. Use code ${code} for an introductory offer: ${referralUrl} #ad #partner #educational` },
    { lang: "العربية (قصير)", text: `أبحاث توزيعات أرباح أمريكية لمستثمري الخليج. رأس مال ابتدائي أقل من العقار — وإمكانية دخل متكرر أعلى من عائد الإيجار. استخدم الرمز ${code}: ${referralUrl} #إعلان #شراكة #تعليمي` },
    { lang: "English (long)", text: `If you've thought about real estate but the capital required is too high — there is a more flexible way. Aristocrat is a research platform that screens established U.S. dividend-paying companies for Gulf investors. Lower starting capital, USD-denominated income, full liquidity, halal-aware filtering. 30-day money-back guarantee. Use my code ${code} to get started: ${referralUrl}\n\n#ad #partner #educational — Not investment advice.` },
  ];
  return (
    <div className="space-y-5 max-w-3xl">
      <p className="text-[14px] text-[var(--aris-muted)]">Pre-approved copy you can use directly. Always include #ad #partner and #educational hashtags. Do not make promises about returns.</p>
      {copyTemplates.map(t => (
        <div key={t.lang} className="rounded-md border border-[var(--aris-line-dark)] bg-[var(--aris-offwhite)] p-4">
          <div className="font-mono-mark text-[10.5px] uppercase tracking-wider text-[var(--aris-gold)] mb-2">{t.lang}</div>
          <p className="text-[14px] whitespace-pre-wrap mb-3">{t.text}</p>
          <button onClick={() => navigator.clipboard.writeText(t.text)} className="text-sm rounded-sm border border-[var(--aris-ink)] hover:bg-[var(--aris-ink)] hover:text-white px-3 py-1.5">Copy</button>
        </div>
      ))}
    </div>
  );
}

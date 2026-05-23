import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Sub = {
  email: string;
  lang: string;
  created_at: number;
  last_sent_at: number | null;
  paid_status: string | null;
  paid_at: number | null;
  currency: string | null;
};
type Resp = { count: number; last_run_at: number | null; subscribers: Sub[] };
type Partner = {
  code: string; email: string; name: string; status: string; commission_pct: number;
  signed_nda_at: number | null; signed_agreement_at: number | null;
  created_at: number; last_login_at: number | null; login_count: number;
  payment_method: string | null; payment_details: string | null;
  clicks_count: number; conversions_count: number;
  pending_cents: number; confirmed_cents: number; paid_cents: number;
};
type Payout = { id: number; code: string; amount_cents: number; currency: string; method: string; method_details: string; status: string; requested_at: number; paid_at: number | null; paid_reference: string | null };
type Overview = {
  total: number; active: number; signed: number; ever_logged_in: number; total_clicks: number; total_conversions: number;
  codes_generated: number; codes_used: number; codes_converted: number; total_commissions_cents: number;
};
type PartnersResp = { partners: Partner[]; payouts: Payout[]; overview: Overview };
type AnalyticsResp = {
  analytics: {
    totals: {
      events: number; pageViews: number; clicks: number; checkoutStarts: number; visitors: number;
      visitors24h: number; visitors7d: number; visitors30d: number; pageViews7d: number; clicks7d: number; checkoutStarts7d: number;
    };
    topPages: { path: string; views: number; visitors: number }[];
    topClicks: { target_text: string | null; target_href: string | null; clicks: number; visitors: number }[];
    recentEvents: { id: number; timestamp: number; type: string; path: string | null; target_text: string | null; target_href: string | null; referrer: string | null }[];
    daily: { day: string; page_views: number; clicks: number; visitors: number; checkout_starts: number }[];
  };
  customers: {
    subscribers: number; active: number; pending: number; canceled: number; newSubscribers7d: number; newPaid7d: number;
    byCurrency: Record<string, number>;
    recent: { email: string; lang: string; paid_status: string | null; paid_at: number | null; currency: string | null }[];
  };
  partners: { overview: Overview; topByClicks: Partner[]; topByConversions: Partner[]; recent: Partner[] };
};

const fmtDate = (ms: number | null) =>
  ms == null ? "—" : new Date(ms).toLocaleString();

export function Admin() {
  const [token, setToken] = useState<string>(() => sessionStorage.getItem("admin_token") ?? "");
  const [loginEmail, setLoginEmail] = useState("jpolec@gmail.com");
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [loginStatus, setLoginStatus] = useState<string | null>(null);
  const [data, setData] = useState<Resp | null>(null);
  const [partnersData, setPartnersData] = useState<PartnersResp | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsResp | null>(null);
  const [tab, setTab] = useState<"overview" | "subscribers" | "partners">("overview");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function withToken(url: string) {
    return token ? `${url}${url.includes("?") ? "&" : "?"}token=${encodeURIComponent(token)}` : url;
  }

  async function load() {
    setError(null);
    try {
      const [subRes, partRes, analyticsRes] = await Promise.all([
        fetch(withToken("/api/admin/subscribers")),
        fetch(withToken("/api/admin/partners")),
        fetch(withToken("/api/admin/analytics")),
      ]);
      if (!subRes.ok) throw new Error(`HTTP ${subRes.status}`);
      const j = (await subRes.json()) as Resp;
      setData(j);
      if (partRes.ok) {
        const p = (await partRes.json()) as PartnersResp;
        setPartnersData(p);
      }
      if (analyticsRes.ok) {
        const a = (await analyticsRes.json()) as AnalyticsResp;
        setAnalyticsData(a);
      }
    } catch (e) {
      setError(String(e));
    }
  }

  async function checkSession() {
    try {
      const res = await fetch("/api/admin/session");
      const j = await res.json() as { authenticated?: boolean; email?: string };
      if (j.authenticated) {
        setSessionEmail(j.email ?? null);
        await load();
      }
    } catch {
      // Login form remains available.
    }
  }

  async function sendLoginLink() {
    setBusy(true);
    setError(null);
    setLoginStatus(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail }),
      });
      const j = await res.json() as { message?: string; error?: string };
      if (!res.ok) throw new Error(j.message ?? j.error ?? `HTTP ${res.status}`);
      setLoginStatus(j.message ?? "If this email is authorized, a login link will be sent.");
    } catch (e) {
      setError(String(e));
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    sessionStorage.removeItem("admin_token");
    setToken("");
    setSessionEmail(null);
    setData(null);
    setPartnersData(null);
    setAnalyticsData(null);
    await fetch("/api/admin/logout", { method: "POST" });
  }

  async function markPayoutPaid(payoutId: number) {
    const reference = prompt("Payment reference (bank ref / Wise ID / etc.)?");
    if (!reference) return;
    await fetch(withToken("/api/admin/partners/payout/mark-paid"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payoutId, reference }),
    });
    await load();
  }

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("admin_token", token);
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function dryRun(only?: string) {
    setBusy(true);
    setError(null);
    try {
      const qs = new URLSearchParams({ dry: "true" });
      if (only) qs.set("only", only);
      const res = await fetch(withToken(`/api/admin/send?${qs}`), { method: "POST" });
      const j = await res.json();
      alert(`Dry run: ${JSON.stringify(j)}`);
    } catch (e) {
      setError(String(e));
    } finally {
      setBusy(false);
    }
  }

  async function sendReal(only?: string) {
    if (!confirm(only ? `Send digest to ${only}?` : "Send digest to ALL subscribers now?")) return;
    setBusy(true);
    setError(null);
    try {
      const qs = new URLSearchParams();
      if (only) qs.set("only", only);
      const res = await fetch(withToken(`/api/admin/send${qs.toString() ? `?${qs}` : ""}`), { method: "POST" });
      const j = await res.json();
      alert(`Send: ${JSON.stringify(j)}`);
      load();
    } catch (e) {
      setError(String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <header className="mb-6 flex items-baseline justify-between">
        <h1 className="text-3xl font-bold">Admin</h1>
        <a href="/" className="text-sm text-muted-foreground hover:underline">← back</a>
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Auth</CardTitle>
          <CardDescription>
            Login by email magic link, or use <code>ADMIN_TOKEN</code> as a fallback.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sessionEmail && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border bg-muted/40 px-3 py-2 text-sm">
              <span>Logged in as <strong>{sessionEmail}</strong></span>
              <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
            </div>
          )}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="email"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              placeholder="admin email"
              className="max-w-md"
            />
            <Button disabled={busy} onClick={sendLoginLink}>Send login link</Button>
          </div>
          {loginStatus && <p className="text-sm text-muted-foreground">{loginStatus}</p>}
          <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row">
            <Input
              type="password"
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="ADMIN_TOKEN fallback"
              className="max-w-md"
            />
            <Button variant="outline" onClick={load}>Load with token</Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="mb-4 rounded-md border border-destructive bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {data && (
        <>
          <div className="flex gap-1 border-b mb-4">
            <button onClick={() => setTab("overview")} className={`px-4 py-2 text-sm font-medium border-b-2 ${tab === "overview" ? "border-primary" : "border-transparent text-muted-foreground"}`}>
              Overview
            </button>
            <button onClick={() => setTab("subscribers")} className={`px-4 py-2 text-sm font-medium border-b-2 ${tab === "subscribers" ? "border-primary" : "border-transparent text-muted-foreground"}`}>
              Subscribers ({data.count})
            </button>
            <button onClick={() => setTab("partners")} className={`px-4 py-2 text-sm font-medium border-b-2 ${tab === "partners" ? "border-primary" : "border-transparent text-muted-foreground"}`}>
              Partners ({partnersData?.partners.length ?? 0})
            </button>
          </div>

          {tab === "partners" && partnersData && (
            <PartnersAdminPanel data={partnersData} onMarkPaid={markPayoutPaid} />
          )}
          {tab === "overview" && analyticsData && (
            <AdminOverviewPanel data={analyticsData} />
          )}
          {tab === "subscribers" && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Subscribers ({data.count})</CardTitle>
              <CardDescription>
                Last weekly job ran: <strong>{fmtDate(data.last_run_at)}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Button variant="outline" disabled={busy} onClick={() => dryRun()}>Dry run (all)</Button>
                <Button disabled={busy} onClick={() => sendReal()}>Send now (all)</Button>
                <a href={withToken("/api/admin/preview?lang=en")} target="_blank" rel="noopener" className="inline-flex items-center px-3 h-9 rounded-md border text-sm hover:bg-muted">Preview EN</a>
                <a href={withToken("/api/admin/preview?lang=pl")} target="_blank" rel="noopener" className="inline-flex items-center px-3 h-9 rounded-md border text-sm hover:bg-muted">Preview PL</a>
                <a href={withToken("/api/admin/preview?lang=ar")} target="_blank" rel="noopener" className="inline-flex items-center px-3 h-9 rounded-md border text-sm hover:bg-muted">Preview AR</a>
              </div>

              <div className="overflow-x-auto rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-xs uppercase">
                    <tr>
                      <th className="px-3 py-2 text-start font-medium">Email</th>
                      <th className="px-3 py-2 text-start font-medium">Lang</th>
                      <th className="px-3 py-2 text-start font-medium">Status</th>
                      <th className="px-3 py-2 text-start font-medium">Paid</th>
                      <th className="px-3 py-2 text-start font-medium">Subscribed</th>
                      <th className="px-3 py-2 text-start font-medium">Last sent</th>
                      <th className="px-3 py-2 text-start font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.subscribers.map(s => (
                      <tr key={s.email} className="border-t">
                        <td className="px-3 py-2 font-mono">{s.email}</td>
                        <td className="px-3 py-2 uppercase">{s.lang}</td>
                        <td className="px-3 py-2">
                          <StatusBadge status={s.paid_status ?? "pending"} />
                        </td>
                        <td className="px-3 py-2 text-xs">{s.paid_at ? `${fmtDate(s.paid_at)} ${s.currency ? `· ${s.currency.toUpperCase()}` : ""}` : "—"}</td>
                        <td className="px-3 py-2">{fmtDate(s.created_at)}</td>
                        <td className="px-3 py-2">{fmtDate(s.last_sent_at)}</td>
                        <td className="px-3 py-2">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" disabled={busy} onClick={() => dryRun(s.email)}>Dry</Button>
                            <Button size="sm" disabled={busy} onClick={() => sendReal(s.email)}>Send</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {data.subscribers.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-3 py-6 text-center text-muted-foreground">No subscribers yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          )}
        </>
      )}
    </div>
  );
}

function OvCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-lg border bg-card px-4 py-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</div>
      <div className="font-semibold text-2xl tabular-nums mt-1">{value}</div>
      {sub && <div className="text-[11px] text-muted-foreground mt-0.5">{sub}</div>}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const cls = status === "active"
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : status === "canceled"
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : "border-amber-200 bg-amber-50 text-amber-700";
  return <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${cls}`}>{status}</span>;
}

function AdminOverviewPanel({ data }: { data: AnalyticsResp }) {
  const t = data.analytics.totals;
  const p = data.partners.overview;
  const maxDaily = Math.max(1, ...data.analytics.daily.map(d => d.page_views));
  const codeUseRate = p.codes_generated > 0 ? `${((p.codes_used / p.codes_generated) * 100).toFixed(1)}% used` : "no codes";
  const clickCr = p.total_clicks > 0 ? `${((p.total_conversions / p.total_clicks) * 100).toFixed(1)}% conversion` : "no referral clicks";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <OvCard label="Visitors 24h" value={t.visitors24h} sub={`${t.visitors7d} in 7d`} />
        <OvCard label="Visitors 30d" value={t.visitors30d} sub={`${t.visitors} all-time`} />
        <OvCard label="Page views 7d" value={t.pageViews7d} sub={`${t.pageViews} all-time`} />
        <OvCard label="Clicks 7d" value={t.clicks7d} sub={`${t.clicks} all-time`} />
        <OvCard label="Checkout starts 7d" value={t.checkoutStarts7d} sub={`${t.checkoutStarts} all-time`} />
        <OvCard label="Active customers" value={data.customers.active} sub={`${data.customers.newPaid7d} new paid in 7d`} />
        <OvCard label="Subscribers" value={data.customers.subscribers} sub={`${data.customers.pending} pending · ${data.customers.canceled} canceled`} />
        <OvCard label="Partner codes" value={`${p.codes_used}/${p.codes_generated}`} sub={`${codeUseRate} · ${p.codes_converted} converted`} />
      </div>

      <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Last 14 days</CardTitle>
            <CardDescription>Visitors, page views, clicks, and checkout starts tracked by the site.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.analytics.daily.map(day => (
                <div key={day.day} className="grid grid-cols-[92px_1fr_72px_72px_72px] items-center gap-3 text-sm">
                  <div className="font-mono text-xs text-muted-foreground">{day.day.slice(5)}</div>
                  <div className="h-2 rounded bg-muted overflow-hidden">
                    <div className="h-full rounded bg-primary" style={{ width: `${Math.max(4, (day.page_views / maxDaily) * 100)}%` }} />
                  </div>
                  <div className="text-end tabular-nums">{day.visitors} uv</div>
                  <div className="text-end tabular-nums">{day.clicks} clk</div>
                  <div className="text-end tabular-nums">{day.checkout_starts} chk</div>
                </div>
              ))}
              {data.analytics.daily.length === 0 && <div className="py-8 text-center text-sm text-muted-foreground">No analytics events yet</div>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>Paid subscription state from Stripe webhook data.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
              {[
                ["Active", data.customers.active],
                ["Pending", data.customers.pending],
                ["Canceled", data.customers.canceled],
              ].map(([label, value]) => (
                <div key={label} className="border-b pb-2">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</div>
                  <div className="mt-1 text-xl font-semibold tabular-nums">{value}</div>
                </div>
              ))}
            </div>
            <div className="rounded-md border overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {data.customers.recent.map(c => (
                    <tr key={`${c.email}-${c.paid_at}`} className="border-t first:border-t-0">
                      <td className="px-3 py-2 font-mono text-xs">{c.email}</td>
                      <td className="px-3 py-2"><StatusBadge status={c.paid_status ?? "pending"} /></td>
                      <td className="px-3 py-2 text-end text-xs">{c.currency?.toUpperCase() ?? "—"}</td>
                    </tr>
                  ))}
                  {data.customers.recent.length === 0 && (
                    <tr><td className="px-3 py-6 text-center text-muted-foreground">No paid customers yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top pages</CardTitle>
            <CardDescription>Last 30 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminMiniTable
              rows={data.analytics.topPages.map(r => [r.path, `${r.views} views`, `${r.visitors} visitors`])}
              empty="No page views yet"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top clicks</CardTitle>
            <CardDescription>What users click most often in the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminMiniTable
              rows={data.analytics.topClicks.map(r => [r.target_text || r.target_href || "Untitled click", `${r.clicks} clicks`, `${r.visitors} visitors`])}
              empty="No clicks yet"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Partner code performance</CardTitle>
            <CardDescription>{p.total_clicks} referral clicks · {clickCr}</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminMiniTable
              rows={data.partners.topByClicks.map(partner => [
                `${partner.code} · ${partner.name}`,
                `${partner.clicks_count} clicks`,
                `${partner.conversions_count} conv.`,
              ])}
              empty="No partner clicks yet"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent events</CardTitle>
            <CardDescription>Live event stream from site analytics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-[360px] overflow-auto rounded-md border">
              <table className="w-full text-sm">
                <tbody>
                  {data.analytics.recentEvents.map(e => (
                    <tr key={e.id} className="border-t first:border-t-0">
                      <td className="px-3 py-2 text-xs text-muted-foreground whitespace-nowrap">{fmtDate(e.timestamp)}</td>
                      <td className="px-3 py-2 font-mono text-xs">{e.type}</td>
                      <td className="px-3 py-2 text-xs truncate max-w-[260px]" title={e.target_text || e.path || ""}>
                        {e.target_text || e.path || "—"}
                      </td>
                    </tr>
                  ))}
                  {data.analytics.recentEvents.length === 0 && (
                    <tr><td className="px-3 py-6 text-center text-muted-foreground">No events yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AdminMiniTable({ rows, empty }: { rows: string[][]; empty: string }) {
  return (
    <div className="rounded-md border overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr key={`${row[0]}-${i}`} className="border-t first:border-t-0">
              <td className="px-3 py-2 font-medium truncate max-w-[280px]" title={row[0]}>{row[0]}</td>
              <td className="px-3 py-2 text-end tabular-nums text-muted-foreground">{row[1]}</td>
              <td className="px-3 py-2 text-end tabular-nums text-muted-foreground">{row[2]}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td className="px-3 py-6 text-center text-muted-foreground">{empty}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function PartnersAdminPanel({ data, onMarkPaid }: { data: PartnersResp; onMarkPaid: (id: number) => void }) {
  const o = data.overview;
  const cr = o.total_clicks > 0 ? ((o.total_conversions / o.total_clicks) * 100).toFixed(1) : "—";
  return (
    <div className="space-y-6">
      {/* Overview cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <OvCard label="Partners" value={o.total} sub={`${o.active} active`} />
        <OvCard label="Signed both docs" value={o.signed} sub={`${o.total - o.signed} pending`} />
        <OvCard label="Ever logged in" value={o.ever_logged_in} sub={`${o.total - o.ever_logged_in} never`} />
        <OvCard label="Codes used" value={`${o.codes_used}/${o.codes_generated}`} sub={`${o.codes_converted} converted`} />
        <OvCard label="Total clicks" value={o.total_clicks} sub={`${cr}% CR`} />
        <OvCard label="Conversions" value={o.total_conversions} sub="paying customers" />
        <OvCard label="Earned (confirmed+paid)" value={`$${(o.total_commissions_cents / 100).toFixed(0)}`} sub="across all currencies" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Partners ({data.partners.length})</CardTitle>
          <CardDescription>All registered partners with attribution stats and login activity.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase">
                <tr>
                  <th className="px-3 py-2 text-start font-medium">Code</th>
                  <th className="px-3 py-2 text-start font-medium">Name</th>
                  <th className="px-3 py-2 text-start font-medium">Email</th>
                  <th className="px-3 py-2 text-end font-medium">Clicks</th>
                  <th className="px-3 py-2 text-end font-medium">Conv.</th>
                  <th className="px-3 py-2 text-end font-medium">Earned</th>
                  <th className="px-3 py-2 text-start font-medium">NDA</th>
                  <th className="px-3 py-2 text-start font-medium">Agree</th>
                  <th className="px-3 py-2 text-start font-medium">Last login</th>
                  <th className="px-3 py-2 text-start font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {data.partners.length === 0 && <tr><td colSpan={10} className="px-3 py-6 text-center text-muted-foreground">No partners yet</td></tr>}
                {data.partners.map(p => {
                  const earned = (p.confirmed_cents + p.paid_cents) / 100;
                  return (
                    <tr key={p.code} className="border-t hover:bg-muted/30">
                      <td className="px-3 py-2 font-mono font-semibold">{p.code}</td>
                      <td className="px-3 py-2">{p.name}</td>
                      <td className="px-3 py-2 font-mono text-xs">{p.email}</td>
                      <td className="px-3 py-2 text-end tabular-nums">{p.clicks_count}</td>
                      <td className="px-3 py-2 text-end tabular-nums font-medium">{p.conversions_count}</td>
                      <td className="px-3 py-2 text-end tabular-nums text-emerald-700 font-semibold">{earned > 0 ? `$${earned.toFixed(0)}` : "—"}</td>
                      <td className="px-3 py-2 text-xs">{p.signed_nda_at ? "✓" : "—"}</td>
                      <td className="px-3 py-2 text-xs">{p.signed_agreement_at ? "✓" : "—"}</td>
                      <td className="px-3 py-2 text-xs">{p.last_login_at ? new Date(p.last_login_at).toLocaleDateString() : "never"}{p.login_count > 0 && <span className="text-muted-foreground"> ({p.login_count}×)</span>}</td>
                      <td className="px-3 py-2 text-xs">{new Date(p.created_at).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payouts ({data.payouts.length})</CardTitle>
          <CardDescription>Click "Mark paid" after transferring funds — releases the commissions from confirmed to paid.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase">
                <tr>
                  <th className="px-3 py-2 text-start font-medium">Partner</th>
                  <th className="px-3 py-2 text-start font-medium">Amount</th>
                  <th className="px-3 py-2 text-start font-medium">Method</th>
                  <th className="px-3 py-2 text-start font-medium">Details</th>
                  <th className="px-3 py-2 text-start font-medium">Status</th>
                  <th className="px-3 py-2 text-start font-medium">Requested</th>
                  <th className="px-3 py-2 text-start font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.payouts.length === 0 && <tr><td colSpan={7} className="px-3 py-6 text-center text-muted-foreground">No payout requests</td></tr>}
                {data.payouts.map(p => (
                  <tr key={p.id} className="border-t">
                    <td className="px-3 py-2 font-mono">{p.code}</td>
                    <td className="px-3 py-2 tabular-nums font-semibold">{(p.amount_cents / 100).toFixed(2)} {p.currency.toUpperCase()}</td>
                    <td className="px-3 py-2">{p.method}</td>
                    <td className="px-3 py-2 text-xs max-w-xs truncate" title={p.method_details}>{p.method_details}</td>
                    <td className="px-3 py-2"><span className={`text-xs font-semibold ${p.status === "paid" ? "text-emerald-700" : "text-amber-700"}`}>{p.status}</span></td>
                    <td className="px-3 py-2 text-xs">{new Date(p.requested_at).toLocaleDateString()}</td>
                    <td className="px-3 py-2">
                      {p.status === "requested" && <Button size="sm" onClick={() => onMarkPaid(p.id)}>Mark paid</Button>}
                      {p.paid_reference && <span className="text-xs text-muted-foreground">{p.paid_reference}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

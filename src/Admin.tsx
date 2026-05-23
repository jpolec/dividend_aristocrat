import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Sub = {
  email: string;
  lang: string;
  created_at: number;
  last_sent_at: number | null;
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
type Overview = { total: number; active: number; signed: number; ever_logged_in: number; total_clicks: number; total_conversions: number; total_commissions_cents: number };
type PartnersResp = { partners: Partner[]; payouts: Payout[]; overview: Overview };

const fmtDate = (ms: number | null) =>
  ms == null ? "—" : new Date(ms).toLocaleString();

export function Admin() {
  const [token, setToken] = useState<string>(() => sessionStorage.getItem("admin_token") ?? "");
  const [data, setData] = useState<Resp | null>(null);
  const [partnersData, setPartnersData] = useState<PartnersResp | null>(null);
  const [tab, setTab] = useState<"subscribers" | "partners">("subscribers");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function withToken(url: string) {
    return token ? `${url}${url.includes("?") ? "&" : "?"}token=${encodeURIComponent(token)}` : url;
  }

  async function load() {
    setError(null);
    try {
      const [subRes, partRes] = await Promise.all([
        fetch(withToken("/api/admin/subscribers")),
        fetch(withToken("/api/admin/partners")),
      ]);
      if (!subRes.ok) throw new Error(`HTTP ${subRes.status}`);
      const j = (await subRes.json()) as Resp;
      setData(j);
      if (partRes.ok) {
        const p = (await partRes.json()) as PartnersResp;
        setPartnersData(p);
      }
    } catch (e) {
      setError(String(e));
    }
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
            If <code>ADMIN_TOKEN</code> env var is set on the server, paste it here. Otherwise leave empty.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input
            type="password"
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="admin token (or empty)"
            className="max-w-md"
          />
          <Button onClick={load}>Load</Button>
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
                        <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">No subscribers yet</td>
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

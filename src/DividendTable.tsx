import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useT } from "./i18n";

type Row = {
  symbol: string;
  companyName: string;
  marketCap: number | null;
  sector: string | null;
  industry: string | null;
  price: number;
  lastAnnualDividend: number;
  exchangeShortName: string;
};

type Enriched = {
  symbol: string;
  yearsCovered: number;
  yearsPaid: number;
  confidence: number;
  totalPaid5y: number;
  ytd: number | null;
  oneYear: number | null;
  lastClose: number | null;
  error?: string;
};

type SortKey =
  | "symbol"
  | "companyName"
  | "sector"
  | "price"
  | "lastAnnualDividend"
  | "yield"
  | "marketCap"
  | "confidence"
  | "yearsPaid"
  | "ytd"
  | "oneYear"
  | "totalPaid5y";
type SortDir = "asc" | "desc";

const fmtNum = (n: number | null | undefined, digits = 2) =>
  n == null || Number.isNaN(n) ? "—" : n.toLocaleString(undefined, { maximumFractionDigits: digits });

const fmtCap = (n: number | null) => {
  if (n == null) return "—";
  if (n >= 1e12) return `${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  return n.toLocaleString();
};

const yieldPct = (r: Row) => (r.price > 0 ? (r.lastAnnualDividend / r.price) * 100 : 0);

const pctClass = (v: number | null | undefined) =>
  v == null ? "" : v >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400";

const fmtPct = (v: number | null | undefined) => (v == null ? "—" : `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`);

function ConfidenceBar({ value }: { value: number | null | undefined }) {
  if (value == null) return <span className="text-muted-foreground">—</span>;
  const v = Math.max(0, Math.min(100, value));
  const color =
    v >= 80 ? "bg-emerald-500" : v >= 60 ? "bg-lime-500" : v >= 40 ? "bg-yellow-500" : v >= 20 ? "bg-orange-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 rounded bg-muted overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${v}%` }} />
      </div>
      <span className="tabular-nums text-xs">{v.toFixed(0)}%</span>
    </div>
  );
}

export function DividendTable() {
  const [rows, setRows] = useState<Row[]>([]);
  const [enriched, setEnriched] = useState<Map<string, Enriched>>(new Map());
  const [loading, setLoading] = useState(true);
  const [enriching, setEnriching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [sector, setSector] = useState<string>("");
  const [limit, setLimit] = useState(100);
  const [minDividend, setMinDividend] = useState(0.5);
  const [enrichCount, setEnrichCount] = useState(100);
  const [includeFunds, setIncludeFunds] = useState(false);
  const [cacheAgeMs, setCacheAgeMs] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("confidence");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const { t } = useT();

  async function loadBase() {
    setLoading(true);
    setError(null);
    setEnriched(new Map());
    try {
      const qs = new URLSearchParams({
        limit: String(limit),
        min_dividend: String(minDividend),
        include_funds: String(includeFunds),
      });
      const res = await fetch(`/api/dividends?${qs}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? `HTTP ${res.status}`);
      setRows(json.rows ?? []);
      setCacheAgeMs(typeof json.cache_age_ms === "number" ? json.cache_age_ms : null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function clearCache() {
    await fetch("/api/cache/clear", { method: "POST" });
    await loadBase();
  }

  async function loadEnriched(symbols: string[]) {
    if (symbols.length === 0) return;
    setEnriching(true);
    try {
      const res = await fetch(`/api/dividends/enriched`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbols }),
      });
      const json = (await res.json()) as { enriched?: Enriched[] };
      if (json.enriched) {
        setEnriched(prev => {
          const next = new Map(prev);
          for (const e of json.enriched!) next.set(e.symbol, e);
          return next;
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setEnriching(false);
    }
  }

  useEffect(() => {
    loadBase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-enrich top N by market cap when base rows arrive
  useEffect(() => {
    if (rows.length === 0) return;
    const top = rows
      .slice()
      .sort((a, b) => (b.marketCap ?? 0) - (a.marketCap ?? 0))
      .slice(0, enrichCount)
      .map(r => r.symbol);
    loadEnriched(top);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, enrichCount]);

  const sectors = useMemo(() => {
    const s = new Set<string>();
    for (const r of rows) if (r.sector) s.add(r.sector);
    return Array.from(s).sort();
  }, [rows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const get = (r: Row, k: SortKey): number | string => {
      const e = enriched.get(r.symbol);
      switch (k) {
        case "symbol": return r.symbol;
        case "companyName": return r.companyName ?? "";
        case "sector": return r.sector ?? "";
        case "price": return r.price;
        case "lastAnnualDividend": return r.lastAnnualDividend;
        case "yield": return yieldPct(r);
        case "marketCap": return r.marketCap ?? -Infinity;
        case "confidence": return e?.confidence ?? -Infinity;
        case "yearsPaid": return e?.yearsPaid ?? -Infinity;
        case "ytd": return e?.ytd ?? -Infinity;
        case "oneYear": return e?.oneYear ?? -Infinity;
        case "totalPaid5y": return e?.totalPaid5y ?? -Infinity;
      }
    };

    let out = rows.filter(r => {
      if (sector && r.sector !== sector) return false;
      if (!q) return true;
      return (
        r.symbol.toLowerCase().includes(q) ||
        (r.companyName ?? "").toLowerCase().includes(q) ||
        (r.industry ?? "").toLowerCase().includes(q)
      );
    });

    out = out.slice().sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      const av = get(a, sortKey);
      const bv = get(b, sortKey);
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
    return out;
  }, [rows, enriched, search, sector, sortKey, sortDir]);

  function toggleSort(k: SortKey) {
    if (k === sortKey) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(k);
      const asc = k === "symbol" || k === "companyName" || k === "sector";
      setSortDir(asc ? "asc" : "desc");
    }
  }

  const arrow = (k: SortKey) => (sortKey === k ? (sortDir === "asc" ? "▲" : "▼") : "");

  const enrichedCount = enriched.size;

  return (
    <Card className="text-start">
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>
          {t.source} · {loading ? t.loadingBase : t.shown(filtered.length, rows.length)}
          {!loading && rows.length > 0 && (
            <>
              {" · "}
              {enriching ? t.enriching : t.enrichedOf(enrichedCount, Math.min(enrichCount, rows.length))}
            </>
          )}
          {cacheAgeMs != null && (
            <>
              {" · "}
              {cacheAgeMs === 0 ? t.cacheFresh : t.cacheAge(fmtAge(cacheAgeMs))}
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1 w-full sm:w-56">
            <label className="text-xs text-muted-foreground">{t.search}</label>
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.searchPh}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">{t.sector}</label>
            <select
              value={sector}
              onChange={e => setSector(e.target.value)}
              className="h-9 rounded-md border bg-background px-3 text-sm"
            >
              <option value="">{t.allSectors}</option>
              {sectors.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">{t.minDividend}</label>
            <Input
              type="number"
              step="0.1"
              value={minDividend}
              onChange={e => setMinDividend(Number(e.target.value))}
              className="w-28"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">{t.fetchCount}</label>
            <Input
              type="number"
              step="50"
              min={10}
              max={1000}
              value={limit}
              onChange={e => setLimit(Number(e.target.value))}
              className="w-24"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">{t.enrichTopN}</label>
            <Input
              type="number"
              step="10"
              min={0}
              max={200}
              value={enrichCount}
              onChange={e => setEnrichCount(Number(e.target.value))}
              className="w-24"
            />
          </div>
          <label className="flex w-full sm:w-auto items-center gap-2 text-sm cursor-pointer select-none mb-[2px]">
            <input
              type="checkbox"
              checked={includeFunds}
              onChange={e => setIncludeFunds(e.target.checked)}
              className="size-4 rounded border"
            />
            {t.showFunds}
          </label>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button onClick={loadBase} disabled={loading} className="flex-1 sm:flex-none">
              {loading ? t.loading : t.refresh}
            </Button>
            <Button variant="outline" onClick={clearCache} disabled={loading} className="flex-1 sm:flex-none">
              {t.clearCache}
            </Button>
          </div>
        </div>

        {error && (
          <div className="rounded-md border border-destructive bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase">
              <tr>
                <Th onClick={() => toggleSort("symbol")}>{t.thSymbol} {arrow("symbol")}</Th>
                <Th onClick={() => toggleSort("companyName")}>{t.thName} {arrow("companyName")}</Th>
                <Th onClick={() => toggleSort("sector")}>{t.thSector} {arrow("sector")}</Th>
                <Th onClick={() => toggleSort("price")} className="text-end">{t.thPrice} {arrow("price")}</Th>
                <Th onClick={() => toggleSort("ytd")} className="text-end">{t.thYtd} {arrow("ytd")}</Th>
                <Th onClick={() => toggleSort("oneYear")} className="text-end">{t.thOneY} {arrow("oneYear")}</Th>
                <Th onClick={() => toggleSort("lastAnnualDividend")} className="text-end">{t.thAnnualDiv} {arrow("lastAnnualDividend")}</Th>
                <Th onClick={() => toggleSort("yield")} className="text-end">{t.thProjYield} {arrow("yield")}</Th>
                <Th onClick={() => toggleSort("yearsPaid")} className="text-end">{t.thYearsPaid} {arrow("yearsPaid")}</Th>
                <Th onClick={() => toggleSort("confidence")}>{t.thConfidence} {arrow("confidence")}</Th>
                <Th onClick={() => toggleSort("totalPaid5y")} className="text-end">{t.thTotal5y} {arrow("totalPaid5y")}</Th>
                <Th onClick={() => toggleSort("marketCap")} className="text-end">{t.thMarketCap} {arrow("marketCap")}</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => {
                const e = enriched.get(r.symbol);
                return (
                  <tr key={`${r.symbol}-${r.exchangeShortName}`} className="border-t hover:bg-muted/30">
                    <td className="px-3 py-2 font-mono font-semibold">{r.symbol}</td>
                    <td className="px-3 py-2">
                      <div>{r.companyName}</div>
                      <div className="text-xs text-muted-foreground">{r.industry}</div>
                    </td>
                    <td className="px-3 py-2">{r.sector ?? "—"}</td>
                    <td className="px-3 py-2 text-end tabular-nums">${fmtNum(r.price)}</td>
                    <td className={`px-3 py-2 text-end tabular-nums ${pctClass(e?.ytd)}`}>
                      {e ? fmtPct(e.ytd) : <Skeleton />}
                    </td>
                    <td className={`px-3 py-2 text-end tabular-nums ${pctClass(e?.oneYear)}`}>
                      {e ? fmtPct(e.oneYear) : <Skeleton />}
                    </td>
                    <td className="px-3 py-2 text-end tabular-nums">${fmtNum(r.lastAnnualDividend, 4)}</td>
                    <td className="px-3 py-2 text-end tabular-nums font-semibold text-emerald-600 dark:text-emerald-400">
                      {fmtNum(yieldPct(r))}%
                    </td>
                    <td className="px-3 py-2 text-end tabular-nums">
                      {!e ? <Skeleton /> : e.yearsCovered === 0 ? "—" : `${e.yearsPaid}/${e.yearsCovered}`}
                    </td>
                    <td className="px-3 py-2">
                      {!e ? <Skeleton /> : e.yearsCovered === 0 ? <span className="text-muted-foreground">—</span> : <ConfidenceBar value={e.confidence} />}
                    </td>
                    <td className="px-3 py-2 text-end tabular-nums text-xs">
                      {!e ? <Skeleton /> : e.totalPaid5y === 0 ? "—" : `$${fmtCap(e.totalPaid5y)}`}
                    </td>
                    <td className="px-3 py-2 text-end tabular-nums">{fmtCap(r.marketCap)}</td>
                  </tr>
                );
              })}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={12} className="px-3 py-8 text-center text-muted-foreground">
                    {t.noResults}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground">{t.footer}</p>
      </CardContent>
    </Card>
  );
}

function Skeleton() {
  return <span className="inline-block h-3 w-10 animate-pulse rounded bg-muted" />;
}

function fmtAge(ms: number): string {
  const min = Math.floor(ms / 60000);
  if (min < 1) return "<1 min";
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} h ${min % 60} min`;
  const d = Math.floor(h / 24);
  return `${d} d ${h % 24} h`;
}

function Th({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <th
      onClick={onClick}
      className={`px-3 py-2 text-start font-medium whitespace-nowrap ${onClick ? "cursor-pointer select-none hover:text-foreground" : ""} ${className}`}
    >
      {children}
    </th>
  );
}

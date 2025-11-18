// src/components/FurnasTable.tsx
import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Range = { start?: Date | null; end?: Date | null };

export interface SimaRecord extends Record<string, unknown> {
  idsima?: number;
  idsimaoffline?: number;
  idestacao?: string | number;
  nome_estacao?: string;
  rotulo?: string;
  nome?: string;
  name?: string;
  datahora?: string;
  [k: string]: unknown;
}

interface Props {
  selectedPointId?: number | string | null;
  selectedPointName?: string | null;
  selectedPoint?: Record<string, unknown> | null;
  range?: Range;
  initialPage?: number;
  initialLimit?: number;
  apiBase?: string; // default para furnas
}

const calcMinWidth = (nCols: number) => Math.max(900, nCols * 140);

const isRecordArray = (v: unknown): v is Record<string, unknown>[] =>
  Array.isArray(v) && (v.length === 0 || typeof v[0] === "object");

/**
 * flattenRecord:
 * - se record.data for um objeto, mescla record.data no topo do objeto
 * - remove a propriedade original `data` para evitar duplicação
 * - mantém todas as outras propriedades (ids, metadados)
 */
function flattenRecord(r: Record<string, unknown>): Record<string, unknown> {
  if (!r || typeof r !== "object") return r;
  const copy: Record<string, unknown> = { ...r };
  const maybeData = copy.data;
  if (maybeData && typeof maybeData === "object" && !Array.isArray(maybeData)) {
    // mescla as chaves de data no topo (sobrescreve se houver conflito)
    const nested = maybeData as Record<string, unknown>;
    delete copy.data;
    return { ...copy, ...nested };
  }
  return copy;
}

function normalizePayload(payload: unknown): { online: Record<string, unknown>[]; offline: Record<string, unknown>[] } {
  const online: Record<string, unknown>[] = [];
  const offline: Record<string, unknown>[] = [];

  if (isRecordArray(payload)) {
    // achatar cada registro quando necessário
    online.push(...(payload as Record<string, unknown>[]).map(flattenRecord));
    return { online, offline };
  }

  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;

    // caso: { data: { registers: [...] } }
    if (obj.data && typeof obj.data === "object") {
      const dataObj = obj.data as Record<string, unknown>;
      if (isRecordArray(dataObj.registers)) {
        online.push(...(dataObj.registers as Record<string, unknown>[]).map(flattenRecord));
        return { online, offline };
      }
    }

    // caso: online/offline arrays explícitos
    if (isRecordArray(obj.online) || isRecordArray(obj.offline)) {
      online.push(...(((obj.online as Record<string, unknown>[]) ?? []).map(flattenRecord)));
      offline.push(...(((obj.offline as Record<string, unknown>[]) ?? []).map(flattenRecord)));
      return { online, offline };
    }

    // caso: dados no próprio data (array)
    if (isRecordArray(obj.data)) {
      online.push(...((obj.data as Record<string, unknown>[]).map(flattenRecord)));
      return { online, offline };
    }

    // caso: campos com nomes antigos (sima, sima_offline)
    if (isRecordArray(obj.sima) || isRecordArray(obj.sima_offline)) {
      online.push(...(((obj.sima as Record<string, unknown>[]) ?? []).map(flattenRecord)));
      offline.push(...(((obj.sima_offline as Record<string, unknown>[]) ?? []).map(flattenRecord)));
      return { online, offline };
    }

    // procura por arrays em campos arbitrários (fallback)
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (isRecordArray(v)) {
        const sample = (v as Record<string, unknown>[])[0];
        if (sample && typeof sample === "object" && "idsimaoffline" in sample) {
          offline.push(...((v as Record<string, unknown>[]).map(flattenRecord)));
        } else {
          online.push(...((v as Record<string, unknown>[]).map(flattenRecord)));
        }
      }
    }
    return { online, offline };
  }

  return { online, offline };
}

function renderValue(v: unknown): string {
  if (v === null || v === undefined) return "-";
  if (typeof v === "object") {
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  }
  return String(v);
}

function extractTotals(payload: unknown): {
  total?: number;
  totalOnline?: number;
  totalOffline?: number;
} {
  if (!payload || typeof payload !== "object") return {};
  const obj: any = payload;

  const pickNumber = (v: unknown) => {
    if (v === undefined || v === null) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  };

  const candidates = [
    obj.total,
    obj.count,
    obj.total_count,
    obj.totalItems,
    obj.totalItemsCount,
    obj.meta?.total,
    obj.pagination?.total,
    obj.data?.total,
    obj.data?.pagination?.total,
    obj.data?.meta?.total,
  ];

  const total = candidates.map(pickNumber).find((v) => v !== undefined);

  const totalOnline = pickNumber(obj.online_total ?? obj.total_online ?? obj.onlineTotal ?? obj.meta?.online_total ?? obj.data?.online_total);
  const totalOffline = pickNumber(obj.offline_total ?? obj.total_offline ?? obj.offlineTotal ?? obj.meta?.offline_total ?? obj.data?.offline_total);

  const fallbackOnline = pickNumber(obj.data?.counts?.online ?? obj.data?.counts?.sima ?? obj.data?.counts?.total_online);
  const fallbackOffline = pickNumber(obj.data?.counts?.offline ?? obj.data?.counts?.sima_offline ?? obj.data?.counts?.total_offline);

  return {
    total: total ?? pickNumber(obj.data?.registers_total) ?? undefined,
    totalOnline: totalOnline ?? fallbackOnline ?? undefined,
    totalOffline: totalOffline ?? fallbackOffline ?? undefined,
  };
}

export default function FurnasTable({
  selectedPointId = null,
  selectedPointName = null,
  selectedPoint = null,
  range,
  initialPage = 1,
  initialLimit = 100,
  apiBase = "http://localhost:3001/furnas",
}: Props) {
  const [displayOnline, setDisplayOnline] = useState<SimaRecord[]>([]);
  const [displayOffline, setDisplayOffline] = useState<SimaRecord[]>([]);

  const [rawOnline, setRawOnline] = useState<SimaRecord[] | null>(null);
  const [rawOffline, setRawOffline] = useState<SimaRecord[] | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [view] = useState<"online" | "offline" | "ambos">("online");
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(initialPage ?? 1);
  const [pageInput, setPageInput] = useState<string>(String(page));
  useEffect(() => setPageInput(String(page)), [page]);

  const [limit] = useState<number>(initialLimit ?? 100);

  const [totalOnline, setTotalOnline] = useState<number | undefined>(undefined);
  const [totalOffline, setTotalOffline] = useState<number | undefined>(undefined);
  const [totalCombined, setTotalCombined] = useState<number | undefined>(undefined);

  const MAX_CLIENT_FETCH = 2000;
  const prevSignatureRef = useRef<string | null>(null);
  const useClientPaginationRef = useRef<boolean>(false);

  const [availableColumns, setAvailableColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<Record<string, boolean>>({});
  const [tempSelectedColumns, setTempSelectedColumns] = useState<Record<string, boolean>>({});
  const [columnsOpen, setColumnsOpen] = useState(false);

  useEffect(() => {
    setPage(1);
    useClientPaginationRef.current = false;
    setRawOnline(null);
    setRawOffline(null);
    prevSignatureRef.current = null;
  }, [selectedPoint, selectedPointId, selectedPointName, range?.start, range?.end]);

  useEffect(() => {
    // monta união de colunas a partir do primeiro registro visível
    const union = new Set<string>();
    if (displayOnline && displayOnline.length > 0) Object.keys(displayOnline[0]).forEach((k) => union.add(k));
    if (displayOffline && displayOffline.length > 0) Object.keys(displayOffline[0]).forEach((k) => union.add(k));
    const cols = Array.from(union);
    // ordenar: campos comuns primeiro (opcional), por enquanto mantém ordem natural
    setAvailableColumns(cols);

    if (Object.keys(selectedColumns).length === 0 && cols.length > 0) {
      const all = Object.fromEntries(cols.map((c) => [c, true]));
      setSelectedColumns(all);
    }
    if (Object.keys(tempSelectedColumns).length === 0 && Object.keys(selectedColumns).length > 0) {
      setTempSelectedColumns({ ...selectedColumns });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayOnline, displayOffline]);

  useEffect(() => {
    if (columnsOpen) {
      if (Object.keys(selectedColumns).length === 0 && availableColumns.length > 0) {
        const all = Object.fromEntries(availableColumns.map((c) => [c, true]));
        setSelectedColumns(all);
        setTempSelectedColumns(all);
      } else {
        setTempSelectedColumns({ ...selectedColumns });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnsOpen]);

  function toggleTempColumn(col: string) {
    setTempSelectedColumns((s) => ({ ...s, [col]: !s[col] }));
  }

  function selectAllTemp() {
    setTempSelectedColumns(Object.fromEntries(availableColumns.map((c) => [c, true])));
  }

  function clearAllTemp() {
    setTempSelectedColumns(Object.fromEntries(availableColumns.map((c) => [c, false])));
  }

  function signatureOf(arr: SimaRecord[] | undefined | null) {
    if (!arr || arr.length === 0) return "";
    return arr
      .slice(0, 5)
      .map((r) =>
        String(
          r.idsima ?? r.idsimaoffline ?? r.idestacao ?? r.rotulo ?? (typeof r === "object" ? JSON.stringify(r).slice(0, 60) : String(r))
        )
      )
      .join("|");
  }

  async function tryFetchJSON(url: string, signal: AbortSignal) {
    const res = await fetch(url, { signal });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${res.statusText} ${txt}`);
    }
    return await res.json();
  }

  
  // derivePathSegment (prioriza id numérico e extrai dígitos de rotulo)
  function derivePathSegment(): { segment?: string; reason?: string } {
    if (selectedPoint) {
      const maybeIdest = selectedPoint["idestacao"] ?? selectedPoint["id"] ?? selectedPoint["_id"] ?? selectedPoint["idsima"];
      if (maybeIdest !== undefined && maybeIdest !== null) {
        if (typeof maybeIdest === "number" || /^\d+$/.test(String(maybeIdest))) {
          return { segment: String(maybeIdest), reason: "prefer_id_from_object" };
        }
      }

      const rotulo = (selectedPoint["rotulo"] ?? selectedPoint["nome_estacao"] ?? selectedPoint["nome"] ?? selectedPoint["name"]) as
        | string
        | undefined;
      if (rotulo && String(rotulo).trim().length > 0) {
        const s = String(rotulo).trim();
        if (/^\d+$/.test(s)) return { segment: s, reason: "rotulo_numeric_string" };
        const m = s.match(/(\d+)\s*$/);
        if (m) return { segment: m[1], reason: "rotulo_extract_trailing_digits" };
        return { segment: s, reason: "rotulo_from_object" };
      }

      const reserva = selectedPoint["reservatorio"] ?? selectedPoint["reservatorio_nome"] ?? selectedPoint["reservatorioName"];
      const instituicao = selectedPoint["instituicao"] ?? selectedPoint["instituicao_nome"] ?? selectedPoint["instituicaoName"];
      if (reserva && instituicao) {
        return { segment: `${instituicao}-${reserva}`, reason: "instituicao_reservatorio_compose" };
      }

      const fallbackId = selectedPoint["idHexadecimal"] ?? selectedPoint["id"] ?? selectedPoint["_id"];
      if (fallbackId !== undefined && fallbackId !== null && String(fallbackId).trim() !== "") {
        return { segment: String(fallbackId), reason: "fallback_id_from_object" };
      }

      return { segment: undefined, reason: "no_identifier_in_object" };
    }

    if (selectedPointName && String(selectedPointName).trim().length > 0) {
      return { segment: String(selectedPointName).trim(), reason: "rotulo_from_name_prop" };
    }

    if (selectedPointId !== null && selectedPointId !== undefined && String(selectedPointId).trim() !== "") {
      return { segment: String(selectedPointId), reason: "id_from_id_prop" };
    }

    return { segment: undefined, reason: "no_identifier" };
  }

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchPageSegment(segment: string) {
      setLoading(true);
      setError(null);

      try {
        const paramsPage = new URLSearchParams();
        if (range?.start) paramsPage.append("start", new Date(range.start).toISOString());
        if (range?.end) paramsPage.append("end", new Date(range.end).toISOString());
        paramsPage.append("page", String(page));
        paramsPage.append("limit", String(limit));

        const baseClean = apiBase.replace(/\/$/, "");
        const urlPage = `${baseClean}/${encodeURIComponent(segment)}?${paramsPage.toString()}`;

        const payload = await tryFetchJSON(urlPage, signal);
        const { online: maybeOnline, offline: maybeOffline } = normalizePayload(payload);

        const sig = signatureOf(maybeOnline as SimaRecord[]);
        const prevSig = prevSignatureRef.current;

        const totals = extractTotals(payload);
        setTotalOnline(totals.totalOnline);
        setTotalOffline(totals.totalOffline);
        setTotalCombined(totals.total ?? (totals.totalOnline && totals.totalOffline ? totals.totalOnline + totals.totalOffline : undefined));

        if (page === 1) prevSignatureRef.current = sig;

        if (page > 1 && prevSig && sig === prevSig) {
          console.warn("[FurnasTable] backend pode estar ignorando page/limit; tentando offset...");

          const offset = (page - 1) * limit;
          const paramsOffset = new URLSearchParams();
          if (range?.start) paramsOffset.append("start", new Date(range.start).toISOString());
          if (range?.end) paramsOffset.append("end", new Date(range.end).toISOString());
          paramsOffset.append("offset", String(offset));
          paramsOffset.append("limit", String(limit));
          const urlOffset = `${baseClean}/${encodeURIComponent(segment)}?${paramsOffset.toString()}`;

          try {
            const payloadOffset = await tryFetchJSON(urlOffset, signal);
            const { online: onlineOffset, offline: offlineOffset } = normalizePayload(payloadOffset);
            const sigOffset = signatureOf(onlineOffset as SimaRecord[]);

            if (sigOffset !== sig) {
              setDisplayOnline(onlineOffset as SimaRecord[]);
              setDisplayOffline(offlineOffset as SimaRecord[]);
              const totalsOffset = extractTotals(payloadOffset);
              setTotalOnline(totalsOffset.totalOnline ?? totals.totalOnline);
              setTotalOffline(totalsOffset.totalOffline ?? totals.totalOffline);
              setTotalCombined(totalsOffset.total ?? totals.total ?? undefined);
              return;
            }
          } catch (err) {
            console.debug("[FurnasTable] tentativa com offset falhou:", err);
          }

          const knownTotal = totals.total ?? totals.totalOnline ?? totals.totalOffline;
          if (knownTotal !== undefined && knownTotal <= MAX_CLIENT_FETCH) {
            console.info(`[FurnasTable] baixando todos os ${knownTotal} registros (<= ${MAX_CLIENT_FETCH}) e aplicando paginação client-side`);

            const paramsFull = new URLSearchParams();
            if (range?.start) paramsFull.append("start", new Date(range.start).toISOString());
            if (range?.end) paramsFull.append("end", new Date(range.end).toISOString());
            const urlFull = `${baseClean}/${encodeURIComponent(segment)}?${paramsFull.toString()}`;

            const payloadFull = await tryFetchJSON(urlFull, signal);
            const { online: fullOnline, offline: fullOffline } = normalizePayload(payloadFull);

            setRawOnline(fullOnline as SimaRecord[]);
            setRawOffline(fullOffline as SimaRecord[]);
            useClientPaginationRef.current = true;

            const off = (page - 1) * limit;
            setDisplayOnline((fullOnline as SimaRecord[]).slice(off, off + limit));
            setDisplayOffline((fullOffline as SimaRecord[]).slice(off, off + limit));
            const totalsFull = extractTotals(payloadFull);
            setTotalOnline(totalsFull.totalOnline ?? totals.totalOnline);
            setTotalOffline(totalsFull.totalOffline ?? totals.totalOffline);
            setTotalCombined(totalsFull.total ?? totals.total ?? undefined);
            return;
          }

          throw new Error(
            "Backend não está paginando corretamente e o total é desconhecido/grande. Ajuste a API para suportar page+limit ou offset+limit, ou retorne o 'total' no payload."
          );
        }

        // caminho normal: servidor retornou a página correta (já flattened)
        setDisplayOnline(maybeOnline as SimaRecord[]);
        setDisplayOffline(maybeOffline as SimaRecord[]);
      } catch (err: unknown) {
        if (typeof err === "object" && err !== null && "name" in err && (err as any).name === "AbortError") {
          console.debug("[FurnasTable] fetch aborted");
        } else {
          console.error("[FurnasTable] fetch error", err);
          setError(err instanceof Error ? err.message : "Erro ao buscar dados Furnas");
          setDisplayOnline([]);
          setDisplayOffline([]);
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }

    if (useClientPaginationRef.current && rawOnline) {
      const off = (page - 1) * limit;
      setDisplayOnline(rawOnline.slice(off, off + limit));
      setDisplayOffline((rawOffline ?? []).slice(off, off + limit));
      setLoading(false);
    } else {
      const { segment } = derivePathSegment();
      if (!segment) {
        setDisplayOnline([]);
        setDisplayOffline([]);
        setTotalOnline(undefined);
        setTotalOffline(undefined);
        setTotalCombined(undefined);
        setLoading(false);
      } else {
        fetchPageSegment(segment);
      }
    }

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPoint, selectedPointName, selectedPointId, range?.start, range?.end, page, limit, apiBase]);

  function exportCSV(which: "online" | "offline") {
    const data = which === "online" ? displayOnline : displayOffline;
    if (!data || data.length === 0) return;
    const keys = availableColumns.filter((k) => selectedColumns[k]);
    if (keys.length === 0) return;
    const rows: string[][] = [keys];
    data.forEach((row) =>
      rows.push(
        keys.map((k) => {
          const v = (row as Record<string, unknown>)[k];
          return v === undefined || v === null ? "" : String(v);
        })
      )
    );
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `furnas_${which}_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function openTableInNewTab(which: "online" | "offline") {
    const data = which === "online" ? displayOnline : displayOffline;
    if (!data || data.length === 0) return;
    const keys = availableColumns.filter((k) => selectedColumns[k]);
    if (keys.length === 0) return;
    let html = `<html><head><meta charset="utf-8"><title>FURNAS ${which}</title>
      <style>body{font-family:system-ui;padding:16px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:6px 8px;white-space:nowrap}th{background:#f3f4f6}</style></head><body>`;
    html += `<h3>FURNAS ${which}</h3><table><thead><tr>${keys.map((k) => `<th>${k}</th>`).join("")}</tr></thead><tbody>`;
    data.forEach((row) => {
      html += "<tr>" + keys.map((k) => `<td>${renderValue((row as Record<string, unknown>)[k])}</td>`).join("") + "</tr>";
    });
    html += "</tbody></table></body></html>";
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
  }

  const renderHeaderCells = (cols: string[]) =>
    cols.map((key) => (
      <TableHead
        key={key}
        style={{
          position: "sticky",
          top: 0,
          background: "#fff",
          zIndex: 3,
          textTransform: "uppercase",
          fontSize: 12,
          letterSpacing: 0.6,
          padding: "8px 10px",
        }}
      >
        {key}
      </TableHead>
    ));

  const rowClass = (idx: number) => `group ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} text-sm`;

  const knownTotalForView = view === "online" ? totalOnline : view === "offline" ? totalOffline : totalCombined;

  const pageItemCount =
    view === "online"
      ? displayOnline.length
      : view === "offline"
        ? displayOffline.length
        : displayOnline.length + displayOffline.length;

  const hasNext =
    knownTotalForView !== undefined ? page * limit < knownTotalForView : pageItemCount === limit;

  const totalPagesForView =
    knownTotalForView !== undefined ? Math.max(1, Math.ceil(knownTotalForView / limit)) : undefined;

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => {
    if (totalPagesForView !== undefined) {
      setPage((p) => Math.min(totalPagesForView, p + 1));
    } else {
      if (hasNext) setPage((p) => p + 1);
    }
  };

  const visibleColumns = availableColumns.filter((c) => selectedColumns[c]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h2 className="text-lg font-bold m-0">FURNAS — Visualização de Dados</h2>

        <div className="flex items-center gap-3">
          <div className="inline-flex border border-gray-300 rounded-lg overflow-hidden"></div>

          <div className="inline-flex gap-2 flex-wrap items-center">
            {(view === "offline" || view === "ambos") && (
              <>
                <button onClick={() => exportCSV("offline")} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Exportar Offline CSV</button>
                <button onClick={() => openTableInNewTab("offline")} className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">Abrir Offline</button>
              </>
            )}

            <div className="relative">
              <button onClick={() => setColumnsOpen((v) => !v)} className="px-3 py-2 border rounded">
                Filtros
              </button>

              {columnsOpen && (
                <div className="absolute right-0 mt-2 w-64 max-h-124 bg-white border rounded shadow-lg z-50 flex flex-col">
                  <div className="p-3 border-b flex justify-between items-center">
                    <strong>Colunas</strong>
                    <div className="flex gap-1">
                      <button onClick={selectAllTemp} className="px-2 py-1 text-xs border rounded">Tudo</button>
                      <button onClick={clearAllTemp} className="px-2 py-1 text-xs border rounded">Limpar</button>
                    </div>
                  </div>

                  <div className="p-3 overflow-auto flex-1">
                    <div className="grid gap-2">
                      {availableColumns.length === 0 && <div className="text-xs text-gray-500">Sem colunas disponíveis</div>}
                      {availableColumns.map((col) => (
                        <label key={col} className="inline-flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={!!tempSelectedColumns[col]}
                            onChange={() => toggleTempColumn(col)}
                          />
                          <span className="truncate">{col}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 border-t flex justify-end gap-2 bg-white">
                    <button
                      onClick={() => {
                        setTempSelectedColumns({ ...selectedColumns });
                        setColumnsOpen(false);
                      }}
                      className="px-3 py-1 border rounded"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        setSelectedColumns({ ...tempSelectedColumns });
                        setColumnsOpen(false);
                      }}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {(view === "online" || view === "ambos") && (
              <>
                <button onClick={() => exportCSV("online")} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Exportar Online CSV</button>
                <button onClick={() => openTableInNewTab("online")} className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">Abrir Online</button>
              </>
            )}
          </div>
        </div>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "calc(100vh - 200px)", border: "1px solid #ddd", borderRadius: 6, paddingBottom: 16 }}>
        {(view === "online" || view === "ambos") && displayOnline.length > 0 && visibleColumns.length > 0 && (
          <div style={{ minWidth: calcMinWidth(visibleColumns.length) }}>
            <Table>
              <TableCaption style={{ textAlign: "left", padding: "6px 10px", color: "#666" }}>Online</TableCaption>
              <TableHeader>
                <TableRow>{renderHeaderCells(visibleColumns)}</TableRow>
              </TableHeader>
              <TableBody>
                {displayOnline.map((row, rIdx) => (
                  <TableRow key={String((row as any).idsima ?? rIdx)} className={rowClass(rIdx)}>
                    {visibleColumns.map((col, idx) => (
                      <TableCell key={idx} style={{ padding: "8px 10px", whiteSpace: "nowrap", borderTop: "1px solid #eee" }}>{renderValue((row as Record<string, unknown>)[col])}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {(view === "offline" || view === "ambos") && displayOffline.length > 0 && visibleColumns.length > 0 && (
          <div style={{ minWidth: calcMinWidth(visibleColumns.length), marginTop: 20 }}>
            <Table>
              <TableCaption style={{ textAlign: "left", padding: "6px 10px", color: "#666" }}>Offline</TableCaption>
              <TableHeader>
                <TableRow>{renderHeaderCells(visibleColumns)}</TableRow>
              </TableHeader>
              <TableBody>
                {displayOffline.map((row, rIdx) => (
                  <TableRow key={String((row as any).idsimaoffline ?? rIdx)} className={rowClass(rIdx)}>
                    {visibleColumns.map((col, idx) => (
                      <TableCell key={idx} style={{ padding: "8px 10px", whiteSpace: "nowrap", borderTop: "1px solid #eee" }}>{renderValue((row as Record<string, unknown>)[col])}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {((view === "online" && displayOnline.length > 0) || (view === "offline" && displayOffline.length > 0) || (view === "ambos" && (displayOnline.length > 0 || displayOffline.length > 0))) && visibleColumns.length === 0 && (
          <div className="p-4 text-sm text-gray-600">Nenhuma coluna selecionada — selecione colunas em <strong>Coluna</strong>.</div>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div>
          Página {page}
        </div>

        <div className="space-x-2 flex items-center">
          <button disabled={page <= 1} onClick={handlePrev} className="px-3 py-1 border rounded">Anterior</button>

          <button disabled={!hasNext} onClick={handleNext} className="px-3 py-1 border rounded">Próxima</button>

          <div className="inline-flex items-center gap-2">
            <label className="text-sm">Ir p/ página:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={pageInput}
              onChange={(e) => {
                const v = e.target.value;
                const cleaned = v.replace(/[^\d]/g, "");
                setPageInput(cleaned);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const v = Number(pageInput || "0");
                  if (!Number.isFinite(v) || v < 1) {
                    setPageInput(String(page));
                    return;
                  }
                  const maxP = totalPagesForView ?? v;
                  setPage(Math.min(v, maxP));
                }
              }}
              onBlur={() => {
                const v = Number(pageInput || "0");
                if (!Number.isFinite(v) || v < 1) {
                  setPageInput(String(page));
                  return;
                }
                const maxP = totalPagesForView ?? v;
                setPage(Math.min(v, maxP));
              }}
              className="w-20 px-2 py-1 border rounded"
              aria-label="Ir para página"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

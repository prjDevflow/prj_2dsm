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
  apiBase?: string; // default: http://localhost:3001/sima
}
 
const calcMinWidth = (nCols: number) => Math.max(900, nCols * 140);
 
const isRecordArray = (v: unknown): v is Record<string, unknown>[] =>
  Array.isArray(v) && (v.length === 0 || typeof v[0] === "object");
 
function normalizePayload(payload: unknown): { online: Record<string, unknown>[]; offline: Record<string, unknown>[] } {
  const online: Record<string, unknown>[] = [];
  const offline: Record<string, unknown>[] = [];
 
  if (isRecordArray(payload)) {
    online.push(...payload);
    return { online, offline };
  }
 
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
 
    if (obj.data && typeof obj.data === "object") {
      const dataObj = obj.data as Record<string, unknown>;
      if (isRecordArray(dataObj.registers)) {
        online.push(...(dataObj.registers as Record<string, unknown>[]));
        return { online, offline };
      }
    }
 
    if (isRecordArray(obj.online) || isRecordArray(obj.offline)) {
      online.push(...((obj.online as Record<string, unknown>[]) ?? []));
      offline.push(...((obj.offline as Record<string, unknown>[]) ?? []));
      return { online, offline };
    }
 
    if (isRecordArray(obj.data)) {
      online.push(...(obj.data as Record<string, unknown>[]));
      return { online, offline };
    }
 
    if (isRecordArray(obj.sima) || isRecordArray(obj.sima_offline)) {
      online.push(...((obj.sima as Record<string, unknown>[]) ?? []));
      offline.push(...((obj.sima_offline as Record<string, unknown>[]) ?? []));
      return { online, offline };
    }
 
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (isRecordArray(v)) {
        const sample = (v as Record<string, unknown>[])[0];
        if (sample && typeof sample === "object" && "idsimaoffline" in sample) {
          offline.push(...(v as Record<string, unknown>[]));
        } else {
          online.push(...(v as Record<string, unknown>[]));
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
 
export default function SimaTable({
  selectedPointId = null,
  selectedPointName = null,
  selectedPoint = null,
  range,
  initialPage = 1,
  initialLimit = 100,
  apiBase = "http://localhost:3001/sima",
}: Props) {
  // display arrays (what is shown on screen)
  const [displayOnline, setDisplayOnline] = useState<SimaRecord[]>([]);
  const [displayOffline, setDisplayOffline] = useState<SimaRecord[]>([]);
 
  // raw arrays kept only for safe client-side slicing when allowed
  const [rawOnline, setRawOnline] = useState<SimaRecord[] | null>(null);
  const [rawOffline, setRawOffline] = useState<SimaRecord[] | null>(null);
 
  const [loading, setLoading] = useState<boolean>(false);
  const [view] = useState<"online" | "offline" | "ambos">("online");
  const [error, setError] = useState<string | null>(null);
 
  const [page, setPage] = useState<number>(initialPage ?? 1);
  const [pageInput, setPageInput] = useState<string>(String(page));
 
  useEffect(() => {
  setPageInput(String(page));
}, [page]);
 
  const [limit] = useState<number>(initialLimit ?? 100);
 
  const [totalOnline, setTotalOnline] = useState<number | undefined>(undefined);
  const [totalOffline, setTotalOffline] = useState<number | undefined>(undefined);
  const [totalCombined, setTotalCombined] = useState<number | undefined>(undefined);
 
  // safety: only allow client-side full fetch up to this many records
  const MAX_CLIENT_FETCH = 2000;
 
  // used to detect whether server ignored page param (compara assinatura das primeiras linhas)
  const prevSignatureRef = useRef<string | null>(null);
  // flag indicando que estamos em paginação client-side (após fetch completo seguro)
  const useClientPaginationRef = useRef<boolean>(false);
 
  // --- column visibility UI ---
  const [availableColumns, setAvailableColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<Record<string, boolean>>({});
  const [tempSelectedColumns, setTempSelectedColumns] = useState<Record<string, boolean>>({});
  const [columnsOpen, setColumnsOpen] = useState(false);
 
  // reset page and client-pagination when changing point or range
  useEffect(() => {
    setPage(1);
    useClientPaginationRef.current = false;
    setRawOnline(null);
    setRawOffline(null);
    prevSignatureRef.current = null;
  }, [selectedPoint, selectedPointId, selectedPointName, range?.start, range?.end]);
 
  // quando os dados chegam, monta a lista de colunas disponíveis (união online+offline)
  useEffect(() => {
    const union = new Set<string>();
    if (displayOnline && displayOnline.length > 0) {
      Object.keys(displayOnline[0]).forEach((k) => union.add(k));
    }
    if (displayOffline && displayOffline.length > 0) {
      Object.keys(displayOffline[0]).forEach((k) => union.add(k));
    }
    const cols = Array.from(union);
    setAvailableColumns(cols);
 
    // se o usuário ainda não escolheu colunas explicitamente, selecionar todas por padrão
    if (Object.keys(selectedColumns).length === 0 && cols.length > 0) {
      const all = Object.fromEntries(cols.map((c) => [c, true]));
      setSelectedColumns(all);
    }
    // também atualiza tempSelectedColumns quando não houver seleção temporária
    if (Object.keys(tempSelectedColumns).length === 0 && Object.keys(selectedColumns).length > 0) {
      setTempSelectedColumns({ ...selectedColumns });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayOnline, displayOffline]);
 
  // quando o dropdown abre, inicializa a cópia temporária com a seleção atual
  useEffect(() => {
    if (columnsOpen) {
      // se ainda não há selectedColumns (primeira carga), cria padrão
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
 
 
  // gera uma assinatura curta para detectar se os primeiros registros não mudaram
  function signatureOf(arr: SimaRecord[] | undefined | null) {
    if (!arr || arr.length === 0) return "";
    return arr
      .slice(0, 5)
      .map((r) =>
        String(
          r.idsima ??
          r.idsimaoffline ??
          r.idestacao ??
          r.rotulo ??
          (typeof r === "object" ? JSON.stringify(r).slice(0, 60) : String(r))
        )
      )
      .join("|");
  }
 
  // helper fetch com checagem de response.ok
  async function tryFetchJSON(url: string, signal: AbortSignal) {
    const res = await fetch(url, { signal });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${res.statusText} ${txt}`);
    }
    return await res.json();
  }
 
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
 
    function derivePathSegment(): { segment?: string; reason?: string } {
      if (selectedPoint) {
        const rotulo = (selectedPoint["rotulo"] ?? selectedPoint["nome_estacao"] ?? selectedPoint["nome"] ?? selectedPoint["name"]) as
          | string
          | undefined;
        const maybeIdest = selectedPoint["idestacao"] ?? selectedPoint["id"] ?? selectedPoint["_id"];
        const preferIdest = maybeIdest !== undefined && maybeIdest !== null && (typeof maybeIdest === "number" || /^\d+$/.test(String(maybeIdest)));
 
        const reserva = selectedPoint["reservatorio"] ?? selectedPoint["reservatorio_nome"] ?? selectedPoint["reservatorioName"];
        const instituicao = selectedPoint["instituicao"] ?? selectedPoint["instituicao_nome"] ?? selectedPoint["instituicaoName"];
        if (reserva && instituicao) {
          return { segment: `${instituicao}-${reserva}`, reason: "instituicao_reservatorio_compose" };
        }
 
        if (rotulo && String(rotulo).trim().length > 0) {
          return { segment: String(rotulo).trim(), reason: "rotulo_from_object" };
        }
 
        if (preferIdest) {
          return { segment: String(maybeIdest), reason: "idestacao_from_object" };
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
 
    async function fetchPageSegment(segment: string) {
      setLoading(true);
      setError(null);
 
      try {
        // prepare page request
        const paramsPage = new URLSearchParams();
        if (range?.start) paramsPage.append("start", new Date(range.start).toISOString());
        if (range?.end) paramsPage.append("end", new Date(range.end).toISOString());
        paramsPage.append("page", String(page));
        paramsPage.append("limit", String(limit));
 
        const baseClean = apiBase.replace(/\/$/, "");
        const urlPage = `${baseClean}/${encodeURIComponent(segment)}?${paramsPage.toString()}`;
 
        const payload = await tryFetchJSON(urlPage, signal);
        const { online: maybeOnline, offline: maybeOffline } = normalizePayload(payload);
 
        // assinatura atual
        const sig = signatureOf(maybeOnline as SimaRecord[]);
        const prevSig = prevSignatureRef.current;
 
        // armazenar totais se presentes
        const totals = extractTotals(payload);
        setTotalOnline(totals.totalOnline);
        setTotalOffline(totals.totalOffline);
        setTotalCombined(totals.total ?? (totals.totalOnline && totals.totalOffline ? totals.totalOnline + totals.totalOffline : undefined));
 
        // se é a página 1, grava assinatura para detectar backend que ignora page
        if (page === 1) {
          prevSignatureRef.current = sig;
        }
 
        // se page > 1 e assinatura igual à anterior -> backend pode estar ignorando page/limit
        if (page > 1 && prevSig && sig === prevSig) {
          console.warn("[SimaTable] backend pode estar ignorando page/limit; tentando offset...");
 
          // tenta offset
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
 
            // offset funcionou se assinatura for diferente
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
            console.debug("[SimaTable] tentativa com offset falhou:", err);
          }
 
          // offset também não funcionou -> só baixa tudo se total conhecido e pequeno
          const knownTotal = totals.total ?? totals.totalOnline ?? totals.totalOffline;
          if (knownTotal !== undefined && knownTotal <= MAX_CLIENT_FETCH) {
            console.info(`[SimaTable] baixando todos os ${knownTotal} registros (<= ${MAX_CLIENT_FETCH}) e aplicando paginação client-side`);
 
            // fetch completo (sem page/limit)
            const paramsFull = new URLSearchParams();
            if (range?.start) paramsFull.append("start", new Date(range.start).toISOString());
            if (range?.end) paramsFull.append("end", new Date(range.end).toISOString());
            const urlFull = `${baseClean}/${encodeURIComponent(segment)}?${paramsFull.toString()}`;
 
            const payloadFull = await tryFetchJSON(urlFull, signal);
            const { online: fullOnline, offline: fullOffline } = normalizePayload(payloadFull);
 
            // guarda raw e faz slice
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
 
          // se não sabemos o total ou é grande demais -> abortamos e informamos
          throw new Error(
            "Backend não está paginando corretamente e o total é desconhecido/grande. Ajuste a API para suportar page+limit ou offset+limit, ou retorne o 'total' no payload."
          );
        }
 
        // caminho normal: servidor retornou a página correta
        setDisplayOnline(maybeOnline as SimaRecord[]);
        setDisplayOffline(maybeOffline as SimaRecord[]);
      } catch (err: unknown) {
        if (typeof err === "object" && err !== null && "name" in err && (err as any).name === "AbortError") {
          console.debug("[SimaTable] fetch aborted");
        } else {
          console.error("[SimaTable] fetch error", err);
          setError(err instanceof Error ? err.message : "Erro ao buscar dados SIMA");
          setDisplayOnline([]);
          setDisplayOffline([]);
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    } // end fetchPageSegment
 
    // se já estamos com client-side raw arrays (fetch completo seguro), só slice localmente
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
    // use availableColumns order & visibility
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
    a.download = `sima_${which}_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
 
  function openTableInNewTab(which: "online" | "offline") {
    const data = which === "online" ? displayOnline : displayOffline;
    if (!data || data.length === 0) return;
    const keys = availableColumns.filter((k) => selectedColumns[k]);
    if (keys.length === 0) return;
    let html = `<html><head><meta charset="utf-8"><title>SIMA ${which}</title>
      <style>body{font-family:system-ui;padding:16px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:6px 8px;white-space:nowrap}th{background:#f3f4f6}</style></head><body>`;
    html += `<h3>SIMA ${which}</h3><table><thead><tr>${keys.map((k) => `<th>${k}</th>`).join("")}</tr></thead><tbody>`;
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
 
  // pagination helpers
 
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
 
  const handlePrev = () => {
    setPage((p) => Math.max(1, p - 1));
  };
 
  const handleNext = () => {
    if (totalPagesForView !== undefined) {
      setPage((p) => Math.min(totalPagesForView, p + 1));
    } else {
      if (hasNext) setPage((p) => p + 1);
    }
  };
 
  // which columns are visible (keeps availableColumns order)
  const visibleColumns = availableColumns.filter((c) => selectedColumns[c]);
 
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h2 className="text-lg font-bold m-0">SIMA — Visualização de Dados</h2>
 
        <div className="flex items-center gap-3">
          <div className="inline-flex border border-gray-300 rounded-lg overflow-hidden"></div>
 
          <div className="inline-flex gap-2 flex-wrap items-center">
            {(view === "offline" || view === "ambos") && (
              <>
                <button onClick={() => exportCSV("offline")} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Exportar Offline CSV</button>
                <button onClick={() => openTableInNewTab("offline")} className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">Abrir Offline</button>
              </>
            )}
 
            {/* botão colunas */}
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
 
                  {/* area rolável com checkboxes (usa tempSelectedColumns enquanto aberto) */}
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
 
                  {/* rodapé fixo: Cancelar descarta temp, Aplicar grava temp em selected */}
                  <div className="p-3 border-t flex justify-end gap-2 bg-white">
                    <button
                      onClick={() => {
                        // descarta temporário e fecha
                        setTempSelectedColumns({ ...selectedColumns });
                        setColumnsOpen(false);
                      }}
                      className="px-3 py-1 border rounded"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        // aplica: grava temp em selectedColumns e fecha
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
                  <TableRow key={String(row.idsima ?? rIdx)} className={rowClass(rIdx)}>
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
                  <TableRow key={String(row.idsimaoffline ?? rIdx)} className={rowClass(rIdx)}>
                    {visibleColumns.map((col, idx) => (
                      <TableCell key={idx} style={{ padding: "8px 10px", whiteSpace: "nowrap", borderTop: "1px solid #eee" }}>{renderValue((row as Record<string, unknown>)[col])}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
 
        {/* se não houver colunas visíveis ou dados */}
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
      // permite edição livre (incluindo string vazia)
      const v = e.target.value;
      // remover espaços e permitir apenas dígitos
      const cleaned = v.replace(/[^\d]/g, "");
      setPageInput(cleaned);
    }}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        const v = Number(pageInput || "0");
        if (!Number.isFinite(v) || v < 1) {
          // se inválido, retorna ao page atual
          setPageInput(String(page));
          return;
        }
        const maxP = totalPagesForView ?? v;
        setPage(Math.min(v, maxP));
      }
    }}
    onBlur={() => {
      // ao sair do campo, aplica a página (mesma validação)
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
 
 
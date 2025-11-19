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
 
export interface BalcarRecord extends Record<string, unknown> {
  datahora?: string;
  ch4?: number;
  batimetria?: number;
  tempar?: number;
  tempaguasubsuperficie?: number;
  phsubsuperficie?: number;
  orpsubsuperficie?: number;
  condutividadesubsuperficie?: number;
  odsubsuperficie?: number;
  tsdsubsuperficie?: number;
  sitio_nome?: string;
  instituicao_nome?: string;
  reservatorio_nome?: string;
  total_count?: string | number;
  [k: string]: unknown;
}

// Mapeamento dos nomes das colunas para Balcar
const COLUMN_MAPPING: Record<string, string> = {
  // Datas (primeiros itens como solicitado)
  datahora: "Data e Hora",
  
  // Localização e identificação
  sitio_nome: "Nome do Sítio",
  instituicao_nome: "Nome da Instituição",
  reservatorio_nome: "Nome do Reservatório",
  
  // Parâmetros físicos
  batimetria: "Batimetria",
  tempar: "Temperatura do Ar",
  tempcupula: "Temperatura da Cúpula",
  tempaguasubsuperficie: "Temperatura da Água Subsuperfície",
  tempaguameio: "Temperatura da Água Meio",
  tempaguafundo: "Temperatura da Água Fundo",
  
  // Parâmetros químicos
  phsubsuperficie: "pH Subsuperfície",
  phmeio: "pH Meio",
  phfundo: "pH Fundo",
  orpsubsuperficie: "ORP Subsuperfície",
  orpmeio: "ORP Meio",
  orpfundo: "ORP Fundo",
  condutividadesubsuperficie: "Condutividade Subsuperfície",
  condutividademeio: "Condutividade Meio",
  condutividadefundo: "Condutividade Fundo",
  odsubsuperficie: "Oxigênio Dissolvido Subsuperfície",
  odmeio: "Oxigênio Dissolvido Meio",
  odfundo: "Oxigênio Dissolvido Fundo",
  tsdsubsuperficie: "TSD Subsuperfície",
  tsdmeio: "TSD Meio",
  tsdfundo: "TSD Fundo",
  
  // Gases (elementos químicos mantidos como estão)
  ch4: "CH4",
};

// Ordem prioritária para as colunas (datas primeiro)
const COLUMN_PRIORITY = [
  'datahora',
  'sitio_nome',
  'instituicao_nome', 
  'reservatorio_nome',
  'batimetria'
];
 
interface Props {
  selectedPointId?: number | string | null;
  selectedPointName?: string | null;
  selectedPoint?: Record<string, unknown> | null;
  range?: Range;
  initialPage?: number;
  initialLimit?: number;
  apiBase?: string;
}
 
const calcMinWidth = (nCols: number) => Math.max(900, nCols * 140);
 
const isRecordArray = (v: unknown): v is Record<string, unknown>[] =>
  Array.isArray(v) && (v.length === 0 || typeof v[0] === "object");
 
function flattenRecord(r: Record<string, unknown>): Record<string, unknown> {
  if (!r || typeof r !== "object") return r;
  const copy: Record<string, unknown> = { ...r };
  const maybeData = copy.data;
  if (maybeData && typeof maybeData === "object" && !Array.isArray(maybeData)) {
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
    online.push(...(payload as Record<string, unknown>[]).map(flattenRecord));
    return { online, offline };
  }
 
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
 
    if (obj.data && typeof obj.data === "object") {
      const dataObj = obj.data as Record<string, unknown>;
      if (isRecordArray(dataObj.registers)) {
        online.push(...(dataObj.registers as Record<string, unknown>[]).map(flattenRecord));
        return { online, offline };
      }
      if (isRecordArray(dataObj)) {
        online.push(...(dataObj as Record<string, unknown>[]).map(flattenRecord));
        return { online, offline };
      }
    }
 
    if (isRecordArray(obj.online) || isRecordArray(obj.offline)) {
      online.push(...(((obj.online as Record<string, unknown>[]) ?? []).map(flattenRecord)));
      offline.push(...(((obj.offline as Record<string, unknown>[]) ?? []).map(flattenRecord)));
      return { online, offline };
    }
 
    if (isRecordArray(obj.data)) {
      online.push(...((obj.data as Record<string, unknown>[]).map(flattenRecord)));
      return { online, offline };
    }
 
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
 
function extractColumnsFromData(records: BalcarRecord[]): string[] {
  if (!records || records.length === 0) return [];
 
  const columns = new Set<string>();
  records.forEach(record => {
    Object.keys(record).forEach(key => {
      columns.add(key);
    });
  });
 
  return Array.from(columns);
}

// Função para obter o nome amigável da coluna
const getColumnLabel = (columnKey: string): string => {
  return COLUMN_MAPPING[columnKey] || columnKey;
};

// Função para ordenar colunas com prioridade
const sortColumnsWithPriority = (columns: string[]): string[] => {
  const priorityColumns = COLUMN_PRIORITY.filter(col => columns.includes(col));
  const otherColumns = columns.filter(col => !COLUMN_PRIORITY.includes(col)).sort();
  return [...priorityColumns, ...otherColumns];
};
 
export default function BalcarTable({
  selectedPointId = null,
  selectedPointName = null,
  selectedPoint = null,
  range,
  initialPage = 1,
  initialLimit = 100,
  apiBase = "http://localhost:3001/balcar",
}: Props) {
  const [displayOnline, setDisplayOnline] = useState<BalcarRecord[]>([]);
  const [displayOffline, setDisplayOffline] = useState<BalcarRecord[]>([]);
 
  const [rawOnline, setRawOnline] = useState<BalcarRecord[] | null>(null);
  const [rawOffline, setRawOffline] = useState<BalcarRecord[] | null>(null);
 
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
    const allRecords = [...displayOnline, ...displayOffline];
    if (allRecords.length > 0) {
      const columns = extractColumnsFromData(allRecords);
      // Ordenar colunas com prioridade
      const sortedColumns = sortColumnsWithPriority(columns);
      setAvailableColumns(sortedColumns);
     
      const defaultSelected: Record<string, boolean> = {};
      sortedColumns.forEach(col => {
        defaultSelected[col] = true;
      });
      setSelectedColumns(defaultSelected);
      setTempSelectedColumns(defaultSelected);
    }
  }, [displayOnline, displayOffline]);
 
  // CORREÇÃO: Resetar completamente quando os parâmetros mudarem
  useEffect(() => {
    console.log(`[BalcarTable] Resetando paginação devido a mudanças nos parâmetros`);
    setPage(1);
    useClientPaginationRef.current = false;
    setRawOnline(null);
    setRawOffline(null);
    prevSignatureRef.current = null;
    setDisplayOnline([]);
    setDisplayOffline([]);
    setTotalOnline(undefined);
    setTotalOffline(undefined);
    setTotalCombined(undefined);
  }, [selectedPoint, selectedPointId, selectedPointName, range?.start, range?.end]);
 
  function signatureOf(arr: BalcarRecord[] | undefined | null) {
    if (!arr || arr.length === 0) return "";
    return arr
      .slice(0, 5)
      .map((r) =>
        String(
          (r.idsima ?? r.idsimaoffline ?? r.idestacao ?? r.rotulo ?? r.datahora ?? JSON.stringify(r).slice(0, 60))
        )
      )
      .join("|");
  }
 
  function derivePathSegment(): { segment?: string; reason?: string } {
    if (selectedPoint) {
      const idRes = (selectedPoint["idreservatorio"] ?? selectedPoint["id"] ?? selectedPoint["_id"]) as string | number | undefined;
      if (idRes !== undefined && idRes !== null && String(idRes).trim() !== "") {
        console.log(`[BalcarTable] Usando idreservatorio: ${idRes}`);
        return { segment: String(idRes), reason: "idreservatorio_from_object" };
      }
 
      const nome = (selectedPoint["nome_reservatorio"] ?? selectedPoint["reservatorio_nome"] ?? selectedPoint["nome"] ?? selectedPoint["name"]) as string | undefined;
      if (nome && String(nome).trim().length > 0) {
        console.log(`[BalcarTable] Usando nome: ${nome}`);
        return { segment: String(nome).trim(), reason: "nome_reservatorio_from_object" };
      }
    }
 
    if (selectedPointName && String(selectedPointName).trim().length > 0) {
      console.log(`[BalcarTable] Usando selectedPointName: ${selectedPointName}`);
      return { segment: String(selectedPointName).trim(), reason: "name_prop" };
    }
 
    if (selectedPointId !== null && selectedPointId !== undefined && String(selectedPointId).trim() !== "") {
      console.log(`[BalcarTable] Usando selectedPointId: ${selectedPointId}`);
      return { segment: String(selectedPointId), reason: "id_prop" };
    }
 
    console.log(`[BalcarTable] Nenhum identificador encontrado`);
    return { segment: undefined, reason: "no_identifier" };
  }
 
  async function tryFetchJSON(url: string, signal: AbortSignal) {
    const res = await fetch(url, { signal });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${res.statusText} ${txt}`);
    }
    return await res.json();
  }
 
  // CORREÇÃO PRINCIPAL: Limpar dados antes de cada fetch
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
 
    async function fetchPageSegment(segment: string) {
      setLoading(true);
      setError(null);
     
      // CORREÇÃO: Limpar dados antes de buscar novos
      setDisplayOnline([]);
      setDisplayOffline([]);
 
      try {
        const paramsPage = new URLSearchParams();
        if (range?.start) paramsPage.append("start", new Date(range.start).toISOString());
        if (range?.end) paramsPage.append("end", new Date(range.end).toISOString());
        paramsPage.append("page", String(page));
        paramsPage.append("limit", String(limit));
 
        const baseClean = apiBase.replace(/\/$/, "");
        const urlPage = `${baseClean}/${encodeURIComponent(segment)}?${paramsPage.toString()}`;
 
        console.log(`[BalcarTable] Fetching: ${urlPage}`);
        console.log(`[BalcarTable] Page: ${page}, Limit: ${limit}`);
 
        const payload = await tryFetchJSON(urlPage, signal);
       
        console.log(`[BalcarTable] Payload received:`, payload);
       
        const { online: maybeOnline, offline: maybeOffline } = normalizePayload(payload);
 
        console.log(`[BalcarTable] Online records: ${maybeOnline.length}, Offline records: ${maybeOffline.length}`);
 
        const sig = signatureOf(maybeOnline as BalcarRecord[]);
        const prevSig = prevSignatureRef.current;
 
        const totals = extractTotals(payload);
        setTotalOnline(totals.totalOnline);
        setTotalOffline(totals.totalOffline);
        setTotalCombined(totals.total ?? (totals.totalOnline && totals.totalOffline ? totals.totalOnline + totals.totalOffline : undefined));
 
        if (page === 1) prevSignatureRef.current = sig;
 
        if (page > 1 && prevSig && sig === prevSig) {
          console.warn("[BalcarTable] backend pode estar ignorando page/limit; tentando offset...");
 
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
            const sigOffset = signatureOf(onlineOffset as BalcarRecord[]);
 
            if (sigOffset !== sig) {
              setDisplayOnline(onlineOffset as BalcarRecord[]);
              setDisplayOffline(offlineOffset as BalcarRecord[]);
              const totalsOffset = extractTotals(payloadOffset);
              setTotalOnline(totalsOffset.totalOnline ?? totals.totalOnline);
              setTotalOffline(totalsOffset.totalOffline ?? totals.totalOffline);
              setTotalCombined(totalsOffset.total ?? totals.total ?? undefined);
              return;
            }
          } catch (err) {
            console.debug("[BalcarTable] tentativa com offset falhou:", err);
          }
 
          const knownTotal = totals.total ?? totals.totalOnline ?? totals.totalOffline;
          if (knownTotal !== undefined && knownTotal <= MAX_CLIENT_FETCH) {
            console.info(`[BalcarTable] baixando todos os ${knownTotal} registros (<= ${MAX_CLIENT_FETCH}) e aplicando paginação client-side`);
 
            const paramsFull = new URLSearchParams();
            if (range?.start) paramsFull.append("start", new Date(range.start).toISOString());
            if (range?.end) paramsFull.append("end", new Date(range.end).toISOString());
            const urlFull = `${baseClean}/${encodeURIComponent(segment)}?${paramsFull.toString()}`;
 
            const payloadFull = await tryFetchJSON(urlFull, signal);
            const { online: fullOnline, offline: fullOffline } = normalizePayload(payloadFull);
 
            setRawOnline(fullOnline as BalcarRecord[]);
            setRawOffline(fullOffline as BalcarRecord[]);
            useClientPaginationRef.current = true;
 
            const off = (page - 1) * limit;
            setDisplayOnline((fullOnline as BalcarRecord[]).slice(off, off + limit));
            setDisplayOffline((fullOffline as BalcarRecord[]).slice(off, off + limit));
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
 
        // CORREÇÃO: Garantir que apenas os dados da página atual sejam exibidos
        setDisplayOnline(maybeOnline as BalcarRecord[]);
        setDisplayOffline(maybeOffline as BalcarRecord[]);
      } catch (err: unknown) {
        if (typeof err === "object" && err !== null && "name" in err && (err as any).name === "AbortError") {
          console.debug("[BalcarTable] fetch aborted");
        } else {
          console.error("[BalcarTable] fetch error", err);
          setError(err instanceof Error ? err.message : "Erro ao buscar dados Balcar");
          setDisplayOnline([]);
          setDisplayOffline([]);
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }
 
    if (useClientPaginationRef.current && rawOnline) {
      const off = (page - 1) * limit;
      // CORREÇÃO: Limpar antes de aplicar a paginação client-side também
      setDisplayOnline([]);
      setDisplayOffline([]);
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
  }, [selectedPoint, selectedPointName, selectedPointId, range?.start, range?.end, page, limit, apiBase]);
 
  // CORREÇÃO: Funções de paginação melhoradas
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
 
  const handleNext = () => {
    if (hasNext) {
      setPage(page + 1);
    }
  };
 
  const selectAllTemp = () => {
    const allSelected: Record<string, boolean> = {};
    availableColumns.forEach(col => {
      allSelected[col] = true;
    });
    setTempSelectedColumns(allSelected);
  };
 
  const clearAllTemp = () => {
    setTempSelectedColumns({});
  };
 
  const toggleTempColumn = (col: string) => {
    setTempSelectedColumns(prev => ({
      ...prev,
      [col]: !prev[col],
    }));
  };

  function exportCSV(which: "online" | "offline" = "online") {
    const data = which === "online" ? displayOnline : displayOffline;
    if (!data || data.length === 0) return;
    const keys = availableColumns.filter((k) => selectedColumns[k]);
    if (keys.length === 0) return;
    const headers = keys.map(k => getColumnLabel(k));
    const rowsOut: string[][] = [headers];
    data.forEach((row) =>
      rowsOut.push(keys.map((k) => {
        const v = (row as Record<string, unknown>)[k];
        return v === undefined || v === null ? "" : String(v);
      }))
    );
    const csv = rowsOut.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `balcar_${which}_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
 
  function openTableInNewTab(which: "online" | "offline") {
    const data = which === "online" ? displayOnline : displayOffline;
    if (!data || data.length === 0) return;
    const keys = availableColumns.filter((k) => selectedColumns[k]);
    if (keys.length === 0) return;
    const headers = keys.map(k => getColumnLabel(k));
    let html = `<html><head><meta charset="utf-8"><title>Balcar ${which}</title>
      <style>body{font-family:system-ui;padding:16px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:6px 8px;white-space:nowrap}th{background:#f3f4f6}</style></head><body>`;
    html += `<h3>Balcar ${which}</h3><table><thead><tr>${headers.map((k) => `<th>${k}</th>`).join("")}</tr></thead><tbody>`;
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
        {getColumnLabel(key)}
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
 
  // CORREÇÃO: Lógica melhorada para verificar se há próxima página
  const hasNext = useRef(false);
  hasNext.current = knownTotalForView !== undefined
    ? page * limit < knownTotalForView
    : pageItemCount >= limit;
 
  const totalPagesForView =
    knownTotalForView !== undefined ? Math.max(1, Math.ceil(knownTotalForView / limit)) : undefined;
 
  const visibleColumns = availableColumns.filter((c) => selectedColumns[c]);
 
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h2 className="text-lg font-bold m-0">BALCAR — Visualização de Dados</h2>
 
        <div className="flex items-center gap-3">
          <div className="inline-flex gap-2 flex-wrap items-center">
            <div className="relative">
              <button onClick={() => setColumnsOpen((v) => !v)} className="px-3 py-2 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">
                Filtros
              </button>
 
              {columnsOpen && (
                <div className="absolute right-0 mt-2 w-64 max-h-124 bg-white border rounded shadow-lg z-50 flex flex-col p-3">
                  <div className="p-1 border-b flex justify-between items-center">
                    <strong>Colunas</strong>
                    <div className="flex gap-1">
                      <button onClick={selectAllTemp} className="px-2 py-1 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Tudo</button>
                      <button onClick={clearAllTemp} className="px-2 py-1 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Limpar</button>
                    </div>
                  </div>
 
                  <div className="p-2 overflow-auto flex-1">
                    <div className="grid gap-2">
                      {availableColumns.length === 0 && <div className="text-xs text-gray-500">Sem colunas disponíveis</div>}
                      {availableColumns.map((col) => (
                        <label key={col} className="inline-flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={!!tempSelectedColumns[col]}
                            onChange={() => toggleTempColumn(col)}
                          />
                          <span className="truncate" title={getColumnLabel(col)}>{getColumnLabel(col)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
 
                  <div className="p-2 border-t flex justify-end gap-2 bg-white">
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
 
            <button onClick={() => exportCSV("online")} className="px-3 py-2 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Exportar CSV</button>
            <button onClick={() => openTableInNewTab("online")} className="px-3 py-2 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Abrir Online</button>
          </div>
        </div>
      </div>
 
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-600">{error}</p>}
 
      <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "calc(100vh - 200px)", border: "1px solid #ddd", borderRadius: 6, paddingBottom: 16 }}>
        {(view === "online" || view === "ambos") && displayOnline.length > 0 && visibleColumns.length > 0 && (
          <div style={{ minWidth: calcMinWidth(visibleColumns.length) }}>
            <Table>
              <TableCaption style={{ textAlign: "left", padding: "6px 10px", color: "#666" }}>
                Online
                {knownTotalForView && ` de ${knownTotalForView} totais`}
              </TableCaption>
              <TableHeader>
                <TableRow>{renderHeaderCells(visibleColumns)}</TableRow>
              </TableHeader>
              <TableBody>
                {displayOnline.map((row, rIdx) => (
                  <TableRow key={`online-${page}-${rIdx}-${String(row.datahora)}`} className={rowClass(rIdx)}>
                    {visibleColumns.map((col, idx) => (
                      <TableCell key={idx} style={{ padding: "8px 10px", whiteSpace: "nowrap", borderTop: "1px solid #eee" }}>
                        {col === "datahora" && row[col]
                          ? new Date(String(row[col])).toLocaleString('pt-BR')
                          : renderValue(row[col])
                        }
                      </TableCell>
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
              <TableCaption style={{ textAlign: "left", padding: "6px 10px", color: "#666" }}>
                Offline - Mostrando {displayOffline.length} registros
                {totalOffline && ` de ${totalOffline} totais`}
              </TableCaption>
              <TableHeader>
                <TableRow>{renderHeaderCells(visibleColumns)}</TableRow>
              </TableHeader>
              <TableBody>
                {displayOffline.map((row, rIdx) => (
                  <TableRow key={`offline-${page}-${rIdx}-${String(row.datahora)}`} className={rowClass(rIdx)}>
                    {visibleColumns.map((col, idx) => (
                      <TableCell key={idx} style={{ padding: "8px 10px", whiteSpace: "nowrap", borderTop: "1px solid #eee" }}>
                        {col === "datahora" && row[col]
                          ? new Date(String(row[col])).toLocaleString('pt-BR')
                          : renderValue(row[col])
                        }
                      </TableCell>
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
 
        {!loading && displayOnline.length === 0 && displayOffline.length === 0 && (
          <div className="p-4 text-sm text-gray-600">Nenhum registro encontrado para o ponto selecionado.</div>
        )}
      </div>
 
      {/* CORREÇÃO: Controles de paginação melhorados */}
      <div className="mt-2 flex items-center justify-between">
        <div>
          Página {page}
          {totalPagesForView && ` de ${totalPagesForView}`}
          {knownTotalForView && ` (Total: ${knownTotalForView} registros)`}
        </div>
 
        <div className="space-x-2 flex items-center">
          <button
            disabled={page <= 1}
            onClick={handlePrev}
            className="px-3 py-2 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer"
          >
            Anterior
          </button>
 
          <button
            disabled={!hasNext.current}
            onClick={handleNext}
            className="px-3 py-2 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer"
          >
            Próxima
          </button>
 
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
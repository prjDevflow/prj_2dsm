import { useEffect, useRef, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Props, SimaRecord } from "../lib/types";
import { normalizePayload, extractTotals, calcMinWidth } from "../lib/utils";
import { translateFieldName } from "../lib/fieldMappings";

// Função para formatar data e hora
function formatDateTime(value: unknown): { data: string; hora: string } {
  if (value === null || value === undefined) {
    return { data: "-", hora: "-" };
  }

  try {
    const date = new Date(String(value));
    
    if (isNaN(date.getTime())) {
      return { data: "-", hora: "-" };
    }

    // Formatar data como DD/MM/AAAA
    const data = date.toLocaleDateString('pt-BR');
    
    // Formatar hora como HH:MM:SS
    const hora = date.toLocaleTimeString('pt-BR');
    
    return { data, hora };
  } catch {
    return { data: "-", hora: "-" };
  }
}

// Função para renderizar valores (incluindo formatação especial para datahora)
function renderValue(v: unknown, column: string): string {
  if (v === null || v === undefined) return "-";
  
  // Formatação especial para a coluna datahora
  if (column === "datahora") {
    const { data, hora } = formatDateTime(v);
    return `${data} ${hora}`;
  }
  
  if (typeof v === "object") {
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  }
  return String(v);
}

export default function SimaTable({
  selectedPointId = null,
  selectedPointName = null,
  selectedPoint = null,
  initialPage = 1,
  initialLimit = 100,
  apiBase = "http://localhost:3001/sima",
}: Props) {
  // Estados principais
  const [displayOnline, setDisplayOnline] = useState<SimaRecord[]>([]);
  const [displayOffline, setDisplayOffline] = useState<SimaRecord[]>([]);
  const [, setRawOnline] = useState<SimaRecord[] | null>(null);
  const [, setRawOffline] = useState<SimaRecord[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [view] = useState<"online" | "offline" | "ambos">("online");
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage ?? 1);
  const [pageInput, setPageInput] = useState<string>(String(page));
  const [limit] = useState<number>(initialLimit ?? 100);
  const [, setTotalOnline] = useState<number | undefined>(undefined);
  const [, setTotalOffline] = useState<number | undefined>(undefined);
  const [, setTotalCombined] = useState<number | undefined>(undefined);

  // Filtros
  const [availableColumns, setAvailableColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<Record<string, boolean>>({});
  const [tempSelectedColumns, setTempSelectedColumns] = useState<Record<string, boolean>>({});
  const [columnsOpen, setColumnsOpen] = useState(false);

  // Filtro de data (anos e meses)
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [tempSelectedYears, setTempSelectedYears] = useState<number[]>([]);
  const [availableMonths, setAvailableMonths] = useState<number[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  const [tempSelectedMonths, setTempSelectedMonths] = useState<number[]>([]);
  const [yearsOpen, setYearsOpen] = useState(false);
  const [allData, setAllData] = useState<SimaRecord[]>([]);

  const useClientPaginationRef = useRef<boolean>(false);

  // Reset quando muda o ponto selecionado
  useEffect(() => {
    setPage(1);
    setAvailableYears([]);
    setSelectedYears([]);
    setTempSelectedYears([]);
    setAvailableMonths([]);
    setSelectedMonths([]);
    setTempSelectedMonths([]);
    setAllData([]);
    setDisplayOnline([]);
    setDisplayOffline([]);
  }, [selectedPoint, selectedPointId, selectedPointName]);

  // Extrai anos e meses disponíveis dos dados
  useEffect(() => {
    if (allData.length > 0) {
      const yearsSet = new Set<number>();
      const monthsSet = new Set<number>();
      
      allData.forEach(record => {
        if (record.datahora) {
          try {
            const date = new Date(String(record.datahora));
            if (!isNaN(date.getTime())) {
              yearsSet.add(date.getFullYear());
              monthsSet.add(date.getMonth() + 1); // Janeiro = 1, Dezembro = 12
            }
          } catch (error) {
            console.warn('Invalid date format:', record.datahora);
          }
        }
      });
      
      const years = Array.from(yearsSet).sort((a, b) => b - a);
      const months = Array.from(monthsSet).sort((a, b) => a - b);
      
      setAvailableYears(years);
      setAvailableMonths(months);
      setSelectedYears(years);
      setSelectedMonths(months);
      setTempSelectedYears(years);
      setTempSelectedMonths(months);
    }
  }, [allData]);

  // Filtra dados baseado nos anos e meses selecionados
  const filteredData = useMemo(() => {
    if (selectedYears.length === 0 && selectedMonths.length === 0) return allData;
    
    return allData.filter(record => {
      if (!record.datahora) return false;
      
      try {
        const date = new Date(String(record.datahora));
        const recordYear = date.getFullYear();
        const recordMonth = date.getMonth() + 1;
        
        const yearMatch = selectedYears.length === 0 || selectedYears.includes(recordYear);
        const monthMatch = selectedMonths.length === 0 || selectedMonths.includes(recordMonth);
        
        return yearMatch && monthMatch;
      } catch {
        return false;
      }
    });
  }, [allData, selectedYears, selectedMonths]);

  // Aplica paginação aos dados filtrados
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, page, limit]);

  // Atualiza dados de exibição quando muda a paginação
  useEffect(() => {
    if (view === "online" || view === "ambos") {
      setDisplayOnline(paginatedData);
    }
    if (view === "offline" || view === "ambos") {
      setDisplayOffline(paginatedData);
    }
  }, [paginatedData, view]);

  // Atualiza totais quando dados filtrados mudam
  useEffect(() => {
    setTotalOnline(filteredData.length);
    setTotalOffline(0);
    setTotalCombined(filteredData.length);
  }, [filteredData]);

  // Atualiza página quando muda o input
  useEffect(() => {
    setPageInput(String(page));
  }, [page]);

  // Configura colunas disponíveis
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

    if (Object.keys(selectedColumns).length === 0 && cols.length > 0) {
      const all = Object.fromEntries(cols.map((c) => [c, true]));
      setSelectedColumns(all);
    }
    if (Object.keys(tempSelectedColumns).length === 0 && Object.keys(selectedColumns).length > 0) {
      setTempSelectedColumns({ ...selectedColumns });
    }
  }, [displayOnline, displayOffline, selectedColumns, tempSelectedColumns]);

  // Inicializa seleção temporária de colunas
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
  }, [columnsOpen, selectedColumns, availableColumns]);

  // Inicializa seleção temporária de anos e meses
  useEffect(() => {
    if (yearsOpen) {
      setTempSelectedYears([...selectedYears]);
      setTempSelectedMonths([...selectedMonths]);
    }
  }, [yearsOpen, selectedYears, selectedMonths]);

  // Funções de filtro de colunas
  function toggleTempColumn(col: string) {
    setTempSelectedColumns((s) => ({ ...s, [col]: !s[col] }));
  }

  function selectAllTemp() {
    setTempSelectedColumns(Object.fromEntries(availableColumns.map((c) => [c, true])));
  }

  function clearAllTemp() {
    setTempSelectedColumns(Object.fromEntries(availableColumns.map((c) => [c, false])));
  }

  // Funções de filtro de anos
  function toggleYear(year: number) {
    setTempSelectedYears(prev => 
      prev.includes(year) 
        ? prev.filter(y => y !== year)
        : [...prev, year]
    );
  }

  function selectAllYears() {
    setTempSelectedYears([...availableYears]);
  }

  function clearAllYears() {
    setTempSelectedYears([]);
  }

  // Funções de filtro de meses
  function toggleMonth(month: number) {
    setTempSelectedMonths(prev => 
      prev.includes(month) 
        ? prev.filter(m => m !== month)
        : [...prev, month]
    );
  }

  function selectAllMonths() {
    setTempSelectedMonths([...availableMonths]);
  }

  function clearAllMonths() {
    setTempSelectedMonths([]);
  }

  // Aplicar filtro de data
  function applyDateFilter() {
    setSelectedYears([...tempSelectedYears]);
    setSelectedMonths([...tempSelectedMonths]);
    setPage(1);
    setYearsOpen(false);
  }

  // Helper para fetch
  async function tryFetchJSON(url: string, signal: AbortSignal) {
    const res = await fetch(url, { signal });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${res.statusText} ${txt}`);
    }
    return await res.json();
  }

  // Busca todos os dados
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    function derivePathSegment(): { segment?: string; reason?: string } {
      if (selectedPoint) {
        const rotulo = (selectedPoint["rotulo"] ?? selectedPoint["nome_estacao"] ?? selectedPoint["nome"] ?? selectedPoint["name"]) as string | undefined;
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

    async function fetchAllData(segment: string) {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        const baseClean = apiBase.replace(/\/$/, "");
        const url = `${baseClean}/${encodeURIComponent(segment)}?${params.toString()}`;

        const payload = await tryFetchJSON(url, signal);
        const { online: maybeOnline, offline: maybeOffline } = normalizePayload(payload);

        const allData = [
          ...(maybeOnline as SimaRecord[]),
          ...(maybeOffline as SimaRecord[])
        ];

        setAllData(allData);
        
        setRawOnline(maybeOnline as SimaRecord[]);
        setRawOffline(maybeOffline as SimaRecord[]);
        useClientPaginationRef.current = true;

        const initialData = allData.slice(0, limit);
        setDisplayOnline(initialData);
        setDisplayOffline([]);

        const totals = extractTotals(payload);
        setTotalOnline(totals.totalOnline ?? allData.length);
        setTotalOffline(totals.totalOffline ?? 0);
        setTotalCombined(totals.total ?? allData.length);

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
    }

    const { segment } = derivePathSegment();
    if (!segment) {
      setDisplayOnline([]);
      setDisplayOffline([]);
      setTotalOnline(undefined);
      setTotalOffline(undefined);
      setTotalCombined(undefined);
      setLoading(false);
      setAllData([]);
    } else {
      fetchAllData(segment);
    }

    return () => controller.abort();
  }, [selectedPoint, selectedPointName, selectedPointId, apiBase, limit]);

  // Exportação CSV
  function exportCSV(which: "online" | "offline") {
    const data = which === "online" ? filteredData : [];
    if (!data || data.length === 0) return;
    const keys = availableColumns.filter((k) => selectedColumns[k]);
    if (keys.length === 0) return;
    
    const translatedHeaders = keys.map(k => translateFieldName(k));
    const rows: string[][] = [translatedHeaders];
    
    data.forEach((row) =>
      rows.push(
        keys.map((k) => {
          const v = (row as Record<string, unknown>)[k];
          if (k === "datahora") {
            const { data, hora } = formatDateTime(v);
            return `${data} ${hora}`;
          }
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

  // Abrir em nova aba
  function openTableInNewTab(which: "online" | "offline") {
    const data = which === "online" ? filteredData : [];
    if (!data || data.length === 0) return;
    const keys = availableColumns.filter((k) => selectedColumns[k]);
    if (keys.length === 0) return;
    
    const translatedHeaders = keys.map(k => translateFieldName(k));
    
    let html = `<html><head><meta charset="utf-8"><title>SIMA ${which}</title>
      <style>body{font-family:system-ui;padding:16px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:6px 8px;white-space:nowrap}th{background:#f3f4f6}</style></head><body>`;
    html += `<h3>SIMA ${which}</h3><table><thead><tr>${translatedHeaders.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>`;
    data.forEach((row) => {
      html += "<tr>" + keys.map((k) => {
        const v = (row as Record<string, unknown>)[k];
        let displayValue = "-";
        if (v !== null && v !== undefined) {
          if (k === "datahora") {
            const { data, hora } = formatDateTime(v);
            displayValue = `${data} ${hora}`;
          } else {
            displayValue = String(v);
          }
        }
        return `<td>${displayValue}</td>`;
      }).join("") + "</tr>";
    });
    html += "</tbody></table></body></html>";
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
  }

  const renderHeaderCells = (cols: string[]) =>
    cols.map((key) => {
      const translatedLabel = translateFieldName(key);
      return (
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
          {translatedLabel}
        </TableHead>
      );
    });

  const rowClass = (idx: number) => `group ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} text-sm`;

  // Helpers de paginação
  const hasNext = page * limit < filteredData.length;
  const totalPagesForView = Math.max(1, Math.ceil(filteredData.length / limit));

  const handlePrev = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleNext = () => {
    if (hasNext) setPage((p) => p + 1);
  };

  // Colunas visíveis
  const visibleColumns = availableColumns.filter((c) => selectedColumns[c]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h2 className="text-lg font-bold m-0">SIMA — Visualização de Dados</h2>

        <div className="flex items-center gap-3">
          <div className="inline-flex gap-2 flex-wrap items-center">
            {/* Filtro de data */}
            <div className="relative">
              <button 
                onClick={() => setYearsOpen((v) => !v)} 
                className="px-3 py-2 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer"
                disabled={availableYears.length === 0}
              >
                Filtrar Data
              </button>

              {yearsOpen && availableYears.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 max-h-124 bg-white border rounded shadow-lg z-50 flex flex-col">
                  <div className="p-3 border-b flex justify-between items-center">
                    <strong>Filtrar por Data</strong>
                    <div className="flex gap-1">
                      <button onClick={selectAllYears} className="px-2 py-1 text-xs border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Todos Anos</button>
                      <button onClick={clearAllYears} className="px-2 py-1 text-xs border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Limpar Anos</button>
                    </div>
                  </div>

                  {/* Seção de Anos */}
                  <div className="p-3 border-b">
                    <div className="mb-2 font-medium text-sm">Anos</div>
                    <div className="grid grid-cols-3 gap-2 max-h-32 overflow-auto">
                      {availableYears.map((year) => (
                        <label key={year} className="inline-flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={tempSelectedYears.includes(year)}
                            onChange={() => toggleYear(year)}
                          />
                          <span className="truncate">{year}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Seção de Meses */}
                  <div className="p-3 border-b">
                    <div className="mb-2 font-medium text-sm">Meses</div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { num: 1, name: 'Jan' }, { num: 2, name: 'Fev' }, { num: 3, name: 'Mar' },
                        { num: 4, name: 'Abr' }, { num: 5, name: 'Mai' }, { num: 6, name: 'Jun' },
                        { num: 7, name: 'Jul' }, { num: 8, name: 'Ago' }, { num: 9, name: 'Set' },
                        { num: 10, name: 'Out' }, { num: 11, name: 'Nov' }, { num: 12, name: 'Dez' }
                      ].map((month) => (
                        <label key={month.num} className="inline-flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={tempSelectedMonths.includes(month.num)}
                            onChange={() => toggleMonth(month.num)}
                            disabled={!availableMonths.includes(month.num)}
                          />
                          <span className={`truncate ${!availableMonths.includes(month.num) ? 'text-gray-400' : ''}`}>
                            {month.name}
                          </span>
                        </label>
                      ))}
                    </div>
                    <div className="flex gap-1 mt-2">
                      <button onClick={selectAllMonths} className="px-2 py-1 text-xs border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Todos Meses</button>
                      <button onClick={clearAllMonths} className="px-2 py-1 text-xs border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Limpar Meses</button>
                    </div>
                  </div>

                  <div className="p-3 border-t flex justify-end gap-2 bg-white">
                    <button
                      onClick={() => setYearsOpen(false)}
                      className="px-3 py-1 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={applyDateFilter}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-transform duration-200 hover:scale-105 cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Filtro de colunas */}
            <div className="relative">
              <button onClick={() => setColumnsOpen((v) => !v)} className="px-3 py-2 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">
                Filtros
              </button>

              {columnsOpen && (
                <div className="absolute right-0 mt-2 w-64 max-h-124 bg-white border rounded shadow-lg z-50 flex flex-col">
                  <div className="p-3 border-b flex justify-between items-center">
                    <strong>Colunas</strong>
                    <div className="flex gap-1">
                      <button onClick={selectAllTemp} className="px-2 py-1 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Tudo</button>
                      <button onClick={clearAllTemp} className="px-2 py-1 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Limpar</button>
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
                          <span className="truncate">{translateFieldName(col)}</span>
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
                      className="px-2 py-1 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        setSelectedColumns({ ...tempSelectedColumns });
                        setColumnsOpen(false);
                      }}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-transform duration-200 hover:scale-105 cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Botões de exportação */}
            {(view === "online" || view === "ambos") && (
              <>
                <button onClick={() => exportCSV("online")} className="px-3 py-2 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Exportar CSV</button>
                <button onClick={() => openTableInNewTab("online")} className="px-3 py-2 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Abrir em Nova Aba</button>
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
                      <TableCell key={idx} style={{ padding: "8px 10px", whiteSpace: "nowrap", borderTop: "1px solid #eee" }}>
                        {renderValue((row as Record<string, unknown>)[col], col)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {displayOnline.length > 0 && visibleColumns.length === 0 && (
          <div className="p-4 text-sm text-gray-600">Nenhuma coluna selecionada — selecione colunas em <strong>Colunas</strong>.</div>
        )}

        {filteredData.length === 0 && !loading && (
          <div className="p-4 text-sm text-gray-600 text-center">
            Nenhum dado encontrado para os filtros selecionados.
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div>
          Página {page}
        </div>

        <div className="space-x-2 flex items-center">
          <button disabled={page <= 1} onClick={handlePrev} className="px-3 py-1 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Anterior</button>
          <button disabled={!hasNext} onClick={handleNext} className="px-3 py-1 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Próxima</button>

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
                  setPage(Math.min(v, totalPagesForView));
                }
              }}
              onBlur={() => {
                const v = Number(pageInput || "0");
                if (!Number.isFinite(v) || v < 1) {
                  setPageInput(String(page));
                  return;
                }
                setPage(Math.min(v, totalPagesForView));
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
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

// Safety: only allow client-side full fetch up to this many records

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
  // display arrays (what is shown on screen)
  const [displayOnline, setDisplayOnline] = useState<SimaRecord[]>([]);
  const [displayOffline, setDisplayOffline] = useState<SimaRecord[]>([]);

  // raw arrays kept only for safe client-side slicing when allowed
  const [, setRawOnline] = useState<SimaRecord[] | null>(null);
  const [, setRawOffline] = useState<SimaRecord[] | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [view] = useState<"online" | "offline" | "ambos">("online");
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(initialPage ?? 1);
  const [pageInput, setPageInput] = useState<string>(String(page));

  useEffect(() => {
    setPageInput(String(page));
  }, [page]);

  const [limit] = useState<number>(initialLimit ?? 100);

  const [, setTotalOnline] = useState<number | undefined>(undefined);
  const [, setTotalOffline] = useState<number | undefined>(undefined);
  const [, setTotalCombined] = useState<number | undefined>(undefined);

  // used to detect whether server ignored page param (compara assinatura das primeiras linhas)
  const prevSignatureRef = useRef<string | null>(null);
  // flag indicando que estamos em paginação client-side (após fetch completo seguro)
  const useClientPaginationRef = useRef<boolean>(false);

  // --- column visibility UI ---
  const [availableColumns, setAvailableColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<Record<string, boolean>>({});
  const [tempSelectedColumns, setTempSelectedColumns] = useState<Record<string, boolean>>({});
  const [columnsOpen, setColumnsOpen] = useState(false);

  // --- year filter UI ---
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [yearsOpen, setYearsOpen] = useState(false);
  const [allData, setAllData] = useState<SimaRecord[]>([]);

  // reset page and client-pagination when changing point or range
  useEffect(() => {
    setPage(1);
    useClientPaginationRef.current = false;
    setRawOnline(null);
    setRawOffline(null);
    prevSignatureRef.current = null;
    setAvailableYears([]);
    setSelectedYears([]);
    setAllData([]);
  }, [selectedPoint, selectedPointId, selectedPointName]);

  // Extract available years from all data
  useEffect(() => {
    if (allData.length > 0) {
      const yearsSet = new Set<number>();
      allData.forEach(record => {
        if (record.datahora) {
          try {
            const date = new Date(String(record.datahora));
            if (!isNaN(date.getTime())) {
              yearsSet.add(date.getFullYear());
            }
          } catch (error) {
            console.warn('Invalid date format:', record.datahora);
          }
        }
      });
      
      const years = Array.from(yearsSet).sort((a, b) => b - a); // Most recent years first
      setAvailableYears(years);
      setSelectedYears(years); // Select all years by default
    }
  }, [allData]);

  // Filter data based on selected years
  const filteredData = useMemo(() => {
    if (selectedYears.length === 0) return allData;
    
    return allData.filter(record => {
      if (!record.datahora) return false;
      
      try {
        const recordYear = new Date(String(record.datahora)).getFullYear();
        return selectedYears.includes(recordYear);
      } catch {
        return false;
      }
    });
  }, [allData, selectedYears]);

  // Apply pagination to filtered data
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, page, limit]);

  // Update display data when paginated data changes
  useEffect(() => {
    if (view === "online" || view === "ambos") {
      setDisplayOnline(paginatedData);
    }
    if (view === "offline" || view === "ambos") {
      setDisplayOffline(paginatedData);
    }
  }, [paginatedData, view]);

  // Update totals when filtered data changes
  useEffect(() => {
    setTotalOnline(filteredData.length);
    setTotalOffline(0);
    setTotalCombined(filteredData.length);
  }, [filteredData]);

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

  // Year filter functions
  function toggleYear(year: number) {
    setSelectedYears(prev => 
      prev.includes(year) 
        ? prev.filter(y => y !== year)
        : [...prev, year]
    );
    setPage(1); // Reset to first page when filter changes
  }

  function selectAllYears() {
    setSelectedYears([...availableYears]);
    setPage(1);
  }

  function clearAllYears() {
    setSelectedYears([]);
    setPage(1);
  }

  // gera uma assinatura curta para detectar se os primeiros registros não mudaram

  // helper fetch com checagem de response.ok
  async function tryFetchJSON(url: string, signal: AbortSignal) {
    const res = await fetch(url, { signal });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${res.statusText} ${txt}`);
    }
    return await res.json();
  }

  // Fetch all data for the selected point
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

    async function fetchAllData(segment: string) {
      setLoading(true);
      setError(null);

      try {
        // Fetch all data without pagination
        const params = new URLSearchParams();
        const baseClean = apiBase.replace(/\/$/, "");
        const url = `${baseClean}/${encodeURIComponent(segment)}?${params.toString()}`;

        const payload = await tryFetchJSON(url, signal);
        const { online: maybeOnline, offline: maybeOffline } = normalizePayload(payload);

        // Combine online and offline data
        const allData = [
          ...(maybeOnline as SimaRecord[]),
          ...(maybeOffline as SimaRecord[])
        ];

        setAllData(allData);
        
        // Store raw data for client-side pagination
        setRawOnline(maybeOnline as SimaRecord[]);
        setRawOffline(maybeOffline as SimaRecord[]);
        useClientPaginationRef.current = true;

        // Set initial display data
        const initialData = allData.slice(0, limit);
        setDisplayOnline(initialData);
        setDisplayOffline([]);

        // Extract totals
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPoint, selectedPointName, selectedPointId, apiBase]);

  function exportCSV(which: "online" | "offline") {
    const data = which === "online" ? filteredData : [];
    if (!data || data.length === 0) return;
    const keys = availableColumns.filter((k) => selectedColumns[k]);
    if (keys.length === 0) return;
    
    // Usar cabeçalhos traduzidos
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

  function openTableInNewTab(which: "online" | "offline") {
    const data = which === "online" ? filteredData : [];
    if (!data || data.length === 0) return;
    const keys = availableColumns.filter((k) => selectedColumns[k]);
    if (keys.length === 0) return;
    
    // Usar cabeçalhos traduzidos
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

  // pagination helpers

  const hasNext = page * limit < filteredData.length;

  const totalPagesForView = Math.max(1, Math.ceil(filteredData.length / limit));

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
            {/* Filtro de anos */}
            <div className="relative">
              <button 
                onClick={() => setYearsOpen((v) => !v)} 
                className="px-3 py-2 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer"
                disabled={availableYears.length === 0}
              >
                Filtrar Data
                {selectedYears.length > 0 && selectedYears.length !== availableYears.length && (
                  <span className="ml-2 bg-white text-purple-600 rounded-full px-2 py-1 text-xs">
                    {selectedYears.length}
                  </span>
                )}
              </button>

              {yearsOpen && availableYears.length > 0 && (
                <div className="absolute right-0 mt-2 w-64 max-h-124 bg-white border rounded shadow-lg z-50 flex flex-col">
                  <div className="p-1 border-b flex justify-between items-center">
                    <strong>Filtrar por Ano</strong>
                    <div className="flex gap-1">
                      <button onClick={selectAllYears} className="px-2 py-1 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Todos</button>
                      <button onClick={clearAllYears} className="px-2 py-1 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Limpar</button>
                    </div>
                  </div>

                  <div className="p-3 overflow-auto flex-1">
                    <div className="grid gap-2">
                      {availableYears.map((year) => (
                        <label key={year} className="inline-flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={selectedYears.includes(year)}
                            onChange={() => toggleYear(year)}
                          />
                          <span className="truncate">{year}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 border-t flex justify-end gap-2 bg-white">
                    <button
                      onClick={() => {
                        setYearsOpen(false);
                      }}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-transform duration-200 hover:scale-105 cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* botão colunas */}
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
                          <span className="truncate">{translateFieldName(col)}</span>
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
                      className="px-2 py-1 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        // aplica: grava temp em selectedColumns e fecha
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

        {/* se não houver colunas visíveis ou dados */}
        {((view === "online" && displayOnline.length > 0) || (view === "offline" && displayOffline.length > 0) || (view === "ambos" && (displayOnline.length > 0 || displayOffline.length > 0))) && visibleColumns.length === 0 && (
          <div className="p-4 text-sm text-gray-600">Nenhuma coluna selecionada — selecione colunas em <strong>Coluna</strong>.</div>
        )}

        {filteredData.length === 0 && !loading && (
          <div className="p-4 text-sm text-gray-600 text-center">
            Nenhum dado encontrado para os filtros selecionados.
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div>
          Página {page} de {totalPagesForView}
        </div>

        <div className="space-x-2 flex items-center">
          <button disabled={page <= 1} onClick={handlePrev} className="px-3 py-2 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Anterior</button>

          <button disabled={!hasNext} onClick={handleNext} className="px-3 py-2 border rounded hover:bg-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer">Próxima</button>

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
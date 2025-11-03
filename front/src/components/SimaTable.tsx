// src/components/SimaTable.tsx
import { useEffect, useState } from "react";
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

export default function SimaTable({
  selectedPointId = null,
  selectedPointName = null,
  selectedPoint = null,
  range,
  initialPage = 1,
  initialLimit = 100,
  apiBase = "http://localhost:3001/sima",
}: Props) {
  const [online, setOnline] = useState<SimaRecord[]>([]);
  const [offline, setOffline] = useState<SimaRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [view, setView] = useState<"online" | "offline" | "ambos">("online");
  const [error, setError] = useState<string | null>(null);

  // controla paginação localmente
  const [page, setPage] = useState<number>(initialPage ?? 1);
  const [limit] = useState<number>(initialLimit ?? 100);

  // reseta página pra 1 sempre que muda o ponto ou o intervalo
  useEffect(() => {
    setPage(1);
  }, [selectedPoint, selectedPointId, selectedPointName, range?.start, range?.end]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    // Extrai o segment (rotulo ou id) seguindo nova regra simples e determinística
    function derivePathSegment(): { segment?: string; reason?: string } {
      // 1) se veio o objeto selectedPoint, tentar rotulo primeiro
      if (selectedPoint) {
        // campos comuns que seu Map/Back pode ter
        const rotulo = (selectedPoint["rotulo"] ?? selectedPoint["nome_estacao"] ?? selectedPoint["nome"] ?? selectedPoint["name"]) as string | undefined;
        const maybeIdest = selectedPoint["idestacao"] ?? selectedPoint["id"] ?? selectedPoint["_id"];
        const preferIdest = maybeIdest !== undefined && maybeIdest !== null && (typeof maybeIdest === "number" || /^\d+$/.test(String(maybeIdest)));

        // caso seu Map use reservatorio + instituicao (como no Map.key), tente compor
        const reserva = selectedPoint["reservatorio"] ?? selectedPoint["reservatorio_nome"] ?? selectedPoint["reservatorioName"];
        const instituicao = selectedPoint["instituicao"] ?? selectedPoint["instituicao_nome"] ?? selectedPoint["instituicaoName"];
        if (reserva && instituicao) {
          // manter formato determinístico: instituicao-reservatorio
          return { segment: `${instituicao}-${reserva}`, reason: "instituicao_reservatorio_compose" };
        }

        if (rotulo && String(rotulo).trim().length > 0) {
          return { segment: String(rotulo).trim(), reason: "rotulo_from_object" };
        }

        if (preferIdest) {
          return { segment: String(maybeIdest), reason: "idestacao_from_object" };
        }

        // fallback to other id-like fields if present
        const fallbackId = selectedPoint["idHexadecimal"] ?? selectedPoint["id"] ?? selectedPoint["_id"];
        if (fallbackId !== undefined && fallbackId !== null && String(fallbackId).trim() !== "") {
          return { segment: String(fallbackId), reason: "fallback_id_from_object" };
        }

        // nada derivável
        return { segment: undefined, reason: "no_identifier_in_object" };
      }

      // 2) if no object: use selectedPointName (rotulo)
      if (selectedPointName && String(selectedPointName).trim().length > 0) {
        return { segment: String(selectedPointName).trim(), reason: "rotulo_from_name_prop" };
      }

      // 3) fallback to selectedPointId
      if (selectedPointId !== null && selectedPointId !== undefined && String(selectedPointId).trim() !== "") {
        return { segment: String(selectedPointId), reason: "id_from_id_prop" };
      }

      return { segment: undefined, reason: "no_identifier" };
    }

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const { segment, reason } = derivePathSegment();

        // se não conseguimos derivar um segmento, não fazemos requisição (evita /sima sem path)
        if (!segment) {
          console.debug("[SimaTable] sem identificador — não será feita requisição", { reason });
          setOnline([]);
          setOffline([]);
          setLoading(false);
          return;
        }

        const params = new URLSearchParams();
        if (range?.start) params.append("start", new Date(range.start).toISOString());
        if (range?.end) params.append("end", new Date(range.end).toISOString());
        params.append("page", String(page));
        params.append("limit", String(limit));

        const baseClean = apiBase.replace(/\/$/, ""); // remove trailing slash se houver
        const url = `${baseClean}/${encodeURIComponent(segment)}?${params.toString()}`;

        console.debug("[SimaTable] fetching by path", { segment, reason, url });

        const res = await fetch(url, { signal });
        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status} ${res.statusText} ${txt}`);
        }

        const payload: unknown = await res.json();
        console.debug("[SimaTable] payload sample:", payload);

        const { online: maybeOnline, offline: maybeOffline } = normalizePayload(payload);

        setOnline(maybeOnline as SimaRecord[]);
        setOffline(maybeOffline as SimaRecord[]);
      } catch (err: unknown) {
        if (typeof err === "object" && err !== null && "name" in err && (err as Record<string, unknown>).name === "AbortError") {
          console.debug("[SimaTable] fetch aborted");
        } else {
          console.error("[SimaTable] fetch error", err);
          setError(err instanceof Error ? err.message : "Erro ao buscar dados SIMA");
          setOnline([]);
          setOffline([]);
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
    // observar page também: muda com paginação
  }, [selectedPoint, selectedPointName, selectedPointId, range?.start, range?.end, page, limit, apiBase]);

  function exportCSV(which: "online" | "offline") {
    const data = which === "online" ? online : offline;
    if (!data || data.length === 0) return;
    const keys = Object.keys(data[0]) as string[];
    const rows: string[][] = [keys];
    data.forEach((row) =>
      rows.push(keys.map((k) => {
        const v = (row as Record<string, unknown>)[k];
        return v === undefined || v === null ? "" : String(v);
      })),
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
    const data = which === "online" ? online : offline;
    if (!data || data.length === 0) return;
    const keys = Object.keys(data[0]) as string[];
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

  const renderHeaderCells = (obj: Record<string, unknown>) =>
    Object.keys(obj).map((key) => (
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

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h2 className="text-lg font-bold m-0">SIMA — Visualização de Dados</h2>

        <div className="flex items-center gap-3">
          <div className="inline-flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setView("online")}
              className={`px-3 py-2 border-none ${view === "online" ? "bg-slate-900 text-white" : "bg-white text-gray-900"}`}
            >
              Online
            </button>
            <button
              onClick={() => setView("offline")}
              className={`px-3 py-2 border-none ${view === "offline" ? "bg-slate-900 text-white" : "bg-white text-gray-900"}`}
            >
              Offline
            </button>
            <button
              onClick={() => setView("ambos")}
              className={`px-3 py-2 border-none ${view === "ambos" ? "bg-slate-900 text-white" : "bg-white text-gray-900"}`}
            >
              Ambos
            </button>
          </div>

          <div className="inline-flex gap-2 flex-wrap">
            {(view === "online" || view === "ambos") && (
              <>
                <button onClick={() => exportCSV("online")} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Exportar Online CSV
                </button>
                <button onClick={() => openTableInNewTab("online")} className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Abrir Online
                </button>
              </>
            )}
            {(view === "offline" || view === "ambos") && (
              <>
                <button onClick={() => exportCSV("offline")} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Exportar Offline CSV
                </button>
                <button onClick={() => openTableInNewTab("offline")} className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Abrir Offline
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div
        style={{
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)",
          border: "1px solid #ddd",
          borderRadius: 6,
          paddingBottom: 16,
        }}
      >
        {(view === "online" || view === "ambos") && online.length > 0 && (
          <div style={{ minWidth: calcMinWidth(Object.keys(online[0]).length) }}>
            <Table>
              <TableCaption style={{ textAlign: "left", padding: "6px 10px", color: "#666" }}>Online</TableCaption>
              <TableHeader>
                <TableRow>{renderHeaderCells(online[0])}</TableRow>
              </TableHeader>
              <TableBody>
                {online.map((row, rIdx) => (
                  <TableRow key={String(row.idsima ?? rIdx)} className={rowClass(rIdx)}>
                    {Object.values(row).map((value, idx) => (
                      <TableCell key={idx} style={{ padding: "8px 10px", whiteSpace: "nowrap", borderTop: "1px solid #eee" }}>
                        {renderValue(value)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {(view === "offline" || view === "ambos") && offline.length > 0 && (
          <div style={{ minWidth: calcMinWidth(Object.keys(offline[0]).length), marginTop: 20 }}>
            <Table>
              <TableCaption style={{ textAlign: "left", padding: "6px 10px", color: "#666" }}>Offline</TableCaption>
              <TableHeader>
                <TableRow>{renderHeaderCells(offline[0])}</TableRow>
              </TableHeader>
              <TableBody>
                {offline.map((row, rIdx) => (
                  <TableRow key={String(row.idsimaoffline ?? rIdx)} className={rowClass(rIdx)}>
                    {Object.values(row).map((value, idx) => (
                      <TableCell key={idx} style={{ padding: "8px 10px", whiteSpace: "nowrap", borderTop: "1px solid #eee" }}>
                        {renderValue(value)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Paginação simples */}
      <div className="mt-2 flex items-center justify-between">
        <div>
          Página {page} — { (online.length + offline.length) } itens (visíveis)
        </div>
        <div className="space-x-2">
          <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded">
            Anterior
          </button>
          <button disabled={(online.length + offline.length) < limit} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 border rounded">
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}

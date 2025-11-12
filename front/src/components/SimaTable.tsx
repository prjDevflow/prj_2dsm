import { useEffect, useState, useRef } from "react";
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

function normalizePayload(payload: unknown): {
  online: Record<string, unknown>[];
  offline: Record<string, unknown>[];
} {
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

  const totalOnline = pickNumber(
    obj.online_total ??
      obj.total_online ??
      obj.onlineTotal ??
      obj.meta?.online_total ??
      obj.data?.online_total,
  );
  const totalOffline = pickNumber(
    obj.offline_total ??
      obj.total_offline ??
      obj.offlineTotal ??
      obj.meta?.offline_total ??
      obj.data?.offline_total,
  );

  const fallbackOnline = pickNumber(
    obj.data?.counts?.online ?? obj.data?.counts?.sima ?? obj.data?.counts?.total_online,
  );
  const fallbackOffline = pickNumber(
    obj.data?.counts?.offline ?? obj.data?.counts?.sima_offline ?? obj.data?.counts?.total_offline,
  );

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
  const [view, setView] = useState<"online" | "offline" | "ambos">("online");
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(initialPage ?? 1);
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

  // reset page and client-pagination when changing point or range
  useEffect(() => {
    setPage(1);
    useClientPaginationRef.current = false;
    setRawOnline(null);
    setRawOffline(null);
    prevSignatureRef.current = null;
  }, [selectedPoint, selectedPointId, selectedPointName, range?.start, range?.end]);

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
            (typeof r === "object" ? JSON.stringify(r).slice(0, 60) : String(r)),
        ),
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
        const rotulo = (selectedPoint["rotulo"] ??
          selectedPoint["nome_estacao"] ??
          selectedPoint["nome"] ??
          selectedPoint["name"]) as string | undefined;
        const maybeIdest =
          selectedPoint["idestacao"] ?? selectedPoint["id"] ?? selectedPoint["_id"];
        const preferIdest =
          maybeIdest !== undefined &&
          maybeIdest !== null &&
          (typeof maybeIdest === "number" || /^\d+$/.test(String(maybeIdest)));

        const reserva =
          selectedPoint["reservatorio"] ??
          selectedPoint["reservatorio_nome"] ??
          selectedPoint["reservatorioName"];
        const instituicao =
          selectedPoint["instituicao"] ??
          selectedPoint["instituicao_nome"] ??
          selectedPoint["instituicaoName"];
        if (reserva && instituicao) {
          return {
            segment: `${instituicao}-${reserva}`,
            reason: "instituicao_reservatorio_compose",
          };
        }

        if (rotulo && String(rotulo).trim().length > 0) {
          return { segment: String(rotulo).trim(), reason: "rotulo_from_object" };
        }

        if (preferIdest) {
          return { segment: String(maybeIdest), reason: "idestacao_from_object" };
        }

        const fallbackId =
          selectedPoint["idHexadecimal"] ?? selectedPoint["id"] ?? selectedPoint["_id"];
        if (fallbackId !== undefined && fallbackId !== null && String(fallbackId).trim() !== "") {
          return { segment: String(fallbackId), reason: "fallback_id_from_object" };
        }

        return { segment: undefined, reason: "no_identifier_in_object" };
      }

      if (selectedPointName && String(selectedPointName).trim().length > 0) {
        return { segment: String(selectedPointName).trim(), reason: "rotulo_from_name_prop" };
      }

      if (
        selectedPointId !== null &&
        selectedPointId !== undefined &&
        String(selectedPointId).trim() !== ""
      ) {
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
        setTotalCombined(
          totals.total ??
            (totals.totalOnline && totals.totalOffline
              ? totals.totalOnline + totals.totalOffline
              : undefined),
        );

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
            const { online: onlineOffset, offline: offlineOffset } =
              normalizePayload(payloadOffset);
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
            console.info(
              `[SimaTable] baixando todos os ${knownTotal} registros (<= ${MAX_CLIENT_FETCH}) e aplicando paginação client-side`,
            );

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
            "Backend não está paginando corretamente e o total é desconhecido/grande. Ajuste a API para suportar page+limit ou offset+limit, ou retorne o 'total' no payload.",
          );
        }

        // caminho normal: servidor retornou a página correta
        setDisplayOnline(maybeOnline as SimaRecord[]);
        setDisplayOffline(maybeOffline as SimaRecord[]);
      } catch (err: unknown) {
        if (
          typeof err === "object" &&
          err !== null &&
          "name" in err &&
          (err as any).name === "AbortError"
        ) {
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
  }, [
    selectedPoint,
    selectedPointName,
    selectedPointId,
    range?.start,
    range?.end,
    page,
    limit,
    apiBase,
  ]);

  function exportCSV(which: "online" | "offline") {
    const data = which === "online" ? displayOnline : displayOffline;
    if (!data || data.length === 0) return;
    const keys = Object.keys(data[0]) as string[];
    const rows: string[][] = [keys];
    data.forEach((row) =>
      rows.push(
        keys.map((k) => {
          const v = (row as Record<string, unknown>)[k];
          return v === undefined || v === null ? "" : String(v);
        }),
      ),
    );
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
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
    const keys = Object.keys(data[0]) as string[];
    let html = `<html><head><meta charset="utf-8"><title>SIMA ${which}</title>
      <style>body{font-family:system-ui;padding:16px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:6px 8px;white-space:nowrap}th{background:#f3f4f6}</style></head><body>`;
    html += `<h3>SIMA ${which}</h3><table><thead><tr>${keys.map((k) => `<th>${k}</th>`).join("")}</tr></thead><tbody>`;
    data.forEach((row) => {
      html +=
        "<tr>" +
        keys.map((k) => `<td>${renderValue((row as Record<string, unknown>)[k])}</td>`).join("") +
        "</tr>";
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

  // pagination helpers
  const currentCount =
    view === "online"
      ? displayOnline.length
      : view === "offline"
        ? displayOffline.length
        : displayOnline.length + displayOffline.length;

  const knownTotalForView =
    view === "online" ? totalOnline : view === "offline" ? totalOffline : totalCombined;

  // número de itens efetivamente retornados para a *página atual*
  const pageItemCount =
    view === "online"
      ? displayOnline.length
      : view === "offline"
        ? displayOffline.length
        : displayOnline.length + displayOffline.length;

  // se tivermos total conhecido, usamos ele; caso contrário,
  // assumimos que há próxima página quando a página atual veio completa (== limit)
  const hasNext =
    knownTotalForView !== undefined ? page * limit < knownTotalForView : pageItemCount === limit;

  // total de páginas só quando soubermos o total
  const totalPagesForView =
    knownTotalForView !== undefined ? Math.max(1, Math.ceil(knownTotalForView / limit)) : undefined;

  // Handlers de paginação (usam limites seguros)
  const handlePrev = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleNext = () => {
    // evita ultrapassar total conhecido (se existir)
    if (totalPagesForView !== undefined) {
      setPage((p) => Math.min(totalPagesForView, p + 1));
    } else {
      // sem total conhecido usa heurística hasNext
      if (hasNext) setPage((p) => p + 1);
    }
  };

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
                <button
                  onClick={() => exportCSV("online")}
                  className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Exportar Online CSV
                </button>
                <button
                  onClick={() => openTableInNewTab("online")}
                  className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Abrir Online
                </button>
              </>
            )}
            {(view === "offline" || view === "ambos") && (
              <>
                <button
                  onClick={() => exportCSV("offline")}
                  className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Exportar Offline CSV
                </button>
                <button
                  onClick={() => openTableInNewTab("offline")}
                  className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
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
        {(view === "online" || view === "ambos") && displayOnline.length > 0 && (
          <div style={{ minWidth: calcMinWidth(Object.keys(displayOnline[0]).length) }}>
            <Table>
              <TableCaption style={{ textAlign: "left", padding: "6px 10px", color: "#666" }}>
                Online
              </TableCaption>
              <TableHeader>
                <TableRow>{renderHeaderCells(displayOnline[0])}</TableRow>
              </TableHeader>
              <TableBody>
                {displayOnline.map((row, rIdx) => (
                  <TableRow key={String(row.idsima ?? rIdx)} className={rowClass(rIdx)}>
                    {Object.values(row).map((value, idx) => (
                      <TableCell
                        key={idx}
                        style={{
                          padding: "8px 10px",
                          whiteSpace: "nowrap",
                          borderTop: "1px solid #eee",
                        }}
                      >
                        {renderValue(value)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {(view === "offline" || view === "ambos") && displayOffline.length > 0 && (
          <div
            style={{ minWidth: calcMinWidth(Object.keys(displayOffline[0]).length), marginTop: 20 }}
          >
            <Table>
              <TableCaption style={{ textAlign: "left", padding: "6px 10px", color: "#666" }}>
                Offline
              </TableCaption>
              <TableHeader>
                <TableRow>{renderHeaderCells(displayOffline[0])}</TableRow>
              </TableHeader>
              <TableBody>
                {displayOffline.map((row, rIdx) => (
                  <TableRow key={String(row.idsimaoffline ?? rIdx)} className={rowClass(rIdx)}>
                    {Object.values(row).map((value, idx) => (
                      <TableCell
                        key={idx}
                        style={{
                          padding: "8px 10px",
                          whiteSpace: "nowrap",
                          borderTop: "1px solid #eee",
                        }}
                      >
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

      <div className="mt-2 flex items-center justify-between">
        <div>
          Página {page}
          {totalPagesForView !== undefined ? ` de ${totalPagesForView}` : ""} — {currentCount} itens
          mostrados
          {totalCombined !== undefined && view === "ambos" ? ` — total: ${totalCombined}` : ""}
          {view === "online" && totalOnline !== undefined ? ` — total: ${totalOnline}` : ""}
          {view === "offline" && totalOffline !== undefined ? ` — total: ${totalOffline}` : ""}
          {useClientPaginationRef.current ? " — (paginação client-side)" : ""}
        </div>

        <div className="space-x-2 flex items-center">
          <button disabled={page <= 1} onClick={handlePrev} className="px-3 py-1 border rounded">
            Anterior
          </button>

          <button disabled={!hasNext} onClick={handleNext} className="px-3 py-1 border rounded">
            Próxima
          </button>

          <div className="inline-flex items-center gap-2">
            <label className="text-sm">Ir p/ página:</label>
            <input
              type="number"
              min={1}
              value={page}
              onChange={(e) => {
                const v = Number(e.target.value || 1);
                if (!Number.isFinite(v) || v < 1) return;
                const maxP = totalPagesForView ?? v;
                setPage(Math.min(v, maxP));
              }}
              className="w-20 px-2 py-1 border rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

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

// Tipos
interface Sima {
  idsima: number;
  idestacao: string;
  datahora: string;
  regno: number | null;
  nofsamples: number | null;
  proamag: number | null;
  dirvt: number | null;
  intensvt: number | null;
  u_vel: number | null;
  v_vel: number | null;
  tempag1: number | null;
  tempag2: number | null;
  tempag3: number | null;
  tempag4: number | null;
  tempar: number | null;
  ur: number | null;
  tempar_r: number | null;
  pressatm: number | null;
  radincid: number | null;
  radrefl: number | null;
  bateria: number | null;
  sonda_temp: number | null;
  sonda_cond: number | null;
  sonda_dosat: number | null;
  sonda_do: number | null;
  sonda_ph: number | null;
  sonda_nh4: number | null;
  sonda_no3: number | null;
  sonda_turb: number | null;
  sonda_chl: number | null;
  sonda_bateria: number | null;
  corr_norte: number | null;
  corr_leste: number | null;
  co2_low: number | null;
  co2_high: number | null;
  precipitacao: number | null;
}

interface SimaOffline {
  idsimaoffline: number;
  idestacao: string;
  datahora?: string | null;
  dirvt?: number | null;
  intensvt?: number | null;
  u_vel?: number | null;
  v_vel?: number | null;
  tempag1?: number | null;
  tempag2?: number | null;
  tempag3?: number | null;
  tempag4?: number | null;
  tempar?: number | null;
  ur?: number | null;
  tempar_r?: number | null;
  pressatm?: number | null;
  radincid?: number | null;
  radrefl?: number | null;
  fonteradiometro?: number | null;
  sonda_temp?: number | null;
  sonda_cond?: number | null;
  sonda_do?: number | null;
  sonda_ph?: number | null;
  sonda_nh4?: number | null;
  sonda_no3?: number | null;
  sonda_turb?: number | null;
  sonda_chl?: number | null;
  sonda_bateria?: number | null;
  corr_norte?: number | null;
  corr_leste?: number | null;
  bateriapainel?: number | null;
}

const SimaTable = () => {
  const [simaData, setSimaData] = useState<Sima[]>([]);
  const [simaOfflineData, setSimaOfflineData] = useState<SimaOffline[]>([]);
  const [loading, setLoading] = useState(true);

  // nova opção de visão: online | offline | ambos
  const [view, setView] = useState<"online" | "offline" | "ambos">("ambos");

  useEffect(() => {
    // Dados fictícios enquanto a API não estiver pronta
    const t = setTimeout(() => {
      setSimaData([
        {
          idsima: 1,
          idestacao: "EST001",
          datahora: new Date().toISOString(),
          regno: 10,
          nofsamples: 20,
          proamag: 50,
          dirvt: 30,
          intensvt: 12,
          u_vel: 2,
          v_vel: 3,
          tempag1: 25,
          tempag2: 26,
          tempag3: 27,
          tempag4: 28,
          tempar: 29,
          ur: 70,
          tempar_r: 28,
          pressatm: 1012,
          radincid: 500,
          radrefl: 300,
          bateria: 5,
          sonda_temp: 20,
          sonda_cond: 3,
          sonda_dosat: 6,
          sonda_do: 7,
          sonda_ph: 7,
          sonda_nh4: 0.3,
          sonda_no3: 0.5,
          sonda_turb: 0.2,
          sonda_chl: 1.2,
          sonda_bateria: 3,
          corr_norte: 10,
          corr_leste: 11,
          co2_low: 280,
          co2_high: 400,
          precipitacao: 2,
        },
      ]);

      setSimaOfflineData([
        {
          idsimaoffline: 100,
          idestacao: "EST001",
          datahora: new Date().toISOString(),
          dirvt: 25,
          intensvt: 10,
          u_vel: 1,
          v_vel: 2,
          tempag1: 24,
          tempag2: 25,
          tempag3: 26,
          tempag4: 27,
          tempar: 28,
          ur: 65,
          tempar_r: 27,
          pressatm: 1010,
          radincid: 450,
          radrefl: 280,
          fonteradiometro: 100,
          sonda_temp: 19,
          sonda_cond: 2,
          sonda_do: 6,
          sonda_ph: 7,
          sonda_nh4: 0.2,
          sonda_no3: 0.4,
          sonda_turb: 0.1,
          sonda_chl: 1,
          sonda_bateria: 3,
          corr_norte: 11,
          corr_leste: 12,
          bateriapainel: 4,
        },
      ]);

      setLoading(false);
    }, 700);

    return () => clearTimeout(t);
  }, []);

  /* Helpers para CSV / abrir em nova aba */
  function buildCSV(rows: string[][]) {
    return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  }

  function exportCSV(which: "online" | "offline") {
    const rows: string[][] = [];
    const data = which === "online" ? simaData : simaOfflineData;
    if (!data || data.length === 0) return;
    const keys = Object.keys(data[0]);
    rows.push(keys);
    data.forEach((row) => rows.push(keys.map((k) => String((row as unknown as Record<string, unknown>)[k] ?? ""))));
    const csv = buildCSV(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sima_${which}_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function openTableInNewTab(which: "online" | "offline") {
    const data = which === "online" ? simaData : simaOfflineData;
    if (!data || data.length === 0) return;
    const keys = Object.keys(data[0]);
    let html = `<html><head><meta charset="utf-8"><title>SIMA ${which}</title>
      <style>body{font-family:system-ui;padding:16px}table{border-collapse:collapse}th,td{border:1px solid #ddd;padding:6px 8px;white-space:nowrap}th{background:#f3f4f6}</style></head><body>`;
    html += `<h3>SIMA ${which}</h3><table><thead><tr>${keys.map((k) => `<th>${k}</th>`).join("")}</tr></thead><tbody>`;
    data.forEach((row) => {
      html += "<tr>" + keys.map((k) => `<td>${String((row as unknown as Record<string, unknown>)[k] ?? "-")}</td>`).join("") + "</tr>";
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

  /* toolbar que aparece ACIMA de cada tabela */
  function TableToolbar(props: { which: "online" | "offline"; recordCount: number }) {
    const { which, recordCount } = props;
    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>
          {which === "online" ? "SIMA Online" : "SIMA Offline"} <span style={{ fontWeight: 400, color: "#666", fontSize: 12 }}>— {recordCount} registro(s)</span>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={() => exportCSV(which)}
            className="px-3 py-1 border rounded-md bg-sky-600 text-white text-sm"
            disabled={recordCount === 0}
          >
            Exportar CSV
          </button>

          <button
            onClick={() => openTableInNewTab(which)}
            className="px-3 py-1 border rounded-md bg-white text-sm"
            disabled={recordCount === 0}
          >
            Abrir em nova aba
          </button>
        </div>
      </div>
    );
  }

  /* helper para calcular minWidth baseado nas colunas */
  const calcMinWidth = (nCols: number) => Math.max(900, nCols * 140);

  return (
    <div className="space-y-6">
      {/* GERAL (texto explicativo em cima) */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>SIMA — Visualização de Dados</h2>

        {/* seletor de visão: Online / Offline / Ambos */}
        <div style={{ display: "inline-flex", border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
          <button
            onClick={() => setView("online")}
            style={{
              padding: "8px 12px",
              border: "none",
              background: view === "online" ? "#0f172a" : "#fff",
              color: view === "online" ? "#fff" : "#111827",
            }}
          >
            Online
          </button>
          <button
            onClick={() => setView("offline")}
            style={{
              padding: "8px 12px",
              border: "none",
              background: view === "offline" ? "#0f172a" : "#fff",
              color: view === "offline" ? "#fff" : "#111827",
            }}
          >
            Offline
          </button>
          <button
            onClick={() => setView("ambos")}
            style={{
              padding: "8px 12px",
              border: "none",
              background: view === "ambos" ? "#0f172a" : "#fff",
              color: view === "ambos" ? "#fff" : "#111827",
            }}
          >
            Ambos
          </button>
        </div>
      </div>

      {/* === ONLINE (toolbar acima) === */}
      { (view === "online" || view === "ambos") && (
      <div>
        <TableToolbar which="online" recordCount={simaData.length} />

        {loading ? (
          <p className="text-sm">Carregando...</p>
        ) : simaData.length === 0 ? (
          <p className="text-sm text-red-600">Nenhum dado Online.</p>
        ) : (
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", position: "relative", zIndex: 1 }}>
            <div style={{ minWidth: calcMinWidth(Object.keys(simaData[0]).length) }}>
              <Table>
                <TableCaption style={{ textAlign: "left", padding: "6px 10px", color: "#666" }}>
                  Dados SIMA Online
                </TableCaption>

                <TableHeader>
                  <TableRow>{renderHeaderCells(simaData[0] as unknown as Record<string, unknown>)}</TableRow>
                </TableHeader>

                <TableBody>
                  {simaData.map((row, rIdx) => (
                    <TableRow key={row.idsima} className={rowClass(rIdx)}>
                      {Object.values(row).map((value, idx) => (
                        <TableCell
                          key={idx}
                          style={{
                            padding: "10px 12px",
                            whiteSpace: "nowrap",
                            borderTop: "1px solid rgba(0,0,0,0.04)",
                          }}
                        >
                          {value ?? "-"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
      )}

      {/* === OFFLINE (toolbar acima) === */}
      { (view === "offline" || view === "ambos") && (
      <div>
        <TableToolbar which="offline" recordCount={simaOfflineData.length} />

        {loading ? (
          <p className="text-sm">Carregando...</p>
        ) : simaOfflineData.length === 0 ? (
          <p className="text-sm text-red-600">Nenhum dado Offline.</p>
        ) : (
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", position: "relative", zIndex: 1 }}>
            <div style={{ minWidth: calcMinWidth(Object.keys(simaOfflineData[0]).length) }}>
              <Table>
                <TableCaption style={{ textAlign: "left", padding: "6px 10px", color: "#666" }}>
                  Dados SIMA Offline
                </TableCaption>

                <TableHeader>
                  <TableRow>{renderHeaderCells(simaOfflineData[0] as unknown as Record<string, unknown>)}</TableRow>
                </TableHeader>

                <TableBody>
                  {simaOfflineData.map((row, rIdx) => (
                    <TableRow key={row.idsimaoffline} className={rowClass(rIdx)}>
                      {Object.values(row).map((value, idx) => (
                        <TableCell
                          key={idx}
                          style={{
                            padding: "10px 12px",
                            whiteSpace: "nowrap",
                            borderTop: "1px solid rgba(0,0,0,0.04)",
                          }}
                        >
                          {value ?? "-"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
      )}

    </div>
  );
};

export default SimaTable;

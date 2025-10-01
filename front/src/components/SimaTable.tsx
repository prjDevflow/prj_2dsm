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

// Componente atualizado
const SimaTable = () => {
  const [simaData, setSimaData] = useState<Sima[]>([]);
  const [simaOfflineData, setSimaOfflineData] = useState<SimaOffline[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dados fictícios enquanto a API não estiver pronta
    setTimeout(() => {
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
    }, 2000);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-bold mb-2">SIMA Online</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <Table>
            <TableCaption>SIMA Online</TableCaption>
            <TableHeader>
              <TableRow>
                {Object.keys(simaData[0]).map((key) => (
                  <TableHead key={key}>{key}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {simaData.map((row) => (
                <TableRow key={row.idsima}>
                  {Object.values(row).map((value, idx) => (
                    <TableCell key={idx}>{value ?? "-"}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">SIMA Offline</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <Table>
            <TableCaption>SIMA Offline</TableCaption>
            <TableHeader>
              <TableRow>
                {Object.keys(simaOfflineData[0]).map((key) => (
                  <TableHead key={key}>{key}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {simaOfflineData.map((row) => (
                <TableRow key={row.idsimaoffline}>
                  {Object.values(row).map((value, idx) => (
                    <TableCell key={idx}>{value ?? "-"}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default SimaTable;

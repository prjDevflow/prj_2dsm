import { ISimaRepository } from "../ISimaRepository";
import { Sima } from "../../entities/Sima";

export class MockSimaRepository implements ISimaRepository {
  async getCoordinates(): Promise<
    { id: string; name: string; latitude: number; longitude: number }[]
  > {
    return [{ id: "1", name: "Ponto A", latitude: -3.10719, longitude: -60.0261 }];
  }

  async getAll(params: {
    offset: number;
    limit: number;
    dateInit?: Date;
    dateEnd?: Date;
    stationName?: string;
  }): Promise<{ registers: Sima[]; total: number }> {
    const total = 50; // total de registros mock
    const registers: Sima[] = [];

    for (let i = 0; i < params.limit; i++) {
      const index = params.offset + i + 1;

      registers.push(
        new Sima({
          datahora: new Date(),
          co2_low: Math.random() * 10,
          co2_high: Math.random() * 20,
          tempag1: 25 + Math.random(),
          tempag2: 25 + Math.random(),
          tempag3: 25 + Math.random(),
          tempag4: 25 + Math.random(),
          tempar: 28 + Math.random(),
          tempar_r: 28 + Math.random(),
          sonda_do: Math.random() * 5,
          sonda_dosat: Math.random() * 100,
          sonda_ph: 7 + Math.random() * 0.5,
          sonda_chl: Math.random() * 50,
          sonda_nh4: Math.random(),
          sonda_no3: Math.random(),
          sonda_cond: 100 + Math.random() * 10,
          sonda_turb: Math.random() * 5,
          radincid: Math.random() * 1000,
          radrefl: Math.random() * 500,
          dirvt: Math.random() * 360,
          intensvt: Math.random() * 10,
          u_vel: Math.random() * 2,
          v_vel: Math.random() * 2,
          corr_norte: Math.random(),
          corr_leste: Math.random(),
          precipitacao: Math.random() * 50,
          nome_estacao: params.stationName || `Estação ${index}`,
        }),
      );
    }

    return {
      registers,
      total,
    };
  }
}

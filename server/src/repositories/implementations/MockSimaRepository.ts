import { ISimaRepository } from "../ISimaRepository";
import { Sima } from "../../entities/Sima";
import { coordinatesSima } from "../mock/MockCoordinates";
import { mockDataSima } from "../mock/MockSima";
// import { coordinatesSima } from "../mock/MockCoordinates";

export class MockSimaRepository implements ISimaRepository {
  async getCoordinates(): Promise<
    { id: string; rotulo: string; latitude: number; longitude: number }[]
  > {
    return coordinatesSima;
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

  async getDataById(params: {
    id: string;
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
  }): Promise<{ registers: Sima[]; total: number }> {
    let filtered = mockDataSima.filter((item) => item.id === params.id);

    // aplica filtro por data inicial
    if (params.dateInit) {
      filtered = filtered.filter((item) => item.datahora >= params.dateInit!);
    }

    // aplica filtro por data final
    if (params.dateEnd) {
      const endOfDay = new Date(params.dateEnd);
      endOfDay.setHours(23, 59, 59, 999);
      filtered = filtered.filter((item) => item.datahora <= endOfDay);
    }

    const total = filtered.length;
    const limit = params.limit ?? 10;
    const registers = filtered.slice(params.offset, params.offset + limit);

    return { registers, total };
  }
}

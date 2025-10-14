import { ISimaRepository } from "../ISimaRepository";
import { Sima } from "../../entities/sima/Sima";
import { coordinatesSima } from "../mock/MockCoordinates";
import { mockDataSima } from "../mock/MockSima";

export class MockSimaRepository implements ISimaRepository {
  async getCoordinates(params: {
    reservoir?: string;
    institution?: string;
    dateInit?: Date;
    dateEnd?: Date;
  }): Promise<{ id: string; rotulo: string; latitude: number; longitude: number }[]> {
    let filtered = coordinatesSima;

    // 🔹 Filtro por reservatório
    if (params.reservoir) {
      filtered = filtered.filter((c) =>
        c.reservoir.toLowerCase().includes(params.reservoir!.toLowerCase()),
      );
    }

    // 🔹 Filtro por instituição
    if (params.institution) {
      filtered = filtered.filter((c) =>
        c.institution.toLowerCase().includes(params.institution!.toLowerCase()),
      );
    }

    // 🔹 Filtro por período de tempo
    if (params.dateInit || params.dateEnd) {
      filtered = filtered.filter((c) => {
        const date = new Date(c.date); // garante que seja Date
        const afterInit = params.dateInit ? date >= params.dateInit : true;
        const beforeEnd = params.dateEnd
          ? (() => {
              const endOfDay = new Date(params.dateEnd!);
              endOfDay.setHours(23, 59, 59, 999);
              return date <= endOfDay;
            })()
          : true;
        return afterInit && beforeEnd;
      });
    }

    return filtered;
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
    rotulo?: string;
    type: "sima";
  }): Promise<{ registers: Sima[]; total: number }> {
    let filtered = mockDataSima.filter((item: any) => item.id === params.id);

    // aplica filtro por data inicial
    if (params.dateInit) {
      filtered = filtered.filter((item: any) => item.datahora >= params.dateInit!);
    }

    // aplica filtro por data final
    if (params.dateEnd) {
      const endOfDay = new Date(params.dateEnd);
      endOfDay.setHours(23, 59, 59, 999);
      filtered = filtered.filter((item: any) => item.datahora <= endOfDay);
    }

    const total = filtered.length;
    const limit = params.limit ?? 10;
    const registers = filtered.slice(params.offset, params.offset + limit);

    return { registers, total };
  }
}

import { ISimaRepository } from "../ISimaRepository";
import { Sima } from "../../entities/Sima";
import { coordinatesSima } from "../mock/MockCoordinates";

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
          idsima: index,
          idestacao: 1,
          datahora: new Date(),
          regno: index,
          nofsamples: 5,
          proamag: Math.random() * 10,
          dirvt: Math.random() * 360,
          intensvt: Math.random() * 5,
          u_vel: Math.random(),
          v_vel: Math.random(),
          tempag1: 25 + Math.random() * 5,
          tempag2: 25 + Math.random() * 5,
          tempag3: 25 + Math.random() * 5,
          tempag4: 25 + Math.random() * 5,
          tempar: 25 + Math.random() * 5,
          ur: Math.random() * 100,
          tempar_r: 25 + Math.random() * 5,
          pressatm: 1013,
          radincid: Math.random() * 1000,
          radrefl: Math.random() * 500,
          bateria: 100,
          sonda_temp: 25,
          sonda_cond: 1,
          sonda_DOsat: 90,
          sonda_DO: 8,
          sonda_pH: 7,
          sonda_NH4: 0.5,
          sonda_NO3: 1,
          sonda_turb: 5,
          sonda_chl: 2,
          sonda_bateria: 100,
          corr_norte: Math.random(),
          corr_leste: Math.random(),
          co2_low: 400,
          co2_high: 420,
          precipitacao: Math.random() * 10,
        }),
      );
    }

    return {
      registers,
      total,
    };
  }
}

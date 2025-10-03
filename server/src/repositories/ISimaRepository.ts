import { Sima } from "../entities/sima/Sima";

export interface ISimaRepository {
  getCoordinates(): Promise<{ rotulo: string; latitude: number; longitude: number }[]>;
  getAll(params: {
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
    stationName?: string;
  }): Promise<{ registers: Sima[]; total: number }>;
  getDataById(params: {
    id: string;
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
    rotulo?: string;
    type: "sima";
  }): Promise<{ registers: Sima[]; total: number }>;
}

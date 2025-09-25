import { Sima } from "../entities/Sima";

export interface ISimaRepository {
  getCoordinates(): Promise<{ id: string; name: string; latitude: number; longitude: number }[]>;
  getAll(params: {
    offset: number;
    limit: number;
    dateInit?: Date;
    dateEnd?: Date;
    stationName?: string;
  }): Promise<{ registers: Sima[]; total: number }>;
}

import { Sima } from "../entities/Sima";

export interface IFurnasRepository {
  getCoordinates(): Promise<{ id: string; rotulo: string; latitude: number; longitude: number }[]>;
  getDataById(params: {
    id: string;
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
    type: "furnas";
    // rotulo?: string;
  }): Promise<{ registers: Sima[]; total: number }>; // Alterar classe para Furnas
}

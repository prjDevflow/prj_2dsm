import { Furnas } from "../entities/furnas/Furnas";
import { Sitio } from "../entities/furnas/Sitio";

export interface IFurnasRepository {
  getCoordinates(params: {
    instituicao?: string;
    reservatorio?: string;
  }): Promise<{ id: string; rotulo: string; latitude: number; longitude: number, instituicao: string, reservatorio:string}[]>;

  getDataById(params: {
    id: string;
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;

    type: "furnas" | "sitio";
  }): Promise<{ registers: Furnas[] | Sitio[]; total: number }>;
}

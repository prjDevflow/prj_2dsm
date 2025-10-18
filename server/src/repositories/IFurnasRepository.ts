
import { Sitio } from "../entities/furnas/Sitio";

export interface IFurnasRepository {
  getCoordinates(params: {
    instituicao?: string;
    reservatorio?: string;
  }): Promise<{ id: number; rotulo: string; latitude: number; longitude: number, instituicao: string, reservatorio:string}[]>;

  getDataById(params: {
    id: string;
    offset: number;
    limit?: number;
   
  }): Promise<{ registers: Sitio[]; total: number }>;
}

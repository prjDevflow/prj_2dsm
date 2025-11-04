
import { Sitio } from "../entities/furnas/Sitio";

export interface IFurnasRepository {
  getCoordinates(params: {
    instituicao?: string;
  }): Promise<{ id: number; reservatorio: string; latitude: number; longitude: number, instituicao: string, }[]>;

  getDataById(params: {
    reservatorio: string;
    offset: number;
    limit?: number;
   
  }): Promise<{ registers: Sitio[]; total: number }>;
  getDataByType(params: {
    tipoDado: string;
    rotulo?: string;
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
    instituicao?: string;
    idReservatorio?: string;
  }): Promise<{ registers: any[]; total: number }>;
}
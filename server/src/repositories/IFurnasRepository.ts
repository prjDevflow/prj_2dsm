import { Furnas } from "../entities/furnas/Furnas";
import { Sitio } from "../entities/furnas/Sitio";

export interface IFurnasRepository {
  getCoordinates(params: {
    reservoir?: string;
    institution?: string;
    dateInit?: Date;
    dateEnd?: Date;
  }): Promise<{ id: string; rotulo: string; latitude: number; longitude: number }[]>;
  getDataById(params: {
    id: string;
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
    type: "furnas";
    // rotulo?: string;
  }): Promise<{ registers: Furnas[]; total: number }>; // Alterar classe para Furnas
  getFilters(): Promise<{ institution: string[]; reservoir: string[] }>;
}


import { Furnas } from "../entities/furnas/Furnas";
import { Sitio } from "../entities/furnas/Sitio";

export interface IFurnasRepository {
  getCoordinates(): Promise<{ id: string; rotulo: string; latitude: number; longitude: number }[]>;


 getDataById(params: {
  id: string;
  offset: number;
  limit?: number;
  dateInit?: Date;
  dateEnd?: Date;
  type: "furnas" | "sitio";
}): Promise<{ registers: Furnas[] | Sitio[]; total: number }>;

}


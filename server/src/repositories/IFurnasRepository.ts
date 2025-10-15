import { Furnas } from "../entities/furnas/Furnas";
import { Sitio } from "../entities/furnas/Sitio";

export interface IFurnasRepository {
  getCoordinates(params: {
<<<<<<< HEAD
    instituicao?: string;
    reservatorio?: string;
  }): Promise<{ id: string; rotulo: string; latitude: number; longitude: number, instituicao: string, reservatorio:string}[]>;

=======
    reservoir?: string;
    institution?: string;
    dateInit?: Date;
    dateEnd?: Date;
  }): Promise<{ id: string; rotulo: string; latitude: number; longitude: number }[]>;
>>>>>>> 841bd0bcd7752bb57042b97abc28a13b5359350a
  getDataById(params: {
    id: string;
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
<<<<<<< HEAD

    type: "furnas" | "sitio";
  }): Promise<{ registers: Furnas[] | Sitio[]; total: number }>;
=======
    type: "furnas";
    // rotulo?: string;
  }): Promise<{ registers: Furnas[]; total: number }>; // Alterar classe para Furnas
  getFilters(): Promise<{ institution: string[]; reservoir: string[] }>;
>>>>>>> 841bd0bcd7752bb57042b97abc28a13b5359350a
}

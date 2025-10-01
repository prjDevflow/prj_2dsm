import { IFurnasRepository } from "../IFurnasRepository";
import { coordinatesFurnas } from "../mock/MockCoordinates";
import { mockDataSima } from "../mock/MockSima";

export class MockFurnasRepository implements IFurnasRepository {
  async getCoordinates(): Promise<
    { id: string; rotulo: string; latitude: number; longitude: number }[]
  > {
    return coordinatesFurnas;
  }

  async getDataById(params: {
    id: string;
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
    type: "furnas";
  }): Promise<{ registers: any[]; total: number }> {
    let filtered = mockDataSima.filter((item) => item.id === params.id); // alterar classe para Furnas

    // aplica filtro por data inicial
    if (params.dateInit) {
      filtered = filtered.filter((item) => item.datahora >= params.dateInit!);
    }

    // aplica filtro por data final
    if (params.dateEnd) {
      const endOfDay = new Date(params.dateEnd);
      endOfDay.setHours(23, 59, 59, 999);
      filtered = filtered.filter((item) => item.datahora <= endOfDay);
    }

    const total = filtered.length;
    const limit = params.limit ?? 10;
    const registers = filtered.slice(params.offset, params.offset + limit);

    return { registers, total };
  }
}

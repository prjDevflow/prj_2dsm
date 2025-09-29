import { IFurnasRepository } from "../IFurnasRepository";
import { coordinatesFurnas } from "../mock/MockCoordinates";

export class MockFurnasRepository implements IFurnasRepository {
  async getCoordinates(): Promise<
    { id: string; rotulo: string; latitude: number; longitude: number }[]
  > {
    return coordinatesFurnas;
  }
}

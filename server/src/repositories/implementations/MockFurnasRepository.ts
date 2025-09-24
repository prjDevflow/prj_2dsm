import { IFurnasRepository } from "../IFurnasRepository";

export class MockFurnasRepository implements IFurnasRepository {
  async getCoordinates(): Promise<
    { id: string; name: string; latitude: number; longitude: number }[]
  > {
    const coordinates = [{ id: "2", name: "Ponto B", latitude: -3.1324, longitude: -59.9822 }];
    return coordinates;
  }
}

import { ISimaRepository } from "../ISimaRepository";

export class MockSimaRepository implements ISimaRepository {
  async getCoordinates(): Promise<
    { id: string; name: string; latitude: number; longitude: number }[]
  > {
    const coordinates = [{ id: "1", name: "Ponto A", latitude: -3.10719, longitude: -60.0261 }];
    return coordinates;
  }
}

export interface IFurnasRepository {
  getCoordinates(): Promise<{ id: string; rotulo: string; latitude: number; longitude: number }[]>;
}

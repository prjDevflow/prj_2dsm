export interface IFurnasRepository {
  getCoordinates(): Promise<{ id: string; name: string; latitude: number; longitude: number }[]>;
}
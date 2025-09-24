export interface ISimaRepository {
  getCoordinates(): Promise<{ id: string; name: string; latitude: number; longitude: number }[]>;
}
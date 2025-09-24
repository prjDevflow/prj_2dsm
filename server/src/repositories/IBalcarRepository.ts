export interface IBalcarRepository {
  getCoordinates(): Promise<{ id: string; name: string; latitude: number; longitude: number }[]>;
  getFullData(): Promise<any[]>;
}

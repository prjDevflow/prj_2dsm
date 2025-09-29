export interface IBalcarRepository {
  getCoordinates(): Promise<{ id: string; rotulo: string; latitude: number; longitude: number }[]>;
  // getFullData(): Promise<any[]>;
}

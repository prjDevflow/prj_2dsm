export interface IBalcarRepository {
  getCoordinates(): Promise<{ id: string; rotulo: string; latitude: number; longitude: number }[]>;
  getFullData(): Promise<any[]>;
  getDataById(params: {
    id: string;
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
    type?: "balcar";
  }): Promise<{ registers: any[]; total: number }>;
}

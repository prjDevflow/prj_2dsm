export interface IBalcarRepository {
  getCoordinates(params: {
    reservoir?: string;
    institution?: string;
    dateInit?: Date;
    dateEnd?: Date;
  }): Promise<{ id: string; rotulo: string; latitude: number; longitude: number }[]>;
  getFullData(): Promise<any[]>;
  getDataById(params: {
    id: string;
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
    type?: "balcar";
  }): Promise<{ registers: any[]; total: number }>;
  getFilters(): Promise<{ institution: string[]; reservoir: string[] }>;
}

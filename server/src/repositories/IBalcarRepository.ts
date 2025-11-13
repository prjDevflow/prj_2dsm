export interface IBalcarRepository {
  getCoordinates(params: {
    instituicao: string | undefined
  }): Promise<{ id: string; rotulo: string; latitude: number; longitude: number; instituicao:string}[]>;
 


  getDataById(params: {
    idreservatorio: number | undefined;
    
  }): Promise<{ registers: any[]; total: number }>}

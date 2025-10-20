import { Sima } from "../entities/sima/Sima";

export interface ISimaRepository {
  getCoordinates(): Promise<{ id: string; rotulo: string; latitude: number; longitude: number }[]>;
  getAll(params: {
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
    stationName?: string;
  }): Promise<{ registers: Sima[]; total: number }>;
  getDataById(params: {
    id?: string;
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
    rotulo?: string;
    type: "sima";
  }): Promise<{ registers: Sima[]; total: number }>;

  getDataByCarbono(params: {
    rotulo: string;
    dataInicio?: Date;
    dataFim?: Date;
    offSet?: number;
    limit?: number;
  }): Promise<{ date: Date; carbonoLow: number; carbonoHigh: number; estacao: string }[]>;
  // getDataByTempratura(params: {rotulo:string, dataInicio: Date, dataFim:Date, offSet?:number, limit?:number}):Promise<>
  // getDataByOxigenioDissolvido(params: {rotulo:string, dataInicio: Date, dataFim:Date, offSet?:number, limit?:number}):Promise<>
  // getDataByPh(params: {rotulo:string, dataInicio: Date, dataFim:Date, offSet?:number, limit?:number}):Promise<>
  // getDataByCondutividade(params: {rotulo:string, dataInicio: Date, dataFim:Date, offSet?:number, limit?:number}):Promise<>
  // getDataByClorofila(params: {rotulo:string, dataInicio: Date, dataFim:Date, offSet?:number, limit?:number}):Promise<>
  // getDataByNutrientes(params: {rotulo:string, dataInicio: Date, dataFim:Date, offSet?:number, limit?:number}):Promise<>
  // getDataByTurbidez(params: {rotulo:string, dataInicio: Date, dataFim:Date, offSet?:number, limit?:number}):Promise<>
  // getDataByRadiacao(params: {rotulo:string, dataInicio: Date, dataFim:Date, offSet?:number, limit?:number}):Promise<>
  // getDataByVentoVetor(params: {rotulo:string, dataInicio: Date, dataFim:Date, offSet?:number, limit?:number}):Promise<>
  // getDataByCorrentes(params: {rotulo:string, dataInicio: Date, dataFim:Date, offSet?:number, limit?:number}):Promise<>
  // getDataByPrecipitacao(params: {rotulo:string, dataInicio: Date, dataFim:Date, offSet?:number, limit?:number}):Promise<>
  // getDataByQualidadeAgua(params: {rotulo:string, dataInicio: Date, dataFim:Date, offSet?:number, limit?:number}):Promise<>
}

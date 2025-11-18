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
  // getDataByTemperatura1(params: {
  //   rotulo: string;
  //   dataInicio?: Date;
  //   dataFim?: Date;
  //   offSet?: number;
  //   limit?: number;
  // }): Promise<
  //   {
  //     date: Date;
  //     value: Number;
  //     rotulo: string;
  //   }[]
  // >;
  //  getDataByTemperatura2(params: {
  //   rotulo: string;
  //   dataInicio?: Date;
  //   dataFim?: Date;
  //   offSet?: number;
  //   limit?: number;
  // }): Promise<
  //   {
  //     date: Date;
  //     value: Number;
  //     rotulo: string;
  //   }[]
  // >;
  //  getDataByTemperatura3(params: {
  //   rotulo: string;
  //   dataInicio?: Date;
  //   dataFim?: Date;
  //   offSet?: number;
  //   limit?: number;
  // }): Promise<
  //   {
  //     date: Date;
  //     value: Number;
  //     rotulo: string;
  //   }[]
  // >;
  //  getDataByTemperatura4(params: {
  //   rotulo: string;
  //   dataInicio?: Date;
  //   dataFim?: Date;
  //   offSet?: number;
  //   limit?: number;
  // }): Promise<
  //   {
  //     date: Date;
  //     value: Number;
  //     rotulo: string;
  //   }[]
  // >;
  getDataByOxigenioDissolvido(params: {
    rotulo: string;
    dataInicio?: Date;
    dataFim?: Date;
    offSet?: number;
    limit?: number;
  }): Promise<{ date: Date; sonda_do: number; sonda_dosat: number; nome_estacao: string }[]>;
  getDataByPh(params: {
    rotulo: string;
    dataInicio?: Date;
    dataFim?: Date;
    offSet?: number;
    limit?: number;
  }): Promise<{ date: Date; sonda_ph: number; nome_estacao: string }[]>;
  getDataByCondutividade(params: {
    rotulo: string;
    dataInicio?: Date;
    dataFim?: Date;
    offSet?: number;
    limit?: number;
  }): Promise<{ date: Date; sonda_cond: number; nome_estacao: string }[]>;
  getDataByClorofila(params: {
    rotulo: string;
    dataInicio?: Date;
    dataFim?: Date;
    offSet?: number;
    limit?: number;
  }): Promise<{ date: Date; sonda_chl: number; nome_estacao: string }[]>;
  getDataByNutrientes(params: {
    rotulo: string;
    dataInicio?: Date;
    dataFim?: Date;
    offSet?: number;
    limit?: number;
  }): Promise<{ date: Date; sonda_nh4: number; sonda_no3: number; nome_estacao: string }[]>;
  getDataByTurbidez(params: {
    rotulo: string;
    dataInicio?: Date;
    dataFim?: Date;
    offSet?: number;
    limit?: number;
  }): Promise<{ date: Date; sonda_turb: number; nome_estacao: string }[]>;
  getDataByRadiacao(params: {
    rotulo: string;
    dataInicio?: Date;
    dataFim?: Date;
    offSet?: number;
    limit?: number;
  }): Promise<{ date: Date; radincid: number; radrefl: number; nome_estacao: string }[]>;
  getDataByVentoVetor(params: {
    rotulo: string;
    dataInicio?: Date;
    dataFim?: Date;
    offSet?: number;
    limit?: number;
  }): Promise<
    {
      date: Date;
      dirvt: number;
      intensvt: number;
      u_vel: number;
      v_vel: number;
      nome_estacao: string;
    }[]
  >;
  getDataByCorrentes(params: {
    rotulo: string;
    dataInicio?: Date;
    dataFim?: Date;
    offSet?: number;
    limit?: number;
  }): Promise<{ date: Date; corr_norte: number; corr_leste: number; nome_estacao: string }[]>;
  getDataByPrecipitacao(params: {
    rotulo: string;
    dataInicio?: Date;
    dataFim?: Date;
    offSet?: number;
    limit?: number;
  }): Promise<{ date: Date; precipitacao: number; nome_estacao: string }[]>;
  getDataByQualidadeAgua(params: {
    rotulo: string;
    dataInicio?: Date;
    dataFim?: Date;
    offSet?: number;
    limit?: number;
  }): Promise<
    {
      date: Date;
      tempag1: number;
      tempag2: number;
      tempag3: number;
      tempag4: number;
      sonda_temp: number;
      sonda_cond: number;
      sonda_do: Number;
      sonda_dosat: number;
      sonda_ph: Number;
      sonda_chl: Number;
      sonda_turb: number;
      nome_estacao: string;
    }[]
  >;
   getDataByType(params: {
    tipoDado: string;
    rotulo?: string;
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
    instituicao?: string;
    idReservatorio?: string;
  }): Promise<{ registers: any[]; total: number }>;

}

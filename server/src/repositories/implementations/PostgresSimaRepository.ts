import { ISimaRepository } from "../ISimaRepository";
import { Sima } from "../../entities/sima/Sima";
import { simaPool } from "../../configs/db";
import { connectRedis, redisClient } from "../../providers/RedisConfig";



export class PostgresSimaRepository implements ISimaRepository {
  async getCoordinates(): Promise<
    { id: string; rotulo: string; latitude: number; longitude: number }[]
  > {
    await connectRedis();

    const cacheKey = "coordinates:sima";

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const { rows } = await simaPool.query(`SELECT * FROM listar_todas_coordenadas()`);

    const coordinates: { id: string; rotulo: string; latitude: number; longitude: number }[] =
      rows.map((row: any) => ({
        id: row.string,
        rotulo: row.rotulo,
        latitude: row.lat,
        longitude: row.lng,
      }));

    await redisClient.set(cacheKey, JSON.stringify(coordinates), {
      EX: 60 * 60,
    });
    return coordinates;
  }

  async getAll(params: {
    offset?: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
    stationName?: string;
  }): Promise<{ registers: Sima[]; total: number }> {
    const { offset = 0, limit, dateInit, dateEnd } = params;

    let result;

    if (typeof limit === "number") {
      // usa limit e offset
      result = await simaPool.query(
        `SELECT * FROM buscar_todas_informacoes(
         NULL,              -- idEstacao (não filtramos aqui)
         $1::timestamp,
         $2::timestamp,
         $3::int,
         $4::int
       )`,
        [dateInit || null, dateEnd || null, limit, offset],
      );
    } else {
      // sem paginação
      result = await simaPool.query(
        `SELECT * FROM buscar_todas_informacoes(
         NULL,
         $1::timestamp,
         $2::timestamp
       )`,
        [dateInit || null, dateEnd || null],
      );
    }

    const registers = result.rows.map(
      (row: any) =>
        new Sima({
          datahora: row.datahora,
          co2_low: row.co2_low,
          co2_high: row.co2_high,
          tempag1: row.tempag1,
          tempag2: row.tempag2,
          tempag3: row.tempag3,
          tempag4: row.tempag4,
          tempar: row.tempar,
          tempar_r: row.tempar_r,
          sonda_do: row.sonda_do,
          sonda_dosat: row.sonda_dosat,
          sonda_ph: row.sonda_ph,
          sonda_chl: row.sonda_chl,
          sonda_nh4: row.sonda_nh4,
          sonda_no3: row.sonda_no3,
          sonda_cond: row.sonda_cond,
          sonda_turb: row.sonda_turb,
          radincid: row.radincid,
          radrefl: row.radrefl,
          dirvt: row.dirvt,
          intensvt: row.intensvt,
          u_vel: row.u_vel,
          v_vel: row.v_vel,
          corr_norte: row.corr_norte,
          corr_leste: row.corr_leste,
          precipitacao: row.precipitacao,
          nome_estacao: row.nome_estacao || null,
        }),
    );

    // faz a contagem considerando filtro por rotulo

    // const total = parseInt(totalResult.rows[0].count, 10);

    return { registers, total: registers.length };
  }

  async getDataById(params: {
    id: string; 
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
    type: "sima";
  }): Promise<{ registers: Sima[]; total: number }> {

    const { rows } = await simaPool.query(
      `SELECT * FROM buscar_todas_informacoes($1, $2, $3, $4, $5)`,
      [params.id, params.dateInit, params.dateEnd, params.limit, params.offset],
    );

    // transforma em instâncias de Sima
    const registers = rows.map(
      (row: any) =>
        new Sima({
          datahora: row.datahora,
          co2_low: row.co2_low,
          co2_high: row.co2_high,
          tempag1: row.tempag1,
          tempag2: row.tempag2,
          tempag3: row.tempag3,
          tempag4: row.tempag4,
          tempar: row.tempar,
          tempar_r: row.tempar_r,
          sonda_do: row.sonda_do,
          sonda_dosat: row.sonda_dosat,
          sonda_ph: row.sonda_ph,
          sonda_chl: row.sonda_chl,
          sonda_nh4: row.sonda_nh4,
          sonda_no3: row.sonda_no3,
          sonda_cond: row.sonda_cond,
          sonda_turb: row.sonda_turb,
          radincid: row.radincid,
          radrefl: row.radrefl,
          dirvt: row.dirvt,
          intensvt: row.intensvt,
          u_vel: row.u_vel,
          v_vel: row.v_vel,
          corr_norte: row.corr_norte,
          corr_leste: row.corr_leste,
          precipitacao: row.precipitacao,
          nome_estacao: row.nome_estacao || null,
        }),
    );

    return { registers, total: registers.length };
  }

async getDataByCarbono(params: {
  rotulo: string;
  dataInicio?: Date;
  dataFim?: Date;
  offSet?: number;
  limit?: number;
}): Promise<{ date: Date; carbonoLow: number; carbonoHigh: number; estacao: string }[]> {

  const values = [
    params.rotulo ?? null,
    params.dataInicio ?? null,
    params.dataFim ?? null,
    params.offSet ?? 0,
    params.limit ?? 20
  ];

  const { rows } = await simaPool.query(
    `SELECT * FROM buscar_co2($1, $2, $3, $4, $5)`,
    values
  );

  const data = rows.map((row: any) => ({
    date: row.datahora,             // veio do DB como datahora.
    carbonoLow: row.co2_low,        // veio como co2_low
    carbonoHigh: row.co2_high,      // veio como co2_high
    estacao: row.nome_estacao        // veio como nome_estacao
  }));

  return data;
}
async getDataByTemperatura(params: {
  rotulo: string;
  dataInicio?: Date;
  dataFim?: Date;
  offSet?: number;
  limit?: number;
}): Promise<{ 
  date: Date; 
  tempag1: number; 
  tempag2: number; 
  tempag3: number; 
  tempag4: number; 
  tempar: number; 
  tempar_r: number; 
  rotulo: string; 
}[]> {

  const values = [
    params.rotulo ?? null,
    params.dataInicio ?? null,
    params.dataFim ?? null,
    params.offSet ?? 0,
    params.limit ?? 20
  ];

  const { rows } = await simaPool.query(
    `SELECT
      datahora,
      tempag1,
      tempag2,
      tempag3,
      tempag4,
      tempar,
      tempar_r,
      rotulo
    FROM buscar_temperaturas($1, $2, $3, $4, $5)`,
    values
  );

  const data = rows.map((row: any) => ({
    date: row.datahora,           // Data da medição
    tempag1: row.tempag1,         // Temperatura do sensor 1
    tempag2: row.tempag2,         // Temperatura do sensor 2
    tempag3: row.tempag3,         // Temperatura do sensor 3
    tempag4: row.tempag4,         // Temperatura do sensor 4
    tempar: row.tempar,           // Temperatura do ar
    tempar_r: row.tempar_r,       // Temperatura do ar corrigido (se aplicável)
    rotulo: row.rotulo // Nome da estação
  }));

  return data;
}

async getDataByOxigenioDissolvido(params: {
  rotulo: string;
  dataInicio?: Date;
  dataFim?: Date;
  offSet?: number;
  limit?: number;
}): Promise<{ 
  date: Date; sonda_do: number; sonda_dosat: number; nome_estacao: string
}[]> {

  const values = [
    params.rotulo ?? null,
    params.dataInicio ?? null,
    params.dataFim ?? null,
    params.offSet ?? 0,
    params.limit ?? 20
  ];

  const { rows } = await simaPool.query(
    `SELECT
      datahora,
      sonda_do,
      sonda_dosat,
      nome_estacao
    
    FROM buscar_do($1, $2, $3, $4, $5)`,
    values
  );

  const data = rows.map((row: any) => ({
    date: row.datahora,           // Data da medição
    sonda_do: row.sonda_do,         // Temperatura do sensor 1
    sonda_dosat: row.sonda_dosat,         // Temperatura do sensor 2
    nome_estacao: row.nome_estacao,         // Temperatura do sensor 3
   
  }));

  return data;
}
async getDataByPh(params: {
  rotulo: string;
  dataInicio?: Date;
  dataFim?: Date;
  offSet?: number;
  limit?: number;
}): Promise<{ 
 date: Date; sonda_ph: number; nome_estacao: string
}[]> {

  const values = [
    params.rotulo ?? null,
    params.dataInicio ?? null,
    params.dataFim ?? null,
    params.offSet ?? 0,
    params.limit ?? 20
  ];

  const { rows } = await simaPool.query(
    `SELECT
      datahora,
      sonda_ph,
      nome_estacao
    
    FROM buscar_ph($1, $2, $3, $4, $5)`,
    values
  );

  const data = rows.map((row: any) => ({
    date: row.datahora,          
    sonda_ph: row.sonda_ph,     
    nome_estacao: row.nome_estacao,         
  }));

  return data;
}

async getDataByClorofila(params: {
  rotulo: string;
  dataInicio?: Date;
  dataFim?: Date;
  offSet?: number;
  limit?: number;
}): Promise<{ 
 date: Date; sonda_chl: number; nome_estacao: string
}[]> {

  const values = [
    params.rotulo ?? null,
    params.dataInicio ?? null,
    params.dataFim ?? null,
    params.offSet ?? 0,
    params.limit ?? 20
  ];

  const { rows } = await simaPool.query(
    `SELECT
      datahora,
      sonda_chl,
      nome_estacao
    
    FROM buscar_clorofila($1, $2, $3, $4, $5)`,
    values
  );

  const data = rows.map((row: any) => ({
    date: row.datahora,          
    sonda_chl: row.sonda_chl,     
    nome_estacao: row.nome_estacao,         
  }));

  return data;
}

async getDataByNutrientes(params: {
  rotulo: string;
  dataInicio?: Date;
  dataFim?: Date;
  offSet?: number;
  limit?: number;
}): Promise<{ 
 date: Date; sonda_nh4: number; sonda_no3: number; nome_estacao: string
}[]> {

  const values = [
    params.rotulo ?? null,
    params.dataInicio ?? null,
    params.dataFim ?? null,
    params.offSet ?? 0,
    params.limit ?? 20
  ];

  const { rows } = await simaPool.query(
    `SELECT
      datahora,
      sonda_nh4,
      sonda_no3,
      nome_estacao
    
    FROM buscar_nutrientes($1, $2, $3, $4, $5)`,
    values
  );

  const data = rows.map((row: any) => ({
    date: row.datahora,          
    sonda_nh4: row.sonda_nh4,
    sonda_no3: row.sonda_no3,     
    nome_estacao: row.nome_estacao,         
  }));

  return data;
}
async getDataByCondutividade(params: {
  rotulo: string;
  dataInicio?: Date;
  dataFim?: Date;
  offSet?: number;
  limit?: number;
}): Promise<{ 
 date: Date; sonda_cond: number; nome_estacao: string
}[]> {

  const values = [
    params.rotulo ?? null,
    params.dataInicio ?? null,
    params.dataFim ?? null,
    params.offSet ?? 0,
    params.limit ?? 20
  ];

  const { rows } = await simaPool.query(
    `SELECT
      datahora,
      sonda_cond,
      nome_estacao
    
    FROM buscar_condutividade($1, $2, $3, $4, $5)`,
    values
  );

  const data = rows.map((row: any) => ({
    date: row.datahora,          
    sonda_cond: row.sonda_cond,    
    nome_estacao: row.nome_estacao,         
  }));

  return data;
}
async getDataByTurbidez(params: {
  rotulo: string;
  dataInicio?: Date;
  dataFim?: Date;
  offSet?: number;
  limit?: number;
}): Promise<{ 
 date: Date; sonda_turb: number; nome_estacao: string
}[]> {

  const values = [
    params.rotulo ?? null,
    params.dataInicio ?? null,
    params.dataFim ?? null,
    params.offSet ?? 0,
    params.limit ?? 20
  ];

  const { rows } = await simaPool.query(
    `SELECT
      datahora,
      sonda_turb,
      nome_estacao
    
    FROM buscar_turbidez($1, $2, $3, $4, $5)`,
    values
  );

  const data = rows.map((row: any) => ({
    date: row.datahora,          
  sonda_turb: row.sonda_turb,   
    nome_estacao: row.nome_estacao,         
  }));

  return data;
}
async getDataByRadiacao(params: {
  rotulo: string;
  dataInicio?: Date;
  dataFim?: Date;
  offSet?: number;
  limit?: number;
}): Promise<{ 
date: Date; radincid: number; radrefl: number; nome_estacao: string
}[]> {

  const values = [
    params.rotulo ?? null,
    params.dataInicio ?? null,
    params.dataFim ?? null,
    params.offSet ?? 0,
    params.limit ?? 20
  ];

  const { rows } = await simaPool.query(
    `SELECT
      datahora,
      radincid,
      radrefl,
      nome_estacao
    
    FROM buscar_radiacao($1, $2, $3, $4, $5)`,
    values
  );

  const data = rows.map((row: any) => ({
    date: row.datahora,          
    radincid: row.radincid,
    radrefl: row.radrefl,
    nome_estacao: row.nome_estacao
  }));

  return data;
}
async getDataByVentoVetor(params: {
  rotulo: string;
  dataInicio?: Date;
  dataFim?: Date;
  offSet?: number;
  limit?: number;
}): Promise<{ 
  date: Date;
      dirvt: number;
      intensvt: number;
      u_vel: number;
      v_vel: number;
      nome_estacao: string;
}[]> {

  const values = [
    params.rotulo ?? null,
    params.dataInicio ?? null,
    params.dataFim ?? null,
    params.offSet ?? 0,
    params.limit ?? 20
  ];

  const { rows } = await simaPool.query(
    `SELECT
      datahora,
      dirvt,
      intensvt,
      u_vel,
      v_vel,
      nome_estacao
    
    FROM buscar_vento_vetor($1, $2, $3, $4, $5)`,
    values
  );

  const data = rows.map((row: any) => ({
    date: row.datahora,          
    dirvt: row.dirvt,
    intensvt: row.intensvt,
    u_vel: row.u_vel,
    v_vel: row.v_vel,
    nome_estacao: row.nome_estacao
  }));

  return data;
}

async getDataByCorrentes(params: {
  rotulo: string;
  dataInicio?: Date;
  dataFim?: Date;
  offSet?: number;
  limit?: number;
}): Promise<{ 
 date: Date; corr_norte: number; corr_leste: number; nome_estacao: string
}[]> {

  const values = [
    params.rotulo ?? null,
    params.dataInicio ?? null,
    params.dataFim ?? null,
    params.offSet ?? 0,
    params.limit ?? 20
  ];

  const { rows } = await simaPool.query(
    `SELECT
      datahora,
      corr_norte,
      corr_leste,
      nome_estacao
    
    FROM buscar_correntes($1, $2, $3, $4, $5)`,
    values
  );

  const data = rows.map((row: any) => ({
    date: row.datahora,          
    corr_norte: row.corr_norte,
    corr_leste: row.corr_leste,
    nome_estacao: row.nome_estacao
  }));

  return data;
}
async getDataByPrecipitacao(params: {
  rotulo: string;
  dataInicio?: Date;
  dataFim?: Date;
  offSet?: number;
  limit?: number;
}): Promise<{ 
date: Date; precipitacao: number; nome_estacao: string
}[]> {

  const values = [
    params.rotulo ?? null,
    params.dataInicio ?? null,
    params.dataFim ?? null,
    params.offSet ?? 0,
    params.limit ?? 20
  ];

  const { rows } = await simaPool.query(
    `SELECT
      datahora,
      precipitacao,
      nome_estacao
    
    FROM buscar_precipitacao($1, $2, $3, $4, $5)`,
    values
  );

  const data = rows.map((row: any) => ({
    date: row.datahora,          
    precipitacao: row.precipitacao,
    nome_estacao: row.nome_estacao
  }));

  return data;
}
async getDataByQualidadeAgua(params: {
  rotulo: string;
  dataInicio?: Date;
  dataFim?: Date;
  offSet?: number;
  limit?: number;
}): Promise<{ 
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
}[]> {

  const values = [
    params.rotulo ?? null,
    params.dataInicio ?? null,
    params.dataFim ?? null,
    params.offSet ?? 0,
    params.limit ?? 20
  ];

  const { rows } = await simaPool.query(
    `SELECT
      datahora,
      tempag1,
      tempag2,
      tempag3,
      tempag4,
      sonda_temp,
      sonda_cond,
      sonda_do,
      sonda_dosat,
      sonda_ph,
      sonda_chl,
      sonda_turb,
      nome_estacao
    
    FROM buscar_qualidade_agua($1, $2, $3, $4, $5)`,
    values
  );

  const data = rows.map((row: any) => ({
    date: row.datahora,          
    tempag1: row.tempag1,
    tempag2: row.tempag2,
    tempag3: row.tempag3, 
    tempag4: row.tempag4,
    sonda_temp: row.sonda_temp,
    sonda_cond: row.sonda_cond,
    sonda_do: row.sonda_do,
    sonda_dosat: row.sonda_dosat,
    sonda_ph: row.sonda_ph,
    sonda_chl: row.sonda_chl,
    sonda_turb: row.sonda_turb,
    precipitacao: row.precipitacao,
    nome_estacao: row.nome_estacao
  }));

  return data;
}
}

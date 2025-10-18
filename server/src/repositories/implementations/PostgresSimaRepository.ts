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
    const { rows } = await simaPool.query(`SELECT * FROM buscar_co2($1, $2, $3, $4, $5)`, [params.rotulo, params.dataInicio, params.dataFim, params.offSet, params.limit]);

    const data = rows.map(
      (row: { date: Date; carbonoLow: number; carbonoHigh: number; estacao: string }) => ({
        date: row.date,
        carbonoLow: row.carbonoLow,
        carbonoHigh: row.carbonoHigh,
        estacao: row.estacao
      }),
    );

    return data;
  }
}

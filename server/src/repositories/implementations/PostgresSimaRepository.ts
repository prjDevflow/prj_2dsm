import { ISimaRepository } from "../ISimaRepository";
import { Sima } from "../../entities/sima/Sima";
import { simaPool } from "../../configs/db";
import { connectRedis, redisClient } from "../../providers/RedisConfig";

export class PostgresSimaRepository implements ISimaRepository {
  async getCoordinates(params: {
    reservoir?: string;
    institution?: string;
    dateInit?: Date;
    dateEnd?: Date;
  }): Promise<{ id: string; rotulo: string; latitude: number; longitude: number }[]> {
    await connectRedis();

    const cacheKey = "coordinates:sima";

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const { rows } = await simaPool.query(
      `SELECT * FROM listar_todas_coordenadas($1, $2, $3, $4)`,
      [params.reservoir, params.institution, params.dateInit, params.dateEnd],
    );

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
    const { offset = 0, limit, dateInit, dateEnd,  } = params;

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
<<<<<<< HEAD
   
=======
    // const totalResult = await simaPool.query(
    //   `SELECT count(*)::text AS count
    //  FROM tbsima s
    //  JOIN tbestacao e ON s.idestacao = e.idestacao
    //  WHERE ($1::text IS NULL OR e.rotulo ILIKE '%' || $1 || '%')
    //    AND ($2::timestamp IS NULL OR s.datahora >= $2)
    //    AND ($3::timestamp IS NULL OR s.datahora <= $3)`,
    //   [stationName || null, dateInit || null, dateEnd || null],
    // );
>>>>>>> 841bd0bcd7752bb57042b97abc28a13b5359350a

    // const total = parseInt(totalResult.rows[0].count, 10);

    return { registers, total: registers.length };
  }

  async getDataById(params: {
    id: string; // idestacao (ex: "123" ou "000123")
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
    type: "sima";
  }): Promise<{ registers: Sima[]; total: number }> {
    const { id, offset = 0, limit = 100, dateInit, dateEnd } = params;

    // consulta usando a função buscar_todas_informacoes
    const { rows } = await simaPool.query(
      `SELECT * FROM buscar_todas_informacoes(
      $1::text,
      $2::timestamp,
      $3::timestamp,
      $4::int,
      $5::int
    )`,
      [id || null, dateInit || null, dateEnd || null, limit, offset],
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

    // total separado, sem limit/offset

    const totalResult = await simaPool.query(
      `SELECT count(*)::text AS count
     FROM tbsima s
     JOIN tbestacao e ON s.idestacao = e.idestacao
     WHERE ($1::text IS NULL OR TRIM(LEADING '0' FROM e.idestacao::text) = TRIM(LEADING '0' FROM $1::text))
       AND ($2::timestamp IS NULL OR s.datahora >= $2)
       AND ($3::timestamp IS NULL OR s.datahora <= $3)`,
      [id || null, dateInit || null, dateEnd || null],
    );

    const total = parseInt(totalResult.rows[0].count, 10);

    return { registers, total };
  }
}

import { ISimaRepository } from "../ISimaRepository";
import { Sima } from "../../entities/Sima";
import { simaPool } from "../../configs/db";

export class SimaRepository implements ISimaRepository {
  async getCoordinates(): Promise<
    { id: string; name: string; latitude: number; longitude: number }[]
  > {
    const result = await simaPool.query(
      `SELECT idestacao::text as id, rotulo as name, latitude, longitude 
       FROM tbestacao`,
    );
    return result.rows;
  }

  async getAll(params: {
    offset: number;
    limit: number;
    dateInit?: Date;
    dateEnd?: Date;
    stationName?: string;
  }): Promise<{ registers: Sima[]; total: number }> {
    const { offset, limit, dateInit, dateEnd, stationName } = params;

    // chamada à procedure com casts explícitos
    const result = await simaPool.query(
      `SELECT * FROM buscar_todas_informacoes(
        $1::text, 
        $2::timestamp, 
        $3::timestamp, 
        $4::int, 
        $5::int
      )`,
      [stationName || null, dateInit || null, dateEnd || null, limit, offset],
    );

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

    // total precisa de count separado
    const totalResult = await simaPool.query(
      `SELECT count(*) 
       FROM tbsima s
       JOIN tbestacao e ON s.idestacao = e.idestacao
       WHERE ($1::text IS NULL OR e.rotulo ILIKE '%' || $1 || '%')
         AND ($2::timestamp IS NULL OR s.datahora >= $2)
         AND ($3::timestamp IS NULL OR s.datahora <= $3)`,
      [stationName || null, dateInit || null, dateEnd || null],
    );

    const total = parseInt(totalResult.rows[0].count, 10);

    return { registers, total };
  }
}

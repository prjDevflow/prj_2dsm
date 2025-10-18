import { furnasPool } from "../../configs/db";
import { Sitio } from "../../entities/furnas/Sitio";
// import { Furnas } from "../../entities/furnas/Furnas";
// import { connectRedis, redisClient } from "../../providers/RedisConfig";
import { IFurnasRepository } from "../IFurnasRepository";

export class PostgresFurnasRepository implements IFurnasRepository {
  async getCoordinates(params: { instituicao?: string }): Promise<
    {
      id: number;
      reservatorio: string;
      latitude: number;
      longitude: number;
      instituicao: string;
    }[]
  > {
    const instituicao = params.instituicao ?? null;

    const query = `SELECT * FROM buscar_reservatorios_por_instituicao($1)`;
    const values = [instituicao];

    const { rows } = await furnasPool.query(query, values);

    return rows.map((row) => ({
      id: row.reservatorio,
      reservatorio: row.nome_reservatorio,
      latitude: row.lat,
      longitude: row.lng,
      instituicao: row.nome_instituicao,
    }));
  }

  async getDataById(params: {
    reservatorio: string;
    limit?: number;
    offset?: number;
  }): Promise<{ registers: Sitio[]; total: number }> {
    

    const query = `SELECT * FROM buscar_dados_reservatorio_detalhado($1, $2, $3)`;

    const values = [params.reservatorio, params.limit, params.offset];

    const { rows } = await furnasPool.query(query, values);

    return {
      
      registers: rows,
      total: 0, //
    };
  }
}

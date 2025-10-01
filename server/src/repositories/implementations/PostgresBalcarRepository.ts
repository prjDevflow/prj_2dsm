import { balcarPool } from "../../configs/db";
import { connectRedis, redisClient } from "../../providers/RedisConfig";
import { IBalcarRepository } from "../IBalcarRepository";

export class PostgresBalcarRepository implements IBalcarRepository {
  async getCoordinates(): Promise<
    { id: string; rotulo: string; latitude: number; longitude: number }[]
  > {
    await connectRedis();

    const cacheKey = "coordinates:balcar";

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log("Retornando coordenadas do sima em cache");
      return JSON.parse(cached);
    }

    const query = `SELECT * FROM buscar_coordenadas()`;

    const { rows } = await balcarPool.query(query);

    await redisClient.set(cacheKey, JSON.stringify(rows), {
      EX: 60 * 60,
    });
    console.log("Savando dados em cache");

    return rows;
  }

  async getFullData(): Promise<any[]> {
    const query = `SELECT * FROM buscar_dados_completos()`;

    const { rows } = await balcarPool.query(query);

    return rows;
  }

  async getDataById(params: {
    id: string;
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
    type: "balcar";
  }): Promise<{ registers: any[]; total: number }> {
    const { id, offset, limit, dateInit, dateEnd } = params;
    const { rows } = await balcarPool.query(
      `SELECT * FROM buscar_informacoes_por_id(
            $1::int,
            $2::timestamp,
            $3::timestamp,
            $4::int,
            $5::int
          )`,
      [id, dateInit || null, dateEnd || null, limit || null, offset],
    );
    return {
      registers: rows,
      total: rows.length,
    };
  }
}

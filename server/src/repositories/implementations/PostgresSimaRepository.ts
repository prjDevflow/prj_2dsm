import { Sima } from "../../entities/Sima";
import { ISimaRepository } from "../ISimaRepository";
import { connectRedis, redisClient } from "../../providers/RedisConfig";
import { simaPool } from "../../configs/db";

export class SimaRepository implements ISimaRepository {
  async getCoordinates(): Promise<
    { id: string; rotulo: string; latitude: number; longitude: number }[]
  > {
    await connectRedis();

    const cacheKey = "coordinates:sima";

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log("Retornando coordenadas do sima em cache");
      return JSON.parse(cached);
    }

    const query = `SELECT * FROM buscar_coordenadas()`;

    const { rows } = await simaPool.query(query);

    await redisClient.set(cacheKey, JSON.stringify(rows), {
      EX: 60 * 60,
    });
    console.log("Savando dados em cache");

    return rows;
  }

  async getAll(params: {
    offset: number;
    limit: number;
    dateInit?: Date;
    dateEnd?: Date;
    stationName?: string;
  }): Promise<{ registers: Sima[]; total: number }> {
    const query = `
      SELECT * FROM buscar_todas_informacoes($1, $2, $3, $4, $5)
    `;

    const { rows } = await simaPool.query(query, [
      params.stationName,
      params.dateInit,
      params.dateEnd,
      params.offset,
      params.limit
    ]);

    return {
        registers: rows,
        total: rows.length
    };
  }
}

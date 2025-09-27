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
}

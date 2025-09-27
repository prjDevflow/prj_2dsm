import { furnasPool } from "../../configs/db";
import { connectRedis, redisClient } from "../../providers/RedisConfig";
import { IFurnasRepository } from "../IFurnasRepository";

export class PostgresFurnasRepository implements IFurnasRepository {
  async getCoordinates(): Promise<
    { id: string; rotulo: string; latitude: number; longitude: number }[]
  > {
    await connectRedis();

    const cacheKey = "coordinates:furnas";

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log("Retornando coordenadas do sima em cache");
      return JSON.parse(cached);
    }

    const query = `SELECT * FROM buscar_coordenadas()`;

    const { rows } = await furnasPool.query(query);

    await redisClient.set(cacheKey, JSON.stringify(rows), {
      EX: 60 * 60,
    });
    console.log("Savando dados em cache");

    return rows;
  }
}

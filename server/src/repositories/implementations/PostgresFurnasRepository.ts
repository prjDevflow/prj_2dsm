import { furnasPool } from "../../configs/db";
import { Sitio } from "../../entities/furnas/Sitio";
// import { Furnas } from "../../entities/furnas/Furnas";
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

    return rows;
  }

async getDataById(params: { id: string; limit?: number }): Promise<{ registers: Sitio[]; total: number }> {
  const idInt = parseInt(params.id, 10);
  if (isNaN(idInt)) throw new Error("ID inválido");

  const limit = params.limit ?? null;

  // Se limit não for informado ou for inválido, busca tudo
  const query = limit ? 
    `SELECT * FROM buscar_sitios_por_instituicao($1) LIMIT $2` : 
    `SELECT * FROM buscar_sitios_por_instituicao($1)`;

  const values = limit ? [idInt, limit] : [idInt];

  const { rows } = await furnasPool.query(query, values);

  return {
    registers: rows,
    total: rows.length,
  };
}
}

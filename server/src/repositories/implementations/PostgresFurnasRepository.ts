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

  async getDataById(params: {
    id: string;
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
    type: "furnas";
  }): Promise<{ registers: Furnas[]; total: number }> {
    const { id, offset, limit, dateInit, dateEnd } = params;
    const { rows } = await furnasPool.query(
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

  async getFilters(): Promise<{ institution: string[]; reservoir: string[] }> {
    await connectRedis();
    const cacheKey = "filters:furnas";

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // MOCK DATA
    const institution = ["ANA", "IBAMA", "CPRM"];
    const reservoir = [
      "Reservatório Norte",
      "Reservatório Sul",
      "Reservatório Oeste",
      "Reservatório Leste",
      "Reservatório Central",
    ];

    await redisClient.set(cacheKey, JSON.stringify({ institution, reservoir }), {
      EX: 60 * 60, // 1 hora de expiração
    });

    return { institution, reservoir };
  }
}

import { furnasPool } from "../../configs/db";
import { Sitio } from "../../entities/furnas/Sitio";
// import { Furnas } from "../../entities/furnas/Furnas";
// import { connectRedis, redisClient } from "../../providers/RedisConfig";
import { IFurnasRepository } from "../IFurnasRepository";

export class PostgresFurnasRepository implements IFurnasRepository {
  async getCoordinates(params: {
    instituicao: string;
    reservatorio: string;
  }): Promise<{
    id: string;
    rotulo: string;
    latitude: number;
    longitude: number;
    instituicao: string;
    reservatorio: string;
  }[]> {
    const instituicao = params.instituicao ?? null;
    const reservatorio = params.reservatorio ??  null;

    const query = `SELECT * FROM buscar_sitios_por_instituicao_e_reservatorio($1, $2)`;
    const values = [instituicao, reservatorio];

    const { rows } = await furnasPool.query(query, values);

    return rows.map(row => ({
      id: row.idsitio,
      rotulo: row.nome_sitio,
      latitude: row.lat,
      longitude: row.lng,
      instituicao: row.nome_instituicao,
      reservatorio: row.nome_reservatorio,
    }));
  }

<<<<<<< HEAD




async getDataById(params: { id: string; limit?: number; offset?: number }): Promise<{ registers: Sitio[]; total: number }> {
  const idInt = parseInt(params.id, 10);
  if (isNaN(idInt)) throw new Error("ID inválido");

  const limit = params.limit ?? null;
  const offset = params.offset ?? null;

  // Monta a query chamando a função com os parâmetros
  const query = `SELECT * FROM buscar_sitios_por_instituicao($1, $2, $3)`;
  const values = [idInt, limit, offset];
=======
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
>>>>>>> 841bd0bcd7752bb57042b97abc28a13b5359350a

    await redisClient.set(cacheKey, JSON.stringify({ institution, reservoir }), {
      EX: 60 * 60, // 1 hora de expiração
    });

<<<<<<< HEAD
  return {
    registers: rows,
    total: rows.length // Isso reflete apenas o total da página atual, não o total geral
  };
}
=======
    return { institution, reservoir };
  }
>>>>>>> 841bd0bcd7752bb57042b97abc28a13b5359350a
}

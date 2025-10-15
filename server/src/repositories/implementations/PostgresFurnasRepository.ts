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





async getDataById(params: { id: string; limit?: number; offset?: number }): Promise<{ registers: Sitio[]; total: number }> {
  const idInt = parseInt(params.id, 10);
  if (isNaN(idInt)) throw new Error("ID inválido");

  const limit = params.limit ?? null;
  const offset = params.offset ?? null;

  // Monta a query chamando a função com os parâmetros
  const query = `SELECT * FROM buscar_sitios_por_instituicao($1, $2, $3)`;
  const values = [idInt, limit, offset];

  const { rows } = await furnasPool.query(query, values);

  return {
    registers: rows,
    total: rows.length // Isso reflete apenas o total da página atual, não o total geral
  };
}
}

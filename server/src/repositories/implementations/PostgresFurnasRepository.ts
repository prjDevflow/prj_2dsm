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

    const query = `SELECT * FROM buscar_sitios_por_instituicao($1, $2)`;
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



  // Monta a query chamando a função com os parâmetros


   

  return {
    registers: [],
    total: 0 // Isso reflete apenas o total da página atual, não o total geral
  };
}
}

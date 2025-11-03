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
      id: row.idreservatorio,
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

  async getDataByType(params: {
    tipoDado: string;
    rotulo?: string;
    offset: number;
    limit?: number;
    dateInit?: Date;
    dateEnd?: Date;
    instituicao?: string;
    idReservatorio?: number;
  }): Promise<{ registers: any[]; total: number }> {
    // Mapeamento dos tipos de dado para procedures
    const procedureMap: Record<string, string> = {
      variaveisfisicasquimicasdaagua: "buscar_variaveisfisicasquimicasdaagua",
      parametrosbiologicosfisicosagua: "buscar_parametrosbiologicosfisicosagua",
      nutrientessedimento: "buscar_nutrientessedimento",
      aguamateriaorganicasedimento: "buscar_aguamateriaorganicasedimento",
      concentracaogasagua: "buscar_concentracaogasagua",
      fluxoDifusivo: "buscar_fluxodifusivo",
      fluxoCarbono: "buscar_fluxocarbono",
    };
    const procedure = procedureMap[params.tipoDado];
    if (!procedure) throw new Error("Tipo de dado não suportado");
    const query = `SELECT * FROM ${procedure}($1, $2, $3, $4, $5, $6, $7)`;
    const values = [
      params.instituicao ?? null,
      params.idReservatorio ?? null,
      params.rotulo ?? null,
      params.dateInit ?? null,
      params.dateEnd ?? null,
      params.offset ?? 0,
      params.limit ?? 20,
      // Adapte conforme assinatura da procedure
    ];
    const { rows } = await furnasPool.query(query, values);
    return {
      registers: rows,
      total: rows.length,
    };
  }
}
import { balcarPool } from "../../configs/db";

import { IBalcarRepository } from "../IBalcarRepository";

export class PostgresBalcarRepository implements IBalcarRepository {
  async getCoordinates(params: {
    instituicao: string | undefined;
  }): Promise<
    { id: string; rotulo: string; latitude: number; longitude: number; instituicao: string }[]
  > {
    const { rows } = await balcarPool.query(
      `SELECT * FROM buscar_reservatorios_por_instituicao($1)`,
      [params.instituicao],
    );
    return rows;
  }

  async getDataById(params: {
    idreservatorio: number | undefined;
    limit: number;
    offset: number;
  }): Promise<{ registers: any[]; total: number }> {
   
       const query = `SELECT * FROM buscar_fluxoinpe_por_reservatorio_detalhado($1, $2, $3)`;
   
       const values = [params.idreservatorio, params.limit, params.offset];
   
       const { rows } = await balcarPool.query(query, values);
   
       return {
         
         registers: rows,
         total: 0, //
  }


}
}
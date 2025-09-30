import { ISimaRepository } from "../../repositories/ISimaRepository";
import { IGetAllSima } from "./GetAllSimaDTO";

export class GetAllSimaUseCase {
  constructor(private simaRepository: ISimaRepository) {}

  async execute(params: IGetAllSima) {
    const result = await this.simaRepository.getAll({
      offset: params.offset,
      limit: params.limit && undefined,
      dateInit: params.dateInit,
      dateEnd: params.dateEnd,
      stationName: params.rotulo,
    });

const nextOffset = typeof params.limit === "number" ? params.offset + params.limit : undefined;
const prevOffset = typeof params.limit === "number" ? Math.max(0, params.offset - params.limit) : undefined;

return {
  registers: result.registers,
  total: result.total,
  offset: params.offset,
  limit: params.limit,
  nextOffset,
  prevOffset,
};
  }
}

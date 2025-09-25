import { ISimaRepository } from "../../repositories/ISimaRepository";
import { IGetAllSima } from "./GetAllSimaDTO";

export class GetAllSimaUseCase {
  constructor(private simaRepository: ISimaRepository) {}

  async execute(params: IGetAllSima) {
    const result = await this.simaRepository.getAll({
      offset: params.offset,
      limit: params.limit,
      dateInit: params.dateInit,
      dateEnd: params.dateEnd,
      stationName: params.stationName,
    });

    const nextOffset = params.offset + params.limit;
    const prevOffset = Math.max(0, params.offset - params.limit);

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

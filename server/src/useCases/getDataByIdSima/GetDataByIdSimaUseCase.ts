import { ISimaRepository } from "../../repositories/ISimaRepository";
import { IGetDataByIdSima } from "./GetDataByIdSimaDTO";

export class GetDataByIdSimaUseCase {
  constructor(private simaRepository: ISimaRepository) {}
  async execute(params: IGetDataByIdSima) {
    const result = await this.simaRepository.getDataById({
      id: params.id,
      offset: params.offset,
      limit: params.limit,
      dateInit: params.dateInit,
      dateEnd: params.dateEnd,
      // rotulo: params.stationName,
      type: "sima",
    });

    const nextOffset = params.limit !== undefined ? params.offset + params.limit : undefined;
    const prevOffset =
      params.limit !== undefined ? Math.max(0, params.offset - params.limit) : undefined;

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

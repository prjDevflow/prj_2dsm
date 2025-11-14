import { ISimaRepository } from "../../repositories/ISimaRepository";
import { IGetDataForSimaGraphics } from "./GetDataForSimaDataDTO";

export class GetDataForSimaGraphicsSimaUseCase {
  constructor(private furnasRepository: ISimaRepository) {}

  async execute(params: IGetDataForSimaGraphics) {
    const result = await this.furnasRepository.getDataByType({
      tipoDado: params.type,
      rotulo: params.rotulo,
      offset: params.offset,
      limit: params.limit,
      dateInit: params.dateInit,
      dateEnd: params.dateEnd,
     
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
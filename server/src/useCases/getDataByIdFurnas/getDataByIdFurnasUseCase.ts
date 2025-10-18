import { IFurnasRepository } from "../../repositories/IFurnasRepository";
import { IGetDataByIdFurnas, IGetDataByIdFurnasResponse } from "./getDataByIdFurnasDTO";

export class GetDataByIdFurnasUseCase {
  constructor(private furnasRepository: IFurnasRepository) {}
  async execute(params: IGetDataByIdFurnas):Promise<IGetDataByIdFurnasResponse> {
    const result = await this.furnasRepository.getDataById({
      id: params.id,
      offset: params.offset,
      limit: params.limit,
      
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

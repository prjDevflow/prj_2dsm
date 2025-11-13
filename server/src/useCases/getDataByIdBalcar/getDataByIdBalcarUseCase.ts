import { IBalcarRepository } from "../../repositories/IBalcarRepository";
import { IGetDataByIdBalcar } from "./getDataByIdBalcarDTO";

export class GetDataByIdBalcarUseCase {
  constructor(private balcarRepository: IBalcarRepository) {}
  async execute(params: IGetDataByIdBalcar) {
    const result = await this.balcarRepository.getDataById({
      idreservatorio: params.id,
      
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

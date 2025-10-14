import { IBalcarRepository } from "../../repositories/IBalcarRepository";
import { IFurnasRepository } from "../../repositories/IFurnasRepository";
import { IGetFilters, IGetFiltersResponse } from "./GetFiltersDTO";

export class GetFiltersUseCase {
  constructor(
    private balcarRepository: IBalcarRepository,
    private furnasRepository: IFurnasRepository,
  ) {}

  async execute(data: IGetFilters): Promise<IGetFiltersResponse> {
    const filters =
      data.type === "furnas"
        ? await this.furnasRepository.getFilters()
        : await this.balcarRepository.getFilters();

    return {
      institution: filters.institution,
      reservoir: filters.reservoir,
    };
  }
}

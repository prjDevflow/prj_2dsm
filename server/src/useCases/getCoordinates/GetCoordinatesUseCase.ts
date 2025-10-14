import { ISimaRepository } from "../../repositories/ISimaRepository";
import { IBalcarRepository } from "../../repositories/IBalcarRepository";
import { IFurnasRepository } from "../../repositories/IFurnasRepository";
import { IGetCoordinates, IGetCoordinatesResponse } from "./GetCoordinatesDTO";

export class GetCoordinatesUseCase {
  constructor(
    private simaRepository: ISimaRepository,
    private balcarRepository: IBalcarRepository,
    private furnasRepository: IFurnasRepository,
  ) {}

  async execute(data: IGetCoordinates): Promise<IGetCoordinatesResponse[]> {
    const { type, ...filters } = data;
    // const { reservoir, institution, dateInit, dateEnd } = filters;

    let coordinates: any = [];
    if (type === "sima") {
      coordinates = await this.simaRepository.getCoordinates({
        ...filters,
      });
    }
    if (type === "balcar") {
      coordinates = await this.balcarRepository.getCoordinates({ ...filters });
    }
    if (type === "furnas") {
      coordinates = await this.furnasRepository.getCoordinates({ ...filters });
    }

    return coordinates;
  }
}

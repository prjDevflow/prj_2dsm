import { ISimaRepository } from "../../repositories/ISimaRepository";
import { IBalcarRepository } from "../../repositories/IBalcarRepository";
import { IFurnasRepository } from "../../repositories/IFurnasRepository";
import { IGetCoordinatesResponse } from "./GetCoordinatesDTO";

export class GetCoordinatesUseCase {
  constructor(
    private simaRepository: ISimaRepository,
    private balcarRepository: IBalcarRepository,
    private furnasRepository: IFurnasRepository,
  ) {}

  async execute(type?: "sima" | "balcar" | "furnas"): Promise<IGetCoordinatesResponse[]> {
    if (type === "sima") {
      return this.simaRepository.getCoordinates();
    }
    if (type === "balcar") {
      return this.balcarRepository.getCoordinates();
    }
    if (type === "furnas") {
      return this.furnasRepository.getCoordinates();
    }

    const [coordinatesBalcar, coordinatesFurnas, coordinatesSimas] = await Promise.all([
      this.simaRepository.getCoordinates(),
      this.balcarRepository.getCoordinates(),
      this.furnasRepository.getCoordinates(),
    ]);

    const coordinates: IGetCoordinatesResponse[] = [
      ...coordinatesBalcar,
      ...coordinatesSimas,
      ...coordinatesFurnas,
    ];

    return coordinates;
  }
}

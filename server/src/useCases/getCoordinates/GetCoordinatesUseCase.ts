import { ISimaRepository } from "../../repositories/ISimaRepository";
import { IBalcarRepository } from '../../repositories/IBalcarRepository';
import { IFurnasRepository } from '../../repositories/IFurnasRepository';
import { IGetCoordinatesDTO } from './GetCoordinatesDTO';

export class GetCoordinatesUseCase {
  constructor(
    private simaRepository: ISimaRepository,
    private balcarRepository: IBalcarRepository,
    private furnasRepository: IFurnasRepository,
  ) {}

  async execute() {
    const [coordinatesBalcar, coordinatesFurnas, coordinatesSimas] = await Promise.all([
      this.simaRepository.getCoordinates(),
      this.balcarRepository.getCoordinates(),
      this.furnasRepository.getCoordinates(),
    ]);

    const coordinates: IGetCoordinatesDTO[] = [
      ...coordinatesBalcar,
      ...coordinatesFurnas,
      ...coordinatesSimas,
    ];

    return coordinates;
  }
}

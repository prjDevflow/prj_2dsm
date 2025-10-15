import { ISimaRepository } from "../../repositories/ISimaRepository";
import { IBalcarRepository } from "../../repositories/IBalcarRepository";
import { IFurnasRepository } from "../../repositories/IFurnasRepository";
<<<<<<< HEAD
import { IGetCoordinatesResponse } from "./GetCoordinatesDTO";
import {GetCoordinatesParams} from "./GetCoordinatesDTO";

=======
import { IGetCoordinates, IGetCoordinatesResponse } from "./GetCoordinatesDTO";
>>>>>>> 841bd0bcd7752bb57042b97abc28a13b5359350a

export class GetCoordinatesUseCase {
  constructor(
    private simaRepository: ISimaRepository,
    private balcarRepository: IBalcarRepository,
    private furnasRepository: IFurnasRepository,
  ) {}

<<<<<<< HEAD
  async execute(params:GetCoordinatesParams): Promise<IGetCoordinatesResponse[]> {
    let coordinates: any = [];
    if (params.type === "sima") {
      coordinates = this.simaRepository.getCoordinates();
    }
    if (params.type === "balcar") {
      return this.balcarRepository.getCoordinates();
    }
    if (params.type === "furnas") {
      return this.furnasRepository.getCoordinates({instituicao: params.instituicao, reservatorio: params.reservatorio});
    }




=======
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

>>>>>>> 841bd0bcd7752bb57042b97abc28a13b5359350a
    return coordinates;
  }
}

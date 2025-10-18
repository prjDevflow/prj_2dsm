import { ISimaRepository } from "../../repositories/ISimaRepository";
import { IBalcarRepository } from "../../repositories/IBalcarRepository";
import { IFurnasRepository } from "../../repositories/IFurnasRepository";
import { IGetCoordinatesResponse } from "./GetCoordinatesDTO";
import {GetCoordinatesParams} from "./GetCoordinatesDTO";


export class GetCoordinatesUseCase {
  constructor(
    private simaRepository: ISimaRepository,
    private balcarRepository: IBalcarRepository,
    private furnasRepository: IFurnasRepository,
  ) {}

  async execute(params:GetCoordinatesParams): Promise<IGetCoordinatesResponse[]> {
    let coordinates: any = [];
    if (params.type === "sima") {
      coordinates = this.simaRepository.getCoordinates();
    }
    if (params.type === "balcar") {
      coordinates = this.balcarRepository.getCoordinates({instituicao: params.instituicao});
    }
    if (params.type === "furnas") {
      coordinates = this.furnasRepository.getCoordinates({instituicao: params.instituicao,});
    }

    return coordinates;
  }
}

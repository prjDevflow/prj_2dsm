import { IFurnasRepository } from "../../repositories/IFurnasRepository";
import { IGetDataForFurnasType } from "./getDataForFurnasTypeDTO";

export class getDataForFurnasTypeUseCase {
  constructor(private furnasRepository: IFurnasRepository) {}
  async execute(data: IGetDataForFurnasType): Promise<any[]> {
    let result: any[] = [];

    switch (data.type) {
    //   case "carbono":
    //     result = await this.furnasRepository.getDataByCarbono({
    //       rotulo: data.rotulo,
    //       dataFim: data.dateEnd,
    //       dataInicio: data.dateInit,
    //       limit: data.limit,
    //       offSet: data.offset,
    //     });
    //     break;

      

      default:
        throw new Error("Tipo de dados inválido");
    }

    return result;
  }
}

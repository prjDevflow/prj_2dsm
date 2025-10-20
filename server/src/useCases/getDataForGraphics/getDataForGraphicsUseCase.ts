import { ISimaRepository } from "../../repositories/ISimaRepository";
import { IGetDataForGraphics } from "./getDataForGraphicsDTO";

export class GetDataForGraphicsUseCase {
  constructor (
    private simaRepository: ISimaRepository
  ) {}
  async execute(data: IGetDataForGraphics): Promise<any[]> {
    let result: any[] = []

    if (data.type = "carbono") {
        result = await this.simaRepository.getDataByCarbono({
            rotulo: data.rotulo,
            dataFim: data.dateEnd,
            dataInicio: data.dateInit,
            limit: data.limit,
            offSet: data.offset
        })
    }

    return result
  }
}

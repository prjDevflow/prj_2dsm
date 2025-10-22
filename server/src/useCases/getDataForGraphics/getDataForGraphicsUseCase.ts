import { ISimaRepository } from "../../repositories/ISimaRepository";
import { IGetDataForGraphics } from "./getDataForGraphicsDTO";

export class GetDataForGraphicsUseCase {
  constructor(private simaRepository: ISimaRepository) {}
  async execute(data: IGetDataForGraphics): Promise<any[]> {
    let result: any[] = [];

     switch (data.type) {
      case "carbono":
        result = await this.simaRepository.getDataByCarbono({
          rotulo: data.rotulo,
          dataFim: data.dateEnd,
          dataInicio: data.dateInit,
          limit: data.limit,
          offSet: data.offset,
        });
        break;

      case "temperatura":
        result = await this.simaRepository.getDataByTemperatura({
          rotulo: data.rotulo,
          dataFim: data.dateEnd,
          dataInicio: data.dateInit,
          limit: data.limit,
          offSet: data.offset,
        });
        break;


        case "oxigenioDissolvido":
        result = await this.simaRepository.getDataByOxigenioDissolvido({
          rotulo: data.rotulo,
          dataFim: data.dateEnd,
          dataInicio: data.dateInit,
          limit: data.limit,
          offSet: data.offset,
        });
        break;
        case "ph":
        result = await this.simaRepository.getDataByPh({
          rotulo: data.rotulo,
          dataFim: data.dateEnd,
          dataInicio: data.dateInit,
          limit: data.limit,
          offSet: data.offset,
        });
        break;

         case "clorofila":
        result = await this.simaRepository.getDataByClorofila({
          rotulo: data.rotulo,
          dataFim: data.dateEnd,
          dataInicio: data.dateInit,
          limit: data.limit,
          offSet: data.offset,
        });
        break;
         case "nutrientes":
        result = await this.simaRepository.getDataByNutrientes({
          rotulo: data.rotulo,
          dataFim: data.dateEnd,
          dataInicio: data.dateInit,
          limit: data.limit,
          offSet: data.offset,
        });
        break;
            case "condutividade":
        result = await this.simaRepository.getDataByCondutividade({
          rotulo: data.rotulo,
          dataFim: data.dateEnd,
          dataInicio: data.dateInit,
          limit: data.limit,
          offSet: data.offset,
        });
        break;
           case "turbidez":
        result = await this.simaRepository.getDataByTurbidez({
          rotulo: data.rotulo,
          dataFim: data.dateEnd,
          dataInicio: data.dateInit,
          limit: data.limit,
          offSet: data.offset,
        });
        break;
          case "radiacao":
        result = await this.simaRepository.getDataByRadiacao({
          rotulo: data.rotulo,
          dataFim: data.dateEnd,
          dataInicio: data.dateInit,
          limit: data.limit,
          offSet: data.offset,
        });
        break;
         case "vento":
        result = await this.simaRepository.getDataByVentoVetor({
          rotulo: data.rotulo,
          dataFim: data.dateEnd,
          dataInicio: data.dateInit,
          limit: data.limit,
          offSet: data.offset,
        });
      
        break;
        case "correntes":
        result = await this.simaRepository.getDataByCorrentes({
          rotulo: data.rotulo,
          dataFim: data.dateEnd,
          dataInicio: data.dateInit,
          limit: data.limit,
          offSet: data.offset,
        });
        break;
         case "precipitacao":
        result = await this.simaRepository.getDataByPrecipitacao({
          rotulo: data.rotulo,
          dataFim: data.dateEnd,
          dataInicio: data.dateInit,
          limit: data.limit,
          offSet: data.offset,
        });
        break;
         case "qualidadeAgua":
        result = await this.simaRepository.getDataByQualidadeAgua({
          rotulo: data.rotulo,
          dataFim: data.dateEnd,
          dataInicio: data.dateInit,
          limit: data.limit,
          offSet: data.offset,
        });
        break;
        
      default:
        throw new Error("Tipo de dados inválido");
    }

    return result;
  }
}

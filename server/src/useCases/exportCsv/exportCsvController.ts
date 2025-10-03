import { Request, Response } from "express";
import { ExportCsvUseCase } from "./exportCsvUseCase";
import { logger } from "../../configs/logger";
import { exportCsvSchema } from "./exportCsvDTO";
import { GetDataByIdSimaUseCase } from "../getDataByIdSima/GetDataByIdSimaUseCase";
import { ZodError } from "zod";

export class ExportCsvController {
  constructor(
    private exportCsvUseCase: ExportCsvUseCase,
    private getDataByIdSimaUseCase: GetDataByIdSimaUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { type, ...params } = exportCsvSchema.parse(req.query);

      let data: any[] = [];
      let dataLength: number = 0;

      if (type === "sima") {
        const { registers, total } = await this.getDataByIdSimaUseCase.execute(params);
        data = registers;
        dataLength = total;
      }
      if (type === "balcar") {
        res.json({ message: "Rota ainda não retorna dados para esse tipo" });
      }
      if (type === "furnas") {
        res.json({ message: "Rota ainda não retorna dados para esse tipo" });
      }

      if (!data.length) {
        res.status(404).json({ message: "Nenhum dado encontrado para exportação" });
      }

      const csv = await this.exportCsvUseCase.execute(data);

      res.header("Content-Type", "text/csv; charset=utf-8");
      res.attachment(`${dataLength}_dados_${type}.csv`);
      res.send(csv);
    } catch (error: Error | any) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: "Erro de validação nos parâmetros",
          issues: error.issues,
        });
      }
      logger.error(`Erro ao exportar CSV: ${error || error}`);
      res.status(500).json({ error: "Erro ao exportar CSV", detail: error.message });
    }
  }
}

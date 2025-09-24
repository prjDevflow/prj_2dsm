import { Request, Response } from "express";
import { ExportCsvUseCase } from "./exportCsvUseCase";
import { logger } from "../../configs/logger";

export class ExportCsvController {
  constructor(private exportCsvUseCase: ExportCsvUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const csv = this.exportCsvUseCase.execute();

      res.header("Content-Type", "text/csv; charset=utf-8");
      res.attachment("dados_completos.csv");
      res.send(csv);
    } catch (error: Error | any) {
        console.log(error);
        logger.error(`Erro ao exportar CSV: ${error || error}`);
        res.status(500).json({ error: "Erro ao exportar CSV", detail: error.message });
    }
  }
}

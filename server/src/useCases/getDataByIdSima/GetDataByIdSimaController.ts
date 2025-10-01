import { Request, Response } from "express";
import { getDataByIdSimaSchema } from "./GetDataByIdSimaDTO";
import { GetDataByIdSimaUseCase } from "./GetDataByIdSimaUseCase";
import { ZodError } from "zod";
import { logger } from "../../configs/logger";

export class GetDataByIdSimaController {
  constructor(private getDataByIdSimaUseCase: GetDataByIdSimaUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const params = getDataByIdSimaSchema.parse({id: req.params.id, ...req.query});

      const result = await this.getDataByIdSimaUseCase.execute(params);

      res.status(200).send({ message: "Dados do Sima retornados", data: result });
    } catch (error: Error | any) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).json({
          error: "Erro de validação nos parâmetros",
          issues: error.issues,
        });
      }
      logger.error("Erro ao buscar dados", {
        message: error.message,
        stack: error.stack,
      });

      res.status(500).json({ error: "Erro ao buscar dados", detail: error.message });
    }
  }
}

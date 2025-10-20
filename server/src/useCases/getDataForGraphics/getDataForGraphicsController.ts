import { Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../../configs/logger";
import { getDataForGraphicsSchema } from "./getDataForGraphicsDTO";
import { GetDataForGraphicsUseCase } from "./getDataForGraphicsUseCase";


export class GetDataForGraphicsController {
  constructor(private getDataForGraphicsUseCase: GetDataForGraphicsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const params = getDataForGraphicsSchema.parse(req.query);

      const result = await this.getDataForGraphicsUseCase.execute(params);

      res.status(200).send({ message: "Dados do Furnas retornado", data: result });
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

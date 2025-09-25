import { Request, Response } from "express";
import { GetAllSimaUseCase } from "./GetAllSimaUseCase";
import { getAllSimaSchema } from "./GetAllSimaDTO";
import { logger } from "../../configs/logger";
import { ZodError } from "zod";

export class GetAllSimaController {
  constructor(private getAllSimaUseCase: GetAllSimaUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const params = getAllSimaSchema.parse(req.query);

      const result = await this.getAllSimaUseCase.execute(params);

      res.status(200).send({ message: "Dados do Sima retornados", data: result });
    } catch (error: Error | any) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).json({
          error: "Erro de validação nos parâmetros",
          issues: error.issues,
        });
      }
      logger.error("Erro ao buscar dados do Sima", {
        message: error.message,
        stack: error.stack,
      });

      res.status(500).json({ error: "Erro ao buscar dados do Sima", detail: error.message });
    }
  }
}

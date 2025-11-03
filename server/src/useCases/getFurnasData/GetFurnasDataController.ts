import { Request, Response } from "express";
import { ZodError } from "zod";
import { getFurnasDataSchema } from "./GetFurnasDataDTO";
import { GetFurnasDataUseCase } from "./GetFurnasDataUseCase";

export class GetFurnasDataController {
  constructor(private getFurnasDataUseCase: GetFurnasDataUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const params = getFurnasDataSchema.parse(req.query);
      const result = await this.getFurnasDataUseCase.execute(params);
      res.status(200).send({ message: "Dados do Furnas retornados", data: result });
    } catch (error: Error | any) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: "Erro de validação nos parâmetros",
          issues: error.issues,
        });
      }
      res.status(500).json({ error: "Erro ao buscar dados do Furnas", detail: error });
    }
  }
}
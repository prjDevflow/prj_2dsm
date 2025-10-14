import { Request, Response } from "express";
import { GetFiltersUseCase } from "./GetFiltersUseCase";
import { getFiltersSchema } from "./GetFiltersDTO";

export class GetFiltersController {
  constructor(private getFiltersUseCase: GetFiltersUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const params = getFiltersSchema.parse(req.query);
      const { institution, reservoir } = await this.getFiltersUseCase.execute(params);
      res.status(200).json({
        message: "Filtros buscados com sucesso",
        institution,
        reservoir,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Erro ao buscar filtros",
        error: (error as Error).message,
      });
    }
  }
}

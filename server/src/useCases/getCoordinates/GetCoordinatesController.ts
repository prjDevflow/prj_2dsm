import { Request, Response } from "express";
import { GetCoordinatesUseCase } from "./GetCoordinatesUseCase";
import { GetCoordinatesSchema } from "./GetCoordinatesDTO";

export class GetCoordinatesController {
  constructor(private getCoordinatesUseCase: GetCoordinatesUseCase) {}
  async handle(req: Request, res: Response) {
    try {
      const params = GetCoordinatesSchema.parse(req.query);
      const coordinates = await this.getCoordinatesUseCase.execute(params.type);
      res.status(200).json({
        message: "Coordenadas recuperadas com sucesso",
        markers: coordinates,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Erro ao buscar coordenadas",
        error: (error as Error).message,
      });
    }
  }
}

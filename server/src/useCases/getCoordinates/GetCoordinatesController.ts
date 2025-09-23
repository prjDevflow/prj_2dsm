import { Request, Response } from "express";
import { GetCoordinatesUseCase } from "./GetCoordinatesUseCase";

export class GetCoordinatesController {
  constructor(private getCoordinatesUseCase: GetCoordinatesUseCase) {}
  async handle(req: Request, res: Response) {
    try {
      const coordinates = await this.getCoordinatesUseCase.execute();
      res.status(200).json({
        message: "Coordenadas recuperadas com sucesso",
        data: coordinates,
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

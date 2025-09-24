import { Request, Response } from "express";
import { getCoordinatesUseCase } from "./useCase";
// import { IGetCoordinates } from "./interface";

export async function getCoordinatesController(req: Request, res: Response): Promise<void> {
  try {
    const coordinates = await getCoordinatesUseCase(); //chamada servico

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

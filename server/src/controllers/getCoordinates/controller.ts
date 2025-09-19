import { Request, Response } from "express";
import { getCoordinatesUseCase } from "./useCase";
import { IGetCoordinates } from "./Interface";

const coordinates: IGetCoordinates[] = [
  { id: "1", name: "Ponto A", latitude: -3.10719, longitude: -60.0261 },
  { id: "2", name: "Ponto B", latitude: -3.1324, longitude: -59.9822 },
  { id: "3", name: "Ponto C", latitude: -3.1015, longitude: -60.0120 }
];

export async function getCoordinatesController(req: Request, res: Response): Promise<void> {
  try {
    // const coordinates = await getCoordinatesUseCase(); //chamada servico

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

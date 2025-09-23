import { GetCoordinatesRepository } from "./mockRepository";
import { IGetCoordinates } from "./interface";

export async function getCoordinatesUseCase() {
  const [coordinatesBalcar, coordinatesFurnas, coordinatesSimas] = await Promise.all([
    GetCoordinatesRepository.getCoordinatesBalcar(),
    GetCoordinatesRepository.getCoordinatesFurnas(),
    GetCoordinatesRepository.getCoordinatesSima(),
  ]);

  const coordinates: IGetCoordinates[] = [
    ...coordinatesBalcar,
    ...coordinatesFurnas,
    ...coordinatesSimas,
  ];

  return coordinates;
}

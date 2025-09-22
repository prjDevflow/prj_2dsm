import { GetCoordinatesRepository } from "./repository";
import { IGetCoordinates } from "./Interface";

// Exemplo de dados mockados (depois você pode buscar do banco)
// const coordinates: IGetCoordinates[] = [
//   { id: "1", name: "Ponto A", latitude: -3.10719, longitude: -60.0261 },
//   { id: "2", name: "Ponto B", latitude: -3.1324, longitude: -59.9822 },
//   { id: "3", name: "Ponto C", latitude: -3.1015, longitude: -60.0120 }
// ];

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

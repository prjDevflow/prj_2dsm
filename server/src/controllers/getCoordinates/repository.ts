import { IGetCoordinates } from "./Interface";

export const GetCoordinatesRepository = {
  async getCoordinatesBalcar(instituicao, reservatorio, periodo): Promise<IGetCoordinates[]> {
    return [
      { id: "1", name: "Ponto A", latitude: -3.10719, longitude: -60.0261 },
      { id: "2", name: "Ponto B", latitude: -3.1324, longitude: -59.9822 },
      { id: "3", name: "Ponto C", latitude: -3.1015, longitude: -60.012 },
    ];
  },
  async getCoordinatesFurnas(instituicao, reservatorio, periodo) {},
  async getCoordinatesSima(instituicao, reservatorio, periodo) {},
};

import { IGetCoordinates } from "./interface";
// import { simaPool } from "../../configs/db";

export const GetCoordinatesRepository = {
  async getCoordinatesBalcar(): Promise<IGetCoordinates[]> {
    return [{ id: "1", name: "Ponto A", latitude: -3.10719, longitude: -60.0261 }];
  },
  async getCoordinatesFurnas() {
    return [{ id: "2", name: "Ponto B", latitude: -3.1324, longitude: -59.9822 }];
  },
  async getCoordinatesSima() {
    return [{ id: "3", name: "Ponto C", latitude: -3.1015, longitude: -60.012 }];
  },
};

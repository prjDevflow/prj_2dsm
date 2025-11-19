import { useQuery } from "react-query";
import axios from "axios";
import type { PontoColeta } from "@/types/ponto";
 
const fetchColetas = async (type: "sima" | "balcar" | "furnas", instituicao?: string) => {
  const response = await axios.get("http://localhost:3001/get-coordinates", {
    params: { type, instituicao },
  });
 
  console.log("RAW RESPONSE:", response.data);
 
  const normalizedData = response.data.markers.map((ponto: any, index: number) => {
    const latitude = ponto.latitude ?? ponto.lat;
    const longitude = ponto.longitude ?? ponto.lng;
 
    return {
      ...ponto,
 
      // Normalização das coordenadas
      latitude: Number(latitude),
      longitude: Number(longitude),
 
      // Normalização de nomes
      reservatorio: ponto.reservatorio ?? ponto.nome_reservatorio,
      instituicao: ponto.instituicao ?? ponto.nome_instituicao,
 
      // ID sempre único e consistente
      id:
        ponto.id ??
        ponto.idreservatorio ??
        `${ponto.nome_instituicao ?? "inst"}-${ponto.nome_reservatorio ?? "res"}-${index}`,
    };
  });
 
  return normalizedData as PontoColeta[];
};
 
export const useColetas = (type: "sima" | "balcar" | "furnas", instituicao?: string) => {
  return useQuery(["get-coordinates", type, instituicao], () =>
    fetchColetas(type, instituicao)
  );
};
 
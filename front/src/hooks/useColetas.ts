import { useQuery } from "react-query";
import axios from "axios";
import type { PontoColeta } from "@/types/ponto";
 
const fetchColetas = async (type: "sima" | "balcar" | "furnas", instituicao?: string) => {
  const response = await axios.get("http://localhost:3001/get-coordinates", {
    params: { type, instituicao },
  });
 
  console.log(response)
 
  // Normaliza os dados, garantindo que todos tenham key única
  const normalizedData = response.data.markers.map((ponto: any, i: number) => ({
    ...ponto,
    id: ponto.id ?? `${ponto.instituicao}-${ponto.reservatorio}-${i}`,
  }));
 
  return normalizedData as PontoColeta[];
};
 
export const useColetas = (type: "sima" | "balcar" | "furnas", instituicao?: string) => {
  return useQuery(["get-coordinates", type, instituicao], () =>
    fetchColetas(type, instituicao)
  );
};
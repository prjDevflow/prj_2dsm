import { useQuery } from "react-query";
import axios from "axios";

// Função para buscar as coordenadas
const fetchColetas = async (type: "sima" | "balcar" | "furnas") => {
  // Requisição para a rota correta no backend
  const response = await axios.get(`http://localhost:3000/get-coordinates`, {
    params: { type }, // Passa o tipo como parâmetro de query
  });
  console.log(response.data.markers);
  return response.data.markers; // Retorna os dados da resposta
};

// Hook para buscar as coordenadas
export const useColetas = (type: "sima" | "balcar" | "furnas") => {
  return useQuery(["get-coordinates", type], () => fetchColetas(type)); // O nome da query agora depende do tipo
};

// src/types/ponto.ts
export type PontoColeta = {
  id: number | string;
  name?: string;
  rotulo?: string;
  latitude?: number;
  longitude?: number;
  type?: string;
  // adicione outras propriedades que podem ser usadas
};
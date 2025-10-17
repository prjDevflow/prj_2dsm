// Shared type for points used across components
export type PontoColeta = {
  id: number | string;
  name?: string;
  rotulo?: string;
  latitude: number;
  longitude: number;
  type?: string;
};

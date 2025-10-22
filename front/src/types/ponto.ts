// Shared type for points used across components
export type PontoColeta = {
  id: string | number;
  name?: string;
  latitude: number;
  longitude: number;
  type?: string;
  rotulo?: string;
};

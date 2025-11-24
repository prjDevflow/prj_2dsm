export type Range = { start?: Date | null; end?: Date | null };

export interface SimaRecord extends Record<string, unknown> {
  idsima?: number;
  idsimaoffline?: number;
  idestacao?: string | number;
  nome_estacao?: string;
  rotulo?: string;
  nome?: string;
  name?: string;
  datahora?: string;
  [k: string]: unknown;
}

export interface Props {
  selectedPointId?: number | string | null;
  selectedPointName?: string | null;
  selectedPoint?: Record<string, unknown> | null;
  range?: Range;
  initialPage?: number;
  initialLimit?: number;
  apiBase?: string; // default: http://localhost:3001/sima
}
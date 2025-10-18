import * as z from "zod";

import { Sitio } from "../../entities/furnas/Sitio";

export const getDataByIdFurnasSchema = z.object({
  id: z.string(),
  offset: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default(0),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
});

export type IGetDataByIdFurnas = z.infer<typeof getDataByIdFurnasSchema>;

export interface IGetDataByIdFurnasResponse {
  registers: Sitio[]; // Alterar classe para Furnas
  total: number;
  offset: number;
  limit?: number;
  nextOffset?: number;
  prevOffset?: number;
}

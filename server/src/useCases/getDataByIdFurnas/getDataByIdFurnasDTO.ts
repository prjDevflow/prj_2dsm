import * as z from "zod";
import {Furnas} from "../../entities/furnas/Furnas";

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
  dateInit: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  dateEnd: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
});

export type IGetDataByIdFurnas = z.infer<typeof getDataByIdFurnasSchema>;

export interface IGetDataByIdFurnasResponse {
  registers: Furnas[]; // Alterar classe para Furnas
  total: number;
  offset: number;
  limit: number;
  nextOffset?: number;
  prevOffset?: number;
}

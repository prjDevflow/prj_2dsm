import * as z from "zod";
import { Sima } from "../../entities/sima/Sima";

export const getDataByIdSimaSchema = z.object({
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
  rotulo: z.string().optional(),
});

export type IGetDataByIdSima = z.infer<typeof getDataByIdSimaSchema>;

export interface IGetDataByIdSimaResponse {
  registers: Sima[];
  total: number;
  offset: number;
  limit: number;
  nextOffset?: number;
  prevOffset?: number;
}

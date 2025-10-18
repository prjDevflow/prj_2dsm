import * as z from "zod";



export const getDataByIdFurnasSchema = z.object({
  reservatorio: z.string(),
  offset: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default(0),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional()
     .default(20),
});

export type IGetDataByIdFurnas = z.infer<typeof getDataByIdFurnasSchema>;

export interface IGetDataByIdFurnasResponse {
  registers: any[]; // Alterar classe para Furnas
  total: number;
  offset: number;
  limit?: number;
  nextOffset?: number;
  prevOffset?: number;
}

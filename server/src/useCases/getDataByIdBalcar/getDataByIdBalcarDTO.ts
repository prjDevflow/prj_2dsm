import * as z from "zod";

export const getDataByIdBalcarSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
  offset: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default(0),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default(20)
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

export type IGetDataByIdBalcar = z.infer<typeof getDataByIdBalcarSchema>;

export interface IGetDataByIdBalcarResponse {
  registers: any[]; // Alterar classe para Balcar
  total: number;
  offset: number;
  limit: number;
  nextOffset?: number;
  prevOffset?: number;
}

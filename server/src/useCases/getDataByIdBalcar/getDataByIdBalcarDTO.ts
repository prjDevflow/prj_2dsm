import * as z from "zod";




export const getDataByIdBalcarSchema = z.object({
  id: z
    .string()
    .transform((val) => Number(val)) // transforma string -> number
    .refine((val) => !isNaN(val), { message: "id deve ser um número válido" }),

  offset: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .default(0),

  limit: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .optional(),

  dateInit: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),

  dateEnd: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),

  stationName: z.string().optional(),
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

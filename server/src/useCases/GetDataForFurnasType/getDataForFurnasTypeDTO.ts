import * as z from "zod";

export const getDataForFurnasTypeSchema = z.object({
  type: z.enum([""]).optional(),
  rotulo: z.string(),
  instituicao: z.string(),
  idreservatorio: z.number(),

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
    .transform((val) => (val ? new Date(val) : undefined))
    .optional(),
  dateEnd: z
    .string()
    .transform((val) => (val ? new Date(val) : undefined))
    .optional(),
});
export type IGetDataForFurnasType = z.infer<typeof getDataForFurnasTypeSchema>;

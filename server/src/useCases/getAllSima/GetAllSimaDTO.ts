import * as z from "zod";

export const getAllSimaSchema = z.object({
  offset: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default(0),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default(20),
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

export type IGetAllSima = z.infer<typeof getAllSimaSchema>;

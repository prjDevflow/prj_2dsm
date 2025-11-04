import * as z from "zod";

export const getFurnasDataSchema = z.object({
  type: z.string(),
  rotulo: z.string(),
  offset: z.string().transform((val) => parseInt(val, 10)).default(0),
  limit: z.string().transform((val) => parseInt(val, 10)).optional(),
  dateInit: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
  dateEnd: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
});

export type IGetFurnasData = z.infer<typeof getFurnasDataSchema>;
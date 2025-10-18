import * as z from "zod";

export const getDataForGraphicsSchema = z.object({
  type: z.enum(["carbono"]),
  rotulo: z.string(),
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
export type IGetDataForGraphics = z.infer<typeof getDataForGraphicsSchema>;

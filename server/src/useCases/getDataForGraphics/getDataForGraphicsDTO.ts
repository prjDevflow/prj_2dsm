import * as z from "zod";

export const getDataForGraphicsSchema = z.object({
  type: z.enum(["carbono","temperatura1","temperatura2","temperatura3","temperatura4","oxigenioDissolvido", "ph", "clorofila","nutrientes","condutividade","turbidez","radiacao","vento","correntes","precipitacao","qualidadeAgua"]),
  rotulo: z.string(),
  offset: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default(0),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),

  dateInit: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : undefined),
    z.date().optional()
  ),

  dateEnd: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : undefined),
    z.date().optional()
  ),
});
export type IGetDataForGraphics = z.infer<typeof getDataForGraphicsSchema>;

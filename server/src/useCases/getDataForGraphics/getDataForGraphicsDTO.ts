import * as z from "zod";

export const getDataForGraphicsSchema = z.object({
  type: z.enum(["carbono","temperatura","oxigenioDissolvido", "ph", "clorofila","nutrientes","condutividade","turbidez","radiacao","vento","correntes","precipitacao","qualidadeAgua"]),
  rotulo: z.string("Balbina"),
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
export type IGetDataForGraphics = z.infer<typeof getDataForGraphicsSchema>;

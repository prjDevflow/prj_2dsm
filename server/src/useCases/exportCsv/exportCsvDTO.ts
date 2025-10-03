import * as z from "zod";

export const exportCsvSchema = z.object({
  // rotulo: z.string().optional(),
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
  type: z.enum(["sima", "balcar", "furnas"]),
});
export type IExportCsv = z.infer<typeof exportCsvSchema>;

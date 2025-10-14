import * as z from "zod";

export interface IGetCoordinatesResponse {
  id: string;
  rotulo: string;
  latitude: number;
  longitude: number;
}

// schema para validar a entrada
export const GetCoordinatesSchema = z.object({
  type: z.enum(["sima", "balcar", "furnas"]).optional(),
  reservoir: z.string().optional(),
  institution: z.string().optional(),
  dateInit: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  dateEnd: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
});

export type IGetCoordinates = z.infer<typeof GetCoordinatesSchema>

import * as z from "zod";


export interface IGetCoordinatesResponse {
  id: string;
  name?: string;
  latitude: number;
  longitude: number;
  institutionName?: string;
  reservatorioName?: string;
}

// schema para validar a entrada
export const GetCoordinatesSchema = z.object({
  type: z.enum(["sima", "balcar", "furnas"]).optional(),
  instituicao: z.string().optional(),
  reservatorio: z.string().optional(),


});
export type GetCoordinatesParams = z.infer<typeof GetCoordinatesSchema>;

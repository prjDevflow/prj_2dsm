import * as z from "zod";

export interface IGetCoordinatesResponse {
  id: string;
  name?: string;
  latitude: number;
  longitude: number;
}

// schema para validar a entrada
export const GetCoordinatesSchema = z.object({
  type: z.enum(["sima", "balcar", "furnas"]).optional(),
});

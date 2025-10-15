import * as z from "zod";


export interface IGetCoordinatesResponse {
  id: string;
  rotulo: string;
  latitude: number;
  longitude: number;
  institutionName?: string;
  reservatorioName?: string;
}

// schema para validar a entrada
export const GetCoordinatesSchema = z.object({
  type: z.enum(["sima", "balcar", "furnas"]).optional(),
<<<<<<< HEAD
  instituicao: z.string().optional(),
  reservatorio: z.string().optional(),


});
export type GetCoordinatesParams = z.infer<typeof GetCoordinatesSchema>;
=======
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
>>>>>>> 841bd0bcd7752bb57042b97abc28a13b5359350a

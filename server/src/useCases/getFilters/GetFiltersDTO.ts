import * as z from "zod";

export interface IGetFiltersResponse {
  institution: string[];
  reservoir: string[];
}

export const getFiltersSchema = z.object({
  type: z.enum(["balcar", "furnas"]),
});
export type IGetFilters = z.infer<typeof getFiltersSchema>
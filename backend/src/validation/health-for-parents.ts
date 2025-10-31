import { z } from "zod";
import { createTimestampsSchema } from "./timestamps.js";

export const createParentsHealthSchema = z
  .object({
    lastHospitalVisit: z.coerce.date(),
    departments: z.string(),
    diagnoses: z.array(z.string()).default([]),
    medicines: z.array(z.string()).default([]),
  })
  .extend(createTimestampsSchema);

export const updateParentsHealthSchema = createParentsHealthSchema.partial();

export const getParentsHealthByIdSchema = z.object({
  parentsHealthId: z.uuid(),
});

export type CreateParentsHealthRequest = z.infer<
  typeof createParentsHealthSchema
>;
export type UpdateParentsHealthRequest = z.infer<
  typeof updateParentsHealthSchema
>;
export type GetParentsHealthByIdRequest = z.infer<typeof getParentsHealthByIdSchema>;

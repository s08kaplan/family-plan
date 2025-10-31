import { z } from "zod";
import { createTimestampsSchema } from "./timestamps.js";

export const createKidsHealthSchema = z
  .object({
    lastHospitalVisit: z.coerce.date(),
    departments: z.string(),
    diagnoses: z.array(z.string()).default([]),
    medicines: z.array(z.string()).default([]),
  })
  .extend(createTimestampsSchema);

export const updateKidsHealthSchema = createKidsHealthSchema.partial();

export const getKidsHealthByIdSchema = z.object({
  kidsHealthId: z.uuid(),
});

export type CreateKidsHealthRequest = z.infer<typeof createKidsHealthSchema>;
export type UpdateKidsHealthRequest = z.infer<typeof updateKidsHealthSchema>;
export type GetKidsHealthByIdRequest = z.infer<typeof getKidsHealthByIdSchema>;

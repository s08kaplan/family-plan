import { z } from "zod";
import { effectedPartsEnum } from "../schema/daily-exercises.js";
import { createTimestampsSchema } from "./timestamps.js";

const effectedPartsValues = effectedPartsEnum.enumValues;

export const createDailyExercisesSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  sets: z.number().positive().gte(1, "Sets must be at least 1"),
  requiredTools: z.string().optional(),
  /*     effectedBodyParts: z.enum(effectedPartsValues),
   */
  effectedBodyParts: z.array(z.enum(effectedPartsValues)).min(1, "At least one body part is required"),
}).extend(createTimestampsSchema);

export const updateDailyExercisesSchema  = createDailyExercisesSchema.partial()

export const getExerciseByIdSchema = z.object({
        exerciseId: z.uuid()
})

export type CreateExerciseRequest = z.infer<typeof createDailyExercisesSchema>
export type UpdateExerciseRequest = z.infer<typeof updateDailyExercisesSchema>
export type GetExerciseByIdRequest = z.infer<typeof getExerciseByIdSchema>
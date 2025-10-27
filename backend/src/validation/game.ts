import { z } from "zod";
import { createTimestampsSchema } from "./timestamps.js";

export const createGamesSchema = z.object({
    name: z.string(),
    target: z.string(),
    description: z.string(),
    appropriateAge: z.number().positive(),
}).extend(createTimestampsSchema)

export const updateGamesSchema = createGamesSchema.partial()
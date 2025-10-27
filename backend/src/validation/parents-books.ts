import { z } from "zod"
import { createTimestampsSchema } from "./timestamps.js";

export const createBooksForParentsSchema = z.object({
    name: z.string(),
    author: z.string(),
    summary: z.string(),
}).extend(createTimestampsSchema)

export const updateBooksForParentsSchema = createBooksForParentsSchema.partial()
import { z } from "zod";
import { createTimestampsSchema } from "./timestamps.js";

export const createDailyShoppingSchema = z.object({
    requiredProducts: z.string(),
    requiredNumberOfProducts: z.number().gte(0),
}).extend(createTimestampsSchema)

export const updateDailyShoppingSchema = createDailyShoppingSchema.partial()
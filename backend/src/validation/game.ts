import { z } from "zod";
import { createTimestampsSchema } from "./timestamps.js";

export const createGamesSchema = z.object({
    name: z.string(),
    target: z.string(),
    description: z.string(),
    appropriateAge: z.number().positive(),
}).extend(createTimestampsSchema)

export const updateGamesSchema = createGamesSchema.partial()

export const getGameByIdSchema = z.object({
        gameId: z.uuid()
})

export type CreateGameRequest = z.infer<typeof createGamesSchema>
export type UpdateGameRequest = z.infer<typeof updateGamesSchema>
export type GetGameByIdRequest = z.infer<typeof getGameByIdSchema>
import { z } from "zod"

export const createTimestampsSchema = {
    created_at: z.date().optional(),
    updated_at: z.date().optional(),
    deleted_at: z.date().optional()
}
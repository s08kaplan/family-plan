import { z } from "zod"
import { createTimestampsSchema } from "./timestamps.js";

export const createBooksForKidsSchema = z.object({
    name: z.string(),
    author: z.string(),
    summary: z.string(),
}).extend(createTimestampsSchema)

export const updateBooksForKidsSchema = createBooksForKidsSchema.partial()

export const getBookByIdSchema = z.object({
        bookId: z.uuid()
})

export type CreateBookRequest = z.infer<typeof createBooksForKidsSchema>
export type UpdateBookRequest = z.infer<typeof updateBooksForKidsSchema>
export type GetBookByIdRequest = z.infer<typeof getBookByIdSchema>
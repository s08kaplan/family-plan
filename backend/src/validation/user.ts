import { z } from "zod";
import { createTimestampsSchema } from "./timestamps.js";

export const createUserSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  email: z.email(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,20}$/,
      "Password must be 6-20 characters with uppercase, lowercase, number, and special character (@$!%*?&)"
    )
    .trim(),
  image: z.string().trim(),
  role: z.string().trim(),
}).extend(createTimestampsSchema);

export const updateUserSchema = createUserSchema.partial()

export const getUserByIdSchema = z.object({
        userId: z.uuid()
})

export type CreateUserRequest = z.infer<typeof createUserSchema>
export type UpdateUserRequest = z.infer<typeof updateUserSchema>
export type GetUserByIdRequest = z.infer<typeof getUserByIdSchema>

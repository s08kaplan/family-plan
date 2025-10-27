import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator"
import {
    createUserSchema,
    updateUserSchema,
    getUserByIdSchema,
    type CreateUserRequest,
    type UpdateUserRequest,
    type GetUserByIdRequest
} from "../validation/user.js"
import type { ApiResponse } from "../types/api-response.js";
import type { User } from "../types/types.js";
import * as userController from "../controller/user.js"


const userRouter = new Hono()


userRouter.post(
  "/users",
  zValidator("json", createUserSchema),
  async (c) => {
    try {
      const data = c.req.valid("json") as CreateUserRequest
      const result = await userController.createUser(data)
      return c.json(result as ApiResponse<User>, result.success ? 201 : 400)
    } catch (error) {
      return c.json(
        {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        } as ApiResponse<null>,
        500
      )
    }
  }
)


userRouter.get("/users", async (c) => {
  try {
    const result = await userController.getAllUsers()
    return c.json(result as ApiResponse<User[]>)
  } catch (error) {
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse<null>,
      500
    )
  }
})


userRouter.get(
  "/:userId",
  zValidator("param", getUserByIdSchema),
  async (c) => {
    try {
      const { userId } = c.req.valid("param") as GetUserByIdRequest
      const result = await userController.getUserById(userId)
      return c.json(result as ApiResponse<User>, result.success ? 200 : 404)
    } catch (error) {
      return c.json(
        {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        } as ApiResponse<null>,
        500
      )
    }
  }
)

userRouter.put(
  "/:userId",
  zValidator("param", getUserByIdSchema),
  zValidator("json", updateUserSchema),
  async (c) => {
    try {
      const { userId } = c.req.valid("param") as GetUserByIdRequest
      const data = c.req.valid("json") as UpdateUserRequest
      const result = await userController.updateUserById(userId, data)
      return c.json(result as ApiResponse<User>, result.success ? 200 : 404)
    } catch (error) {
      return c.json(
        {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        } as ApiResponse<null>,
        500
      )
    }
  }
)

userRouter.delete(
  "/:userId",
  zValidator("param", getUserByIdSchema),
  async (c) => {
    try {
      const { userId } = c.req.valid("param") as GetUserByIdRequest
      const result = await userController.deleteUserById(userId)
      return c.json(result as ApiResponse<null>, result.success ? 200 : 404)
    } catch (error) {
      return c.json(
        {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        } as ApiResponse<null>,
        500
      )
    }
  }
)

export default userRouter
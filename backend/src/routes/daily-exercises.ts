import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator"
import {
    createDailyExercisesSchema,
    updateDailyExercisesSchema,
    getExerciseByIdSchema,
    type CreateExerciseRequest,
    type UpdateExerciseRequest,
    type GetExerciseByIdRequest
} from "../validation/daily-exercises.js"
import type { ApiResponse } from "../types/api-response.js";
import type { DailyExercises } from "../types/types.js";
import * as dailyExercisesController from "../controller/daily-exercises.js"


const dailyExercisesRouter = new Hono()


dailyExercisesRouter.post(
  "/daily-exercises",
  zValidator("json", createDailyExercisesSchema),
  async (c) => {
    try {
      const data = c.req.valid("json") as CreateExerciseRequest
      const result = await dailyExercisesController.createExercise(data)
      return c.json(result as ApiResponse<DailyExercises>, result.success ? 201 : 400)
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


dailyExercisesRouter.get("/daily-exercises", async (c) => {
  try {
    const result = await dailyExercisesController.getAllExercises()
    return c.json(result as ApiResponse<DailyExercises[]>)
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


dailyExercisesRouter.get(
  "/:exerciseId",
  zValidator("param", getExerciseByIdSchema),
  async (c) => {
    try {
      const { exerciseId } = c.req.valid("param") as GetExerciseByIdRequest
      const result = await dailyExercisesController.getExerciseById(exerciseId)
      return c.json(result as ApiResponse<DailyExercises>, result.success ? 200 : 404)
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

dailyExercisesRouter.put(
  "/:exerciseId",
  zValidator("param", getExerciseByIdSchema),
  zValidator("json", updateDailyExercisesSchema),
  async (c) => {
    try {
      const { exerciseId } = c.req.valid("param") as GetExerciseByIdRequest
      const data = c.req.valid("json") as UpdateExerciseRequest
      const result = await dailyExercisesController.updateExerciseById(exerciseId, data)
      return c.json(result as ApiResponse<DailyExercises>, result.success ? 200 : 404)
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

dailyExercisesRouter.delete(
  "/:exerciseId",
  zValidator("param", getExerciseByIdSchema),
  async (c) => {
    try {
      const { exerciseId } = c.req.valid("param") as GetExerciseByIdRequest
      const result = await dailyExercisesController.deleteExerciseById(exerciseId)
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

export default dailyExercisesRouter
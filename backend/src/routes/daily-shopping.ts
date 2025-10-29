import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator"
import {
    createDailyShoppingSchema,
    updateDailyShoppingSchema,
    getShoppingByIdSchema,
    type CreateShoppingRequest,
    type UpdateShoppingRequest,
    type GetShoppingByIdRequest
} from "../validation/daily-shopping.js"
import type { ApiResponse } from "../types/api-response.js";
import type { DailyShopping } from "../types/types.js";
import * as dailyShoppingController from "../controller/daily-shopping.js"


const dailyShoppingRouter = new Hono()


dailyShoppingRouter.post(
  "/daily-shopping",
  zValidator("json", createDailyShoppingSchema),
  async (c) => {
    try {
      const data = c.req.valid("json") as CreateShoppingRequest
      const result = await dailyShoppingController.createShopping(data)
      return c.json(result as ApiResponse<DailyShopping >, result.success ? 201 : 400)
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


dailyShoppingRouter.get("/daily-shopping", async (c) => {
  try {
    const result = await dailyShoppingController.getAllShopping()
    return c.json(result as ApiResponse<DailyShopping[]>)
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


dailyShoppingRouter.get(
  "/:shoppingId",
  zValidator("param", getShoppingByIdSchema),
  async (c) => {
    try {
      const { shoppingId } = c.req.valid("param") as GetShoppingByIdRequest
      const result = await dailyShoppingController.getShoppingById(shoppingId)
      return c.json(result as ApiResponse<DailyShopping>, result.success ? 200 : 404)
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

dailyShoppingRouter.put(
  "/:shoppingId",
  zValidator("param", getShoppingByIdSchema),
  zValidator("json", updateDailyShoppingSchema),
  async (c) => {
    try {
      const { shoppingId } = c.req.valid("param") as GetShoppingByIdRequest
      const data = c.req.valid("json") as UpdateShoppingRequest
      const result = await dailyShoppingController.updateShoppingById(shoppingId, data)
      return c.json(result as ApiResponse<DailyShopping>, result.success ? 200 : 404)
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

dailyShoppingRouter.delete(
  "/:shoppingId",
  zValidator("param", getShoppingByIdSchema),
  async (c) => {
    try {
      const { shoppingId } = c.req.valid("param") as GetShoppingByIdRequest
      const result = await dailyShoppingController.deleteShoppingById(shoppingId)
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

export default dailyShoppingRouter
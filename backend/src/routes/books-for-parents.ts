import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator"
import {
    createBooksForParentsSchema,
    updateBooksForParentsSchema,
    getBookByIdSchema,
    type CreateBookRequest,
    type UpdateBookRequest,
    type GetBookByIdRequest
} from "../validation/parents-books.js"
import type { ApiResponse } from "../types/api-response.js";
import type { BooksForParents } from "../types/types.js";
import * as parentsBooksController from "../controller/books-for-kids.js"


const parentsBooksRouter = new Hono()


parentsBooksRouter.post(
  "/books-for-parents",
  zValidator("json", createBooksForParentsSchema),
  async (c) => {
    try {
      const data = c.req.valid("json") as CreateBookRequest
      const result = await parentsBooksController.createBook(data)
      return c.json(result as ApiResponse<BooksForParents>, result.success ? 201 : 400)
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


parentsBooksRouter.get("/books-for-parents", async (c) => {
  try {
    const result = await parentsBooksController.getAllBooks()
    return c.json(result as ApiResponse<BooksForParents[]>)
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


parentsBooksRouter.get(
  "/:bookId",
  zValidator("param", getBookByIdSchema),
  async (c) => {
    try {
      const { bookId } = c.req.valid("param") as GetBookByIdRequest
      const result = await parentsBooksController.getBookById(bookId)
      return c.json(result as ApiResponse<BooksForParents>, result.success ? 200 : 404)
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

parentsBooksRouter.put(
  "/:bookId",
  zValidator("param", getBookByIdSchema),
  zValidator("json", updateBooksForParentsSchema),
  async (c) => {
    try {
      const { bookId } = c.req.valid("param") as GetBookByIdRequest
      const data = c.req.valid("json") as UpdateBookRequest
      const result = await parentsBooksController.updateBookById(bookId, data)
      return c.json(result as ApiResponse<BooksForParents>, result.success ? 200 : 404)
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

parentsBooksRouter.delete(
  "/:bookId",
  zValidator("param", getBookByIdSchema),
  async (c) => {
    try {
      const { bookId } = c.req.valid("param") as GetBookByIdRequest
      const result = await parentsBooksController.deleteBookById(bookId)
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

export default parentsBooksRouter
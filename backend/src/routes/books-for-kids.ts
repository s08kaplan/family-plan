import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator"
import {
    createBooksForKidsSchema,
    updateBooksForKidsSchema,
    getBookByIdSchema,
    type CreateBookRequest,
    type UpdateBookRequest,
    type GetBookByIdRequest
} from "../validation/kids-books.js"
import type { ApiResponse } from "../types/api-response.js";
import type { BooksForKids } from "../types/types.js";
import * as kidsBooksController from "../controller/books-for-kids.js"


const kidsBooksRouter = new Hono()


kidsBooksRouter.post(
  "/books-for-kids",
  zValidator("json", createBooksForKidsSchema),
  async (c) => {
    try {
      const data = c.req.valid("json") as CreateBookRequest
      const result = await kidsBooksController.createBook(data)
      return c.json(result as ApiResponse<BooksForKids>, result.success ? 201 : 400)
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


kidsBooksRouter.get("/books-for-kids", async (c) => {
  try {
    const result = await kidsBooksController.getAllBooks()
    return c.json(result as ApiResponse<BooksForKids[]>)
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


kidsBooksRouter.get(
  "/:bookId",
  zValidator("param", getBookByIdSchema),
  async (c) => {
    try {
      const { bookId } = c.req.valid("param") as GetBookByIdRequest
      const result = await kidsBooksController.getBookById(bookId)
      return c.json(result as ApiResponse<BooksForKids>, result.success ? 200 : 404)
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

kidsBooksRouter.put(
  "/:bookId",
  zValidator("param", getBookByIdSchema),
  zValidator("json", updateBooksForKidsSchema),
  async (c) => {
    try {
      const { bookId } = c.req.valid("param") as GetBookByIdRequest
      const data = c.req.valid("json") as UpdateBookRequest
      const result = await kidsBooksController.updateBookById(bookId, data)
      return c.json(result as ApiResponse<BooksForKids>, result.success ? 200 : 404)
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

kidsBooksRouter.delete(
  "/:bookId",
  zValidator("param", getBookByIdSchema),
  async (c) => {
    try {
      const { bookId } = c.req.valid("param") as GetBookByIdRequest
      const result = await kidsBooksController.deleteBookById(bookId)
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

export default kidsBooksRouter
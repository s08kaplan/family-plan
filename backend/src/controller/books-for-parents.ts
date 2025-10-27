import { db } from "../configs/dbConnection.js";
import type { CreateBookRequest, UpdateBookRequest } from "../validation/kids-books.js";
import type { ApiResponse } from "../types/api-response.js";
import type { BooksForKids, BooksForParents } from "../types/types.js";
import { eq } from "drizzle-orm";
import { booksForParents } from "../schema/books-for-parents.js";

export const createBook = async (data: CreateBookRequest): Promise<ApiResponse<BooksForParents>> => {
  try {
  
    const result = await db
      .insert(booksForParents)
      .values({
        name: data.name,
        author: data.author,
        summary: data.summary,
      })
      .returning();

    return { success: true, data: result[0], message: "Book created successfully" };
  } catch (error) {
    throw new Error(`Failed to create book: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

export const getBookById = async (bookId:string): Promise<ApiResponse<BooksForKids>> => {
  try {
    const result = await db.select().from(booksForParents).where(eq(booksForParents.id, bookId))

    if(!result.length) {
      return { success: false, error:"Book not found"}
    }
    return { success: true, data: result[0]}
  } catch (error) {
    throw new Error(`Failed to fetch book: ${ error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const getAllBooks = async (): Promise<ApiResponse<BooksForParents[]>> => {
  try {
    const result = await db.select().from(booksForParents)
    return { success: true, data:result}
  } catch (error) {
     throw new Error(`Failed to fetch books: ${ error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const updateBookById = async (
  bookId: string,
  data: UpdateBookRequest
): Promise<ApiResponse<BooksForParents>> => {
  try {
    let updateData: Partial<UpdateBookRequest> = { ...data }

    updateData.updated_at = new Date()

    const result = await db
      .update(booksForParents)
      .set(updateData)
      .where(eq(booksForParents.id, bookId))
      .returning()

    if (!result.length) {
      return { success: false, error: "Book not found" }
    }

    return {
      success: true,
      data: result[0],
      message: "Book updated successfully",
    }
  } catch (error) {
    throw new Error(
      `Failed to update book: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}

export const deleteBookById = async (bookId: string): Promise<ApiResponse<null>> => {
  try {
    await db.delete(booksForParents).where(eq(booksForParents.id, bookId))
    return { success: true, message: "Book deleted successfully" }
  } catch (error) {
    throw new Error(
      `Failed to delete book: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}
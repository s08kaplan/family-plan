import { booksForKids } from "../schema/books-for-kids.js";
import { db } from "../configs/dbConnection.js";
import type { CreateBookRequest, UpdateBookRequest } from "../validation/kids-books.js";
import type { ApiResponse } from "../types/api-response.js";
import type { BooksForKids } from "../types/types.js";
import { eq } from "drizzle-orm";

export const createBook = async (data: CreateBookRequest): Promise<ApiResponse<BooksForKids>> => {
  try {
  
    const result = await db
      .insert(booksForKids)
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
    const result = await db.select().from(booksForKids).where(eq(booksForKids.id, bookId))

    if(!result.length) {
      return { success: false, error:"Book not found"}
    }
    return { success: true, data: result[0]}
  } catch (error) {
    throw new Error(`Failed to fetch book: ${ error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const getAllBooks = async (): Promise<ApiResponse<BooksForKids[]>> => {
  try {
    const result = await db.select().from(booksForKids)
    return { success: true, data:result}
  } catch (error) {
     throw new Error(`Failed to fetch books: ${ error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const updateBookById = async (
  bookId: string,
  data: UpdateBookRequest
): Promise<ApiResponse<BooksForKids>> => {
  try {
    let updateData: Partial<UpdateBookRequest> = { ...data }

    updateData.updated_at = new Date()

    const result = await db
      .update(booksForKids)
      .set(updateData)
      .where(eq(booksForKids.id, bookId))
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
    await db.delete(booksForKids).where(eq(booksForKids.id, bookId))
    return { success: true, message: "Book deleted successfully" }
  } catch (error) {
    throw new Error(
      `Failed to delete book: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}
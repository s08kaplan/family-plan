import { db } from "../configs/dbConnection.js";
import type { ApiResponse } from "../types/api-response.js";
import type { Game } from "../types/types.js";
import { eq } from "drizzle-orm";
import { games } from "../schema/game.js";
import type { CreateGameRequest, UpdateGameRequest } from "../validation/game.js";



export const createGame= async (data: CreateGameRequest): Promise<ApiResponse<Game>> => {
  try {
  
    const result = await db
      .insert(games)
      .values({
        name: data.name,
        target: data.target,
        description: data.description,
        appropriateAge: data.appropriateAge,
      })
      .returning();

    return { success: true, data: result[0], message: "Game created successfully" };
  } catch (error) {
    throw new Error(`Failed to create new game: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

export const getGameById = async (gameId:string): Promise<ApiResponse<Game>> => {
  try {
    const result = await db.select().from(games).where(eq(games.id, gameId))

    if(!result.length) {
      return { success: false, error:"Game not found"}
    }
    return { success: true, data: result[0]}
  } catch (error) {
    throw new Error(`Failed to fetch game: ${ error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const getAllGames = async (): Promise<ApiResponse<Game[]>> => {
  try {
    const result = await db.select().from(games)
    return { success: true, data:result } 
  } catch (error) {
     throw new Error(`Failed to fetch game: ${ error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const updateGameById = async (
  gameId: string,
  data: UpdateGameRequest
): Promise<ApiResponse<Game>> => {
  try {
    const updateData: Record<string, any> = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.target !== undefined) updateData.target = data.target;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.appropriateAge !== undefined) updateData.appropriate_age = data.appropriateAge;
  
    updateData.updated_at = new Date()

    const result = await db
      .update(games )
      .set(updateData)
      .where(eq(games.id, gameId))
      .returning()

    if (!result.length) {
      return { success: false, error: "Game not found" }
    }

    return {
      success: true,
      data: result[0],
      message: "Game updated successfully",
    }
  } catch (error) {
    throw new Error(
      `Failed to update game: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}

export const deleteGameById = async (gameId: string): Promise<ApiResponse<null>> => {
  try {
    await db.delete(games).where(eq(games.id, gameId))
    return { success: true, message: "Game deleted successfully" }
  } catch (error) {
    throw new Error(
      `Failed to delete game: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}
import { db } from "../configs/dbConnection.js";
import type { ApiResponse } from "../types/api-response.js";
import type { DailyExercises } from "../types/types.js";
import { eq } from "drizzle-orm";
import { dailyExercises } from "../schema/daily-exercises.js";
import type { CreateExerciseRequest, UpdateExerciseRequest } from "../validation/daily-exercises.js";

const serializeBodyParts = (parts: string[]): string => {
  return JSON.stringify(parts);
};


export const createExercise = async (data: CreateExerciseRequest): Promise<ApiResponse<DailyExercises>> => {
  try {
  
    const result = await db
      .insert(dailyExercises)
      .values({
        name: data.name,
        sets: data.sets,
        requiredTools: data.requiredTools || null,
        effectedBodyParts: serializeBodyParts(data.effectedBodyParts),
      })
      .returning();

    return { success: true, data: result[0], message: "Exercise created successfully" };
  } catch (error) {
    throw new Error(`Failed to create new exercise: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

export const getExerciseById = async (exerciseId:string): Promise<ApiResponse<DailyExercises>> => {
  try {
    const result = await db.select().from(dailyExercises).where(eq(dailyExercises.id, exerciseId))

    if(!result.length) {
      return { success: false, error:"Exercise not found"}
    }
    return { success: true, data: result[0]}
  } catch (error) {
    throw new Error(`Failed to fetch exercise: ${ error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const getAllExercises = async (): Promise<ApiResponse<DailyExercises[]>> => {
  try {
    const result = await db.select().from(dailyExercises)
    return { success: true, data:result}
  } catch (error) {
     throw new Error(`Failed to fetch exercises: ${ error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const updateExerciseById = async (
  exerciseId: string,
  data: UpdateExerciseRequest
): Promise<ApiResponse<DailyExercises>> => {
  try {
    const updateData: Record<string, any> = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.sets !== undefined) updateData.sets = data.sets;
    if (data.requiredTools !== undefined) updateData.requiredTools = data.requiredTools;
    
    if (data.effectedBodyParts !== undefined) {
      updateData.effectedBodyParts = serializeBodyParts(data.effectedBodyParts);
    }

    updateData.updated_at = new Date()

    const result = await db
      .update(dailyExercises)
      .set(updateData)
      .where(eq(dailyExercises.id, exerciseId))
      .returning()

    if (!result.length) {
      return { success: false, error: "Exercise not found" }
    }

    return {
      success: true,
      data: result[0],
      message: "Exercise updated successfully",
    }
  } catch (error) {
    throw new Error(
      `Failed to update exercise: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}

export const deleteExerciseById = async (exerciseId: string): Promise<ApiResponse<null>> => {
  try {
    await db.delete(dailyExercises).where(eq(dailyExercises.id, exerciseId))
    return { success: true, message: "Exercise deleted successfully" }
  } catch (error) {
    throw new Error(
      `Failed to delete exercise: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}
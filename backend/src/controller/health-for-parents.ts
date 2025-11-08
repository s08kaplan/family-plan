import { db } from "../configs/dbConnection.js";
import type { ApiResponse } from "../types/api-response.js";
import type { ParentsHealth } from "../types/types.js";
import { eq } from "drizzle-orm";
import { parentsHealth } from "../schema/health-for-parents.js";
import type { CreateParentsHealthRequest, UpdateParentsHealthRequest } from "../validation/health-for-parents.js";



export const createParentsHealth = async (userId: number,data: CreateParentsHealthRequest): Promise<ApiResponse<ParentsHealth>> => {
  try {
  
    const result = await db
      .insert(parentsHealth)
      .values({
        userId,
        lastHospitalVisit: data.lastHospitalVisit.toISOString().split('T')[0],
        departments: data.departments,
        diagnoses: data.diagnoses,
        medicines: data.medicines,
      })
      .returning();

    return { success: true, data: result[0], message: "Parent health data created successfully" };
  } catch (error) {
    throw new Error(`Failed to create new Parent health data: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

export const getParentsHealthById = async (parentsHealthId:string): Promise<ApiResponse<ParentsHealth>> => {
  try {
    const result = await db.select().from(parentsHealth).where(eq(parentsHealth.id, parentsHealthId))

    if(!result.length) {
      return { success: false, error:"Parent health data not found"}
    }
    return { success: true, data: result[0]}
  } catch (error) {
    throw new Error(`Failed to fetch Parent health data: ${ error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const getAllParentsHealth = async (): Promise<ApiResponse<ParentsHealth[]>> => {
  try {
    const result = await db.select().from(parentsHealth)
    return { success: true, data:result } 
  } catch (error) {
     throw new Error(`Failed to fetch Parent health data: ${ error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const updateParentsHealthById = async (
  parentsHealthId: string,
  data: UpdateParentsHealthRequest
): Promise<ApiResponse<ParentsHealth>> => {
  try {
    const updateData: Record<string, any> = {};

    if (data.lastHospitalVisit !== undefined) updateData.name = data.lastHospitalVisit.toISOString().split('T')[0];
    if (data.departments !== undefined) updateData.target = data.departments;
    if (data.diagnoses !== undefined) updateData.description = data.diagnoses;
    if (data.medicines !== undefined) updateData.appropriate_age = data.medicines;
  
    updateData.updated_at = new Date()

    const result = await db
      .update(parentsHealth )
      .set(updateData)
      .where(eq(parentsHealth.id, parentsHealthId))
      .returning()

    if (!result.length) {
      return { success: false, error: "Parent health data not found" }
    }

    return {
      success: true,
      data: result[0],
      message: "Parent health data updated successfully",
    }
  } catch (error) {
    throw new Error(
      `Failed to update Parent health data: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}

export const deleteParentsHealthById = async (parentsHealthId: string): Promise<ApiResponse<null>> => {
  try {
    await db.delete(parentsHealth).where(eq(parentsHealth.id, parentsHealthId))
    return { success: true, message: "Parent health data deleted successfully" }
  } catch (error) {
    throw new Error(
      `Failed to delete Parent health data: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}
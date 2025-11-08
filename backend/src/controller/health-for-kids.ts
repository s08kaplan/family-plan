import { db } from "../configs/dbConnection.js";
import type { ApiResponse } from "../types/api-response.js";
import type { HealthForKids } from "../types/types.js";
import { eq } from "drizzle-orm";
import { kidsHealth } from "../schema/health-for-kids.js";
import type { CreateKidsHealthRequest, UpdateKidsHealthRequest } from "../validation/health-for-kids.js";



export const createKidHealth = async (userId: number,data: CreateKidsHealthRequest): Promise<ApiResponse<HealthForKids>> => {
  try {
  
    const result = await db
      .insert(kidsHealth)
      .values({
        userId,
        lastHospitalVisit: data.lastHospitalVisit.toISOString().split('T')[0],
        departments: data.departments,
        diagnoses: data.diagnoses,
        medicines: data.medicines,
      })
      .returning();

    return { success: true, data: result[0], message: "Kid health data created successfully" };
  } catch (error) {
    throw new Error(`Failed to create new kid's health: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

export const getKidHealthById = async (kidsHealthId:string): Promise<ApiResponse<HealthForKids>> => {
  try {
    const result = await db.select().from(kidsHealth).where(eq(kidsHealth.id, kidsHealthId))

    if(!result.length) {
      return { success: false, error:"Kid health data not found"}
    }
    return { success: true, data: result[0]}
  } catch (error) {
    throw new Error(`Failed to fetch kid health data: ${ error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const getAllKidHealthData = async (): Promise<ApiResponse<HealthForKids[]>> => {
  try {
    const result = await db.select().from(kidsHealth)
    return { success: true, data:result } 
  } catch (error) {
     throw new Error(`Failed to fetch kid health data: ${ error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const updateKidHealthById = async (
  kidsHealthId: string,
  data: UpdateKidsHealthRequest
): Promise<ApiResponse<HealthForKids>> => {
  try {
    const updateData: Record<string, any> = {};

    if (data.lastHospitalVisit !== undefined) updateData.name = data.lastHospitalVisit;
    if (data.departments !== undefined) updateData.target = data.departments;
    if (data.diagnoses !== undefined) updateData.description = data.diagnoses;
    if (data.medicines !== undefined) updateData.appropriate_age = data.medicines;
  
    updateData.updated_at = new Date()

    const result = await db
      .update(kidsHealth )
      .set(updateData)
      .where(eq(kidsHealth.id, kidsHealthId))
      .returning()

    if (!result.length) {
      return { success: false, error: "Kid health data not found" }
    }

    return {
      success: true,
      data: result[0],
      message: "Kid health data updated successfully",
    }
  } catch (error) {
    throw new Error(
      `Failed to update Kid health data: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}

export const deleteKidHealthById = async (kidsHealthId: string): Promise<ApiResponse<null>> => {
  try {
    await db.delete(kidsHealth).where(eq(kidsHealth.id, kidsHealthId))
    return { success: true, message: "Kid health data deleted successfully" }
  } catch (error) {
    throw new Error(
      `Failed to delete game: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}
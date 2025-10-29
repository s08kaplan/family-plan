import { db } from "../configs/dbConnection.js";
import type { ApiResponse } from "../types/api-response.js";
import type { DailyShopping } from "../types/types.js";
import { eq } from "drizzle-orm";
import { dailyShopping } from "../schema/daily-shopping.js";
import type { CreateShoppingRequest, UpdateShoppingRequest } from "../validation/daily-shopping.js";



export const createShopping= async (data: CreateShoppingRequest): Promise<ApiResponse<DailyShopping >> => {
  try {
  
    const result = await db
      .insert(dailyShopping )
      .values({
        requiredProducts: data.requiredProducts,
        requiredNumberOfProducts: data.requiredNumberOfProducts
      })
      .returning();

    return { success: true, data: result[0], message: "Shopping item created successfully" };
  } catch (error) {
    throw new Error(`Failed to create new shopping item: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

export const getShoppingById = async (shoppingId:string): Promise<ApiResponse<DailyShopping >> => {
  try {
    const result = await db.select().from(dailyShopping ).where(eq(dailyShopping .id, shoppingId))

    if(!result.length) {
      return { success: false, error:"Shopping item not found"}
    }
    return { success: true, data: result[0]}
  } catch (error) {
    throw new Error(`Failed to fetch shopping item: ${ error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const getAllShopping = async (): Promise<ApiResponse<DailyShopping[]>> => {
  try {
    const result = await db.select().from(dailyShopping)
    return { success: true, data:result } 
  } catch (error) {
     throw new Error(`Failed to fetch shopping list: ${ error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const updateShoppingById = async (
  shoppingId: string,
  data: UpdateShoppingRequest
): Promise<ApiResponse<DailyShopping>> => {
  try {
    const updateData: Record<string, any> = {};

    if (data.requiredProducts !== undefined) updateData.required_products = data.requiredProducts;
    if (data.requiredNumberOfProducts !== undefined) updateData.required_number_of_products = data.requiredNumberOfProducts;
  
    updateData.updated_at = new Date()

    const result = await db
      .update(dailyShopping )
      .set(updateData)
      .where(eq(dailyShopping.id, shoppingId))
      .returning()

    if (!result.length) {
      return { success: false, error: "Shopping not found" }
    }

    return {
      success: true,
      data: result[0],
      message: "Shopping updated successfully",
    }
  } catch (error) {
    throw new Error(
      `Failed to update shopping: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}

export const deleteShoppingById = async (shoppingId: string): Promise<ApiResponse<null>> => {
  try {
    await db.delete(dailyShopping ).where(eq(dailyShopping .id, shoppingId))
    return { success: true, message: "Shopping item/list deleted successfully" }
  } catch (error) {
    throw new Error(
      `Failed to delete shopping item/list: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}
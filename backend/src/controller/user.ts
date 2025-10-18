import bcrypt from "bcryptjs";
import { users } from "../schema/user.js";
import { db } from "../configs/dbConnection.js";
import type { CreateUserRequest, UpdateUserRequest } from "../validation/user.js";
import type { ApiResponse } from "../types/api-response.js";
import type { User } from "../types/types.js";
import { eq } from "drizzle-orm";

export const createUser = async (data: CreateUserRequest): Promise<ApiResponse<User>> => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 16);
    const user = await db
      .insert(users)
      .values({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        image: data.image || null,
        role: data.role || "user",
      })
      .returning();

    return { success: true, data: user[0], message: "User created successfully" };
  } catch (error) {
    throw new Error(`Failed to create user: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

export const getUserById = async (userId:string): Promise<ApiResponse<User>> => {
  try {
    const user = await db.select().from(users).where(eq(users.id, userId))

    if(!user.length) {
      return { success: false, error:"User not found"}
    }
    return { success: true, data: user[0]}
  } catch (error) {
    throw new Error(`Failed to fetch user: ${ error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
  try {
    const result = await db.select().from(users)
    return { success: true, data:result}
  } catch (error) {
     throw new Error(`Failed to fetch user: ${ error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const updateUserById = async (
  userId: string,
  data: UpdateUserRequest
): Promise<ApiResponse<User>> => {
  try {
    let updateData: Partial<UpdateUserRequest> = { ...data }

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 16)
    }

    updateData.updated_at = new Date()

    const result = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId))
      .returning()

    if (!result.length) {
      return { success: false, error: "User not found" }
    }

    return {
      success: true,
      data: result[0],
      message: "User updated successfully",
    }
  } catch (error) {
    throw new Error(
      `Failed to update user: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}

export const deleteUserById = async (userId: string): Promise<ApiResponse<null>> => {
  try {
    await db.delete(users).where(eq(users.id, userId))
    return { success: true, message: "User deleted successfully" }
  } catch (error) {
    throw new Error(
      `Failed to delete user: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/timestamps.js";

export const users = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password"),
    image: text("image"),
    role: text("role"),
    ...timestamps
})
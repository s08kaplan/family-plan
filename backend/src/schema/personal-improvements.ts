import { integer, jsonb, pgTable, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/timestamps.js";
import { users } from "./user.js";

export const personalImprovements = pgTable("personal_improvements", {
  id: uuid().primaryKey().defaultRandom(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
   booksRead : jsonb("books_read").$type<string[]>().default([]), 
   exercisesDone:jsonb("exercises_done").$type<string[]>().default([]),
  ...timestamps,
});

import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/timestamps.js";

export const booksForKids = pgTable("books_for_kids", {
    id: uuid().primaryKey().defaultRandom(),
    name: text("name").notNull(),
    author: varchar("author"),
    summary: text("summary"),
    ...timestamps
})
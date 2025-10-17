import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/timestamps.js";

export const booksForParents = pgTable("books_for_parents", {
    id: uuid().primaryKey().defaultRandom(),
    name: text("name").notNull(),
    author: varchar("author"),
    summary: text("summary"),
    ...timestamps
})
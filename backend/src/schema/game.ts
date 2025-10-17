import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/timestamps.js";

export const games = pgTable("games", {
    id: uuid().primaryKey().defaultRandom(),
    name: text("name").notNull(),
    target: text("target"),
    description: text("description").notNull(),
    appropriateAge: text("appropriate_age"),
    ...timestamps
})
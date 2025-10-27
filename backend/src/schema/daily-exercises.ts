import { integer, pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/timestamps.js";

export const effectedPartsEnum = pgEnum("effectedBodyParts", ["wrist", "biceps", "triceps", "upperback", "lowerback", "waist", "calf", "thigh", "quads", "upperchest", "lowerchest", "shoulders", "abs" ])

export const dailyExercises = pgTable("daily_exercises", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar("name").notNull(),
    sets: integer("sets"),
    requiredTools: varchar("required_tools"),
    effectedBodyParts: text("effected_body_parts"),
    ...timestamps
})
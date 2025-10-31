import { date, integer, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/timestamps.js";
import { users } from "./user.js";

export const parentsHealth = pgTable("parents_health", {
  id: uuid().primaryKey().defaultRandom(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  lastHospitalVisit: date("last_hospital_visit").notNull(),
  departments: text("departments"),
  diagnoses: jsonb("diagnoses").$type<string[]>().notNull().default([]),
  medicines: jsonb("medicines").$type<string[]>().default([]),
  ...timestamps,
});

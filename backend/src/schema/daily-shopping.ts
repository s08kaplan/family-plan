import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/timestamps.js";

export const dailyShopping = pgTable("daily_shopping", {
    id: uuid().primaryKey().defaultRandom(),
    requiredProducts: text("required_products").notNull(),
    requiredNumberOfProducts: integer("required_number_of_products"),
    ...timestamps
})
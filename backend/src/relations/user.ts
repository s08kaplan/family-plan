import { relations } from "drizzle-orm";
import { users } from "../schema/user.js";
import { kidsHealth } from "../schema/health-for-kids.js";
import { parentsHealth } from "../schema/health-for-parents.js";
import { personalImprovements } from "../schema/personal-improvements.js";

export const userRelations = relations(users, ({ many })=> ({
    kidsHealth : many(kidsHealth),
    parentsHealth: many(parentsHealth),
    personalImprovements: many(personalImprovements)
}))
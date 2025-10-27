import { relations } from "drizzle-orm";
import { users } from "../schema/user.js";
import { personalImprovements } from "../schema/personal-improvements.js";
import { parentsHealth } from "../schema/health-for-parents.js";

export const parentsRelations = relations(parentsHealth, ({ one, many }) => ({
  kid: one(users, {
    fields: [parentsHealth.userId],
    references: [users.id]
  }),
  parentImprovements: many(personalImprovements),
}));

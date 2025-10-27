import { relations } from "drizzle-orm";
import { users } from "../schema/user.js";
import { kidsHealth } from "../schema/health-for-kids.js";
import { personalImprovements } from "../schema/personal-improvements.js";

export const kidsRelations = relations(kidsHealth, ({ one, many }) => ({
  kid: one(users, {
    fields: [kidsHealth.userId],
    references: [users.id]
  }),
  kidImprovements: many(personalImprovements),
}));

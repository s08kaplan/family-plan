import type { InferInsertModel, InferSelectModel} from "drizzle-orm"
import type { users } from "../schema/user.js"
import type { booksForKids } from "../schema/books-for-kids.js"
import type { booksForParents } from "../schema/books-for-parents.js"
import type { dailyExercises } from "../schema/daily-exercises.js"
import type { dailyShopping } from "../schema/daily-shopping.js"
import type { games } from "../schema/game.js"
import type { kidsHealth } from "../schema/health-for-kids.js"
import type { parentsHealth } from "../schema/health-for-parents.js"
import type { personalImprovements } from "../schema/personal-improvements.js"

export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>

export type BooksForKids = InferSelectModel<typeof booksForKids>
export type NewbooksForKids = InferInsertModel<typeof booksForKids>

export type BooksForParents = InferSelectModel<typeof booksForParents>
export type NewBooksForParents = InferInsertModel<typeof booksForParents>

export type DailyExercises = InferSelectModel<typeof dailyExercises>
export type NewDailyExercises = InferInsertModel<typeof dailyExercises>

export type DailyShopping = InferSelectModel<typeof dailyShopping>
export type NewDailyShopping = InferInsertModel<typeof dailyShopping>

export type Game = InferSelectModel<typeof games>
export type NewGame = InferInsertModel<typeof games>

export type HealthForKids = InferSelectModel<typeof kidsHealth>
export type NewHealthForKids = InferInsertModel<typeof kidsHealth>

export type ParentsHealth = InferSelectModel<typeof parentsHealth>
export type NewParentsHealth = InferInsertModel<typeof parentsHealth>

export type PersonalImprovements = InferSelectModel<typeof personalImprovements>
export type NewPersonalImprovements = InferInsertModel<typeof personalImprovements>
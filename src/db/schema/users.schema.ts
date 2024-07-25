import { int, varchar, mysqlTable, timestamp, datetime,uniqueIndex } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const UserSchema = mysqlTable('users', {
  id: int("id").autoincrement().primaryKey(),
  // fullName: varchar("name",{ length :100 }).notNull(),
  email: varchar("email",{ length :100 }).notNull(),
  // username: varchar("username",{ length :256 }).notNull(),
  password: varchar("password",{ length :256 }).notNull(),
  // role:int("role_id").notNull(),
  createAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (UserSchema) => ({
  emailIndex: uniqueIndex('email_idx').on(UserSchema.email),
}));








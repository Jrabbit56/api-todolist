import { 
  int, 
  varchar, 
  mysqlTable, 
  timestamp, 
  datetime, 
  uniqueIndex
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const users = mysqlTable('users', {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  // Timestamps
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (users) => ({
  emailIndex: uniqueIndex('email_idx').on(users.email),
}));




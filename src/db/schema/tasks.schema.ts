import { int, mysqlTable, timestamp, varchar, mysqlEnum } from "drizzle-orm/mysql-core";

export const taskTable = mysqlTable('task',{
    id: int('id').autoincrement().primaryKey(),
    userId: int('user_id').references(() => usersTable.id),
    title: varchar('title',{length :255}).notNull(),
    description: varchar('description',{length :255}),
    status: mysqlEnum('status', ['completed', 'in_progress']).default('in_progress'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
    createByID: int('create_by_id'),
    updatedByID: int('updated_by_id'),
});

export type Task = typeof taskTable.$inferSelect;
export type NewTask = typeof taskTable.$inferInsert;

export const usersTable = mysqlTable('users', {
    id: int('id').autoincrement().primaryKey(), 
});
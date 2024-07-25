import { db } from '../db/db';
import { taskTable, Task, NewTask } from '../db/schema/tasks.schema';
import { eq } from 'drizzle-orm';

export class taskModel {

    static async create(task: NewTask): Promise<Task> {
        const [createdTask] = await db.insert(taskTable).values(task).returning();
        return createdTask;
    }

    static async getByUserId(userId: number): Promise<Task[]> {
        const tasks = await db.select().from(taskTable).where(eq(taskTable.userId, userId));
        return tasks;
    }

    static async update(id: number, task: Partial<NewTask>): Promise<Task | undefined> {
        const [updatedTask] = await db
        .update(taskTable)
        .set(task)
        .where(eq(taskTable.id, id))
        .returning();
        return updatedTask;
    }
    
    static async delete(id: number): Promise<void> {
        await db.delete(taskTable).where(eq(taskTable.id, id));
    }

}
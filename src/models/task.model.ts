import { db } from '../db/db';
import { taskTable, Task, NewTask } from '../db/schema/tasks.schema';
import { eq } from 'drizzle-orm';

export class taskModel {

    static async create(task: NewTask): Promise<Task> {
        const result = await db.insert(taskTable).values(task);
        
        // Fetch the created task
        const createdTask = await db.select().from(taskTable).where(eq(taskTable.id, result.insertId)).limit(1);
        
        return createdTask[0];
      }

    static async getByUserId(userId: number): Promise<Task[]> {
        const tasks = await db.select().from(taskTable).where(eq(taskTable.userId, userId));
        return tasks;
    }

    static async update(id: number, task: Partial<NewTask>): Promise<void> {
        await db.update(taskTable)
          .set(task)
          .where(eq(taskTable.id, id));
      }
        
      static async getById(id: number): Promise<Task | undefined> {
        const [task] = await db.select()
          .from(taskTable)
          .where(eq(taskTable.id, id));
        return task;
      }


    static async delete(id: number): Promise<void> {
        await db.delete(taskTable).where(eq(taskTable.id, id));
    }

}
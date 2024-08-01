
import { taskModel } from '../models/task.model';
import { NewTask, Task } from '../db/schema/tasks.schema';

export class TaskService {
  static async createTask(task: NewTask): Promise<Task> {
    return taskModel.create(task);
  }

  static async getTasksByUserId(userId: number): Promise<Task[]> {
    return taskModel.getByUserId(userId);
  }

  static async updateTask(id: number, task: Partial<NewTask>): Promise<Task | undefined> {
    await taskModel.update(id, task);
    return taskModel.getById(id);
  }

  static async deleteTask(id: number): Promise<void> {
    await taskModel.delete(id);
  }
}
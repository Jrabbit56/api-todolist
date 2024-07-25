
import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';

export class TaskController {
  static async create(req: Request, res: Response) {
    try {
      const task = await TaskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  }

  static async getByUserId(req: Request, res: Response) {
    try {
        const tasks = await TaskService.getTasksByUserId(Number(req.params.userId));
        if (tasks && tasks.length > 0) {
            res.json(tasks);
        } else {
            res.status(404).json({ error: 'No tasks found for this user' });
        }
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
}

  static async update(req: Request, res: Response) {
    try {
      const task = await TaskService.updateTask(Number(req.params.id), req.body);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await TaskService.deleteTask(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }
}
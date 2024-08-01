
import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';
import { NewTask } from '../db/schema/tasks.schema';

export class TaskController {

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
  
  static async create(req: Request, res: Response) {
    try {
      const { todo, isDone ,userId } = req.body;
      const taskData: NewTask = {
        title: todo, 
        status: isDone ? 'completed' : 'in_progress',
        userId: userId, 
        description: todo,
        createByID: userId, //who created the task
      };
      const task = await TaskService.createTask(taskData);
      // res.status(201).json(task);
      res.status(201).json({
        message: 'Task created successfully',
        success: true,
        data: task
      });
    } catch (error) {
      console.error('Error creating task:', error); // Log the actual error
      res.status(500).json({ error: 'Failed to create task' });
    }
  }

  // static async update(req: Request, res: Response) {
  //   try {
  //     const task = await TaskService.updateTask(Number(req.params.id), req.body);
  //     if (task) {
  //       res.json(task);
  //     } else {
  //       res.status(404).json({ error: 'Task not found' });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: 'Failed to update task' });
  //   }
  // }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { todo, isDone } = req.body;
  
      if (!todo && isDone === undefined) {
        return res.status(400).json({ error: 'No update data provided' });
      }
  
      const updateData: Partial<NewTask> = {};
      if (todo !== undefined) {
        updateData.title = todo;
        updateData.description = todo;
      }
      if (isDone !== undefined) {
        // updateData.isDone = isDone;
      }
  
      const updatedTask = await TaskService.updateTask(Number(id), updateData);
  
      if (updatedTask) {
        res.json(updatedTask);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      console.error('Error updating task:', error);
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
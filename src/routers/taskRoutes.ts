import express from 'express';
import { TaskController } from '../controller/taskController';

const router = express.Router();

router.post('/tasks', TaskController.create);
router.put('/tasks/:id', TaskController.update);
router.delete('/tasks/:id', TaskController.delete);
router.get('/tasks/:userId',  TaskController.getByUserId);

export default router;
import express from 'express';
import { TaskController } from '../controller/taskController';
import { authGuard } from '../middlewares/authGuardMiddleware';

const router = express.Router();

router.post('/task', authGuard,TaskController.create);
router.put('/tasks/:id', authGuard,TaskController.updateTask);
router.delete('/tasks/:id', authGuard,TaskController.delete);
router.get('/task',  authGuard,TaskController.getByUserId);

export default router;
import express from 'express';
import { AuthController } from '../controller/authController';
import { validateLoginInput, validateRegisterInput } from '../middlewares/validationMiddleware';

const router = express.Router();
const authController = new AuthController();

router.post('/login', validateLoginInput,authController.login);
router.post('/register', validateRegisterInput,authController.register);

export default router;
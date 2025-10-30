import { Router } from 'express';
import { login, register } from '../controllers/authController';
import { validateLogin, validateRegister } from '../validators/authValidator';

const router = Router();

// Login route
router.post('/login', validateLogin, login);

// Registration route
router.post('/register', validateRegister, register);

export default router;
import { Router } from 'express';
// user controllers
import { register, login, checkUser } from '../controllers/userController.js';

const router = Router();

// POST /register
router.post('/register', register);


// POST /login
router.post('/login', login);


// GET /check
router.get('/check', checkUser);

export default router;

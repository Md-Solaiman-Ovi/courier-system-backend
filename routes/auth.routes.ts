import express from 'express';
import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
const router:Router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
import express from 'express';
import User from '../models/User';
import { requireRole } from '../middlewares/auth.middleware';
import { Router } from 'express';
const router:Router = express.Router();

// Admin-only route to list all users
router.get('/', requireRole(['admin']), async (_req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

export default router;

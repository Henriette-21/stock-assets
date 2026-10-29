import express from 'express';
import { 
  getUsers, 
  getUserProfile, 
  createUser, // 1. Import createUser here
  updateUserRole, 
  deleteUser 
} from '../controllers/userController.js';
import { verifyToken, checkRole } from '../middleware/auth.js';

const router = express.Router();

// Get all users (Restricted to super_admin and admin)
router.get('/', verifyToken, checkRole(['super_admin', 'admin']), getUsers);

// Get logged-in user's profile
router.get('/profile', verifyToken, getUserProfile);

// 2. Add the POST route to create users (Restricted to super_admin only)
router.post('/', verifyToken, checkRole(['super_admin']), createUser);

// Update user role (Restricted to super_admin only)
router.patch('/:id/role', verifyToken, checkRole(['super_admin']), updateUserRole);

// Delete user (Restricted to super_admin only)
router.delete('/:id', verifyToken, checkRole(['super_admin']), deleteUser);

export default router;
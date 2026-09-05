import express from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/taskController';
import { authMiddleware } from '../middleware/auth'; // PRIDAJ TENTO IMPORT

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
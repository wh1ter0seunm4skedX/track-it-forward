import express from 'express';
import { createGoal, updateGoal, getGoals, deleteGoal } from '../controllers/goalController';

const router = express.Router();

// Route to create a new financial goal
router.post('/', createGoal);

// Route to update an existing financial goal
router.put('/:id', updateGoal);

// Route to get all financial goals
router.get('/', getGoals);

// Route to delete a financial goal
router.delete('/:id', deleteGoal);

export default router;
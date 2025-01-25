import { Request, Response } from 'express';
import { Goal } from '../types/goal';

// In-memory storage for testing
let goals: Goal[] = [];

export const createGoal = (req: Request, res: Response) => {
  const goal: Goal = {
    id: Date.now().toString(),
    ...req.body,
    currentAmount: 0
  };
  goals.push(goal);
  res.status(201).json(goal);
};

export const getGoals = (req: Request, res: Response) => {
  res.json(goals);
};

export const updateGoal = (req: Request, res: Response) => {
  const { id } = req.params;
  const goalIndex = goals.findIndex(g => g.id === id);
  
  if (goalIndex === -1) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  goals[goalIndex] = { ...goals[goalIndex], ...req.body };
  res.json(goals[goalIndex]);
};

export const deleteGoal = (req: Request, res: Response) => {
  const { id } = req.params;
  goals = goals.filter(g => g.id !== id);
  res.status(200).json({ message: 'Goal deleted' });
};
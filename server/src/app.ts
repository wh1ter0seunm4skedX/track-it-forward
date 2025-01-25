import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createGoal, updateGoal, getGoals, deleteGoal } from './controllers/goalController';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.post('/api/goals', createGoal);
app.put('/api/goals/:id', updateGoal);
app.get('/api/goals', getGoals);
app.delete('/api/goals/:id', deleteGoal);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
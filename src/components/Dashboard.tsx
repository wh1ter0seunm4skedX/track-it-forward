import React, { useState } from 'react';
import { Goal, SortOption, FilterOption } from '../types/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus } from 'lucide-react';
import { Modal } from './Modal';
import { GoalList } from './goals/GoalList';
import { GoalForm } from './goals/GoalForm';
import { Button } from './shared/Button';

// Mock initial data
const initialGoals: Goal[] = [
  {
    id: '1',
    name: 'New Car',
    description: 'Save for a new electric vehicle',
    target_amount: 45000,
    current_amount: 15000,
    target_date: '2024-12-31',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '2',
    name: 'House Down Payment',
    description: 'Save for a house down payment',
    target_amount: 60000,
    current_amount: 30000,
    target_date: '2025-06-30',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '3',
    name: 'Emergency Fund',
    description: '6 months of living expenses',
    target_amount: 20000,
    current_amount: 12000,
    target_date: '2024-08-31',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '4',
    name: 'Gaming PC',
    description: 'Build a high-end gaming computer setup',
    target_amount: 8000,
    current_amount: 2500,
    target_date: '2024-09-30',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg',
  },
  {
    id: '5',
    name: 'Vacation Fund',
    description: 'Summer trip to Greece',
    target_amount: 15000,
    current_amount: 4500,
    target_date: '2025-06-15',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg',
  },
  {
    id: '6',
    name: 'Wedding Fund',
    description: 'Save for wedding expenses',
    target_amount: 50000,
    current_amount: 35000,
    target_date: '2024-12-31',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg',
  }
  
];

export function Dashboard() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const handleAddGoal = (goalData: Omit<Goal, 'id' | 'created_at' | 'updated_at' | 'current_amount'>) => {
    const newGoal: Goal = {
      id: String(goals.length + 1),
      current_amount: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...goalData
    };
    setGoals([...goals, newGoal]);
    setIsAddModalOpen(false);
  };

  const handleEditGoal = (goal: Goal) => {
    setSelectedGoal(goal);
  };

  const handleUpdateGoal = (updatedGoalData: Omit<Goal, 'id' | 'created_at' | 'updated_at' | 'current_amount'>) => {
    setGoals(goals.map(goal => 
      goal.id === selectedGoal?.id 
        ? { 
            ...goal,
            ...updatedGoalData,
            updated_at: new Date().toISOString()
          }
        : goal
    ));
    setSelectedGoal(null);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Financial Goals</h1>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            icon={Plus}
          >
            New Goal
          </Button>
        </div>

        <GoalList
          goals={goals}
          onEditGoal={handleEditGoal}
          onDeleteGoal={handleDeleteGoal}
        />

        {/* Progress Chart */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Progress Overview</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={goals.map(goal => ({
                  name: goal.name,
                  current: goal.current_amount,
                  target: goal.target_amount,
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fill: '#4B5563' }} />
                <YAxis tick={{ fill: '#4B5563' }} />
                <Tooltip />
                <Bar dataKey="current" fill="#3B82F6" name="Current Amount" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#93C5FD" name="Target Amount" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Add Goal Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Goal"
        >
          <GoalForm
            onSubmit={handleAddGoal}
            onCancel={() => setIsAddModalOpen(false)}
          />
        </Modal>

        {/* Edit Goal Modal */}
        <Modal
          isOpen={!!selectedGoal}
          onClose={() => setSelectedGoal(null)}
          title="Edit Goal"
        >
          {selectedGoal && (
            <GoalForm
              goal={selectedGoal}
              onSubmit={handleUpdateGoal}
              onCancel={() => setSelectedGoal(null)}
            />
          )}
        </Modal>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { FinancialGoal } from '../types/database';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { differenceInMonths, format } from 'date-fns';
import { Plus, X, Target, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { Modal } from './Modal';

// Mock initial data
const initialGoals: FinancialGoal[] = [
  {
    id: '1',
    user_id: '1',
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
    user_id: '1',
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
    user_id: '1',
    name: 'Emergency Fund',
    description: '6 months of living expenses',
    target_amount: 20000,
    current_amount: 12000,
    target_date: '2024-08-31',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1000',
  },
];

export function Dashboard() {
  const [goals, setGoals] = useState<FinancialGoal[]>(initialGoals);
  const [newGoal, setNewGoal] = useState({
    name: '',
    description: '',
    target_amount: '',
    target_date: '',
    image_url: '',
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<FinancialGoal | null>(null);

  function handleAddGoal(e: React.FormEvent) {
    e.preventDefault();
    const goal: FinancialGoal = {
      id: String(goals.length + 1),
      user_id: '1',
      name: newGoal.name,
      description: newGoal.description,
      target_amount: parseFloat(newGoal.target_amount),
      current_amount: 0,
      target_date: newGoal.target_date,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      image_url: newGoal.image_url,
    };

    setGoals([...goals, goal]);
    setNewGoal({ name: '', description: '', target_amount: '', target_date: '', image_url: '' });
    setIsAddModalOpen(false);
  }

  function handleUpdateAmount(goalId: string, newAmount: number) {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, current_amount: newAmount, updated_at: new Date().toISOString() }
        : goal
    ));
  }

  const calculateMonthlyRequired = (goal: FinancialGoal) => {
    const remaining = goal.target_amount - goal.current_amount;
    const months = differenceInMonths(new Date(goal.target_date), new Date()) || 1;
    return remaining / months;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => setSelectedGoal(goal)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            >
              <div className="relative h-48">
                <img
                  src={goal.image_url}
                  alt={goal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{goal.name}</h3>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Progress
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    {((goal.current_amount / goal.target_amount) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `₪{(goal.current_amount / goal.target_amount) * 100}%` }}
                  />
                </div>
                <div className="mt-4 flex justify-between text-sm text-gray-600">
                  <span>₪{goal.current_amount.toLocaleString()}</span>
                  <span>₪{goal.target_amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Chart */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Progress Overview</h2>
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="current" fill="#3B82F6" name="Current Amount" />
                <Bar dataKey="target" fill="#93C5FD" name="Target Amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Add Goal Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Add Goal Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Goal"
      >
        <form onSubmit={handleAddGoal} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Goal Name</label>
            <input
              type="text"
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={newGoal.image_url}
              onChange={(e) => setNewGoal({ ...newGoal, image_url: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Amount (₪)</label>
            <input
              type="number"
              value={newGoal.target_amount}
              onChange={(e) => setNewGoal({ ...newGoal, target_amount: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Date</label>
            <input
              type="date"
              value={newGoal.target_date}
              onChange={(e) => setNewGoal({ ...newGoal, target_date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Goal
          </button>
        </form>
      </Modal>

      {/* Goal Details Modal */}
      <Modal
        isOpen={!!selectedGoal}
        onClose={() => setSelectedGoal(null)}
        title={selectedGoal?.name || ''}
      >
        {selectedGoal && (
          <div className="space-y-6">
            <img
              src={selectedGoal.image_url}
              alt={selectedGoal.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className="text-gray-600">{selectedGoal.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Target className="w-4 h-4" />
                  <span className="text-sm">Target Amount</span>
                </div>
                <span className="text-lg font-semibold">
                  ₪{selectedGoal.target_amount.toLocaleString()}
                </span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Target Date</span>
                </div>
                <span className="text-lg font-semibold">
                  {format(new Date(selectedGoal.target_date), 'MMM d, yyyy')}
                </span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Current Amount</span>
                </div>
                <span className="text-lg font-semibold">
                  ₪{selectedGoal.current_amount.toLocaleString()}
                </span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Monthly Required</span>
                </div>
                <span className="text-lg font-semibold">
                  ₪{calculateMonthlyRequired(selectedGoal).toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Current Amount
              </label>
              <input
                type="number"
                value={selectedGoal.current_amount}
                onChange={(e) => handleUpdateAmount(selectedGoal.id, parseFloat(e.target.value))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
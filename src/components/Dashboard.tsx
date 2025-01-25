import React, { useState } from 'react';
import { Goal, SortOption, FilterOption } from '../types/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { differenceInMonths, format } from 'date-fns';
import { Plus, X, Target, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { Modal } from './Modal';
import { ArrowUpDown, Filter } from 'lucide-react';

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
  const [newGoal, setNewGoal] = useState({
    name: '',
    description: '',
    target_amount: '',
    target_date: '',
    image_url: '',
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('progress');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  
  const sortedAndFilteredGoals = goals
    .filter(goal => filterBy === 'all' || (filterBy === 'active' && goal.current_amount < goal.target_amount) || (filterBy === 'completed' && goal.current_amount >= goal.target_amount))
    .sort((a, b) => {
      switch (sortBy) {
        case 'progress':
          return (a.current_amount / a.target_amount) - (b.current_amount / b.target_amount);
        case 'target-date':
          return new Date(a.target_date).getTime() - new Date(b.target_date).getTime();
        case 'amount':
          return a.target_amount - b.target_amount;
        default:
          return 0;
      }
    });
    

  function handleAddGoal(e: React.FormEvent) {
    e.preventDefault();
    const goal: Goal = {
      id: String(goals.length + 1),
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

  const calculateMonthlyRequired = (goal: Goal) => {
    const remaining = goal.target_amount - goal.current_amount;
    const months = differenceInMonths(new Date(goal.target_date), new Date()) || 1;
    return remaining / months;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Bar */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="progress">Progress</option>
                <option value="target-date">Target Date</option>
                <option value="amount">Amount</option>
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <div className="relative">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as FilterOption)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Goals</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>New Goal</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedAndFilteredGoals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => setSelectedGoal(goal)}
              className="group bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-48">
                <img
                  src={goal.image_url}
                  alt={goal.name}
                  className="w-full h-full object-cover transform transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{goal.name}</h3>
                  <p className="text-sm text-gray-200 truncate">{goal.description}</p>
                </div>
                {goal.current_amount >= goal.target_amount && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Completed
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">Progress</span>
                  <span className={`text-sm font-semibold ${
                    goal.current_amount >= goal.target_amount ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {((goal.current_amount / goal.target_amount) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      goal.current_amount >= goal.target_amount ? 'bg-green-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${Math.min((goal.current_amount / goal.target_amount) * 100, 100)}%` }}
                  />
                </div>
                <div className="mt-4 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-500">Current</p>
                    <p className="text-sm font-semibold">₪{goal.current_amount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Target</p>
                    <p className="text-sm font-semibold">₪{goal.target_amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Chart with enhanced styling */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6 backdrop-blur-sm bg-white/50">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Progress Overview</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedAndFilteredGoals.map(goal => ({
                  name: goal.name,
                  current: goal.current_amount,
                  target: goal.target_amount,
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fill: '#4B5563' }} />
                <YAxis tick={{ fill: '#4B5563' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar dataKey="current" fill="#3B82F6" name="Current Amount" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#93C5FD" name="Target Amount" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
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

import React from 'react';
import { Goal, SortOption, FilterOption } from '../../types/types';
import { GoalCard } from './GoalCard';
import { Select } from '../shared/Select';
import { Search } from 'lucide-react';

interface GoalListProps {
  goals: Goal[];
  onEditGoal: (goal: Goal) => void;
  onDeleteGoal: (id: string) => void;
  isLoading?: boolean;
}

export const GoalList: React.FC<GoalListProps> = ({
  goals,
  onEditGoal,
  onDeleteGoal,
  isLoading = false
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState<SortOption>('progress');
  const [filterBy, setFilterBy] = React.useState<FilterOption>('all');

  const filteredGoals = goals
    .filter(goal => {
      if (searchTerm) {
        return goal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               goal.description?.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (filterBy === 'all') return true;
      if (filterBy === 'active') return goal.current_amount < goal.target_amount;
      if (filterBy === 'completed') return goal.current_amount >= goal.target_amount;
      return goal.category === filterBy;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'progress':
          return (b.current_amount / b.target_amount) - (a.current_amount / a.target_amount);
        case 'target-date':
          return new Date(a.target_date).getTime() - new Date(b.target_date).getTime();
        case 'amount':
          return b.target_amount - a.target_amount;
        default:
          return 0;
      }
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!goals.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No goals yet</h3>
        <p className="mt-2 text-sm text-gray-500">Get started by creating your first goal!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search goals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <Select
            options={[
              { value: 'progress', label: 'Progress' },
              { value: 'target-date', label: 'Target Date' },
              { value: 'amount', label: 'Amount' }
            ]}
            value={sortBy}
            onChange={(value) => setSortBy(value as SortOption)}
            className="w-full sm:w-40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGoals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onEdit={onEditGoal}
            onDelete={onDeleteGoal}
          />
        ))}
      </div>
    </div>
  );
};
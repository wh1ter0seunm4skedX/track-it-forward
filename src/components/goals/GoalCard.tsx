import React from 'react';
import { differenceInMonths } from 'date-fns';
import { Edit2, Trash2, Calendar, DollarSign } from 'lucide-react';
import { Goal } from '../../types/types';
import { ProgressRing } from '../shared/ProgressRing';
import { Badge } from '../shared/Badge';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onEdit, onDelete }) => {
  const progress = (goal.current_amount / goal.target_amount) * 100;
  const monthsLeft = differenceInMonths(new Date(goal.target_date), new Date());
  const monthlyRequired = (goal.target_amount - goal.current_amount) / monthsLeft;

  const priorityColors = {
    high: 'error',
    medium: 'warning',
    low: 'default'
  };

  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-48">
        <img
          src={goal.image_url}
          alt={goal.name}
          className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 right-4 flex gap-2">
          <Badge variant={priorityColors[goal.priority] as any}>
            {goal.priority}
          </Badge>
          <Badge variant="default">
            {goal.category}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
            <p className="text-sm text-gray-500">{goal.description}</p>
          </div>
          <ProgressRing
            progress={progress}
            size={60}
            variant={progress >= 100 ? 'success' : 'default'}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>{monthsLeft} months left</span>
          </div>
          <div className="flex items-center text-sm">
            <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
            <span>Monthly needed: ₪{monthlyRequired.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(goal)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(goal.id)}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Goal, Priority, Category } from '../../types/types';
import { Button } from '../shared/Button';
import { Select } from '../shared/Select';

interface GoalFormProps {
  goal?: Goal;
  onSubmit: (goal: Omit<Goal, 'id' | 'created_at' | 'updated_at' | 'current_amount'>) => void;
  onCancel: () => void;
}

export const GoalForm: React.FC<GoalFormProps> = ({ goal, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: goal?.name || '',
    description: goal?.description || '',
    target_amount: goal?.target_amount || '',
    target_date: goal?.target_date || '',
    image_url: goal?.image_url || '',
    priority: goal?.priority || 'medium' as Priority,
    category: goal?.category || 'savings' as Category
  });

  const [imagePreview, setImagePreview] = useState(goal?.image_url || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.target_amount) newErrors.target_amount = 'Target amount is required';
    if (!formData.target_date) newErrors.target_date = 'Target date is required';
    if (!formData.image_url) newErrors.image_url = 'Image URL is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        target_amount: Number(formData.target_amount)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Target Amount</label>
          <input
            type="number"
            value={formData.target_amount}
            onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.target_amount && <p className="mt-1 text-sm text-red-600">{errors.target_amount}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Target Date</label>
          <input
            type="date"
            value={formData.target_date}
            onChange={(e) => setFormData({ ...formData, target_date: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.target_date && <p className="mt-1 text-sm text-red-600">{errors.target_date}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <Select
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' }
            ]}
            value={formData.priority}
            onChange={(value) => setFormData({ ...formData, priority: value as Priority })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <Select
            options={[
              { value: 'savings', label: 'Savings' },
              { value: 'investment', label: 'Investment' },
              { value: 'purchase', label: 'Purchase' },
              { value: 'travel', label: 'Travel' },
              { value: 'education', label: 'Education' },
              { value: 'other', label: 'Other' }
            ]}
            value={formData.category}
            onChange={(value) => setFormData({ ...formData, category: value as Category })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          value={formData.image_url}
          onChange={(e) => {
            setFormData({ ...formData, image_url: e.target.value });
            setImagePreview(e.target.value);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.image_url && <p className="mt-1 text-sm text-red-600">{errors.image_url}</p>}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 h-32 w-full object-cover rounded-md"
            onError={() => setImagePreview('')}
          />
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {goal ? 'Update Goal' : 'Create Goal'}
        </Button>
      </div>
    </form>
  );
};
export type Priority = 'low' | 'medium' | 'high';
export type Category = 'savings' | 'investment' | 'purchase' | 'travel' | 'education' | 'other';

export interface Goal {
  id: string;
  name: string;
  description: string | null;
  target_amount: number;
  current_amount: number;
  target_date: string;
  created_at: string;
  updated_at: string;
  image_url: string;
}

export type GoalFormData = Omit<Goal, 'id' | 'created_at' | 'updated_at' | 'current_amount'>;
export type SortOption = 'progress' | 'target-date' | 'amount' | 'priority';
export type FilterOption = 'all' | 'active' | 'completed' | Category;
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

export type GoalFormData = Omit<Goal, 'id' | 'created_at' | 'updated_at'>;

export type SortOption = 'progress' | 'target-date' | 'amount';

export type FilterOption = 'all' | 'active' | 'completed';
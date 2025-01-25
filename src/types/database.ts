export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  monthly_income: number;
  created_at: string;
}

export interface FinancialGoal {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  target_amount: number;
  current_amount: number;
  target_date: string;
  created_at: string;
  updated_at: string;
  image_url: string;
}
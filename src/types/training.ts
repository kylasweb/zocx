export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  value: number;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'document' | 'quiz';
  required: boolean;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  points: number;
  achievement?: Achievement;
  reward?: Reward;
  content: string;
  createdAt: string;
}
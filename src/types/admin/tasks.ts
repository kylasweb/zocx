export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high';
  type: 'rank' | 'investment' | 'referral' | 'training';
  dueDate: string;
  assignedTo: string[];
  rewards: {
    points: number;
    bonus: number;
    rank?: string;
    investmentBonus?: number;
  };
  requirements: {
    personalVolume?: number;
    teamVolume?: number;
    directReferrals?: number;
    investmentAmount?: number;
    trainingModules?: string[];
  };
  progress: number;
  checkIns: Array<{
    id: string;
    timestamp: string;
    status: 'success' | 'missed';
    reward?: {
      points: number;
      bonus: number;
    };
  }>;
  recurrence?: {
    type: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    reminders: number[]; // hours before due date
  };
  createdAt: string;
  updatedAt: string;
}

export interface TaskSettings {
  defaultPriority: 'low' | 'medium' | 'high';
  autoAssign: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    reminders: number[];
  };
  rewards: {
    enabled: boolean;
    pointsPerTask: number;
    bonusThreshold: number;
    rankMultiplier: number;
    investmentMultiplier: number;
  };
  checkIns: {
    enabled: boolean;
    requiredFrequency: 'daily' | 'weekly' | 'monthly';
    bonusPoints: number;
    streakBonus: {
      threshold: number;
      multiplier: number;
    };
  };
  automation: {
    rankTasks: boolean;
    investmentTasks: boolean;
    trainingTasks: boolean;
    referralTasks: boolean;
  };
}
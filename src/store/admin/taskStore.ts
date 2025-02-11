import { create } from 'zustand';
import { Task, TaskSettings } from '../../types/admin/tasks';

interface TaskState {
  tasks: Task[];
  settings: TaskSettings;
  loading: boolean;
  error: string | null;

  // Task Management
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  
  // Task Queries
  getTasksByDate: (date: Date) => Task[];
  getTasksByStatus: (status: Task['status']) => Task[];
  getTasksByType: (type: Task['type']) => Task[];
  getTasksByAssignee: (userId: string) => Task[];
  
  // Check-ins
  recordCheckIn: (taskId: string, status: 'success' | 'missed') => Promise<void>;
  getCheckInStreak: (taskId: string) => number;
  
  // Automation
  generateRankTasks: (userId: string, currentRank: string, targetRank: string) => Promise<void>;
  generateInvestmentTasks: (userId: string, planId: string) => Promise<void>;
  generateTrainingTasks: (userId: string, moduleIds: string[]) => Promise<void>;
  
  // Settings
  updateSettings: (updates: Partial<TaskSettings>) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  settings: {
    defaultPriority: 'medium',
    autoAssign: true,
    notifications: {
      email: true,
      push: true,
      reminders: [24, 12, 1], // hours before due date
    },
    rewards: {
      enabled: true,
      pointsPerTask: 10,
      bonusThreshold: 100,
      rankMultiplier: 1.5,
      investmentMultiplier: 2,
    },
    checkIns: {
      enabled: true,
      requiredFrequency: 'daily',
      bonusPoints: 5,
      streakBonus: {
        threshold: 7,
        multiplier: 1.5,
      },
    },
    automation: {
      rankTasks: true,
      investmentTasks: true,
      trainingTasks: true,
      referralTasks: true,
    },
  },
  loading: false,
  error: null,

  createTask: async (task) => {
    set({ loading: true, error: null });
    try {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        progress: 0,
        checkIns: [],
        ...task,
      };

      set(state => ({
        tasks: [...state.tasks, newTask],
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateTask: async (taskId, updates) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        tasks: state.tasks.map(task =>
          task.id === taskId
            ? {
                ...task,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : task
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteTask: async (taskId) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== taskId),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  getTasksByDate: (date) => {
    const tasks = get().tasks;
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  },

  getTasksByStatus: (status) => {
    return get().tasks.filter(task => task.status === status);
  },

  getTasksByType: (type) => {
    return get().tasks.filter(task => task.type === type);
  },

  getTasksByAssignee: (userId) => {
    return get().tasks.filter(task => task.assignedTo.includes(userId));
  },

  recordCheckIn: async (taskId, status) => {
    set({ loading: true, error: null });
    try {
      const { settings } = get();
      const checkIn = {
        id: `checkin-${Date.now()}`,
        timestamp: new Date().toISOString(),
        status,
      };

      if (status === 'success' && settings.checkIns.enabled) {
        const streak = get().getCheckInStreak(taskId);
        const bonusMultiplier = streak >= settings.checkIns.streakBonus.threshold
          ? settings.checkIns.streakBonus.multiplier
          : 1;

        checkIn.reward = {
          points: Math.round(settings.checkIns.bonusPoints * bonusMultiplier),
          bonus: 0,
        };
      }

      set(state => ({
        tasks: state.tasks.map(task =>
          task.id === taskId
            ? {
                ...task,
                checkIns: [...task.checkIns, checkIn],
                updatedAt: new Date().toISOString(),
              }
            : task
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  getCheckInStreak: (taskId) => {
    const task = get().tasks.find(t => t.id === taskId);
    if (!task) return 0;

    let streak = 0;
    const sortedCheckIns = [...task.checkIns]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    for (const checkIn of sortedCheckIns) {
      if (checkIn.status === 'success') {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  },

  generateRankTasks: async (userId, currentRank, targetRank) => {
    // Implementation for generating rank advancement tasks
    // This would create a series of tasks based on rank requirements
  },

  generateInvestmentTasks: async (userId, planId) => {
    // Implementation for generating investment-related tasks
    // This would create tasks for investment milestones and check-ins
  },

  generateTrainingTasks: async (userId, moduleIds) => {
    // Implementation for generating training-related tasks
    // This would create tasks for completing training modules
  },

  updateSettings: async (updates) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        settings: {
          ...state.settings,
          ...updates,
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
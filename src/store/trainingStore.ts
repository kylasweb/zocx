import { create } from 'zustand';
import { Training, Achievement, Reward } from '../types/training';

interface TrainingState {
  trainings: Training[];
  loading: boolean;
  error: string | null;
  startTraining: (trainingId: string) => void;
  completeTraining: (trainingId: string) => void;
  updateProgress: (trainingId: string, progress: number) => void;
  getTrainingById: (trainingId: string) => Training | undefined;
  getCompletedTrainings: () => Training[];
  getRequiredTrainings: () => Training[];
  getOptionalTrainings: () => Training[];
  getAchievements: () => Achievement[];
  getRewards: () => Reward[];
}

export const useTrainingStore = create<TrainingState>((set, get) => ({
  trainings: [
    {
      id: 'getting-started',
      title: 'Getting Started Guide',
      description: 'Learn the basics of our MLM platform',
      type: 'document',
      required: true,
      status: 'not_started',
      progress: 0,
      points: 100,
      achievement: {
        id: 'first-steps',
        title: 'First Steps',
        description: 'Complete the getting started guide',
        icon: 'award',
      },
      reward: {
        id: 'welcome-bonus',
        title: 'Welcome Bonus',
        description: '$50 bonus for completing orientation',
        value: 50,
      },
      content: 'getting-started-content',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'compensation-plan',
      title: 'Compensation Plan Training',
      description: 'Understand how to earn with our platform',
      type: 'video',
      required: true,
      status: 'not_started',
      progress: 0,
      points: 200,
      achievement: {
        id: 'comp-master',
        title: 'Compensation Master',
        description: 'Master the compensation plan',
        icon: 'award',
      },
      reward: {
        id: 'comp-bonus',
        title: 'Knowledge Bonus',
        description: '$100 bonus for mastering the compensation plan',
        value: 100,
      },
      content: 'compensation-plan-content',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'leadership',
      title: 'Leadership Training',
      description: 'Learn how to build and lead teams',
      type: 'video',
      required: false,
      status: 'not_started',
      progress: 0,
      points: 300,
      achievement: {
        id: 'leader',
        title: 'Emerging Leader',
        description: 'Complete leadership training',
        icon: 'award',
      },
      reward: {
        id: 'leadership-bonus',
        title: 'Leadership Bonus',
        description: '$200 bonus for completing leadership training',
        value: 200,
      },
      content: 'leadership-content',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'product-knowledge',
      title: 'Product Knowledge',
      description: 'Learn about our products and services',
      type: 'quiz',
      required: true,
      status: 'not_started',
      progress: 0,
      points: 150,
      achievement: {
        id: 'product-expert',
        title: 'Product Expert',
        description: 'Master product knowledge',
        icon: 'award',
      },
      reward: {
        id: 'product-bonus',
        title: 'Product Expert Bonus',
        description: '$75 bonus for product mastery',
        value: 75,
      },
      content: 'product-knowledge-content',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'marketing-strategies',
      title: 'Marketing Strategies',
      description: 'Learn effective marketing techniques',
      type: 'document',
      required: false,
      status: 'not_started',
      progress: 0,
      points: 250,
      achievement: {
        id: 'marketing-master',
        title: 'Marketing Master',
        description: 'Complete marketing training',
        icon: 'award',
      },
      reward: {
        id: 'marketing-bonus',
        title: 'Marketing Bonus',
        description: '$150 bonus for marketing expertise',
        value: 150,
      },
      content: 'marketing-strategies-content',
      createdAt: new Date().toISOString(),
    },
  ],
  loading: false,
  error: null,

  startTraining: (trainingId: string) => {
    set((state) => ({
      trainings: state.trainings.map((training) =>
        training.id === trainingId
          ? { ...training, status: 'in_progress' as const, progress: 0 }
          : training
      ),
    }));
  },

  completeTraining: (trainingId: string) => {
    set((state) => ({
      trainings: state.trainings.map((training) =>
        training.id === trainingId
          ? { ...training, status: 'completed' as const, progress: 100 }
          : training
      ),
    }));
  },

  updateProgress: (trainingId: string, progress: number) => {
    set((state) => ({
      trainings: state.trainings.map((training) =>
        training.id === trainingId
          ? { ...training, progress: Math.min(Math.max(progress, 0), 100) }
          : training
      ),
    }));
  },

  getTrainingById: (trainingId: string) => {
    return get().trainings.find((t) => t.id === trainingId);
  },

  getCompletedTrainings: () => {
    return get().trainings.filter((t) => t.status === 'completed');
  },

  getRequiredTrainings: () => {
    return get().trainings.filter((t) => t.required);
  },

  getOptionalTrainings: () => {
    return get().trainings.filter((t) => !t.required);
  },

  getAchievements: () => {
    return get().trainings
      .filter((t) => t.achievement)
      .map((t) => t.achievement) as Achievement[];
  },

  getRewards: () => {
    return get().trainings
      .filter((t) => t.reward)
      .map((t) => t.reward) as Reward[];
  },
}));
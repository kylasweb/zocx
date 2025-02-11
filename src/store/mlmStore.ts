import { create } from 'zustand';
import { Achievement, Training, Commission, NetworkMember, Notification } from '../types/mlm';

interface MLMState {
  achievements: Achievement[];
  trainings: Training[];
  commissions: Commission[];
  networkMembers: NetworkMember[];
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

export const useMLMStore = create<MLMState>((set) => ({
  achievements: [],
  trainings: [],
  commissions: [],
  networkMembers: [],
  notifications: [],
  loading: false,
  error: null,
}));
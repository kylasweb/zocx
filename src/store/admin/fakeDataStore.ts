import { create } from 'zustand';
import { TreeNode } from '../../types/network';

interface FakeDataState {
  fakeUsers: TreeNode[];
  loading: boolean;
  error: string | null;
  addFakeUsers: (users: TreeNode[]) => void;
  removeFakeUsers: (userIds: string[]) => void;
  clearFakeUsers: () => void;
  getFakeUser: (userId: string) => TreeNode | undefined;
  getFakeDownline: (userId: string) => TreeNode[];
  exportFakeData: () => string;
  importFakeData: (data: string) => void;
}

export const useFakeDataStore = create<FakeDataState>((set, get) => ({
  fakeUsers: [],
  loading: false,
  error: null,

  addFakeUsers: (users) => {
    set(state => ({
      fakeUsers: [...state.fakeUsers, ...users],
    }));
  },

  removeFakeUsers: (userIds) => {
    set(state => ({
      fakeUsers: state.fakeUsers.filter(user => !userIds.includes(user.id)),
    }));
  },

  clearFakeUsers: () => {
    set({ fakeUsers: [] });
  },

  getFakeUser: (userId) => {
    return get().fakeUsers.find(user => user.id === userId);
  },

  getFakeDownline: (userId) => {
    const users = get().fakeUsers;
    const downline: TreeNode[] = [];
    
    const findDownline = (id: string) => {
      const children = users.filter(user => user.sponsorId === id);
      children.forEach(child => {
        downline.push(child);
        findDownline(child.id);
      });
    };

    findDownline(userId);
    return downline;
  },

  exportFakeData: () => {
    return JSON.stringify({
      users: get().fakeUsers,
      exportDate: new Date().toISOString(),
      metadata: {
        version: '1.0',
        type: 'fake-data-export',
      },
    }, null, 2);
  },

  importFakeData: (data) => {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed.users)) {
        set({ fakeUsers: parsed.users });
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      set({ error: 'Failed to import data: Invalid format' });
    }
  },
}));
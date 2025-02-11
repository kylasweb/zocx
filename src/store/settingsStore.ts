import { create } from 'zustand';
import { Settings, Profile, SecuritySettings, NotificationPreferences, PaymentMethod } from '../types/settings';

interface SettingsState {
  settings: Settings;
  loading: boolean;
  error: string | null;
  updateProfile: (profile: Partial<Profile>) => Promise<void>;
  updateNotificationPreferences: (preferences: Partial<NotificationPreferences>) => Promise<void>;
  updateSecuritySettings: (settings: Partial<SecuritySettings>) => Promise<void>;
  updatePaymentMethods: (methods: PaymentMethod[]) => Promise<void>;
  setDefaultPaymentMethod: (methodId: string) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: {
    profile: {
      phone: '+1 (555) 123-4567',
      country: 'US',
      timezone: 'America/New_York',
      language: 'en',
      bio: 'Passionate about building successful teams and helping others achieve their goals.',
      socialLinks: {
        facebook: '',
        twitter: '',
        linkedin: '',
      },
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: new Date().toISOString(),
      loginHistory: [
        {
          id: '1',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          device: 'Chrome on Windows',
          location: 'New York, US',
          ip: '192.168.1.1',
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          device: 'Safari on iPhone',
          location: 'Los Angeles, US',
          ip: '192.168.1.2',
        },
      ],
      securityQuestions: [
        {
          question: 'What was your first pet\'s name?',
          answered: true,
        },
        {
          question: 'In what city were you born?',
          answered: true,
        },
      ],
    },
    notifications: {
      email: {
        commission_earned: true,
        rank_advancement: true,
        team_update: true,
        withdrawal_status: true,
        security_alerts: true,
        newsletter: false,
      },
      sms: {
        commission_earned: false,
        rank_advancement: true,
        team_update: false,
        withdrawal_status: true,
        security_alerts: true,
      },
      pushNotifications: {
        enabled: true,
        browser: true,
        mobile: true,
      },
    },
    paymentMethods: [
      {
        id: 'card-1',
        type: 'card',
        lastFour: '4242',
        expiryMonth: '12',
        expiryYear: '24',
        brand: 'visa',
        isDefault: true,
      },
      {
        id: 'bank-1',
        type: 'bank',
        bankName: 'Chase',
        accountNumber: '****5678',
        routingNumber: '****1234',
        isDefault: false,
      },
    ],
    defaultPaymentMethod: 'card-1',
  },
  loading: false,
  error: null,

  updateProfile: async (profile) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        settings: {
          ...state.settings,
          profile: {
            ...state.settings.profile,
            ...profile,
          },
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateNotificationPreferences: async (preferences) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        settings: {
          ...state.settings,
          notifications: {
            ...state.settings.notifications,
            ...preferences,
          },
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateSecuritySettings: async (securitySettings) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        settings: {
          ...state.settings,
          security: {
            ...state.settings.security,
            ...securitySettings,
          },
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updatePaymentMethods: async (methods) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        settings: {
          ...state.settings,
          paymentMethods: methods,
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  setDefaultPaymentMethod: async (methodId) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        settings: {
          ...state.settings,
          defaultPaymentMethod: methodId,
          paymentMethods: state.settings.paymentMethods.map(method => ({
            ...method,
            isDefault: method.id === methodId,
          })),
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
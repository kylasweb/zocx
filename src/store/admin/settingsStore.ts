import { create } from 'zustand';
import { SystemSettings } from '../../types/admin/settings';

interface SettingsState {
  settings: SystemSettings;
  loading: boolean;
  error: string | null;
  updateSettings: <T extends keyof SystemSettings>(
    section: T,
    data: Partial<SystemSettings[T]>
  ) => Promise<void>;
}

export const useAdminSettingsStore = create<SettingsState>((set, get) => ({
  settings: {
    general: {
      siteName: 'MLM Platform',
      siteDescription: 'Your Complete MLM Solution',
      adminEmail: 'admin@example.com',
      supportEmail: 'support@example.com',
      timeZone: 'UTC',
      dateFormat: 'YYYY-MM-DD',
      maintenanceMode: false,
    },
    branding: {
      logo: '/logo.png',
      favicon: '/favicon.ico',
      footerLogo: '/footer-logo.png',
      primaryColor: '#4F46E5',
      secondaryColor: '#10B981',
      socialLinks: {},
    },
    localization: {
      defaultLanguage: 'en',
      availableLanguages: ['en', 'es', 'fr'],
      defaultCurrency: 'USD',
      defaultCryptoCurrency: 'BTC',
      availableCurrencies: ['USD', 'EUR', 'GBP'],
      availableCryptoCurrencies: ['BTC', 'ETH', 'USDT'],
    },
    features: {
      features: {
        faucet: { enabled: true },
        airdrop: { enabled: true },
        rewards: { enabled: true },
        ranking: { enabled: true },
        tasks: { enabled: true },
        badges: { enabled: true },
      },
    },
    rewards: {
      rankingSystem: {
        enabled: true,
        levels: [],
      },
      achievements: [],
    },
    training: {
      categories: [],
      mandatoryTrainings: [],
    },
    communication: {
      smsProviders: [],
      emailProviders: [],
    },
    payment: {
      providers: [],
      minimumWithdrawal: {
        fiat: 10,
        crypto: 50,
      },
      withdrawalFees: {
        fiat: 2.5,
        crypto: 1,
      },
    },
    apis: {
      cryptoAPIs: [],
      tradingAPIs: [],
    },
    security: {
      twoFactorAuth: {
        required: false,
        methods: ['authenticator', 'sms'],
      },
      passwordPolicy: {
        minLength: 8,
        requireSpecialChars: true,
        requireNumbers: true,
        requireUppercase: true,
        expiryDays: 90,
      },
      ipWhitelist: [],
    },
  },
  loading: false,
  error: null,

  updateSettings: async (section, data) => {
    try {
      set({ loading: true });
      // Add audit log entry
      const auditEntry = {
        action: `UPDATE_${section.toUpperCase()}`,
        timestamp: new Date().toISOString(),
        user: get().currentUser,
        changes: data
      };
      // Store update with audit log
      set(state => ({
        settings: {
          ...state.settings,
          [section]: { ...state.settings[section], ...data },
          auditLog: [auditEntry, ...state.settings.auditLog.slice(0, 99)]
        }
      }));
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
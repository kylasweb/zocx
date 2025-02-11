import { create } from 'zustand';
import { Theme, ThemeSettings } from '../../types/admin/theme';

interface ThemeState {
  settings: ThemeSettings;
  loading: boolean;
  error: string | null;
  
  // Theme Management
  createTheme: (theme: Omit<Theme, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTheme: (themeId: string, updates: Partial<Theme>) => Promise<void>;
  deleteTheme: (themeId: string) => Promise<void>;
  duplicateTheme: (themeId: string, newName: string) => Promise<void>;
  setActiveTheme: (themeId: string) => Promise<void>;
  
  // Theme Customization
  customizeTheme: (themeId: string, customizations: Partial<Theme>) => Promise<void>;
  resetCustomizations: (themeId: string) => Promise<void>;
  
  // Dark Mode
  toggleDarkMode: (enabled: boolean) => Promise<void>;
  updateDarkModeSettings: (settings: Partial<ThemeSettings['darkMode']>) => Promise<void>;
  
  // Animation Settings
  updateAnimationSettings: (settings: Partial<ThemeSettings['animations']>) => Promise<void>;
  
  // Theme Export/Import
  exportTheme: (themeId: string) => Promise<string>;
  importTheme: (themeJson: string) => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  settings: {
    activeTheme: 'modern',
    themes: [
      {
        id: 'modern',
        name: 'Modern Theme',
        description: 'A clean, minimalist theme with a focus on readability',
        version: '1.0.0',
        author: 'System',
        colors: {
          light: {
            primary: '#2563EB',
            secondary: '#10B981',
            accent: '#F59E0B',
            background: {
              default: '#FFFFFF',
              paper: '#F8FAFC',
            },
            text: {
              primary: '#1E293B',
              secondary: '#64748B',
              disabled: '#94A3B8',
            },
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#3B82F6',
            success: '#10B981',
          },
          dark: {
            primary: '#3B82F6',
            secondary: '#34D399',
            accent: '#FBBF24',
            background: {
              default: '#0F172A',
              paper: '#1E293B',
            },
            text: {
              primary: '#F8FAFC',
              secondary: '#CBD5E1',
              disabled: '#64748B',
            },
            error: '#F87171',
            warning: '#FBBF24',
            info: '#60A5FA',
            success: '#34D399',
          },
        },
        typography: {
          fontFamily: {
            primary: 'Inter, system-ui, sans-serif',
            secondary: 'Plus Jakarta Sans, sans-serif',
            mono: 'JetBrains Mono, monospace',
          },
          fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
          },
          fontWeight: {
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
          },
          lineHeight: {
            none: 1,
            tight: 1.25,
            normal: 1.5,
            relaxed: 1.75,
            loose: 2,
          },
        },
        spacing: {
          xs: '0.5rem',
          sm: '1rem',
          md: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
          '3xl': '4rem',
          '4xl': '6rem',
        },
        borderRadius: {
          none: '0',
          sm: '0.25rem',
          md: '0.5rem',
          lg: '1rem',
          xl: '1.5rem',
          full: '9999px',
        },
        shadows: {
          none: 'none',
          sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
          md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
        },
        components: {
          button: {
            variants: {
              primary: {
                base: 'bg-primary-600 text-white shadow-sm',
                hover: 'hover:bg-primary-700 hover:shadow-md',
                active: 'active:bg-primary-800 active:shadow',
                disabled: 'opacity-50 cursor-not-allowed',
              },
              secondary: {
                base: 'bg-secondary-600 text-white shadow-sm',
                hover: 'hover:bg-secondary-700 hover:shadow-md',
                active: 'active:bg-secondary-800 active:shadow',
                disabled: 'opacity-50 cursor-not-allowed',
              },
            },
            sizes: {
              sm: 'px-3 py-1.5 text-sm',
              md: 'px-4 py-2 text-base',
              lg: 'px-6 py-3 text-lg',
            },
          },
          input: {
            variants: {
              default: {
                base: 'border-gray-300 bg-white dark:bg-gray-800 shadow-sm',
                focus: 'ring-2 ring-primary-500 border-primary-500',
                error: 'border-red-500 ring-red-500',
                disabled: 'bg-gray-100 cursor-not-allowed',
              },
            },
            sizes: {
              sm: 'px-3 py-1.5 text-sm',
              md: 'px-4 py-2 text-base',
              lg: 'px-6 py-3 text-lg',
            },
          },
          card: {
            variants: {
              default: {
                base: 'bg-white dark:bg-gray-800 shadow-md rounded-lg',
                hover: 'hover:shadow-lg transition-shadow duration-200',
              },
              outlined: {
                base: 'border border-gray-200 dark:border-gray-700 rounded-lg',
                hover: 'hover:border-gray-300 dark:hover:border-gray-600',
              },
            },
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'classic',
        name: 'Classic Theme',
        description: 'A timeless theme with traditional styling',
        version: '1.0.0',
        author: 'System',
        colors: {
          light: {
            primary: '#1D4ED8',
            secondary: '#047857',
            accent: '#B45309',
            background: {
              default: '#FFFFFF',
              paper: '#F9FAFB',
            },
            text: {
              primary: '#111827',
              secondary: '#374151',
              disabled: '#6B7280',
            },
            error: '#DC2626',
            warning: '#D97706',
            info: '#2563EB',
            success: '#059669',
          },
          dark: {
            primary: '#3B82F6',
            secondary: '#10B981',
            accent: '#F59E0B',
            background: {
              default: '#1F2937',
              paper: '#374151',
            },
            text: {
              primary: '#F9FAFB',
              secondary: '#E5E7EB',
              disabled: '#9CA3AF',
            },
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#3B82F6',
            success: '#10B981',
          },
        },
        typography: {
          fontFamily: {
            primary: 'Merriweather, serif',
            secondary: 'Lora, serif',
            mono: 'Fira Code, monospace',
          },
          fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
          },
          fontWeight: {
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
          },
          lineHeight: {
            none: 1,
            tight: 1.25,
            normal: 1.6,
            relaxed: 1.75,
            loose: 2,
          },
        },
        spacing: {
          xs: '0.75rem',
          sm: '1.25rem',
          md: '1.75rem',
          lg: '2.25rem',
          xl: '3rem',
          '2xl': '4rem',
          '3xl': '5rem',
          '4xl': '7rem',
        },
        borderRadius: {
          none: '0',
          sm: '0.125rem',
          md: '0.25rem',
          lg: '0.375rem',
          xl: '0.5rem',
          full: '9999px',
        },
        shadows: {
          none: 'none',
          sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
          md: '0 4px 8px rgba(0, 0, 0, 0.1)',
          lg: '0 8px 16px rgba(0, 0, 0, 0.1)',
          xl: '0 16px 32px rgba(0, 0, 0, 0.1)',
          inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
        },
        components: {
          button: {
            variants: {
              primary: {
                base: 'bg-primary-700 text-white border border-primary-800',
                hover: 'hover:bg-primary-800',
                active: 'active:bg-primary-900',
                disabled: 'opacity-50 cursor-not-allowed',
              },
              secondary: {
                base: 'bg-secondary-700 text-white border border-secondary-800',
                hover: 'hover:bg-secondary-800',
                active: 'active:bg-secondary-900',
                disabled: 'opacity-50 cursor-not-allowed',
              },
            },
            sizes: {
              sm: 'px-4 py-2 text-sm',
              md: 'px-6 py-2.5 text-base',
              lg: 'px-8 py-3 text-lg',
            },
          },
          input: {
            variants: {
              default: {
                base: 'border-gray-400 bg-white dark:bg-gray-700',
                focus: 'ring-1 ring-primary-500 border-primary-500',
                error: 'border-red-500 ring-red-500',
                disabled: 'bg-gray-100 cursor-not-allowed',
              },
            },
            sizes: {
              sm: 'px-4 py-2 text-sm',
              md: 'px-6 py-2.5 text-base',
              lg: 'px-8 py-3 text-lg',
            },
          },
          card: {
            variants: {
              default: {
                base: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
                hover: 'hover:shadow-md transition-shadow duration-200',
              },
              outlined: {
                base: 'border-2 border-gray-300 dark:border-gray-600',
                hover: 'hover:border-gray-400 dark:hover:border-gray-500',
              },
            },
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'vibrant',
        name: 'Vibrant Theme',
        description: 'A bold and energetic theme with vivid colors',
        version: '1.0.0',
        author: 'System',
        colors: {
          light: {
            primary: '#7C3AED',
            secondary: '#06B6D4',
            accent: '#F43F5E',
            background: {
              default: '#FFFFFF',
              paper: '#FAFAFA',
            },
            text: {
              primary: '#18181B',
              secondary: '#3F3F46',
              disabled: '#71717A',
            },
            error: '#E11D48',
            warning: '#EA580C',
            info: '#0284C7',
            success: '#059669',
          },
          dark: {
            primary: '#8B5CF6',
            secondary: '#22D3EE',
            accent: '#FB7185',
            background: {
              default: '#18181B',
              paper: '#27272A',
            },
            text: {
              primary: '#FAFAFA',
              secondary: '#E4E4E7',
              disabled: '#A1A1AA',
            },
            error: '#FB7185',
            warning: '#FB923C',
            info: '#38BDF8',
            success: '#34D399',
          },
        },
        typography: {
          fontFamily: {
            primary: 'Outfit, sans-serif',
            secondary: 'Space Grotesk, sans-serif',
            mono: 'Space Mono, monospace',
          },
          fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.25rem',
            xl: '1.5rem',
            '2xl': '2rem',
            '3xl': '2.5rem',
            '4xl': '3rem',
          },
          fontWeight: {
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
          },
          lineHeight: {
            none: 1,
            tight: 1.2,
            normal: 1.4,
            relaxed: 1.6,
            loose: 1.8,
          },
        },
        spacing: {
          xs: '0.5rem',
          sm: '1rem',
          md: '2rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '6rem',
          '3xl': '8rem',
          '4xl': '12rem',
        },
        borderRadius: {
          none: '0',
          sm: '0.5rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
          full: '9999px',
        },
        shadows: {
          none: 'none',
          sm: '0 4px 6px rgba(0, 0, 0, 0.1)',
          md: '0 8px 12px rgba(0, 0, 0, 0.1)',
          lg: '0 12px 24px rgba(0, 0, 0, 0.1)',
          xl: '0 20px 32px rgba(0, 0, 0, 0.1)',
          inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
        },
        components: {
          button: {
            variants: {
              primary: {
                base: 'bg-primary-500 text-white transform',
                hover: 'hover:bg-primary-600 hover:scale-105',
                active: 'active:bg-primary-700 active:scale-100',
                disabled: 'opacity-50 cursor-not-allowed',
              },
              secondary: {
                base: 'bg-secondary-500 text-white transform',
                hover: 'hover:bg-secondary-600 hover:scale-105',
                active: 'active:bg-secondary-700 active:scale-100',
                disabled: 'opacity-50 cursor-not-allowed',
              },
            },
            sizes: {
              sm: 'px-4 py-2 text-sm rounded-full',
              md: 'px-6 py-3 text-base rounded-full',
              lg: 'px-8 py-4 text-lg rounded-full',
            },
          },
          input: {
            variants: {
              default: {
                base: 'border-2 border-gray-300 bg-white dark:bg-gray-800',
                focus: 'ring-2 ring-primary-400 border-primary-400',
                error: 'border-red-400 ring-red-400',
                disabled: 'bg-gray-100 cursor-not-allowed',
              },
            },
            sizes: {
              sm: 'px-4 py-2 text-sm rounded-full',
              md: 'px-6 py-3 text-base rounded-full',
              lg: 'px-8 py-4 text-lg rounded-full',
            },
          },
          card: {
            variants: {
              default: {
                base: 'bg-white dark:bg-gray-800 shadow-lg transform',
                hover: 'hover:scale-[1.02] hover:shadow-xl transition-all duration-200',
              },
              outlined: {
                base: 'border-2 border-gray-200 dark:border-gray-700 transform',
                hover: 'hover:scale-[1.02] hover:border-primary-400 dark:hover:border-primary-400 transition-all duration-200',
              },
            },
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    customizations: {},
    darkMode: {
      enabled: false,
      auto: true,
      startTime: '18:00',
      endTime: '06:00',
    },
    animations: {
      enabled: true,
      reducedMotion: false,
      duration: {
        fast: 150,
        normal: 300,
        slow: 500,
      },
    },
  },
  loading: false,
  error: null,

  createTheme: async (theme) => {
    set({ loading: true, error: null });
    try {
      const newTheme: Theme = {
        id: `theme-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...theme,
      };

      set(state => ({
        settings: {
          ...state.settings,
          themes: [...state.settings.themes, newTheme],
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateTheme: async (themeId, updates) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        settings: {
          ...state.settings,
          themes: state.settings.themes.map(theme =>
            theme.id === themeId
              ? {
                  ...theme,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : theme
          ),
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteTheme: async (themeId) => {
    set({ loading: true, error: null });
    try {
      if (themeId === 'default') {
        throw new Error('Cannot delete default theme');
      }

      set(state => {
        const newState = {
          ...state,
          settings: {
            ...state.settings,
            themes: state.settings.themes.filter(theme => theme.id !== themeId),
          },
        };

        if (state.settings.activeTheme === themeId) {
          newState.settings.activeTheme = 'default';
        }

        return { ...newState, loading: false };
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  duplicateTheme: async (themeId, newName) => {
    set({ loading: true, error: null });
    try {
      const { settings } = get();
      const sourceTheme = settings.themes.find(theme => theme.id === themeId);
      
      if (!sourceTheme) {
        throw new Error('Theme not found');
      }

      const newTheme: Theme = {
        ...sourceTheme,
        id: `theme-${Date.now()}`,
        name: newName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      set(state => ({
        settings: {
          ...state.settings,
          themes: [...state.settings.themes, newTheme],
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  setActiveTheme: async (themeId) => {
    set({ loading: true, error: null });
    try {
      const { settings } = get();
      const theme = settings.themes.find(t => t.id === themeId);
      
      if (!theme) {
        throw new Error('Theme not found');
      }

      set(state => ({
        settings: {
          ...state.settings,
          activeTheme: themeId,
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  customizeTheme: async (themeId, customizations) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        settings: {
          ...state.settings,
          customizations: {
            ...state.settings.customizations,
            [themeId]: {
              ...state.settings.customizations[themeId],
              ...customizations,
            },
          },
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  resetCustomizations: async (themeId) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        settings: {
          ...state.settings,
          customizations: {
            ...state.settings.customizations,
            [themeId]: undefined,
          },
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  toggleDarkMode: async (enabled) => {
    set(state => ({
      settings: {
        ...state.settings,
        darkMode: {
          ...state.settings.darkMode,
          enabled,
        },
      },
    }));
  },

  updateDarkModeSettings: async (settings) => {
    set(state => ({
      settings: {
        ...state.settings,
        darkMode: {
          ...state.settings.darkMode,
          ...settings,
        },
      },
    }));
  },

  updateAnimationSettings: async (settings) => {
    set(state => ({
      settings: {
        ...state.settings,
        animations: {
          ...state.settings.animations,
          ...settings,
        },
      },
    }));
  },

  exportTheme: async (themeId) => {
    const { settings } = get();
    const theme = settings.themes.find(t => t.id === themeId);
    
    if (!theme) {
      throw new Error('Theme not found');
    }

    return JSON.stringify(theme, null, 2);
  },

  importTheme: async (themeJson) => {
    set({ loading: true, error: null });
    try {
      const theme: Theme = JSON.parse(themeJson);
      
      // Validate theme structure
      if (!theme.name || !theme.colors || !theme.typography) {
        throw new Error('Invalid theme structure');
      }

      const newTheme: Theme = {
        ...theme,
        id: `theme-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      set(state => ({
        settings: {
          ...state.settings,
          themes: [...state.settings.themes, newTheme],
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
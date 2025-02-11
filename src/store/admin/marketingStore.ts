import { create } from 'zustand';
import { MarketingSettings, MarketingTask, MarketingContact, MarketingTemplate, MarketingEvent } from '../../types/admin/marketing';

interface MarketingState {
  settings: MarketingSettings;
  loading: boolean;
  error: string | null;
  addTask: (task: Omit<MarketingTask, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<MarketingTask>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  addContact: (contact: Omit<MarketingContact, 'id' | 'createdAt'>) => Promise<void>;
  updateContact: (contactId: string, updates: Partial<MarketingContact>) => Promise<void>;
  deleteContact: (contactId: string) => Promise<void>;
  addTemplate: (template: Omit<MarketingTemplate, 'id' | 'createdAt'>) => Promise<void>;
  updateTemplate: (templateId: string, updates: Partial<MarketingTemplate>) => Promise<void>;
  deleteTemplate: (templateId: string) => Promise<void>;
  addEvent: (event: Omit<MarketingEvent, 'id' | 'createdAt'>) => Promise<void>;
  updateEvent: (eventId: string, updates: Partial<MarketingEvent>) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  updatePreferences: (updates: Partial<MarketingSettings['preferences']>) => Promise<void>;
}

export const useMarketingStore = create<MarketingState>((set, get) => ({
  settings: {
    tasks: [],
    contacts: [],
    templates: [],
    events: [],
    preferences: {
      defaultEmailTemplate: '',
      defaultSmsTemplate: '',
      autoResponders: true,
      taskNotifications: true,
      eventReminders: true,
    },
  },
  loading: false,
  error: null,

  addTask: async (task) => {
    set({ loading: true, error: null });
    try {
      const newTask: MarketingTask = {
        id: `task-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'pending',
        ...task,
      };
      set(state => ({
        settings: {
          ...state.settings,
          tasks: [...state.settings.tasks, newTask],
        },
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
        settings: {
          ...state.settings,
          tasks: state.settings.tasks.map(task =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        },
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
        settings: {
          ...state.settings,
          tasks: state.settings.tasks.filter(task => task.id !== taskId),
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addContact: async (contact) => {
    set({ loading: true, error: null });
    try {
      const newContact: MarketingContact = {
        id: `contact-${Date.now()}`,
        createdAt: new Date().toISOString(),
        lastContact: new Date().toISOString(),
        ...contact,
      };
      set(state => ({
        settings: {
          ...state.settings,
          contacts: [...state.settings.contacts, newContact],
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateContact: async (contactId, updates) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        settings: {
          ...state.settings,
          contacts: state.settings.contacts.map(contact =>
            contact.id === contactId ? { ...contact, ...updates } : contact
          ),
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteContact: async (contactId) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        settings: {
          ...state.settings,
          contacts: state.settings.contacts.filter(contact => contact.id !== contactId),
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addTemplate: async (template) => {
    set({ loading: true, error: null });
    try {
      const newTemplate: MarketingTemplate = {
        id: `template-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...template,
      };
      set(state => ({
        settings: {
          ...state.settings,
          templates: [...state.settings.templates, newTemplate],
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateTemplate: async (templateId, updates) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        settings: {
          ...state.settings,
          templates: state.settings.templates.map(template =>
            template.id === templateId ? { ...template, ...updates } : template
          ),
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteTemplate: async (templateId) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        settings: {
          ...state.settings,
          templates: state.settings.templates.filter(template => template.id !== templateId),
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addEvent: async (event) => {
    set({ loading: true, error: null });
    try {
      const newEvent: MarketingEvent = {
        id: `event-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'scheduled',
        ...event,
      };
      set(state => ({
        settings: {
          ...state.settings,
          events: [...state.settings.events, newEvent],
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateEvent: async (eventId, updates) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        settings: {
          ...state.settings,
          events: state.settings.events.map(event =>
            event.id === eventId ? { ...event, ...updates } : event
          ),
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteEvent: async (eventId) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        settings: {
          ...state.settings,
          events: state.settings.events.filter(event => event.id !== eventId),
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updatePreferences: async (updates) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        settings: {
          ...state.settings,
          preferences: {
            ...state.settings.preferences,
            ...updates,
          },
        },
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
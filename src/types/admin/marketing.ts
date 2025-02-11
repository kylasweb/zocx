export interface MarketingTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  assignedTo: string[];
  status: 'pending' | 'completed' | 'declined';
  createdAt: string;
}

export interface MarketingContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  group: string[];
  tags: string[];
  notes: string;
  lastContact: string;
  createdAt: string;
}

export interface MarketingTemplate {
  id: string;
  name: string;
  description: string;
  type: 'email' | 'sms' | 'social';
  content: string;
  variables: string[];
  createdAt: string;
}

export interface MarketingEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: 'campaign' | 'meeting' | 'webinar' | 'promotion';
  attendees: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface MarketingSettings {
  tasks: MarketingTask[];
  contacts: MarketingContact[];
  templates: MarketingTemplate[];
  events: MarketingEvent[];
  preferences: {
    defaultEmailTemplate: string;
    defaultSmsTemplate: string;
    autoResponders: boolean;
    taskNotifications: boolean;
    eventReminders: boolean;
  };
}
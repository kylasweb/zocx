// Existing imports...

export interface SEOSettings {
  global: {
    siteName: string;
    titleTemplate: string;
    defaultDescription: string;
    defaultImage: string;
    favicon: string;
    robotsTxt: string;
    sitemapEnabled: boolean;
  };
  social: {
    facebook: {
      appId?: string;
      pageUrl?: string;
    };
    twitter: {
      handle?: string;
      cardType: 'summary' | 'summary_large_image';
    };
    linkedin: {
      companyId?: string;
    };
  };
  structured: {
    organizationType: string;
    localBusiness?: {
      type: string;
      address: string;
      telephone: string;
    };
  };
}

export interface CustomCode {
  id: string;
  name: string;
  type: 'css' | 'javascript';
  location: 'head' | 'body' | 'footer';
  code: string;
  active: boolean;
  loadCondition?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  type: 'link' | 'dropdown' | 'megamenu';
  url?: string;
  icon?: string;
  children?: NavigationItem[];
  columns?: Array<{
    title: string;
    items: NavigationItem[];
  }>;
  roles?: string[];
  order: number;
  active: boolean;
}

export interface CustomForm {
  id: string;
  name: string;
  fields: Array<{
    id: string;
    type: 'text' | 'email' | 'select' | 'checkbox' | 'radio' | 'textarea';
    label: string;
    placeholder?: string;
    required: boolean;
    options?: string[];
    validation?: {
      pattern?: string;
      message?: string;
    };
  }>;
  submitAction: {
    type: 'email' | 'webhook' | 'database';
    config: Record<string, any>;
  };
  styling: {
    theme: 'light' | 'dark';
    layout: 'vertical' | 'horizontal';
    buttonStyle: Record<string, any>;
  };
}

export interface PopupModal {
  id: string;
  name: string;
  type: 'popup' | 'modal' | 'banner';
  content: {
    title?: string;
    body: string;
    image?: string;
  };
  trigger: {
    type: 'time' | 'scroll' | 'exit' | 'click';
    value: string | number;
  };
  display: {
    frequency: 'once' | 'always' | 'custom';
    delay: number;
    animation: string;
    position: string;
  };
  targeting: {
    devices: string[];
    pages: string[];
    userGroups: string[];
  };
  active: boolean;
}

// Update the existing FrontendSettings interface
export interface FrontendSettings {
  theme: ThemeSettings;
  sections: PageSection[];
  customComponents: CustomComponent[];
  seo: SEOSettings;
  customCode: CustomCode[];
  navigation: {
    items: NavigationItem[];
    settings: {
      sticky: boolean;
      transparent: boolean;
      mobileBreakpoint: number;
    };
  };
  forms: CustomForm[];
  popups: PopupModal[];
  abTesting: {
    enabled: boolean;
    tests: Array<{
      id: string;
      name: string;
      variants: Array<{
        id: string;
        name: string;
        content: Record<string, any>;
        traffic: number;
      }>;
      status: 'draft' | 'active' | 'completed';
      startDate?: string;
      endDate?: string;
      targetPages: string[];
      metrics: {
        primary: string;
        secondary: string[];
      };
    }>;
  };
  analytics: {
    googleAnalytics?: string;
    facebookPixel?: string;
    customScripts: string[];
    eventTracking: {
      clicks: boolean;
      forms: boolean;
      pageviews: boolean;
      customEvents: string[];
    };
  };
}
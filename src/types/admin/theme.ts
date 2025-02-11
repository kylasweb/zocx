```typescript
export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  error: string;
  warning: string;
  info: string;
  success: string;
}

export interface Typography {
  fontFamily: {
    primary: string;
    secondary: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    none: number;
    tight: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
}

export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

export interface BorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface Shadows {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  inner: string;
}

export interface ComponentStyles {
  button: {
    variants: {
      [key: string]: {
        base: string;
        hover: string;
        active: string;
        disabled: string;
      };
    };
    sizes: {
      sm: string;
      md: string;
      lg: string;
    };
  };
  input: {
    variants: {
      [key: string]: {
        base: string;
        focus: string;
        error: string;
        disabled: string;
      };
    };
    sizes: {
      sm: string;
      md: string;
      lg: string;
    };
  };
  card: {
    variants: {
      [key: string]: {
        base: string;
        hover: string;
      };
    };
  };
  // Add more component styles as needed
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  colors: {
    light: ColorScheme;
    dark: ColorScheme;
  };
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  components: ComponentStyles;
  customProperties?: Record<string, any>;
  preview?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ThemeSettings {
  activeTheme: string;
  themes: Theme[];
  customizations: Record<string, Partial<Theme>>;
  darkMode: {
    enabled: boolean;
    auto: boolean;
    startTime?: string;
    endTime?: string;
  };
  animations: {
    enabled: boolean;
    reducedMotion: boolean;
    duration: {
      fast: number;
      normal: number;
      slow: number;
    };
  };
}
```
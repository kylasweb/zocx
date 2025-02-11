```typescript
import React, { createContext, useContext, useEffect } from 'react';
import { useThemeStore } from '../store/admin/themeStore';
import { Theme } from '../types/admin/theme';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleDarkMode: (enabled: boolean) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const {
    settings,
    toggleDarkMode,
  } = useThemeStore();

  const activeTheme = settings.themes.find(t => t.id === settings.activeTheme) || settings.themes[0];
  const customizations = settings.customizations[activeTheme.id];
  
  const theme: Theme = {
    ...activeTheme,
    ...customizations,
  };

  const isDark = settings.darkMode.enabled;

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const colors = isDark ? theme.colors.dark : theme.colors.light;

    // Apply colors
    Object.entries(colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        root.style.setProperty(`--color-${key}`, value);
      } else if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          root.style.setProperty(`--color-${key}-${subKey}`, subValue as string);
        });
      }
    });

    // Apply typography
    Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
      root.style.setProperty(`--font-family-${key}`, value);
    });

    Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value);
    });

    // Apply spacing
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    // Apply border radius
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });

    // Apply shadows
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // Apply animations
    if (settings.animations.enabled) {
      Object.entries(settings.animations.duration).forEach(([key, value]) => {
        root.style.setProperty(`--duration-${key}`, `${value}ms`);
      });
    }

    // Apply dark mode class
    root.classList.toggle('dark', isDark);

    // Apply reduced motion
    if (settings.animations.reducedMotion) {
      root.style.setProperty('--reduce-motion', 'true');
    } else {
      root.style.removeProperty('--reduce-motion');
    }
  }, [theme, isDark, settings.animations]);

  // Auto dark mode
  useEffect(() => {
    if (!settings.darkMode.auto) return;

    const checkDarkMode = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      const [startHour, startMinute] = settings.darkMode.startTime?.split(':').map(Number) || [18, 0];
      const [endHour, endMinute] = settings.darkMode.endTime?.split(':').map(Number) || [6, 0];
      
      const startTime = startHour * 60 + startMinute;
      const endTime = endHour * 60 + endMinute;

      const shouldBeDark = currentTime >= startTime || currentTime < endTime;
      if (shouldBeDark !== settings.darkMode.enabled) {
        toggleDarkMode(shouldBeDark);
      }
    };

    checkDarkMode();
    const interval = setInterval(checkDarkMode, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [settings.darkMode, toggleDarkMode]);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
```
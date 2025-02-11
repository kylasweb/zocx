```typescript
import { useMemo } from 'react';
import { useTheme } from '../components/ThemeProvider';

type StyleVariant = 'primary' | 'secondary' | 'outlined' | 'text';
type StyleSize = 'sm' | 'md' | 'lg';

interface UseThemeStylesOptions {
  variant?: StyleVariant;
  size?: StyleSize;
  className?: string;
}

export const useThemeStyles = (
  component: keyof Theme['components'],
  options: UseThemeStylesOptions = {}
) => {
  const { theme } = useTheme();
  const { variant = 'primary', size = 'md', className = '' } = options;

  const styles = useMemo(() => {
    const componentStyles = theme.components[component];
    const variantStyles = componentStyles.variants[variant];
    const sizeStyles = componentStyles.sizes?.[size];

    return {
      base: `${variantStyles.base} ${sizeStyles || ''} ${className}`,
      hover: variantStyles.hover,
      active: variantStyles.active,
      disabled: variantStyles.disabled,
    };
  }, [theme, component, variant, size, className]);

  return styles;
};
```
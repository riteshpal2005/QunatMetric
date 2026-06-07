import { MD3DarkTheme } from 'react-native-paper';

// "Solo Leveling" inspired color palette
export const colors = {
  background: '#0F0F13', // 60% Main theme (Deep dark)
  surface: '#20202A',    // 30% Light version of main theme (Surface/Cards)
  primary: '#9D00FF',    // 10% Accent color (Solo Leveling purple)
  secondary: '#A0A0B0',  // Text and inactive elements
  accent: '#A155FF',     // Lighter purple for highlights
  error: '#FF3366',      // Red for error states
  success: '#00E676',    // Neon green for success
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const typography = {
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
  },
};

// Merging our custom colors with React Native Paper's Dark Theme
export const AppTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    surface: colors.surface,
    secondary: colors.secondary,
    error: colors.error,
    // Custom non-standard colors we can access via theme extension
    accent: colors.accent,
    success: colors.success,
  },
};

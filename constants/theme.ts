import { Platform } from 'react-native';

// Color palette
export const colors = {
  primary: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50', // Primary green
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },
  secondary: {
    50: '#F3E5F5',
    100: '#E1BEE7',
    200: '#CE93D8',
    300: '#BA68C8',
    400: '#AB47BC',
    500: '#9C27B0', // Secondary purple
    600: '#8E24AA',
    700: '#7B1FA2',
    800: '#6A1B9A',
    900: '#4A148C',
  },
  accent: {
    50: '#FFF3E0',
    100: '#FFE0B2',
    200: '#FFCC80',
    300: '#FFB74D',
    400: '#FFA726',
    500: '#FF9800', // Accent orange
    600: '#FB8C00',
    700: '#F57C00',
    800: '#EF6C00',
    900: '#E65100',
  },
  success: {
    50: '#E0F2F1',
    100: '#B2DFDB',
    200: '#80CBC4',
    300: '#4DB6AC',
    400: '#26A69A',
    500: '#009688', // Success teal
    600: '#00897B',
    700: '#00796B',
    800: '#00695C',
    900: '#004D40',
  },
  warning: {
    50: '#FFFDE7',
    100: '#FFF9C4',
    200: '#FFF59D',
    300: '#FFF176',
    400: '#FFEE58',
    500: '#FFEB3B', // Warning yellow
    600: '#FDD835',
    700: '#FBC02D',
    800: '#F9A825',
    900: '#F57F17',
  },
  error: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#F44336', // Error red
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E', // Neutral gray
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  white: '#FFFFFF',
  black: '#000000',
  background: {
    light: '#FFFFFF',
    dark: '#121212',
  },
  card: {
    light: '#FFFFFF',
    dark: '#1E1E1E',
  },
  text: {
    primary: {
      light: '#212121',
      dark: '#FFFFFF',
    },
    secondary: {
      light: '#757575',
      dark: '#BDBDBD',
    },
    disabled: {
      light: '#9E9E9E',
      dark: '#757575',
    },
  },
};

// Typography
export const typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  lineHeight: {
    tight: 1.2,    // For headings (120%)
    normal: 1.5,    // For body text (150%)
    relaxed: 1.75,  // For more spacious text
  },
};

// Spacing system (8px grid)
export const spacing = {
  '0': 0,
  '0.5': 4,
  '1': 8,
  '1.5': 12,
  '2': 16,
  '2.5': 20,
  '3': 24,
  '3.5': 28,
  '4': 32,
  '5': 40,
  '6': 48,
  '7': 56,
  '8': 64,
  '9': 72,
  '10': 80,
  '12': 96,
  '16': 128,
  '20': 160,
  '24': 192,
  '32': 256,
};

// Border radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

// Shadows
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  xl: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  '2xl': Platform.select({
    ios: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.51,
      shadowRadius: 13.16,
    },
    android: {
      elevation: 24,
    },
    default: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.51,
      shadowRadius: 13.16,
    },
  }),
};

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};

export default theme;
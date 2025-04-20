import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { typography, colors } from '../constants/theme';

type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'overline';

interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  style?: TextStyle;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  style,
  color,
  align,
  numberOfLines,
  ellipsizeMode,
  ...props
}) => {
  const textStyles = [
    styles[variant],
    align && { textAlign: align },
    color && { color },
    style,
  ];

  return (
    <Text 
      style={textStyles} 
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize['5xl'],
    lineHeight: typography.fontSize['5xl'] * typography.lineHeight.tight,
    color: colors.text.primary.light,
  },
  h2: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize['4xl'],
    lineHeight: typography.fontSize['4xl'] * typography.lineHeight.tight,
    color: colors.text.primary.light,
  },
  h3: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize['3xl'],
    lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
    color: colors.text.primary.light,
  },
  h4: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize['2xl'],
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight,
    color: colors.text.primary.light,
  },
  h5: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.xl,
    lineHeight: typography.fontSize.xl * typography.lineHeight.tight,
    color: colors.text.primary.light,
  },
  h6: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.lg,
    lineHeight: typography.fontSize.lg * typography.lineHeight.tight,
    color: colors.text.primary.light,
  },
  subtitle1: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
    color: colors.text.primary.light,
  },
  subtitle2: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
    color: colors.text.primary.light,
  },
  body1: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
    color: colors.text.primary.light,
  },
  body2: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    color: colors.text.primary.light,
  },
  button: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
    textTransform: 'uppercase',
    color: colors.text.primary.light,
  },
  caption: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
    color: colors.text.secondary.light,
  },
  overline: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: colors.text.secondary.light,
  },
});

export default Typography;
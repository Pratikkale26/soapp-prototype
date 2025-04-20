import React from 'react';
import { 
  TouchableOpacity, 
  TouchableOpacityProps, 
  StyleSheet, 
  ActivityIndicator, 
  View,
  StyleProp,
  ViewStyle,
  TextStyle 
} from 'react-native';
import Typography from './Typography';
import { theme } from '../constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  buttonStyle,
  textStyle,
  disabled,
  ...props
}) => {
  const getButtonStyles = () => {
    let buttonStyles: any[] = [
      styles.base,
      styles[variant],
      styles[`${size}Size`],
      fullWidth && styles.fullWidth,
      disabled && styles.disabled,
      buttonStyle,
    ];
    return buttonStyles;
  };

  const getTextStyles = () => {
    let textStyles: any[] = [
      styles.text,
      styles[`${variant}Text`],
      styles[`${size}Text`],
      disabled && styles.disabledText,
      textStyle,
    ];
    return textStyles;
  };

  return (
    <TouchableOpacity
      style={getButtonStyles()}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? theme.colors.white : theme.colors.primary[500]} 
          size={size === 'small' ? 'small' : 'small'} 
        />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Typography 
            variant="button" 
            style={getTextStyles()}
          >
            {title}
          </Typography>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
    minWidth: 64,
  },
  primary: {
    backgroundColor: theme.colors.primary[500],
  },
  secondary: {
    backgroundColor: theme.colors.secondary[500],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary[500],
    ...theme.shadows.none,
  },
  text: {
    backgroundColor: 'transparent',
    ...theme.shadows.none,
  },
  smallSize: {
    paddingVertical: theme.spacing[1],
    paddingHorizontal: theme.spacing[2],
  },
  mediumSize: {
    paddingVertical: theme.spacing[1.5],
    paddingHorizontal: theme.spacing[3],
  },
  largeSize: {
    paddingVertical: theme.spacing[2],
    paddingHorizontal: theme.spacing[4],
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    backgroundColor: theme.colors.neutral[300],
    ...theme.shadows.none,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.white,
  },
  primaryText: {
    color: theme.colors.white,
  },
  secondaryText: {
    color: theme.colors.white,
  },
  outlineText: {
    color: theme.colors.primary[500],
  },
  textText: {
    color: theme.colors.primary[500],
  },
  smallText: {
    fontSize: theme.typography.fontSize.sm,
  },
  mediumText: {
    fontSize: theme.typography.fontSize.md,
  },
  largeText: {
    fontSize: theme.typography.fontSize.lg,
  },
  disabledText: {
    color: theme.colors.neutral[600],
  },
  leftIcon: {
    marginRight: theme.spacing[1],
  },
  rightIcon: {
    marginLeft: theme.spacing[1],
  },
});

export default Button;
import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  backgroundColor?: string;
  borderRadius?: keyof typeof theme.borderRadius;
  padding?: keyof typeof theme.spacing;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  elevation = 'md',
  backgroundColor = theme.colors.card.light,
  borderRadius = 'md',
  padding = '3',
}) => {
  return (
    <View
      style={[
        styles.card,
        theme.shadows[elevation],
        { 
          backgroundColor,
          borderRadius: theme.borderRadius[borderRadius],
          padding: theme.spacing[padding]
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
});

export default Card;
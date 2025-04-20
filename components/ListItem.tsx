import React from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  StyleProp, 
  ViewStyle 
} from 'react-native';
import Typography from './Typography';
import { theme } from '../constants/theme';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightAction?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  showBottomDivider?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  rightAction,
  onPress,
  style,
  showBottomDivider = true,
}) => {
  const Container = onPress ? TouchableOpacity : View;
  
  return (
    <Container 
      style={[styles.container, style]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {leftIcon && (
        <View style={styles.leftIconContainer}>
          {leftIcon}
        </View>
      )}
      
      <View style={styles.contentContainer}>
        <Typography variant="subtitle2" numberOfLines={1}>
          {title}
        </Typography>
        {subtitle && (
          <Typography 
            variant="body2" 
            color={theme.colors.text.secondary.light}
            numberOfLines={1}
          >
            {subtitle}
          </Typography>
        )}
      </View>
      
      {(rightIcon || rightAction) && (
        <View style={styles.rightContainer}>
          {rightIcon || rightAction}
        </View>
      )}
      
      {showBottomDivider && <View style={styles.divider} />}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing[2],
    paddingHorizontal: theme.spacing[2],
    backgroundColor: theme.colors.background.light,
    position: 'relative',
  },
  leftIconContainer: {
    marginRight: theme.spacing[2],
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    marginLeft: theme.spacing[2],
  },
  divider: {
    position: 'absolute',
    bottom: 0,
    left: theme.spacing[2],
    right: 0,
    height: 1,
    backgroundColor: theme.colors.neutral[200],
  },
});

export default ListItem;
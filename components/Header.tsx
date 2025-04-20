import React from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  StyleProp, 
  ViewStyle 
} from 'react-native';
import { useRouter } from 'expo-router';
import Typography from './Typography';
import { theme } from '../constants/theme';
import { ChevronLeft } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightActions?: React.ReactNode;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  titleColor?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = true,
  rightActions,
  backgroundColor = theme.colors.primary[500],
  style,
  titleColor = theme.colors.white,
}) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={[styles.header, { backgroundColor }, style]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <ChevronLeft size={24} color={titleColor} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.titleContainer}>
        <Typography 
          variant="h5" 
          style={{ color: titleColor }}
          numberOfLines={1}
        >
          {title}
        </Typography>
      </View>
      
      <View style={styles.rightContainer}>
        {rightActions}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: theme.spacing[2],
    ...theme.shadows.md,
  },
  leftContainer: {
    width: 60,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    width: 60,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: theme.spacing[1],
  },
});

export default Header;
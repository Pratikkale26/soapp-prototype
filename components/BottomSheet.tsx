import React from 'react';
import { StyleSheet, View, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  children,
  height = SCREEN_HEIGHT * 0.7
}) => {
  const translateY = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: SCREEN_HEIGHT - height,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: SCREEN_HEIGHT,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, height]);

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />
      <Animated.View
        style={[
          styles.container,
          {
            height: height,
            transform: [{ translateY }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background.light,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    padding: theme.spacing[4],
    ...theme.shadows.xl,
  },
});

export default BottomSheet;
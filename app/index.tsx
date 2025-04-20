import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Animated, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import Typography from '@/components/Typography';
import { theme } from '@/constants/theme';

export default function LandingScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: Platform.OS !== 'web',
      })
    ]).start();
  }, []);

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.content,
        { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/SoApp_logo.png')}
            style={styles.logoPlaceholder}
          />
        </View>
        
        <View style={styles.textContainer}>
          <Typography variant="h3" align="center" style={styles.title}>
            SoApp
          </Typography>
          
          <Typography 
            variant="body1" 
            align="center" 
            color={theme.colors.text.secondary.light}
            style={styles.subtitle}
          >
            The smartest way to shop
          </Typography>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            variant="primary"
            size="large"
            fullWidth
            onPress={handleGetStarted}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing[4],
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: theme.spacing[6],
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.full,
  },
  textContainer: {
    marginBottom: theme.spacing[8],
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.spacing[2],
  },
  subtitle: {
    maxWidth: 300,
  },
  buttonContainer: {
    width: '100%',
  },
});
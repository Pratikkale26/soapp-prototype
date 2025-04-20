import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts as useExpoFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold
} from '@expo-google-fonts/inter';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export const useFonts = () => {
  const [fontsLoaded, fontError] = useExpoFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    const hideSplash = async () => {
      // Hide the splash screen once fonts are loaded
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplash();
  }, [fontsLoaded, fontError]);

  return { fontsLoaded, fontError };
};

export default useFonts;
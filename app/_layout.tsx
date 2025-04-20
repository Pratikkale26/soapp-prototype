
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AppProvider } from '@/context/AppContext';
import useFonts from '@/hooks/useFonts';

export default function RootLayout() {
  useFrameworkReady();
  const { fontsLoaded, fontError } = useFonts();

  // Return null to keep splash screen while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </AppProvider>
  );
}
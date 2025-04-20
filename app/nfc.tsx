import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, Platform } from 'react-native';
import { theme } from '@/constants/theme';
import Header from '@/components/Header';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import { ShoppingBag } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NFCScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const pulseAnim = new Animated.Value(1);

  React.useEffect(() => {
    if (isScanning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isScanning]);

  const handleStartScan = () => {
    setIsScanning(true);
    // In a real app, we would initiate NFC scanning here
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="NFC" />
      
      <View style={styles.content}>
        <Typography variant="h5" align="center" style={styles.title}>
          Scan your NFC-enabled tag
        </Typography>
        
        <Typography
          variant="body1"
          align="center"
          color={theme.colors.neutral[600]}
          style={styles.subtitle}
        >
          Hold your mobile close to an NFC tag on products
        </Typography>
        
        <View style={styles.nfcContainer}>
          <Animated.View
            style={[
              styles.nfcOuterCircle,
              {
                transform: [{ scale: pulseAnim }],
                opacity: isScanning ? 0.7 : 0.3,
              },
            ]}
          />
          <View style={styles.nfcInnerCircle}>
            <ShoppingBag size={40} color={theme.colors.white} />
          </View>
        </View>
        
        <View style={styles.messageContainer}>
          {isScanning ? (
            <Typography
              variant="subtitle1"
              align="center"
              color={theme.colors.primary[500]}
            >
              Scanning... Please hold still
            </Typography>
          ) : (
            <Typography
              variant="subtitle1"
              align="center"
              color={theme.colors.neutral[600]}
            >
              Tap the button below to start scanning
            </Typography>
          )}
        </View>
        
        <View style={styles.buttonContainer}>
          {isScanning ? (
            <Button
              title="Cancel Scan"
              variant="outline"
              size="large"
              onPress={handleStopScan}
            />
          ) : (
            <Button
              title="Start Scan"
              variant="primary"
              size="large"
              onPress={handleStartScan}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  content: {
    flex: 1,
    padding: theme.spacing[4],
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.spacing[2],
  },
  subtitle: {
    marginBottom: theme.spacing[6],
    maxWidth: 280,
    textAlign: 'center',
  },
  nfcContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[6],
  },
  nfcOuterCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: theme.colors.primary[300],
    opacity: 0.3,
    position: 'absolute',
  },
  nfcInnerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },
  messageContainer: {
    marginBottom: theme.spacing[6],
    height: 24,
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
});
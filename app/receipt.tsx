import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { theme } from '@/constants/theme';
import Header from '@/components/Header';
import Typography from '@/components/Typography';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { CheckCircle2 } from 'lucide-react-native';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

const HORIZONTAL_PADDING = 16;

export default function ReceiptScreen() {
  const router = useRouter();
  const { orderId, total, items, store, date } = useLocalSearchParams();
  
  const parsedItems = JSON.parse(items as string) as OrderItem[];
  const subtotal = parsedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax

  const handleDone = () => {
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Receipt" />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.successContainer}>
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.success[50] }]}>
            <CheckCircle2 size={48} color={theme.colors.success[500]} />
          </View>
          <Typography variant="h4" style={styles.successTitle}>
            Order Successful!
          </Typography>
          <Typography variant="body1" color={theme.colors.neutral[600]} style={styles.successText}>
            Thank you for your purchase
          </Typography>
        </View>

        <Card style={styles.receiptCard}>
          <View style={styles.receiptHeader}>
            <View>
              <Typography variant="subtitle2" color={theme.colors.neutral[600]}>
                Order #{orderId}
              </Typography>
              <Typography variant="body2" color={theme.colors.neutral[500]}>
                {new Date(date as string).toLocaleDateString()}
              </Typography>
            </View>
            <Typography variant="subtitle2" color={theme.colors.neutral[600]}>
              {store}
            </Typography>
          </View>

          <View style={styles.divider} />

          {parsedItems.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Typography variant="body2">{item.name}</Typography>
                <Typography variant="caption" color={theme.colors.neutral[500]}>
                  {item.quantity} x ${item.price.toFixed(2)}
                </Typography>
              </View>
              <Typography variant="body2">
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Typography variant="body2" color={theme.colors.neutral[600]}>
              Subtotal
            </Typography>
            <Typography variant="body2">
              ${subtotal.toFixed(2)}
            </Typography>
          </View>

          <View style={styles.summaryRow}>
            <Typography variant="body2" color={theme.colors.neutral[600]}>
              Tax (10%)
            </Typography>
            <Typography variant="body2">
              ${tax.toFixed(2)}
            </Typography>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Typography variant="subtitle1">Total</Typography>
            <Typography variant="subtitle1" color={theme.colors.primary[500]}>
              ${total}
            </Typography>
          </View>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Done"
          variant="primary"
          fullWidth
          onPress={handleDone}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing[6],
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  successContainer: {
    alignItems: 'center',
    padding: theme.spacing[4],
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[3],
  },
  successTitle: {
    marginBottom: theme.spacing[1],
  },
  successText: {
    textAlign: 'center',
  },
  receiptCard: {
    marginVertical: theme.spacing[3],
    padding: theme.spacing[3],
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  receiptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing[2],
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.neutral[200],
    marginVertical: theme.spacing[2],
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[2],
  },
  itemInfo: {
    flex: 1,
    marginRight: theme.spacing[2],
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing[1],
  },
  totalRow: {
    marginTop: theme.spacing[2],
    paddingTop: theme.spacing[2],
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral[200],
  },
  footer: {
    padding: theme.spacing[3],
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral[200],
  },
}); 
import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Typography from '@/components/Typography';
import { ChevronRight, Receipt } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function OrderHistoryScreen() {
  const { orderHistory } = useAppContext();
  const router = useRouter();

  const handleViewReceipt = (order: any) => {
    router.push({
      pathname: '/receipt',
      params: {
        orderId: order.id,
        total: order.total,
        items: JSON.stringify(order.items),
        store: order.store,
        date: order.date
      }
    });
  };

  const renderItem = ({ item }: { item: any }) => (
    <Card style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Typography variant="subtitle2">Order #{item.id}</Typography>
          <Typography variant="caption" color={theme.colors.neutral[500]}>
            {item.date}
          </Typography>
        </View>
        <Typography variant="subtitle1" color={theme.colors.primary[600]}>
          ${item.total.toFixed(2)}
        </Typography>
      </View>
      
      <View style={styles.orderStore}>
        <Typography variant="body2" color={theme.colors.neutral[600]}>
          {item.store}
        </Typography>
      </View>
      
      <View style={styles.itemsList}>
        {item.items.map((orderItem: any, index: number) => (
          <View key={index} style={styles.orderItem}>
            <Typography variant="body2">
              {orderItem.quantity}x {orderItem.name}
            </Typography>
            <Typography variant="body2" color={theme.colors.neutral[700]}>
              ${orderItem.price.toFixed(2)}
            </Typography>
          </View>
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.viewReceiptButton}
        onPress={() => handleViewReceipt(item)}
      >
        <View style={styles.viewReceiptContent}>
          <Receipt size={16} color={theme.colors.primary[500]} />
          <Typography variant="button" color={theme.colors.primary[500]}>
            View Receipt
          </Typography>
        </View>
        <ChevronRight size={16} color={theme.colors.primary[500]} />
      </TouchableOpacity>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Order History" showBackButton={false} />
      
      <FlatList
        data={orderHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Typography variant="h5">Your Orders</Typography>
            <Typography variant="body2" color={theme.colors.neutral[600]} style={styles.subtitle}>
              View your past orders and receipts
            </Typography>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Typography variant="h5" color={theme.colors.neutral[500]} align="center">
              No orders yet
            </Typography>
            <Typography
              variant="body2"
              color={theme.colors.neutral[400]}
              align="center"
              style={styles.emptyText}
            >
              Your order history will appear here once you make a purchase
            </Typography>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  headerContainer: {
    padding: theme.spacing[3],
    paddingBottom: theme.spacing[2],
  },
  subtitle: {
    marginTop: theme.spacing[1],
  },
  listContent: {
    padding: theme.spacing[3],
    paddingTop: 0,
  },
  orderCard: {
    marginBottom: theme.spacing[3],
    padding: theme.spacing[3],
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing[2],
  },
  orderStore: {
    marginBottom: theme.spacing[2],
  },
  itemsList: {
    marginBottom: theme.spacing[2],
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing[1],
  },
  viewReceiptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing[2],
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral[200],
  },
  viewReceiptContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing[4],
  },
  emptyText: {
    marginTop: theme.spacing[1],
    maxWidth: 250,
    textAlign: 'center',
  },
});
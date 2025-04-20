import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';
import Typography from '@/components/Typography';
import Card from '@/components/Card';
import {
  Search,
  ShoppingCart,
  List,
  MapPin,
  Wallet,
  QrCode,
  History
} from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { walletBalance } = useAppContext();

  const navigateTo = (route: string) => {
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color={theme.colors.neutral[500]} />
          <Typography
            variant="body2"
            color={theme.colors.neutral[500]}
            style={styles.searchText}
          >
            Search...
          </Typography>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigateTo('/cart')}
        >
          <ShoppingCart size={24} color={theme.colors.neutral[800]} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.balanceCard}>
          <View style={styles.balanceRow}>
            <View>
              <Typography variant="body2" color={theme.colors.text.secondary.light}>
                Balance
              </Typography>
              <Typography variant="h4" color={theme.colors.primary[800]}>
                ${walletBalance.toFixed(2)}
              </Typography>
            </View>
            <TouchableOpacity
              style={styles.topupButton}
              onPress={() => navigateTo('/wallet')}
            >
              <Typography
                variant="button"
                color={theme.colors.white}
                style={styles.topupText}
              >
                Top Up
              </Typography>
            </TouchableOpacity>
          </View>
        </Card>

        <View style={styles.actionsGrid}>
          <ActionItem
            icon={<List size={24} color={theme.colors.primary[500]} />}
            label="Shopping List"
            onPress={() => navigateTo('/list')}
            backgroundColor={theme.colors.primary[50]}
          />
          <ActionItem
            icon={<MapPin size={24} color={theme.colors.secondary[500]} />}
            label="Stores"
            onPress={() => navigateTo('/store-selection')}
            backgroundColor={theme.colors.secondary[50]}
          />
          <ActionItem
            icon={<Wallet size={24} color={theme.colors.error[500]} />}
            label="Order History"
            onPress={() => navigateTo('/history')}
            backgroundColor={theme.colors.error[50]}
          />
          <ActionItem
            icon={<QrCode size={24} color={theme.colors.accent[500]} />}
            label="NFC"
            onPress={() => navigateTo('/nfc')}
            backgroundColor={theme.colors.accent[50]}
          />
        </View>

        <Typography variant="h5" style={styles.sectionTitle}>
          Recent Orders
        </Typography>
        
        <Card style={styles.recentOrderCard}>
          <View style={styles.orderHeader}>
            <Typography variant="subtitle2">Order #1234</Typography>
            <Typography variant="caption" color={theme.colors.neutral[500]}>
              May 12, 2024
            </Typography>
          </View>
          <View style={styles.orderItems}>
            <Typography variant="body2" color={theme.colors.neutral[700]}>
              4 items • $27.50
            </Typography>
          </View>
          <View style={styles.orderFooter}>
            <Typography
              variant="caption"
              color={theme.colors.success[500]}
              style={styles.statusText}
            >
              Delivered
            </Typography>
            <TouchableOpacity onPress={() => navigateTo('/history')}>
              <Typography
                variant="button"
                color={theme.colors.primary[500]}
                style={styles.detailsText}
              >
                Details
              </Typography>
            </TouchableOpacity>
          </View>
        </Card>
        
        <Typography variant="h5" style={styles.sectionTitle}>
          Recommended For You
        </Typography>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recommendedContainer}
        >
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} style={styles.productCard}>
              <Image
                source={{
                  uri: `https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=300&h=${200 + item * 50}`,
                }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Typography variant="subtitle2" numberOfLines={1}>
                  Product {item}
                </Typography>
                <Typography variant="caption" color={theme.colors.neutral[600]}>
                  Category
                </Typography>
                <Typography
                  variant="subtitle1"
                  color={theme.colors.primary[500]}
                  style={styles.price}
                >
                  ${(3.99 + item * 2).toFixed(2)}
                </Typography>
              </View>
            </Card>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const ActionItem = ({
  icon,
  label,
  onPress,
  backgroundColor,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  backgroundColor?: string;
}) => (
  <TouchableOpacity
    style={[styles.actionItem, { backgroundColor }]}
    onPress={onPress}
  >
    <View style={styles.actionIcon}>{icon}</View>
    <Typography variant="body2" style={styles.actionLabel}>
      {label}
    </Typography>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    backgroundColor: theme.colors.background.light,
    ...theme.shadows.sm,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral[100],
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[1],
  },
  searchText: {
    marginLeft: theme.spacing[1],
  },
  cartButton: {
    marginLeft: theme.spacing[2],
    padding: theme.spacing[1],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing[3],
    paddingBottom: theme.spacing[6],
  },
  balanceCard: {
    backgroundColor: theme.colors.white,
    marginBottom: theme.spacing[3],
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topupButton: {
    backgroundColor: theme.colors.primary[500],
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[1],
    borderRadius: theme.borderRadius.md,
  },
  topupText: {
    fontSize: theme.typography.fontSize.sm,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing[1],
    marginBottom: theme.spacing[3],
  },
  actionItem: {
    width: '48%',
    margin: '1%',
    padding: theme.spacing[2],
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  actionIcon: {
    marginBottom: theme.spacing[1],
  },
  actionLabel: {
    textAlign: 'center',
  },
  sectionTitle: {
    marginBottom: theme.spacing[2],
  },
  recentOrderCard: {
    marginBottom: theme.spacing[3],
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing[1],
  },
  orderItems: {
    marginBottom: theme.spacing[2],
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing[1],
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral[200],
  },
  statusText: {
    fontWeight: '600',
  },
  detailsText: {
    fontSize: theme.typography.fontSize.sm,
  },
  recommendedContainer: {
    paddingRight: theme.spacing[2],
  },
  productCard: {
    width: 160,
    marginRight: theme.spacing[2],
    padding: 0,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: theme.spacing[2],
  },
  price: {
    marginTop: theme.spacing[1],
  },
});
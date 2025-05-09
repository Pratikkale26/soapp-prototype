import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert,
  Dimensions
} from 'react-native';
import { theme } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import { CreditCard, Wallet, CirclePlus as PlusCircle, ChevronRight, RefreshCw, ArrowUpRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_PADDING = 12;
const HORIZONTAL_PADDING = 16;

export default function WalletScreen() {
  const { walletBalance, updateWalletBalance } = useAppContext();
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('');

  const handleAmountChange = (text: string) => {
    // Allow only numbers and one decimal point
    const reg = /^\d*\.?\d*$/;
    if (reg.test(text) || text === '') {
      setAmount(text);
    }
  };

  const handleTopUp = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount to top up');
      return;
    }

    if (!upiId) {
      Alert.alert('Missing UPI ID', 'Please enter your UPI ID');
      return;
    }

    updateWalletBalance(parseFloat(amount));
    setAmount('');
    setUpiId('');
    Alert.alert('Success', 'Amount added to wallet successfully');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Wallet" showBackButton={false} />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View>
              <Typography variant="body2" color={theme.colors.neutral[600]}>
                Available Balance
              </Typography>
              <Typography variant="h3" color={theme.colors.primary[700]} style={styles.balanceText}>
                ${walletBalance.toFixed(2)}
              </Typography>
            </View>
            <View style={[styles.balanceIcon, { backgroundColor: theme.colors.primary[50] }]}>
              <Wallet size={24} color={theme.colors.primary[500]} />
            </View>
          </View>
          
          <View style={styles.cardNumberContainer}>
            <Typography variant="body2" color={theme.colors.neutral[600]}>
              Card: **** **** **** 1234
            </Typography>
            <View style={styles.divider} />
            <Typography variant="body2" color={theme.colors.neutral[600]}>
              Exp: 12/25
            </Typography>
          </View>
        </Card>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: theme.colors.primary[50] }]}>
              <PlusCircle size={24} color={theme.colors.primary[500]} />
            </View>
            <Typography variant="body2">Add Money</Typography>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: theme.colors.secondary[50] }]}>
              <RefreshCw size={24} color={theme.colors.secondary[500]} />
            </View>
            <Typography variant="body2">Transfer</Typography>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: theme.colors.accent[50] }]}>
              <CreditCard size={24} color={theme.colors.accent[500]} />
            </View>
            <Typography variant="body2">Pay</Typography>
          </TouchableOpacity>
        </View>
        
        <Card style={styles.topupCard}>
          <Typography variant="h5" style={styles.topupTitle}>
            Add Money
          </Typography>
          
          <View style={styles.amountInputContainer}>
            <Typography variant="h5" style={styles.currencySymbol}>
              $
            </Typography>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              keyboardType="numeric"
              value={amount}
              onChangeText={handleAmountChange}
              placeholderTextColor={theme.colors.neutral[400]}
            />
          </View>
          
          <Typography variant="body2" color={theme.colors.neutral[600]} style={styles.upiLabel}>
            UPI ID:
          </Typography>
          
          <View style={styles.upiInputContainer}>
            <TextInput
              style={styles.upiInput}
              placeholder="Enter your UPI ID"
              autoCapitalize="none"
              value={upiId}
              onChangeText={setUpiId}
              placeholderTextColor={theme.colors.neutral[400]}
            />
          </View>
          
          <Button
            title="Proceed to Add Money"
            variant="primary"
            fullWidth
            style={styles.proceedButton}
            onPress={handleTopUp}
          />
        </Card>
        
        <Card style={styles.recentTransactionsCard}>
          <View style={styles.sectionHeader}>
            <Typography variant="h5">Recent Transactions</Typography>
            <TouchableOpacity style={styles.viewAllButton}>
              <Typography variant="button" color={theme.colors.primary[500]}>
                View All
              </Typography>
              <ChevronRight size={16} color={theme.colors.primary[500]} />
            </TouchableOpacity>
          </View>
          
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[
                  styles.transactionIcon,
                  { backgroundColor: item % 2 === 0 ? theme.colors.success[50] : theme.colors.error[50] }
                ]}>
                  {item % 2 === 0 ? (
                    <ArrowUpRight size={20} color={theme.colors.success[500]} />
                  ) : (
                    <CreditCard size={20} color={theme.colors.error[500]} />
                  )}
                </View>
                <View>
                  <Typography variant="subtitle2">
                    {item % 2 === 0 ? 'Money Added' : 'Payment'}
                  </Typography>
                  <Typography variant="caption" color={theme.colors.neutral[500]}>
                    May {10 + item}, 2023
                  </Typography>
                </View>
              </View>
              <Typography
                variant="subtitle2"
                color={item % 2 === 0 ? theme.colors.success[500] : theme.colors.error[500]}
              >
                {item % 2 === 0 ? '+' : '-'}${(15 * item).toFixed(2)}
              </Typography>
            </View>
          ))}
        </Card>
      </ScrollView>
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
  balanceCard: {
    marginVertical: theme.spacing[3],
    padding: theme.spacing[3],
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceText: {
    marginTop: theme.spacing[1],
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing[3],
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: theme.colors.neutral[300],
    marginHorizontal: theme.spacing[2],
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing[3],
    gap: theme.spacing[2],
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[1],
    ...theme.shadows.sm,
  },
  topupCard: {
    marginVertical: theme.spacing[3],
    padding: theme.spacing[3],
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  topupTitle: {
    marginBottom: theme.spacing[2],
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral[100],
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing[2],
    marginBottom: theme.spacing[3],
  },
  currencySymbol: {
    marginRight: theme.spacing[1],
  },
  amountInput: {
    flex: 1,
    height: 48,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize['2xl'],
    color: theme.colors.neutral[900],
  },
  upiLabel: {
    marginBottom: theme.spacing[1],
  },
  upiInputContainer: {
    backgroundColor: theme.colors.neutral[100],
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing[2],
    marginBottom: theme.spacing[2],
  },
  upiInput: {
    height: 48,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[900],
  },
  proceedButton: {
    marginTop: theme.spacing[2],
  },
  recentTransactionsCard: {
    marginVertical: theme.spacing[3],
    padding: theme.spacing[3],
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[2],
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing[2],
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
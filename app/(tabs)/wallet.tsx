import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput 
} from 'react-native';
import { theme } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import { CreditCard, Wallet, CirclePlus as PlusCircle, ChevronRight, RefreshCw } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WalletScreen() {
  const { walletBalance } = useAppContext();
  const [amount, setAmount] = useState('');

  const handleAmountChange = (text: string) => {
    // Allow only numbers and one decimal point
    const reg = /^\d*\.?\d*$/;
    if (reg.test(text) || text === '') {
      setAmount(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Wallet" showBackButton={false} />
      
      <ScrollView style={styles.scrollView}>
        <Card style={styles.balanceCard}>
          <Typography variant="body2" color={theme.colors.neutral[600]}>
            Current Balance:
          </Typography>
          <Typography variant="h3" color={theme.colors.primary[700]} style={styles.balanceText}>
            ${walletBalance.toFixed(2)}
          </Typography>
          
          <View style={styles.cardNumberContainer}>
            <Typography variant="body1" color={theme.colors.neutral[600]}>
              PIN: *****
            </Typography>
            <View style={styles.divider} />
            <Typography variant="body1" color={theme.colors.neutral[600]}>
              Reference: 54AB6
            </Typography>
          </View>
        </Card>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: theme.colors.primary[50] }]}>
              <PlusCircle size={24} color={theme.colors.primary[500]} />
            </View>
            <Typography variant="body2">Add Bank</Typography>
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
            Add Amount
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
            />
          </View>
          
          <Button
            title="+ Add bank account details"
            variant="text"
            style={styles.addBankButton}
            textStyle={{ color: theme.colors.primary[500] }}
          />
          
          <Button
            title="Proceed"
            variant="primary"
            fullWidth
            style={styles.proceedButton}
          />
        </Card>
        
        <Card style={styles.recentTransactionsCard}>
          <Typography variant="h5" style={styles.sectionTitle}>
            Recent Transactions
          </Typography>
          
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[
                  styles.transactionIcon,
                  { backgroundColor: item % 2 === 0 ? theme.colors.success[50] : theme.colors.error[50] }
                ]}>
                  {item % 2 === 0 ? (
                    <PlusCircle size={20} color={theme.colors.success[500]} />
                  ) : (
                    <CreditCard size={20} color={theme.colors.error[500]} />
                  )}
                </View>
                <View>
                  <Typography variant="subtitle2">
                    {item % 2 === 0 ? 'Top Up' : 'Payment'}
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
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Typography variant="button" color={theme.colors.primary[500]}>
              View All
            </Typography>
            <ChevronRight size={16} color={theme.colors.primary[500]} />
          </TouchableOpacity>
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
  balanceCard: {
    margin: theme.spacing[3],
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
  },
  balanceText: {
    marginVertical: theme.spacing[2],
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
    justifyContent: 'space-around',
    marginHorizontal: theme.spacing[3],
    marginBottom: theme.spacing[3],
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[1],
  },
  topupCard: {
    margin: theme.spacing[3],
    marginTop: 0,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
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
  },
  addBankButton: {
    alignSelf: 'flex-start',
    marginBottom: theme.spacing[3],
  },
  proceedButton: {
    marginTop: theme.spacing[2],
  },
  recentTransactionsCard: {
    margin: theme.spacing[3],
    marginTop: 0,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing[6],
  },
  sectionTitle: {
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
    justifyContent: 'center',
    marginTop: theme.spacing[3],
  },
});
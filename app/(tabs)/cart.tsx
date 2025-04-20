import React from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/Header';
import Typography from '@/components/Typography';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen() {
  const { cart, updateCartQuantity, removeFromCart, cartTotal } = useAppContext();

  const renderItem = ({ item }: { item: any }) => (
    <Card style={styles.itemCard}>
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: item.product.image }}
          style={styles.productImage}
        />
        
        <View style={styles.productInfo}>
          <Typography variant="subtitle2">{item.product.name}</Typography>
          <Typography variant="body2" color={theme.colors.neutral[600]}>
            ${item.product.price.toFixed(2)}
          </Typography>
        </View>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateCartQuantity(item.product.id, item.quantity - 1)}
          >
            <Minus size={16} color={theme.colors.neutral[700]} />
          </TouchableOpacity>
          
          <Typography variant="subtitle2" style={styles.quantityText}>
            {item.quantity}
          </Typography>
          
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateCartQuantity(item.product.id, item.quantity + 1)}
          >
            <Plus size={16} color={theme.colors.neutral[700]} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.priceContainer}>
          <Typography variant="subtitle2">
            ${(item.product.price * item.quantity).toFixed(2)}
          </Typography>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFromCart(item.product.id)}
          >
            <Trash2 size={18} color={theme.colors.error[500]} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  const emptyCart = () => (
    <View style={styles.emptyContainer}>
      <Typography variant="h5" color={theme.colors.neutral[500]} align="center">
        Your cart is empty
      </Typography>
      <Typography
        variant="body2"
        color={theme.colors.neutral[400]}
        align="center"
        style={styles.emptyText}
      >
        Add items to your cart from the store
      </Typography>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Cart" showBackButton={false} />
      
      <View style={styles.titleContainer}>
        <Typography variant="h5">Ready for Checkout</Typography>
      </View>
      
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={emptyCart}
      />
      
      {cart.length > 0 && (
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Typography variant="body1">Subtotal:</Typography>
            <Typography variant="subtitle2">${cartTotal.toFixed(2)}</Typography>
          </View>
          
          <View style={styles.summaryRow}>
            <Typography variant="body1">Tax:</Typography>
            <Typography variant="subtitle2">
              ${(cartTotal * 0.08).toFixed(2)}
            </Typography>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Typography variant="subtitle1">Total:</Typography>
            <Typography variant="h5" color={theme.colors.primary[500]}>
              ${(cartTotal * 1.08).toFixed(2)}
            </Typography>
          </View>
          
          <Button
            title="Continue to Checkout"
            variant="primary"
            fullWidth
            style={styles.checkoutButton}
          />
          
          <Button
            title="Add more items"
            variant="outline"
            fullWidth
            style={styles.continueButton}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  titleContainer: {
    padding: theme.spacing[3],
  },
  listContent: {
    padding: theme.spacing[3],
    paddingBottom: theme.spacing[20], // To ensure the last item is visible above the summary
    flexGrow: 1,
  },
  itemCard: {
    marginBottom: theme.spacing[2],
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.sm,
  },
  productInfo: {
    flex: 1,
    marginLeft: theme.spacing[2],
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.spacing[2],
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.neutral[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    marginHorizontal: theme.spacing[1],
    minWidth: 24,
    textAlign: 'center',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  removeButton: {
    marginTop: theme.spacing[1],
    padding: theme.spacing[1],
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
  summaryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    padding: theme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral[200],
    ...theme.shadows.xl,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing[1],
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.neutral[200],
    marginVertical: theme.spacing[2],
  },
  checkoutButton: {
    marginTop: theme.spacing[3],
  },
  continueButton: {
    marginTop: theme.spacing[2],
  },
});
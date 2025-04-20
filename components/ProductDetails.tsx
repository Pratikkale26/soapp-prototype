import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { theme } from '@/constants/theme';
import Typography from './Typography';
import Button from './Button';
import { useAppContext } from '@/context/AppContext';
import { Heart, ShoppingCart } from 'lucide-react-native';

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
    category: string;
  };
  onClose: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  const { addToCart } = useAppContext();

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.image} />
        
        <View style={styles.content}>
          <Typography variant="h4" style={styles.name}>
            {product.name}
          </Typography>
          
          <Typography variant="h5" color={theme.colors.primary[600]} style={styles.price}>
            ${product.price.toFixed(2)}
          </Typography>
          
          <Typography variant="body2" color={theme.colors.neutral[600]} style={styles.category}>
            Category: {product.category}
          </Typography>
          
          {product.description && (
            <Typography variant="body1" style={styles.description}>
              {product.description}
            </Typography>
          )}
        </View>
      </ScrollView>
      
      <View style={styles.actions}>
        <Button
          variant="outline"
          title="Add to Wishlist"
          leftIcon={<Heart size={20} />}
          style={styles.wishlistButton}
        />
        <Button
          title="Add to Cart"
          leftIcon={<ShoppingCart size={20} />}
          onPress={handleAddToCart}
          style={styles.cartButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: theme.borderRadius.lg,
  },
  content: {
    padding: theme.spacing[4],
  },
  name: {
    marginBottom: theme.spacing[2],
  },
  price: {
    marginBottom: theme.spacing[2],
  },
  category: {
    marginBottom: theme.spacing[4],
  },
  description: {
    lineHeight: 24,
  },
  actions: {
    flexDirection: 'row',
    paddingTop: theme.spacing[4],
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral[200],
  },
  wishlistButton: {
    flex: 1,
    marginRight: theme.spacing[2],
  },
  cartButton: {
    flex: 2,
  },
});

export default ProductDetails;
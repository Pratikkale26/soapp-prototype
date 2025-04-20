import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/Header';
import Typography from '@/components/Typography';
import Card from '@/components/Card';
import BottomSheet from '@/components/BottomSheet';
import ProductDetails from '@/components/ProductDetails';
import { Search, ShoppingBag, Plus } from 'lucide-react-native';
import { mockCategories } from '@/data/mockData';

export default function StoreViewScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { 
    selectedStore, 
    products, 
    addToCart 
  } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const productWidth = (width - theme.spacing[3] * 4) / 2;

  if (!selectedStore) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Store" />
        <View style={styles.emptyContainer}>
          <Typography variant="h5" color={theme.colors.neutral[500]} align="center">
            No store selected
          </Typography>
          <TouchableOpacity
            style={styles.selectStoreButton}
            onPress={() => router.push('/store-selection')}
          >
            <Typography variant="button" color={theme.colors.white}>
              Select a Store
            </Typography>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleProductPress = (product: any) => {
    setSelectedProduct(product);
    setIsDetailsVisible(true);
  };

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={[
        styles.categoryIcon,
        { backgroundColor: theme.colors.primary[50] }
      ]}>
        <ShoppingBag size={20} color={theme.colors.primary[500]} />
      </View>
      <Typography variant="body2" style={styles.categoryName} numberOfLines={1}>
        {item.name}
      </Typography>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleProductPress(item)}>
      <Card style={[styles.productCard, { width: productWidth }]}>
        <View style={styles.productImageContainer}>
          <Image 
            source={{ uri: item.image }} 
            style={styles.productImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(item)}
          >
            <Plus size={16} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.productInfo}>
          <Typography variant="body2" numberOfLines={1}>
            {item.name}
          </Typography>
          <Typography variant="subtitle2" color={theme.colors.primary[600]}>
            ${item.price.toFixed(2)}
          </Typography>
        </View>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={selectedStore.name} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary[500]} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={selectedStore.name} />
        <View style={styles.errorContainer}>
          <Typography variant="h5" color={theme.colors.error[500]} align="center">
            {error}
          </Typography>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => setError(null)}
          >
            <Typography variant="button" color={theme.colors.white}>
              Retry
            </Typography>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={selectedStore.name} />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={theme.colors.neutral[500]} />
          <Typography
            variant="body2"
            color={theme.colors.neutral[500]}
            style={styles.searchText}
          >
            Search products...
          </Typography>
        </View>
      </View>
      
      <View style={styles.categoriesContainer}>
        <FlatList
          data={mockCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      
      <Typography variant="h5" style={styles.sectionTitle}>
        Popular Items
      </Typography>
      
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
      />

      <BottomSheet
        isVisible={isDetailsVisible}
        onClose={() => setIsDetailsVisible(false)}
      >
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onClose={() => setIsDetailsVisible(false)}
          />
        )}
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing[4],
  },
  retryButton: {
    marginTop: theme.spacing[4],
    backgroundColor: theme.colors.primary[500],
    paddingVertical: theme.spacing[2],
    paddingHorizontal: theme.spacing[4],
    borderRadius: theme.borderRadius.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing[4],
  },
  selectStoreButton: {
    marginTop: theme.spacing[4],
    backgroundColor: theme.colors.primary[500],
    paddingVertical: theme.spacing[1.5],
    paddingHorizontal: theme.spacing[3],
    borderRadius: theme.borderRadius.md,
  },
  searchContainer: {
    padding: theme.spacing[3],
    backgroundColor: theme.colors.white,
    ...theme.shadows.sm,
  },
  searchBar: {
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
  categoriesContainer: {
    backgroundColor: theme.colors.white,
    paddingVertical: theme.spacing[2],
    ...theme.shadows.sm,
  },
  categoriesList: {
    paddingHorizontal: theme.spacing[3],
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: theme.spacing[3],
    width: 80,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[1],
  },
  categoryName: {
    textAlign: 'center',
  },
  sectionTitle: {
    padding: theme.spacing[3],
    paddingBottom: theme.spacing[1],
  },
  productsList: {
    padding: theme.spacing[3],
    paddingTop: 0,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    marginBottom: theme.spacing[3],
    padding: 0,
    overflow: 'hidden',
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  addButton: {
    position: 'absolute',
    bottom: theme.spacing[1],
    right: theme.spacing[1],
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },
  productInfo: {
    padding: theme.spacing[2],
  },
});
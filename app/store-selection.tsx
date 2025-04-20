import React from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/Header';
import Typography from '@/components/Typography';
import Card from '@/components/Card';
import { MapPin } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StoreSelectionScreen() {
  const router = useRouter();
  const { stores, setSelectedStore } = useAppContext();

  const handleStoreSelect = (store: any) => {
    setSelectedStore(store);
    router.push('/store-view');
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleStoreSelect(item)}>
      <Card style={styles.storeCard}>
        <View style={styles.storeHeader}>
          <Typography variant="subtitle1">{item.name}</Typography>
        </View>
        
        <View style={styles.imageContainer}>
          <View style={styles.storePlaceholder}>
            <MapPin size={24} color={theme.colors.neutral[400]} />
          </View>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.storeImage} />
          )}
        </View>
        
        {item.address && (
          <View style={styles.addressContainer}>
            <MapPin size={16} color={theme.colors.neutral[600]} />
            <Typography
              variant="body2"
              color={theme.colors.neutral[600]}
              style={styles.addressText}
            >
              {item.address}
            </Typography>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.selectButton}
          onPress={() => handleStoreSelect(item)}
        >
          <Typography variant="button" color={theme.colors.white}>
            Select this
          </Typography>
        </TouchableOpacity>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Select store" />
      
      <FlatList
        data={stores}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Typography variant="h5">Store Locations</Typography>
            <Typography 
              variant="body2" 
              color={theme.colors.neutral[600]}
              style={styles.subtitle}
            >
              Select a store to browse products
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
  },
  subtitle: {
    marginTop: theme.spacing[0.5],
  },
  listContent: {
    padding: theme.spacing[3],
    paddingTop: 0,
  },
  storeCard: {
    marginBottom: theme.spacing[3],
  },
  storeHeader: {
    marginBottom: theme.spacing[2],
  },
  imageContainer: {
    position: 'relative',
    height: 160,
    marginBottom: theme.spacing[2],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.neutral[100],
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  storePlaceholder: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[3],
  },
  addressText: {
    marginLeft: theme.spacing[1],
  },
  selectButton: {
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing[1.5],
    alignItems: 'center',
  },
});
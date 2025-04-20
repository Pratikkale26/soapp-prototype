import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Typography from '@/components/Typography';
import { Check, Plus, X, ChevronRight, CreditCard as Edit2, Trash2 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ListScreen() {
  const { shoppingList, addToList, removeFromList, toggleItemChecked } = useAppContext();
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      addToList({
        name: newItem.trim(),
        checked: false,
      });
      setNewItem('');
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <Card style={styles.itemCard}>
      <View style={styles.itemRow}>
        <TouchableOpacity
          style={[
            styles.checkCircle,
            item.checked && styles.checkedCircle,
          ]}
          onPress={() => toggleItemChecked(item.id)}
        >
          {item.checked && <Check size={16} color={theme.colors.white} />}
        </TouchableOpacity>
        
        <Typography
          variant="body1"
          style={[styles.itemText, item.checked && styles.checkedText]}
        >
          {item.name}
        </Typography>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Edit2 size={18} color={theme.colors.primary[500]} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => removeFromList(item.id)}
          >
            <Trash2 size={18} color={theme.colors.error[500]} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  const emptyList = () => (
    <View style={styles.emptyContainer}>
      <Typography variant="h5" color={theme.colors.neutral[500]} align="center">
        Your shopping list is empty
      </Typography>
      <Typography
        variant="body2"
        color={theme.colors.neutral[400]}
        align="center"
        style={styles.emptyText}
      >
        Add items to your list by using the input field above
      </Typography>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Your List" showBackButton={false} />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add an item..."
          value={newItem}
          onChangeText={setNewItem}
          returnKeyType="done"
          onSubmitEditing={handleAddItem}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Plus size={24} color={theme.colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Typography variant="subtitle1">
            Manage Items ({shoppingList.length})
          </Typography>
          <Typography variant="body2" color={theme.colors.primary[500]}>
            Sort
          </Typography>
        </View>

        <FlatList
          data={shoppingList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={emptyList}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.resetButton}>
          <Typography variant="button" color={theme.colors.error[500]}>
            Reset
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Typography variant="button" color={theme.colors.white}>
            Save
          </Typography>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: theme.spacing[3],
    backgroundColor: theme.colors.white,
    ...theme.shadows.sm,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: theme.colors.neutral[100],
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing[2],
    marginRight: theme.spacing[2],
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.md,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    padding: theme.spacing[3],
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[2],
  },
  listContent: {
    flexGrow: 1,
  },
  itemCard: {
    marginBottom: theme.spacing[2],
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: theme.colors.neutral[400],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing[2],
  },
  checkedCircle: {
    backgroundColor: theme.colors.primary[500],
    borderColor: theme.colors.primary[500],
  },
  itemText: {
    flex: 1,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: theme.colors.neutral[500],
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing[2],
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.neutral[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    marginHorizontal: theme.spacing[1],
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: theme.spacing[1],
    marginLeft: theme.spacing[1],
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
  buttonsContainer: {
    flexDirection: 'row',
    padding: theme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral[200],
    backgroundColor: theme.colors.white,
  },
  resetButton: {
    flex: 1,
    height: 48,
    backgroundColor: theme.colors.background.light,
    borderWidth: 1,
    borderColor: theme.colors.error[500],
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing[2],
  },
  saveButton: {
    flex: 1,
    height: 48,
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockProducts } from '../data/mockData';

// Define types
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  store?: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type ListItem = {
  id: string;
  name: string;
  checked: boolean;
  category?: string;
  quantity?: number;
};

type Store = {
  id: string;
  name: string;
  image: string;
  address?: string;
};

type AppContextType = {
  // Shopping list
  shoppingList: ListItem[];
  addToList: (item: Omit<ListItem, 'id'>) => void;
  removeFromList: (id: string) => void;
  updateListItem: (id: string, item: Partial<ListItem>) => void;
  toggleItemChecked: (id: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  
  // Products
  products: Product[];
  getProductsByCategory: (category: string) => Product[];
  getProductById: (id: string) => Product | undefined;
  
  // Store
  selectedStore: Store | null;
  setSelectedStore: (store: Store) => void;
  stores: Store[];
  
  // Wallet
  walletBalance: number;
  updateWalletBalance: (amount: number) => void;
  
  // Orders
  orderHistory: any[];
  addToOrderHistory: (order: any) => void;
};

// Create context
const AppContext = createContext<AppContextType | null>(null);

// Mock stores data
const mockStores: Store[] = [
  {
    id: '1',
    name: 'Grocery Mart',
    image: 'https://images.pexels.com/photos/3962287/pexels-photo-3962287.jpeg?auto=compress&cs=tinysrgb&w=300',
    address: '123 Main St, Anytown'
  },
  {
    id: '2',
    name: 'Fresh Foods',
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=300',
    address: '456 Park Ave, Somewhere'
  },
  {
    id: '3',
    name: 'Super Mart',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=300',
    address: '789 Broadway, Elsewhere'
  }
];

// Provider component
export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [shoppingList, setShoppingList] = useState<ListItem[]>([
    { id: '1', name: 'Eggs', checked: false },
    { id: '2', name: 'Milk', checked: false },
    { id: '3', name: 'Bread', checked: false },
    { id: '4', name: 'Cereal', checked: false },
    { id: '5', name: 'Apples', checked: false },
    { id: '6', name: 'Chicken', checked: false },
    { id: '7', name: 'Rice', checked: false },
    { id: '8', name: 'Pasta', checked: false }
  ]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [stores] = useState<Store[]>(mockStores);
  const [walletBalance, setWalletBalance] = useState<number>(500.75);
  const [orderHistory, setOrderHistory] = useState<any[]>([
    {
      id: 'ord-001',
      date: '2023-10-15',
      total: 45.32,
      items: [
        { name: 'Milk', quantity: 1, price: 3.99 },
        { name: 'Eggs', quantity: 1, price: 5.49 },
        { name: 'Bread', quantity: 2, price: 4.29 }
      ],
      store: 'Super Mart'
    },
    {
      id: 'ord-002',
      date: '2023-10-08',
      total: 78.95,
      items: [
        { name: 'Chicken', quantity: 1, price: 12.99 },
        { name: 'Rice', quantity: 1, price: 8.49 },
        { name: 'Vegetables', quantity: 3, price: 4.29 }
      ],
      store: 'Fresh Foods'
    }
  ]);

  // Shopping list functions
  const addToList = (item: Omit<ListItem, 'id'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
    };
    setShoppingList(prev => [...prev, newItem]);
  };

  const removeFromList = (id: string) => {
    setShoppingList(prev => prev.filter(item => item.id !== id));
  };

  const updateListItem = (id: string, updatedItem: Partial<ListItem>) => {
    setShoppingList(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const toggleItemChecked = (id: string) => {
    setShoppingList(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Cart functions
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev => 
      prev.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Product functions
  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  // Wallet functions
  const updateWalletBalance = (amount: number) => {
    setWalletBalance(prev => prev + amount);
  };

  // Order functions
  const addToOrderHistory = (order: any) => {
    setOrderHistory(prev => [order, ...prev]);
  };

  const value = {
    shoppingList,
    addToList,
    removeFromList,
    updateListItem,
    toggleItemChecked,
    
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    
    products,
    getProductsByCategory,
    getProductById,
    
    selectedStore,
    setSelectedStore,
    stores,
    
    walletBalance,
    updateWalletBalance,
    
    orderHistory,
    addToOrderHistory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
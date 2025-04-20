import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/constants/theme';
import { Chrome as Home, List, ShoppingCart, Wallet, ChartBar as BarChart2 } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarInactiveTintColor: theme.colors.neutral[500],
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'List',
          tabBarIcon: ({ color, size }) => (
            <List size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <ShoppingCart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, size }) => (
            <Wallet size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <BarChart2 size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.background.light,
    borderTopColor: theme.colors.neutral[200],
    paddingTop: theme.spacing[1],
    height: 60,
    ...theme.shadows.md,
  },
});
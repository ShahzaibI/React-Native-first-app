import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../stores/authStore';
import { AuthStack } from './AuthStack';
import { MainDrawer } from './MainDrawer';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Initialize auth state when app starts
    initializeAuth();
    setInitializing(false);
  }, [initializeAuth]);

  if (initializing) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Group screenOptions={{ animationEnabled: false }}>
          <Stack.Screen name="Auth" component={AuthStack} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="MainApp" component={MainDrawer} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
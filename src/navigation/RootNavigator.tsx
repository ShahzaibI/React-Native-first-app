import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '@stores/authStore';
import { AuthStack } from './AuthStack';
import { MainDrawer } from './MainDrawer';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { isAuthenticated, user, initializeAuth } = useAuthStore();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Initialize auth state when app starts
    const unsubscribe = initializeAuth();
    setInitializing(false);
    return unsubscribe;
  }, [initializeAuth]);

  if (initializing) {
    return (
      <View className="flex-1 flex-center bg-background">
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

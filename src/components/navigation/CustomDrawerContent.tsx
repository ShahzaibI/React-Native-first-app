import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@stores/authStore';
import { MainDrawerParamList } from '@navigation/types';

type DrawerProps = {
  navigation: DrawerNavigationProp<MainDrawerParamList>;
};

export default function CustomDrawerContent({ navigation }: DrawerProps) {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Profile Section */}
        <View className="px-6 py-8 border-b border-secondary-50">
          <View className="flex-row items-center">
            {user?.profileImage ? (
              <Image
                source={{ uri: user.profileImage }}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <View className="w-16 h-16 rounded-full bg-primary-500 flex-center">
                <Ionicons name="person" size={32} color="#ffffff" />
              </View>
            )}
            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold text-foreground">{user?.name}</Text>
              <Text className="text-sm text-secondary-600">{user?.email}</Text>
              <Text className="text-xs text-secondary-500 mt-1">{user?.position}</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="py-4">
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}
            className="flex-row items-center px-6 py-4"
          >
            <Ionicons name="person" size={24} color="#4f46e5" />
            <Text className="ml-4 text-base font-500 text-foreground">Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SettingsScreen')}
            className="flex-row items-center px-6 py-4"
          >
            <Ionicons name="settings" size={24} color="#4f46e5" />
            <Text className="ml-4 text-base font-500 text-foreground">Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center px-6 py-4"
          >
            <Ionicons name="log-out" size={24} color="#ef4444" />
            <Text className="ml-4 text-base font-500 text-error">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="px-6 py-4 border-t border-secondary-50">
        <Text className="text-xs text-secondary-600 text-center">
          HRMS Mobile v1.0.0
        </Text>
      </View>
    </SafeAreaView>
  );
}

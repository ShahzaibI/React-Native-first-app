import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuthStore } from '../../stores/authStore';

export default function CustomDrawerContent(props) {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* User Profile Section */}
      <View className="bg-blue-600 px-6 py-8 pb-6">
        <View className="flex-row items-center">
          {user?.profileImage ? (
            <Image
              source={{ uri: user.profileImage }}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <View className="w-16 h-16 rounded-full bg-white/20 justify-center items-center">
              <Icon name="person" size={32} color="#ffffff" />
            </View>
          )}
          
          <View className="ml-4 flex-1">
            <Text className="text-white text-lg font-bold">{user?.name}</Text>
            <Text className="text-white/80 text-sm mt-1">{user?.email}</Text>
            <Text className="text-white/70 text-xs mt-1">
              {user?.department} • {user?.position}
            </Text>
          </View>
        </View>
      </View>

      {/* Navigation Items */}
      <DrawerContentScrollView {...props} className="flex-1">
        <View className="px-2">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* Logout Button */}
      <View className="border-t border-gray-200 p-4">
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center px-4 py-3"
        >
          <Icon name="log-out" size={24} color="#ef4444" />
          <Text className="text-red-600 font-medium ml-6">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
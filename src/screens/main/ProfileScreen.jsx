import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuthStore } from '../../stores/authStore';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuthStore();

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing would open here');
  };

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
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 px-6 py-4 pt-12">
        <Text className="text-white text-lg font-bold">Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="bg-white px-6 py-8 items-center">
          {user?.profileImage ? (
            <Image
              source={{ uri: user.profileImage }}
              className="w-24 h-24 rounded-full mb-4"
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-blue-100 justify-center items-center mb-4">
              <Icon name="person" size={48} color="#4f46e5" />
            </View>
          )}
          
          <Text className="text-gray-900 text-2xl font-bold">{user?.name}</Text>
          <Text className="text-gray-600 mt-1">{user?.email}</Text>
          <Text className="text-gray-500 text-sm mt-1">
            {user?.department} • {user?.position}
          </Text>

          <TouchableOpacity
            onPress={handleEditProfile}
            className="bg-blue-600 px-6 py-3 rounded-lg mt-6"
          >
            <Text className="text-white font-semibold">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Details */}
        <View className="px-6 py-6">
          <Text className="text-gray-900 font-bold text-lg mb-4">
            Personal Information
          </Text>

          <View className="bg-white rounded-lg border border-gray-100">
            <View className="p-4 border-b border-gray-100">
              <Text className="text-gray-500 text-sm">Employee ID</Text>
              <Text className="text-gray-900 font-medium mt-1">{user?.id}</Text>
            </View>

            <View className="p-4 border-b border-gray-100">
              <Text className="text-gray-500 text-sm">Department</Text>
              <Text className="text-gray-900 font-medium mt-1">{user?.department}</Text>
            </View>

            <View className="p-4 border-b border-gray-100">
              <Text className="text-gray-500 text-sm">Position</Text>
              <Text className="text-gray-900 font-medium mt-1">{user?.position}</Text>
            </View>

            <View className="p-4 border-b border-gray-100">
              <Text className="text-gray-500 text-sm">Join Date</Text>
              <Text className="text-gray-900 font-medium mt-1">{user?.joinDate}</Text>
            </View>

            <View className="p-4">
              <Text className="text-gray-500 text-sm">Salary</Text>
              <Text className="text-gray-900 font-medium mt-1">
                ${user?.salary?.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View className="px-6 pb-8">
          <Text className="text-gray-900 font-bold text-lg mb-4">Actions</Text>

          <View className="bg-white rounded-lg border border-gray-100">
            <TouchableOpacity className="p-4 border-b border-gray-100 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Icon name="document-text" size={24} color="#4f46e5" />
                <Text className="text-gray-900 font-medium ml-3">
                  Download Pay Slips
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity className="p-4 border-b border-gray-100 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Icon name="shield-checkmark" size={24} color="#10b981" />
                <Text className="text-gray-900 font-medium ml-3">
                  Change Password
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogout}
              className="p-4 flex-row items-center"
            >
              <Icon name="log-out" size={24} color="#ef4444" />
              <Text className="text-red-600 font-medium ml-3">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@stores/authStore';
import { MainDrawerScreenProps } from '@navigation/types';

type ProfileScreenProps = MainDrawerScreenProps<'ProfileScreen'>;

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { user } = useAuthStore();

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-secondary-100">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#4f46e5" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-foreground">Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View className="px-6 py-8 items-center">
          {user?.profileImage ? (
            <Image
              source={{ uri: user.profileImage }}
              className="w-32 h-32 rounded-full border-4 border-primary-100"
            />
          ) : (
            <View className="w-32 h-32 rounded-full bg-primary-500 flex-center border-4 border-primary-100">
              <Ionicons name="person" size={64} color="#ffffff" />
            </View>
          )}
          <Text className="text-2xl font-bold text-foreground mt-4">{user?.name}</Text>
          <Text className="text-secondary-600 mt-1">{user?.email}</Text>
        </View>

        {/* Profile Information */}
        <View className="px-6 pb-8">
          <Text className="text-lg font-bold text-foreground mb-4">
            Professional Information
          </Text>

          {/* Position */}
          <View className="bg-white rounded-lg p-4 border border-secondary-100 mb-3">
            <Text className="text-secondary-600 text-sm font-500">Position</Text>
            <Text className="text-foreground text-base font-600 mt-2">
              {user?.position}
            </Text>
          </View>

          {/* Department */}
          <View className="bg-white rounded-lg p-4 border border-secondary-100 mb-3">
            <Text className="text-secondary-600 text-sm font-500">Department</Text>
            <Text className="text-foreground text-base font-600 mt-2">
              {user?.department}
            </Text>
          </View>

          {/* Join Date */}
          <View className="bg-white rounded-lg p-4 border border-secondary-100 mb-3">
            <Text className="text-secondary-600 text-sm font-500">Join Date</Text>
            <Text className="text-foreground text-base font-600 mt-2">
              {user?.joinDate}
            </Text>
          </View>

          {/* Salary (if available) */}
          {user?.salary && (
            <View className="bg-white rounded-lg p-4 border border-secondary-100">
              <Text className="text-secondary-600 text-sm font-500">
                Annual Salary
              </Text>
              <Text className="text-foreground text-base font-600 mt-2">
                ${user.salary.toLocaleString()}
              </Text>
            </View>
          )}
        </View>

        {/* Contact Section */}
        <View className="px-6 pb-8">
          <Text className="text-lg font-bold text-foreground mb-4">
            Contact Information
          </Text>
          <View className="bg-white rounded-lg p-4 border border-secondary-100">
            <View className="flex-row items-center">
              <Ionicons name="mail" size={20} color="#4f46e5" />
              <Text className="text-foreground ml-3">{user?.email}</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 pb-8">
          <TouchableOpacity className="bg-white rounded-lg p-4 border border-secondary-100 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="call" size={20} color="#4f46e5" />
              <Text className="text-foreground ml-3 font-500">Contact Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

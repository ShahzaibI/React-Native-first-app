import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MainDrawerScreenProps } from '@navigation/types';

type SettingsScreenProps = MainDrawerScreenProps<'SettingsScreen'>;

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      { text: 'Logout', onPress: () => {} },
    ]);
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-secondary-100">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#4f46e5" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-foreground">Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Notifications Section */}
        <View className="px-6 py-6">
          <Text className="text-lg font-bold text-foreground mb-3">Notifications</Text>
          
          <View className="bg-white rounded-lg p-4 border border-secondary-100 flex-row items-center justify-between mb-2">
            <View className="flex-row items-center flex-1">
              <Ionicons name="notifications" size={20} color="#4f46e5" />
              <Text className="text-foreground ml-3 font-500">Enable Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#e5e7eb', true: '#a5f3fc' }}
              thumbColor={notifications ? '#4f46e5' : '#9ca3af'}
            />
          </View>

          <Text className="text-secondary-600 text-xs px-4 mt-2">
            Receive alerts for attendance, leave, and payroll updates
          </Text>
        </View>

        {/* Security Section */}
        <View className="px-6 py-6">
          <Text className="text-lg font-bold text-foreground mb-3">Security</Text>
          
          <TouchableOpacity className="bg-white rounded-lg p-4 border border-secondary-100 flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Ionicons name="lock" size={20} color="#4f46e5" />
              <Text className="text-foreground ml-3 font-500">Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <View className="bg-white rounded-lg p-4 border border-secondary-100 flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <Ionicons name="finger-print" size={20} color="#4f46e5" />
              <Text className="text-foreground ml-3 font-500">Biometric Login</Text>
            </View>
            <Switch
              value={biometric}
              onValueChange={setBiometric}
              trackColor={{ false: '#e5e7eb', true: '#a5f3fc' }}
              thumbColor={biometric ? '#4f46e5' : '#9ca3af'}
            />
          </View>
        </View>

        {/* Display Section */}
        <View className="px-6 py-6">
          <Text className="text-lg font-bold text-foreground mb-3">Display</Text>
          
          <View className="bg-white rounded-lg p-4 border border-secondary-100 flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <Ionicons name="moon" size={20} color="#4f46e5" />
              <Text className="text-foreground ml-3 font-500">Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#e5e7eb', true: '#a5f3fc' }}
              thumbColor={darkMode ? '#4f46e5' : '#9ca3af'}
            />
          </View>
        </View>

        {/* About Section */}
        <View className="px-6 py-6">
          <Text className="text-lg font-bold text-foreground mb-3">About</Text>
          
          <TouchableOpacity className="bg-white rounded-lg p-4 border border-secondary-100 flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Ionicons name="information-circle" size={20} color="#4f46e5" />
              <Text className="text-foreground ml-3 font-500">About HRMS</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-lg p-4 border border-secondary-100 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="document-text" size={20} color="#4f46e5" />
              <Text className="text-foreground ml-3 font-500">Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View className="px-6 py-6 pb-8">
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-error rounded-lg py-4 flex-row items-center justify-center"
          >
            <Ionicons name="log-out" size={20} color="#ffffff" />
            <Text className="text-white font-600 ml-2">Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Version */}
        <View className="px-6 pb-8">
          <Text className="text-secondary-600 text-center text-xs">
            HRMS Mobile v1.0.0
          </Text>
          <Text className="text-secondary-500 text-center text-xs mt-1">
            © 2024 HRMS. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

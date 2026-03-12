import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(false);

  const handleAbout = () => {
    Alert.alert(
      'About HRMS',
      'Human Resource Management System\nVersion 1.0.0\n\nBuilt with React Native'
    );
  };

  const handleSupport = () => {
    Alert.alert('Support', 'Contact support at support@company.com');
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 px-6 py-4 pt-12">
        <Text className="text-white text-lg font-bold">Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Preferences */}
        <View className="px-6 py-6">
          <Text className="text-gray-900 font-bold text-lg mb-4">
            Preferences
          </Text>

          <View className="bg-white rounded-lg border border-gray-100">
            <View className="p-4 border-b border-gray-100 flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Icon name="notifications" size={24} color="#4f46e5" />
                <View className="ml-3 flex-1">
                  <Text className="text-gray-900 font-medium">Notifications</Text>
                  <Text className="text-gray-500 text-sm mt-1">
                    Receive push notifications
                  </Text>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#e5e7eb', true: '#4f46e5' }}
                thumbColor={notifications ? '#ffffff' : '#f3f4f6'}
              />
            </View>

            <View className="p-4 border-b border-gray-100 flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Icon name="moon" size={24} color="#6b7280" />
                <View className="ml-3 flex-1">
                  <Text className="text-gray-900 font-medium">Dark Mode</Text>
                  <Text className="text-gray-500 text-sm mt-1">
                    Use dark theme
                  </Text>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#e5e7eb', true: '#4f46e5' }}
                thumbColor={darkMode ? '#ffffff' : '#f3f4f6'}
              />
            </View>

            <View className="p-4 flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Icon name="finger-print" size={24} color="#10b981" />
                <View className="ml-3 flex-1">
                  <Text className="text-gray-900 font-medium">Biometric Login</Text>
                  <Text className="text-gray-500 text-sm mt-1">
                    Use fingerprint or face ID
                  </Text>
                </View>
              </View>
              <Switch
                value={biometric}
                onValueChange={setBiometric}
                trackColor={{ false: '#e5e7eb', true: '#4f46e5' }}
                thumbColor={biometric ? '#ffffff' : '#f3f4f6'}
              />
            </View>
          </View>
        </View>

        {/* Support */}
        <View className="px-6 pb-6">
          <Text className="text-gray-900 font-bold text-lg mb-4">
            Support & Info
          </Text>

          <View className="bg-white rounded-lg border border-gray-100">
            <TouchableOpacity
              onPress={handleSupport}
              className="p-4 border-b border-gray-100 flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <Icon name="help-circle" size={24} color="#f59e0b" />
                <Text className="text-gray-900 font-medium ml-3">
                  Help & Support
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity className="p-4 border-b border-gray-100 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Icon name="document-text" size={24} color="#6b7280" />
                <Text className="text-gray-900 font-medium ml-3">
                  Terms of Service
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity className="p-4 border-b border-gray-100 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Icon name="shield-checkmark" size={24} color="#10b981" />
                <Text className="text-gray-900 font-medium ml-3">
                  Privacy Policy
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAbout}
              className="p-4 flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <Icon name="information-circle" size={24} color="#4f46e5" />
                <Text className="text-gray-900 font-medium ml-3">About</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useAuthStore } from '../../stores/authStore';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, loading, error } = useAuthStore();

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      await signup(email, password, name);
    } catch (err) {
      Alert.alert('Signup Failed', error || 'An error occurred during signup');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 py-8">
          {/* Header */}
          <View className="mb-8 mt-8">
            <Text className="text-3xl font-bold text-blue-600 text-center">
              Create Account
            </Text>
            <Text className="text-center text-gray-600 mt-2">
              Join our HRMS platform
            </Text>
          </View>

          {/* Error Message */}
          {error && (
            <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <Text className="text-red-600 text-sm">{error}</Text>
            </View>
          )}

          {/* Name Input */}
          <View className="mb-6">
            <Text className="text-gray-700 font-semibold mb-2">Full Name</Text>
            <TextInput
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
              placeholder="John Doe"
              placeholderTextColor="#9ca3af"
              editable={!loading}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email Input */}
          <View className="mb-6">
            <Text className="text-gray-700 font-semibold mb-2">Email Address</Text>
            <TextInput
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
              placeholder="your.email@company.com"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <Text className="text-gray-700 font-semibold mb-2">Password</Text>
            <TextInput
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
              placeholder="••••••••"
              placeholderTextColor="#9ca3af"
              secureTextEntry
              editable={!loading}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Confirm Password Input */}
          <View className="mb-8">
            <Text className="text-gray-700 font-semibold mb-2">Confirm Password</Text>
            <TextInput
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
              placeholder="••••••••"
              placeholderTextColor="#9ca3af"
              secureTextEntry
              editable={!loading}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignup}
            disabled={loading}
            className="bg-blue-600 rounded-lg py-4 flex-row items-center justify-center mb-4"
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white font-semibold text-center text-base">Create Account</Text>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
              disabled={loading}
            >
              <Text className="text-blue-600 font-semibold">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@services/firebase';
import { AuthStackScreenProps } from '@navigation/types';

type ForgotPasswordScreenProps = AuthStackScreenProps<'ForgotPasswordScreen'>;

export default function ForgotPasswordScreen({
  navigation,
}: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
      Alert.alert(
        'Success',
        'Password reset email has been sent. Please check your inbox.'
      );
      setTimeout(() => navigation.goBack(), 2000);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 py-8 justify-center">
          {/* Header */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-primary-600 text-center">
              Reset Password
            </Text>
            <Text className="text-center text-secondary-600 mt-2">
              Enter your email to receive a password reset link
            </Text>
          </View>

          {/* Email Input */}
          <View className="mb-8">
            <Text className="text-foreground font-600 mb-2">Email Address</Text>
            <TextInput
              className="bg-secondary-50 border border-secondary-200 rounded-lg px-4 py-3 text-foreground"
              placeholder="your.email@company.com"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Reset Button */}
          <TouchableOpacity
            onPress={handleResetPassword}
            disabled={loading}
            className="bg-primary-600 rounded-lg py-4 flex-row items-center justify-center mb-4"
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white font-600 text-center text-base">
                Send Reset Email
              </Text>
            )}
          </TouchableOpacity>

          {/* Back to Login Link */}
          <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading}>
            <Text className="text-primary-600 font-600 text-center">Back to Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

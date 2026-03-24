import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    Alert.alert('Success', 'Password reset link sent to your email', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-12 left-6 w-10 h-10 items-center justify-center"
        >
          <Icon name="arrow-back" size={24} color="#015BA6" />
        </TouchableOpacity>

        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-[#015BA6] rounded-full items-center justify-center mb-4">
            <Icon name="lock-reset" size={40} color="white" />
          </View>
          <Text className="text-3xl font-bold text-[#015BA6] mb-2">Reset Password</Text>
          <Text className="text-gray-600 text-center">Enter your email to receive reset instructions</Text>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 mb-2 font-medium">Email Address</Text>
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
              <Icon name="email" size={20} color="#666" />
              <TextInput
                className="flex-1 ml-3 text-gray-800"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleResetPassword}
            className="bg-[#015BA6] rounded-lg py-4 items-center mt-6"
          >
            <Text className="text-white font-semibold text-lg">Send Reset Link</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="items-center mt-4"
          >
            <Text className="text-gray-600">Remember your password? <Text className="text-[#015BA6] font-medium">Sign In</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
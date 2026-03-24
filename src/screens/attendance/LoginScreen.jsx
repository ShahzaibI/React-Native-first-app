import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Simulate login success
    navigation.replace('DrawerNavigator');
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6">
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-[#015BA6] rounded-full items-center justify-center mb-4">
            <Icon name="business" size={40} color="white" />
          </View>
          <Text className="text-3xl font-bold text-[#015BA6] mb-2">Welcome Back</Text>
          <Text className="text-gray-600 text-center">Sign in to your account</Text>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 mb-2 font-medium">Email</Text>
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

          <View>
            <Text className="text-gray-700 mb-2 font-medium">Password</Text>
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
              <Icon name="lock" size={20} color="#666" />
              <TextInput
                className="flex-1 ml-3 text-gray-800"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? "visibility" : "visibility-off"} size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            className="self-end"
          >
            <Text className="text-[#015BA6] font-medium">Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-[#015BA6] rounded-lg py-4 items-center mt-6"
          >
            <Text className="text-white font-semibold text-lg">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
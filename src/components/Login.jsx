import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import { loginUser } from '../services/auth';
import Icon from 'react-native-vector-icons/Ionicons';

const Login = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        
        setLoading(true);
        try {
            const {emailVerified} = await loginUser(email, password);
            if(emailVerified){
                Alert.alert('Success', 'Logged in successfully!');
            }
            else{
                Alert.alert('Error', 'Please verify your email address before logging in.');
            }
            setEmail('');
            setPassword('');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            <ScrollView className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100">
                <View className="flex-1 justify-center px-6 py-16">
                    {/* Header Section */}
                    <View className="items-center mb-10">
                        <View className="bg-blue-600 w-20 h-20 rounded-full items-center justify-center mb-4">
                            <Icon name="person" size={40} color="white" />
                        </View>
                        <Text className="text-center text-4xl font-bold text-gray-900 mb-2">
                            Welcome Back
                        </Text>
                        <Text className="text-gray-600 text-center">
                            Sign in to continue
                        </Text>
                    </View>
                    
                    {/* Form Card */}
                    <View className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
                        {/* Email Input */}
                        <View className="mb-5">
                            <Text className="text-gray-700 font-semibold mb-2 ml-1">Email Address</Text>
                            <View className="bg-gray-50 rounded-xl border border-gray-200">
                                <TextInput
                                    className="px-4 py-4 text-gray-800 text-base"
                                    placeholder="john@example.com"
                                    placeholderTextColor="#9CA3AF"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>
                        
                        {/* Password Input */}
                        <View className="mb-6">
                            <Text className="text-gray-700 font-semibold mb-2 ml-1">Password</Text>
                            <View className="bg-gray-50 rounded-xl border border-gray-200">
                                <TextInput
                                    className="px-4 py-4 text-gray-800 text-base"
                                    placeholder="••••••••"
                                    placeholderTextColor="#9CA3AF"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
                            </View>
                        </View>
                        
                        {/* Login Button */}
                        <TouchableOpacity 
                            className="bg-blue-600 rounded-xl py-4 shadow-lg active:bg-blue-700"
                            activeOpacity={0.8}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            <Text className="text-white text-center font-bold text-lg">
                                {loading ? 'Signing In...' : 'Sign In'}
                            </Text>
                        </TouchableOpacity>
                        
                        {/* Forgot Password */}
                        <TouchableOpacity className="mt-4" activeOpacity={0.7} onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text className="text-blue-600 text-center text-sm font-semibold">
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/* Sign Up Link */}
                    <View className="flex-row justify-center items-center">
                        <Text className="text-gray-700 text-base">Don't have an account? </Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Register')}>
                            <Text className="text-blue-600 font-bold text-base">Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;
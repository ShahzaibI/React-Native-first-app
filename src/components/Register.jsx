import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import { registerUser } from '../services/auth';
import Icon from 'react-native-vector-icons/Ionicons';

const Register = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    
    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        
        setLoading(true);
        try {
            await registerUser(email, password);
            Alert.alert('Success', 'Account created! Please verify your email.');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
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
                        <Text className="text-4xl font-bold text-gray-900 mb-2">
                            Create Account
                        </Text>
                        <Text className="text-gray-600 text-center">
                            Sign up to get started
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
                        <View className="mb-5">
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
                        
                        {/* Confirm Password Input */}
                        <View className="mb-6">
                            <Text className="text-gray-700 font-semibold mb-2 ml-1">Confirm Password</Text>
                            <View className="bg-gray-50 rounded-xl border border-gray-200">
                                <TextInput
                                    className="px-4 py-4 text-gray-800 text-base"
                                    placeholder="••••••••"
                                    placeholderTextColor="#9CA3AF"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                />
                            </View>
                        </View>
                        
                        {/* Register Button */}
                        <TouchableOpacity 
                            className="bg-blue-600 rounded-xl py-4 shadow-lg active:bg-blue-700"
                            activeOpacity={0.8}
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            <Text className="text-white text-center font-bold text-lg">
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </Text>
                        </TouchableOpacity>
                        
                        {/* Terms Text */}
                        <Text className="text-gray-500 text-xs text-center mt-4 px-4">
                            By signing up, you agree to our Terms of Service and Privacy Policy
                        </Text>
                    </View>
                    
                    {/* Sign In Link */}
                    <View className="flex-row justify-center items-center">
                        <Text className="text-gray-700 text-base">Already have an account? </Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Login')}>
                            <Text className="text-blue-600 font-bold text-base">Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Register;
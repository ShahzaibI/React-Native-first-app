import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import { resetPassword } from '../services/auth';
import Icon from 'react-native-vector-icons/Ionicons';

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    
    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }
        
        setLoading(true);
        try {
            await resetPassword(email);
            Alert.alert('Success', 'Password reset email sent! Please check your inbox.');
            setEmail('');
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
                            <Icon name="lock-closed" size={40} color="white" />
                        </View>
                        <Text className="text-4xl font-bold text-gray-900 mb-2">
                            Forgot Password?
                        </Text>
                        <Text className="text-gray-600 text-center px-8">
                            Enter your email address and we'll send you a link to reset your password
                        </Text>
                    </View>
                    
                    {/* Form Card */}
                    <View className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
                        {/* Email Input */}
                        <View className="mb-6">
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
                        
                        {/* Reset Button */}
                        <TouchableOpacity 
                            className="bg-blue-600 rounded-xl py-4 shadow-lg active:bg-blue-700"
                            activeOpacity={0.8}
                            onPress={handleResetPassword}
                            disabled={loading}
                        >
                            <Text className="text-white text-center font-bold text-lg">
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/* Back to Login Link */}
                    <View className="flex-row justify-center items-center">
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Login')}>
                            <Text className="text-blue-600 font-bold text-base">Back to Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ForgotPassword;

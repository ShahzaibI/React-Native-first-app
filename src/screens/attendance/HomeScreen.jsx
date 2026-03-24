import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [checkInTime, setCheckInTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckInOut = () => {
    if (!isCheckedIn) {
      setCheckInTime(new Date());
      setIsCheckedIn(true);
      Alert.alert('Success', 'Checked in successfully!');
    } else {
      setIsCheckedIn(false);
      setCheckInTime(null);
      Alert.alert('Success', 'Checked out successfully!');
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-[#015BA6] px-6 pt-12 pb-8">
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="notifications" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <Text className="text-white text-2xl font-bold mb-2">Good Morning, John!</Text>
        <Text className="text-blue-100 text-base">{formatDate(currentTime)}</Text>
        <Text className="text-blue-100 text-lg font-medium">{formatTime(currentTime)}</Text>
      </View>

      <View className="px-6 -mt-4">
        {/* Check In/Out Card */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-800">Attendance</Text>
            <View className={`px-3 py-1 rounded-full ${isCheckedIn ? 'bg-green-100' : 'bg-gray-100'}`}>
              <Text className={`text-sm font-medium ${isCheckedIn ? 'text-green-800' : 'text-gray-600'}`}>
                {isCheckedIn ? 'Checked In' : 'Not Checked In'}
              </Text>
            </View>
          </View>
          
          {checkInTime && (
            <View className="mb-4">
              <Text className="text-gray-600 text-sm">Check-in Time</Text>
              <Text className="text-lg font-semibold text-gray-800">{formatTime(checkInTime)}</Text>
            </View>
          )}

          <TouchableOpacity
            onPress={handleCheckInOut}
            className={`py-4 rounded-lg items-center ${isCheckedIn ? 'bg-red-500' : 'bg-[#015BA6]'}`}
          >
            <View className="flex-row items-center">
              <Icon name={isCheckedIn ? "logout" : "login"} size={20} color="white" />
              <Text className="text-white font-semibold text-lg ml-2">
                {isCheckedIn ? 'Check Out' : 'Check In'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-white rounded-xl p-4 flex-1 mr-3 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Icon name="today" size={20} color="#015BA6" />
              <Text className="text-gray-600 text-sm ml-2">This Month</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-800">22</Text>
            <Text className="text-green-600 text-sm">Present Days</Text>
          </View>
          
          <View className="bg-white rounded-xl p-4 flex-1 ml-3 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Icon name="schedule" size={20} color="#015BA6" />
              <Text className="text-gray-600 text-sm ml-2">Working Hours</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-800">176</Text>
            <Text className="text-blue-600 text-sm">This Month</Text>
          </View>
        </View>

        {/* Leave Summary */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-gray-800">Leave Balance</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-[#015BA6] font-medium text-sm mr-1">View Details</Text>
              <Icon name="chevron-right" size={16} color="#015BA6" />
            </TouchableOpacity>
          </View>
          
          <View className="space-y-4">
            {/* Annual Leave */}
            <View className="bg-blue-50 rounded-lg p-4 mb-3">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3">
                    <Icon name="beach-access" size={16} color="#015BA6" />
                  </View>
                  <Text className="text-gray-800 font-semibold">Annual Leave</Text>
                </View>
                <Text className="text-gray-600 text-sm">Expires: Dec 31, 2024</Text>
              </View>
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-2xl font-bold text-[#015BA6]">8</Text>
                <Text className="text-gray-600">remaining of 20 days</Text>
              </View>
              <View className="bg-gray-200 rounded-full h-2 mb-1">
                <View className="bg-[#015BA6] h-2 rounded-full" style={{width: '60%'}} />
              </View>
              <Text className="text-xs text-gray-500">12 days used</Text>
            </View>

            {/* Sick Leave */}
            <View className="bg-green-50 rounded-lg p-4 mb-3">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3">
                    <Icon name="local-hospital" size={16} color="#22c55e" />
                  </View>
                  <Text className="text-gray-800 font-semibold">Sick Leave</Text>
                </View>
                <Text className="text-gray-600 text-sm">Annual Reset</Text>
              </View>
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-2xl font-bold text-green-600">8</Text>
                <Text className="text-gray-600">remaining of 10 days</Text>
              </View>
              <View className="bg-gray-200 rounded-full h-2 mb-1">
                <View className="bg-green-500 h-2 rounded-full" style={{width: '20%'}} />
              </View>
              <Text className="text-xs text-gray-500">2 days used</Text>
            </View>

            {/* Personal Leave */}
            <View className="bg-purple-50 rounded-lg p-4 mb-3">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 bg-purple-100 rounded-full items-center justify-center mr-3">
                    <Icon name="person" size={16} color="#8b5cf6" />
                  </View>
                  <Text className="text-gray-800 font-semibold">Personal Leave</Text>
                </View>
                <Text className="text-gray-600 text-sm">Flexible</Text>
              </View>
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-2xl font-bold text-purple-600">4</Text>
                <Text className="text-gray-600">remaining of 5 days</Text>
              </View>
              <View className="bg-gray-200 rounded-full h-2 mb-1">
                <View className="bg-purple-500 h-2 rounded-full" style={{width: '20%'}} />
              </View>
              <Text className="text-xs text-gray-500">1 day used</Text>
            </View>
          </View>

          {/* Quick Apply Leave Button */}
          <TouchableOpacity className="bg-[#015BA6] rounded-lg py-3 items-center mt-4">
            <View className="flex-row items-center">
              <Icon name="add" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">Apply for Leave</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Quick Actions</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="items-center flex-1">
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                <Icon name="event" size={24} color="#015BA6" />
              </View>
              <Text className="text-gray-700 text-sm text-center">Apply Leave</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="items-center flex-1"
              onPress={() => navigation.navigate('Timesheet')}
            >
              <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                <Icon name="schedule" size={24} color="#22c55e" />
              </View>
              <Text className="text-gray-700 text-sm text-center">Timesheet</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="items-center flex-1"
              onPress={() => navigation.navigate('Profile')}
            >
              <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mb-2">
                <Icon name="person" size={24} color="#8b5cf6" />
              </View>
              <Text className="text-gray-700 text-sm text-center">Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
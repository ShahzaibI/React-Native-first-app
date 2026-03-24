import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }) => {
  const employeeData = {
    name: 'John Doe',
    employeeId: 'EMP001',
    department: 'Software Development',
    position: 'Senior Developer',
    email: 'john.doe@company.com',
    phone: '+1 234 567 8900',
    joinDate: 'January 15, 2022',
    manager: 'Sarah Johnson',
    workLocation: 'New York Office'
  };

  const ProfileItem = ({ icon, label, value }) => (
    <View className="flex-row items-center py-4 border-b border-gray-100">
      <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center mr-4">
        <Icon name={icon} size={20} color="#015BA6" />
      </View>
      <View className="flex-1">
        <Text className="text-gray-500 text-sm">{label}</Text>
        <Text className="text-gray-800 font-medium text-base">{value}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-[#015BA6] px-6 pt-12 pb-8">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold ml-4">Profile</Text>
        </View>
        
        <View className="items-center">
          <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4">
            <Icon name="person" size={48} color="#015BA6" />
          </View>
          <Text className="text-white text-2xl font-bold">{employeeData.name}</Text>
          <Text className="text-blue-100 text-base">{employeeData.position}</Text>
          <Text className="text-blue-100 text-sm">{employeeData.employeeId}</Text>
        </View>
      </View>

      <View className="px-6 -mt-4">
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Personal Information</Text>
          
          <ProfileItem 
            icon="badge" 
            label="Employee ID" 
            value={employeeData.employeeId} 
          />
          <ProfileItem 
            icon="business" 
            label="Department" 
            value={employeeData.department} 
          />
          <ProfileItem 
            icon="work" 
            label="Position" 
            value={employeeData.position} 
          />
          <ProfileItem 
            icon="email" 
            label="Email" 
            value={employeeData.email} 
          />
          <ProfileItem 
            icon="phone" 
            label="Phone" 
            value={employeeData.phone} 
          />
          <ProfileItem 
            icon="event" 
            label="Join Date" 
            value={employeeData.joinDate} 
          />
          <ProfileItem 
            icon="supervisor-account" 
            label="Manager" 
            value={employeeData.manager} 
          />
          <ProfileItem 
            icon="location-on" 
            label="Work Location" 
            value={employeeData.workLocation} 
          />
        </View>

        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Quick Stats</Text>
          
          <View className="flex-row justify-between mb-4">
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-[#015BA6]">2.5</Text>
              <Text className="text-gray-600 text-sm text-center">Years at Company</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-green-600">95%</Text>
              <Text className="text-gray-600 text-sm text-center">Attendance Rate</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-purple-600">15</Text>
              <Text className="text-gray-600 text-sm text-center">Leave Days Used</Text>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Settings</Text>
          
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <Icon name="edit" size={20} color="#015BA6" />
              <Text className="text-gray-800 ml-3">Edit Profile</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <Icon name="lock" size={20} color="#015BA6" />
              <Text className="text-gray-800 ml-3">Change Password</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <Icon name="notifications" size={20} color="#015BA6" />
              <Text className="text-gray-800 ml-3">Notifications</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center justify-between py-4">
            <View className="flex-row items-center">
              <Icon name="help" size={20} color="#015BA6" />
              <Text className="text-gray-800 ml-3">Help & Support</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="bg-red-500 rounded-xl p-4 items-center mb-6">
          <View className="flex-row items-center">
            <Icon name="logout" size={20} color="white" />
            <Text className="text-white font-semibold text-lg ml-2">Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
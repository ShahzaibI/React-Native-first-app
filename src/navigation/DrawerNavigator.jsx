import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/attendance/HomeScreen';
import ProfileScreen from '../screens/attendance/ProfileScreen';
import TimesheetScreen from '../screens/attendance/TimesheetScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { navigation } = props;

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => navigation.replace('Login')
        }
      ]
    );
  };

  const DrawerItem = ({ icon, label, onPress, isActive = false }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center px-6 py-4 mx-3 rounded-lg mb-2 ${
        isActive ? 'bg-blue-50' : ''
      }`}
    >
      <Icon 
        name={icon} 
        size={24} 
        color={isActive ? '#015BA6' : '#666'} 
      />
      <Text 
        className={`ml-4 text-base font-medium ${
          isActive ? 'text-[#015BA6]' : 'text-gray-700'
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <View className="bg-[#015BA6] px-6 pt-12 pb-8">
        <View className="w-16 h-16 bg-white rounded-full items-center justify-center mb-4">
          <Icon name="person" size={32} color="#015BA6" />
        </View>
        <Text className="text-white text-xl font-bold">John Doe</Text>
        <Text className="text-blue-100 text-sm">Senior Developer</Text>
        <Text className="text-blue-100 text-sm">EMP001</Text>
      </View>

      <ScrollView className="flex-1 pt-4">
        <DrawerItem
          icon="dashboard"
          label="Dashboard"
          onPress={() => navigation.navigate('Home')}
          isActive={props.state.index === 0}
        />
        <DrawerItem
          icon="person"
          label="Profile"
          onPress={() => navigation.navigate('Profile')}
          isActive={props.state.index === 1}
        />
        <DrawerItem
          icon="schedule"
          label="Timesheet"
          onPress={() => navigation.navigate('Timesheet')}
          isActive={props.state.index === 2}
        />
        
        <View className="border-t border-gray-200 mt-4 pt-4">
          <DrawerItem
            icon="event"
            label="Leave Management"
            onPress={() => {}}
          />
          <DrawerItem
            icon="assessment"
            label="Reports"
            onPress={() => {}}
          />
          <DrawerItem
            icon="notifications"
            label="Notifications"
            onPress={() => {}}
          />
        </View>

        <View className="border-t border-gray-200 mt-4 pt-4">
          <DrawerItem
            icon="settings"
            label="Settings"
            onPress={() => {}}
          />
          <DrawerItem
            icon="help"
            label="Help & Support"
            onPress={() => {}}
          />
        </View>
      </ScrollView>

      <View className="border-t border-gray-200 p-4">
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center px-6 py-4 bg-red-50 rounded-lg"
        >
          <Icon name="logout" size={24} color="#ef4444" />
          <Text className="ml-4 text-base font-medium text-red-600">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Timesheet" component={TimesheetScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
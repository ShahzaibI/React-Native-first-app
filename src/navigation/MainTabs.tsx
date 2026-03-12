import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '@screens/main/HomeScreen';
import AttendanceScreen from '@screens/main/AttendanceScreen';
import LeaveScreen from '@screens/main/LeaveScreen';
import PayrollScreen from '@screens/main/PayrollScreen';
import { MainTabsParamList } from './types';

const Tab = createBottomTabNavigator<MainTabsParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#4f46e5',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        tabBarActiveTintColor: '#4f46e5',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e7eb',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'HomeScreen':
              iconName = 'home';
              break;
            case 'AttendanceScreen':
              iconName = 'calendar';
              break;
            case 'LeaveScreen':
              iconName = 'time';
              break;
            case 'PayrollScreen':
              iconName = 'wallet';
              break;
            default:
              iconName = 'help';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ color }) => {
          let label = '';
          switch (route.name) {
            case 'HomeScreen':
              label = 'Home';
              break;
            case 'AttendanceScreen':
              label = 'Attendance';
              break;
            case 'LeaveScreen':
              label = 'Leave';
              break;
            case 'PayrollScreen':
              label = 'Payroll';
              break;
          }
          return (
            <Text className="text-xs font-medium" style={{ color }}>
              {label}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="AttendanceScreen"
        component={AttendanceScreen}
        options={{ title: 'Attendance' }}
      />
      <Tab.Screen
        name="LeaveScreen"
        component={LeaveScreen}
        options={{ title: 'Leave' }}
      />
      <Tab.Screen
        name="PayrollScreen"
        component={PayrollScreen}
        options={{ title: 'Payroll' }}
      />
    </Tab.Navigator>
  );
}

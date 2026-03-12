import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuthStore } from '../../stores/authStore';
import { useAttendanceStore } from '../../stores/attendanceStore';

const getStatusColor = (status) => {
  switch (status) {
    case 'present': return '#10b981';
    case 'absent': return '#ef4444';
    case 'late': return '#f59e0b';
    case 'half_day': return '#8b5cf6';
    default: return '#6b7280';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'present': return 'Present';
    case 'absent': return 'Absent';
    case 'late': return 'Late';
    case 'half_day': return 'Half Day';
    default: return status;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: '2-digit' 
  });
};

const formatTime = (timeString) => {
  return timeString || '--:--';
};

export default function AttendanceScreen({ navigation }) {
  const { user } = useAuthStore();
  const { records, fetchAttendance, checkIn, checkOut, loading } = useAttendanceStore();
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  useFocusEffect(
    React.useCallback(() => {
      if (user?.id) {
        fetchAttendance(user.id, selectedMonth);
      }
    }, [user?.id, selectedMonth])
  );

  const handleCheckIn = async () => {
    if (!user?.id) return;
    try {
      const time = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      await checkIn(user.id, time);
      Alert.alert('Success', `Check-in recorded at ${time}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to check in');
    }
  };

  const sortedRecords = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 px-6 py-4 pt-12">
        <Text className="text-white text-lg font-bold">Attendance</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Check-in/Check-out Card */}
        <View className="px-6 py-6">
          <View className="bg-white rounded-lg p-6 border border-gray-100 mb-6">
            <Text className="text-gray-900 font-bold text-lg mb-4">Today's Check-in</Text>
            <TouchableOpacity
              onPress={handleCheckIn}
              disabled={loading}
              className="bg-green-600 rounded-lg py-4 flex-row items-center justify-center"
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <>
                  <Icon name="checkmark-circle" size={24} color="#ffffff" />
                  <Text className="text-white font-semibold ml-2">Check In</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Month Selector */}
          <View className="mb-6">
            <Text className="text-gray-900 font-bold mb-3">Select Month</Text>
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => {
                  const date = new Date(selectedMonth);
                  date.setMonth(date.getMonth() - 1);
                  setSelectedMonth(date.toISOString().slice(0, 7));
                }}
                className="p-2"
              >
                <Icon name="chevron-back" size={24} color="#4f46e5" />
              </TouchableOpacity>
              <Text className="text-lg font-bold text-gray-900">{selectedMonth}</Text>
              <TouchableOpacity
                onPress={() => {
                  const date = new Date(selectedMonth);
                  date.setMonth(date.getMonth() + 1);
                  setSelectedMonth(date.toISOString().slice(0, 7));
                }}
                className="p-2"
              >
                <Icon name="chevron-forward" size={24} color="#4f46e5" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Attendance Records */}
          <Text className="text-gray-900 font-bold mb-3">
            Records ({sortedRecords.length})
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color="#4f46e5" />
          ) : sortedRecords.length > 0 ? (
            <FlatList
              scrollEnabled={false}
              data={sortedRecords}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="bg-white rounded-lg p-4 border border-gray-100 mb-3">
                  <View className="flex-row items-center justify-between mb-3">
                    <View>
                      <Text className="text-gray-900 font-semibold">
                        {formatDate(item.date)}
                      </Text>
                      <Text className="text-gray-600 text-sm mt-1">
                        {item.date}
                      </Text>
                    </View>
                    <View
                      style={{ backgroundColor: getStatusColor(item.status) + '20' }}
                      className="px-3 py-1 rounded-full"
                    >
                      <Text
                        style={{ color: getStatusColor(item.status) }}
                        className="font-semibold text-sm"
                      >
                        {getStatusLabel(item.status)}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row justify-between pt-3 border-t border-gray-100">
                    <View>
                      <Text className="text-gray-600 text-xs">Check-in</Text>
                      <Text className="text-gray-900 font-medium mt-1">
                        {formatTime(item.checkIn)}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-gray-600 text-xs">Check-out</Text>
                      <Text className="text-gray-900 font-medium mt-1">
                        {formatTime(item.checkOut)}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-gray-600 text-xs">Hours</Text>
                      <Text className="text-gray-900 font-medium mt-1">
                        {item.hoursWorked || 0}h
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          ) : (
            <View className="bg-gray-100 rounded-lg p-8 items-center justify-center">
              <Icon name="calendar-outline" size={48} color="#9ca3af" />
              <Text className="text-gray-600 font-medium mt-4">
                No attendance records
              </Text>
              <Text className="text-gray-500 text-sm mt-1">
                Records for this month will appear here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
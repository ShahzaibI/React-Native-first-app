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
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@stores/authStore';
import { useAttendanceStore } from '@stores/attendanceStore';
import { MainTabsScreenProps } from '@navigation/types';
import { formatDate, formatTime, getStatusColor, getStatusLabel } from '@utils/helpers';

type AttendanceScreenProps = MainTabsScreenProps<'AttendanceScreen'>;

export default function AttendanceScreen({ navigation }: AttendanceScreenProps) {
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
        hour12: true,
      });
      await checkIn(user.id, time);
      Alert.alert('Success', `Check-in recorded at ${time}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to check in');
    }
  };

  const sortedRecords = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-primary-600 px-6 py-4">
        <Text className="text-white text-lg font-bold">Attendance</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Check-in/Check-out Card */}
        <View className="px-6 py-6">
          <View className="bg-white rounded-lg p-6 border border-secondary-100 mb-6">
            <Text className="text-foreground font-bold text-lg mb-4">Today's Check-in</Text>
            <TouchableOpacity
              onPress={handleCheckIn}
              disabled={loading}
              className="bg-success rounded-lg py-4 flex-row items-center justify-center"
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={24} color="#ffffff" />
                  <Text className="text-white font-600 ml-2">Check In</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Month Selector */}
          <View className="mb-6">
            <Text className="text-foreground font-bold mb-3">Select Month</Text>
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => {
                  const date = new Date(selectedMonth);
                  date.setMonth(date.getMonth() - 1);
                  setSelectedMonth(date.toISOString().slice(0, 7));
                }}
                className="p-2"
              >
                <Ionicons name="chevron-back" size={24} color="#4f46e5" />
              </TouchableOpacity>
              <Text className="text-lg font-bold text-foreground">{selectedMonth}</Text>
              <TouchableOpacity
                onPress={() => {
                  const date = new Date(selectedMonth);
                  date.setMonth(date.getMonth() + 1);
                  setSelectedMonth(date.toISOString().slice(0, 7));
                }}
                className="p-2"
              >
                <Ionicons name="chevron-forward" size={24} color="#4f46e5" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Attendance Records */}
          <Text className="text-foreground font-bold mb-3">
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
                <View className="bg-white rounded-lg p-4 border border-secondary-100 mb-3">
                  <View className="flex-row items-center justify-between mb-3">
                    <View>
                      <Text className="text-foreground font-600">
                        {formatDate(item.date, 'EEE, MMM dd')}
                      </Text>
                      <Text className="text-secondary-600 text-sm mt-1">
                        {item.date}
                      </Text>
                    </View>
                    <View
                      style={{ backgroundColor: getStatusColor(item.status) + '20' }}
                      className="px-3 py-1 rounded-full"
                    >
                      <Text
                        style={{ color: getStatusColor(item.status) }}
                        className="font-600 text-sm"
                      >
                        {getStatusLabel(item.status)}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row justify-between pt-3 border-t border-secondary-100">
                    <View>
                      <Text className="text-secondary-600 text-xs">Check-in</Text>
                      <Text className="text-foreground font-500 mt-1">
                        {item.checkIn ? formatTime(item.checkIn) : '--:--'}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-secondary-600 text-xs">Check-out</Text>
                      <Text className="text-foreground font-500 mt-1">
                        {item.checkOut ? formatTime(item.checkOut) : '--:--'}
                      </Text>
                    </View>
                    {item.note && (
                      <View className="flex-1 ml-4">
                        <Text className="text-secondary-600 text-xs">Note</Text>
                        <Text className="text-secondary-600 text-sm mt-1">{item.note}</Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
            />
          ) : (
            <View className="bg-secondary-50 rounded-lg p-8 items-center justify-center">
              <Ionicons name="calendar-outline" size={48} color="#9ca3af" />
              <Text className="text-secondary-600 font-500 mt-4">
                No attendance records
              </Text>
              <Text className="text-secondary-500 text-sm mt-1">
                Records for this month will appear here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuthStore } from '../../stores/authStore';
import { useAttendanceStore } from '../../stores/attendanceStore';
import { useLeaveStore } from '../../stores/leaveStore';
import { usePayrollStore } from '../../stores/payrollStore';

export default function HomeScreen({ navigation }) {
  const { user } = useAuthStore();
  const { records: attendanceRecords, fetchAttendance, loading: attendanceLoading } =
    useAttendanceStore();
  const { requests: leaveRequests, fetchLeaveRequests, loading: leaveLoading } =
    useLeaveStore();
  const { payrolls, fetchPayrolls, loading: payrollLoading } = usePayrollStore();

  useFocusEffect(
    React.useCallback(() => {
      if (user?.id) {
        const currentMonth = new Date().toISOString().slice(0, 7);
        fetchAttendance(user.id, currentMonth);
        fetchLeaveRequests(user.id);
        fetchPayrolls(user.id);
      }
    }, [user?.id])
  );

  const isLoading = attendanceLoading || leaveLoading || payrollLoading;
  const todayAttendance = attendanceRecords[0];
  const pendingLeaves = leaveRequests.filter((r) => r.status === 'pending').length;
  const latestPayroll = payrolls[0];

  return (
    <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
      {/* Custom Header */}
      <View className="bg-blue-600 px-6 py-4 pt-12">
        <Text className="text-white text-lg font-bold">Home</Text>
      </View>

      {/* Header Section */}
      <View className="bg-blue-600 px-6 py-8 pb-12">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-white/80 text-sm">Welcome back,</Text>
            <Text className="text-white text-2xl font-bold mt-1">{user?.name}</Text>
          </View>
          {user?.profileImage ? (
            <Image
              source={{ uri: user.profileImage }}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <View className="w-12 h-12 rounded-full bg-white/20 justify-center items-center">
              <Icon name="person" size={24} color="#ffffff" />
            </View>
          )}
        </View>
      </View>

      {/* Quick Stats */}
      <View className="px-6 -mt-8 mb-8">
        <View className="flex-row gap-3">
          {/* Attendance Card */}
          <View className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <View className="flex-row items-center mb-2">
              <Icon name="calendar" size={20} color="#4f46e5" />
              <Text className="ml-2 text-gray-600 text-sm font-medium">Attendance</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-900">
              {attendanceRecords.length}
            </Text>
            <Text className="text-xs text-gray-500 mt-1">This month</Text>
          </View>

          {/* Leave Card */}
          <View className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <View className="flex-row items-center mb-2">
              <Icon name="time" size={20} color="#f59e0b" />
              <Text className="ml-2 text-gray-600 text-sm font-medium">Pending</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-900">{pendingLeaves}</Text>
            <Text className="text-xs text-gray-500 mt-1">Leave requests</Text>
          </View>
        </View>
      </View>

      {/* Today's Status */}
      <View className="px-6 mb-8">
        <Text className="text-lg font-bold text-gray-900 mb-4">Today's Status</Text>
        <View className="bg-white rounded-lg p-4 border border-gray-100">
          {isLoading ? (
            <ActivityIndicator size="large" color="#4f46e5" />
          ) : todayAttendance ? (
            <>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-900 font-medium">Status</Text>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-600 font-semibold text-sm">
                    {todayAttendance.status.charAt(0).toUpperCase() +
                      todayAttendance.status.slice(1)}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-600">
                  Check-in: {todayAttendance.checkIn || '--:--'}
                </Text>
                <Text className="text-gray-600">
                  Check-out: {todayAttendance.checkOut || '--:--'}
                </Text>
              </View>
            </>
          ) : (
            <Text className="text-gray-600 text-center py-4">
              No attendance recorded yet
            </Text>
          )}
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 mb-8">
        <Text className="text-lg font-bold text-gray-900 mb-4">Quick Access</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AttendanceScreen')}
          className="bg-white rounded-lg p-4 border border-gray-100 mb-3 flex-row items-center justify-between"
        >
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 rounded-lg bg-blue-100 justify-center items-center">
              <Icon name="calendar" size={24} color="#4f46e5" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="font-semibold text-gray-900">Attendance</Text>
              <Text className="text-xs text-gray-600 mt-1">View records</Text>
            </View>
          </View>
          <Icon name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('LeaveScreen')}
          className="bg-white rounded-lg p-4 border border-gray-100 mb-3 flex-row items-center justify-between"
        >
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 rounded-lg bg-yellow-100 justify-center items-center">
              <Icon name="time" size={24} color="#f59e0b" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="font-semibold text-gray-900">Leave Requests</Text>
              <Text className="text-xs text-gray-600 mt-1">Manage leave</Text>
            </View>
          </View>
          <Icon name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('PayrollScreen')}
          className="bg-white rounded-lg p-4 border border-gray-100 flex-row items-center justify-between"
        >
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 rounded-lg bg-green-100 justify-center items-center">
              <Icon name="wallet" size={24} color="#10b981" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="font-semibold text-gray-900">Payroll</Text>
              <Text className="text-xs text-gray-600 mt-1">View salary</Text>
            </View>
          </View>
          <Icon name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      {/* Latest Payroll Info */}
      {latestPayroll && (
        <View className="px-6 mb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">Latest Payroll</Text>
          <View className="bg-blue-600 rounded-lg p-4">
            <Text className="text-white/80 text-sm">
              {latestPayroll.month} {latestPayroll.year}
            </Text>
            <Text className="text-white text-2xl font-bold mt-2">
              ${latestPayroll.netPay.toLocaleString()}
            </Text>
            <View className="flex-row justify-between mt-4 pt-4 border-t border-white/20">
              <View>
                <Text className="text-white/60 text-xs">Status</Text>
                <Text className="text-white text-sm font-semibold mt-1">
                  {latestPayroll.status.charAt(0).toUpperCase() +
                    latestPayroll.status.slice(1)}
                </Text>
              </View>
              <View>
                <Text className="text-white/60 text-xs">Gross</Text>
                <Text className="text-white text-sm font-semibold mt-1">
                  ${latestPayroll.grossPay.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      <View className="pb-8" />
    </ScrollView>
  );
}
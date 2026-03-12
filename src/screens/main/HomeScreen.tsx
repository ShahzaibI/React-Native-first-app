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
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@stores/authStore';
import { useAttendanceStore } from '@stores/attendanceStore';
import { useLeaveStore } from '@stores/leaveStore';
import { usePayrollStore } from '@stores/payrollStore';
import { MainTabsScreenProps } from '@navigation/types';
import { formatDate } from '@utils/helpers';

type HomeScreenProps = MainTabsScreenProps<'HomeScreen'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
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
  const todayAttendance = attendanceRecords[attendanceRecords.length - 1];
  const pendingLeaves = leaveRequests.filter((r) => r.status === 'pending').length;
  const latestPayroll = payrolls[0];

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View className="bg-gradient-to-b from-primary-600 to-primary-700 px-6 py-8 pb-12">
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
            <View className="w-12 h-12 rounded-full bg-white/20 flex-center">
              <Ionicons name="person" size={24} color="#ffffff" />
            </View>
          )}
        </View>
      </View>

      {/* Quick Stats */}
      <View className="px-6 -mt-8 mb-8">
        <View className="flex-row gap-3">
          {/* Attendance Card */}
          <View className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-secondary-100">
            <View className="flex-row items-center mb-2">
              <Ionicons name="calendar" size={20} color="#4f46e5" />
              <Text className="ml-2 text-secondary-600 text-sm font-500">Attendance</Text>
            </View>
            <Text className="text-2xl font-bold text-foreground">
              {attendanceRecords.length}
            </Text>
            <Text className="text-xs text-secondary-500 mt-1">This month</Text>
          </View>

          {/* Leave Card */}
          <View className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-secondary-100">
            <View className="flex-row items-center mb-2">
              <Ionicons name="time" size={20} color="#f59e0b" />
              <Text className="ml-2 text-secondary-600 text-sm font-500">Pending</Text>
            </View>
            <Text className="text-2xl font-bold text-foreground">{pendingLeaves}</Text>
            <Text className="text-xs text-secondary-500 mt-1">Leave requests</Text>
          </View>
        </View>
      </View>

      {/* Today's Status */}
      <View className="px-6 mb-8">
        <Text className="text-lg font-bold text-foreground mb-4">Today's Status</Text>
        <View className="bg-white rounded-lg p-4 border border-secondary-100">
          {isLoading ? (
            <ActivityIndicator size="large" color="#4f46e5" />
          ) : todayAttendance ? (
            <>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-foreground font-500">Status</Text>
                <View className="bg-success/10 px-3 py-1 rounded-full">
                  <Text className="text-success font-600 text-sm">
                    {todayAttendance.status.charAt(0).toUpperCase() +
                      todayAttendance.status.slice(1)}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-secondary-600">
                  Check-in: {todayAttendance.checkIn || '--:--'}
                </Text>
                <Text className="text-secondary-600">
                  Check-out: {todayAttendance.checkOut || '--:--'}
                </Text>
              </View>
            </>
          ) : (
            <Text className="text-secondary-600 text-center py-4">
              No attendance recorded yet
            </Text>
          )}
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 mb-8">
        <Text className="text-lg font-bold text-foreground mb-4">Quick Access</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AttendanceScreen')}
          className="bg-white rounded-lg p-4 border border-secondary-100 mb-3 flex-row items-center justify-between"
        >
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 rounded-lg bg-primary-100 flex-center">
              <Ionicons name="calendar" size={24} color="#4f46e5" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="font-600 text-foreground">Attendance</Text>
              <Text className="text-xs text-secondary-600 mt-1">View records</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('LeaveScreen')}
          className="bg-white rounded-lg p-4 border border-secondary-100 mb-3 flex-row items-center justify-between"
        >
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 rounded-lg bg-accent-50 flex-center">
              <Ionicons name="time" size={24} color="#f59e0b" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="font-600 text-foreground">Leave Requests</Text>
              <Text className="text-xs text-secondary-600 mt-1">Manage leave</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('PayrollScreen')}
          className="bg-white rounded-lg p-4 border border-secondary-100 flex-row items-center justify-between"
        >
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 rounded-lg bg-success/10 flex-center">
              <Ionicons name="wallet" size={24} color="#10b981" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="font-600 text-foreground">Payroll</Text>
              <Text className="text-xs text-secondary-600 mt-1">View salary</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      {/* Latest Payroll Info */}
      {latestPayroll && (
        <View className="px-6 mb-8">
          <Text className="text-lg font-bold text-foreground mb-4">Latest Payroll</Text>
          <View className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-4">
            <Text className="text-white/80 text-sm">
              {latestPayroll.month} {latestPayroll.year}
            </Text>
            <Text className="text-white text-2xl font-bold mt-2">
              ${latestPayroll.netSalary.toLocaleString()}
            </Text>
            <View className="flex-row justify-between mt-4 pt-4 border-t border-white/20">
              <View>
                <Text className="text-white/60 text-xs">Status</Text>
                <Text className="text-white text-sm font-600 mt-1">
                  {latestPayroll.status.charAt(0).toUpperCase() +
                    latestPayroll.status.slice(1)}
                </Text>
              </View>
              <View>
                <Text className="text-white/60 text-xs">Gross</Text>
                <Text className="text-white text-sm font-600 mt-1">
                  ${latestPayroll.grossSalary.toLocaleString()}
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

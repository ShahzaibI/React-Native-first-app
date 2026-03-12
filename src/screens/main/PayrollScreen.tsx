import React from 'react';
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
import { usePayrollStore } from '@stores/payrollStore';
import { MainTabsScreenProps } from '@navigation/types';
import { formatCurrency, getStatusColor, getStatusLabel } from '@utils/helpers';

type PayrollScreenProps = MainTabsScreenProps<'PayrollScreen'>;

export default function PayrollScreen({ navigation }: PayrollScreenProps) {
  const { user } = useAuthStore();
  const { payrolls, currentPayroll, fetchPayrolls, fetchPayrollDetail, loading } =
    usePayrollStore();

  useFocusEffect(
    React.useCallback(() => {
      if (user?.id) {
        fetchPayrolls(user.id);
      }
    }, [user?.id])
  );

  const handlePayrollPress = async (payrollId: string) => {
    try {
      await fetchPayrollDetail(payrollId);
    } catch (error) {
      Alert.alert('Error', 'Failed to load payroll details');
    }
  };

  const latestPayroll = payrolls[0];

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-primary-600 px-6 py-4">
        <Text className="text-white text-lg font-bold">Payroll</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Latest Payroll Summary */}
        {latestPayroll && (
          <View className="px-6 py-6">
            <Text className="text-foreground font-bold mb-3">Latest Payroll</Text>
            <View className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6">
              <View className="flex-row items-center justify-between mb-4">
                <View>
                  <Text className="text-white/80 text-sm">
                    {latestPayroll.month} {latestPayroll.year}
                  </Text>
                  <Text className="text-white text-3xl font-bold mt-2">
                    {formatCurrency(latestPayroll.netSalary)}
                  </Text>
                </View>
                <View
                  style={{ backgroundColor: getStatusColor(latestPayroll.status) + '40' }}
                  className="px-3 py-2 rounded-lg"
                >
                  <Text
                    style={{ color: '#ffffff' }}
                    className="font-600 text-sm"
                  >
                    {getStatusLabel(latestPayroll.status)}
                  </Text>
                </View>
              </View>

              <View className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20">
                <View>
                  <Text className="text-white/60 text-xs">Gross Salary</Text>
                  <Text className="text-white text-lg font-bold mt-1">
                    {formatCurrency(latestPayroll.grossSalary)}
                  </Text>
                </View>
                <View>
                  <Text className="text-white/60 text-xs">Deductions</Text>
                  <Text className="text-white text-lg font-bold mt-1">
                    {formatCurrency(latestPayroll.deductions)}
                  </Text>
                </View>
                <View>
                  <Text className="text-white/60 text-xs">Bonuses</Text>
                  <Text className="text-white text-lg font-bold mt-1">
                    {formatCurrency(latestPayroll.bonuses)}
                  </Text>
                </View>
                <View>
                  <Text className="text-white/60 text-xs">Base Salary</Text>
                  <Text className="text-white text-lg font-bold mt-1">
                    {formatCurrency(latestPayroll.baseSalary)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Payroll History */}
        <View className="px-6 py-6">
          <Text className="text-foreground font-bold mb-3">
            Payroll History ({payrolls.length})
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color="#4f46e5" />
          ) : payrolls.length > 0 ? (
            <FlatList
              scrollEnabled={false}
              data={payrolls}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handlePayrollPress(item.id)}
                  className="bg-white rounded-lg p-4 border border-secondary-100 mb-3 flex-row items-center justify-between"
                >
                  <View className="flex-1">
                    <Text className="text-foreground font-600">
                      {item.month} {item.year}
                    </Text>
                    <View className="flex-row items-center mt-2">
                      <Text className="text-secondary-600 text-sm">
                        Net: {formatCurrency(item.netSalary)}
                      </Text>
                      <Text className="text-secondary-400 text-sm mx-2">•</Text>
                      <Text className="text-secondary-600 text-sm">
                        Gross: {formatCurrency(item.grossSalary)}
                      </Text>
                    </View>
                  </View>
                  <View className="items-center ml-4">
                    <View
                      style={{ backgroundColor: getStatusColor(item.status) + '20' }}
                      className="px-2 py-1 rounded mb-2"
                    >
                      <Text
                        style={{ color: getStatusColor(item.status) }}
                        className="font-600 text-xs"
                      >
                        {getStatusLabel(item.status)}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View className="bg-secondary-50 rounded-lg p-8 items-center justify-center">
              <Ionicons name="wallet-outline" size={48} color="#9ca3af" />
              <Text className="text-secondary-600 font-500 mt-4">
                No payroll records
              </Text>
              <Text className="text-secondary-500 text-sm mt-1">
                Your payroll information will appear here
              </Text>
            </View>
          )}
        </View>

        {/* Salary Breakdown (if current payroll is selected) */}
        {currentPayroll && (
          <View className="px-6 py-6">
            <Text className="text-foreground font-bold mb-3">
              Detailed Breakdown
            </Text>
            <View className="bg-white rounded-lg border border-secondary-100 overflow-hidden">
              <View className="flex-row items-center justify-between p-4 border-b border-secondary-100 bg-secondary-50">
                <Text className="font-600 text-foreground">Description</Text>
                <Text className="font-600 text-foreground">Amount</Text>
              </View>

              {/* Earnings */}
              <View className="px-4 py-3 border-b border-secondary-100">
                <Text className="text-secondary-600 text-sm font-500 mb-2">Earnings</Text>
                <View className="flex-row items-center justify-between ml-2 mb-1">
                  <Text className="text-foreground text-sm">Base Salary</Text>
                  <Text className="text-foreground font-600">
                    {formatCurrency(currentPayroll.baseSalary)}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between ml-2">
                  <Text className="text-foreground text-sm">Bonuses</Text>
                  <Text className="text-success font-600">
                    +{formatCurrency(currentPayroll.bonuses)}
                  </Text>
                </View>
              </View>

              {/* Deductions */}
              <View className="px-4 py-3 border-b border-secondary-100">
                <Text className="text-secondary-600 text-sm font-500 mb-2">
                  Deductions
                </Text>
                <View className="flex-row items-center justify-between ml-2">
                  <Text className="text-foreground text-sm">Total Deductions</Text>
                  <Text className="text-error font-600">
                    -{formatCurrency(currentPayroll.deductions)}
                  </Text>
                </View>
              </View>

              {/* Summary */}
              <View className="px-4 py-4 bg-primary-50">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-foreground font-600">Gross Salary</Text>
                  <Text className="text-foreground font-bold">
                    {formatCurrency(currentPayroll.grossSalary)}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between border-t border-primary-200 pt-2">
                  <Text className="text-primary-600 font-bold">Net Salary</Text>
                  <Text className="text-primary-600 font-bold text-lg">
                    {formatCurrency(currentPayroll.netSalary)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <View className="pb-8" />
      </ScrollView>
    </View>
  );
}

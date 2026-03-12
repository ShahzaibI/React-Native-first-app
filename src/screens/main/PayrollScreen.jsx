import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { usePayrollStore } from '../../stores/payrollStore';
import { formatCurrency } from '../../utils/helpers';

export default function PayrollScreen({ navigation }) {
  const { payrolls, currentPayroll, loading } = usePayrollStore();

  const renderPayrollItem = ({ item }) => (
    <TouchableOpacity className="bg-white rounded-lg p-4 border border-gray-100 mb-3">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <Text className="text-gray-900 font-semibold text-lg">
            {item.month} {item.year}
          </Text>
          <Text className="text-gray-600 text-sm mt-1">
            Paid on {item.payDate}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-green-600 font-bold text-lg">
            {formatCurrency(item.netPay)}
          </Text>
          <View className="bg-green-100 px-2 py-1 rounded-full mt-1">
            <Text className="text-green-600 text-xs font-medium">
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row justify-between pt-3 border-t border-gray-100">
        <View>
          <Text className="text-gray-500 text-xs">Gross Pay</Text>
          <Text className="text-gray-900 font-medium">
            {formatCurrency(item.grossPay)}
          </Text>
        </View>
        <View>
          <Text className="text-gray-500 text-xs">Deductions</Text>
          <Text className="text-gray-900 font-medium">
            {formatCurrency(item.totalDeductions)}
          </Text>
        </View>
        <View className="items-end">
          <Icon name="chevron-forward" size={20} color="#9ca3af" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 px-6 py-4 pt-12">
        <Text className="text-white text-lg font-bold">Payroll</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Current Month Summary */}
        {currentPayroll && (
          <View className="px-6 py-6">
            <Text className="text-gray-900 font-bold text-lg mb-4">
              Current Month
            </Text>
            <View className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6">
              <Text className="text-white/80 text-sm">
                {currentPayroll.month} {currentPayroll.year}
              </Text>
              <Text className="text-white text-3xl font-bold mt-2">
                {formatCurrency(currentPayroll.netPay)}
              </Text>
              <Text className="text-white/80 text-sm mt-1">Net Pay</Text>

              <View className="flex-row justify-between mt-6 pt-4 border-t border-white/20">
                <View>
                  <Text className="text-white/60 text-xs">Gross Pay</Text>
                  <Text className="text-white font-semibold mt-1">
                    {formatCurrency(currentPayroll.grossPay)}
                  </Text>
                </View>
                <View>
                  <Text className="text-white/60 text-xs">Deductions</Text>
                  <Text className="text-white font-semibold mt-1">
                    {formatCurrency(currentPayroll.totalDeductions)}
                  </Text>
                </View>
                <View>
                  <Text className="text-white/60 text-xs">Status</Text>
                  <Text className="text-white font-semibold mt-1">
                    {currentPayroll.status.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Payroll History */}
        <View className="px-6">
          <Text className="text-gray-900 font-bold text-lg mb-4">
            Payroll History
          </Text>

          {payrolls.length > 0 ? (
            <FlatList
              scrollEnabled={false}
              data={payrolls}
              keyExtractor={(item) => item.id}
              renderItem={renderPayrollItem}
            />
          ) : (
            <View className="bg-gray-100 rounded-lg p-8 items-center justify-center">
              <Icon name="wallet-outline" size={48} color="#9ca3af" />
              <Text className="text-gray-600 font-medium mt-4">
                No payroll records found
              </Text>
              <Text className="text-gray-500 text-sm mt-1">
                Your payroll history will appear here
              </Text>
            </View>
          )}
        </View>

        <View className="pb-8" />
      </ScrollView>
    </View>
  );
}
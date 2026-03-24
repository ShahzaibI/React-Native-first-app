import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TimesheetScreen = ({ navigation }) => {
  const [selectedMonth, setSelectedMonth] = useState('March 2024');

  // Generate current month data (March 2024)
  const generateCurrentMonthData = () => {
    const daysInMarch = 31;
    const data = [];
    const today = new Date();
    const currentDay = 12; // Assuming today is March 12
    
    for (let day = 1; day <= daysInMarch; day++) {
      const date = new Date(2024, 2, day); // March is month 2 (0-indexed)
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const isWeekend = dayName === 'Sat' || dayName === 'Sun';
      const isPastDay = day < currentDay;
      const isToday = day === currentDay;
      const isFutureDay = day > currentDay;
      
      let status, statusColor, checkIn, checkOut, workingHours;
      
      if (isFutureDay) {
        status = 'Upcoming';
        statusColor = 'gray';
        checkIn = '-';
        checkOut = '-';
        workingHours = '-';
      } else if (isWeekend) {
        status = 'Weekend';
        statusColor = 'gray';
        checkIn = '-';
        checkOut = '-';
        workingHours = '-';
      } else if (isToday) {
        status = 'Present';
        statusColor = 'green';
        checkIn = '09:00 AM';
        checkOut = 'Working...';
        workingHours = '4h 30m';
      } else if (isPastDay) {
        // Generate realistic data for past days
        const scenarios = [
          { status: 'Present', statusColor: 'green', checkIn: '09:00 AM', checkOut: '06:00 PM', workingHours: '8h 30m' },
          { status: 'Present', statusColor: 'green', checkIn: '08:45 AM', checkOut: '05:45 PM', workingHours: '8h 30m' },
          { status: 'Late', statusColor: 'orange', checkIn: '09:15 AM', checkOut: '06:15 PM', workingHours: '8h 30m' },
          { status: 'Present', statusColor: 'green', checkIn: '09:00 AM', checkOut: '06:30 PM', workingHours: '9h 00m' },
          { status: 'Absent', statusColor: 'red', checkIn: '-', checkOut: '-', workingHours: '-' },
        ];
        
        const scenario = scenarios[day % scenarios.length];
        status = scenario.status;
        statusColor = scenario.statusColor;
        checkIn = scenario.checkIn;
        checkOut = scenario.checkOut;
        workingHours = scenario.workingHours;
      }
      
      data.push({
        id: day.toString(),
        day: day,
        date: `Mar ${day.toString().padStart(2, '0')}, 2024`,
        dayName: dayName,
        checkIn,
        checkOut,
        workingHours,
        status,
        statusColor,
        isToday,
        isWeekend,
        isFutureDay
      });
    }
    
    return data.reverse(); // Show latest dates first
  };

  const timesheetData = generateCurrentMonthData();

  const getStatusColor = (color) => {
    switch (color) {
      case 'green': return 'bg-green-100 text-green-800';
      case 'orange': return 'bg-orange-100 text-orange-800';
      case 'red': return 'bg-red-100 text-red-800';
      case 'gray': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTimesheetItem = ({ item }) => (
    <View className={`bg-white rounded-lg p-4 mb-3 shadow-sm ${
      item.isToday ? 'border-2 border-[#015BA6]' : ''
    }`}>
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text className={`text-lg font-bold ${
              item.isToday ? 'text-[#015BA6]' : 'text-gray-800'
            }`}>
              {item.day}
            </Text>
            {item.isToday && (
              <View className="bg-[#015BA6] rounded-full px-2 py-1 ml-2">
                <Text className="text-white text-xs font-medium">TODAY</Text>
              </View>
            )}
          </View>
          <Text className="text-gray-600 text-sm">{item.dayName}</Text>
          <Text className="text-gray-500 text-xs">{item.date}</Text>
        </View>
        
        <View className={`px-3 py-1 rounded-full ${getStatusColor(item.statusColor)}`}>
          <Text className="text-sm font-medium">{item.status}</Text>
        </View>
      </View>
      
      {!item.isWeekend && !item.isFutureDay && (
        <View className="bg-gray-50 rounded-lg p-3">
          <View className="flex-row justify-between">
            <View className="flex-1">
              <View className="flex-row items-center mb-1">
                <Icon name="login" size={14} color="#22c55e" />
                <Text className="text-gray-600 text-xs ml-1 font-medium">CHECK IN</Text>
              </View>
              <Text className={`font-semibold ${
                item.checkIn === '-' ? 'text-gray-400' : 'text-gray-800'
              }`}>
                {item.checkIn}
              </Text>
            </View>
            
            <View className="flex-1">
              <View className="flex-row items-center mb-1">
                <Icon name="logout" size={14} color="#ef4444" />
                <Text className="text-gray-600 text-xs ml-1 font-medium">CHECK OUT</Text>
              </View>
              <Text className={`font-semibold ${
                item.checkOut === '-' ? 'text-gray-400' : 
                item.checkOut === 'Working...' ? 'text-[#015BA6]' : 'text-gray-800'
              }`}>
                {item.checkOut}
              </Text>
            </View>
            
            <View className="flex-1">
              <View className="flex-row items-center mb-1">
                <Icon name="schedule" size={14} color="#015BA6" />
                <Text className="text-gray-600 text-xs ml-1 font-medium">HOURS</Text>
              </View>
              <Text className={`font-semibold ${
                item.workingHours === '-' ? 'text-gray-400' : 'text-gray-800'
              }`}>
                {item.workingHours}
              </Text>
            </View>
          </View>
        </View>
      )}
      
      {item.isWeekend && (
        <View className="bg-gray-50 rounded-lg p-3 items-center">
          <Icon name="weekend" size={24} color="#9ca3af" />
          <Text className="text-gray-500 text-sm mt-1">Weekend</Text>
        </View>
      )}
      
      {item.isFutureDay && !item.isWeekend && (
        <View className="bg-blue-50 rounded-lg p-3 items-center">
          <Icon name="schedule" size={24} color="#60a5fa" />
          <Text className="text-blue-600 text-sm mt-1">Upcoming Workday</Text>
        </View>
      )}
    </View>
  );

  // Calculate summary stats
  const presentDays = timesheetData.filter(item => item.status === 'Present').length;
  const lateDays = timesheetData.filter(item => item.status === 'Late').length;
  const absentDays = timesheetData.filter(item => item.status === 'Absent').length;
  const totalWorkingDays = timesheetData.filter(item => !item.isWeekend && !item.isFutureDay).length;
  const totalHours = (presentDays + lateDays) * 8.5; // Approximate

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-[#015BA6] px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Timesheet</Text>
          <TouchableOpacity>
            <Icon name="calendar-today" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View className="bg-white/20 rounded-lg px-4 py-3 flex-row items-center justify-between">
          <Text className="text-white font-medium text-lg">{selectedMonth}</Text>
          <View className="flex-row items-center">
            <Text className="text-white/80 text-sm mr-2">Current Month</Text>
            <Icon name="keyboard-arrow-down" size={20} color="white" />
          </View>
        </View>
      </View>

      {/* Summary Cards */}
      <View className="px-6 -mt-2 mb-4">
        <View className="bg-white rounded-xl p-6 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-4">Monthly Summary</Text>
          
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                <Icon name="check-circle" size={24} color="#22c55e" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">{presentDays}</Text>
              <Text className="text-gray-600 text-sm text-center">Present Days</Text>
            </View>
            
            <View className="items-center flex-1">
              <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center mb-2">
                <Icon name="access-time" size={24} color="#f97316" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">{lateDays}</Text>
              <Text className="text-gray-600 text-sm text-center">Late Arrivals</Text>
            </View>
            
            <View className="items-center flex-1">
              <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mb-2">
                <Icon name="cancel" size={24} color="#ef4444" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">{absentDays}</Text>
              <Text className="text-gray-600 text-sm text-center">Absent Days</Text>
            </View>
            
            <View className="items-center flex-1">
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                <Icon name="schedule" size={24} color="#015BA6" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">{totalHours.toFixed(0)}</Text>
              <Text className="text-gray-600 text-sm text-center">Total Hours</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Daily Records Header */}
      <View className="px-6 mb-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold text-gray-800">Daily Records</Text>
          <TouchableOpacity className="flex-row items-center">
            <Icon name="file-download" size={20} color="#015BA6" />
            <Text className="text-[#015BA6] font-medium ml-1">Export</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* FlatList Container */}
      <View className="flex-1 px-6">
        <FlatList
          data={timesheetData}
          renderItem={renderTimesheetItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          removeClippedSubviews={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      </View>
    </View>
  );
};

export default TimesheetScreen;
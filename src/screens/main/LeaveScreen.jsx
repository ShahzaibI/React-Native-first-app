import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLeaveStore } from '../../stores/leaveStore';
import { getStatusColor, getStatusLabel } from '../../utils/helpers';

export default function LeaveScreen({ navigation }) {
  const { requests, loading } = useLeaveStore();
  const [activeTab, setActiveTab] = useState('all');

  const filteredRequests = requests.filter(request => {
    if (activeTab === 'all') return true;
    return request.status === activeTab;
  });

  const handleNewRequest = () => {
    Alert.alert(
      'New Leave Request',
      'Leave request form would open here',
      [{ text: 'OK' }]
    );
  };

  const renderLeaveRequest = ({ item }) => (
    <View className="bg-white rounded-lg p-4 border border-gray-100 mb-3">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <Text className="text-gray-900 font-semibold">
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Leave
          </Text>
          <Text className="text-gray-600 text-sm mt-1">
            {item.startDate} to {item.endDate}
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

      <Text className="text-gray-700 mb-3">{item.reason}</Text>

      <View className="flex-row justify-between pt-3 border-t border-gray-100">
        <Text className="text-gray-500 text-xs">
          Applied: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        {item.status === 'pending' && (
          <TouchableOpacity
            onPress={() => Alert.alert('Withdraw', 'Request withdrawn')}
            className="px-3 py-1"
          >
            <Text className="text-red-600 text-sm font-medium">Withdraw</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 px-6 py-4 pt-12">
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-lg font-bold">Leave Requests</Text>
          <TouchableOpacity
            onPress={handleNewRequest}
            className="bg-white/20 px-3 py-2 rounded-lg"
          >
            <Text className="text-white font-medium">New Request</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tab Filters */}
        <View className="px-6 py-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3">
              {['all', 'pending', 'approved', 'rejected'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full ${
                    activeTab === tab ? 'bg-blue-600' : 'bg-white border border-gray-200'
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      activeTab === tab ? 'text-white' : 'text-gray-600'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Leave Requests List */}
        <View className="px-6">
          <Text className="text-gray-900 font-bold mb-3">
            Requests ({filteredRequests.length})
          </Text>

          {filteredRequests.length > 0 ? (
            <FlatList
              scrollEnabled={false}
              data={filteredRequests}
              keyExtractor={(item) => item.id}
              renderItem={renderLeaveRequest}
            />
          ) : (
            <View className="bg-gray-100 rounded-lg p-8 items-center justify-center">
              <Icon name="document-outline" size={48} color="#9ca3af" />
              <Text className="text-gray-600 font-medium mt-4">
                No leave requests found
              </Text>
              <Text className="text-gray-500 text-sm mt-1">
                Your leave requests will appear here
              </Text>
            </View>
          )}
        </View>

        <View className="pb-8" />
      </ScrollView>
    </View>
  );
}
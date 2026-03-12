import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@stores/authStore';
import { useLeaveStore } from '@stores/leaveStore';
import { MainTabsScreenProps } from '@navigation/types';
import { formatDate, calculateDaysBetween, getStatusColor, getStatusLabel } from '@utils/helpers';
import { LeaveRequest } from '@types/index';

type LeaveScreenProps = MainTabsScreenProps<'LeaveScreen'>;

export default function LeaveScreen({ navigation }: LeaveScreenProps) {
  const { user } = useAuthStore();
  const { requests, fetchLeaveRequests, submitLeaveRequest, loading } = useLeaveStore();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    type: 'vacation' as const,
    reason: '',
  });

  useFocusEffect(
    React.useCallback(() => {
      if (user?.id) {
        fetchLeaveRequests(user.id);
      }
    }, [user?.id])
  );

  const handleSubmitRequest = async () => {
    if (
      !formData.startDate.trim() ||
      !formData.endDate.trim() ||
      !formData.reason.trim()
    ) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      Alert.alert('Validation Error', 'End date must be after start date');
      return;
    }

    try {
      if (!user?.id) throw new Error('User not found');
      await submitLeaveRequest(
        user.id,
        formData.startDate,
        formData.endDate,
        formData.type,
        formData.reason
      );
      Alert.alert('Success', 'Leave request submitted');
      setShowModal(false);
      setFormData({
        startDate: '',
        endDate: '',
        type: 'vacation',
        reason: '',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to submit leave request');
    }
  };

  const sortedRequests = [...requests].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const stats = {
    pending: requests.filter((r) => r.status === 'pending').length,
    approved: requests.filter((r) => r.status === 'approved').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-primary-600 px-6 py-4">
        <Text className="text-white text-lg font-bold">Leave Requests</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View className="px-6 py-6 flex-row gap-3">
          <View className="flex-1 bg-white rounded-lg p-4 border border-secondary-100">
            <Text className="text-secondary-600 text-xs font-500">Pending</Text>
            <Text className="text-2xl font-bold text-warning mt-1">{stats.pending}</Text>
          </View>
          <View className="flex-1 bg-white rounded-lg p-4 border border-secondary-100">
            <Text className="text-secondary-600 text-xs font-500">Approved</Text>
            <Text className="text-2xl font-bold text-success mt-1">{stats.approved}</Text>
          </View>
          <View className="flex-1 bg-white rounded-lg p-4 border border-secondary-100">
            <Text className="text-secondary-600 text-xs font-500">Rejected</Text>
            <Text className="text-2xl font-bold text-error mt-1">{stats.rejected}</Text>
          </View>
        </View>

        {/* New Request Button */}
        <View className="px-6 pb-6">
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            className="bg-primary-600 rounded-lg py-4 flex-row items-center justify-center"
          >
            <Ionicons name="add-circle" size={20} color="#ffffff" />
            <Text className="text-white font-600 ml-2">New Leave Request</Text>
          </TouchableOpacity>
        </View>

        {/* Leave Requests List */}
        <View className="px-6">
          {loading ? (
            <ActivityIndicator size="large" color="#4f46e5" />
          ) : sortedRequests.length > 0 ? (
            <FlatList
              scrollEnabled={false}
              data={sortedRequests}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const days = calculateDaysBetween(item.startDate, item.endDate);
                return (
                  <View className="bg-white rounded-lg p-4 border border-secondary-100 mb-3">
                    <View className="flex-row items-center justify-between mb-3">
                      <View className="flex-1">
                        <Text className="text-foreground font-600">
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </Text>
                        <Text className="text-secondary-600 text-sm mt-1">
                          {formatDate(item.startDate)} - {formatDate(item.endDate)}
                        </Text>
                      </View>
                      <View
                        style={{ backgroundColor: getStatusColor(item.status) + '20' }}
                        className="px-3 py-1 rounded-full"
                      >
                        <Text
                          style={{ color: getStatusColor(item.status) }}
                          className="font-600 text-xs"
                        >
                          {getStatusLabel(item.status)}
                        </Text>
                      </View>
                    </View>

                    <View className="pt-3 border-t border-secondary-100">
                      <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-secondary-600 text-sm">
                          Duration: {days} day{days > 1 ? 's' : ''}
                        </Text>
                        <Text className="text-foreground text-sm font-500">
                          Requested: {formatDate(item.createdAt, 'MMM dd')}
                        </Text>
                      </View>
                      {item.reason && (
                        <Text className="text-secondary-600 text-sm mt-2">
                          Reason: {item.reason}
                        </Text>
                      )}
                      {item.approverComments && (
                        <Text className="text-secondary-600 text-sm mt-2">
                          Comments: {item.approverComments}
                        </Text>
                      )}
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <View className="bg-secondary-50 rounded-lg p-8 items-center justify-center">
              <Ionicons name="calendar-outline" size={48} color="#9ca3af" />
              <Text className="text-secondary-600 font-500 mt-4">No leave requests</Text>
              <Text className="text-secondary-500 text-sm mt-1">
                Your leave requests will appear here
              </Text>
            </View>
          )}
        </View>

        <View className="pb-8" />
      </ScrollView>

      {/* Leave Request Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View className="flex-1 bg-black/50">
          <View className="flex-1 bg-background mt-12 rounded-t-3xl overflow-hidden">
            {/* Modal Header */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-secondary-100">
              <Text className="text-lg font-bold text-foreground">New Leave Request</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Modal Content */}
            <ScrollView className="flex-1 px-6 py-6">
              {/* Start Date */}
              <View className="mb-6">
                <Text className="text-foreground font-600 mb-2">Start Date</Text>
                <TextInput
                  className="bg-secondary-50 border border-secondary-200 rounded-lg px-4 py-3 text-foreground"
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9ca3af"
                  value={formData.startDate}
                  onChangeText={(text) =>
                    setFormData({ ...formData, startDate: text })
                  }
                />
              </View>

              {/* End Date */}
              <View className="mb-6">
                <Text className="text-foreground font-600 mb-2">End Date</Text>
                <TextInput
                  className="bg-secondary-50 border border-secondary-200 rounded-lg px-4 py-3 text-foreground"
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9ca3af"
                  value={formData.endDate}
                  onChangeText={(text) => setFormData({ ...formData, endDate: text })}
                />
              </View>

              {/* Leave Type */}
              <View className="mb-6">
                <Text className="text-foreground font-600 mb-3">Leave Type</Text>
                <View className="flex-row gap-2 flex-wrap">
                  {['sick', 'vacation', 'personal', 'unpaid'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() =>
                        setFormData({
                          ...formData,
                          type: type as LeaveRequest['type'],
                        })
                      }
                      className={`px-4 py-2 rounded-lg border ${
                        formData.type === type
                          ? 'bg-primary-600 border-primary-600'
                          : 'bg-secondary-50 border-secondary-200'
                      }`}
                    >
                      <Text
                        className={`font-500 ${
                          formData.type === type
                            ? 'text-white'
                            : 'text-foreground'
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Reason */}
              <View className="mb-8">
                <Text className="text-foreground font-600 mb-2">Reason</Text>
                <TextInput
                  className="bg-secondary-50 border border-secondary-200 rounded-lg px-4 py-3 text-foreground h-24"
                  placeholder="Please enter the reason for your leave request"
                  placeholderTextColor="#9ca3af"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={formData.reason}
                  onChangeText={(text) => setFormData({ ...formData, reason: text })}
                />
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmitRequest}
                disabled={loading}
                className="bg-primary-600 rounded-lg py-4 mb-4"
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text className="text-white font-600 text-center">
                    Submit Request
                  </Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

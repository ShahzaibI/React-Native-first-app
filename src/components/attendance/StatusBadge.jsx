import React from 'react';
import { View, Text } from 'react-native';

const StatusBadge = ({ status, className = '' }) => {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-orange-100 text-orange-800';
      case 'weekend':
        return 'bg-gray-100 text-gray-800';
      case 'checked in':
        return 'bg-green-100 text-green-800';
      case 'not checked in':
        return 'bg-gray-100 text-gray-600';
      case 'on leave':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <View className={`px-3 py-1 rounded-full ${getStatusStyles()} ${className}`}>
      <Text className="text-sm font-medium">{status}</Text>
    </View>
  );
};

export default StatusBadge;
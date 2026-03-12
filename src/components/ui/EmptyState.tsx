import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export default function EmptyState({
  icon = 'alert-circle',
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <View className="bg-secondary-50 rounded-lg p-8 items-center justify-center">
      <Ionicons name={icon} size={48} color="#9ca3af" />
      <Text className="text-secondary-600 font-600 mt-4 text-center">{title}</Text>
      {description && (
        <Text className="text-secondary-500 text-sm mt-2 text-center">
          {description}
        </Text>
      )}
      {action && (
        <TouchableOpacity
          onPress={action.onPress}
          className="mt-6 px-6 py-2 bg-primary-600 rounded-lg"
        >
          <Text className="text-white font-600">{action.label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

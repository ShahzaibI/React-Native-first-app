import React from 'react';
import { View, Text, ViewStyle } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export default function Badge({
  label,
  variant = 'primary',
  size = 'medium',
  style,
}: BadgeProps) {
  const variantStyles = {
    primary: {
      bg: 'bg-primary-100',
      text: 'text-primary-700',
    },
    secondary: {
      bg: 'bg-secondary-100',
      text: 'text-secondary-700',
    },
    success: {
      bg: 'bg-green-100',
      text: 'text-green-700',
    },
    warning: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
    },
    error: {
      bg: 'bg-red-100',
      text: 'text-red-700',
    },
  };

  const sizeStyles = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base',
  };

  const styles = variantStyles[variant];

  return (
    <View
      style={style}
      className={`
        ${styles.bg}
        ${sizeStyles[size]}
        rounded-full
      `}
    >
      <Text className={`${styles.text} font-600 text-center`}>{label}</Text>
    </View>
  );
}

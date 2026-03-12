import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const variantStyles = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-200',
    danger: 'bg-error',
    success: 'bg-success',
  };

  const sizeStyles = {
    small: 'py-2 px-4',
    medium: 'py-3 px-6',
    large: 'py-4 px-8',
  };

  const textColorStyles = {
    primary: 'text-white',
    secondary: 'text-foreground',
    danger: 'text-white',
    success: 'text-white',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={style}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        rounded-lg
        flex-row
        items-center
        justify-center
        ${disabled || loading ? 'opacity-50' : ''}
      `}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text
          style={textStyle}
          className={`
            ${textColorStyles[variant]}
            font-600
            text-center
          `}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  icon,
  disabled = false,
  className = '',
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return disabled 
          ? 'bg-gray-300' 
          : 'bg-[#015BA6]';
      case 'secondary':
        return disabled 
          ? 'bg-gray-100 border border-gray-300' 
          : 'bg-white border border-[#015BA6]';
      case 'danger':
        return disabled 
          ? 'bg-gray-300' 
          : 'bg-red-500';
      default:
        return 'bg-[#015BA6]';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'primary':
        return disabled ? 'text-gray-500' : 'text-white';
      case 'secondary':
        return disabled ? 'text-gray-400' : 'text-[#015BA6]';
      case 'danger':
        return disabled ? 'text-gray-500' : 'text-white';
      default:
        return 'text-white';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'py-2 px-4';
      case 'medium':
        return 'py-3 px-6';
      case 'large':
        return 'py-4 px-8';
      default:
        return 'py-3 px-6';
    }
  };

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      className={`rounded-lg items-center justify-center flex-row ${getVariantStyles()} ${getSizeStyles()} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && (
        <Icon 
          name={icon} 
          size={20} 
          color={variant === 'secondary' ? '#015BA6' : 'white'} 
          style={{ marginRight: 8 }}
        />
      )}
      <Text className={`font-semibold text-base ${getTextStyles()}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
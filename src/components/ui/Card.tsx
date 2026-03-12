import React from 'react';
import { View, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
}

export default function Card({ children, style, className = '' }: CardProps) {
  return (
    <View
      style={style}
      className={`
        bg-white
        rounded-lg
        border
        border-secondary-100
        shadow-sm
        ${className}
      `}
    >
      {children}
    </View>
  );
}

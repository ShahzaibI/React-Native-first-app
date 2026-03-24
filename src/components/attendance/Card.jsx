import React from 'react';
import { View } from 'react-native';

const Card = ({ children, className = '', ...props }) => {
  return (
    <View 
      className={`bg-white rounded-xl shadow-sm ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};

export default Card;
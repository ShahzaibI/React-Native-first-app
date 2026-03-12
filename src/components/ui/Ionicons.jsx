import React from 'react';
import { Text } from 'react-native';

const iconMap = {
  // Navigation icons
  'home': '🏠',
  'person': '👤',
  'settings': '⚙️',
  'calendar': '📅',
  'time': '⏰',
  'wallet': '💰',
  
  // Action icons
  'checkmark-circle': '✅',
  'chevron-back': '◀️',
  'chevron-forward': '▶️',
  'chevron-down': '🔽',
  'add': '➕',
  'close': '❌',
  'search': '🔍',
  'filter': '🔽',
  
  // Status icons
  'calendar-outline': '📅',
  'document-outline': '📄',
  'wallet-outline': '💰',
  'document-text': '📄',
  'shield-checkmark': '🛡️',
  'log-out': '🚪',
  'help-circle': '❓',
  'information-circle': 'ℹ️',
  'notifications': '🔔',
  'moon': '🌙',
  'finger-print': '👆',
  
  // Default
  'help': '❓',
};

export const Ionicons = ({ name, size = 24, color = '#000000', style }) => {
  const emoji = iconMap[name] || iconMap['help'];
  
  return (
    <Text 
      style={[
        { 
          fontSize: size, 
          color: color,
          textAlign: 'center',
          lineHeight: size + 4,
        }, 
        style
      ]}
    >
      {emoji}
    </Text>
  );
};
import { View, Text, Switch } from 'react-native';
import React, { useState } from 'react';

const SwitchUI = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    return (
        <View className={`flex-1 justify-center items-center ${isEnabled? 'bg-black' : 'bg-white'}`}>
            <Text className={`${isEnabled? 'text-white' : 'text-black'} mb-3`}>Switch is {isEnabled? 'on' : 'off'}</Text>
            <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor='#3e3e3e'
                onValueChange={()=> setIsEnabled(!isEnabled)}
                value={isEnabled}
                style={{transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]}}
            />
        </View>
    );
};

export default SwitchUI;
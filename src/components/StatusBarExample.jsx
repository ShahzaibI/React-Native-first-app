import { View, Text, StatusBar } from 'react-native';
import React from 'react';

const StatusBarExample = () => {
    return (
        <View>
            <StatusBar barStyle={'dark-content'}
                backgroundColor='#6200fe'
                // hidden={true}
                translucent={false}
            />
            <Text>StatusBarExample</Text>
        </View>
    );
};

export default StatusBarExample;
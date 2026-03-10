import { View, Text } from 'react-native';
import React from 'react';
import Two from './Two';

const One = () => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>One</Text>
            <Two />
        </View>
    );
};

export default One;
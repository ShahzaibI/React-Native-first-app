import { View, Text } from 'react-native';
import React from 'react';
import SubChild from './SubChild';

const ChildComp = () => {
    return (
        <View>
            <SubChild />
        </View>
    );
};

export default ChildComp;
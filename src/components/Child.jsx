import { View, Text } from 'react-native';
import React from 'react';

const Child = (props) => {
    let count = props.data;
    let item = props.item;
    return (
        <View>
            <Text style={{fontSize: 30}}>Child</Text>
            <Text style={{fontSize: 30}}>Count: {count}</Text>
            <Text style={{fontSize: 30}}>Item: {item}</Text>
        </View>
    );
};

export default Child;
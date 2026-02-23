import { View, Text } from 'react-native';
import React, { useEffect } from 'react';

const ShowChild = () => {
    useEffect(() => {
        console.log('ShowChild Mounted');
        return () => {
            console.log('ShowChild Unmounted');
        }
    },)
    return (
        <View>
            <Text style={{fontSize: 30}}>ShowChild</Text>
        </View>
    );
};

export default ShowChild;
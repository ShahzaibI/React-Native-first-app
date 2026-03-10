import { View, Text, Button } from 'react-native';
import React from 'react';
import { useCounterStore } from '../zustand/store';

const Two = () => {
    const {count, increment, decrement, reset} = useCounterStore();
    return (
        <View style={{alignItems: 'center'}}>
            <Text>Counter: {count}</Text>
            <View style={{margin: 10}}>
                <Button title='Increment' onPress={increment} />
            </View>
            <View style={{margin: 10}}>
                <Button title='Decrement' onPress={decrement} />
            </View>
            <View style={{margin: 10}}>
                <Button title='Reset' onPress={reset} />
            </View>
        </View>
    );
};

export default Two;
import { View, Text, Button } from 'react-native';
import React, { useContext } from 'react';
import { CounterContext } from './Parent';

const SubChild = () => {
    const {count, countIncrement} = useContext(CounterContext);
    return (
        <View style={{padding: 20, alignItems: 'center'}}>
            <Text style={{marginBottom: 20, }}>Count: {count}</Text>
            <Button title='Counter' onPress={countIncrement}/>
        </View>
    );
};

export default SubChild;